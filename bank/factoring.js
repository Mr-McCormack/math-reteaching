/* Unit: Factoring & quadratics */
(function () {
  const { skill, T } = RB;
  const U = 'Factoring & quadratics';

  skill('gcf', 'Factoring out the GCF', U);
  T('gcf', 'worked', 'Factor out the greatest common factor: $ {{g*a:coef}}x{{g*b:sign}} $', '{{g}}({{a:coef}}x{{b:sign}})', {
    params: { g: '2..9', a: '1..5', b: '-9..9 !0' }, constraints: ['gcd(a,b)==1'],
    steps: ['The greatest common factor of ${{g*a}}$ and ${{g*b:abs}}$ is ${{g}}$.',
            'Divide each term by ${{g}}$ and write the result in parentheses: $ {{g}}({{a:coef}}x{{b:sign}}) $'] });
  T('gcf', 'easier', 'Factor out the greatest common factor: $ {{g*a:coef}}x{{g*b:sign}} $', '{{g}}({{a:coef}}x{{b:sign}})', {
    params: { g: '2..6', a: '1..3', b: '1..9' }, constraints: ['gcd(a,b)==1'] });
  T('gcf', 'parallel', 'Factor out the greatest common factor: $ {{g*a:coef}}x^2{{g*b:sgncoef}}x $', '{{g}}x({{a:coef}}x{{b:sign}})', {
    params: { g: '2..6', a: '1..4', b: '-6..6 !0' }, constraints: ['gcd(a,b)==1'] });
  T('gcf', 'parallel', 'Factor out the greatest common factor: $ {{g*a:coef}}x^2{{g*b:sgncoef}}x{{g*c:sign}} $', '{{g}}({{a:coef}}x^2{{b:sgncoef}}x{{c:sign}})', {
    params: { g: '2..5', a: '1..3', b: '-5..5 !0', c: '-6..6 !0' }, constraints: ['gcd(gcd(a,b),c)==1'] });
  T('gcf', 'challenge', 'Factor completely: $ {{g}}x^2{{g*(p+q):sgncoef}}x{{g*p*q:sign}} $', '{{g}}(x{{p:sign}})(x{{q:sign}})', {
    params: { g: '2..4', p: '-6..6 !0', q: '-6..6 !0' }, constraints: ['p <= q', 'p+q != 0'] });

  skill('fact-1', 'Factoring x² + bx + c', U);
  const F1 = 'Factor: $ x^2{{p+q:sgncoef}}x{{p*q:sign}} $';
  T('fact-1', 'worked', F1, '(x{{p:sign}})(x{{q:sign}})', {
    params: { p: '1..9', q: '1..9' }, constraints: ['p <= q'],
    steps: ['Find two numbers that multiply to ${{p*q}}$ and add to ${{p+q}}$: they are ${{p}}$ and ${{q}}$.',
            'Write the factors: $ (x{{p:sign}})(x{{q:sign}}) $'] });
  T('fact-1', 'easier', F1, '(x{{p:sign}})(x{{q:sign}})', { params: { p: '1..6', q: '1..6' }, constraints: ['p <= q'] });
  T('fact-1', 'parallel', F1, '(x{{p:sign}})(x{{q:sign}})', { params: { p: '-9..9 !0', q: '-9..9 !0' }, constraints: ['p <= q', 'p+q != 0'] });
  T('fact-1', 'parallel', F1, '(x{{p:sign}})(x{{q:sign}})', { params: { p: '-9..-1', q: '-9..-1' }, constraints: ['p <= q'] });
  T('fact-1', 'challenge', 'Factor: $ -x^2{{0-(p+q):sgncoef}}x{{0-p*q:sign}} $', '-(x{{p:sign}})(x{{q:sign}})', {
    params: { p: '-8..8 !0', q: '-8..8 !0' }, constraints: ['p <= q', 'p+q != 0'] });

  skill('fact-a', 'Factoring ax² + bx + c (a > 1)', U);
  const FA = 'Factor: $ {{a}}x^2{{b:sgncoef}}x{{c:sign}} $';
  const FA_PARAMS = { m: '1..2', n: '1..3', p: '-6..6 !0', q: '-6..6 !0' };
  const FA_DER = { a: 'm*n', b: 'm*q+n*p', c: 'p*q' };
  const FA_CON = ['a > 1', 'b != 0', 'gcd(m,p)==1', 'gcd(n,q)==1', 'gcd(gcd(a,b),c)==1'];
  T('fact-a', 'worked', FA, '({{m:coef}}x{{p:sign}})({{n:coef}}x{{q:sign}})', {
    params: FA_PARAMS, derived: FA_DER, constraints: FA_CON,
    steps: ['Multiply $a\\cdot c$: ${{a}}\\cdot {{c:paren}} = {{a*c}}$. Find two numbers that multiply to ${{a*c}}$ and add to ${{b}}$: ${{m*q}}$ and ${{n*p}}$.',
            'Split the middle term: $ {{a}}x^2{{m*q:sgncoef}}x{{n*p:sgncoef}}x{{c:sign}} $',
            'Factor by grouping: $ ({{m:coef}}x{{p:sign}})({{n:coef}}x{{q:sign}}) $'] });
  T('fact-a', 'easier', FA, '({{m:coef}}x{{p:sign}})({{n:coef}}x{{q:sign}})', {
    params: { m: '1..1', n: '2..3', p: '1..6', q: '1..6' }, derived: FA_DER, constraints: ['a > 1', 'gcd(n,q)==1', 'gcd(gcd(a,b),c)==1'] });
  T('fact-a', 'parallel', FA, '({{m:coef}}x{{p:sign}})({{n:coef}}x{{q:sign}})', { params: FA_PARAMS, derived: FA_DER, constraints: FA_CON });
  T('fact-a', 'parallel', FA, '({{m:coef}}x{{p:sign}})({{n:coef}}x{{q:sign}})', {
    params: { m: '1..3', n: '2..4', p: '-6..-1', q: '-6..-1' }, derived: FA_DER, constraints: FA_CON });
  T('fact-a', 'challenge', 'Factor: $ {{0-a:coef}}x^2{{0-b:sgncoef}}x{{0-c:sign}} $', '-({{m:coef}}x{{p:sign}})({{n:coef}}x{{q:sign}})', {
    params: FA_PARAMS, derived: FA_DER, constraints: FA_CON });

  skill('diff-sq', 'Difference of squares', U);
  T('diff-sq', 'worked', 'Factor: $ x^2 - {{k^2}} $', '(x{{0-k:sign}})(x{{k:sign}})', {
    params: { k: '2..12' },
    steps: ['This is a difference of squares: $ a^2 - b^2 = (a - b)(a + b) $, with $a = x$ and $b = {{k}}$.',
            'Write the factors: $ (x{{0-k:sign}})(x{{k:sign}}) $'] });
  T('diff-sq', 'easier', 'Factor: $ x^2 - {{k^2}} $', '(x{{0-k:sign}})(x{{k:sign}})', { params: { k: '2..9' } });
  T('diff-sq', 'parallel', 'Factor: $ {{a^2}}x^2 - {{b^2}} $', '({{a:coef}}x{{0-b:sign}})({{a:coef}}x{{b:sign}})', {
    params: { a: '2..6', b: '1..9' }, constraints: ['gcd(a,b)==1'] });
  T('diff-sq', 'parallel', 'Factor: $ {{a^2:coef}}x^2 - {{b^2}}y^2 $', '({{a:coef}}x{{0-b:sgncoef}}y)({{a:coef}}x{{b:sgncoef}}y)', {
    params: { a: '1..6', b: '2..7' }, constraints: ['gcd(a,b)==1'] });
  T('diff-sq', 'challenge', 'Factor completely: $ {{g}}x^2 - {{g*k^2}} $', '{{g}}(x{{0-k:sign}})(x{{k:sign}})', { params: { g: '2..5', k: '2..6' } });

  skill('quad-fact', 'Solving quadratics by factoring', U);
  T('quad-fact', 'worked', 'Solve by factoring: $ x^2{{b:sgncoef}}x{{c:sign}} = 0 $', 'x = {{r1}} \\text{ or } x = {{r2}}', {
    params: { r1: '-8..8 !0', r2: '-8..8 !0' }, derived: { b: '0-(r1+r2)', c: 'r1*r2' }, constraints: ['r1 < r2', 'r1+r2 != 0'],
    steps: ['Factor the left side: $ (x{{0-r1:sign}})(x{{0-r2:sign}}) = 0 $',
            'Set each factor equal to zero: $ x{{0-r1:sign}} = 0 \\quad\\text{or}\\quad x{{0-r2:sign}} = 0 $',
            'Solve each equation: $ x = {{r1}} \\quad\\text{or}\\quad x = {{r2}} $'] });
  T('quad-fact', 'easier', 'Solve by factoring: $ x^2{{b:sgncoef}}x{{c:sign}} = 0 $', 'x = {{r1}} \\text{ or } x = {{r2}}', {
    params: { r1: '1..7', r2: '1..8' }, derived: { b: '0-(r1+r2)', c: 'r1*r2' }, constraints: ['r1 < r2'] });
  T('quad-fact', 'parallel', 'Solve by factoring: $ x^2{{b:sgncoef}}x{{c:sign}} = 0 $', 'x = {{r1}} \\text{ or } x = {{r2}}', {
    params: { r1: '-9..9 !0', r2: '-9..9 !0' }, derived: { b: '0-(r1+r2)', c: 'r1*r2' }, constraints: ['r1 < r2', 'r1+r2 != 0'] });
  T('quad-fact', 'parallel', 'Solve: $ x^2{{b:sgncoef}}x = {{rhs}} $', 'x = {{r1}} \\text{ or } x = {{r2}}', {
    params: { r1: '-8..8 !0', r2: '-8..8 !0' }, derived: { b: '0-(r1+r2)', rhs: '0-r1*r2' }, constraints: ['r1 < r2', 'r1+r2 != 0'] });
  T('quad-fact', 'challenge', 'Solve by factoring: $ {{a}}x^2{{bb:sgncoef}}x{{cc:sign}} = 0 $', 'x = {{ra}} \\text{ or } x = {{rb}}', {
    params: { m: '1..2', n: '1..3', p: '-6..6 !0', q: '-6..6 !0' },
    derived: { a: 'm*n', bb: 'm*q+n*p', cc: 'p*q', ra: '0-p/m', rb: '0-q/n' },
    constraints: ['a > 1', 'bb != 0', 'ra < rb', 'gcd(m,p)==1', 'gcd(n,q)==1', 'gcd(gcd(a,bb),cc)==1'] });

  skill('quad-formula', 'Quadratic formula & discriminant', U);
  const QF = 'Solve using the quadratic formula: $ {{a:coef}}x^2{{b:sgncoef}}x{{c:sign}} = 0 $';
  T('quad-formula', 'worked', QF, 'x = {{r1}} \\text{ or } x = {{r2}}', {
    params: { m: '1..2', n: '1..3', p: '-6..6 !0', q: '-6..6 !0' },
    derived: { a: 'm*n', b: 'm*q+n*p', c: 'p*q', D: 'b^2-4*a*c', sd: 'sqrt(D)', nb: '0-b', r1: '(nb-sd)/(2*a)', r2: '(nb+sd)/(2*a)' },
    constraints: ['b != 0', 'D > 0', 'r1 < r2'],
    steps: ['Identify $ a = {{a}} $, $ b = {{b}} $, $ c = {{c}} $.',
            'Substitute into $ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $: $ x = \\frac{ -{{b:paren}} \\pm \\sqrt{ {{b:paren}}^2 - 4\\cdot {{a:paren}}\\cdot {{c:paren}} } }{ 2\\cdot {{a:paren}} } $',
            'Simplify under the radical: $ \\sqrt{ {{D}} } = {{sd}} $, so $ x = \\frac{ {{nb}} \\pm {{sd}} }{ {{2*a}} } $',
            'Split into two answers: $ x = {{r1}} \\quad\\text{or}\\quad x = {{r2}} $'] });
  T('quad-formula', 'easier', 'Find the discriminant $ b^2 - 4ac $ of $ {{a:coef}}x^2{{b:sgncoef}}x{{c:sign}} = 0 $.', 'b^2 - 4ac = {{D}}', {
    params: { a: '1..4', b: '-6..6 !0', c: '-6..6 !0' }, derived: { D: 'b^2-4*a*c' } });
  T('quad-formula', 'parallel', 'How many real solutions does $ {{a:coef}}x^2{{b:sgncoef}}x{{c:sign}} = 0 $ have?', '\\text{two real solutions}', {
    params: { a: '1..4', b: '-8..8 !0', c: '-6..6 !0' }, derived: { D: 'b^2-4*a*c' }, constraints: ['D > 0'] });
  T('quad-formula', 'parallel', 'How many real solutions does $ {{a:coef}}x^2{{b:sgncoef}}x{{c:sign}} = 0 $ have?', '\\text{one real solution}', {
    params: { a: '1..4', r: '-5..5 !0' }, derived: { b: '0-2*a*r', c: 'a*r^2' } });
  T('quad-formula', 'parallel', 'How many real solutions does $ {{a:coef}}x^2{{b:sgncoef}}x{{c:sign}} = 0 $ have?', '\\text{no real solutions}', {
    params: { a: '1..4', b: '-6..6 !0', c: '1..9' }, derived: { D: 'b^2-4*a*c' }, constraints: ['D < 0'] });
  T('quad-formula', 'parallel', QF, 'x = {{r1}} \\text{ or } x = {{r2}}', {
    params: { m: '1..3', n: '1..3', p: '-6..6 !0', q: '-6..6 !0' },
    derived: { a: 'm*n', b: 'm*q+n*p', c: 'p*q', D: 'b^2-4*a*c', sd: 'sqrt(D)', r1: '(0-b-sd)/(2*a)', r2: '(0-b+sd)/(2*a)' },
    constraints: ['a > 1', 'b != 0', 'D > 0', 'r1 < r2'] });
  T('quad-formula', 'challenge', 'Solve using the quadratic formula (leave your answer in simplest radical form): $ {{a:coef}}x^2{{b:sgncoef}}x{{c:sign}} = 0 $', 'x = \\frac{ {{nb}} \\pm \\sqrt{ {{D}} } }{ {{2*a}} }', {
    params: { a: '1..3', b: '-8..8 !0', c: '-6..6 !0' }, derived: { D: 'b^2-4*a*c', nb: '0-b' }, constraints: ['D > 1', 'outsq(D) == 1'] });

  skill('vertex', 'Vertex and axis of symmetry', U);
  T('vertex', 'worked', 'Identify the vertex of $ y = {{a:coef}}(x{{p:sign}})^2{{q:sign}} $.', '({{h}}, {{q}})', {
    params: { a: '-3..3 !0', h: '-6..6 !0', q: '-8..8 !0' }, derived: { p: '0-h' },
    steps: ['Vertex form is $ y = a(x - h)^2 + k $, with vertex $ (h, k) $.',
            'Here $ x{{p:sign}} $ matches $ x - h $, so $ h = {{h}} $, and $ k = {{q}} $.'] });
  T('vertex', 'easier', 'Identify the vertex of $ y = (x{{p:sign}})^2{{q:sign}} $.', '({{h}}, {{q}})', {
    params: { h: '-6..6 !0', q: '-8..8 !0' }, derived: { p: '0-h' } });
  T('vertex', 'parallel', 'Identify the vertex of $ y = {{a:coef}}(x{{p:sign}})^2{{q:sign}} $.', '({{h}}, {{q}})', {
    params: { a: '-4..4 !0', h: '-8..8 !0', q: '-9..9 !0' }, derived: { p: '0-h' } });
  T('vertex', 'parallel', 'Find the axis of symmetry of $ y = x^2{{b:sgncoef}}x{{c:sign}} $.', 'x = {{ax}}', {
    params: { hb: '-6..6 !0', c: '-9..9 !0' }, derived: { b: '2*hb', ax: '0-hb' } });
  T('vertex', 'challenge', 'Find the vertex of $ y = {{a:coef}}x^2{{b:sgncoef}}x{{c:sign}} $.', '({{h}}, {{k}})', {
    params: { a: '1..3', h: '-4..4 !0', k: '-8..8 !0' }, derived: { b: '0-2*a*h', c: 'k+a*h^2' }, constraints: ['b != 0', 'c != 0'],
    steps: ['The $x$-coordinate of the vertex is $ x = -\\frac{b}{2a} = -\\frac{ {{b:paren}} }{ 2\\cdot {{a}} } = {{h}} $.',
            'Substitute $x = {{h}}$ to find $y$: $ y = {{k}} $. The vertex is $ ({{h}}, {{k}}) $.'] });
})();
