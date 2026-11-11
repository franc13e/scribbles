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
  // up: photo ids already in storage · cursor: newest server change seen · at: last good sync
  const fresh = uid => ({ uid, cursor: null, base: {}, dirty: {}, up: {}, at: 0 });

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

  // the tokens a password-reset link puts in the address
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

  // when both sides changed the same thing: months, the tick log and settings combine, the rest goes to the newest
  function merge(kind, mine, theirs, theirsNewer) {
    const [older, newer] = theirsNewer ? [mine, theirs] : [theirs, mine];
    if (kind === 'month') {
      const els = new Map(older.els.map(e => [e.id, e]));
      newer.els.forEach(e => els.set(e.id, e));
      return { notes: { ...older.notes, ...newer.notes }, hl: newer.hl || older.hl, els: [...els.values()] };
    }
    if (kind === 'prefs') { // a new device's blank name doesn't wipe out the one you set
      const out = { ...older };
      Object.entries(newer).forEach(([k, v]) => { if (v !== '' && v != null) out[k] = v; });
      return out;
    }
    if (kind === 'log') {
      const out = new Map(older.map(x => [x.i, x]));
      newer.forEach(x => out.set(x.i, x));
      return [...out.values()];
    }
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
        if (th === meta.base[k] && !meta.dirty[k]) continue; // nothing new, usually our own push coming back
        const mine = docs.get(k);
        if (!meta.dirty[k]) {
          app.apply(k, theirs === undefined ? null : theirs); // untouched here: take theirs
          changed = true;
        } else if (theirs !== undefined && mine === undefined) {
          if (row.updated > meta.dirty[k]) { app.apply(k, theirs); changed = true; } // they edited after we deleted
        } else if (theirs !== undefined) {
          app.apply(k, merge(row.kind, mine, theirs, row.updated > meta.dirty[k]));
          changed = true;
        } // deleted there but changed here: keep ours, it gets pushed back below
        if (th === undefined) delete meta.base[k]; else meta.base[k] = th;
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
      for (let i = 0; i < out.length; i += 100) {
        const part = out.slice(i, i + 100);
        await api('/rest/v1/items?on_conflict=user_id,kind,id', {
          method: 'POST',
          headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
          json: part.map(x => x.row),
        });
        part.forEach(x => {
          if (x.h === undefined) delete meta.base[x.k]; else meta.base[x.k] = x.h;
          delete meta.dirty[x.k];
        });
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
    setPassword,
    fromLink,
    now: () => schedule(0),
    user: () => session && session.user,
    state: () => ({ status, at: meta ? meta.at : 0 }),
    onStatus: fn => listeners.add(fn),
  };
})();
