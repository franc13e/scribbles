// Sign-in and sync with Supabase, without a library: auth, the items table and photo storage over fetch.
// The app hands over its things as docs ("list:abc" → that list). Each sync works out which docs changed
// here since the last sync, pulls what other devices changed, merges where both did, then pushes.
(() => {
  'use strict';

  const BASE = 'https://vvxbaxqyljmiulppdbsl.supabase.co';
  const KEY = 'sb_publishable_CfVEsWCzjQx_wviuc6SzUA_0MOw9mrg'; // the public key, meant to ship in the app
  const AUTH = 'scribbles-auth';
  const META = 'scribbles-sync';

  const read = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const write = (k, v) => { try { v ? localStorage.setItem(k, JSON.stringify(v)) : localStorage.removeItem(k); } catch (e) { /* full */ } };

  // base: doc key → hash of the version last synced · dirty: doc key → when it changed here
  // prev: the last synced months and tick days themselves, so a merge can tell removed from new
  // ver: doc key → the server's synced_at for the version this device has seen, so a push only
  //   replaces that exact version (if another device got there first, sync merges and tries again)
  // up: photo ids already in storage · cursor: newest server change seen · at: last good sync
  const fresh = uid => ({ uid, cursor: null, base: {}, prev: {}, ver: {}, dirty: {}, up: {}, at: 0 });
  const conflicts = {}; // doc key → pushes in a row that lost to another device
  const MERGED = ['month', 'log']; // the kinds that combine instead of newest-wins

  let app = null;     // { docs(), apply(key, data | null), changed(), photoIds() }
  let session = read(AUTH);
  let meta = read(META);
  let status = 'idle'; // idle | syncing | offline | error
  let timer = null, running = null, again = false;
  const listeners = new Set();

  // a quick string hash (cyrb53), enough to tell whether a doc changed
  function hash(str) {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 2654435761);
      h2 = Math.imul(h2 ^ c, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  // the server's timestamps have microseconds, which older Safari can't parse; milliseconds are plenty
  const time = s => Date.parse(String(s).replace(/(\.\d{3})\d+/, '$1'));
  const hashOf = d => d === undefined ? undefined : hash(JSON.stringify(d));

  function setStatus(s) {
    status = s;
    listeners.forEach(fn => fn());
  }

  // ---------- http ----------

  async function api(path, opts = {}, auth = true) {
    const headers = { apikey: KEY, ...(opts.headers || {}) };
    if (auth) headers.Authorization = 'Bearer ' + await token();
    let body = opts.body;
    if (opts.json !== undefined) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(opts.json);
    }
    const res = await fetch(BASE + path, { method: opts.method || 'GET', headers, body });
    if (!res.ok) {
      let msg = '';
      try {
        const j = await res.json();
        msg = j.msg || j.message || j.error_description || j.error || '';
      } catch (e) { /* no body */ }
      const err = new Error(msg || 'HTTP ' + res.status);
      err.status = res.status;
      throw err;
    }
    return res;
  }

  // ---------- signing in ----------

  function setSession(j) {
    session = {
      access_token: j.access_token,
      refresh_token: j.refresh_token,
      expires_at: j.expires_at || Math.floor(Date.now() / 1000) + (j.expires_in || 3600),
      user: { id: j.user.id, email: j.user.email },
    };
    write(AUTH, session);
    if (!meta || meta.uid !== session.user.id) meta = fresh(session.user.id); // a different account starts over
    write(META, meta);
  }

  async function token() {
    if (!session) throw Object.assign(new Error('signed out'), { status: 401 });
    if (session.expires_at - 60 > Date.now() / 1000) return session.access_token;
    try {
      const res = await api('/auth/v1/token?grant_type=refresh_token', { method: 'POST', json: { refresh_token: session.refresh_token } }, false);
      setSession(await res.json());
    } catch (e) {
      // the refresh token was turned down: signed out for real (offline is just offline)
      if (e.status === 400 || e.status === 401) { session = null; write(AUTH, null); setStatus('idle'); }
      throw e;
    }
    return session.access_token;
  }

  async function signUp(email, password) {
    const res = await api('/auth/v1/signup', { method: 'POST', json: { email, password } }, false);
    const j = await res.json();
    if (!j.access_token) {
      // email confirmation is switched on in Supabase, or this email already has an account
      const err = new Error('check your email to confirm, then sign in');
      err.confirm = true;
      throw err;
    }
    setSession(j);
    schedule(0);
  }

  async function signIn(email, password) {
    const res = await api('/auth/v1/token?grant_type=password', { method: 'POST', json: { email, password } }, false);
    setSession(await res.json());
    schedule(0);
  }

  // sends a "reset your password" link; it comes back to the app as #access_token=…&type=recovery
  const forgot = email => api('/auth/v1/recover?redirect_to=' + encodeURIComponent(location.origin + '/'),
    { method: 'POST', json: { email } }, false);

  // after following that link: the link's tokens sign you in, then the new password is saved
  async function setPassword(password) {
    await api('/auth/v1/user', { method: 'PUT', json: { password } });
  }

  // off to Google's sign-in page; it comes back to the app as #access_token=…
  // (checks first that Google is switched on in Supabase, or you'd land on a bare error page)
  async function google() {
    const settings = await (await api('/auth/v1/settings', {}, false)).json();
    if (!settings.external || !settings.external.google) throw new Error('google is off');
    location.assign(BASE + '/auth/v1/authorize?provider=google&redirect_to=' + encodeURIComponent(location.origin + '/'));
  }

  // the tokens a password-reset link or Google sign-in puts in the address
  async function fromLink(hashStr) {
    const p = new URLSearchParams(hashStr.replace(/^#/, ''));
    if (!p.get('access_token')) return false;
    const res = await fetch(BASE + '/auth/v1/user', { headers: { apikey: KEY, Authorization: 'Bearer ' + p.get('access_token') } });
    if (!res.ok) return false;
    setSession({
      access_token: p.get('access_token'),
      refresh_token: p.get('refresh_token'),
      expires_at: +p.get('expires_at') || 0,
      expires_in: +p.get('expires_in') || 3600,
      user: await res.json(),
    });
    schedule(0);
    return p.get('type') || true;
  }

  // signing out keeps everything on this device; signing in again merges it back in
  async function signOut() {
    try { await api('/auth/v1/logout', { method: 'POST' }); } catch (e) { /* offline is fine */ }
    session = null;
    meta = null;
    write(AUTH, null);
    write(META, null);
    setStatus('idle');
  }

  // ---------- syncing ----------

  // the version both sides started from, and what's being synced now
  function setBase(k, d) {
    if (d === undefined) { delete meta.base[k]; delete meta.prev[k]; return; }
    meta.base[k] = hashOf(d);
    if (MERGED.includes(k.slice(0, k.indexOf(':')))) meta.prev[k] = JSON.parse(JSON.stringify(d));
  }

  // combines two versions of a set of things (photos on a month, ticks on a day) by id: anything new
  // on either side stays, anything removed on either side (it was in base) goes, and where both have
  // it the newer side's copy wins. Without a base (a first sign-in) it's just everything from both.
  function mergeById(base, older, newer, id) {
    const was = new Set((base || []).map(id));
    const inOlder = new Set(older.map(id)), inNewer = new Set(newer.map(id));
    const out = new Map();
    for (const x of [...older, ...newer]) {
      const k = id(x);
      if (was.has(k) && !(inOlder.has(k) && inNewer.has(k))) continue; // removed on one side
      out.set(k, x);
    }
    return [...out.values()];
  }

  // when both sides changed the same thing: months, the tick log and settings combine, the rest goes to the newest
  function merge(kind, mine, theirs, theirsNewer, base) {
    const [older, newer] = theirsNewer ? [mine, theirs] : [theirs, mine];
    if (kind === 'month') {
      const b = base || { notes: {}, hl: '', els: [] };
      const notes = {};
      new Set([...Object.keys(older.notes), ...Object.keys(newer.notes)]).forEach(d => {
        if (d in b.notes && !(d in older.notes && d in newer.notes)) return; // cleared on one side
        notes[d] = d in newer.notes ? newer.notes[d] : older.notes[d];
      });
      // the highlights: whichever side changed them, or the newer if both did
      const hl = mine.hl === b.hl ? theirs.hl : theirs.hl === b.hl ? mine.hl : newer.hl;
      return { notes, hl, els: mergeById(base && b.els, older.els, newer.els, e => e.id) };
    }
    if (kind === 'prefs') { // a new device's blank name doesn't wipe out the one you set
      const out = { ...older };
      Object.entries(newer).forEach(([k, v]) => { if (v !== '' && v != null) out[k] = v; });
      return out;
    }
    if (kind === 'log') return mergeById(base, older, newer, x => x.i);
    return newer;
  }

  async function run() {
    if (!session || !app) return;
    if (!navigator.onLine) { setStatus('offline'); return; }
    setStatus('syncing');
    const uid = session.user.id;
    try {
      // 1. what changed here since the last sync
      let docs = app.docs();
      const now = Date.now();
      for (const [k, d] of docs) if (hashOf(d) !== meta.base[k] && !meta.dirty[k]) meta.dirty[k] = now;
      for (const k in meta.base) if (!docs.has(k) && !meta.dirty[k]) meta.dirty[k] = now;
      for (const k in meta.dirty) if (hashOf(docs.get(k)) === meta.base[k]) delete meta.dirty[k];
      // 2. what other devices changed (a few seconds of overlap, in case changes landed out of order)
      let q = '/rest/v1/items?select=kind,id,data,updated,deleted,synced_at&order=synced_at.asc&limit=5000';
      if (meta.cursor) q += '&synced_at=gt.' + encodeURIComponent(new Date(time(meta.cursor) - 5000).toISOString());
      const rows = await (await api(q)).json();
      let changed = false;
      for (const row of rows) {
        const k = row.kind + ':' + row.id;
        const theirs = row.deleted ? undefined : row.data;
        const th = hashOf(theirs);
        if (!meta.cursor || time(row.synced_at) > time(meta.cursor)) meta.cursor = row.synced_at;
        meta.ver[k] = row.synced_at;
        // unchanged since this device last synced (often its own push coming back): what's here stands
        if (th === meta.base[k]) continue;
        const mine = docs.get(k);
        if (!meta.dirty[k]) {
          app.apply(k, theirs === undefined ? null : theirs); // untouched here: take theirs
          changed = true;
        } else if (theirs !== undefined && mine === undefined) {
          if (row.updated > meta.dirty[k]) { app.apply(k, theirs); changed = true; } // they edited after we deleted
        } else if (theirs !== undefined) {
          const merged = merge(row.kind, mine, theirs, row.updated > meta.dirty[k], meta.prev[k]);
          // a month or day that ends up with nothing left is removed, not kept empty
          app.apply(k, row.kind === 'log' && !merged.length ? null : merged);
          changed = true;
        } // deleted there but changed here: keep ours, it gets pushed back below
        setBase(k, theirs);
      }
      if (changed) { docs = app.docs(); app.changed(); }

      // 3. push what's different from the server now
      const out = [];
      for (const k of new Set([...docs.keys(), ...Object.keys(meta.dirty)])) {
        const d = docs.get(k), h = hashOf(d);
        if (h === meta.base[k]) { delete meta.dirty[k]; continue; }
        const i = k.indexOf(':');
        out.push({ k, h, row: { user_id: uid, kind: k.slice(0, i), id: k.slice(i + 1), data: d === undefined ? null : d, updated: meta.dirty[k] || now, deleted: d === undefined } });
      }
      const pushed = (x, ver) => {
        setBase(x.k, x.row.deleted ? undefined : x.row.data);
        meta.ver[x.k] = ver;
        delete meta.dirty[x.k];
        delete conflicts[x.k];
      };
      const lost = x => { // another device changed it first: the next sync merges theirs in and pushes again
        conflicts[x.k] = (conflicts[x.k] || 0) + 1;
        again = true;
      };
      // things the account has: replace only the version this device saw
      // (after a few lost races in a row, just write it, rather than going round forever)
      for (const x of out.filter(x => meta.ver[x.k] && (conflicts[x.k] || 0) < 4)) {
        const q = `/rest/v1/items?kind=eq.${encodeURIComponent(x.row.kind)}&id=eq.${encodeURIComponent(x.row.id)}` +
          `&synced_at=eq.${encodeURIComponent(meta.ver[x.k])}&select=synced_at`;
        const got = await (await api(q, {
          method: 'PATCH',
          headers: { Prefer: 'return=representation' },
          json: { data: x.row.data, updated: x.row.updated, deleted: x.row.deleted },
        })).json();
        if (got.length) pushed(x, got[0].synced_at); else lost(x);
        write(META, meta);
      }
      // new things: add them, unless another device added the same thing first
      const added = out.filter(x => !meta.ver[x.k]);
      for (let i = 0; i < added.length; i += 100) {
        const part = added.slice(i, i + 100);
        const got = await (await api('/rest/v1/items?on_conflict=user_id,kind,id&select=kind,id,synced_at', {
          method: 'POST',
          headers: { Prefer: 'resolution=ignore-duplicates,return=representation' },
          json: part.map(x => x.row),
        })).json();
        const made = new Map(got.map(r => [r.kind + ':' + r.id, r.synced_at]));
        part.forEach(x => { if (made.has(x.k)) pushed(x, made.get(x.k)); else lost(x); });
        write(META, meta);
      }
      // the last resort for something that keeps losing: write it as it is
      const stuck = out.filter(x => meta.ver[x.k] && (conflicts[x.k] || 0) >= 4);
      if (stuck.length) {
        const got = await (await api('/rest/v1/items?on_conflict=user_id,kind,id&select=kind,id,synced_at', {
          method: 'POST',
          headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
          json: stuck.map(x => x.row),
        })).json();
        const made = new Map(got.map(r => [r.kind + ':' + r.id, r.synced_at]));
        stuck.forEach(x => pushed(x, made.get(x.k) || meta.ver[x.k]));
        write(META, meta);
      }

      // 4. photos and drawings this device has that the account doesn't yet
      const todo = [...app.photoIds()].filter(id => !meta.up[id]);
      for (const id of todo.slice(0, 12)) {
        const blob = await window.Recap.photos.get(id);
        if (!blob) continue; // made on another device; it fetches on its own
        await api(`/storage/v1/object/photos/${uid}/${id}`, {
          method: 'POST',
          headers: { 'x-upsert': 'true', 'Content-Type': blob.type || 'application/octet-stream' },
          body: blob,
        });
        meta.up[id] = 1;
        write(META, meta);
      }
      if (todo.length > 12) again = true;

      meta.at = Date.now();
      write(META, meta);
      setStatus('idle');
    } catch (e) {
      write(META, meta);
      setStatus(!session ? 'idle' : navigator.onLine ? 'error' : 'offline');
    }
  }

  function schedule(delay = 1500) {
    if (!session) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (running) { again = true; return; }
      running = run().finally(() => {
        running = null;
        if (again) { again = false; schedule(400); }
      });
    }, delay);
  }

  // ---------- photos follow along ----------

  const P = window.Recap.photos;
  P.fetchRemote = async id => {
    if (!session) return null;
    try {
      const res = await api(`/storage/v1/object/authenticated/photos/${session.user.id}/${id}`);
      if (meta) meta.up[id] = 1;
      return await res.blob();
    } catch (e) {
      return null;
    }
  };
  P.onPut = () => schedule();
  P.onDel = id => {
    if (!session) return;
    if (meta) delete meta.up[id];
    api(`/storage/v1/object/photos/${session.user.id}/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  function init(a) {
    app = a;
    if (session && !meta) meta = fresh(session.user.id);
    if (meta && !meta.prev) meta.prev = {}; // saved before months kept their last synced copy
    // saved before pushes were checked against the server's version: read everything once to learn them
    if (meta && !meta.ver) { meta.ver = {}; meta.cursor = null; }
    schedule(0);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') schedule(0); });
    window.addEventListener('online', () => schedule(0));
    setInterval(() => { if (document.visibilityState === 'visible') schedule(0); }, 45000);
  }

  window.Sync = {
    init,
    schedule,
    signUp,
    signIn,
    signOut,
    forgot,
    google,
    setPassword,
    fromLink,
    now: () => schedule(0),
    user: () => session && session.user,
    state: () => ({ status, at: meta ? meta.at : 0 }),
    onStatus: fn => listeners.add(fn),
  };
})();
