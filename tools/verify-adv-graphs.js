// Checks the graph-reading questions: the answer must agree with the curve that is actually drawn. Run: node tools/verify-adv-graphs.js
const E = require('../engine.js'), RB = require('./load-bank.js')();
const SK = ['exp-graph', 'log-graph', 'poly-graph', 'rat-graph']; const bad = []; let n = 0;
const near = (a, b) => Math.abs(a - b) < 1e-6;
const nums = (s) => [...s.matchAll(/-?\d+(?:\.\d+)?/g)].map((m) => +m[0]);
const F = { // independent evaluators
  exp: (c, x) => c.a * Math.pow(c.b, x - c.h) + c.k, log: (c, x) => c.a * Math.log(x - c.h) / Math.log(c.b) + c.k,
  poly: (c, x) => c.a * c.roots.reduce((p, r) => p * (x - r), 1), hyp: (c, x) => c.a / (x - c.h) + c.k, rat: (c, x) => c.a * c.num.reduce((p, r) => p * (x - r), 1) / c.den.reduce((p, r) => p * (x - r), 1) };
for (const t of RB.templates.filter((t) => SK.includes(t.skill))) {
  for (let i = 0; i < 60; i++) {
    const g = E.generate(t, 'ag' + i); n++; const c = g.graphs[0].curves[0], P = g.prompt.replace(/\$/g, '').replace(/\s+/g, ' '), A = g.answer.replace(/\\left|\\right/g, '').replace(/\s+/g, ' ');
    const fail = (w) => { if (bad.length < 30) bad.push(t.id + ': ' + w + '\n   ' + P + ' => ' + A + '\n   ' + JSON.stringify(c)); };
    if (!g.graphs.length) { fail('no graph'); break; }
    const v = g.graphs[0].view; if (!v || v.length !== 4) { fail('no fixed view'); break; }
    const f = F[c.type];
    // every labelled/open point must lie on the drawn curve (holes lie on the reduced curve)
    g.graphs[0].points.forEach((p) => { if (!near(f(c, p.x), p.y)) fail('point not on curve ' + p.x + ',' + p.y); if (Math.abs(p.y) > Math.max(Math.abs(v[2]), Math.abs(v[3])) || p.x < v[0] || p.x > v[1]) fail('point outside the window'); });
    let m;
    if ((m = P.match(/horizontal asymptote/)) && c.type === 'exp') { if (!near(+A.match(/-?\d+/)[0], c.k)) fail('exp HA'); }
    if ((m = P.match(/horizontal asymptote/)) && c.type === 'hyp') { if (!near(+A.match(/-?\d+/)[0], c.k)) fail('hyp HA'); }
    if (/vertical asymptote/.test(P) && c.type === 'hyp') { if (!near(+A.match(/-?\d+/)[0], c.h)) fail('hyp VA'); }
    if (/vertical asymptote/.test(P) && c.type === 'log') { if (!near(+A.match(/-?\d+/)[0], c.h)) fail('log VA'); }
    if (/vertical asymptote/.test(P) && !/hole/.test(P) && c.type === 'rat' && !near(+A.match(/-?\d+/)[0], c.den[0])) fail('rat VA');
    if (/y -intercept/.test(P) && c.type === 'exp') { const y = nums(A)[1]; if (!near(y, f(c, 0))) fail('exp y-int'); if (f(c, 0) < v[2] || f(c, 0) > v[3]) fail('y-int off graph'); }
    if (/growth or decay/.test(P)) { const up = c.b > 1; if (/growth/.test(A) !== up) fail('growth/decay'); }
    if (/range/.test(P) && c.type === 'exp') { const k = nums(A.replace(/\\infty/, ''))[0]; if (!near(k, c.k) || (c.a > 0) !== /^\(.*, \\infty\)$/.test(A)) fail('exp range'); }
    if (/domain/.test(P) && c.type === 'log') { if (!near(nums(A)[0], c.h)) fail('log domain'); }
    if (/domain/.test(P) && c.type === 'hyp') { if (!near(nums(A)[0], c.h)) fail('hyp domain'); }
    if (/range/.test(P) && c.type === 'hyp') { if (!near(nums(A)[0], c.k)) fail('hyp range'); }
    if (/x -intercept/.test(P) && c.type === 'log') { const x = nums(A)[0]; if (!near(f(c, x), 0)) fail('log x-int'); }
    if (/x -intercept/.test(P) && c.type === 'rat') { const x = nums(A)[0]; if (!near(f(c, x), 0)) fail('rat x-int'); }
    if (c.type === 'poly' && /cross the x/.test(P)) { if (+A !== c.roots.length) fail('crossings'); }
    if (c.type === 'poly' && /zeros of the polynomial/.test(P)) { const zs = nums(A); if (zs.length !== c.roots.length || zs.some((z) => !near(f(c, z), 0))) fail('poly zeros'); }
    if (/touches/.test(P)) { const z = nums(A)[0]; if (c.roots.filter((r) => r === z).length !== 2) fail('double root'); }
    if (/end behavior/.test(P)) { const lead = c.a, deg = c.roots.length; const right = lead > 0 ? 'inf' : 'neg', left = deg % 2 ? (lead > 0 ? 'neg' : 'inf') : (lead > 0 ? 'inf' : 'neg'); const m2 = A.match(/x\\to -\\infty,\\ f\(x\)\\to (-?)\\infty;\\ \\text\{as \} x\\to \\infty,\\ f\(x\)\\to (-?)\\infty/); if (!m2 || (m2[1] ? 'neg' : 'inf') !== left || (m2[2] ? 'neg' : 'inf') !== right) fail('end behavior'); }
    if (/odd or even/.test(P)) { const deg = c.roots.length; if (/odd/.test(A) !== (deg % 2 === 1) || /positive/.test(A) !== (c.a > 0)) fail('degree/sign'); }
    if (/factored form/.test(P)) { const fac = [...A.matchAll(/\(x ([+-]) (\d+)\)/g)].map((q) => (q[1] === '+' ? -1 : 1) * +q[2]).sort((p, q) => p - q); const roots = c.roots.slice().sort((p, q) => p - q); if (fac.join() !== roots.join() || (c.a < 0) !== /^f\(x\) = -/.test(A)) fail('factored form'); }
    if (/Write an exponential function/.test(P)) { if (/frac\{1\}\{2\}/.test(A)) { if (!near(c.b, 0.5) || !near(nums(A)[0], c.a)) fail('exp decay form'); } else { const mm = A.match(/^f\(x\) = (?:(\d+)\\cdot )?(\d+)\^\{x\}(?: ([+-]) (\d+))?$/); if (!mm) { fail('exp form parse'); } else { const a = mm[1] ? +mm[1] : 1, k = mm[3] ? (mm[3] === '-' ? -1 : 1) * +mm[4] : 0; if (!near(a, c.a) || !near(+mm[2], c.b) || !near(k, c.k)) fail('exp equation'); } } }
    if (/Write the equation of the logarithmic/.test(P)) { const mm = A.match(/\\log_\{ (\d+) \}\(x ([+-]) (\d+)\)/); if (!mm || !near(+mm[1], c.b) || !near((mm[2] === '+' ? -1 : 1) * +mm[3], c.h)) fail('log equation'); }
    if (/What is b/.test(P)) { if (!near(nums(A)[0], c.b)) fail('log base'); }
    if (/cross the .*x.*axis/.test(P) && c.type === 'log') { const x = nums(A)[0]; if (!near(f(c, x), 0)) fail('log crossing'); }
    if (/Write the function/.test(P) && c.type === 'hyp') { const mm = A.match(/\\frac\{ (-?\d+) \}\{ x ([+-]) (\d+) \} ([+-]) (\d+)/); if (!mm || !near(+mm[1], c.a) || !near((mm[2] === '+' ? -1 : 1) * +mm[3], c.h) || !near((mm[4] === '+' ? 1 : -1) * +mm[5], c.k)) fail('hyp equation'); }
    if (/hole/.test(P)) { const pt = g.graphs[0].points[0], z = nums(A); if (!pt || !pt.open) fail('no hole'); if (/coordinates/.test(P) ? (!near(z[0], pt.x) || !near(z[1], pt.y)) : !near(z[0], pt.x)) fail('hole answer'); if (near(pt.x, c.den[0])) fail('hole at asymptote'); }
  }
}
console.log('checked', n, 'graph instances'); console.log(bad.length ? 'PROBLEMS:\n' + bad.join('\n') : 'No problems found.');
