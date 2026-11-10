// Checks every graph question's answer against the curves that are actually drawn. Run: node tools/verify-graphs.js
const E = require('../engine.js'), RB = require('./load-bank.js')();
const bad = []; let n = 0;
const near = (a, b) => Math.abs(a - b) < 1e-6;
const f = (c, x) => (c.type === 'quad' ? c.a * (x - c.h) ** 2 + c.k : c.m * x + c.b);
const nums = (s) => [...s.matchAll(/-?\d+(?:\.\d+)?/g)].map((m) => +m[0]);
const plain = (A) => A.replace(/\\text\{([^{}]*)\}/g, '$1').replace(/\\ /g, ' ');
const err = (t, g, why) => bad.push(t.id + ': ' + why + '\n   ' + g.prompt.replace(/\n/g, ' | ') + ' ' + JSON.stringify(g.graphs.map((x) => x.curves.concat(x.points))) + '\n   => ' + g.answer);
const zerosOf = (c) => { const d = -c.k / c.a; return d < -1e-12 ? [] : near(d, 0) ? [c.h] : [c.h - Math.sqrt(d), c.h + Math.sqrt(d)]; };
const truth = {
  A: (c) => c.a < 0, // has a maximum
};
for (const t of RB.templates) {
  if (!t.graphs) continue;
  for (let i = 0; i < 80; i++) {
    const g = E.generate(t, 'g' + i); n++;
    const P = g.prompt, A = g.answer, W = plain(A), gr = g.graphs, c0 = gr[0] && gr[0].curves.filter((c) => c.style !== 'dashed').pop();
    // every drawn point must really lie on the first solid curve (so what the student reads is true)
    gr.forEach((x) => x.points.forEach((p) => { const c = x.curves.filter((q) => q.style !== 'dashed').pop(); if (c && !near(f(c, p.x), p.y)) err(t, g, 'point not on curve'); }));
    if (gr.length === 2 && /Graph|graph/.test(P) && gr[0].label === 'Graph A') {
      const C = [gr[0].curves[0], gr[1].curves[0]]; let test = null;
      if (/has a maximum/.test(P)) test = (c) => c.a < 0;
      else if (/no zeros/.test(P)) test = (c) => zerosOf(c).length === 0;
      else if (/axis of symmetry/.test(P)) { const h0 = +P.match(/x = (-?\d+)/)[1]; test = (c) => c.h === h0; }
      else if (/range/.test(P)) { const k0 = +P.match(/-\\infty, (-?\d+)\]/)[1]; test = (c) => c.a < 0 && c.k === k0; }
      else if (/intercept/.test(P)) { const y0 = +P.match(/\(0, (-?\d+)\)/)[1]; test = (c) => f(c, 0) === y0; }
      else if (/domain/.test(P)) test = () => true;
      if (!test) { err(t, g, 'unrecognized compare question'); continue; }
      const a = test(C[0]), b = test(C[1]), want = a && b ? 'Both' : a ? 'A' : b ? 'B' : 'Neither';
      if (W.trim() !== want) err(t, g, 'expected ' + want);
      continue;
    }
    if (!c0) continue;
    const vx = c0.h, vy = c0.k, up = c0.a > 0;
    if (/open up or down/.test(P) && W.trim() !== (up ? 'up' : 'down')) err(t, g, 'open dir');
    if (/What is the vertex/.test(P) && !(near(nums(A)[0], vx) && near(nums(A)[1], vy))) err(t, g, 'vertex');
    if (/axis of symmetry/.test(P) && !near(nums(A)[0], vx)) err(t, g, 'axis');
    if (/What is the range/.test(P)) { const ok = up ? /^\[/.test(A) && /\\infty\)$/.test(A) : /^\(-\\infty/.test(A) && /\]$/.test(A); if (!ok || !near(nums(A.replace('\\infty', ''))[0], vy)) err(t, g, 'range'); }
    if (/maximum or minimum value/.test(P)) { if (!W.startsWith(up ? 'minimum' : 'maximum') || !near(nums(A)[0], vy)) err(t, g, 'extreme'); }
    if (/interval of (in|de)crease/.test(P) && !/increase and/.test(P)) { const inc = /increase of/.test(P); const right = /^\(-?\d+, \\infty\)/.test(A); if (right !== (inc ? up : !up) || !near(nums(A)[0], vx)) err(t, g, 'interval'); }
    if (/y\$? ?-?intercept|\$ y \$-intercept/.test(P) && /What is the/.test(P) && !near(nums(A)[1], f(c0, 0))) err(t, g, 'y-int');
    if (/zero of the function/.test(P)) { const zs = [...A.matchAll(/x = (-?\d+)/g)].map((q) => +q[1]).sort((a, b) => a - b), want = zerosOf(c0).sort((a, b) => a - b); if (zs.length !== want.length || zs.some((z, k) => !near(z, want[k]))) err(t, g, 'zeros'); }
    if (/How many real zeros/.test(P) && +A !== zerosOf(c0).length) err(t, g, 'zero count');
    if (/maximum or a minimum/.test(P) && !W.includes(up ? 'minimum' : 'maximum')) err(t, g, 'max/min word');
    if (/cross the \$x\$-axis/.test(P) && W.trim() !== (zerosOf(c0).length ? 'yes' : 'no')) err(t, g, 'cross');
    if (/Write its equation/.test(P)) { const m = A.match(/f\(x\) = (.*)/)[1]; /* compare numerically via the known params by re-reading the drawn curve */ const a = c0.a, h = c0.h, k = c0.k; const aTxt = a === 1 ? '' : a === -1 ? '-' : String(a); const want = aTxt + '(x' + (h < 0 ? ' + ' + -h : ' - ' + h) + ')^2' + (k < 0 ? ' - ' + -k : ' + ' + k); if (m !== want) err(t, g, 'equation ' + want); }
    if (/interval of increase and the range/.test(P)) { const w = up ? '(' + vx + ', \\infty);\\ [' + vy + ', \\infty)' : '(-\\infty, ' + vx + ');\\ (-\\infty, ' + vy + ']'; if (A !== w) err(t, g, 'inc+range'); }
    if (/average rate of change/.test(P)) {
      const xr = P.match(/x = (-?\d+)\s*\$ to \$ x = (-?\d+)/); const p = +xr[1], q = +xr[2]; const m = (f(c0, q) - f(c0, p)) / (q - p);
      if (!near(m, +A)) err(t, g, 'aroc ' + m);
      const dots = gr[0].points; if (dots.length !== 2 || dots[0].x !== p || dots[1].x !== q) err(t, g, 'marked points');
    }
    if (/transformation/.test(P)) {
      const parent = gr[0].curves.find((c) => c.style === 'dashed'), c = gr[0].curves.find((x) => x.style !== 'dashed');
      if (!parent) err(t, g, 'no parent graph');
      const refl = c.a < 0, mag = Math.abs(c.a);
      const hasStretch = /stretch by a factor of (\d+)/.exec(W);
      if (refl !== /reflected/.test(W)) err(t, g, 'reflect');
      if (mag > 1 && (!hasStretch || +hasStretch[1] !== mag)) err(t, g, 'stretch');
      if (mag === 1 && hasStretch) err(t, g, 'unexpected stretch');
      const hm = /shifted (left|right) (\d+)/.exec(W), km = /shifted (up|down) (\d+)/.exec(W);
      if (c.h !== 0 ? !hm || hm[1] !== (c.h > 0 ? 'right' : 'left') || +hm[2] !== Math.abs(c.h) : !!hm) err(t, g, 'h');
      if (c.k !== 0 ? !km || km[1] !== (c.k > 0 ? 'up' : 'down') || +km[2] !== Math.abs(c.k) : !!km) err(t, g, 'k');
    }
  }
}
console.log(n + ' graph samples checked; ' + (bad.length ? bad.length + ' PROBLEMS\n' + [...new Set(bad)].slice(0, 12).join('\n') : 'no problems'));
process.exit(bad.length ? 1 : 0);
