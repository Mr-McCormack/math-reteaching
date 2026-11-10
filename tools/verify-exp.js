// Independent checks for exponential/log batch (adv_exp.js): re-derives decimals & solutions from the printed prompt. Run: node tools/verify-exp.js
const E = require('../engine.js'), RB = require('./load-bank.js')();
const bad = []; let n = 0;
const val = (s) => { s = s.replace(/\s/g, ''); let m; if ((m = s.match(/^\\frac\{(-?\d+)\}\{(\d+)\}$/))) return +m[1] / +m[2]; if ((m = s.match(/^-\\frac\{(\d+)\}\{(\d+)\}$/))) return -m[1] / m[2]; return +s; };
const toJs = (s) => {
  s = s.replace(/\$/g, '').replace(/\\left|\\right|\\,/g, '').replace(/\\cdot/g, '*');
  for (let i = 0; i < 4; i++) s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '(($1)/($2))');
  return s.replace(/(\d)\s*(Math)/g, '$1*$2').replace(/\\pi/g, 'Math.PI').replace(/\^\{([^{}]*)\}/g, '**($1)').replace(/\^/g, '**').replace(/\)\s*\(/g, ')*(').replace(/(\d|\))\s*(x|e\*\*|\()/g, '$1*$2').replace(/\s/g, '');
};
const r2 = (v) => v.toFixed(2);
for (const t of RB.templates) {
  if (!['exp-calc', 'exp-eq-log', 'exp-int', 'exp-eq'].includes(t.skill)) continue;
  for (let i = 0; i < 80; i++) {
    const g = E.generate(t, 'ex' + i); n++;
    const P = g.prompt.replace(/\n/g, ' '), A = g.answer;
    try {
      if (t.skill === 'exp-calc') {
        let e = P.replace(/\\left|\\right/g, '').replace(/\{\s+/g, '{').replace(/\s+\}/g, '}').replace(/\(base 10\)/, '').replace(/^Evaluate\s*/, '').replace(/\.\s*Round.*$/, '').replace(/\$/g, '').trim();
        e = e.replace(/\\ln\(/g, 'Math.log(');
        for (let k = 0; k < 3; k++) e = e.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (m0, a, b) => '(('+a+')/('+b+'))');
        e = e.replace(/\\ln\\sqrt\{(\d+)\}/, 'Math.log(Math.sqrt($1))').replace(/\\ln\(/g, 'Math.log(').replace(/\\log_\{\s*(\d+)\s*\}\(/g, 'LB($1)(').replace(/\\log\(/g, 'Math.log10(').replace(/\\frac\{\\ln\((\d+)\)\}\{\\ln\((\d+)\)\}/, '(Math.log($1)/Math.log($2))').replace(/e\^\{([^{}]*)\}/g, 'Math.exp($1)').replace(/\{|\}/g,'');
        e = toJs(e).replace(/\(\(/g, '((');
        const v = Function('LB', 'return ' + e)((b) => (x) => Math.log(x) / Math.log(b)), got = +A.replace(/[^\d.\-]/g, '');
        if (Math.abs(v - got) > 0.0051) bad.push(t.id + ' ' + P + ' => ' + A + ' expected ' + r2(v));
      } else if (t.skill === 'exp-eq-log' && /Solve/.test(P) && !/account/.test(P)) {
        const body = P.replace(/^.*?Solve\s*/, '').replace(/\.\s*Round.*$/, '').replace(/\$/g, '');
        const [l, rr] = body.split('=').map((z) => toJs(z.replace(/\be\^/g, 'Math.E^')));
        const x = +A.replace(/[^\d.\-]/g, '');
        const f = (x) => { const L = Function('x', 'return ' + l.replace(/Math\.E\*\*/g, 'Math.E**').replace(/e\*\*/g, 'Math.E**')), R = Function('x', 'return ' + rr); return L(x) - R(x); };
        const sc = Math.max(1, Math.abs(Function('x', 'return ' + rr)(x)));
        if (Math.abs(f(x)) / sc > 0.02 && Math.abs(f(x + 0.01) - f(x - 0.01)) > 0) { const d = Math.abs(f(x)) / Math.abs((f(x + 0.01) - f(x - 0.01)) / 0.02); if (d > 0.0051) bad.push(t.id + ' ' + P + ' => ' + A + ' off by ' + d.toFixed(4)); }
      } else if (t.skill === 'exp-eq') {
        const body = P.replace(/^Solve:\s*/, '').replace(/\$/g, '');
        if (!body.includes('=')) continue;
        const [l, rr] = body.split('=').map(toJs);
        const m = A.match(/x=(.*)/); if (!m) continue; const x = val(m[1]);
        const L = Function('x', 'return ' + l)(x), R = Function('x', 'return ' + rr)(x);
        if (!(Math.abs(L - R) < 1e-9 * Math.max(1, Math.abs(R)))) bad.push(t.id + ' ' + P + ' => ' + A + '  (' + L + ' vs ' + R + ')');
      } else if (t.skill === 'exp-int') {
        const m = P.match(/f\(x\) = (.*?)\. /) || P.match(/f\(x\) = (.*?)\$/);
        if (!m) continue; const f = Function('x', 'return ' + toJs(m[1]));
        const yi = A.match(/y\\text\{-intercept: \} \(0, (-?\d+)\)/); if (yi && Math.abs(f(0) - +yi[1]) > 1e-9) bad.push(t.id + ' ' + P + ' => ' + A);
        const xi = A.match(/x\\text\{-intercept: \} \((-?[\d.]+), 0\)/); if (xi && Math.abs(f(+xi[1])) > 0.05 * Math.max(1, Math.abs(f(+xi[1] + 1) - f(+xi[1])))) bad.push(t.id + ' xint ' + P + ' => ' + A + ' f=' + f(+xi[1]));
      }
    } catch (e) { bad.push(t.id + ' error ' + e.message + ' :: ' + P + ' => ' + A); }
  }
}
console.log(n + ' checked; ' + bad.length + ' problems'); bad.slice(0, 25).forEach((b) => console.log(' -', b));
