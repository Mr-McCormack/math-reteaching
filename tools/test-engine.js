// Quick unit tests for the engine. Run: node tools/test-engine.js
const E = require('../engine.js');
let fails = 0;
const eq = (name, got, want) => { if (got !== want) { fails++; console.log('FAIL', name, '\n   got ', JSON.stringify(got), '\n   want', JSON.stringify(want)); } };
const v = (s, env) => { const r = E.evalFormula(s, env || {}); return r.d === 1 ? r.n : r.n + '/' + r.d; };

// arithmetic + precedence
eq('prec', v('2+3*4'), 14); eq('paren', v('(2+3)*4'), 20); eq('neg pow', v('-2^2'), -4);
eq('pow neg exp', v('2^-3'), '1/8'); eq('right assoc', v('2^3^2'), 512);
eq('frac', v('1/3+1/6'), '1/2'); eq('decimal', v('0.25*8'), 2);
// functions
eq('gcd', v('gcd(12,18)'), 6); eq('lcm', v('lcm(4,6)'), 12); eq('mod neg', v('mod(-7,3)'), 2);
eq('abs', v('abs(-5)'), 5); eq('min/max', v('max(2,9,4)-min(2,9,4)'), 7);
eq('sqrt', v('sqrt(49)'), 7); eq('sqrt frac', v('sqrt(9/16)'), '3/4');
eq('outsq 72', v('outsq(72)'), 6); eq('insq 72', v('insq(72)'), 2);
eq('outsq 50', v('outsq(50)'), 5); eq('insq 50', v('insq(50)'), 2); eq('insq 13', v('insq(13)'), 13);
eq('if', v('if(3>2,10,20)'), 10); eq('and', v('1<2 && 2<3'), 1); eq('or', v('1>2 || 2>3'), 0);
eq('ne', v('3 != 3'), 0); eq('vars', v('a*x+b', { a: E.Frac ? new E.Frac(3) : 0, x: new E.Frac(4), b: new E.Frac(-5) }), 7);
let threw = false; try { v('sqrt(50)'); } catch (e) { threw = true; } eq('sqrt inexact throws', threw, true);
threw = false; try { v('1/0'); } catch (e) { threw = true; } eq('div0 throws', threw, true);

// formatting
const f = (s, m) => E.formatValue(E.evalFormula(s, {}), m);
eq('plain neg', f('-3'), '-3'); eq('plain frac', f('-3/4'), '-\\frac{3}{4}');
eq('sign +', f('5', 'sign'), ' + 5'); eq('sign -', f('-5', 'sign'), ' - 5');
eq('coef 1', f('1', 'coef'), ''); eq('coef -1', f('-1', 'coef'), '-'); eq('coef 3', f('3', 'coef'), '3');
eq('sgncoef 1', f('1', 'sgncoef'), ' + '); eq('sgncoef -1', f('-1', 'sgncoef'), ' - '); eq('sgncoef -4', f('-4', 'sgncoef'), ' - 4');
eq('paren', f('-2', 'paren'), '(-2)'); eq('paren pos', f('2', 'paren'), '2');
eq('ineq', f('3', 'ineq'), '\\ge'); eq('dec2', f('5/4', 'dec2'), '1.25');
eq('frac coef', f('-3/4', 'coef'), '-\\frac{3}{4}');

// substitution incl. brace stacking like \frac{{{a}}}{{{b}}}
const env = { a: new E.Frac(6), b: new E.Frac(-4) };
eq('subst', E.substitute('\\frac{{{a}}}{{{b}}} {{a+b}} {{b:paren}}', env), '\\frac{6}{-4} 2 (-4)');
eq('subst spaced', E.substitute('\\frac{ {{a}} }{ {{b:abs}} }', env), '\\frac{ 6 }{ 4 }');
eq('unknown stays', E.substitute('{{zzz}}', env), '{{zzz}}');

// splitMath
const segs = E.splitMath('Pay \\$5 for $x^2$ now');
eq('split n', segs.length, 3); eq('split dollar', segs[0].s, 'Pay $5 for '); eq('split math', segs[1].s, 'x^2'); eq('split type', segs[1].type, 'math');

// determinism + generation
const tpl = { id: 't', skill: 's', tier: 'parallel', prompt: 'Solve $ {{a:coef}}x{{b:sign}} = {{c}} $', answer: 'x = {{x}}',
  params: { a: '2..9', x: '-9..9 !0', b: '-15..15 !0' }, derived: { c: 'a*x+b' }, constraints: ['c != 0'] };
const g1 = E.generate(tpl, 'seedA'), g2 = E.generate(tpl, 'seedA'), g3 = E.generate(tpl, 'seedB');
eq('deterministic', JSON.stringify(g1), JSON.stringify(g2)); eq('seed changes', g1.prompt !== g3.prompt || g1.answer !== g3.answer, true);
// answers really satisfy the equation, over many seeds
let bad = 0;
for (let i = 0; i < 500; i++) {
  const g = E.generate(tpl, 'n' + i);
  const m = g.prompt.match(/\$ (-?\d*)x (\+|-) (\d+) = (-?\d+) \$/); const a = m[1] === '' ? 1 : m[1] === '-' ? -1 : +m[1];
  const x = +g.answer.replace('x = ', ''); const b = (m[2] === '-' ? -1 : 1) * +m[3];
  if (a * x + b !== +m[4]) bad++;
}
eq('500 generated answers check out', bad, 0);
// impossible constraints give a clear error
threw = false; try { E.generate({ id: 'x', prompt: 'p', answer: 'a', params: { a: '1..2' }, constraints: ['a > 5'] }, 1); } catch (e) { threw = /satisfy/.test(e.message); } eq('impossible constraint', threw, true);
// buildTier avoids repeats
const tier = E.buildTier([tpl], 4, 'S', new Set()); eq('buildTier count', tier.length, 4); eq('buildTier unique', new Set(tier.map((t) => t.prompt)).size, 4);
console.log(fails ? fails + ' FAILED' : 'engine: all tests passed');
process.exit(fails ? 1 : 0);
