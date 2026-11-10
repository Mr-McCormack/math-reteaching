// Independent checks for the Advanced Algebra batch 1: re-derives each answer from the printed prompt. Run: node tools/verify-advanced.js
const E = require('../engine.js'), RB = require('./load-bank.js')();
const SK = new Set(['cx-i-pow', 'cx-addsub', 'cx-mult', 'cx-div', 'cx-sqrt', 'log-eval', 'log-convert', 'log-solve', 'exp-model', 'poly-zeros']);
const bad = []; let n = 0;
const ck = (t, g, why) => { if (bad.length < 40) bad.push(t.id + ': ' + why + '\n   ' + g.prompt + '  =>  ' + g.answer); };
// ---- complex numbers
const C = (re, im) => ({ re, im });
const cmul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const near = (a, b) => Math.abs(a - b) < 1e-9, ceq = (a, b) => near(a.re, b.re) && near(a.im, b.im);
function pc(s) { // "3 + 4i", "-i", "4 - 2i", "7", "5i"
  s = s.replace(/\s+/g, '').replace(/\\cdot/g, '*');
  const m = s.match(/^(-?\d+)?(?:([+-]\d*)i)?$/) || s.match(/^(-?\d*)i$/);
  if (!m) throw new Error('cannot parse complex: ' + s);
  if (/^-?\d*i$/.test(s)) { const c = s.slice(0, -1); return C(0, c === '' ? 1 : c === '-' ? -1 : +c); }
  const c = m[2]; return C(m[1] ? +m[1] : 0, c === undefined ? 0 : (c === '+' ? 1 : c === '-' ? -1 : +c));
}
const num = (s) => { s = s.replace(/\s/g, ''); let m; if ((m = s.match(/^\\frac\{(-?\d+)\}\{(\d+)\}$/))) return +m[1] / +m[2]; return +s; };
const L = (b, x) => Math.log(x) / Math.log(b);
const LB = (b) => (x) => Math.log(x) / Math.log(b);
function js(s) { // tiny LaTeX -> JS for log/exponent expressions with x
  return s.replace(/\\left|\\right/g, '').replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '(($1)/($2))').replace(/\\log_\{\s*(\d+)\s*\}/g, 'LB($1)').replace(/\\log(?=\s*\()/g, 'LB(10)').replace(/\\cdot/g, '*')
    .replace(/(\d)\s*LB/g, '$1*LB').replace(/(\d)x/g, '$1*x').replace(/\^\{([^{}]*)\}/g, '**($1)').replace(/\^/g, '**');
}
for (const t of RB.templates) {
  if (!SK.has(t.skill)) continue;
  for (let i = 0; i < 60; i++) {
    let g; try { g = E.generate(t, 'adv' + i); } catch (e) { bad.push(t.id + ' generate: ' + e.message); break; }
    const P = g.prompt.replace(/\$/g, '').replace(/\s+/g, ' ').trim(), A = g.answer.replace(/\s+/g, ' ').trim(); n++;
    try {
      if (t.skill === 'cx-i-pow') {
        const m = P.match(/(-)? ?i\^\{ ?(\d+) ?\}(?:\\cdot i\^\{ ?(\d+) ?\})?/); const e = +m[2] + (m[3] ? +m[3] : 0);
        let v = [C(1, 0), C(0, 1), C(-1, 0), C(0, -1)][e % 4]; if (m[1]) v = C(-v.re, -v.im);
        if (!ceq(v, pc(A))) ck(t, g, 'i power');
      }
      if (t.skill === 'cx-addsub') {
        const ps = [...P.matchAll(/\(([^()]*)\)/g)].map((q) => pc(q[1])); const ops = [...P.matchAll(/\) ([+-]) \(/g)].map((q) => q[1]);
        let v = ps[0]; ops.forEach((o, k) => { v = o === '+' ? C(v.re + ps[k + 1].re, v.im + ps[k + 1].im) : C(v.re - ps[k + 1].re, v.im - ps[k + 1].im); });
        if (!ceq(v, pc(A))) ck(t, g, 'add/sub');
      }
      if (t.skill === 'cx-mult') {
        let v, m;
        if ((m = P.match(/^Multiply: (\d+)i\\cdot (\d+)i$/))) v = C(-m[1] * m[2], 0);
        else if ((m = P.match(/^(?:Multiply|Simplify): \(([^()]*)\)\(([^()]*)\)$/))) v = cmul(pc(m[1]), pc(m[2]));
        else if ((m = P.match(/^Multiply: (-?\d*)i\(([^()]*)\)$/))) v = cmul(pc(m[1] + 'i'), pc(m[2]));
        else if ((m = P.match(/^Multiply: (-?\d+)\(([^()]*)\)$/))) v = cmul(C(+m[1], 0), pc(m[2]));
        else if ((m = P.match(/^Simplify: \(([^()]*)\)\^2$/))) v = cmul(pc(m[1]), pc(m[1]));
        else throw new Error('unrecognized mult prompt');
        if (!ceq(v, pc(A))) ck(t, g, 'multiply');
      }
      if (t.skill === 'cx-div') {
        const m = P.match(/\\frac\{ ?(.*?) ?\}\{ ?(.*?) ?\}/); if (!ceq(cmul(pc(A), pc(m[2])), pc(m[1]))) ck(t, g, 'divide');
      }
      if (t.skill === 'cx-sqrt') {
        let m;
        if ((m = P.match(/^Simplify: \\sqrt\{ -(\d+) \}$/))) { const N = +m[1]; const mm = A.match(/^(-?\d*)i(?:\\sqrt\{ (\d+) \})?$/); const o = mm[1] === '' ? 1 : +mm[1], r = mm[2] ? +mm[2] : 1; if (o * o * r !== N) ck(t, g, 'sqrt neg'); }
        else if ((m = P.match(/^Solve: x\^2 = -(\d+)$/))) { const o = +A.match(/\\pm (\d+)i/)[1]; if (o * o !== +m[1]) ck(t, g, 'x^2=-n'); }
        else if ((m = P.match(/^Solve: x\^2 \+ (\d+) = 0$/))) { const mm = A.match(/\\pm (-?\d*)i\\sqrt\{ (\d+) \}/); const o = mm[1] === '' ? 1 : +mm[1]; if (o * o * mm[2] != m[1]) ck(t, g, 'x^2+n=0'); }
        else if ((m = P.match(/^Solve: (\d+)x\^2 \+ (\d+) = 0$/))) { const o = +A.match(/\\pm (\d+)i/)[1]; if (m[1] * o * o !== +m[2]) ck(t, g, 'ax^2+b=0'); }
        else if ((m = P.match(/^Simplify: \\sqrt\{ -(\d+) \}\\cdot\\sqrt\{ -(\d+) \}$/))) { if (-(m[1] * m[2]) !== +A) ck(t, g, 'product of imaginary roots'); }
        else throw new Error('unrecognized sqrt prompt');
      }
      if (t.skill === 'log-eval') {
        const v = eval(js(P.replace(/^Evaluate: /, '').replace(/\(base 10\)/, '')));
        if (!near(v, num(A))) ck(t, g, 'log value ' + v);
      }
      if (t.skill === 'log-solve') {
        const [l, r] = P.replace(/^Solve: /, '').split(' = '); const x = num(A.replace(/^x = /, ''));
        const f = (s) => eval(js(s).replace(/x/g, '(' + x + ')'));
        const lv = f(l), rv = f(r); if (!near(lv, rv)) ck(t, g, 'log eq ' + lv + ' vs ' + rv);
      }
      if (t.skill === 'log-convert') {
        let m;
        if ((m = P.match(/^Write \\log_\{ ?(\d+) ?\}\( ?(x|\d+) ?\) = (-?\d+|x) in exponential form\.$/))) {
          const [, b, y, k] = m; const want = k === 'x' ? `${b}^{x} = ${y}` : `${b}^{ ${k} } = ${y}`; if (A.replace(/ /g, '') !== want.replace(/ /g, '')) ck(t, g, 'to exp');
          if (/^\d+$/.test(y) && k !== 'x' && Math.pow(+b, +k) !== +y) ck(t, g, 'false statement');
        } else if ((m = P.match(/^Write (\d+)\^\{ ?(-?\d+|x) ?\} = (\d+|x) in logarithmic form\.$/))) {
          const [, b, k, y] = m; const want = k === 'x' ? `x = \\log_{ ${b} }( ${y} )` : `\\log_{ ${b} }( ${y} ) = ${k}`; if (A.replace(/ /g, '') !== want.replace(/ /g, '')) ck(t, g, 'to log');
          if (/^\d+$/.test(y) && k !== 'x' && Math.pow(+b, +k) !== +y) ck(t, g, 'false statement 2');
        } else if (!/ln|e\^/.test(P)) throw new Error('unrecognized convert prompt');
      }
      if (t.skill === 'exp-model') {
        let m;
        if ((m = P.match(/(\d+) bacteria and doubles every hour.* (\d+) hours/))) { if (m[1] * 2 ** m[2] !== parseInt(A)) ck(t, g, 'bacteria'); }
        else if ((m = P.match(/^A population of (\d+) doubles every year\. How many after (\d+) years\?/))) { if (m[1] * 2 ** m[2] !== parseInt(A)) ck(t, g, 'doubling'); }
        else if ((m = P.match(/^Evaluate f\(x\) = (\d+)\\cdot (\d+)\^\{x\} at x = (\d+)\./))) { if (m[1] * m[2] ** m[3] !== +A) ck(t, g, 'eval f'); }
        else if ((m = P.match(/has (\d+) grams.*half-life of 1 day.* (\d+) days/))) { if (m[1] / 2 ** m[2] !== parseFloat(A)) ck(t, g, 'half-life'); }
        else if ((m = P.match(/of (\d+) triples every year.* (\d+) years/))) { if (m[1] * 3 ** m[2] !== +A) ck(t, g, 'tripling'); }
        else if ((m = P.match(/Write an exponential function/))) { if (!new RegExp('^f\\(t\\) = ' + P.match(/population of (\d+) doubles/)[1] + '\\\\cdot 2\\^\\{t\\}$').test(A)) ck(t, g, 'model form'); }
        else if ((m = P.match(/of (\d+) cells doubles every (\d+) hours.* after (\d+) hours/))) { if (m[1] * 2 ** (m[3] / m[2]) !== +A) ck(t, g, 'culture'); }
        else if ((m = P.match(/of (\d+) mg has a half-life of (\d+) years.* after (\d+) years/))) { if (m[1] / 2 ** (m[3] / m[2]) !== parseFloat(A)) ck(t, g, 'mg'); }
        else throw new Error('unrecognized model prompt');
      }
      if (t.skill === 'poly-zeros') {
        let m; const polyEval = (s, x) => eval(s.replace(/\\ /g, ' ').replace(/(\d)x/g, '$1*x').replace(/x\^(\d)/g, 'x**$1').replace(/x(?!\*)/g, '(' + x + ')').replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(').replace(/\)x/g, ')*x'));
        const zs = [...P.matchAll(/x = (-?\d+)|(-?\d+)(?=[ ,.$]|\\)/g)];
        let zeros;
        if ((m = P.match(/with zeros x = (-?\d+) \(double zero\) and x = (-?\d+)/))) zeros = [+m[1], +m[1], +m[2]];
        else if ((m = P.match(/zeros x = (-?\d+) and x = (-?\d+)/))) zeros = [+m[1], +m[2]];
        else if ((m = P.match(/zeros (-?\d+) ?, (-?\d+) ?and (-?\d+)/))) zeros = [+m[1], +m[2], +m[3]];
        else if ((m = P.match(/^Find the zeros of f\(x\) = (.*)\.$/))) { const zz = [...A.matchAll(/-?\d+/g)].map((q) => +q[0]); const f = (x) => eval(m[1].replace(/\(x ([+-]) (\d+)\)/g, (q, s, d) => `(${x}${s}${d})`).replace(/\)\(/g, ')*(')); if (zz.length !== 3 || zz.some((z) => f(z) !== 0)) ck(t, g, 'zeros of product'); continue; }
        if (!zeros) throw new Error('unrecognized zeros prompt');
        const body = A.replace(/\s/g, ''); const x0 = 1.7;
        const val = (() => { const s = body.replace(/(\d)x/g, '$1*x').replace(/x\^(\d)/g, 'x**$1').replace(/\)\(/g, ')*(').replace(/\)x/g, ')*x'); return (x) => eval(s.replace(/\bx\b/g, '(' + x + ')').replace(/(\d)\(/g, '$1*(')); })();
        const want = (x) => zeros.reduce((p, z) => p * (x - z), 1);
        if (!near(val(x0), want(x0)) || !near(val(-2.3), want(-2.3))) ck(t, g, 'polynomial from zeros');
      }
    } catch (e) { bad.push(t.id + ' CHECK ERROR: ' + e.message + '\n   ' + g.prompt + ' => ' + g.answer); break; }
  }
}
console.log('checked', n, 'instances'); console.log(bad.length ? 'PROBLEMS:\n' + bad.join('\n') : 'No problems found.');
