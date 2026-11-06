/* Unit: Radicals, expressions, proportions */
(function () {
  const { skill, T } = RB;

  skill('radicals', 'Simplifying radicals', 'Radicals & expressions');
  T('radicals', 'worked', 'Simplify: $ \\sqrt{ {{n}} } $', '{{o}}\\sqrt{ {{r}} }', {
    params: { o: '2..7', r: '2,3,5,6,7,10,11' }, derived: { n: 'o^2*r' },
    steps: ['Find the largest perfect square that divides ${{n}}$: ${{o^2}}$, because ${{n}} = {{o^2}}\\cdot {{r}}$.',
            'Take the square root of the perfect square: $ \\sqrt{ {{o^2}} }\\cdot\\sqrt{ {{r}} } = {{o}}\\sqrt{ {{r}} } $'] });
  T('radicals', 'easier', 'Simplify: $ \\sqrt{ {{n}} } $', '{{o}}\\sqrt{ {{r}} }', { params: { o: '2..4', r: '2,3,5' }, derived: { n: 'o^2*r' } });
  T('radicals', 'parallel', 'Simplify: $ \\sqrt{ {{n}} } $', '{{o}}\\sqrt{ {{r}} }', { params: { o: '2..9', r: '2,3,5,6,7,10,11' }, derived: { n: 'o^2*r' } });
  T('radicals', 'parallel', 'Simplify: $ {{k}}\\sqrt{ {{n}} } $', '{{k*o}}\\sqrt{ {{r}} }', { params: { k: '2..5', o: '2..5', r: '2,3,5,6,7' }, derived: { n: 'o^2*r' } });
  T('radicals', 'parallel', 'Simplify: $ \\sqrt{ {{a}} }\\cdot\\sqrt{ {{b}} } $', '{{oo}}\\sqrt{ {{rr}} }', {
    params: { a: '2..12', b: '2..12' }, derived: { n: 'a*b', oo: 'outsq(n)', rr: 'insq(n)' }, constraints: ['oo > 1', 'rr > 1'] });
  T('radicals', 'challenge', 'Simplify: $ \\sqrt{ {{n1}} } + \\sqrt{ {{n2}} } $', '{{o1+o2}}\\sqrt{ {{r}} }', {
    params: { o1: '1..5', o2: '1..5', r: '2,3,5,7' }, derived: { n1: 'o1^2*r', n2: 'o2^2*r' }, constraints: ['o1 != o2'] });

  skill('eval-expr', 'Evaluating expressions', 'Radicals & expressions');
  T('eval-expr', 'worked', 'Evaluate $ {{a:coef}}x^2{{b:sgncoef}}x{{c:sign}} $ when $ x = {{k}} $.', '{{v}}', {
    params: { a: '-3..4 !0', b: '-5..5 !0', c: '-9..9 !0', k: '-4..4 !0' }, derived: { v: 'a*k^2+b*k+c' },
    steps: ['Substitute ${{k}}$ for $x$: $ {{a:coef}}({{k}})^2 + {{b:paren}}({{k}}) + {{c:paren}} $',
            'Exponent first, then multiply, then add: $ {{a*k^2}}{{b*k:sign}}{{c:sign}} = {{v}} $'] });
  T('eval-expr', 'easier', 'Evaluate $ {{a}}x{{b:sign}} $ when $ x = {{k}} $.', '{{v}}', {
    params: { a: '2..6', b: '-9..9 !0', k: '-4..6 !0' }, derived: { v: 'a*k+b' } });
  T('eval-expr', 'parallel', 'Evaluate $ x^2{{b:sgncoef}}x{{c:sign}} $ when $ x = {{k}} $.', '{{v}}', {
    params: { b: '-6..6 !0', c: '-9..9 !0', k: '-5..5 !0' }, derived: { v: 'k^2+b*k+c' } });
  T('eval-expr', 'parallel', 'Evaluate $ \\frac{ {{a}}x{{b:sign}} }{ {{d}} } $ when $ x = {{k}} $.', '{{t}}', {
    params: { d: '2..5', t: '-6..6', a: '2..5', k: '-4..4 !0' }, derived: { b: 't*d-a*k' }, constraints: ['b != 0', 'abs(b) <= 30'] });
  T('eval-expr', 'challenge', 'Evaluate $ {{a}} - {{b}}\\left({{c}} - {{k:paren}}\\right)^2 $.', '{{v}}', {
    params: { a: '1..20', b: '2..5', c: '-5..5', k: '-5..5' }, derived: { v: 'a-b*(c-k)^2' }, constraints: ['c != k'] });

  skill('proportions', 'Solving proportions', 'Radicals & expressions');
  T('proportions', 'worked', 'Solve the proportion: $ \\frac{x}{ {{a}} } = \\frac{ {{b}} }{ {{c}} } $', 'x = {{x}}', {
    params: { c: '2..9', a: '2..9', b: '2..12' }, derived: { x: 'a*b/c' }, constraints: ['mod(a*b,c)==0', 'b != c', 'a != c'],
    steps: ['Cross-multiply: $ {{c}}x = {{a}}\\cdot {{b}} = {{a*b}} $', 'Divide both sides by ${{c}}$: $ x = {{x}} $'] });
  T('proportions', 'easier', 'Solve the proportion: $ \\frac{ {{p}} }{ {{q}} } = \\frac{x}{ {{q*k}} } $', 'x = {{p*k}}', { params: { p: '1..6', q: '2..6', k: '2..5' } });
  T('proportions', 'parallel', 'Solve the proportion: $ \\frac{ {{a}} }{x} = \\frac{ {{b}} }{ {{c}} } $', 'x = {{x}}', {
    params: { x: '2..12', b: '2..6', c: '2..9' }, derived: { a: 'b*x/c' }, constraints: ['isint(a)', 'a >= 1'] });
  T('proportions', 'parallel', 'Solve the proportion: $ \\frac{x{{b:sign}}}{ {{a}} } = \\frac{ {{c}} }{ {{d}} } $', 'x = {{x}}', {
    params: { d: '2..5', k: '2..4', c: '2..9', b: '-6..6 !0' }, derived: { a: 'd*k', x: 'k*c-b' } });
  T('proportions', 'challenge', 'On a map, ${{a}}$ cm represents ${{b}}$ km. Two cities are ${{c}}$ cm apart on the map. How many kilometers apart are they?', '{{b*c/a}}\\text{ km}', {
    params: { a: '2..8', b: '10..50', c: '2..30' }, constraints: ['mod(b*c,a)==0', 'mod(c,a) != 0'] });
})();
