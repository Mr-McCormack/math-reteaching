/* Reteach engine — problem templates, exact fraction math, safe formulas.
 * No dependencies. Works in the browser (window.ReteachEngine) and in Node (require).
 *
 * A template looks like:
 *   { id, skill, tier: 'worked'|'easier'|'parallel'|'challenge',
 *     prompt: 'Solve for $x$: $ {{a:coef}}x{{b:sign}} = {{c}} $',   // text with $math$ and {{tokens}}
 *     answer: 'x = {{x}}',                                           // math only (LaTeX)
 *     steps:  ['Subtract ...: $ ... $'],                             // optional, worked examples
 *     params: { a: '2..9', x: '-9..9 !0' },                          // random integer picks
 *     derived:{ c: 'a*x+b' },                                        // computed in order
 *     constraints: ['c != 0'] }                                      // retry until all true
 *
 * Token formats  {{expr}} or {{expr:mode}}   (expr is any formula)
 *   (none)  -3 or \frac{3}{4}      sign   " + 5" / " - 5"        coef    "" for 1, "-" for -1
 *   sgncoef " + 5" / " - " (1)      paren  "(-3)" if negative      abs     |value|
 *   ineq    0:<  1:>  2:\le  3:\ge   dec1 / dec2  fixed decimals
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ReteachEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const TIERS = ['worked', 'easier', 'parallel', 'challenge'];
  const TIER_LABEL = {
    worked: 'Worked example',
    easier: 'Warm-up (a bit easier)',
    parallel: 'Try it (like the test)',
    challenge: 'Challenge',
  };

  // ---------- exact fractions ----------
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; }
  class Frac {
    constructor(n, d = 1) {
      if (d === 0) throw new Error('Division by zero');
      if (d < 0) { n = -n; d = -d; }
      const g = gcd(n, d) || 1;
      this.n = n / g; this.d = d / g;
      if (!Number.isSafeInteger(this.n) || !Number.isSafeInteger(this.d)) throw new Error('Number too large');
    }
    add(o) { return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); }
    sub(o) { return new Frac(this.n * o.d - o.n * this.d, this.d * o.d); }
    mul(o) { return new Frac(this.n * o.n, this.d * o.d); }
    div(o) { if (o.n === 0) throw new Error('Division by zero'); return new Frac(this.n * o.d, this.d * o.n); }
    neg() { return new Frac(-this.n, this.d); }
    pow(k) {
      if (k.d !== 1) throw new Error('Exponent must be an integer');
      let e = k.n, base = this;
      if (e < 0) { base = new Frac(this.d, this.n); e = -e; }
      let r = new Frac(1);
      for (let i = 0; i < e; i++) r = r.mul(base);
      return r;
    }
    cmp(o) { return this.n * o.d - o.n * this.d; }
    isInt() { return this.d === 1; }
    num() { return this.n / this.d; }
  }
  const F = (n, d) => new Frac(n, d);
  const TRUE = F(1), FALSE = F(0);
  const bool = (b) => (b ? TRUE : FALSE);
  const needInt = (f, what) => { if (!f.isInt()) throw new Error(what + ' needs a whole number'); return f.n; };

  // ---------- formula language ----------
  function tokenize(src) {
    const toks = []; let i = 0;
    while (i < src.length) {
      const ch = src[i];
      if (/\s/.test(ch)) { i++; continue; }
      if (/[0-9.]/.test(ch)) {
        let j = i; while (j < src.length && /[0-9.]/.test(src[j])) j++;
        toks.push({ t: 'num', v: src.slice(i, j) }); i = j; continue;
      }
      if (/[A-Za-z_]/.test(ch)) {
        let j = i; while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++;
        toks.push({ t: 'id', v: src.slice(i, j) }); i = j; continue;
      }
      const two = src.slice(i, i + 2);
      if (['<=', '>=', '==', '!=', '&&', '||'].includes(two)) { toks.push({ t: 'op', v: two }); i += 2; continue; }
      if ('+-*/^(),<>'.includes(ch)) { toks.push({ t: 'op', v: ch }); i++; continue; }
      throw new Error('Unexpected "' + ch + '" in formula: ' + src);
    }
    return toks;
  }

  const FUNCS = {
    abs: (a) => (a.n < 0 ? a.neg() : a),
    min: (...a) => a.reduce((m, x) => (x.cmp(m) < 0 ? x : m)),
    max: (...a) => a.reduce((m, x) => (x.cmp(m) > 0 ? x : m)),
    gcd: (a, b) => F(gcd(needInt(a, 'gcd'), needInt(b, 'gcd'))),
    lcm: (a, b) => { const x = needInt(a, 'lcm'), y = needInt(b, 'lcm'); return F(Math.abs(x * y) / (gcd(x, y) || 1)); },
    mod: (a, b) => { const x = needInt(a, 'mod'), y = needInt(b, 'mod'); if (y === 0) throw new Error('mod by zero'); return F(((x % y) + y) % y); },
    floor: (a) => F(Math.floor(a.n / a.d)),
    sign: (a) => F(Math.sign(a.n)),
    isint: (a) => bool(a.isInt()),
    num: (a) => F(a.n),
    den: (a) => F(a.d),
    sqrt: (a) => {
      const r = (k) => { const s = Math.round(Math.sqrt(k)); return s * s === k ? s : null; };
      if (a.n < 0) throw new Error('sqrt of negative');
      const rn = r(a.n), rd = r(a.d);
      if (rn === null || rd === null) throw new Error('sqrt is not exact');
      return F(rn, rd);
    },
    issq: (a) => { if (!a.isInt() || a.n < 0) return FALSE; const s = Math.round(Math.sqrt(a.n)); return bool(s * s === a.n); },
    outsq: (a) => F(largestSquareRoot(needInt(a, 'outsq'))),
    insq: (a) => { const n = needInt(a, 'insq'); const o = largestSquareRoot(n); return F(n / (o * o)); },
    if: (c, a, b) => (c.n !== 0 ? a : b),
  };
  function largestSquareRoot(n) { let best = 1; for (let k = 1; k * k <= n; k++) if (n % (k * k) === 0) best = k; return best; }

  function parseFormula(src) {
    const toks = tokenize(src); let p = 0;
    const peek = () => toks[p], next = () => toks[p++];
    const isOp = (v) => peek() && peek().t === 'op' && peek().v === v;
    function expect(v) { if (!isOp(v)) throw new Error('Expected "' + v + '" in formula: ' + src); p++; }
    function parseOr() { let l = parseAnd(); while (isOp('||')) { next(); const r = parseAnd(), a = l; l = (e) => bool(a(e).n !== 0 || r(e).n !== 0); } return l; }
    function parseAnd() { let l = parseCmp(); while (isOp('&&')) { next(); const r = parseCmp(), a = l; l = (e) => bool(a(e).n !== 0 && r(e).n !== 0); } return l; }
    function parseCmp() {
      const l = parseAdd();
      const t = peek();
      if (t && t.t === 'op' && ['<', '>', '<=', '>=', '==', '!='].includes(t.v)) {
        next(); const r = parseAdd(), op = t.v;
        return (e) => { const c = l(e).cmp(r(e)); return bool(op === '<' ? c < 0 : op === '>' ? c > 0 : op === '<=' ? c <= 0 : op === '>=' ? c >= 0 : op === '==' ? c === 0 : c !== 0); };
      }
      return l;
    }
    function parseAdd() {
      let l = parseMul();
      while (isOp('+') || isOp('-')) { const op = next().v, r = parseMul(), a = l; l = op === '+' ? (e) => a(e).add(r(e)) : (e) => a(e).sub(r(e)); }
      return l;
    }
    function parseMul() {
      let l = parseUnary();
      while (isOp('*') || isOp('/')) { const op = next().v, r = parseUnary(), a = l; l = op === '*' ? (e) => a(e).mul(r(e)) : (e) => a(e).div(r(e)); }
      return l;
    }
    function parseUnary() {
      if (isOp('-')) { next(); const x = parseUnary(); return (e) => x(e).neg(); }
      if (isOp('+')) { next(); return parseUnary(); }
      return parsePow();
    }
    function parsePow() {
      const base = parsePrimary();
      if (isOp('^')) { next(); const ex = parseUnary(); return (e) => base(e).pow(ex(e)); }
      return base;
    }
    function parsePrimary() {
      const t = next();
      if (!t) throw new Error('Formula ended early: ' + src);
      if (t.t === 'num') {
        const [i, f = ''] = t.v.split('.');
        const v = f ? F(parseInt(i + f, 10), Math.pow(10, f.length)) : F(parseInt(i, 10));
        return () => v;
      }
      if (t.t === 'id') {
        if (isOp('(')) {
          next(); const args = [];
          if (!isOp(')')) { do { args.push(parseOr()); if (isOp(',')) next(); else break; } while (true); }
          expect(')');
          const fn = FUNCS[t.v];
          if (!fn) throw new Error('Unknown function ' + t.v + '() in formula: ' + src);
          return (e) => fn(...args.map((a) => a(e)));
        }
        const name = t.v;
        return (e) => { if (!(name in e)) throw new Error('Unknown variable ' + name); return e[name]; };
      }
      if (t.t === 'op' && t.v === '(') { const x = parseOr(); expect(')'); return x; }
      throw new Error('Unexpected "' + t.v + '" in formula: ' + src);
    }
    const f = parseOr();
    if (p < toks.length) throw new Error('Unexpected "' + toks[p].v + '" in formula: ' + src);
    return f;
  }
  const evalFormula = (src, env) => parseFormula(String(src))(env);

  // ---------- random ----------
  function xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return function () { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return (h ^= h >>> 16) >>> 0; };
  }
  function mulberry32(a) {
    return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const makeRng = (seed) => mulberry32(xmur3(String(seed))());

  function parseSpec(s) {
    s = String(s).trim();
    let excl = [];
    const bang = s.indexOf('!');
    if (bang >= 0) { excl = s.slice(bang + 1).split(',').map((t) => Number(t.trim())); s = s.slice(0, bang).trim(); }
    if (s.includes('..')) {
      const [lo, hi] = s.split('..').map(Number);
      if (!Number.isInteger(lo) || !Number.isInteger(hi) || hi < lo) throw new Error('Bad range "' + s + '"');
      return { kind: 'range', lo, hi, excl };
    }
    const list = s.split(',').map((t) => Number(t.trim()));
    if (!list.length || list.some((v) => !Number.isInteger(v))) throw new Error('Bad list "' + s + '"');
    return { kind: 'list', list, excl };
  }
  function sampleSpec(spec, rng) {
    for (let k = 0; k < 200; k++) {
      const v = spec.kind === 'range' ? spec.lo + Math.floor(rng() * (spec.hi - spec.lo + 1)) : spec.list[Math.floor(rng() * spec.list.length)];
      if (!spec.excl.includes(v)) return F(v);
    }
    throw new Error('Every value in the range is excluded');
  }

  // ---------- formatting ----------
  const absLatex = (f) => (f.d === 1 ? String(Math.abs(f.n)) : '\\frac{' + Math.abs(f.n) + '}{' + f.d + '}');
  const plainLatex = (f) => (f.n < 0 ? '-' : '') + absLatex(f);
  const INEQ = ['<', '>', '\\le', '\\ge'];
  function formatValue(f, mode) {
    switch (mode || 'plain') {
      case 'plain': return plainLatex(f);
      case 'sign': return (f.n < 0 ? ' - ' : ' + ') + absLatex(f);
      case 'coef': return f.d === 1 && f.n === 1 ? '' : f.d === 1 && f.n === -1 ? '-' : plainLatex(f);
      case 'sgncoef': return (f.n < 0 ? ' - ' : ' + ') + (f.d === 1 && Math.abs(f.n) === 1 ? '' : absLatex(f));
      case 'paren': return f.n < 0 ? '(' + plainLatex(f) + ')' : plainLatex(f);
      case 'abs': return absLatex(f);
      case 'ineq': return INEQ[needInt(f, 'ineq')];
      case 'dec1': return f.num().toFixed(1);
      case 'dec2': return f.num().toFixed(2);
      default: throw new Error('Unknown format :' + mode);
    }
  }

  const TOKEN = /\{\{([^{}]+)\}\}/g;
  function substitute(str, env) {
    return String(str).replace(TOKEN, (whole, inner) => {
      const c = inner.lastIndexOf(':');
      const expr = c >= 0 ? inner.slice(0, c) : inner, mode = c >= 0 ? inner.slice(c + 1).trim() : '';
      try { return formatValue(evalFormula(expr, env), mode); } catch (e) { return whole; }
    });
  }

  // Split "text with $math$ and \$5" into segments for rendering.
  function splitMath(str) {
    const out = []; let buf = '', inMath = false; str = String(str);
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === '\\' && str[i + 1] === '$') { buf += inMath ? '\\$' : '$'; i++; continue; }
      if (ch === '$') { out.push({ type: inMath ? 'math' : 'text', s: buf }); buf = ''; inMath = !inMath; continue; }
      buf += ch;
    }
    if (buf) out.push({ type: inMath ? 'math' : 'text', s: buf });
    return out.filter((seg) => seg.s !== '');
  }

  // ---------- generating ----------
  function compile(tpl) {
    const specs = {};
    for (const k of Object.keys(tpl.params || {})) specs[k] = parseSpec(tpl.params[k]);
    const derived = Object.keys(tpl.derived || {}).map((k) => [k, parseFormula(tpl.derived[k])]);
    const constraints = (tpl.constraints || []).map(parseFormula);
    return { specs, derived, constraints };
  }

  // Graph specs: every number may be a number or a formula string (evaluated like "derived").
  // { label, view:[xmin,xmax,ymin,ymax]|null, blank, curves:[{type:'quad',a,h,k}|{type:'line',m,b}, style], points:[{x,y,label}] }
  function resolveGraphs(specs, env) {
    const N = (v) => (typeof v === 'number' ? v : evalFormula(String(v), env).num());
    return (specs || []).map((sp) => ({
      label: sp.label || '',
      blank: !!sp.blank,
      view: sp.view ? sp.view.map(N) : null,
      asym: (sp.asym || []).map((a) => { const o = {}; if (a.x !== undefined) o.x = N(a.x); if (a.y !== undefined) o.y = N(a.y); return o; }),
      curves: (sp.curves || []).map((c) => { const o = { type: c.type, style: c.style || 'solid' }; ['a', 'h', 'k', 'm', 'b'].forEach((k) => { if (c[k] !== undefined) o[k] = N(c[k]); }); ['roots', 'num', 'den'].forEach((k) => { if (c[k] !== undefined) o[k] = c[k].map(N); }); return o; }),
      points: (sp.points || []).map((p) => ({ x: N(p.x), y: N(p.y), label: p.label || '', open: !!p.open })),
    }));
  }

  function generate(tpl, seed) {
    const c = compile(tpl);
    const rng = makeRng(String(seed) + '|' + (tpl.id || tpl.prompt));
    for (let attempt = 0; attempt < 800; attempt++) {
      const env = {};
      let ok = true;
      try {
        for (const k of Object.keys(c.specs)) env[k] = sampleSpec(c.specs[k], rng);
        for (const [k, f] of c.derived) env[k] = f(env);
        for (const f of c.constraints) if (f(env).n === 0) { ok = false; break; }
      } catch (e) { ok = false; }
      if (!ok) continue;
      return {
        id: tpl.id, skill: tpl.skill, tier: tpl.tier,
        prompt: substitute(tpl.prompt, env),
        answer: substitute(tpl.answer || '', env),
        steps: (tpl.steps || []).map((s) => substitute(s, env)),
        graphs: resolveGraphs(tpl.graphs, env),
      };
    }
    throw new Error('Could not find numbers that satisfy the constraints for template "' + (tpl.id || tpl.prompt) + '"');
  }

  function shuffle(arr, rng) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

  // Pick `count` problems from a pool of templates (same skill + tier), without repeating a prompt.
  function buildTier(pool, count, seed, used) {
    used = used || new Set();
    const out = [];
    if (!pool.length) return out;
    const order = shuffle(pool.slice(), makeRng(seed + '|order'));
    for (let k = 0; k < count; k++) {
      let made = null;
      for (let t = 0; t < 14; t++) {
        const tpl = order[(k + (t >= order.length ? t : 0)) % order.length];
        const g = generate(tpl, seed + '|' + k + '|' + t);
        made = g;
        if (!used.has(g.prompt)) break;
      }
      used.add(made.prompt);
      out.push(made);
    }
    return out;
  }

  function validateTemplate(tpl, samples) {
    const errs = [];
    if (!tpl.prompt) errs.push('Missing prompt');
    if (!TIERS.includes(tpl.tier)) errs.push('Unknown tier "' + tpl.tier + '"');
    if (!tpl.answer) errs.push('Missing answer');
    try {
      for (let i = 0; i < (samples || 20); i++) {
        const g = generate(tpl, 'validate' + i);
        const all = [g.prompt, g.answer, ...g.steps].join(' ').replace(/\\text\{[^{}]*\}/g, '');
        const left = all.match(/\{\{[^{}]+\}\}/);
        if (left) { errs.push('Unfilled token ' + left[0]); break; }
        if (/NaN|undefined|Infinity/.test(all)) { errs.push('Bad value in output'); break; }
      }
    } catch (e) { errs.push(e.message); }
    return errs;
  }

  return { TIERS, TIER_LABEL, Frac, evalFormula, parseFormula, parseSpec, generate, buildTier, substitute, splitMath, makeRng, validateTemplate, formatValue };
});
