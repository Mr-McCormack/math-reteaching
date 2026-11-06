/* Unit: Solving equations & inequalities */
(function () {
  const { skill, T } = RB;
  const U1 = 'Solving equations', U2 = 'Inequalities';

  // ---------------------------------------------------------------- one-step
  skill('one-step', 'One-step equations', U1);
  T('one-step', 'worked', 'Solve for $x$: $ x{{a:sign}} = {{c}} $', 'x = {{x}}', {
    params: { a: '-12..12 !0', x: '-12..12 !0' }, derived: { c: 'x+a', na: '0-a' },
    steps: ['Do the opposite operation on both sides to undo the addition or subtraction: $ x = {{c}}{{na:sign}} $',
            'Simplify: $ x = {{x}} $', 'Check: $ {{x}}{{a:sign}} = {{c}} $ ✓'] });
  T('one-step', 'worked', 'Solve for $x$: $ {{a:coef}}x = {{c}} $', 'x = {{x}}', {
    params: { a: '-9..9 !0,1,-1', x: '-9..9 !0' }, derived: { c: 'a*x' },
    steps: ['Undo the multiplication by dividing both sides by ${{a}}$: $ x = \\frac{ {{c}} }{ {{a}} } $',
            'Simplify: $ x = {{x}} $', 'Check: $ {{a}}\\cdot {{x:paren}} = {{c}} $ ✓'] });
  T('one-step', 'easier', 'Solve for $x$: $ x + {{a}} = {{c}} $', 'x = {{x}}', {
    params: { a: '1..9', x: '1..9' }, derived: { c: 'x+a' } });
  T('one-step', 'easier', 'Solve for $x$: $ {{a}}x = {{c}} $', 'x = {{x}}', {
    params: { a: '2..9', x: '1..9' }, derived: { c: 'a*x' } });
  T('one-step', 'parallel', 'Solve for $x$: $ x{{a:sign}} = {{c}} $', 'x = {{x}}', {
    params: { a: '-15..15 !0', x: '-15..15 !0' }, derived: { c: 'x+a' } });
  T('one-step', 'parallel', 'Solve for $x$: $ {{a:coef}}x = {{c}} $', 'x = {{x}}', {
    params: { a: '-9..9 !0', x: '-9..9 !0' }, derived: { c: 'a*x' } });
  T('one-step', 'parallel', 'Solve for $x$: $ \\frac{x}{ {{a}} } = {{c}} $', 'x = {{x}}', {
    params: { a: '2..9', c: '-9..9 !0' }, derived: { x: 'a*c' } });
  T('one-step', 'challenge', 'Solve for $x$: $ \\frac{ {{a}} }{ {{b}} }x = {{c}} $', 'x = {{x}}', {
    params: { a: '1..5', b: '2..7', k: '-6..6 !0' }, derived: { x: 'b*k', c: 'a*k' }, constraints: ['gcd(a,b)==1', 'a != b'] });

  // ---------------------------------------------------------------- two-step
  skill('two-step', 'Two-step equations', U1);
  T('two-step', 'worked', 'Solve for $x$: $ {{a:coef}}x{{b:sign}} = {{c}} $', 'x = {{x}}', {
    params: { a: '2..9', x: '-9..9 !0', b: '-15..15 !0' }, derived: { c: 'a*x+b', nb: '0-b', t: 'c-b' },
    steps: ['Undo the addition or subtraction first: $ {{a:coef}}x = {{c}}{{nb:sign}} $',
            'Simplify the right side: $ {{a:coef}}x = {{t}} $',
            'Divide both sides by ${{a}}$: $ x = \\frac{ {{t}} }{ {{a}} } = {{x}} $'] });
  T('two-step', 'easier', 'Solve for $x$: $ {{a}}x + {{b}} = {{c}} $', 'x = {{x}}', {
    params: { a: '2..6', x: '1..9', b: '1..9' }, derived: { c: 'a*x+b' } });
  T('two-step', 'parallel', 'Solve for $x$: $ {{a:coef}}x{{b:sign}} = {{c}} $', 'x = {{x}}', {
    params: { a: '-9..-2', x: '-9..9 !0', b: '-12..12 !0' }, derived: { c: 'a*x+b' } });
  T('two-step', 'parallel', 'Solve for $x$: $ \\frac{x}{ {{a}} }{{b:sign}} = {{c}} $', 'x = {{x}}', {
    params: { a: '2..8', k: '-8..8 !0', b: '-9..9 !0' }, derived: { x: 'a*k', c: 'k+b' } });
  T('two-step', 'parallel', 'Solve for $x$: $ {{a:coef}}x{{b:sign}} = {{c}} $', 'x = {{x}}', {
    params: { a: '2..9', x: '-9..9 !0', b: '-20..20 !0' }, derived: { c: 'a*x+b' } });
  T('two-step', 'challenge', 'Solve for $x$ (your answer will be a fraction): $ {{a:coef}}x{{b:sign}} = {{c}} $', 'x = {{x}}', {
    params: { a: '2..9', b: '-9..9 !0', c: '-15..15' }, derived: { x: '(c-b)/a' }, constraints: ['mod(c-b,a) != 0'] });

  // ---------------------------------------------------------------- multi-step (variables both sides)
  skill('multi-step', 'Variables on both sides', U1);
  T('multi-step', 'worked', 'Solve for $x$: $ {{a:coef}}x{{b:sign}} = {{c:coef}}x{{d:sign}} $', 'x = {{x}}', {
    params: { a: '3..9', c: '-6..2 !0', x: '-8..8 !0', b: '-12..12 !0' },
    derived: { d: 'a*x+b-c*x', am: 'a-c', dm: 'd-b' }, constraints: ['d != 0', 'abs(d) <= 30', 'am >= 2'],
    steps: ['Get the $x$ terms on one side by subtracting $ {{c:coef}}x $ from both sides: $ {{am:coef}}x{{b:sign}} = {{d}} $',
            'Move the number to the other side: $ {{am:coef}}x = {{dm}} $',
            'Divide both sides by ${{am}}$: $ x = {{x}} $'] });
  T('multi-step', 'easier', 'Solve for $x$: $ {{a}}x + {{b}} = x + {{d}} $', 'x = {{x}}', {
    params: { a: '2..6', x: '1..8', b: '1..9' }, derived: { d: '(a-1)*x+b' } });
  T('multi-step', 'parallel', 'Solve for $x$: $ {{a:coef}}x{{b:sign}} = {{c:coef}}x{{d:sign}} $', 'x = {{x}}', {
    params: { a: '-8..9 !0', c: '-8..9 !0', x: '-9..9 !0', b: '-15..15 !0' },
    derived: { d: 'a*x+b-c*x' }, constraints: ['a != c', 'd != 0', 'abs(d) <= 40'] });
  T('multi-step', 'parallel', 'Solve for $x$: $ {{a:coef}}x{{b:sign}} = {{c:coef}}x{{d:sign}} $', 'x = {{x}}', {
    params: { a: '1..5', c: '6..9', x: '-8..8 !0', b: '-12..12 !0' },
    derived: { d: 'a*x+b-c*x' }, constraints: ['d != 0', 'abs(d) <= 40'] });
  T('multi-step', 'challenge', 'Solve for $x$ (your answer will be a fraction): $ {{a:coef}}x{{b:sign}} = {{c:coef}}x{{d:sign}} $', 'x = {{x}}', {
    params: { a: '2..9', c: '-5..9 !0', b: '-12..12 !0', d: '-12..12 !0' },
    derived: { x: '(d-b)/(a-c)' }, constraints: ['a != c', 'b != d', 'mod(d-b,a-c) != 0'] });

  // ---------------------------------------------------------------- distribution
  skill('distribute', 'Equations with distribution', U1);
  T('distribute', 'worked', 'Solve for $x$: $ {{a}}(x{{b:sign}}){{d:sign}} = {{c}} $', 'x = {{x}}', {
    params: { a: '2..6', b: '-8..8 !0', d: '-9..9 !0', x: '-6..8' },
    derived: { ab: 'a*b', e: 'a*b+d', c: 'a*(x+b)+d', t: 'c-e' }, constraints: ['e != 0'],
    steps: ['Distribute ${{a}}$ to each term inside the parentheses: $ {{a}}x{{ab:sign}}{{d:sign}} = {{c}} $',
            'Combine like terms: $ {{a}}x{{e:sign}} = {{c}} $',
            'Undo the constant: $ {{a}}x = {{t}} $',
            'Divide both sides by ${{a}}$: $ x = {{x}} $'] });
  T('distribute', 'easier', 'Solve for $x$: $ {{a}}(x{{b:sign}}) = {{c}} $', 'x = {{x}}', {
    params: { a: '2..5', b: '1..6', x: '1..7' }, derived: { c: 'a*(x+b)' } });
  T('distribute', 'parallel', 'Solve for $x$: $ {{a}}(x{{b:sign}}){{d:sign}} = {{c}} $', 'x = {{x}}', {
    params: { a: '-6..-2', b: '-8..8 !0', d: '-9..9 !0', x: '-6..8' },
    derived: { e: 'a*b+d', c: 'a*(x+b)+d' }, constraints: ['e != 0'] });
  T('distribute', 'parallel', 'Solve for $x$: $ {{a}}(x{{b:sign}}) = {{c:coef}}x{{d:sign}} $', 'x = {{x}}', {
    params: { a: '2..6', c: '-4..8 !0', b: '-6..6 !0', x: '-6..6 !0' },
    derived: { d: '(a-c)*x+a*b' }, constraints: ['a != c', 'd != 0', 'abs(d) <= 40'] });
  T('distribute', 'challenge', 'Solve for $x$: $ {{a}}(x{{b:sign}}) - {{c}}(x{{d:sign}}) = {{e}} $', 'x = {{x}}', {
    params: { a: '3..9', c: '2..8', b: '-6..6 !0', d: '-6..6 !0', x: '-6..8' },
    derived: { e: '(a-c)*x+a*b-c*d' }, constraints: ['a != c'] });

  // ---------------------------------------------------------------- literal equations
  skill('literal', 'Literal equations (solve for a variable)', U1);
  T('literal', 'worked', 'Solve $ y = mx + b $ for $x$.', 'x = \\frac{y - b}{m}', {
    steps: ['Subtract $b$ from both sides: $ y - b = mx $', 'Divide both sides by $m$: $ x = \\frac{y - b}{m} $'] });
  T('literal', 'worked', 'Solve $ A = \\frac{1}{2}bh $ for $b$.', 'b = \\frac{2A}{h}', {
    steps: ['Multiply both sides by $2$: $ 2A = bh $', 'Divide both sides by $h$: $ b = \\frac{2A}{h} $'] });
  T('literal', 'easier', 'Solve $ a + b = c $ for $a$.', 'a = c - b');
  T('literal', 'easier', 'Solve $ d = rt $ for $t$.', 't = \\frac{d}{r}');
  T('literal', 'parallel', 'Solve $ P = 2l + 2w $ for $w$.', 'w = \\frac{P - 2l}{2}');
  T('literal', 'parallel', 'Solve $ A = \\frac{1}{2}bh $ for $h$.', 'h = \\frac{2A}{b}');
  T('literal', 'parallel', 'Solve $ y = mx + b $ for $m$.', 'm = \\frac{y - b}{x}');
  T('literal', 'challenge', 'Solve $ ax + b = cx + d $ for $x$.', 'x = \\frac{d - b}{a - c}');
  T('literal', 'challenge', 'Solve $ ax + by = c $ for $y$.', 'y = \\frac{c - ax}{b}');

  // ---------------------------------------------------------------- inequalities
  skill('ineq', 'Solving inequalities', U2);
  T('ineq', 'worked', 'Solve the inequality: $ {{a:coef}}x{{b:sign}} {{s:ineq}} {{c}} $', 'x {{s:ineq}} {{x}}', {
    params: { s: '0..3', a: '2..7', x: '-6..8', b: '-12..12 !0' }, derived: { c: 'a*x+b', t: 'c-b' },
    steps: ['Undo the addition or subtraction: $ {{a:coef}}x {{s:ineq}} {{t}} $',
            'Divide both sides by ${{a}}$. It is positive, so the inequality sign stays the same: $ x {{s:ineq}} {{x}} $'] });
  T('ineq', 'worked', 'Solve the inequality: $ {{a:coef}}x{{b:sign}} {{s:ineq}} {{c}} $', 'x {{ts:ineq}} {{x}}', {
    params: { s: '0..3', a: '-7..-2', x: '-6..8', b: '-12..12 !0' },
    derived: { c: 'a*x+b', t: 'c-b', ts: 's+1-2*mod(s,2)' },
    steps: ['Undo the addition or subtraction: $ {{a:coef}}x {{s:ineq}} {{t}} $',
            'Divide both sides by ${{a}}$. It is negative, so **flip** the inequality sign: $ x {{ts:ineq}} {{x}} $'] });
  T('ineq', 'easier', 'Solve the inequality: $ x{{b:sign}} {{s:ineq}} {{c}} $', 'x {{s:ineq}} {{x}}', {
    params: { s: '0..3', x: '-8..8', b: '-9..9 !0' }, derived: { c: 'x+b' } });
  T('ineq', 'parallel', 'Solve the inequality: $ {{a:coef}}x{{b:sign}} {{s:ineq}} {{c}} $', 'x {{s:ineq}} {{x}}', {
    params: { s: '0..3', a: '2..9', x: '-8..8', b: '-15..15 !0' }, derived: { c: 'a*x+b' } });
  T('ineq', 'parallel', 'Solve the inequality: $ {{a:coef}}x{{b:sign}} {{s:ineq}} {{c}} $', 'x {{ts:ineq}} {{x}}', {
    params: { s: '0..3', a: '-9..-2', x: '-8..8', b: '-15..15 !0' }, derived: { c: 'a*x+b', ts: 's+1-2*mod(s,2)' } });
  T('ineq', 'challenge', 'Solve the inequality: $ {{a:coef}}x{{b:sign}} {{s:ineq}} {{c:coef}}x{{d:sign}} $', 'x {{ts:ineq}} {{x}}', {
    params: { s: '0..3', a: '-5..9 !0', c: '-5..9 !0', b: '-12..12 !0', d: '-12..12 !0' },
    derived: { x: '(d-b)/(a-c)', ts: 'if(a-c<0, s+1-2*mod(s,2), s)' }, constraints: ['a != c', 'b != d'] });

  skill('compound', 'Compound inequalities', U2);
  T('compound', 'worked', 'Solve the compound inequality: $ {{lo}} {{s1:ineq}} {{a:coef}}x{{b:sign}} {{s2:ineq}} {{hi}} $', '{{x1}} {{s1:ineq}} x {{s2:ineq}} {{x2}}', {
    params: { s1: '0,2', s2: '0,2', a: '2..5', b: '-9..9 !0', x1: '-6..2', w: '2..6' },
    derived: { x2: 'x1+w', lo: 'a*x1+b', hi: 'a*x2+b' },
    steps: ['Undo the constant in **all three** parts: $ {{lo-b}} {{s1:ineq}} {{a:coef}}x {{s2:ineq}} {{hi-b}} $',
            'Divide all three parts by ${{a}}$: $ {{x1}} {{s1:ineq}} x {{s2:ineq}} {{x2}} $'] });
  T('compound', 'easier', 'Solve the compound inequality: $ {{lo}} < {{a}}x < {{hi}} $', '{{x1}} < x < {{x2}}', {
    params: { a: '2..5', x1: '-5..3', w: '2..6' }, derived: { x2: 'x1+w', lo: 'a*x1', hi: 'a*x2' } });
  T('compound', 'parallel', 'Solve the compound inequality: $ {{lo}} {{s1:ineq}} {{a:coef}}x{{b:sign}} {{s2:ineq}} {{hi}} $', '{{x1}} {{s1:ineq}} x {{s2:ineq}} {{x2}}', {
    params: { s1: '0,2', s2: '0,2', a: '2..6', b: '-12..12 !0', x1: '-8..2', w: '2..7' },
    derived: { x2: 'x1+w', lo: 'a*x1+b', hi: 'a*x2+b' } });
  T('compound', 'parallel', 'Solve: $ x{{a:sign}} < {{c}} $ or $ {{d:coef}}x > {{e}} $', 'x < {{x1}} \\text{ or } x > {{x2}}', {
    params: { a: '-9..9 !0', x1: '-8..0', w: '2..8', d: '2..5' }, derived: { x2: 'x1+w', c: 'x1+a', e: 'd*x2' } });
  T('compound', 'challenge', 'Solve: $ {{a:coef}}x{{b:sign}} < {{c}} $ or $ {{d:coef}}x{{e:sign}} > {{f}} $', 'x < {{x1}} \\text{ or } x > {{x2}}', {
    params: { a: '2..4', d: '2..4', b: '-9..9 !0', e: '-9..9 !0', x1: '-8..0', w: '2..8' },
    derived: { x2: 'x1+w', c: 'a*x1+b', f: 'd*x2+e' } });

  skill('abs-eq', 'Absolute value equations & inequalities', U2);
  T('abs-eq', 'worked', 'Solve: $ |{{a:coef}}x{{b:sign}}| = {{c}} $', 'x = {{xl}} \\text{ or } x = {{xr}}', {
    params: { a: '2..5', m: '-4..4 !0', d: '1..5' }, derived: { b: '0-a*m', c: 'a*d', xl: 'm-d', xr: 'm+d', nc: '0-c' },
    steps: ['The expression inside the absolute value can equal ${{c}}$ or ${{nc}}$: $ {{a:coef}}x{{b:sign}} = {{c}} \\quad\\text{or}\\quad {{a:coef}}x{{b:sign}} = {{nc}} $',
            'Solve each equation: $ x = {{xr}} \\quad\\text{or}\\quad x = {{xl}} $'] });
  T('abs-eq', 'easier', 'Solve: $ |x{{b:sign}}| = {{d}} $', 'x = {{xl}} \\text{ or } x = {{xr}}', {
    params: { m: '-5..5 !0', d: '1..6' }, derived: { b: '0-m', xl: 'm-d', xr: 'm+d' } });
  T('abs-eq', 'parallel', 'Solve: $ |{{a:coef}}x{{b:sign}}| = {{c}} $', 'x = {{xl}} \\text{ or } x = {{xr}}', {
    params: { a: '2..6', m: '-5..5 !0', d: '1..6' }, derived: { b: '0-a*m', c: 'a*d', xl: 'm-d', xr: 'm+d' } });
  T('abs-eq', 'parallel', 'Solve: $ {{k}}|x{{b:sign}}|{{e:sign}} = {{f}} $', 'x = {{xl}} \\text{ or } x = {{xr}}', {
    params: { k: '2..4', c: '1..6', b: '-6..6 !0', e: '-9..9 !0' }, derived: { f: 'k*c+e', xl: '0-c-b', xr: 'c-b' } });
  T('abs-eq', 'challenge', 'Solve: $ |x{{b:sign}}| < {{c}} $', '{{lo}} < x < {{hi}}', {
    params: { b: '-6..6 !0', c: '1..7' }, derived: { lo: '0-c-b', hi: 'c-b' } });
  T('abs-eq', 'challenge', 'Solve: $ |x{{b:sign}}| > {{c}} $', 'x < {{lo}} \\text{ or } x > {{hi}}', {
    params: { b: '-6..6 !0', c: '1..7' }, derived: { lo: '0-c-b', hi: 'c-b' } });
})();
