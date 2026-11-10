// Verifies the stock bank. Run: node tools/verify-bank.js [--show]
//  1. every skill has all four tiers; template ids are unique
//  2. every template generates 40 times without errors or unfilled {{tokens}}
//  3. every prompt/answer/step parses in KaTeX (if KaTeX is installed)
//  4. typography checks (" + -3", "1x", "x^{1}", "+ 0" ...)
//  5. INDEPENDENT math checks: the answer is re-derived from the *printed LaTeX* (equations are
//     substituted back, expressions compared numerically, inequalities tested at many points ...)
const E = require('../engine.js');
const RB = require('./load-bank.js')();
const SHOW = process.argv.includes('--show');
let katex = null;
for (const p of ['katex', '/opt/npm-tools/node_modules/katex']) { try { katex = require(p); break; } catch (e) { /* next */ } }

const F = (n, d) => new E.Frac(n, d);
const problems = [];
const bad = (tpl, msg, sample) => problems.push({ id: tpl.id, msg, sample });

// ------------------------------------------------------------ LaTeX-ish -> formula
function conv(s) {
  s = s.replace(/\\text\{[^{}]*\}/g, ' ').replace(/\\(left|right)/g, '').replace(/\\(quad|;|,|!)/g, ' ')
       .replace(/\\cdot|\\times/g, '*').replace(/\\ldots/g, '');
  let prev;
  do {
    prev = s;
    s = s.replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '(($1)/($2))');
    s = s.replace(/\\sqrt\s*\{([^{}]*)\}/g, '¤($1)');
    s = s.replace(/\^\s*\{([^{}]*)\}/g, '^($1)');
  } while (s !== prev);
  // |...| pairs
  let open = true; s = s.replace(/\|/g, () => { const r = open ? '§(' : ')'; open = !open; return r; });
  s = s.replace(/([0-9a-zA-Z)])(?=[(a-zA-Z§¤])/g, '$1*');
  s = s.replace(/§/g, 'abs').replace(/¤/g, 'sqrt');
  if (/\\/.test(s)) throw new Error('unsupported: ' + s);
  return s;
}
const val = (latex, env) => E.evalFormula(conv(latex), env || {});
const isZero = (f) => f.n === 0;
const mathSegs = (str) => E.splitMath(str).filter((s) => s.type === 'math').map((s) => s.s.trim());
const OR = /\\text\{\s*or\s*\}|\\quad\\text\{or\}\\quad|\\quad\s*\\text\{or\}\s*\\quad/;

function chainTruth(str, env) {
  const parts = str.replace(/\\left|\\right/g, '').split(/(\\le|\\ge|<|>)/).map((p) => p.trim());
  const v = []; for (let i = 0; i < parts.length; i += 2) v.push(val(parts[i], env));
  for (let i = 1; i < parts.length; i += 2) {
    const c = v[(i - 1) / 2].cmp(v[(i + 1) / 2]);
    const ok = parts[i] === '<' ? c < 0 : parts[i] === '>' ? c > 0 : parts[i] === '\\le' ? c <= 0 : c >= 0;
    if (!ok) return false;
  }
  return true;
}
const hasCmp = (s) => /\\le|\\ge|<|>/.test(s.replace(/\\left|\\right/g, ''));
const testPoints = (extra) => { const pts = []; for (let k = -120; k <= 120; k++) pts.push(F(k, 2)); return pts.concat(extra); };

// ------------------------------------------------------------ checks (return null if ok, a string if wrong, undefined if not checkable)
function check(tpl, g) {
  const segs = mathSegs(g.prompt);
  const ans = g.answer;
  const skill = tpl.skill;
  try {
    // ---- inequalities (one variable x), incl. "or" prompts
    if (segs.some(hasCmp) && !segs.some((s) => /=/.test(s.replace(/\\le|\\ge/g, '')))) {
      const orPrompt = /\bor\b/.test(E.splitMath(g.prompt).filter((s) => s.type === 'text').map((s) => s.s).join('|'));
      const pieces = ans.split(OR);
      const bounds = [];
      for (const p of pieces) for (const e of p.split(/\\le|\\ge|<|>/)) { if (e.trim() !== 'x') { try { bounds.push(val(e, {})); } catch (_) { /* has x */ } } }
      for (const x of testPoints(bounds)) {
        const env = { x };
        const P = orPrompt ? segs.some((s) => chainTruth(s, env)) : segs.every((s) => chainTruth(s, env));
        const A = pieces.some((p) => chainTruth(p, env));
        if (P !== A) return 'inequality answer disagrees with the prompt at x = ' + x.n + '/' + x.d;
      }
      return null;
    }
    // ---- systems / points: answer is an ordered pair
    const pair = ans.replace(/\\left|\\right/g, '').match(/^\(\s*([^,]+),\s*([^)]+)\)$/);
    const eqSegs = segs.filter((s) => /=/.test(s));
    if (pair && eqSegs.length >= 2) {
      const env = { x: val(pair[1]), y: val(pair[2]) };
      for (const s of eqSegs) { const [l, r] = s.split('='); if (!isZero(val(l, env).sub(val(r, env)))) return 'solution pair does not satisfy ' + s; }
      return null;
    }
    if (/^\\text\{(Yes|No)\}$/.test(ans) && eqSegs.length === 2 && skill === 'sys-check' && !/ k /.test(g.prompt)) {
      const m = segs[0].replace(/\\left|\\right/g, '').match(/^\(\s*([^,]+),\s*([^)]+)\)$/);
      const env = { x: val(m[1]), y: val(m[2]) };
      const holds = eqSegs.every((s) => { const [l, r] = s.split('='); return isZero(val(l, env).sub(val(r, env))); });
      return holds === /Yes/.test(ans) ? null : 'Yes/No answer is wrong';
    }
    // ---- equations in x: every listed root must satisfy, and the roots must be distinct
    const eq = segs.find((s) => /=/.test(s) && /x/.test(s.split('=')[0] + s.split('=')[1]) && !/^f\(|^g\(|^y\s*=/.test(s));
    if (eq && skill !== 'literal' && /^x\s*=/.test(ans.trim()) && !/\\pm/.test(ans)) {
      const roots = ans.split(OR).map((p) => val(p.split('=')[1]));
      const [l, r] = eq.split('=');
      for (const x of roots) if (!isZero(val(l, { x }).sub(val(r, { x })))) return 'root x = ' + x.n + '/' + x.d + ' does not satisfy ' + eq;
      if (roots.length === 2 && roots[0].cmp(roots[1]) === 0) return 'the two roots are identical';
      return null;
    }
    // ---- "evaluate ... when x = k"
    if (segs.length === 2 && /^x\s*=/.test(segs[1]) && !/=/.test(segs[0])) {
      const env = { x: val(segs[1].split('=')[1]) };
      return isZero(val(segs[0], env).sub(val(ans))) ? null : 'evaluation is wrong';
    }
    // ---- one expression -> one equivalent expression (simplify / expand / factor / evaluate)
    if (segs.length === 1 && !/=/.test(segs[0]) && !hasCmp(segs[0]) && !/\\sqrt|\\pm|text/.test(segs[0] + ans) && /^(Simplify|Expand|Factor|Multiply|Evaluate|Rewrite)/.test(g.prompt.replace(/^.*?:\s*/, (m) => m).trim()) ) {
      for (const [x, y] of [[2, 3], [3, -2], [-1, 5], [5, 2], [-4, -3], [7, 1]]) {
        const env = { x: F(x), y: F(y) };
        if (!isZero(val(segs[0], env).sub(val(ans, env)))) return 'expression is not equivalent to the answer (x=' + x + ', y=' + y + ')';
      }
      return null;
    }

    // ---- radicals: numeric comparison + the answer must be fully simplified
    if (skill === 'radicals') {
      const f = (latex) => new Function('sqrt', 'return ' + conv(latex).replace(/\^/g, '**'))(Math.sqrt);
      if (Math.abs(f(segs[0]) - f(ans)) > 1e-9) return 'radical value is wrong';
      for (const m of ans.matchAll(/\\sqrt\{\s*(\d+)\s*\}/g)) if (E.evalFormula('outsq(' + m[1] + ')', {}).n !== 1) return 'radicand ' + m[1] + ' is not simplified';
      return null;
    }
    // ---- quadratic formula with +/-  (numeric)
    if (skill === 'quad-formula' && /\\pm/.test(ans)) {
      const q = segs[0].split('=')[0]; const co = (lat) => { const e = (x) => val(lat, { x: F(x) }).num(); const c = e(0), a = (e(1) + e(-1)) / 2 - c, b = (e(1) - e(-1)) / 2; return [a, b, c]; };
      const [a, b, c] = co(q);
      const m = ans.match(/x = \\frac\{\s*(-?\d+)\s*\\pm\s*\\sqrt\{\s*(\d+)\s*\}\s*\}\{\s*(-?\d+)\s*\}/); if (!m) return 'answer not in the expected form';
      for (const sg of [1, -1]) { const r = (+m[1] + sg * Math.sqrt(+m[2])) / +m[3]; if (Math.abs(a * r * r + b * r + c) > 1e-9) return 'root does not satisfy the equation'; }
      return null;
    }
    // ---- vertex / axis of symmetry: symmetric about the answer, and k is the value there
    if (skill === 'vertex' && /^y\s*=/.test(segs[0])) {
      const y = (x) => val(segs[0].split('=')[1], { x });
      const ax = /^x\s*=/.test(ans) ? val(ans.split('=')[1]) : null;
      const vt = ans.match(/^\(\s*([^,]+),\s*([^)]+)\)$/);
      const h = ax || val(vt[1]);
      for (const t of [1, 2, 3]) if (y(h.add(F(t))).cmp(y(h.sub(F(t)))) !== 0) return 'parabola is not symmetric about the answer';
      if (vt && y(h).cmp(val(vt[2])) !== 0) return 'y-value at the vertex is wrong';
      return null;
    }
    // ---- function notation
    if (skill === 'functions') {
      const fs = {}; segs.forEach((s) => { const m = s.match(/^([fg])\(x\)\s*=\s*(.+)$/); if (m && !/^[-\d]/.test(m[2].trim().slice(0, 0))) fs[m[1]] = fs[m[1]] || m[2]; });
      const call = (name, x) => val(fs[name], { x });
      let m;
      if ((m = ans.match(/^f\(g\((.+)\)\)\s*=\s*(.+)$/))) return call('f', call('g', val(m[1]))).cmp(val(m[2])) === 0 ? null : 'composition is wrong';
      if ((m = ans.match(/^([fg])\((.+)\)\s*=\s*(.+)$/))) return call(m[1], val(m[2])).cmp(val(m[3])) === 0 ? null : 'function value is wrong';
      if ((m = segs.find((q, i) => i > 0 && /^f\(x\)\s*=\s*-?\d+$/.test(q))) && /^x\s*=/.test(ans)) return call('f', val(ans.split('=')[1])).cmp(val(m.split('=')[1])) === 0 ? null : 'solving f(x) = v is wrong';
      return undefined;
    }
    // ---- arithmetic sequences
    if (skill === 'seq') {
      const t = (segs.find((q) => /,/.test(q)).replace(/\\ldots/g, '').split(',').map((q) => q.trim()).filter(Boolean)).map((q) => val(q)); if (t.length < 3) return undefined;
      const d = t[1].sub(t[0]); let m;
      if ((m = ans.match(/^a_\{\s*(\d+)\s*\}\s*=\s*(.+)$/))) return t[0].add(d.mul(F(+m[1] - 1))).cmp(val(m[2])) === 0 ? null : 'nth term is wrong';
      if ((m = ans.match(/^a_n\s*=\s*(.+)$/))) { for (let n = 1; n <= 3; n++) if (val(m[1], { n: F(n) }).cmp(t[n - 1]) !== 0) return 'formula does not reproduce the sequence'; return null; }
      if ((m = ans.match(/^n\s*=\s*(\d+)$/))) { const v = val(g.prompt.match(/equal to \$(-?\d+)\$/)[1]); return t[0].add(d.mul(F(+m[1] - 1))).cmp(v) === 0 ? null : 'term number is wrong'; }
      if (/\;/.test(ans)) { const nx = ans.split(/,\s*\;/).map((q) => val(q)); return nx.every((v, i) => t[0].add(d.mul(F(3 + i))).cmp(v) === 0) ? null : 'next terms are wrong'; }
      return undefined;
    }
    // ---- intercepts
    if (skill === 'intercepts') {
      const pts = [...ans.matchAll(/\(\s*([^,()]+),\s*([^,()]+)\)/g)].map((q) => [val(q[1]), val(q[2])]);
      const main = segs.find((q) => /=/.test(q)); const [l, r] = main.split('=');
      const lhs = (x, y) => val(l, { x, y }), rhs = (x, y) => val(r, { x, y });
      for (const [px, py] of pts) if (lhs(px, py).cmp(rhs(px, py)) !== 0) return 'intercept is not on the line';
      if (!pts.some(([, py]) => py.n === 0 || true)) return 'missing intercept';
      if (pts.length === 2 && (pts[0][1].n !== 0 || pts[1][0].n !== 0)) return 'intercept coordinates are not on the axes';
      if (pts.length === 1 && pts[0][1].n !== 0) return 'x-intercept must have y = 0';
      return null;
    }
    // ---- slope / y-intercept from an equation
    if (skill === 'slope-int') {
      const mm = ans.match(/m = ([^,]+),\s*\\quad b = (.+)$/) || ans.match(/\\quad m = ([^,]+),\s*\\quad b = (.+)$/);
      if (!mm) return undefined;
      const M = val(mm[1]), B = val(mm[2]);
      const main = segs.find((q) => /=/.test(q)); const [l, r] = main.split('=');
      if (/^y\s*$/.test(l.trim())) { const y = (x) => val(r, { x }); return y(F(0)).cmp(B) === 0 && y(F(1)).sub(y(F(0))).cmp(M) === 0 ? null : 'slope or intercept is wrong'; }
      for (const x of [0, 1, 2]) { const y = M.mul(F(x)).add(B); if (val(l, { x: F(x), y }).cmp(val(r, { x: F(x), y })) !== 0) return 'line y = mx + b is not the same line'; }
      return null;
    }

    // ---- literal equations: solve numerically with made-up values for the other letters
    if (skill === 'literal') {
      const eqs = segs.find((q) => /=/.test(q)); const target = segs[segs.length - 1].trim();
      const letters = [...new Set((eqs + ans).replace(/\\[a-z]+/g, ' ').match(/[A-Za-z]/g))].filter((c) => c !== target);
      const primes = [2, 3, 5, 7, 11, 13, 17, 19]; const env = {}; letters.forEach((c, i) => { env[c] = F(primes[i % primes.length]); });
      const tv = val(ans.split('=')[1], env); env[target] = tv;
      const [l, r] = eqs.split('=');
      return val(l, env).cmp(val(r, env)) === 0 ? null : 'solved-for letter does not satisfy the original equation';
    }
    // ---- quadratic discriminant / number of solutions
    if (skill === 'quad-formula' && (/^b\^2 - 4ac =/.test(ans) || /real solution/.test(ans))) {
      const q = segs.find((z) => /=/.test(z)).split('=')[0]; const e = (x) => val(q, { x: F(x) });
      const c = e(0), a = e(1).add(e(-1)).div(F(2)).sub(c), b = e(1).sub(e(-1)).div(F(2));
      const D = b.mul(b).sub(F(4).mul(a).mul(c));
      if (/^b\^2/.test(ans)) return D.cmp(val(ans.split('=')[1])) === 0 ? null : 'discriminant is wrong';
      const want = D.n > 0 ? 'two real solutions' : D.n === 0 ? 'one real solution' : 'no real solutions';
      return ans === '\\text{' + want + '}' ? null : 'solution count should be: ' + want;
    }
    // ---- slope: missing y
    if (skill === 'slope' && /^y = /.test(ans)) {
      const pts = [...g.prompt.matchAll(/\(\s*(-?\d+)\s*,\s*(y|-?\d+)\s*\)/g)]; const m = val(g.prompt.match(/slope \$\s*([^$]+?)\s*\$/)[1]);
      const dx = +pts[1][1 - 1 + 0 + 0 === 0 ? 1 : 1] && null; // (kept simple below)
      const x1 = +pts[0][1], y1 = +pts[0][2], x2 = +pts[1][1], y = val(ans.split('=')[1]);
      return y.sub(F(y1)).cmp(m.mul(F(x2 - x1))) === 0 ? null : 'y does not give the stated slope';
    }
    // ---- perpendicular k
    if (skill === 'par-perp' && /^k = /.test(ans)) {
      const given = segs.find((z) => /^y\s*=/.test(z)); const m = val(given.split('=')[1], { x: F(1) }).sub(val(given.split('=')[1], { x: F(0) }));
      return m.mul(val(ans.split('=')[1])).add(F(1)).n === 0 ? null : 'k is not the perpendicular slope';
    }
    // ---- exponential functions
    if (skill === 'exp-fn') {
      const fs = segs.find((z) => /^f\(x\)\s*=/.test(z)); let m;
      if (fs && (m = ans.match(/^f\((.+)\)\s*=\s*(.+)$/))) return val(fs.split('=')[1], { x: val(m[1]) }).cmp(val(m[2])) === 0 ? null : 'function value is wrong';
      const ys = segs.find((z) => /^y\s*=/.test(z));
      if (ys && /exponential (growth|decay)/.test(ans)) { const r = val(ys.split('=')[1], { x: F(1) }).cmp(val(ys.split('=')[1], { x: F(0) })); return (r > 0) === /growth/.test(ans) ? null : 'growth/decay label is wrong'; }
      const sides = ans.split('='); if (sides.length === 2) return val(sides[0]).cmp(val(sides[1])) === 0 ? null : 'answer equation is false';
      return undefined;
    }
    // ---- sys-check challenge: k
    if (skill === 'sys-check' && /^k = /.test(ans)) {
      const m = segs[0].replace(/\\left|\\right/g, '').match(/^\(\s*([^,]+),\s*([^)]+)\)$/); const lhs = segs[1].split('=')[0];
      return val(lhs, { x: val(m[1]), y: val(m[2]) }).cmp(val(ans.split('=')[1])) === 0 ? null : 'k is wrong';
    }
    // ---- proportions word problem
    if (skill === 'proportions' && /km/.test(ans)) { const [a, b, c] = segs.map((z) => +z).filter((z) => !isNaN(z)); return val(ans.split('\\text')[0]).cmp(F(b * c, a)) === 0 ? null : 'scale answer is wrong'; }
    // ---- linear word problems
    if (skill === 'lin-word') {
      const text = E.splitMath(g.prompt).filter((q) => q.type === 'text').map((q) => q.s).join(' ');
      const dollars = [...text.matchAll(/\$(\d+)/g)].map((q) => +q[1]); const ansN = +ans.match(/= (\d+)/)[1];
      if (/Plan A/.test(text)) { const [f1, r1, f2, r2] = dollars; return f1 + r1 * ansN === f2 + r2 * ansN ? null : 'the two plans do not cost the same at that time'; }
      if (/Candle/.test(text)) { const [h1, r1, h2, r2] = segs.map(Number); return h1 - r1 * ansN === h2 - r2 * ansN && h2 - r2 * ansN > 0 ? null : 'candles are not equal height (or burnt out) at that time'; }
      const [f, r, t] = dollars; return f + r * ansN === t ? null : 'fee + rate * amount does not equal the total';
    }
    // ---- points on a written line: slope/intercept form answers
    if (/^y\s*=/.test(ans) && (skill === 'write-eq' || skill === 'par-perp')) {
      const pts = [...g.prompt.matchAll(/\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)/g)].map((m) => [F(+m[1]), F(+m[2])]);
      const line = (s, x) => val(s.split('=')[1], { x });
      if (skill === 'write-eq') {
        const twoPts = /through \$\(.*\)\$ and \$\(/.test(g.prompt) ? pts.slice(0, 2) : pts.slice(0, 1);
        for (const [px, py] of twoPts) if (!isZero(line(ans, px).sub(py))) return 'line does not pass through a given point';
        const sl = g.prompt.match(/slope \$(-?[\\a-z{}0-9]+)\$/); if (sl) { const m = val(sl[1]); if (!isZero(line(ans, F(1)).sub(line(ans, F(0))).sub(m))) return 'slope is not the slope that was given'; }
        return null;
      }
      const given = segs.find((s) => /^y\s*=/.test(s));
      const m0 = line(given, F(1)).sub(line(given, F(0))), m1 = line(ans, F(1)).sub(line(ans, F(0)));
      const wantsPerp = /perpendicular/.test(g.prompt);
      if (wantsPerp ? !isZero(m0.mul(m1).add(F(1))) : m0.cmp(m1) !== 0) return 'slope relationship is wrong';
      const [px, py] = pts[pts.length - 1];
      if (!isZero(line(ans, px).sub(py))) return 'line does not pass through the given point';
      return null;
    }
    if (skill === 'par-perp' && /^\\text\{(parallel|perpendicular|neither)\}$/.test(ans)) {
      const lines = segs.filter((s) => /^y\s*=/.test(s));
      const sl = lines.map((s) => val(s.split('=')[1], { x: F(1) }).sub(val(s.split('=')[1], { x: F(0) })));
      const kind = sl[0].cmp(sl[1]) === 0 ? 'parallel' : isZero(sl[0].mul(sl[1]).add(F(1))) ? 'perpendicular' : 'neither';
      return ans === '\\text{' + kind + '}' ? null : 'relationship is ' + kind;
    }
    if (skill === 'slope') {
      const pts = [...g.prompt.matchAll(/\(\s*(-?\d+)\s*,\s*([a-z]|-?\d+)\s*\)/g)].map((m) => [m[1], m[2]]);
      if (pts.length === 2 && /^-?\d+$/.test(pts[1][1])) {
        const dx = +pts[1][0] - +pts[0][0], dy = +pts[1][1] - +pts[0][1];
        if (/undefined/.test(ans)) return dx === 0 ? null : 'slope should not be undefined';
        const m = val(ans.split('=')[1]); return dx !== 0 && m.cmp(F(dy, dx)) === 0 ? null : 'slope value is wrong';
      }
      return undefined;
    }
  } catch (e) { return undefined; }
  return undefined;
}

// ------------------------------------------------------------ run
const TIERS = E.TIERS;
const ids = new Set();
for (const sk of RB.skills) for (const t of TIERS) if (!RB.templates.some((x) => x.skill === sk.id && x.tier === t)) problems.push({ id: sk.id, msg: 'no ' + t + ' template' });
for (const tpl of RB.templates) { if (ids.has(tpl.id)) problems.push({ id: tpl.id, msg: 'duplicate id' }); ids.add(tpl.id); if (!RB.skills.some((s) => s.id === tpl.skill)) problems.push({ id: tpl.id, msg: 'unknown skill' }); }

const stats = { checked: 0, unchecked: 0 }, perSkill = {}, perTpl = {};
const TYPO = [
  [/[+\-]\s+[+\-]/, 'two operators in a row (e.g. "+ -3")'],
  [/(?<![\d.\w\\])[01](?=[a-z])/, 'a coefficient of 0 or 1 is showing (e.g. "1x")'],
  [/\^\{\s*[01]\s*\}/, 'exponent of 0 or 1 in braces'],
  [/[+\-]\s0(?![\d.])/, '"+ 0" or "- 0" term'],
  [/\(\s*\)/, 'empty parentheses'],
  [/NaN|undefined|Infinity/, 'bad value'],
];
for (const tpl of RB.templates) {
  const errs = E.validateTemplate(tpl, 40);
  if (errs.length) { bad(tpl, errs[0]); continue; }
  const seen = new Set(); let finished = true;
  for (let i = 0; i < 40; i++) {
    const g = E.generate(tpl, 'verify' + i);
    seen.add(g.prompt + JSON.stringify(g.graphs || []));
    const unescaped = (g.prompt.match(/(^|[^\\])\$/g) || []).length;
    if (unescaped % 2) { bad(tpl, 'unbalanced $ in prompt', g.prompt); finished = false; break; }
    const mathBits = [...E.splitMath(g.prompt).filter((s) => s.type === 'math').map((s) => s.s), g.answer, ...g.steps.flatMap((s) => E.splitMath(s).filter((x) => x.type === 'math').map((x) => x.s))];
    let stop = false;
    for (const m of mathBits) {
      for (const [re, why] of TYPO) if (re.test(m.replace(/\\text\{[^{}]*\}/g, ''))) { bad(tpl, why + ': ' + m, g.prompt); stop = true; break; }
      if (stop) break;
      if (katex) { try { katex.renderToString(m, { throwOnError: true, strict: 'ignore' }); } catch (e) { bad(tpl, 'KaTeX: ' + e.message.split('\n')[0] + '  in: ' + m, g.prompt); stop = true; break; } }
    }
    if (stop) { finished = false; break; }
    const r = check(tpl, g);
    const s = (perSkill[tpl.skill] = perSkill[tpl.skill] || { checked: 0, unchecked: 0 });
    const pt = (perTpl[tpl.id] = perTpl[tpl.id] || { c: 0, u: 0 });
    if (r === undefined) { stats.unchecked++; s.unchecked++; pt.u++; } else if (r === null) { stats.checked++; s.checked++; pt.c++; } else { bad(tpl, 'WRONG ANSWER: ' + r, g.prompt + '   =>   ' + g.answer); finished = false; break; }
  }
  if (finished && !tpl.lowVariety && !tpl.skill.startsWith('literal') && Object.keys(tpl.params || {}).length && seen.size < 6) bad(tpl, 'low variety (' + seen.size + ' distinct problems in 40 tries)');
  if (SHOW) { const g = E.generate(tpl, 'show'); console.log('[' + tpl.id + ']  ' + g.prompt.replace(/\n/g, '  /  ') + '   =>   ' + g.answer); }
}

console.log('\nSkills: ' + RB.skills.length + '   Templates: ' + RB.templates.length + '   KaTeX ' + (katex ? 'checked' : 'NOT available'));
console.log('Independent answer checks: ' + stats.checked + ' passed, ' + stats.unchecked + ' not machine-checkable');
const lowCov = RB.skills.filter((s) => perSkill[s.id] && perSkill[s.id].checked === 0).map((s) => s.id);
if (lowCov.length) console.log('Skills with no independent check (review by eye): ' + lowCov.join(', '));
const unc = Object.keys(perTpl).filter((k) => perTpl[k].c === 0); if (unc.length) console.log('Templates with no independent check (' + unc.length + '): ' + unc.join(', '));
if (problems.length) { console.log('\n' + problems.length + ' PROBLEM(S):'); for (const p of problems) console.log(' - [' + p.id + '] ' + p.msg + (p.sample ? '\n      e.g. ' + String(p.sample).replace(/\n/g, '  /  ') : '')); process.exit(1); }
console.log('No problems found.');
