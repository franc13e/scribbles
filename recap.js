// Monthly recap helpers: sticker art, photo storage and the image / PDF export.
// app.js draws the month page; everything here is shared by the page and the export.
(() => {
  'use strict';

  // ---------- page geometry ----------
  // the month board is measured in "board units": 1 unit = 1% of the board's width
  // (cqw on screen, a fixed pixel size in the export), so it looks the same everywhere

  const WK = 7;    // weekday row height
  const CELL = 20; // day cell height

  // ---------- sticker art ----------
  // explicit colours (not currentColor) so the same SVG works on screen and in the export

  const INK = '#1E1E1E', PAP = '#FFFDF9', PINK = '#F2C4C4', YEL = '#F7E3A1', BLUE = '#BCD4EC',
    CHERRY = '#E8908A', RED = '#D9534F';

  const ln = (d, c = INK, w = 2.2, x = '') =>
    `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${x}/>`;
  const sh = (d, fill, w = 2) => `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${w}" stroke-linejoin="round"/>`;
  const ring = (cx, cy, r, fill, w = 2) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${INK}" stroke-width="${w}"/>`;
  const dot = (cx, cy, r, f = INK) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}"/>`;
  const tape = fill => `<path d="M3 3h58l-2 3.5 2 3.5-2 3.5 2 3.5H3l2-3.5-2-3.5 2-3.5z" fill="${fill}"/>`;

  // [id, tray tab, viewBox width, viewBox height, art]
  const STICKERS = [
    ['star', 'doodles', 48, 48, sh('M24 4.5l5.6 12.6 13.7 1.4-10.3 9.2 3 13.5L24 34.2 12 41.2l3-13.5L4.7 18.5l13.7-1.4z', YEL)],
    ['heart', 'doodles', 48, 48, sh('M24 41C11 32 5.5 24 7.5 16.5 9.5 9 18.5 8 24 15c5.5-7 14.5-6 16.5 1.5C42.5 24 37 32 24 41z', PINK)],
    ['mochi', 'doodles', 48, 42, sh('M6 36C3 22 12 9 24 9s21 13 18 27c-1 3-6 3-18 3S7 39 6 36z', PAP) +
      ln('M24 9c0-3.5 2-5.5 5.5-5.5M24 9c-1-2.5-3.5-4-6.5-3.2', INK, 1.8) + dot(18, 24, 1.8) + dot(30, 24, 1.8) +
      ln('M22 28.5q2 2 4 0', INK, 1.6) + dot(13.5, 28.5, 2.6, PINK) + dot(34.5, 28.5, 2.6, PINK)],
    ['sparkle', 'doodles', 48, 48, sh('M24 3c1 12 6 18 21 21-15 3-20 9-21 21-1-12-6-18-21-21 15-3 20-9 21-21z', YEL, 1.8)],
    ['sun', 'doodles', 48, 48, ring(24, 24, 8.5, YEL) +
      ln('M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M38.1 9.9l-4.2 4.2M14.1 33.9l-4.2 4.2')],
    ['cloud', 'doodles', 52, 34, sh('M13 30C6 30 4 22 10 19.5 9 12 18 9 22 14c2-8 15-8 16 1 8 0 9 15 0 15z', PAP)],
    ['flower', 'doodles', 48, 48, [[24, 12], [35.4, 20.3], [31, 33.7], [17, 33.7], [12.6, 20.3]]
      .map(([x, y]) => ring(x, y, 7, PAP, 1.8)).join('') + ring(24, 24, 6, YEL, 1.8)],
    ['moon', 'doodles', 48, 48, sh('M31 6a18 18 0 1 0 12 28A15 15 0 0 1 31 6z', YEL)],
    ['smiley', 'doodles', 48, 48, ring(24, 24, 18, YEL) + dot(18, 21, 1.9) + dot(30, 21, 1.9) + ln('M17 28q7 7 14 0')],
    ['rainbow', 'doodles', 52, 30, ln('M5 28a21 21 0 0 1 42 0', PINK, 5) + ln('M11 28a15 15 0 0 1 30 0', YEL, 5) +
      ln('M17 28a9 9 0 0 1 18 0', BLUE, 5)],
    ['cherry', 'doodles', 48, 48, ln('M15 31C18 20 24 12 32 6M32 6c-2 8-1 15 2 21M32 6c3-1 7 0 9 3-3 2-7 1-9-3') +
      ring(14, 35, 7, CHERRY) + ring(34, 32, 7, CHERRY)],
    ['music', 'doodles', 48, 48, ln('M18 36V12l20-5v24') + '<ellipse cx="13.5" cy="36" rx="5" ry="4" fill="#1E1E1E"/>' +
      '<ellipse cx="33.5" cy="31" rx="5" ry="4" fill="#1E1E1E"/>'],
    ['cup', 'doodles', 48, 48, sh('M9 18h24v9a10 10 0 0 1-10 10h-4A10 10 0 0 1 9 27z', PAP) +
      ln('M33 21h3a5 5 0 0 1 0 10h-3M17 6c-2 3 2 5 0 8M24 6c-2 3 2 5 0 8')],

    ['zigzag', 'scribbles', 64, 16, ln('M2 10l6-6 5 8 6-9 5 9 6-8 5 8 6-9 5 9 6-8 5 6')],
    ['spiral', 'scribbles', 48, 48, ln('M24 24c2-2 5 0 4 3-1 4-7 4-9 0-2-6 4-11 10-9 8 3 8 14 0 18-10 4-19-4-17-13 2-11 16-16 25-9')],
    ['loops', 'scribbles', 72, 26, ln('M2 18C8 18 10 6 16 8S14 22 10 18 18 6 26 10 26 22 22 18 30 6 38 10 38 22 34 18 42 6 50 10 50 22 46 18 56 8 70 12')],
    ['ball', 'scribbles', 48, 48, ln('M14 20C18 8 38 10 36 22S12 36 12 26 32 12 34 24 16 38 16 28 30 18 30 26 20 32 22 26', INK, 2)],
    ['circle', 'scribbles', 64, 38, ln('M10 21C6 9 52 3 57 17c4 14-38 20-48 8-5-7 10-16 22-17', RED, 2)],
    ['wave', 'scribbles', 64, 14, ln('M2 8c5-5 9-5 13 0s9 5 13 0 9-5 13 0 9 5 13 0 7-4 9-2')],
    ['highlight', 'scribbles', 64, 24, ln('M5 13c18-3 36-3 54 0', YEL, 11, ' opacity=".85"')],
    ['cross', 'scribbles', 48, 48, ln('M9 10c10 9 20 19 30 29M39 9C29 19 19 29 9 39')],
    ['hatch', 'scribbles', 48, 48, ln('M8 20L20 8M8 30L30 8M8 40L40 8M18 40l22-22M28 40l12-12', INK, 1.8)],
    ['burst', 'scribbles', 48, 48, ln('M24 5v9M10 11l6 7M38 11l-6 7M6 24h8M34 24h8')],
    ['star-line', 'scribbles', 48, 48, ln('M24 5l11 36L6 18h36L13 41z', INK, 2)],
    ['dots', 'scribbles', 48, 48, dot(10, 12, 2.5) + dot(22, 8, 1.8) + dot(34, 14, 2.6) + dot(14, 26, 1.7) +
      dot(28, 24, 2.8) + dot(40, 30, 1.8) + dot(18, 38, 2.4) + dot(32, 40, 1.6)],

    ['tape', 'tape', 64, 20, tape('rgba(226,215,201,.85)')],
    ['tape-pink', 'tape', 64, 20, tape('rgba(242,196,196,.8)')],
    ['tape-stripe', 'tape', 64, 20, tape('rgba(188,212,236,.75)') +
      '<path d="M12 3l-5 14M22 3l-5 14M32 3l-5 14M42 3l-5 14M52 3l-5 14" stroke="rgba(255,255,255,.75)" stroke-width="3"/>'],
    ['arrow', 'tape', 64, 20, ln('M4 11c18-3 36 2 54-1M50 4l9 6-8 7')],
    ['arrow-curly', 'tape', 56, 48, ln('M6 42C10 22 30 10 34 22C38 34 20 34 22 22C24 10 40 6 50 10M42 4L51 10L43 17')],
    ['arrow-both', 'tape', 72, 18, ln('M8 9h56M14 3L7 9l7 6M58 3l7 6-7 6')],
    ['arrow-down', 'tape', 40, 56, ln('M8 4c26 4 30 30 16 46M16 43l8 8 8-7')],
    ['arrow-loop', 'tape', 64, 36, ln('M4 30C14 30 18 6 28 10C36 13 26 26 22 18C18 10 40 6 58 12M50 5L59 12L50 18')],
  ].map(([id, tab, w, h, art]) => ({ id, tab, w, h, art }));

  const stickerById = id => STICKERS.find(s => s.id === id);
  const stickerSvg = (s, attrs = '') =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s.w} ${s.h}" ${attrs}>${s.art}</svg>`;

  // ready-made words; they're text bits with a shape, so you can edit them after
  const STAMPS = [
    ['have a nice\nweekend', 'pill'], ['day off', 'tag'], ['yay!', 'bubble'], ['nothing', 'plain'],
    ['best day ever', 'plain'], ['lazy day', 'pill'], ['me time', 'tag'], ['oops', 'bubble'],
    ['good vibes', 'pill'], ['hmm…', 'bubble'], ['rest', 'tag'], ['done!', 'pill'],
  ];
  const SHAPES = ['plain', 'pill', 'bubble', 'tag'];
  // padding around text bits, in ems [x, y]; style.css uses the same numbers
  const PADS = { plain: [0, 0], pill: [.7, .25], bubble: [.6, .3], tag: [.6, .2] };

  // ---------- photos ----------
  // photos are too big for localStorage, so they live in IndexedDB, shrunk to 1200px

  let dbp = null;
  const db = () => dbp || (dbp = new Promise((ok, bad) => {
    const r = indexedDB.open('scribble-photos', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('photos');
    r.onsuccess = () => ok(r.result);
    r.onerror = () => bad(r.error);
  }));
  const tx = (mode, fn) => db().then(d => new Promise((ok, bad) => {
    const t = d.transaction('photos', mode);
    const req = fn(t.objectStore('photos'));
    t.oncomplete = () => ok(req && req.result);
    t.onerror = () => bad(t.error);
  }));

  const urls = new Map(); // photo id -> object URL
  // fetchRemote / onPut / onDel are filled in by sync.js when signed in, so photos follow you between devices
  const photos = {
    put: (id, blob) => tx('readwrite', s => s.put(blob, id)).then(() => {
      urls.set(id, URL.createObjectURL(blob));
      if (photos.onPut) photos.onPut(id);
    }),
    del: id => {
      if (photos.onDel) photos.onDel(id);
      return tx('readwrite', s => s.delete(id)).catch(() => {});
    },
    get: id => tx('readonly', s => s.get(id)),
    cached: id => urls.get(id) || '',
    url: id => urls.has(id) ? Promise.resolve(urls.get(id)) : tx('readonly', s => s.get(id)).then(async b => {
      if (!b && photos.fetchRemote) {
        b = await photos.fetchRemote(id).catch(() => null);
        if (b) await tx('readwrite', s => s.put(b, id));
      }
      if (!b) return '';
      if (!urls.has(id)) urls.set(id, URL.createObjectURL(b));
      return urls.get(id);
    }),
  };

  const loadImage = src => new Promise((ok, bad) => {
    const i = new Image();
    i.onload = () => ok(i);
    i.onerror = bad;
    i.src = src;
  });

  // returns { blob, a } where a = height / width
  async function shrinkPhoto(file) {
    const src = URL.createObjectURL(file);
    try {
      const img = await loadImage(src);
      const k = Math.min(1, 1200 / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.round(img.naturalWidth * k);
      c.height = Math.round(img.naturalHeight * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      const blob = await new Promise(ok => c.toBlob(ok, 'image/jpeg', .85));
      return { blob, a: c.height / c.width };
    } finally {
      URL.revokeObjectURL(src);
    }
  }

  // cuts the square at (x, y) with side s (in the photo's own pixels) out of a photo, at most 1000px across
  async function cropSquare(src, x, y, s) {
    const img = await loadImage(src);
    const out = Math.min(1000, Math.round(s));
    const c = document.createElement('canvas');
    c.width = c.height = out;
    c.getContext('2d').drawImage(img, x, y, s, s, 0, 0, out, out);
    return new Promise(ok => c.toBlob(ok, 'image/jpeg', .88));
  }

  // ---------- export ----------

  const FONTS = ['Gochi Hand', 'Patrick Hand'];

  function wrap(ctx, text, max) {
    const out = [];
    String(text).split('\n').forEach(para => {
      let line = '';
      para.split(/\s+/).filter(Boolean).forEach(word => {
        const t = line ? line + ' ' + word : word;
        if (ctx.measureText(t).width <= max || !line) line = t;
        else { out.push(line); line = word; }
      });
      out.push(line);
    });
    return out;
  }

  function rrect(ctx, x, y, w, h, r) {
    const [a, b, c, d] = Array.isArray(r) ? r : [r, r, r, r];
    ctx.beginPath();
    ctx.moveTo(x + a, y);
    ctx.arcTo(x + w, y, x + w, y + h, b);
    ctx.arcTo(x + w, y + h, x, y + h, c);
    ctx.arcTo(x, y + h, x, y, d);
    ctx.arcTo(x, y, x + w, y, a);
    ctx.closePath();
  }

  // a text bit (typed text or a stamp), centred on 0,0; fs = font size in px
  function drawText(ctx, e, fs) {
    const lines = String(e.t).split('\n');
    ctx.font = `${fs}px "Gochi Hand"`;
    const lh = fs * 1.05;
    const tw = Math.max(...lines.map(l => ctx.measureText(l).width));
    const [px, py] = PADS[e.shape] || PADS.plain;
    const w = tw + px * 2 * fs, h = lines.length * lh + py * 2 * fs;
    const x = -w / 2, y = -h / 2;
    ctx.lineWidth = fs * .08;
    ctx.strokeStyle = INK;
    if (e.shape === 'pill') {
      rrect(ctx, x, y, w, h, h / 2);
      ctx.fillStyle = 'rgba(253,248,242,.9)'; ctx.fill(); ctx.stroke();
    } else if (e.shape === 'bubble') {
      const r = fs * .6;
      rrect(ctx, x, y, w, h, [r, r, r, fs * .15]);
      ctx.fillStyle = PAP; ctx.fill(); ctx.stroke();
    } else if (e.shape === 'tag') {
      rrect(ctx, x, y, w, h, fs * .3);
      ctx.fillStyle = INK; ctx.fill();
    }
    ctx.fillStyle = e.shape === 'tag' ? '#FDF8F2' : INK;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    lines.forEach((l, i) => ctx.fillText(l, 0, y + py * fs + lh * (i + .5) + fs * .04));
  }

  // a photo with its frame, centred on 0,0; w = width in px
  function drawPhoto(ctx, img, e, w) {
    const a = e.frame === 'round' ? 1 : (e.a || .75);
    // crop the photo to the frame's shape, like object-fit: cover
    const cover = (dx, dy, dw, dh) => {
      const ir = img.naturalHeight / img.naturalWidth, fr = dh / dw;
      let sw = img.naturalWidth, shh = img.naturalHeight, sx = 0, sy = 0;
      if (ir > fr) { shh = sw * fr; sy = (img.naturalHeight - shh) / 2; } else { sw = shh / fr; sx = (img.naturalWidth - sw) / 2; }
      ctx.drawImage(img, sx, sy, sw, shh, dx, dy, dw, dh);
    };
    ctx.save();
    if (e.frame === 'round') {
      const r = w / 2;
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.save(); ctx.clip();
      cover(-r, -r, w, w);
      ctx.restore();
      ctx.lineWidth = w * .025; ctx.strokeStyle = INK; ctx.stroke();
    } else if (e.frame === 'polaroid') {
      const p = w * .05, b = w * .16, iw = w - p * 2, ih = iw * a, h = p + ih + b;
      ctx.shadowColor = 'rgba(30,30,30,.18)'; ctx.shadowBlur = w * .05; ctx.shadowOffsetY = w * .015;
      ctx.fillStyle = PAP; ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.shadowColor = 'transparent';
      cover(-w / 2 + p, -h / 2 + p, iw, ih);
    } else {
      const h = w * a;
      if (e.frame === 'plain') { rrect(ctx, -w / 2, -h / 2, w, h, w * .04); ctx.save(); ctx.clip(); cover(-w / 2, -h / 2, w, h); ctx.restore(); }
      else cover(-w / 2, -h / 2, w, h);
      if (e.frame === 'taped') {
        ctx.translate(0, -h / 2);
        ctx.rotate(-3 * Math.PI / 180);
        ctx.fillStyle = 'rgba(226,215,201,.9)';
        ctx.fillRect(-w * .2, -w * .06, w * .4, w * .12);
      }
    }
    ctx.restore();
  }

  // draws the whole month page; returns a canvas
  // page = { title, sub, stats, highlights, cells: [{ n, out, note, ticks }], rows, els, showTicks, dots }
  async function renderPage(page) {
    try { await Promise.all(FONTS.map(f => document.fonts.load(`40px "${f}"`))); } catch (e) { /* fall back */ }

    const W = 1200, pad = 64, B = W - pad * 2, u = B / 100, K = 1.5;
    const probe = document.createElement('canvas').getContext('2d');
    probe.font = '34px "Patrick Hand"';
    const hl = page.highlights.trim() ? wrap(probe, page.highlights.trim(), B).slice(0, 6) : [];
    const boardTop = pad + 150 + (hl.length ? hl.length * 44 + 26 : 0);
    const boardH = (WK + page.rows * CELL) * u;
    const H = Math.round(boardTop + boardH + 96);

    const c = document.createElement('canvas');
    c.width = W * K;
    c.height = H * K;
    const ctx = c.getContext('2d');
    ctx.scale(K, K);

    ctx.fillStyle = '#FDF8F2';
    ctx.fillRect(0, 0, W, H);
    if (page.dots) {
      ctx.fillStyle = 'rgba(30,30,30,.08)';
      for (let y = 14; y < H; y += 28) for (let x = 14; x < W; x += 28) { ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill(); }
    }

    // header
    ctx.fillStyle = INK;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    ctx.font = '112px "Gochi Hand"';
    ctx.fillText(page.title, pad, pad + 92);
    ctx.textAlign = 'right';
    ctx.font = '34px "Patrick Hand"';
    ctx.fillText(page.sub, W - pad, pad + 42);
    ctx.fillStyle = '#4A4743';
    ctx.font = '28px "Patrick Hand"';
    ctx.fillText(page.stats, W - pad, pad + 84);
    ctx.textAlign = 'left';
    ctx.fillStyle = INK;
    ctx.font = '34px "Patrick Hand"';
    hl.forEach((l, i) => ctx.fillText(l, pad, pad + 168 + i * 44));

    // calendar
    const x0 = pad, y0 = boardTop, cw = B / 7, ch = CELL * u, gy = y0 + WK * u;
    ctx.fillStyle = '#4A4743';
    ctx.font = `${3.6 * u}px "Patrick Hand"`;
    ctx.textAlign = 'center';
    ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach((d, i) => ctx.fillText(d, x0 + cw * (i + .5), y0 + WK * u * .62));
    ctx.strokeStyle = '#DCD3C8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i <= 7; i++) { ctx.moveTo(x0 + cw * i, gy); ctx.lineTo(x0 + cw * i, gy + page.rows * ch); }
    for (let r = 1; r <= page.rows; r++) { ctx.moveTo(x0, gy + r * ch); ctx.lineTo(x0 + B, gy + r * ch); }
    ctx.stroke();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(x0, gy); ctx.lineTo(x0 + B, gy); ctx.stroke();

    ctx.textAlign = 'left';
    page.cells.forEach((cell, i) => {
      const cx = x0 + (i % 7) * cw, cy = gy + Math.floor(i / 7) * ch;
      ctx.fillStyle = cell.out ? '#B8B0A6' : INK;
      ctx.font = `${3.4 * u}px "Patrick Hand"`;
      ctx.fillText(String(cell.n), cx + u, cy + 4 * u);
      if (cell.out) return;
      if (cell.note) {
        ctx.font = `${3 * u}px "Patrick Hand"`;
        ctx.fillStyle = INK;
        wrap(ctx, cell.note, cw - 2 * u).slice(0, 3).forEach((l, k) => ctx.fillText(l, cx + u, cy + 7.6 * u + k * 3.3 * u));
      }
      if (page.showTicks && cell.ticks) {
        ctx.font = `${2.8 * u}px "Patrick Hand"`;
        const t = '✓ ' + cell.ticks, tw = ctx.measureText(t).width;
        ctx.fillStyle = '#F5EEE6';
        rrect(ctx, cx + u, cy + ch - 4.6 * u, tw + 1.6 * u, 3.6 * u, 1.4 * u);
        ctx.fill();
        ctx.fillStyle = '#4A4743';
        ctx.fillText(t, cx + 1.8 * u, cy + ch - 1.8 * u);
      }
    });

    // photos, stickers and words, back to front
    const stickerImgs = {};
    await Promise.all(page.els.filter(e => e.type === 'sticker').map(async e => {
      const s = stickerById(e.k);
      if (!s) return;
      const px = Math.round(e.w * u * K * 2);
      const svg = stickerSvg(s, `width="${px}" height="${Math.round(px * s.h / s.w)}"`);
      try { stickerImgs[e.id] = await loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)); } catch (err) { /* skip */ }
    }));
    const photoImgs = {};
    await Promise.all(page.els.filter(e => e.type === 'photo' || e.type === 'draw').map(async e => {
      try { photoImgs[e.id] = await loadImage(await photos.url(e.p)); } catch (err) { /* skip */ }
    }));

    page.els.forEach(e => {
      ctx.save();
      ctx.translate(x0 + e.x * u, y0 + e.y * u);
      ctx.rotate((e.r || 0) * Math.PI / 180);
      if (e.type === 'photo' && photoImgs[e.id]) drawPhoto(ctx, photoImgs[e.id], e, e.w * u);
      if (e.type === 'sticker' && stickerImgs[e.id]) {
        const s = stickerById(e.k), w = e.w * u, h = w * s.h / s.w;
        ctx.drawImage(stickerImgs[e.id], -w / 2, -h / 2, w, h);
      }
      if (e.type === 'text') drawText(ctx, e, e.s * u);
      if (e.type === 'draw' && photoImgs[e.id]) {
        const w = e.w * u, h = w * e.a;
        ctx.drawImage(photoImgs[e.id], -w / 2, -h / 2, w, h);
      }
      ctx.restore();
    });

    ctx.fillStyle = '#9B948C';
    ctx.font = '24px "Patrick Hand"';
    ctx.textAlign = 'right';
    ctx.fillText('made with scribbles ✿', W - pad, H - 38);
    return c;
  }

  // text cut to fit max px, with an ellipsis
  function fit(ctx, t, max) {
    if (ctx.measureText(t).width <= max) return t;
    while (t.length > 1 && ctx.measureText(t + '…').width > max) t = t.slice(0, -1);
    return t.trimEnd() + '…';
  }

  // a shop's website and a little "opens elsewhere" arrow, starting at x on baseline by; returns its width
  function hostLine(ctx, host, x, by, max) {
    ctx.fillStyle = '#4A4743';
    const h = fit(ctx, host, max - 22);
    ctx.fillText(h, x, by);
    const ax = x + ctx.measureText(h).width + 8, ay = by - 7;
    ctx.strokeStyle = '#4A4743';
    ctx.lineWidth = 2;
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(ax, ay + 6); ctx.lineTo(ax + 12, ay - 6);
    ctx.moveTo(ax + 3, ay - 6); ctx.lineTo(ax + 12, ay - 6); ctx.lineTo(ax + 12, ay + 3);
    ctx.stroke();
    return ctx.measureText(h).width + 22;
  }

  // the wishlist page: wishes with a photo as taped-on cards, the rest as a notebook list underneath
  // (or everything as a list when photos are off); returns a canvas, with .links (where each wish
  // is, in canvas pixels) so the PDF can make them tappable
  // page = { title, sub, items: [{ t, done, host, url, photo (an image URL or '') }], photos, dots }
  async function renderWish(page) {
    try { await Promise.all(FONTS.map(f => document.fonts.load(`40px "${f}"`))); } catch (e) { /* fall back */ }

    const W = 1200, pad = 64, K = 1.5, cols = 3, gap = 40;
    const cw = (W - pad * 2 - gap * (cols - 1)) / cols, pic = cw - 28, ch = 14 + pic + 140, rowH = 80;
    const cards = page.photos ? page.items.filter(it => it.photo) : [];
    const rest = page.items.filter(it => !cards.includes(it));
    const top = pad + 200;
    const gridH = Math.ceil(cards.length / cols) * (ch + gap);
    const headH = cards.length && rest.length ? 76 : 0;
    const listTop = top + gridH + headH;
    const H = Math.round(listTop + rest.length * rowH + (rest.length ? 30 : 0) + 90);

    const c = document.createElement('canvas');
    c.width = W * K;
    c.height = H * K;
    const ctx = c.getContext('2d');
    ctx.scale(K, K);
    ctx.fillStyle = '#FDF8F2';
    ctx.fillRect(0, 0, W, H);
    if (page.dots) {
      ctx.fillStyle = 'rgba(30,30,30,.08)';
      for (let y = 14; y < H; y += 28) for (let x = 14; x < W; x += 28) { ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill(); }
    }

    ctx.fillStyle = INK;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    ctx.font = '100px "Gochi Hand"';
    ctx.fillText(page.title, pad, pad + 86);
    ctx.fillStyle = '#4A4743';
    ctx.font = '32px "Patrick Hand"';
    ctx.fillText(page.sub, pad + 4, pad + 136);

    const links = [];

    // the cards
    const imgs = await Promise.all(cards.map(it => loadImage(it.photo).catch(() => null)));
    cards.forEach((it, i) => {
      const col = i % cols, row = Math.floor(i / cols);
      const x = pad + col * (cw + gap), y = top + row * (ch + gap);
      ctx.save();
      ctx.translate(x + cw / 2, y + ch / 2);
      ctx.rotate([-.9, .7, -.4][(i + row) % 3] * Math.PI / 180);
      const L = -cw / 2, T = -ch / 2;

      rrect(ctx, L, T, cw, ch, 22);
      ctx.fillStyle = PAP;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = INK;
      ctx.stroke();

      const px = L + 14, py = T + 14;
      ctx.save();
      rrect(ctx, px, py, pic, pic, 14);
      ctx.clip();
      const img = imgs[i];
      if (img) {
        const s = Math.min(img.naturalWidth, img.naturalHeight);
        ctx.drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) / 2, s, s, px, py, pic, pic);
      } else {
        ctx.fillStyle = '#EBE3DA';
        ctx.fillRect(px, py, pic, pic);
      }
      if (it.done) { ctx.fillStyle = 'rgba(253,248,242,.45)'; ctx.fillRect(px, py, pic, pic); }
      ctx.restore();
      if (it.done) {
        ctx.save();
        ctx.translate(px + pic - 70, py + pic - 34);
        ctx.rotate(-6 * Math.PI / 180);
        drawText(ctx, { t: 'got it ✓', shape: 'tag' }, 30);
        ctx.restore();
      }

      ctx.save();
      ctx.translate(-14, T - 2);
      ctx.rotate(-4 * Math.PI / 180);
      ctx.fillStyle = 'rgba(226,215,201,.85)';
      ctx.fillRect(-46, -12, 92, 26);
      ctx.restore();

      // the name (two lines at most) and where it's from
      ctx.fillStyle = INK;
      ctx.textAlign = 'left';
      ctx.font = '36px "Gochi Hand"';
      let lines = wrap(ctx, it.t, pic);
      if (lines.length > 2) lines = [lines[0], fit(ctx, lines[1] + '…', pic)];
      lines.forEach((l, k) => ctx.fillText(l, px, py + pic + 46 + k * 38));
      if (it.host) {
        ctx.font = '25px "Patrick Hand"';
        hostLine(ctx, it.host, px, T + ch - 20, pic);
      }
      ctx.restore();
      if (it.url) links.push({ x: x * K, y: y * K, w: cw * K, h: ch * K, url: it.url });
    });

    // the list: a tick circle, the wish, and its shop on the right
    if (headH) {
      ctx.fillStyle = INK;
      ctx.font = '42px "Gochi Hand"';
      ctx.fillText('also wishing for…', pad, top + gridH + 36);
    }
    rest.forEach((it, i) => {
      const y = listTop + i * rowH, mid = y + rowH / 2, cx = pad + 20;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2.6;
      ctx.lineCap = ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.arc(cx, mid, 17, 0, Math.PI * 2);
      ctx.stroke();
      if (it.done) {
        ctx.lineWidth = 3.6;
        ctx.beginPath();
        ctx.moveTo(cx - 10, mid + 1); ctx.lineTo(cx - 3, mid + 8); ctx.lineTo(cx + 12, mid - 10);
        ctx.stroke();
      }

      let hostW = 0;
      if (it.host) {
        ctx.font = '27px "Patrick Hand"';
        const w = Math.min(320, ctx.measureText(it.host).width + 22);
        hostW = hostLine(ctx, it.host, W - pad - w, mid + 9, 320) + 24;
      }

      const nx = pad + 56;
      ctx.font = '38px "Patrick Hand"';
      ctx.fillStyle = it.done ? '#9B948C' : INK;
      const name = fit(ctx, it.t, W - pad - nx - hostW);
      ctx.fillText(name, nx, mid + 12);
      if (it.done) { // crossed out with a crayon scribble, like in the app
        const x1 = nx + ctx.measureText(name).width + 6;
        ctx.strokeStyle = '#4A4743';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nx - 6, mid + 2);
        for (let x = nx + 6, k = 0; x < x1; x += 14, k++) ctx.lineTo(x, mid + (k % 2 ? 5 : -3));
        ctx.lineTo(x1, mid + 1);
        ctx.stroke();
      }

      ctx.save();
      ctx.setLineDash([8, 7]);
      ctx.strokeStyle = '#DCD3C8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pad, y + rowH);
      ctx.lineTo(W - pad, y + rowH);
      ctx.stroke();
      ctx.restore();
      if (it.url) links.push({ x: pad * K, y: y * K, w: (W - pad * 2) * K, h: rowH * K, url: it.url });
    });

    ctx.fillStyle = '#9B948C';
    ctx.font = '24px "Patrick Hand"';
    ctx.textAlign = 'right';
    ctx.fillText('made with scribbles ✿', W - pad, H - 38);
    c.links = links;
    return c;
  }

  // a one-page PDF around a JPEG; the JPEG goes in as-is, so no PDF library is needed.
  // links = [{ x, y, w, h, url }] in image pixels become tappable areas on the page
  function pdfFromJpeg(bytes, w, h, links = []) {
    const enc = new TextEncoder();
    const parts = [];
    const offs = [];
    let len = 0;
    const push = x => { const b = typeof x === 'string' ? enc.encode(x) : x; parts.push(b); len += b.length; };
    const obj = (n, body) => { offs[n] = len; push(`${n} 0 obj\n`); body(); push('\nendobj\n'); };
    const pw = 595.28, ph = +(pw * h / w).toFixed(2);
    const draw = `q ${pw} 0 0 ${ph} 0 0 cm /Im0 Do Q`;

    push('%PDF-1.4\n%âãÏÓ\n');
    obj(1, () => push('<< /Type /Catalog /Pages 2 0 R >>'));
    obj(2, () => push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'));
    const k = pw / w;
    const annots = links.map((_, i) => `${6 + i} 0 R`).join(' ');
    obj(3, () => push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R${
      links.length ? ` /Annots [${annots}]` : ''} >>`));
    obj(4, () => {
      push(`<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`);
      push(bytes);
      push('\nendstream');
    });
    obj(5, () => push(`<< /Length ${draw.length} >>\nstream\n${draw}\nendstream`));
    links.forEach((l, i) => obj(6 + i, () => {
      const rect = [l.x * k, ph - (l.y + l.h) * k, (l.x + l.w) * k, ph - l.y * k].map(v => v.toFixed(2)).join(' ');
      const uri = l.url.replace(/[^!-~]/g, encodeURIComponent).replace(/[\\()]/g, ch => '\\' + ch);
      push(`<< /Type /Annot /Subtype /Link /Rect [${rect}] /Border [0 0 0] /A << /S /URI /URI (${uri}) >> >>`);
    }));
    const n = 6 + links.length;
    const xref = len;
    push(`xref\n0 ${n}\n0000000000 65535 f \n` + Array.from({ length: n - 1 }, (_, i) => String(offs[i + 1]).padStart(10, '0') + ' 00000 n \n').join(''));
    push(`trailer\n<< /Size ${n} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
    return new Blob(parts, { type: 'application/pdf' });
  }

  async function exportBlob(canvas, fmt) {
    if (fmt === 'png') return new Promise(ok => canvas.toBlob(ok, 'image/png'));
    const jpg = await new Promise(ok => canvas.toBlob(ok, 'image/jpeg', .92));
    return pdfFromJpeg(new Uint8Array(await jpg.arrayBuffer()), canvas.width, canvas.height, canvas.links || []);
  }

  window.Recap = { WK, CELL, STICKERS, STAMPS, SHAPES, stickerById, stickerSvg, photos, shrinkPhoto, cropSquare, loadImage, renderPage, renderWish, exportBlob };
})();
