/* Unit: Linear functions, sequences, exponential functions */
(function () {
  const { skill, T } = RB;
  const U = 'Linear functions';

  // ---------------------------------------------------------------- slope
  skill('slope', 'Slope from two points', U);
  T('slope', 'worked', 'Find the slope of the line through $({{x1}}, {{y1}})$ and $({{x2}}, {{y2}})$.', 'm = {{m}}', {
    params: { x1: '-6..6 !0', y1: '-6..6 !0', dx: '1..6', dy: '-8..8 !0' }, derived: { x2: 'x1+dx', y2: 'y1+dy', m: 'dy/dx' },
    constraints: ['x2 != 0', 'y2 != 0'],
    steps: ['Use the slope formula: $ m = \\frac{y_2 - y_1}{x_2 - x_1} $',
            'Substitute the coordinates: $ m = \\frac{ {{y2}} - {{y1:paren}} }{ {{x2}} - {{x1:paren}} } $',
            'Subtract: $ m = \\frac{ {{dy}} }{ {{dx}} } $',
            'Reduce the fraction if you can: $ m = {{m}} $'] });
  T('slope', 'easier', 'Find the slope of the line through $({{x1}}, {{y1}})$ and $({{x2}}, {{y2}})$.', 'm = {{m}}', {
    params: { x1: '-4..4', y1: '-4..4', dx: '1..4', m: '1..5' }, derived: { dy: 'm*dx', x2: 'x1+dx', y2: 'y1+dy' } });
  T('slope', 'parallel', 'Find the slope of the line through $({{x1}}, {{y1}})$ and $({{x2}}, {{y2}})$.', 'm = {{m}}', {
    params: { x1: '-8..8', y1: '-8..8', dx: '-7..7 !0', dy: '-9..9 !0' }, derived: { x2: 'x1+dx', y2: 'y1+dy', m: 'dy/dx' } });
  T('slope', 'parallel', 'Find the slope of the line through $({{x1}}, {{y1}})$ and $({{x2}}, {{y2}})$.', 'm = 0', {
    params: { x1: '-8..8', y1: '-8..8', dx: '-7..7 !0' }, derived: { x2: 'x1+dx', y2: 'y1' } });
  T('slope', 'parallel', 'Find the slope of the line through $({{x1}}, {{y1}})$ and $({{x2}}, {{y2}})$.', 'm \\text{ is undefined}', {
    params: { x1: '-8..8', y1: '-8..8', dy: '-7..7 !0' }, derived: { x2: 'x1', y2: 'y1+dy' } });
  T('slope', 'challenge', 'The line through $({{x1}}, {{y1}})$ and $({{x2}}, y)$ has slope $ {{m}} $. Find $y$.', 'y = {{y}}', {
    params: { x1: '-5..5', y1: '-6..6', den: '1..4', mnum: '-5..5 !0', k: '1..3' },
    derived: { m: 'mnum/den', x2: 'x1+den*k', y: 'y1+mnum*k' } });

  // ---------------------------------------------------------------- slope & intercept
  skill('slope-int', 'Slope and y-intercept from an equation', U);
  T('slope-int', 'worked', 'Identify the slope and the $y$-intercept of $ y = {{m:coef}}x{{b:sign}} $.', 'm = {{m}}, \\quad b = {{b}}', {
    params: { m: '-8..8 !0', b: '-9..9 !0' },
    steps: ['Slope-intercept form is $ y = mx + b $: $m$ is the number multiplying $x$ and $b$ is the constant.',
            'Slope: $ m = {{m}} $. The $y$-intercept: $ b = {{b}} $.'] });
  T('slope-int', 'easier', 'Identify the slope and the $y$-intercept of $ y = {{m:coef}}x{{b:sign}} $.', 'm = {{m}}, \\quad b = {{b}}', {
    params: { m: '1..6', b: '1..9' } });
  T('slope-int', 'parallel', 'Identify the slope and the $y$-intercept of $ y = {{m:coef}}x{{b:sign}} $.', 'm = {{m}}, \\quad b = {{b}}', {
    params: { m: '-9..-1', b: '-9..9 !0' } });
  T('slope-int', 'parallel', 'Identify the slope and the $y$-intercept of $ y = {{m:coef}}x{{b:sign}} $.', 'm = {{m}}, \\quad b = {{b}}', {
    params: { sg: '-1,1', p: '1..5', q: '2..5', b: '-9..9 !0' }, derived: { m: 'sg*p/q' }, constraints: ['gcd(p,q)==1'] });
  T('slope-int', 'challenge', 'Write the equation in slope-intercept form, then identify the slope and $y$-intercept: $ {{a:coef}}x{{b:sgncoef}}y = {{c}} $', 'y = {{m:coef}}x{{yi:sign}}, \\quad m = {{m}}, \\quad b = {{yi}}', {
    params: { a: '1..6', b: '-6..6 !0', c: '-12..12 !0' }, derived: { m: '0-a/b', yi: 'c/b' } });

  // ---------------------------------------------------------------- writing equations
  skill('write-eq', 'Writing the equation of a line', U);
  T('write-eq', 'worked', 'Write the equation of the line with slope ${{m}}$ that passes through $({{x1}}, {{y1}})$.', 'y = {{m:coef}}x{{b:sign}}', {
    params: { m: '-5..5 !0', x1: '-5..5 !0', b: '-8..8 !0' }, derived: { y1: 'm*x1+b' },
    steps: ['Start with $ y = mx + b $ and substitute the slope and the point: $ {{y1}} = {{m}}({{x1}}) + b $',
            'Multiply: $ {{y1}} = {{m*x1}} + b $',
            'Solve for $b$: $ b = {{b}} $',
            'Write the equation: $ y = {{m:coef}}x{{b:sign}} $'] });
  T('write-eq', 'easier', 'Write the equation of the line with slope ${{m}}$ and $y$-intercept ${{b}}$.', 'y = {{m:coef}}x{{b:sign}}', {
    params: { m: '-6..6 !0', b: '-9..9 !0' } });
  T('write-eq', 'parallel', 'Write the equation of the line with slope ${{m}}$ that passes through $({{x1}}, {{y1}})$.', 'y = {{m:coef}}x{{b:sign}}', {
    params: { m: '-6..6 !0', x1: '-6..6 !0', b: '-9..9 !0' }, derived: { y1: 'm*x1+b' } });
  T('write-eq', 'parallel', 'Write the equation of the line through $({{x1}}, {{y1}})$ and $({{x2}}, {{y2}})$.', 'y = {{m:coef}}x{{b:sign}}', {
    params: { m: '-4..4 !0', x1: '-4..4', dx: '1..4', b: '-8..8 !0' }, derived: { x2: 'x1+dx', y1: 'm*x1+b', y2: 'm*x2+b' } });
  T('write-eq', 'challenge', 'Write the equation of the line through $({{x1}}, {{y1}})$ and $({{x2}}, {{y2}})$.', 'y = {{m:coef}}x{{b:sign}}', {
    params: { den: '2..4', mnum: '-5..5 !0', j: '-2..2', y1: '-6..6' },
    derived: { m: 'mnum/den', x1: 'den*j', x2: 'den*j+den', y2: 'y1+mnum', b: 'y1-mnum*j' }, constraints: ['gcd(abs(mnum),den)==1', 'b != 0'] });

  // ---------------------------------------------------------------- parallel & perpendicular
  skill('par-perp', 'Parallel and perpendicular lines', U);
  T('par-perp', 'worked', 'Write the equation of the line parallel to $ y = {{m:coef}}x{{b:sign}} $ that passes through $({{x1}}, {{y1}})$.', 'y = {{m:coef}}x{{c:sign}}', {
    params: { m: '-5..5 !0', b: '-9..9 !0', x1: '-5..5 !0', c: '-8..8 !0' }, derived: { y1: 'm*x1+c' }, constraints: ['b != c'],
    steps: ['Parallel lines have the same slope, so $ m = {{m}} $.',
            'Substitute the point into $ y = mx + b $: $ {{y1}} = {{m}}({{x1}}) + b $',
            'Solve for $b$: $ b = {{c}} $',
            'The equation is $ y = {{m:coef}}x{{c:sign}} $.'] });
  T('par-perp', 'easier', 'Are the lines parallel, perpendicular, or neither?\n$ y = {{m:coef}}x{{b1:sign}} $\n$ y = {{m:coef}}x{{b2:sign}} $', '\\text{parallel}', {
    params: { m: '-6..6 !0', b1: '-9..9 !0', b2: '-9..9 !0' }, constraints: ['b1 != b2'] });
  T('par-perp', 'easier', 'Are the lines parallel, perpendicular, or neither?\n$ y = {{m1:coef}}x{{b1:sign}} $\n$ y = {{m2:coef}}x{{b2:sign}} $', '\\text{perpendicular}', {
    params: { sg: '-1,1', p: '2..5', q: '2..5', b1: '-9..9 !0', b2: '-9..9 !0' },
    derived: { m1: 'sg*p/q', m2: '0-sg*q/p' }, constraints: ['gcd(p,q)==1', 'p != q'] });
  T('par-perp', 'easier', 'Are the lines parallel, perpendicular, or neither?\n$ y = {{m1:coef}}x{{b1:sign}} $\n$ y = {{m2:coef}}x{{b2:sign}} $', '\\text{neither}', {
    params: { m1: '2..6', m2: '-6..6 !0', b1: '-9..9 !0', b2: '-9..9 !0' }, constraints: ['m1 != m2'] });
  T('par-perp', 'parallel', 'Write the equation of the line parallel to $ y = {{m:coef}}x{{b:sign}} $ that passes through $({{x1}}, {{y1}})$.', 'y = {{m:coef}}x{{c:sign}}', {
    params: { m: '-6..6 !0', b: '-9..9 !0', x1: '-6..6 !0', c: '-9..9 !0' }, derived: { y1: 'm*x1+c' }, constraints: ['b != c'] });
  T('par-perp', 'parallel', 'Write the equation of the line perpendicular to $ y = {{m:coef}}x{{b:sign}} $ that passes through $({{x1}}, {{y1}})$.', 'y = {{pm:coef}}x{{c:sign}}', {
    params: { sg: '-1,1', p: '1..4', q: '1..4', j: '-3..3 !0', y1: '-6..6', b: '-9..9 !0' },
    derived: { m: 'sg*p/q', pm: '0-sg*q/p', x1: 'p*j', c: 'y1-pm*x1' }, constraints: ['gcd(p,q)==1', 'c != 0'] });
  T('par-perp', 'challenge', 'For what value of $k$ is the line $ y = {{m:coef}}x{{b:sign}} $ perpendicular to the line $ y = kx + 1 $?', 'k = {{k}}', {
    params: { sg: '-1,1', p: '1..6', q: '1..4', b: '-9..9 !0' }, derived: { m: 'sg*p/q', k: '0-1/m' }, constraints: ['gcd(p,q)==1'] });

  // ---------------------------------------------------------------- intercepts
  skill('intercepts', 'Finding intercepts', U);
  T('intercepts', 'worked', 'Find the $x$- and $y$-intercepts of $ {{a:coef}}x{{b:sgncoef}}y = {{c}} $.', 'x\\text{-intercept: } ({{p}}, 0), \\quad y\\text{-intercept: } (0, {{q}})', {
    params: { a: '2..5', b: '-5..5 !0,1,-1', k: '-2..2 !0' }, derived: { c: 'a*b*k', p: 'b*k', q: 'a*k' },
    steps: ['To find the $x$-intercept, set $y = 0$: $ {{a:coef}}x = {{c}} $, so $ x = {{p}} $.',
            'To find the $y$-intercept, set $x = 0$: $ {{b:coef}}y = {{c}} $, so $ y = {{q}} $.'] });
  T('intercepts', 'easier', 'Find the $x$- and $y$-intercepts of $ {{a:coef}}x{{b:sgncoef}}y = {{c}} $.', 'x\\text{-intercept: } ({{p}}, 0), \\quad y\\text{-intercept: } (0, {{q}})', {
    params: { a: '1..4', b: '1..4', k: '1..2' }, derived: { c: 'a*b*k', p: 'b*k', q: 'a*k' } });
  T('intercepts', 'parallel', 'Find the $x$- and $y$-intercepts of $ {{a:coef}}x{{b:sgncoef}}y = {{c}} $.', 'x\\text{-intercept: } ({{p}}, 0), \\quad y\\text{-intercept: } (0, {{q}})', {
    params: { a: '1..6', b: '-6..6 !0', k: '-3..3 !0' }, derived: { c: 'a*b*k', p: 'b*k', q: 'a*k' }, constraints: ['abs(c) <= 60'] });
  T('intercepts', 'parallel', 'Find the $x$-intercept of $ y = {{m:coef}}x{{b:sign}} $.', '({{p}}, 0)', {
    params: { m: '-5..5 !0', b: '-12..12 !0' }, derived: { p: '0-b/m' } });
  T('intercepts', 'challenge', 'Find the $x$- and $y$-intercepts of $ {{a:coef}}x{{b:sgncoef}}y = {{c}} $.', 'x\\text{-intercept: } ({{p}}, 0), \\quad y\\text{-intercept: } (0, {{q}})', {
    params: { a: '2..7', b: '-7..7 !0', c: '1..15' }, derived: { p: 'c/a', q: 'c/b' }, constraints: ['isint(p) == 0'] });

  // ---------------------------------------------------------------- function notation
  skill('functions', 'Function notation', 'Functions & sequences');
  T('functions', 'worked', 'If $ f(x) = {{a:coef}}x{{b:sign}} $, find $ f({{k}}) $.', 'f({{k}}) = {{v}}', {
    params: { a: '-6..6 !0', b: '-9..9 !0', k: '-5..5 !0' }, derived: { v: 'a*k+b' },
    steps: ['Replace $x$ with ${{k}}$: $ f({{k}}) = {{a:paren}}\\cdot {{k:paren}}{{b:sign}} $',
            'Multiply, then add: $ f({{k}}) = {{a*k}}{{b:sign}} = {{v}} $'] });
  T('functions', 'easier', 'If $ f(x) = {{a:coef}}x{{b:sign}} $, find $ f({{k}}) $.', 'f({{k}}) = {{v}}', {
    params: { a: '1..5', b: '1..9', k: '1..5' }, derived: { v: 'a*k+b' } });
  T('functions', 'parallel', 'If $ f(x) = x^2{{b:sgncoef}}x{{c:sign}} $, find $ f({{k}}) $.', 'f({{k}}) = {{v}}', {
    params: { b: '-6..6 !0', c: '-9..9 !0', k: '-4..4 !0' }, derived: { v: 'k^2+b*k+c' } });
  T('functions', 'parallel', 'If $ g(x) = {{a:coef}}x^2{{b:sign}} $, find $ g({{k}}) $.', 'g({{k}}) = {{v}}', {
    params: { a: '-3..4 !0', b: '-9..9 !0', k: '-4..4 !0' }, derived: { v: 'a*k^2+b' } });
  T('functions', 'challenge', 'If $ f(x) = {{a:coef}}x{{b:sign}} $ and $ f(x) = {{v}} $, find $x$.', 'x = {{x}}', {
    params: { a: '2..7', b: '-9..9 !0', x: '-8..8' }, derived: { v: 'a*x+b' } });
  T('functions', 'challenge', 'If $ f(x) = {{a:coef}}x{{b:sign}} $ and $ g(x) = x^2{{c:sign}} $, find $ f(g({{k}})) $.', 'f(g({{k}})) = {{v}}', {
    params: { a: '2..4', b: '-6..6 !0', c: '-5..5 !0', k: '-3..3 !0' }, derived: { gk: 'k^2+c', v: 'a*gk+b' } });

  // ---------------------------------------------------------------- arithmetic sequences
  skill('seq', 'Arithmetic sequences', 'Functions & sequences');
  T('seq', 'worked', 'Find the {{n}}th term of the arithmetic sequence $ {{t1}}, {{t2}}, {{t3}}, \\ldots $', 'a_{ {{n}} } = {{v}}', {
    params: { t1: '-10..20', d: '-6..8 !0', n: '10,12,15,20,25,30,40,50' }, derived: { t2: 't1+d', t3: 't1+2*d', v: 't1+(n-1)*d' },
    steps: ['Find the common difference: $ d = {{t2}} - {{t1:paren}} = {{d}} $',
            'Use $ a_n = a_1 + (n - 1)d $: $ a_{ {{n}} } = {{t1}} + ({{n}} - 1)({{d:paren}}) $',
            'Simplify: $ a_{ {{n}} } = {{v}} $'] });
  T('seq', 'easier', 'Find the next three terms of the arithmetic sequence $ {{t1}}, {{t2}}, {{t3}}, \\ldots $', '{{t4}}, \; {{t5}}, \; {{t6}}', {
    params: { t1: '1..12', d: '2..6' }, derived: { t2: 't1+d', t3: 't1+2*d', t4: 't1+3*d', t5: 't1+4*d', t6: 't1+5*d' } });
  T('seq', 'parallel', 'Find the {{n}}th term of the arithmetic sequence $ {{t1}}, {{t2}}, {{t3}}, \\ldots $', 'a_{ {{n}} } = {{v}}', {
    params: { t1: '-20..20', d: '-9..-2', n: '10,12,15,20,25,30,40,50' }, derived: { t2: 't1+d', t3: 't1+2*d', v: 't1+(n-1)*d' } });
  T('seq', 'parallel', 'Write a formula for the $n$th term of the arithmetic sequence $ {{t1}}, {{t2}}, {{t3}}, \\ldots $', 'a_n = {{d:coef}}n{{c0:sign}}', {
    params: { t1: '-8..15', d: '-6..8 !0' }, derived: { t2: 't1+d', t3: 't1+2*d', c0: 't1-d' }, constraints: ['c0 != 0'] });
  T('seq', 'challenge', 'Which term of the arithmetic sequence $ {{t1}}, {{t2}}, {{t3}}, \\ldots $ is equal to ${{v}}$?', 'n = {{n}}', {
    params: { t1: '-10..15', d: '2..8', n: '8..30' }, derived: { t2: 't1+d', t3: 't1+2*d', v: 't1+(n-1)*d' } });

  // ---------------------------------------------------------------- exponential functions
  skill('exp-fn', 'Exponential functions', 'Functions & sequences');
  T('exp-fn', 'worked', 'If $ f(x) = {{a}}\\cdot {{b}}^x $, find $ f({{k}}) $.', 'f({{k}}) = {{v}}', {
    params: { a: '1..5', b: '2..4', k: '2..4' }, derived: { v: 'a*b^k' }, constraints: ['a != b'],
    steps: ['Substitute ${{k}}$ for $x$: $ f({{k}}) = {{a}}\\cdot {{b}}^{ {{k}} } $',
            'Evaluate the power first, then multiply: $ {{a}}\\cdot {{b^k}} = {{v}} $'] });
  T('exp-fn', 'easier', 'Evaluate $ {{b}}^{ {{k}} } $.', '{{b^k}}', { params: { b: '2..6', k: '2..4' } });
  T('exp-fn', 'parallel', 'Does $ y = {{a}}\\cdot {{b}}^x $ model exponential growth or decay?', '\\text{exponential growth}', {
    params: { a: '1..9', b: '2..5' } });
  T('exp-fn', 'parallel', 'Does $ y = {{a}}\\left({{b}}\\right)^x $ model exponential growth or decay?', '\\text{exponential decay}', {
    params: { a: '1..9', p: '1..4', q: '2..5' }, derived: { b: 'p/q' }, constraints: ['p < q', 'gcd(p,q)==1'] });
  T('exp-fn', 'parallel', 'If $ f(x) = {{a}}\\left(\\frac{1}{2}\\right)^x $, find $ f({{k}}) $.', 'f({{k}}) = {{j}}', {
    params: { j: '1..6', k: '1..4' }, derived: { a: 'j*2^k' } });
  T('exp-fn', 'challenge', 'A population of ${{p}}$ bacteria multiplies by ${{m}}$ every hour. How many bacteria are there after ${{k}}$ hours?', '{{p}}\\cdot {{m}}^{ {{k}} } = {{v}}', {
    params: { p: '5..50', m: '2,3', k: '3..6' }, derived: { v: 'p*m^k' } });
})();
