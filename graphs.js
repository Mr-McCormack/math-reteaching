/* Draws a graph spec (from engine.generate) as an SVG string. No DOM needed.
 * ReteachGraphs.svg(graph, { width })   graph = { view, blank, curves:[...], points:[...] }
 * ReteachGraphs.view(graph)             the [xmin, xmax, ymin, ymax] window used (auto-chosen when graph.view is null) */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ReteachGraphs = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  let uid = 0;
  const fmt = (v) => (Math.round(v * 100) / 100).toString().replace('-', '−');
  const f = (c, x) => (c.type === 'quad' ? c.a * (x - c.h) * (x - c.h) + c.k : c.m * x + c.b);

  function autoView(g) {
    const xs = [0], ys = [0];
    (g.curves || []).forEach((c) => {
      if (c.style === 'dashed') return;
      if (c.type === 'quad') {
        xs.push(c.h); ys.push(c.k); if (Math.abs(f(c, 0) - c.k) <= 14) ys.push(f(c, 0));
        const disc = -c.k / c.a;
        if (disc >= 0) { xs.push(c.h - Math.sqrt(disc), c.h + Math.sqrt(disc)); }
        xs.push(c.h - 2, c.h + 2);
      } else { ys.push(c.b); if (c.m) xs.push(-c.b / c.m); xs.push(-3, 3); }
    });
    (g.points || []).forEach((p) => { xs.push(p.x); ys.push(p.y); });
    let x0 = Math.floor(Math.min(...xs)) - 2, x1 = Math.ceil(Math.max(...xs)) + 2, y0 = Math.floor(Math.min(...ys)) - 2, y1 = Math.ceil(Math.max(...ys)) + 2;
    const grow = (lo, hi, min) => { while (hi - lo < min) { lo--; if (hi - lo < min) hi++; } return [lo, hi]; };
    [x0, x1] = grow(x0, x1, 10); [y0, y1] = grow(y0, y1, 10);
    return [x0, x1, y0, y1];
  }
  const view = (g) => (g.view && g.view.length === 4 ? g.view : g.blank ? [-10, 10, -10, 10] : autoView(g));

  function svg(g, o) {
    o = o || {};
    const [x0, x1, y0, y1] = view(g);
    const xs = x1 - x0, ys = y1 - y0;
    const pad = 28, W = 300, H = 300, ux = W / xs, uy = H / ys;
    const X = (x) => pad + (x - x0) * ux, Y = (y) => pad + (y1 - y) * uy;
    const span = Math.max(xs, ys), step = span <= 14 ? 1 : span <= 28 ? 2 : 5;
    const id = 'gclip' + (++uid);
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + (W + 2 * pad) + ' ' + (H + 2 * pad) + '" class="graph" role="img" font-family="Helvetica,Arial,sans-serif" font-size="13">';
    s += '<defs><clipPath id="' + id + '"><rect x="' + pad + '" y="' + pad + '" width="' + W + '" height="' + H + '"/></clipPath></defs>';
    s += '<rect x="' + pad + '" y="' + pad + '" width="' + W + '" height="' + H + '" fill="#fff" stroke="#999" stroke-width="0.8"/>';
    for (let x = Math.ceil(x0); x <= x1; x++) s += '<line x1="' + X(x) + '" y1="' + pad + '" x2="' + X(x) + '" y2="' + (pad + H) + '" stroke="' + (x % step === 0 ? '#bbb' : '#e4e4e4') + '" stroke-width="0.6"/>';
    for (let y = Math.ceil(y0); y <= y1; y++) s += '<line x1="' + pad + '" y1="' + Y(y) + '" x2="' + (pad + W) + '" y2="' + Y(y) + '" stroke="' + (y % step === 0 ? '#bbb' : '#e4e4e4') + '" stroke-width="0.6"/>';
    const ax = Math.min(Math.max(0, x0), x1), ay = Math.min(Math.max(0, y0), y1);
    s += '<line x1="' + pad + '" y1="' + Y(ay) + '" x2="' + (pad + W) + '" y2="' + Y(ay) + '" stroke="#000" stroke-width="1.3"/>';
    s += '<line x1="' + X(ax) + '" y1="' + pad + '" x2="' + X(ax) + '" y2="' + (pad + H) + '" stroke="#000" stroke-width="1.3"/>';
    for (let x = Math.ceil(x0); x <= x1; x++) if (x % step === 0 && x !== 0) s += '<text x="' + X(x) + '" y="' + (Y(ay) + (ay <= y0 + 0.01 ? -4 : 11)) + '" text-anchor="middle" paint-order="stroke" stroke="#fff" stroke-width="3">' + fmt(x) + '</text>';
    for (let y = Math.ceil(y0); y <= y1; y++) if (y % step === 0 && y !== 0) s += '<text x="' + (X(ax) + (ax <= x0 + 0.01 ? 4 : -4)) + '" y="' + (Y(y) + 3.5) + '" text-anchor="' + (ax <= x0 + 0.01 ? 'start' : 'end') + '">' + fmt(y) + '</text>';
    s += '<text x="' + (pad + W + 2) + '" y="' + (Y(ay) + 3.5) + '" font-style="italic">x</text><text x="' + (X(ax) + 4) + '" y="' + (pad - 8) + '" font-style="italic">y</text>';
    (g.curves || []).forEach((c) => {
      const n = 240; let d = '';
      for (let i = 0; i <= n; i++) { const x = x0 + (xs * i) / n, y = f(c, x); d += (i ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(Math.max(-1e4, Math.min(1e4, y))).toFixed(1); }
      s += '<path d="' + d + '" fill="none" clip-path="url(#' + id + ')" stroke="' + (c.style === 'dashed' ? '#777' : '#000') + '" stroke-width="' + (c.style === 'dashed' ? 1.3 : 2) + '"' + (c.style === 'dashed' ? ' stroke-dasharray="5 4"' : '') + ' stroke-linejoin="round"/>';
    });
    (g.points || []).forEach((p) => {
      s += '<circle cx="' + X(p.x) + '" cy="' + Y(p.y) + '" r="3.6" fill="#000"/>';
      const t = p.label === 'coords' ? '(' + fmt(p.x) + ', ' + fmt(p.y) + ')' : p.label;
      if (t) { const right = X(p.x) < pad + W * 0.6; s += '<text x="' + (X(p.x) + (right ? 6 : -6)) + '" y="' + (Y(p.y) - 6) + '" text-anchor="' + (right ? 'start' : 'end') + '" font-size="14" font-weight="bold" paint-order="stroke" stroke="#fff" stroke-width="3">' + t + '</text>'; }
    });
    return s + '</svg>';
  }
  return { svg, view, autoView };
});
