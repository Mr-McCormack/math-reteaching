/* Multiple-choice wrong answers, made automatically from the correct answer (LaTeX string).
 * ReteachChoices.makeChoices(correct, siblings, seed, n) -> { choices:[latex...], correct:index } | null
 *   siblings: correct answers of other instances of the same question type (used as extra distractors)
 * ReteachChoices.eligible(prompt, answer) -> false for "graph it / explain it" questions and very long answers.
 * Distractors come from common slips: sign errors, flipped fractions, off-by-one numbers, swapped numbers,
 * opposite words (increasing/decreasing...), wrong quadrant, wrong special angle.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('../engine.js'));
  else root.ReteachChoices = factory(root.ReteachEngine);
})(typeof self !== 'undefined' ? self : this, function (E) {
  'use strict';
  const ANG = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
  const WORDS = [['no solution', 'one solution'], ['infinitely many solutions', 'no solution'], ['no real solutions', 'two real solutions'], ['one real solution', 'two real solutions'], ['increasing', 'decreasing'], ['positive', 'negative'], ['maximum', 'minimum'], ['even', 'odd'], ['True', 'False'], ['true', 'false'], ['Yes', 'No'], ['yes', 'no'], ['above', 'below'], ['opens up', 'opens down'], ['upward', 'downward'], ['left', 'right'], ['vertical', 'horizontal'], ['Student A', 'Student B'], ['stretch', 'shrink'], ['growth', 'decay'], ['inverse', 'identity'], ['Linear', 'Exponential'], ['linear', 'exponential']];
  const ROMAN = ['I', 'II', 'III', 'IV'];
  const norm = (s) => String(s).replace(/\\[,;! ]|\s+/g, '').replace(/−/g, '-').replace(/\\left|\\right|\\dfrac|\\tfrac/g, (m) => (m === '\\dfrac' || m === '\\tfrac' ? '\\frac' : '')).toLowerCase();
  const shape = (s) => String(s).replace(/\d+(\.\d+)?/g, '#').replace(/\s+/g, '');

  function eligible(prompt, answer) {
    if (!answer || answer.length > 90) return false;
    if (/(^|[.?!:]\s+)(Graph|Sketch|Draw|Plot|Explain|Justify|Describe|Show that|Prove)\b/.test(prompt)) return false;
    if (/\\text\{[^}]{40,}\}/.test(answer)) return false;
    return true;
  }

  // numeric tokens that are not inside \text{...}
  function tokens(s) {
    const out = [], re = /\d+(?:\.\d+)?/g; let m;
    const textSpans = []; const tr = /\\text\{[^{}]*\}/g; let t; while ((t = tr.exec(s))) textSpans.push([t.index, t.index + t[0].length]);
    while ((m = re.exec(s))) { if (textSpans.some(([a, b]) => m.index >= a && m.index < b)) continue; out.push({ i: m.index, t: m[0], exp: /\^\s*\{?\s*$/.test(s.slice(0, m.index)), inBrace: /[{]\s*$/.test(s.slice(0, m.index)) }); }
    return out;
  }
  const rep = (s, i, len, v) => s.slice(0, i) + v + s.slice(i + len);
  const isDeg = (s, tk) => /^\s*\^\s*(\{\s*\\circ\s*\}|\\circ)/.test(s.slice(tk.i + tk.t.length));

  function signFlips(s) {
    const out = [];
    tokens(s).forEach((tk) => {
      if (tk.t === '0' || isDeg(s, tk)) return;
      let j = tk.i - 1; while (j >= 0 && s[j] === ' ') j--;
      const c = s[j];
      if (c === '-' || c === '−') { // remove a unary minus, or turn a binary minus into plus
        const before = (() => { let k = j - 1; while (k >= 0 && s[k] === ' ') k--; return s[k]; })();
        const unary = before === undefined || /[(\[,=\{&<>;:]/.test(before) || /\\\\$/.test(s.slice(0, j).trimEnd());
        out.push(unary ? s.slice(0, j) + s.slice(j + 1) : s.slice(0, j) + '+' + s.slice(j + 1));
      } else if (c === '+') out.push(s.slice(0, j) + '-' + s.slice(j + 1));
      else if (!tk.exp && !isDeg(s, tk) && (j < 0 || /[(\[,=&]/.test(c) || /\\\\$/.test(s.slice(0, j + 1)))) out.push(s.slice(0, tk.i) + '-' + s.slice(tk.i));
      else if (/[a-zA-Z}\d)]/.test(c || '')) { /* implicit coefficient position: skip */ }
    });
    // negate a whole fraction / leading expression
    if (!/^\s*-/.test(s) && /^\\frac|^\\sqrt/.test(s.trim())) out.push('-' + s.trim());
    else if (/^\s*-\s*\\(frac|sqrt)/.test(s)) out.push(s.replace(/^\s*-\s*/, ''));
    return out;
  }
  function fracSwap(s) {
    const m = /\\frac\{([^{}]*)\}\{([^{}]*)\}/.exec(s); if (!m) return [];
    if (m[1] === m[2]) return [];
    return [s.slice(0, m.index) + '\\frac{' + m[2] + '}{' + m[1] + '}' + s.slice(m.index + m[0].length)];
  }
  function tweaks(s) {
    const out = [];
    tokens(s).forEach((tk) => {
      const v = parseFloat(tk.t);
      if (isDeg(s, tk) && ANG.includes(v)) {
        const k = ANG.indexOf(v); const alts = new Set([ANG[k - 1], ANG[k + 1], (180 - v + 360) % 360, (v + 180) % 360, 360 - v]); alts.delete(undefined); alts.delete(v);
        alts.forEach((a) => out.push(rep(s, tk.i, tk.t.length, String(a))));
        return;
      }
      const dec = tk.t.includes('.'), step = dec ? 0.5 : 1, fix = (x) => (dec ? String(Math.round(x * 100) / 100) : String(x));
      [v + step, v - step, v * 2, v + 2 * step].forEach((a) => { if (a >= 0 && a !== v && !(a === 0 && v !== 1)) out.push(rep(s, tk.i, tk.t.length, fix(a))); });
      if (v > 1 && !dec && v % 2 === 0) out.push(rep(s, tk.i, tk.t.length, fix(v / 2)));
    });
    return out;
  }
  function numSwap(s) {
    if (!(/^\s*[(\[]/.test(s) || /bmatrix|pmatrix/.test(s))) return [];
    const tk = tokens(s).filter((x) => !x.exp); if (tk.length < 2) return [];
    const out = [];
    for (let a = 0; a < tk.length - 1 && out.length < 3; a++) for (let b = a + 1; b < tk.length && out.length < 3; b++) {
      if (tk[a].t === tk[b].t) continue;
      let r = s; // replace the later first so indices stay valid
      r = rep(r, tk[b].i, tk[b].t.length, tk[a].t); r = rep(r, tk[a].i, tk[a].t.length, tk[b].t); out.push(r);
    }
    return out;
  }
  function words(s) {
    const out = [];
    const has = (w) => new RegExp('(^|[^A-Za-z])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^A-Za-z])').test(s);
    const sub = (a, b) => s.replace(new RegExp('(^|[^A-Za-z])' + a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=$|[^A-Za-z])', 'g'), (m, p1) => p1 + b);
    WORDS.forEach(([a, b]) => { if (has(a)) out.push(sub(a, b)); else if (has(b)) out.push(sub(b, a)); });
    const q = /Quadrant (I{1,3}|IV)\b/.exec(s); if (q) ROMAN.filter((r) => r !== q[1]).forEach((r) => out.push(s.replace(q[0], 'Quadrant ' + r)));
    if (/\\pm/.test(s)) out.push(s.replace('\\pm', '+'));
    return out;
  }


  const CATS = [['growth', 'decay', 'neither', 'cannot be determined'], ['exponential growth', 'exponential decay', 'linear growth', 'linear decay'], ['up', 'down', 'left', 'right'], ['maximum', 'minimum', 'neither', 'both'], ['Yes', 'No'], ['yes', 'no'], ['True', 'False'], ['two real solutions', 'one real solution', 'no real solutions', 'two complex solutions'], ['parallel', 'perpendicular', 'neither', 'the same line'], ['h', 'k', 'a', 'b'], ['A', 'B', 'C', 'D'], ['a', 'h', 'k'], ['A', 'B', 'Both', 'Neither'], ['above', 'below'], ['none', 'one', 'two', 'infinitely many'], ['m \\text{ is undefined}', 'm = 0', 'm = 1', 'm = -1'], ['odd degree, positive leading coefficient', 'odd degree, negative leading coefficient', 'even degree, positive leading coefficient', 'even degree, negative leading coefficient'], ['even', 'odd', 'neither'], ['increasing', 'decreasing', 'constant'], ['positive', 'negative', 'zero', 'undefined'], ['linear', 'quadratic', 'exponential', 'cubic'], ['one solution', 'no solution', 'infinitely many solutions'], ['no solution', 'one solution', 'infinitely many solutions'], ['(-\\infty, \\infty)', '[0, \\infty)', '(0, \\infty)', '(-\\infty, 0)'], ['(0, \\infty)', '(-\\infty, \\infty)', '[0, \\infty)', '(-\\infty, 0)'], ['y > 0', 'y < 0', 'y \\geq 0', 'y \\leq 0']];
  const TRIGV = ['0', '1', '-1', '\\frac{1}{2}', '-\\frac{1}{2}', '\\frac{\\sqrt{2}}{2}', '-\\frac{\\sqrt{2}}{2}', '\\frac{\\sqrt{3}}{2}', '-\\frac{\\sqrt{3}}{2}', '\\sqrt{3}', '-\\sqrt{3}', '\\frac{\\sqrt{3}}{3}', '-\\frac{\\sqrt{3}}{3}', '\\text{undefined}', '2', '-2', '\\sqrt{2}', '-\\sqrt{2}', '\\frac{2\\sqrt{3}}{3}', '-\\frac{2\\sqrt{3}}{3}'];
  function allSets(sibs) {
    const sets = CATS.slice(); sibs = sibs || [];
    if (sibs.some((x) => /^-?i$/.test(String(x).trim()))) sets.unshift(['i', '-i', '1', '-1']);
    if (sibs.some((x) => /\\sqrt|undefined/.test(x) && !/[a-wyz]/.test(x.replace(/\\[a-z]+/g, '')))) sets.push(TRIGV);
    return sets;
  }
  function catOptions(s, sibs) {
    const m = /^\\text\{(.*)\}$/.exec(s.trim()), key = (m ? m[1] : s).trim(), wrap = (x) => (m ? '\\text{' + x + '}' : x);
    for (const set of allSets(sibs)) { const i = set.findIndex((x) => x === key || x.replace(/\s+/g, '') === key.replace(/\s+/g, '')); if (i >= 0) return { opts: set.filter((_, j) => j !== i).map(wrap), size: set.length }; }
    return null;
  }
  function letterSwap(s) {
    const out = []; const stripped = s.replace(/\\text\{[^{}]*\}/g, (m) => '\u0001'.repeat(m.length)).replace(/\\[a-zA-Z]+/g, (m) => '\u0001'.repeat(m.length));
    const letters = [...new Set(stripped.match(/[a-zA-Z]/g) || [])];
    for (let a = 0; a < letters.length - 1; a++) for (let b = a + 1; b < letters.length; b++) {
      const A = letters[a], B = letters[b]; let r = '';
      for (let i = 0; i < s.length; i++) r += stripped[i] === A ? B : stripped[i] === B ? A : s[i];
      if (r !== s) out.push(r);
    }
    return out;
  }
  function opFlips(s) {
    const out = []; const re = /(\s)([+\-])(\s)/g; let m;
    while ((m = re.exec(s))) out.push(s.slice(0, m.index) + m[1] + (m[2] === '+' ? '-' : '+') + m[3] + s.slice(m.index + 3));
    return out;
  }
  function pis(s) { return /\\pi/.test(s) && !/\\frac\{\\pi\}/.test(s) ? [s.replace('\\pi', '\\frac{\\pi}{2}'), s.replace('\\pi', '2\\pi'), s.replace('\\pi', '\\frac{3\\pi}{2}')] : []; }

  function makeChoices(correct, siblings, seed, n) {
    n = n || 4; const rng = E.makeRng(String(seed));
    const shuf = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const seen = new Set([norm(correct)]); const picked = [];
    const sh = shape(correct);
    const dupTok = (x) => { const t = tokens(x).filter((y) => !y.exp).map((y) => y.t); return new Set(t).size < t.length; };
    const sib = shuf((siblings || []).filter((x) => x && norm(x) !== norm(correct)));
    const sibSame = sib.filter((x) => shape(x) === sh), sibOther = sib.filter((x) => shape(x) !== sh);
    const cat = catOptions(correct, siblings); if (cat) n = Math.min(n, cat.size);
    const zero = tokens(correct).some((t) => t.t === '0' && !isDeg(correct, t)) ? ['1', '-1', '2', '-2'].map((v) => correct.replace(/0/, v)) : [];
    const groups = [cat ? shuf(cat.opts) : [], shuf(signFlips(correct)), shuf(words(correct)), shuf(fracSwap(correct)), shuf(tweaks(correct).filter((c) => Math.abs(c.length - correct.length) < 6)), shuf(numSwap(correct)), sibSame, shuf(tweaks(correct)), shuf(opFlips(correct)), shuf(letterSwap(correct)), shuf(pis(correct)), shuf(zero), sibOther];
    // interleave: one sibling early so the set doesn't look like pure arithmetic slips
    let guard = 0;
    while (picked.length < n - 1 && guard++ < 400) {
      let progressed = false;
      for (const g of groups) {
        while (g.length) {
          const c = g.shift(), k = norm(c);
          if (!k || seen.has(k) || (dupTok(c) && !dupTok(correct)) || (/\\sqrt\{\s*-/.test(c) && !/\\sqrt\{\s*-/.test(correct))) continue;
          seen.add(k); picked.push(c); progressed = true; break;
        }
        if (picked.length >= n - 1) break;
      }
      if (!progressed) break;
    }
    if (picked.length < n - 1) return null;
    const pos = Math.floor(rng() * n), choices = picked.slice(0, n - 1); choices.splice(pos, 0, correct);
    // keep a natural order for purely numeric answers
    return { choices, correct: pos };
  }
  return { makeChoices, eligible, norm };
});
