/* Unit: Systems of equations and applications */
(function () {
  const { skill, T } = RB;
  const U = 'Systems of equations';

  skill('sys-sub', 'Systems by substitution', U);
  const SUB1 = 'Solve the system by substitution:\n$ y = {{m:coef}}x{{b:sign}} $\n$ {{a:coef}}x{{c:sgncoef}}y = {{d}} $';
  T('sys-sub', 'worked', SUB1, '({{x}}, {{y}})', {
    params: { m: '-4..4 !0', x: '-5..5 !0', y: '-6..6 !0', a: '1..5', c: '-4..4 !0' },
    derived: { b: 'y-m*x', d: 'a*x+c*y' }, constraints: ['b != 0', 'a+c*m != 0', 'abs(d) < 40'],
    steps: ['Substitute $ y = {{m:coef}}x{{b:sign}} $ into the second equation: $ {{a:coef}}x{{c:sgncoef}}({{m:coef}}x{{b:sign}}) = {{d}} $',
            'Distribute and combine like terms: $ {{a+c*m:coef}}x{{c*b:sign}} = {{d}} $',
            'Solve for $x$: $ x = {{x}} $',
            'Substitute back to find $y$: $ y = {{m}}\\cdot {{x:paren}}{{b:sign}} = {{y}} $'] });
  T('sys-sub', 'easier', 'Solve the system by substitution:\n$ y = {{m:coef}}x{{b:sign}} $\n$ y = {{n:coef}}x{{e:sign}} $', '({{x}}, {{y}})', {
    params: { m: '-4..4 !0', n: '-4..4 !0', x: '-5..5', y: '-6..6' }, derived: { b: 'y-m*x', e: 'y-n*x' }, constraints: ['m != n', 'b != 0', 'e != 0'] });
  T('sys-sub', 'parallel', SUB1, '({{x}}, {{y}})', {
    params: { m: '-5..5 !0', x: '-6..6 !0', y: '-6..6 !0', a: '1..6', c: '-5..5 !0' },
    derived: { b: 'y-m*x', d: 'a*x+c*y' }, constraints: ['b != 0', 'a+c*m != 0', 'abs(d) < 50'] });
  T('sys-sub', 'parallel', 'Solve the system by substitution:\n$ x = {{k:coef}}y{{b:sign}} $\n$ {{a:coef}}x{{c:sgncoef}}y = {{d}} $', '({{x}}, {{y}})', {
    params: { k: '-3..3 !0', x: '-6..6', y: '-5..5 !0', a: '1..5', c: '-4..4 !0' },
    derived: { b: 'x-k*y', d: 'a*x+c*y' }, constraints: ['b != 0', 'a*k+c != 0', 'abs(d) < 40'] });
  T('sys-sub', 'challenge', 'Solve the system by substitution:\n$ y = {{m:coef}}x{{b:sign}} $\n$ {{a:coef}}x{{c:sgncoef}}y = {{d}} $', '\\left( {{x}}, {{y}} \\right)', {
    params: { m: '-4..4 !0', b: '-8..8 !0', a: '1..6', c: '-5..5 !0', d: '-20..20 !0' },
    derived: { x: '(d-c*b)/(a+c*m)', y: 'm*x+b' }, constraints: ['a+c*m != 0', 'den(x) <= 4', 'den(y) <= 4', 'isint(x) == 0 || isint(y) == 0'] });

  skill('sys-elim', 'Systems by elimination', U);
  const ELIM = 'Solve the system by elimination:\n$ {{a:coef}}x{{b:sgncoef}}y = {{c}} $\n$ {{d:coef}}x{{e:sgncoef}}y = {{f}} $';
  T('sys-elim', 'worked', ELIM, '({{x}}, {{y}})', {
    params: { a: '1..5', b: '1..5', d: '1..5', x: '-5..5 !0', y: '-5..5 !0' },
    derived: { e: '0-b', c: 'a*x+b*y', f: 'd*x+e*y' },
    steps: ['The $y$ terms are opposites, so add the two equations: $ {{a+d:coef}}x = {{c+f}} $',
            'Solve for $x$: $ x = {{x}} $',
            'Substitute into the first equation: $ {{a:coef}}({{x}}){{b:sgncoef}}y = {{c}} $',
            'Solve for $y$: $ y = {{y}} $'] });
  T('sys-elim', 'easier', ELIM, '({{x}}, {{y}})', {
    params: { b: '1..5', e: '1..5', a: '1..4', x: '-5..5 !0', y: '-5..5 !0' },
    derived: { d: '0-a', c: 'a*x+b*y', f: 'd*x+e*y' } });
  T('sys-elim', 'parallel', ELIM, '({{x}}, {{y}})', {
    params: { a: '1..4', b: '1..3', m: '2..3', d: '-4..4 !0', x: '-5..5 !0', y: '-5..5 !0' },
    derived: { e: '0-m*b', c: 'a*x+b*y', f: 'd*x+e*y' }, constraints: ['a*m+d != 0'] });
  T('sys-elim', 'parallel', ELIM, '({{x}}, {{y}})', {
    params: { a: '1..4', b: '1..3', m: '2..3', d: '-4..4 !0', x: '-5..5 !0', y: '-5..5 !0' },
    derived: { e: 'm*b', c: 'a*x+b*y', f: 'd*x+e*y' }, constraints: ['a*m-d != 0'] });
  T('sys-elim', 'challenge', ELIM, '({{x}}, {{y}})', {
    params: { a: '1..5', b: '-5..5 !0', d: '1..5', e: '-5..5 !0', x: '-5..5 !0', y: '-5..5 !0' },
    derived: { c: 'a*x+b*y', f: 'd*x+e*y' }, constraints: ['a*e-b*d != 0', 'a != d', 'abs(b) != abs(e)', 'abs(c) < 40', 'abs(f) < 40'] });

  skill('sys-check', 'Is it a solution of the system?', U);
  const CHK = 'Is $ ({{x}}, {{y}}) $ a solution of the system?\n$ {{a:coef}}x{{b:sgncoef}}y = {{c}} $\n$ {{d:coef}}x{{e:sgncoef}}y = {{f}} $';
  T('sys-check', 'worked', CHK, '\\text{Yes}', {
    params: { a: '2..4', b: '-4..4 !0,1,-1', d: '2..4', e: '-4..4 !0,1,-1', x: '-5..5 !0', y: '-5..5 !0' },
    derived: { c: 'a*x+b*y', f: 'd*x+e*y' }, constraints: ['a*e-b*d != 0'],
    steps: ['Substitute $x = {{x}}$ and $y = {{y}}$ into the **first** equation: $ {{a}}\\cdot {{x:paren}} + {{b:paren}}\\cdot {{y:paren}} = {{c}} $ ✓',
            'Substitute into the **second** equation: $ {{d}}\\cdot {{x:paren}} + {{e:paren}}\\cdot {{y:paren}} = {{f}} $ ✓',
            'It makes **both** equations true, so it is a solution.'] });
  T('sys-check', 'easier', CHK, '\\text{Yes}', {
    params: { a: '1..3', b: '1..3', d: '1..3', e: '1..3', x: '1..5', y: '1..5' },
    derived: { c: 'a*x+b*y', f: 'd*x+e*y' }, constraints: ['a*e-b*d != 0'] });
  T('sys-check', 'easier', CHK, '\\text{No}', {
    params: { a: '1..3', b: '1..3', d: '1..3', e: '1..3', x: '1..5', y: '1..5', k: '-3..3 !0' },
    derived: { c: 'a*x+b*y', f: 'd*x+e*y+k' }, constraints: ['a*e-b*d != 0'] });
  T('sys-check', 'parallel', CHK, '\\text{No}', {
    params: { a: '1..4', b: '-4..4 !0', d: '1..4', e: '-4..4 !0', x: '-5..5 !0', y: '-5..5 !0', k: '-4..4 !0' },
    derived: { c: 'a*x+b*y+k', f: 'd*x+e*y' }, constraints: ['a*e-b*d != 0'] });
  T('sys-check', 'parallel', CHK, '\\text{Yes}', {
    params: { a: '1..5', b: '-5..5 !0', d: '1..5', e: '-5..5 !0', x: '-6..6 !0', y: '-6..6 !0' },
    derived: { c: 'a*x+b*y', f: 'd*x+e*y' }, constraints: ['a*e-b*d != 0'] });
  T('sys-check', 'challenge', 'The point $ ({{x}}, {{y}}) $ lies on the line $ {{a:coef}}x{{b:sgncoef}}y = k $. Find $k$.', 'k = {{c}}', {
    params: { a: '1..6', b: '-6..6 !0', x: '-6..6 !0', y: '-6..6 !0' }, derived: { c: 'a*x+b*y' } });

  // ---------------------------------------------------------------- word problems
  skill('lin-word', 'Linear equation word problems', 'Applications');
  const PLUMB = 'A plumber charges a \\${{f}} service fee plus \\${{r}} per hour. If the total bill was \\${{t}}, how many hours did the plumber work?';
  T('lin-word', 'worked', PLUMB, 'h = {{h}}\\text{ hours}', {
    params: { f: '20..60', r: '15..50', h: '2..8' }, derived: { t: 'f+r*h' },
    steps: ['Let $h$ be the number of hours. Write an equation: $ {{r}}h + {{f}} = {{t}} $',
            'Subtract ${{f}}$ from both sides: $ {{r}}h = {{t-f}} $',
            'Divide both sides by ${{r}}$: $ h = {{h}} $'] });
  T('lin-word', 'easier', 'A gym charges a \\${{f}} sign-up fee plus \\${{r}} per month. After some months, a member has paid \\${{t}}. How many months is that?', 'm = {{m}}\\text{ months}', {
    params: { f: '10..30', r: '10..20', m: '2..6' }, derived: { t: 'f+r*m' } });
  T('lin-word', 'parallel', 'A taxi charges \\${{f}} to start plus \\${{r}} per mile. If the fare was \\${{t}}, how many miles was the ride?', 'm = {{m}}\\text{ miles}', {
    params: { f: '3..9', r: '2..5', m: '3..15' }, derived: { t: 'f+r*m' } });
  T('lin-word', 'parallel', 'Plan A costs \\${{f1}} plus \\${{r1}} per month. Plan B costs \\${{f2}} plus \\${{r2}} per month. After how many months do the two plans cost the same?', 'm = {{m}}\\text{ months}', {
    params: { f1: '10..40', r1: '10..30', r2: '5..28', m: '2..9' }, derived: { f2: 'f1+(r1-r2)*m' }, constraints: ['r1 > r2', 'f2 <= 150'] });
  T('lin-word', 'challenge', 'Candle A is ${{h1}}$ cm tall and burns ${{r1}}$ cm per hour. Candle B is ${{h2}}$ cm tall and burns ${{r2}}$ cm per hour. After how many hours are the candles the same height?', 't = {{t}}\\text{ hours}', {
    params: { h2: '8..20', r1: '2..6', r2: '1..5', t: '2..8' }, derived: { h1: 'h2+(r1-r2)*t' }, constraints: ['r1 > r2', 'h2 - r2*t > 0'] });
})();
