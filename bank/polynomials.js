/* Unit: Exponents & polynomials */
(function () {
  const { skill, T } = RB;
  const U = 'Exponents & polynomials';

  skill('exp-rules', 'Exponent rules', U);
  T('exp-rules', 'worked', 'Simplify: $ ({{p}}x^{ {{a}} })({{q}}x^{ {{b}} }) $', '{{p*q}}x^{ {{a+b}} }', {
    params: { p: '2..5', q: '2..5', a: '2..6', b: '2..6' }, constraints: ['a != b'],
    steps: ['Multiply the coefficients: $ {{p}}\\cdot {{q}} = {{p*q}} $',
            'Add the exponents of $x$ (same base): $ {{a}} + {{b}} = {{a+b}} $',
            'Result: $ {{p*q}}x^{ {{a+b}} } $'] });
  T('exp-rules', 'easier', 'Simplify: $ x^{ {{a}} }\\cdot x^{ {{b}} } $', 'x^{ {{a+b}} }', { params: { a: '2..7', b: '2..7' } });
  T('exp-rules', 'easier', 'Simplify: $ (x^{ {{a}} })^{ {{b}} } $', 'x^{ {{a*b}} }', { params: { a: '2..5', b: '2..4' } });
  T('exp-rules', 'parallel', 'Simplify: $ ({{p}}x^{ {{a}} })^{ {{b}} } $', '{{p^b}}x^{ {{a*b}} }', { params: { p: '2..4', a: '2..5', b: '2..3' } });
  T('exp-rules', 'parallel', 'Simplify: $ \\frac{ {{p}}x^{ {{a}} } }{ {{q}}x^{ {{b}} } } $', '{{k}}x^{ {{a-b}} }', {
    params: { q: '2..5', k: '2..6', a: '4..9', b: '2..3' }, derived: { p: 'q*k' }, constraints: ['a-b >= 2'] });
  T('exp-rules', 'challenge', 'Simplify: $ \\frac{ ({{p}}x^{ {{a}} })^{ {{b}} } }{ {{q}}x^{ {{c}} } } $', '{{p^b/q:coef}}x^{ {{a*b-c}} }', {
    params: { p: '2..3', b: '2..3', q: '2..9', a: '2..5', c: '2..6' }, constraints: ['mod(p^b,q)==0', 'a*b-c >= 2'] });

  skill('neg-exp', 'Zero and negative exponents', U);
  T('neg-exp', 'worked', 'Evaluate: $ {{a}}^{ -{{n}} } $', '\\frac{1}{ {{a^n}} }', {
    params: { a: '2..6', n: '2..3' },
    steps: ['A negative exponent means "take the reciprocal": $ {{a}}^{ -{{n}} } = \\frac{1}{ {{a}}^{ {{n}} } } $',
            'Evaluate the power: $ \\frac{1}{ {{a^n}} } $'] });
  T('neg-exp', 'easier', 'Evaluate: $ {{a}}^0 $', '1', { params: { a: '2..12' } });
  T('neg-exp', 'easier', 'Evaluate: $ {{a}}^{-1} $', '\\frac{1}{ {{a}} }', { params: { a: '2..9' } });
  T('neg-exp', 'parallel', 'Evaluate: $ \\left(\\frac{ {{a}} }{ {{b}} }\\right)^{ -{{n}} } $', '{{(b/a)^n}}', {
    params: { a: '1..4', b: '2..5', n: '1..3' }, constraints: ['gcd(a,b)==1', 'a != b'] });
  T('neg-exp', 'parallel', 'Rewrite with positive exponents: $ {{p}}x^{ -{{a}} } $', '\\frac{ {{p}} }{ x^{ {{a}} } }', { params: { p: '2..9', a: '2..5' } });
  T('neg-exp', 'challenge', 'Rewrite with positive exponents: $ \\frac{ {{p}}x^{ -{{a}} } }{ y^{ -{{b}} } } $', '\\frac{ {{p}}y^{ {{b}} } }{ x^{ {{a}} } }', {
    params: { p: '2..9', a: '2..5', b: '2..5' } });

  skill('poly-add', 'Adding and subtracting polynomials', U);
  const P1 = '({{a:coef}}x^2{{b:sgncoef}}x{{c:sign}})', P2 = '({{d:coef}}x^2{{e:sgncoef}}x{{f:sign}})';
  T('poly-add', 'worked', 'Simplify: $ ' + P1 + ' + ' + P2 + ' $', '{{a+d:coef}}x^2{{b+e:sgncoef}}x{{c+f:sign}}', {
    params: { a: '-5..5 !0', b: '-6..6 !0', c: '-9..9 !0', d: '-5..5 !0', e: '-6..6 !0', f: '-9..9 !0' },
    constraints: ['a+d != 0', 'b+e != 0', 'c+f != 0'],
    steps: ['Group like terms: $ ({{a}} + {{d:paren}})x^2 + ({{b}} + {{e:paren}})x + ({{c}} + {{f:paren}}) $',
            'Add the coefficients: $ {{a+d:coef}}x^2{{b+e:sgncoef}}x{{c+f:sign}} $'] });
  T('poly-add', 'easier', 'Simplify: $ ({{a:coef}}x{{b:sign}}) + ({{d:coef}}x{{e:sign}}) $', '{{a+d:coef}}x{{b+e:sign}}', {
    params: { a: '1..5', b: '1..9', d: '1..5', e: '1..9' } });
  T('poly-add', 'parallel', 'Simplify: $ ' + P1 + ' + ' + P2 + ' $', '{{a+d:coef}}x^2{{b+e:sgncoef}}x{{c+f:sign}}', {
    params: { a: '-6..6 !0', b: '-8..8 !0', c: '-9..9 !0', d: '-6..6 !0', e: '-8..8 !0', f: '-9..9 !0' },
    constraints: ['a+d != 0', 'b+e != 0', 'c+f != 0'] });
  T('poly-add', 'parallel', 'Simplify: $ ' + P1 + ' - ' + P2 + ' $', '{{a-d:coef}}x^2{{b-e:sgncoef}}x{{c-f:sign}}', {
    params: { a: '-6..6 !0', b: '-8..8 !0', c: '-9..9 !0', d: '-6..6 !0', e: '-8..8 !0', f: '-9..9 !0' },
    constraints: ['a-d != 0', 'b-e != 0', 'c-f != 0'] });
  T('poly-add', 'challenge', 'Simplify: $ {{k}}' + P1 + ' - ' + P2 + ' $', '{{k*a-d:coef}}x^2{{k*b-e:sgncoef}}x{{k*c-f:sign}}', {
    params: { k: '2..4', a: '-4..4 !0', b: '-5..5 !0', c: '-6..6 !0', d: '-6..6 !0', e: '-8..8 !0', f: '-9..9 !0' },
    constraints: ['k*a-d != 0', 'k*b-e != 0', 'k*c-f != 0'] });

  skill('poly-mult', 'Multiplying polynomials', U);
  T('poly-mult', 'worked', 'Multiply: $ (x{{a:sign}})(x{{b:sign}}) $', 'x^2{{a+b:sgncoef}}x{{a*b:sign}}', {
    params: { a: '-9..9 !0', b: '-9..9 !0' }, constraints: ['a+b != 0'],
    steps: ['Use FOIL (First, Outer, Inner, Last): $ x\\cdot x + x\\cdot {{b:paren}} + {{a:paren}}\\cdot x + {{a:paren}}\\cdot {{b:paren}} $',
            'Combine like terms: $ x^2{{a+b:sgncoef}}x{{a*b:sign}} $'] });
  T('poly-mult', 'easier', 'Multiply: $ {{k:coef}}x({{a:coef}}x{{b:sign}}) $', '{{k*a:coef}}x^2{{k*b:sgncoef}}x', {
    params: { k: '2..5', a: '1..4', b: '-6..6 !0' } });
  T('poly-mult', 'parallel', 'Multiply: $ (x{{a:sign}})(x{{b:sign}}) $', 'x^2{{a+b:sgncoef}}x{{a*b:sign}}', {
    params: { a: '-9..9 !0', b: '-9..9 !0' }, constraints: ['a+b != 0'] });
  T('poly-mult', 'parallel', 'Multiply: $ ({{a:coef}}x{{b:sign}})({{c:coef}}x{{d:sign}}) $', '{{a*c:coef}}x^2{{a*d+b*c:sgncoef}}x{{b*d:sign}}', {
    params: { a: '2..4', c: '1..4', b: '-6..6 !0', d: '-6..6 !0' }, constraints: ['a*d+b*c != 0'] });
  T('poly-mult', 'challenge', 'Multiply: $ (x{{a:sign}})(x^2{{b:sgncoef}}x{{c:sign}}) $', 'x^3{{a+b:sgncoef}}x^2{{c+a*b:sgncoef}}x{{a*c:sign}}', {
    params: { a: '-4..4 !0', b: '-4..4 !0', c: '-6..6 !0' }, constraints: ['a+b != 0', 'c+a*b != 0'] });

  skill('special', 'Special products (squares and conjugates)', U);
  T('special', 'worked', 'Expand: $ (x{{a:sign}})^2 $', 'x^2{{2*a:sgncoef}}x{{a^2:sign}}', {
    params: { a: '-9..9 !0' },
    steps: ['Use $ (x + a)^2 = x^2 + 2ax + a^2 $ with $a = {{a}}$:',
            'Square the first term, double the product, square the last term: $ x^2{{2*a:sgncoef}}x{{a^2:sign}} $'] });
  T('special', 'easier', 'Expand: $ (x{{a:sign}})(x{{na:sign}}) $', 'x^2{{0-a^2:sign}}', { params: { a: '1..9' }, derived: { na: '0-a' } });
  T('special', 'parallel', 'Expand: $ ({{k:coef}}x{{a:sign}})^2 $', '{{k^2}}x^2{{2*k*a:sgncoef}}x{{a^2:sign}}', { params: { k: '2..5', a: '-7..7 !0' } });
  T('special', 'parallel', 'Expand: $ ({{k:coef}}x{{a:sign}})({{k:coef}}x{{na:sign}}) $', '{{k^2}}x^2{{0-a^2:sign}}', {
    params: { k: '2..5', a: '-8..8 !0' }, derived: { na: '0-a' } });
  T('special', 'challenge', 'Simplify: $ (x{{a:sign}})^2 - (x{{b:sign}})^2 $', '{{2*a-2*b:coef}}x{{a^2-b^2:sign}}', {
    params: { a: '-6..6 !0', b: '-6..6 !0' }, constraints: ['a != b', 'a*a != b*b'] });
})();
