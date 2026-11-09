/* Advanced Algebra — rational expressions and equations */
(function () {
  const { skill, T } = RB;
  const r = String.raw;
  const RF = 'Adv. Algebra: rational functions';
  const sg = { p: '-6..6 !0', q: '-6..6 !0' };

  /* ---------- simplify ---------- */
  skill('rat-simp', 'Simplifying rational expressions', RF);
  T('rat-simp', 'worked', r`Simplify: $ \frac{x^2{{b:sgncoef}}x{{c:sign}}}{x{{p:sign}}} $`, r`x{{q:sign}},\ x \neq {{-p}}`, { params: sg, derived: { b: 'p+q', c: 'p*q' }, constraints: ['b != 0'],
    steps: [r`Factor the numerator: $ x^2{{b:sgncoef}}x{{c:sign}} = (x{{p:sign}})(x{{q:sign}}) $`, r`Cancel the common factor $ (x{{p:sign}}) $ from the top and bottom: $ x{{q:sign}} $`, r`The original denominator is 0 when $ x = {{-p}} $, so $ x \neq {{-p}} $.`] });
  T('rat-simp', 'easier', r`Simplify: $ \frac{(x{{p:sign}})(x{{q:sign}})}{x{{p:sign}}} $`, r`x{{q:sign}}`, { params: sg });
  T('rat-simp', 'easier', r`Simplify: $ \frac{ {{a*k}}x }{ {{a}} } $`, r`{{k}}x`, { params: { a: '2..6', k: '2..9' } });
  T('rat-simp', 'parallel', r`Simplify: $ \frac{x^2{{b:sgncoef}}x{{c:sign}}}{x{{p:sign}}} $`, r`x{{q:sign}}`, { params: sg, derived: { b: 'p+q', c: 'p*q' }, constraints: ['b != 0'] });
  T('rat-simp', 'parallel', r`Simplify: $ \frac{x^2-{{m^2}}}{x{{m:sign}}} $`, r`x-{{m}}`, { params: { m: '1..9' } });
  T('rat-simp', 'parallel', r`Simplify: $ \frac{x^2-{{m^2}}}{x-{{m}}} $`, r`x+{{m}}`, { params: { m: '1..9' } });
  T('rat-simp', 'parallel', r`Simplify: $ \frac{(x{{p:sign}})(x{{q:sign}})}{(x{{p:sign}})(x{{s:sign}})} $`, r`\frac{x{{q:sign}}}{x{{s:sign}}}`, { params: { p: '-6..6 !0', q: '-6..6 !0', s: '-6..6 !0' }, constraints: ['q != s', 'p != q', 'p != s'] });
  T('rat-simp', 'challenge', r`Simplify and state the excluded values: $ \frac{x^2{{b1:sgncoef}}x{{c1:sign}}}{x^2{{b2:sgncoef}}x{{c2:sign}}} $`, r`\frac{x{{q:sign}}}{x{{s:sign}}},\ x \neq {{-p}},\ {{-s}}`, { params: { p: '-6..6 !0', q: '-6..6 !0', s: '-6..6 !0' }, derived: { b1: 'p+q', c1: 'p*q', b2: 'p+s', c2: 'p*s' }, constraints: ['q != s', 'p != q', 'p != s', 'b1 != 0', 'b2 != 0'] });
  T('rat-simp', 'challenge', r`Simplify: $ \frac{ {{k}}x^2{{k*b:sgncoef}}x }{ {{k}}x } $`, r`x{{b:sign}}`, { params: { k: '2..5', b: '-9..9 !0' } });

  /* ---------- excluded values ---------- */
  skill('rat-excl', 'Excluded values of rational expressions', RF);
  T('rat-excl', 'worked', r`State the value of $ x $ that must be excluded from the domain of $ \frac{ {{n}} }{x{{-b:sign}}} $.`, r`x \neq {{b}}`, { params: { n: '1..9', b: '-9..9 !0' },
    steps: ['A fraction has no value when its denominator is 0.', r`Set the denominator equal to 0: $ x{{-b:sign}} = 0 $, so $ x = {{b}} $.`, r`Exclude $ x = {{b}} $.`] });
  T('rat-excl', 'easier', r`State the value of $ x $ that must be excluded from the domain of $ \frac{ {{n}} }{x{{-b:sign}}} $.`, r`x \neq {{b}}`, { params: { n: '1..9', b: '-9..9 !0' } });
  T('rat-excl', 'parallel', r`State the excluded values of $ \frac{ {{n}} }{(x{{-p:sign}})(x{{-q:sign}})} $.`, r`x \neq {{p}},\ {{q}}`, { params: { n: '1..9', p: '-6..6 !0', q: '-6..6 !0' }, constraints: ['p < q'] });
  T('rat-excl', 'parallel', r`State the excluded values of $ \frac{x{{a:sign}}}{x^2{{b:sgncoef}}x{{c:sign}}} $.`, r`x \neq {{p}},\ {{q}}`, { params: { a: '-9..9 !0', p: '-6..6 !0', q: '-6..6 !0' }, derived: { b: '-(p+q)', c: 'p*q' }, constraints: ['p < q', 'b != 0'] });
  T('rat-excl', 'parallel', r`State the value of $ x $ that must be excluded from the domain of $ \frac{ {{n}} }{ {{m}}x{{c:sign}} } $.`, r`x \neq {{-c/m}}`, { params: { n: '1..9', m: '2..5', c: '-9..9 !0' }, constraints: ['mod(c,m) != 0'] });
  T('rat-excl', 'challenge', r`State the excluded values of $ \frac{x{{a:sign}}}{x^2-{{m^2}}} $.`, r`x \neq \pm {{m}}`, { params: { a: '-9..9 !0', m: '2..9' } });
  T('rat-excl', 'challenge', r`State the excluded values of $ \frac{ {{n}} }{ {{m}}x^2{{b:sgncoef}}x } $.`, r`x \neq 0,\ {{-b/m}}`, { params: { n: '1..9', m: '2..4', b: '-12..12 !0' }, constraints: ['mod(b,m) != 0'] });

  /* ---------- multiply / divide ---------- */
  skill('rat-mult', 'Multiplying and dividing rational expressions', RF);
  T('rat-mult', 'worked', r`Simplify: $ \frac{x{{a:sign}}}{x{{b:sign}}}\cdot\frac{x{{b:sign}}}{x{{c:sign}}} $`, r`\frac{x{{a:sign}}}{x{{c:sign}}}`, { params: { a: '-8..8 !0', b: '-8..8 !0', c: '-8..8 !0' }, constraints: ['a != b', 'b != c', 'a != c'],
    steps: ['Multiply the numerators together and the denominators together.', r`The factor $ (x{{b:sign}}) $ appears in the numerator and the denominator, so it cancels.`, r`Result: $ \frac{x{{a:sign}}}{x{{c:sign}}} $`] });
  T('rat-mult', 'easier', r`Simplify: $ \frac{ {{a}} }{x{{b:sign}}}\cdot\frac{x{{b:sign}}}{ {{c}} } $`, r`{{a/c}}`, { params: { a: '1..9', b: '-6..6 !0', c: '2..9' }, constraints: ['a != c'] });
  T('rat-mult', 'parallel', r`Simplify: $ \frac{x{{a:sign}}}{x{{b:sign}}}\cdot\frac{x{{b:sign}}}{x{{c:sign}}} $`, r`\frac{x{{a:sign}}}{x{{c:sign}}}`, { params: { a: '-8..8 !0', b: '-8..8 !0', c: '-8..8 !0' }, constraints: ['a != b', 'b != c', 'a != c'] });
  T('rat-mult', 'parallel', r`Simplify: $ \frac{x{{a:sign}}}{x{{b:sign}}}\div\frac{x{{c:sign}}}{x{{b:sign}}} $`, r`\frac{x{{a:sign}}}{x{{c:sign}}}`, { params: { a: '-8..8 !0', b: '-8..8 !0', c: '-8..8 !0' }, constraints: ['a != b', 'b != c', 'a != c'] });
  T('rat-mult', 'parallel', r`Simplify: $ \frac{x^2{{b:sgncoef}}x{{c:sign}}}{x{{r:sign}}}\cdot\frac{x{{r:sign}}}{x{{q:sign}}} $`, r`x{{p:sign}}`, { params: { p: '-6..6 !0', q: '-6..6 !0', r: '-6..6 !0' }, derived: { b: 'p+q', c: 'p*q' }, constraints: ['b != 0', 'r != q', 'r != p'] });
  T('rat-mult', 'parallel', r`Simplify: $ \frac{x{{p:sign}}}{x^2-{{q^2}}}\cdot(x-{{q}}) $`, r`\frac{x{{p:sign}}}{x+{{q}}}`, { params: { p: '-9..9 !0', q: '2..9' }, constraints: ['p != q', 'p != -q'] });
  T('rat-mult', 'challenge', r`Simplify: $ \frac{x^2-{{p^2}}}{x{{q:sign}}}\cdot\frac{x{{q:sign}}}{x-{{p}}} $`, r`x+{{p}}`, { params: { p: '2..9', q: '-9..9 !0' }, constraints: ['q != p', 'q != -p'] });
  T('rat-mult', 'challenge', r`Simplify: $ \frac{x^2{{b:sgncoef}}x{{c:sign}}}{x{{r:sign}}}\div\frac{x{{q:sign}}}{x{{r:sign}}} $`, r`x{{p:sign}}`, { params: { p: '-6..6 !0', q: '-6..6 !0', r: '-6..6 !0' }, derived: { b: 'p+q', c: 'p*q' }, constraints: ['b != 0', 'r != q', 'r != p'] });

  /* ---------- add / subtract ---------- */
  skill('rat-add', 'Adding and subtracting rational expressions', RF);
  T('rat-add', 'worked', r`Add: $ \frac{ {{a}} }{x{{p:sign}}}+\frac{ {{b}} }{x{{p:sign}}} $`, r`\frac{ {{a+b}} }{x{{p:sign}}}`, { params: { a: '1..9', b: '1..9', p: '-9..9 !0' },
    steps: ['The denominators are the same, so add the numerators and keep the denominator.', r`$ \frac{ {{a}} + {{b}} }{x{{p:sign}}} = \frac{ {{a+b}} }{x{{p:sign}}} $`] });
  T('rat-add', 'easier', r`Add: $ \frac{ {{a}} }{x}+\frac{ {{b}} }{x} $`, r`\frac{ {{a+b}} }{x}`, { params: { a: '1..9', b: '1..9' } });
  T('rat-add', 'easier', r`Subtract: $ \frac{ {{a}} }{x}-\frac{ {{b}} }{x} $`, r`\frac{ {{a-b}} }{x}`, { params: { a: '5..12', b: '1..4' } });
  T('rat-add', 'parallel', r`Subtract: $ \frac{ {{a}} }{x{{p:sign}}}-\frac{ {{b}} }{x{{p:sign}}} $`, r`\frac{ {{a-b}} }{x{{p:sign}}}`, { params: { a: '1..12', b: '1..12', p: '-9..9 !0' }, constraints: ['a != b'] });
  T('rat-add', 'parallel', r`Add: $ \frac{ {{a:coef}}x{{b:sign}} }{x{{p:sign}}}+\frac{ {{c:coef}}x{{d:sign}} }{x{{p:sign}}} $`, r`\frac{ {{a+c}}x{{b+d:sign}} }{x{{p:sign}}}`, { params: { a: '1..5', b: '-9..9 !0', c: '1..5', d: '-9..9 !0', p: '-9..9 !0' }, constraints: ['b+d != 0'] });
  T('rat-add', 'parallel', r`Add: $ \frac{1}{x{{p:sign}}}+\frac{1}{x{{q:sign}}} $`, r`\frac{2x{{p+q:sign}}}{(x{{p:sign}})(x{{q:sign}})}`, { params: { p: '-6..6 !0', q: '-6..6 !0' }, constraints: ['p != q', 'p+q != 0'] });
  T('rat-add', 'challenge', r`Add: $ \frac{ {{a}} }{x}+\frac{ {{b}} }{x{{p:sign}}} $`, r`\frac{ {{a+b:coef}}x{{a*p:sign}} }{x(x{{p:sign}})}`, { params: { a: '1..6', b: '1..6', p: '-6..6 !0' } });
  T('rat-add', 'challenge', r`Subtract: $ \frac{ {{a}} }{x{{p:sign}}}-\frac{ {{b}} }{x{{q:sign}}} $`, r`\frac{ {{a-b:coef}}x{{a*q-b*p:sign}} }{(x{{p:sign}})(x{{q:sign}})}`, { params: { a: '1..6', b: '1..6', p: '-6..6 !0', q: '-6..6 !0' }, constraints: ['a != b', 'p != q', 'a*q-b*p != 0'] });

  /* ---------- rational equations ---------- */
  skill('rat-eq', 'Solving rational equations', RF);
  T('rat-eq', 'worked', r`Solve: $ \frac{ {{n}} }{x{{p:sign}}} = {{k}} $`, r`x = {{t-p}}`, { params: { k: '2..5', t: '2..9', p: '-6..6 !0' }, derived: { n: 'k*t' }, constraints: ['t != p'],
    steps: [r`Multiply both sides by $ (x{{p:sign}}) $: $ {{n}} = {{k}}(x{{p:sign}}) $`, r`Divide both sides by $ {{k}}$: $ {{t}} = x{{p:sign}} $`, r`Solve: $ x = {{t-p}} $`] });
  T('rat-eq', 'easier', r`Solve: $ \frac{ {{n}} }{x} = {{k}} $`, r`x = {{t}}`, { params: { k: '2..5', t: '1..9' }, derived: { n: 'k*t' } });
  T('rat-eq', 'parallel', r`Solve: $ \frac{ {{n}} }{x{{p:sign}}} = {{k}} $`, r`x = {{t-p}}`, { params: { k: '2..6', t: '1..9', p: '-9..9 !0' }, derived: { n: 'k*t' }, constraints: ['t != p', 'n != k*p'] });
  T('rat-eq', 'parallel', r`Solve: $ \frac{ {{a}} }{x}+\frac{ {{b}} }{x} = {{c}} $`, r`x = {{t}}`, { params: { a: '1..9', c: '2..5', t: '1..6' }, derived: { b: 'c*t-a' }, constraints: ['b > 0'] });
  T('rat-eq', 'parallel', r`Solve: $ \frac{x{{a:sign}}}{x{{-b:sign}}} = {{c}} $`, r`x = {{x0}}`, { params: { x0: '-6..6', c: '2..5', b: '-5..5 !0' }, derived: { a: 'x0*(c-1)-c*b' }, constraints: ['a != 0', 'abs(a) <= 15', 'x0 != b'] });
  T('rat-eq', 'parallel', r`Solve: $ \frac{ {{a}} }{x{{p:sign}}} = \frac{ {{b}} }{x{{q:sign}}} $`, r`x = {{(b*p-a*q)/(a-b)}}`, { params: { a: '1..9', b: '1..9', p: '-9..9 !0', q: '-9..9 !0' }, constraints: ['a != b', 'p != q', 'mod(b*p-a*q,a-b) == 0', 'abs((b*p-a*q)/(a-b)) <= 20', '(b*p-a*q)/(a-b) != -p', '(b*p-a*q)/(a-b) != -q'] });
  T('rat-eq', 'challenge', r`Solve and check for extraneous solutions: $ \frac{x}{x-{{a}}} = \frac{ {{a}} }{x-{{a}}} + 2 $`, r`\text{no solution}`, { params: { a: '1..9' } });
  T('rat-eq', 'challenge', r`Solve and check for extraneous solutions: $ \frac{x^2}{x-{{a}}} = \frac{ {{a^2}} }{x-{{a}}} $`, r`x = {{-a}}`, { params: { a: '1..9' } });
})();
