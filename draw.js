// A full-screen drawing pad for doodles in notes and on the month page.
// Draw.open({ strokes }) resolves to { blob (PNG trimmed to the drawing), a (height / width),
// f (drawing width / pad width), strokes } or to null when cancelled or left empty.
(() => {
  'use strict';

  const SIZE = 1000; // strokes are kept in a 1000 x 1000 space, so they redraw at any size
  const COLOURS = ['#1E1E1E', '#9B948C', '#E0614F', '#F2A9B8', '#F2C94C', '#8CBF88', '#7DA8D9'];
  const TOOLS = {
    pen: { w: 7 },
    marker: { w: 26, alpha: .45 },
    eraser: { w: 44 },
  };

  const icon = body => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const ICONS = {
    pen: icon('<path d="M4 20l1.2-4.2L16 5l3 3L8.2 18.8z M14 7l3 3"/>'),
    marker: icon('<path d="M7 21h10 M9 17l-1-4 6-9 4 2.5-4.5 9.5z M8 13l6 3"/>'),
    eraser: icon('<path d="M8.5 20H20 M4.5 15.5l9-9a2 2 0 0 1 2.8 0l2.7 2.7a2 2 0 0 1 0 2.8L12 19H8z M9 11l5 5"/>'),
    undo: icon('<path d="M9 7L4 12l5 5 M4 12h11a5 5 0 0 1 0 10h-3"/>'),
    clear: icon('<path d="M5 7h14 M9.5 7V4.5h5V7 M7 7l1 13h8l1-13"/>'),
  };

  // pressure only means something for a pencil; fingers and mice draw an even line
  const thick = (s, p) => s.w * (s.pen ? .35 + p * 1.3 : 1);

  function drawStroke(ctx, s, k) {
    const pts = s.pts;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = s.c;
    ctx.fillStyle = s.c;
    if (s.t === 'eraser') ctx.globalCompositeOperation = 'destination-out';
    if (s.t === 'marker') ctx.globalAlpha = TOOLS.marker.alpha;
    if (pts.length === 1) { // a dot
      ctx.beginPath();
      ctx.arc(pts[0][0] * k, pts[0][1] * k, thick(s, pts[0][2]) * k / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (s.t === 'marker') {
      // one path, so the see-through ink doesn't darken where the pieces meet
      ctx.lineWidth = s.w * k;
      ctx.beginPath();
      ctx.moveTo(pts[0][0] * k, pts[0][1] * k);
      for (let i = 1; i < pts.length - 1; i++) {
        ctx.quadraticCurveTo(pts[i][0] * k, pts[i][1] * k, (pts[i][0] + pts[i + 1][0]) / 2 * k, (pts[i][1] + pts[i + 1][1]) / 2 * k);
      }
      ctx.lineTo(pts[pts.length - 1][0] * k, pts[pts.length - 1][1] * k);
      ctx.stroke();
    } else {
      // piece by piece, so the line can get thicker and thinner with pressure
      for (let i = 1; i < pts.length; i++) segment(ctx, s, i, k);
    }
    ctx.restore();
  }

  // the curve from the middle of the last piece to the middle of this one
  function segment(ctx, s, i, k) {
    const pts = s.pts, a = pts[i - 1], b = pts[i], z = pts[i - 2];
    const from = z ? [(z[0] + a[0]) / 2, (z[1] + a[1]) / 2] : a;
    const to = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    ctx.lineWidth = thick(s, (a[2] + b[2]) / 2) * k;
    ctx.beginPath();
    ctx.moveTo(from[0] * k, from[1] * k);
    ctx.quadraticCurveTo(a[0] * k, a[1] * k, to[0] * k, to[1] * k);
    ctx.stroke();
  }

  // the drawing cut down to just the inked part, plus a little room
  async function finish(strokes) {
    const c = document.createElement('canvas');
    c.width = c.height = SIZE;
    const ctx = c.getContext('2d');
    strokes.forEach(s => drawStroke(ctx, s, 1));
    const d = ctx.getImageData(0, 0, SIZE, SIZE).data;
    let x0 = SIZE, y0 = SIZE, x1 = -1, y1 = -1;
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (d[(y * SIZE + x) * 4 + 3] > 8) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
      }
    }
    if (x1 < 0) return null;
    const pad = 12;
    x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
    x1 = Math.min(SIZE, x1 + pad); y1 = Math.min(SIZE, y1 + pad);
    const out = document.createElement('canvas');
    out.width = x1 - x0;
    out.height = y1 - y0;
    out.getContext('2d').drawImage(c, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
    const blob = await new Promise(ok => out.toBlob(ok, 'image/png'));
    return { blob, a: out.height / out.width, f: out.width / SIZE, strokes };
  }

  function open(opts = {}) {
    return new Promise(resolve => {
      let strokes = (opts.strokes || []).map(s => ({ ...s, pts: s.pts.slice() }));
      const undo = [];
      let tool = 'pen', colour = COLOURS[0], cur = null, penSeen = false, busy = false;

      const wrap = document.createElement('div');
      wrap.className = 'draw-wrap';
      wrap.innerHTML = `
        <div class="draw-box" role="dialog" aria-label="Draw">
          <div class="draw-top">
            <button class="m-btn" data-d="cancel">cancel</button>
            <h2>draw something</h2>
            <button class="m-btn dark" data-d="done">done</button>
          </div>
          <div class="draw-pad"><canvas class="draw-base"></canvas><canvas class="draw-live"></canvas></div>
          <div class="draw-tools">
            ${Object.keys(TOOLS).map(t => `<button class="draw-tool" data-tool="${t}" aria-label="${t}">${ICONS[t]}<span>${t}</span></button>`).join('')}
            <span class="draw-gap"></span>
            <button class="draw-tool" data-d="undo" aria-label="Undo">${ICONS.undo}<span>undo</span></button>
            <button class="draw-tool" data-d="clear" aria-label="Clear">${ICONS.clear}<span>clear</span></button>
          </div>
          <div class="draw-colours">
            ${COLOURS.map(c => `<button class="draw-colour" data-colour="${c}" style="--c:${c}" aria-label="Colour ${c}"></button>`).join('')}
          </div>
        </div>`;
      (document.querySelector('.phone') || document.body).appendChild(wrap);

      const pad = wrap.querySelector('.draw-pad');
      const base = wrap.querySelector('.draw-base');
      const live = wrap.querySelector('.draw-live');
      const bctx = base.getContext('2d');
      const lctx = live.getContext('2d');
      let k = 1; // canvas px per stroke unit

      function size() {
        const css = pad.clientWidth;
        const px = Math.round(css * (window.devicePixelRatio || 1));
        base.width = base.height = live.width = live.height = px;
        k = px / SIZE;
        redraw();
      }
      function redraw() {
        bctx.clearRect(0, 0, base.width, base.height);
        strokes.forEach(s => drawStroke(bctx, s, k));
      }
      function paintTools() {
        wrap.querySelectorAll('[data-tool]').forEach(b => b.classList.toggle('on', b.dataset.tool === tool));
        wrap.querySelectorAll('[data-colour]').forEach(b => b.classList.toggle('on', b.dataset.colour === colour));
        wrap.querySelector('[data-d="undo"]').disabled = !undo.length;
        wrap.querySelector('[data-d="clear"]').disabled = !strokes.length;
      }

      const point = ev => {
        const r = pad.getBoundingClientRect();
        return [
          Math.round((ev.clientX - r.left) / r.width * SIZE * 10) / 10,
          Math.round((ev.clientY - r.top) / r.height * SIZE * 10) / 10,
          Math.round((ev.pointerType === 'pen' ? ev.pressure || .5 : .5) * 100) / 100,
        ];
      };

      pad.addEventListener('pointerdown', ev => {
        if (ev.pointerType === 'pen') penSeen = true;
        if (cur || (penSeen && ev.pointerType === 'touch')) return; // with a pencil, a resting palm doesn't draw
        ev.preventDefault();
        pad.setPointerCapture(ev.pointerId);
        cur = { id: ev.pointerId, s: { t: tool, c: colour, w: TOOLS[tool].w, pen: ev.pointerType === 'pen', pts: [point(ev)] } };
      });
      pad.addEventListener('pointermove', ev => {
        if (!cur || ev.pointerId !== cur.id) return;
        const evs = ev.getCoalescedEvents ? ev.getCoalescedEvents() : [];
        (evs.length ? evs : [ev]).forEach(e => {
          const p = point(e), last = cur.s.pts[cur.s.pts.length - 1];
          if (Math.hypot(p[0] - last[0], p[1] - last[1]) < 1.5) return;
          cur.s.pts.push(p);
          if (cur.s.t !== 'marker') segment(bctxFor(cur.s), cur.s, cur.s.pts.length - 1, k);
        });
        if (cur.s.t === 'marker') {
          lctx.clearRect(0, 0, live.width, live.height);
          drawStroke(lctx, cur.s, k);
        }
      });
      // pen and eraser pieces go straight onto the drawing as they're drawn
      const bctxFor = s => {
        bctx.lineCap = 'round';
        bctx.lineJoin = 'round';
        bctx.strokeStyle = s.c;
        bctx.globalAlpha = 1;
        bctx.globalCompositeOperation = s.t === 'eraser' ? 'destination-out' : 'source-over';
        return bctx;
      };
      const end = ev => {
        if (!cur || ev.pointerId !== cur.id) return;
        undo.push(strokes.slice());
        strokes.push(cur.s);
        cur = null;
        lctx.clearRect(0, 0, live.width, live.height);
        bctx.globalCompositeOperation = 'source-over';
        redraw();
        paintTools();
      };
      pad.addEventListener('pointerup', end);
      pad.addEventListener('pointercancel', end);

      function close(result) {
        window.removeEventListener('keydown', onKey, true);
        window.removeEventListener('resize', size);
        wrap.remove();
        resolve(result);
      }
      const onKey = e => {
        if (e.key === 'Escape') { e.stopImmediatePropagation(); close(null); }
        if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); wrap.querySelector('[data-d="undo"]').click(); }
      };
      window.addEventListener('keydown', onKey, true);
      window.addEventListener('resize', size);

      wrap.addEventListener('click', async e => {
        const b = e.target.closest('button');
        if (!b || b.disabled) return;
        if (b.dataset.tool) tool = b.dataset.tool;
        if (b.dataset.colour) { colour = b.dataset.colour; if (tool === 'eraser') tool = 'pen'; }
        const d = b.dataset.d;
        if (d === 'undo' && undo.length) { strokes = undo.pop(); redraw(); }
        if (d === 'clear' && strokes.length) { undo.push(strokes.slice()); strokes = []; redraw(); }
        if (d === 'cancel') return close(null);
        if (d === 'done' && !busy) {
          busy = true;
          return close(await finish(strokes));
        }
        paintTools();
      });

      requestAnimationFrame(size);
      paintTools();
    });
  }

  window.Draw = { open };
})();
