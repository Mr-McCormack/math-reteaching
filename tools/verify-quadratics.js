// Independent numeric checks for the Quadratic functions unit. Run: node tools/verify-quadratics.js
const E = require('../engine.js'), RB = require('./load-bank.js')();
const bad = []; let n = 0;
function fn(latex) { // "2(x - 3)^2 + 5" -> JS function
  let s = latex.replace(/\\left|\\right|\\tfrac|\\dfrac/g, '').replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '(($1)/($2))').replace(/\s+/g, '');
  s = s.replace(/(\d|\))(?=[x(])/g, '$1*').replace(/(x)(?=\()/g, '$1*').replace(/(\))(?=\d)/g, '$1*').replace(/(\([^()]*\)|x)\^2/g, 'Math.pow($1,2)');
  return new Function('x', 'return ' + s);
}
const num = (s) => Number(String(s).replace(/\s/g, ''));
const grid = []; for (let x = -30; x <= 30; x += 0.5) grid.push(x);
function vertex(f) { const ys = grid.map(f); const up = f(100) > f(0) + 1e-9 || f(100) > f(50); const best = up ? Math.min(...ys) : Math.max(...ys); return { x: grid[ys.indexOf(best)], y: best, up }; }
const near = (a, b) => Math.abs(a - b) < 1e-6;
function chk(t, g, why) { bad.push(t.id + ': ' + why + '\n   ' + g.prompt.replace(/\n/g, ' | ') + '\n   => ' + g.answer); }
for (const t of RB.templates) {
  if (!/^(qv-char|aroc|qt|qcmp)$/.test(t.skill) || t.graphs) continue;  // graph questions: see verify-graphs.js
  for (let i = 0; i < 60; i++) {
    const g = E.generate(t, 'v' + i); n++;
    const P = g.prompt, A = g.answer;
    const m = /A quadratic has/.test(P) ? null : P.match(/f\(x\) = (.*?) \$/);
    if (t.skill === 'qv-char' && m) {
      const f = fn(m[1]), v = vertex(f);
      if (/axis of symmetry/.test(P) && /x = /.test(A) && !near(num(A.match(/x = (-?\d+)/)[1]), v.x)) chk(t, g, 'axis');
      if (/vertex/.test(P) && /\(-?\d+, -?\d+\)/.test(A) && /What is the vertex|axis of symmetry and the vertex/.test(P)) { const q = A.match(/\((-?\d+), (-?\d+)\)/); if (!near(+q[1], v.x) || !near(+q[2], v.y)) chk(t, g, 'vertex'); }
      if (/range/.test(P)) { const up = /\[-?\d+, \\infty\)/.test(A.replace(/.*range /, '')) || /^\[/.test(A); const wantUp = v.up; if (A.includes('\\infty)') && A.includes('[')) { if (!wantUp) chk(t, g, 'range direction'); } if (/\(-\\infty, -?\d+\]/.test(A) && wantUp) chk(t, g, 'range direction'); const k = A.match(/(-?\d+)\]|\[(-?\d+),/); if (k && !near(num(k[1] || k[2]), v.y)) chk(t, g, 'range value'); }
      if (/maximum or a minimum/.test(P)) { const w = /maximum/.test(A) ? 'max' : 'min'; if ((v.up ? 'min' : 'max') !== w || !near(num(A.match(/-?\d+$/)[0]), v.y)) chk(t, g, 'max/min'); }
      if (/interval of (in|de)crease/.test(P)) { const inc = /increase of/.test(P); const rightInt = /\(-?\d+, \\infty\)/.test(A); const goesUpRight = v.up; if (rightInt !== (inc ? goesUpRight : !goesUpRight)) chk(t, g, 'interval side'); if (!near(num(A.match(/-?\d+/)[0]), v.x)) chk(t, g, 'interval endpoint'); }
      if (/y\$-intercept/.test(P) && !near(num(A.match(/\(0, (-?\d+)\)/)[1]), f(0))) chk(t, g, 'y-int');
      if (/Find the zeros/.test(P)) { const zs = [...A.matchAll(/x = (-?\d+)/g)].map((q) => +q[1]); if (zs.length !== 2 || zs.some((z) => Math.abs(f(z)) > 1e-9)) chk(t, g, 'zeros'); }
      if (/real zeros/.test(P)) { const has = grid.some((x, j) => j && Math.sign(f(grid[j - 1])) * Math.sign(f(x)) <= 0); if (has) chk(t, g, 'claims none but has zero'); }
      if (/opens? up or down|up or down/.test(P)) { if ((/up/.test(A) && f(2) < f(0)) || (/down/.test(A) && f(2) > f(0))) chk(t, g, 'open dir'); }
    }
    if (t.skill === 'aroc') {
      const rng = P.match(/(-?\d+) \\le x \\le (-?\d+)/);
      if (m && rng) { const f = fn(m[1]), p = +rng[1], q = +rng[2]; if (!near((f(q) - f(p)) / (q - p), num(A.includes('frac') ? eval(A.replace(/\\frac\{(-?\d+)\}\{(\d+)\}/, '($1/$2)')) : A.replace(/^b = /, '')))) chk(t, g, 'aroc from function'); }
      const pr = [...P.matchAll(/\((-?\d+), (-?\d+)\)/g)];
      if (/passes through|slope of the line/.test(P) && pr.length === 2 && !near((pr[1][2] - pr[0][2]) / (pr[1][1] - pr[0][1]), num(A))) chk(t, g, 'aroc points');
      const row = P.match(/x & (.*?) \\\\ \\hline f\(x\) & (.*?) \\end/);
      if (row) { const xs = row[1].split('&').map(num), ys = row[2].split('&').map(num); const want = (ys[ys.length - 1] - ys[0]) / (xs[xs.length - 1] - xs[0]); if (!near(want, num(A))) chk(t, g, 'aroc table'); }
      if (/A quadratic has/.test(P)) { const mm = P.match(/change \$ (-?\d+) \$ on \$ (-?\d+) \\le x \\le (-?\d+)/); const b = num(A.replace('b = ', '')); const f = (x) => x * x + b * x; if (!near((f(+mm[3]) - f(+mm[2])) / (+mm[3] - +mm[2]), +mm[1])) chk(t, g, 'solve for b'); }
    }
    if (t.skill === 'qcmp') {
      const fa = P.match(/Function A: \$ f\(x\) = (.*?) \$/), fb = P.match(/Function B: \$ g\(x\) = (.*?) \$/);
      if (fa && fb) {
        const F = { A: fn(fa[1]), B: fn(fb[1]) }, V = { A: vertex(F.A), B: vertex(F.B) };
        const hasZero = (f) => grid.some((x, j) => j && Math.sign(f(grid[j - 1])) * Math.sign(f(x)) <= 0);
        let test = null;
        if (/has a maximum value/.test(P)) test = (k) => !V[k].up;
        else if (/no real zeros/.test(P)) test = (k) => !hasZero(F[k]);
        else if (/axis of symmetry/.test(P)) { const h0 = +P.match(/x = (-?\d+)/)[1]; test = (k) => V[k].x === h0; }
        else if (/range/.test(P)) { const k0 = +P.match(/-\\infty, (-?\d+)\]/)[1]; test = (k) => !V[k].up && V[k].y === k0; }
        else if (/farther to the right/.test(P)) test = (k) => V[k].x > V[k === 'A' ? 'B' : 'A'].x;
        if (test) { const a = test('A'), b = test('B'); const want = a && b ? 'Both' : a ? 'A' : b ? 'B' : 'Neither'; if (!A.includes(want) || (want === 'A' && A.includes('Both'))) chk(t, g, 'expected ' + want); }
      }
      const one = P.match(/^(Does|Is) .*\$ f\(x\) = (.*?) \$/);
      if (one) { const f = fn(one[2]), v = vertex(f); if (/maximum or a minimum/.test(P) && A.includes(v.up ? 'maximum' : 'minimum')) chk(t, g, 'max/min'); if (/above or below/.test(P) && A.includes(v.y > 0 ? 'below' : 'above')) chk(t, g, 'above/below'); }
    }
    if (t.skill === 'qt' && m && /Describe/.test(P)) { // recover a,h,k numerically and compare with the words in the answer
      const f = fn(m[1]), k = f(0) - (f(0) - f(1) < 0 || true ? 0 : 0); const hv = vertex(f);
      const kk = hv.y, hh = hv.x, a = f(hh + 1) - kk;
      const words = A.replace(/\\text\{([^{}]*)\}/g, '$1').replace(/\\ /g, ' ');
      const hasStretch = /stretch by a factor of (\d+)/.exec(words), hasComp = /compression by a factor of \\tfrac\{1\}\{ ?(\d+) ?\}/.exec(words), refl = /reflected/.test(words);
      if ((a < 0) !== refl) chk(t, g, 'reflection');
      const mag = Math.round(Math.abs(a) * 1e9) / 1e9; if (mag > 1 && (!hasStretch || +hasStretch[1] !== mag)) chk(t, g, 'stretch factor'); if (mag < 1 && (!hasComp || !near(1 / +hasComp[1], mag))) chk(t, g, 'compression factor'); if (mag === 1 && (hasStretch || hasComp)) chk(t, g, 'unexpected stretch');
      const hm = /shifted (left|right) (\d+) unit\(s\)/.exec(words), km = /shifted (up|down) (\d+) unit\(s\)/.exec(words);
      if (hh !== 0 ? !hm || (hm[1] === 'right') !== (hh > 0) || +hm[2] !== Math.abs(hh) : !!hm) chk(t, g, 'h shift');
      if (kk !== 0 ? !km || (km[1] === 'up') !== (kk > 0) || +km[2] !== Math.abs(kk) : !!km) chk(t, g, 'k shift');
    }
    if (t.skill === 'qt' && /reflected across the \$x\$-axis to make/.test(P) && m) { const f = fn(m[1]), gf = fn(A.replace('g(x) = ', '')); if (!grid.every((x) => near(gf(x), -f(x)))) chk(t, g, 'x-axis reflection'); }
    if (t.skill === 'qt' && /y\$-axis to make/.test(P) && m) { const f = fn(m[1]), gf = fn(A.replace('g(x) = ', '')); if (!grid.every((x) => near(gf(x), f(-x)))) chk(t, g, 'y-axis reflection'); }
    if (t.skill === 'qt' && /^Write the equation of the function obtained/.test(P)) {
      const f = fn(A.replace('f(x) = ', '')), v = vertex(f), a = f(v.x + 1) - v.y, nums = [...P.matchAll(/\$ (-?\d+) \$ unit\(s\)/g)].map((q) => +q[1]);
      const dirH = /right/.test(P) ? 1 : -1, dirK = /up/.test(P) ? 1 : -1;
      if (v.x !== dirH * nums[0] || v.y !== dirK * nums[1]) chk(t, g, 'vertex from description');
      const st = P.match(/factor of \$ (\d+) \$/), cp = P.match(/\\frac\{1\}\{ (\d+) \}/);
      if (/reflecting/.test(P) && a !== -1) chk(t, g, 'reflect a'); if (st && a !== +st[1]) chk(t, g, 'stretch a'); if (cp && !near(a, 1 / +cp[1])) chk(t, g, 'compress a');
    }
  }
}
console.log(n + ' samples checked; ' + (bad.length ? bad.length + ' PROBLEMS\n' + [...new Set(bad)].slice(0, 15).join('\n') : 'no problems'));
process.exit(bad.length ? 1 : 0);
