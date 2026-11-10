/* Advanced Algebra — exponential functions: base/growth/decay, domain & range, transformations, intercepts,
 * calculator evaluation, solving with logarithms, and inverse functions. */
(function () {
  const { skill, T } = RB;
  const r = String.raw, LG = 'Adv. Algebra: logs & exponentials', IV = 'Adv. Algebra: inverse functions';
  const FR = { p: '1..8', q: '2..9' }, FRC = ['p < q', 'gcd(p,q) == 1'];
  const G = r`\text{ is the base; it represents exponential growth}`, D = r`\text{ is the base; it represents exponential decay}`;

  /* ---------- base, growth and decay from an equation ---------- */
  skill('exp-base', 'Base of an exponential equation: growth or decay', LG);
  T('exp-base', 'worked', r`In the equation $ y = {{a}}\left({{b}}\right)^x $, what is the base and what does it represent?`, r`{{b}}` + G, { params: { a: '2..9', b: '2..6' },
    steps: [r`The base is the number that is raised to the power $ x $. Here it is $ {{b}} $.`, r`Because the base $ {{b}} $ is greater than $ 1 $, the function grows as $ x $ increases: **exponential growth**.`, r`(A base between $ 0 $ and $ 1 $ would mean exponential decay.)`] });
  T('exp-base', 'easier', r`In $ y = {{a}}\cdot {{b}}^x $, what is the base?`, r`{{b}}`, { params: { a: '2..9', b: '2..9' } });
  T('exp-base', 'easier', r`Is $ y = {{a}}\cdot {{b}}^x $ exponential growth or decay?`, r`\text{growth}`, { params: { a: '2..9', b: '2..9' } });
  T('exp-base', 'easier', r`Is $ y = {{a}}\left(\frac{1}{ {{q}} }\right)^x $ exponential growth or decay?`, r`\text{decay}`, { params: { a: '2..9', q: '2..9' } });
  T('exp-base', 'parallel', r`In the equation $ y = {{a}}\left({{b}}\right)^x $, what is the base and what does it represent?`, r`{{b}}` + G, { params: { a: '2..9', b: '2..8' } });
  T('exp-base', 'parallel', r`In the equation $ y = {{a}}\left({{b}}\right)^x $, what is the base and what does it represent?`, r`{{b}}` + D, { params: Object.assign({ a: '2..9' }, FR), constraints: FRC, derived: { b: 'p/q' } });
  T('exp-base', 'parallel', r`In the equation $ y = {{a}}\left({{b}}\right)^x $, what is the base and what does it represent?`, r`{{b}}` + G, { params: { a: '2..9', p: '3..9', q: '2..8' }, constraints: ['p > q', 'gcd(p,q) == 1'], derived: { b: 'p/q' } });
  T('exp-base', 'challenge', r`In the equation $ y = {{a}}\left({{bd:dec2}}\right)^x $, what is the base and what does it represent?`, r`{{bd:dec2}}` + G, { params: { a: '100..900', r: '2,3,4,5,6,8,12,15' }, derived: { bd: '1 + r/100' } });
  T('exp-base', 'challenge', r`In the equation $ y = {{a}}\left({{bd:dec2}}\right)^x $, what is the base and what does it represent?`, r`{{bd:dec2}}` + D, { params: { a: '100..900', r: '2,3,4,5,6,8,12,15' }, derived: { bd: '1 - r/100' } });
  T('exp-base', 'challenge', r`A population is modeled by $ P = {{a}}(1 + 0.{{r}})^t $. Does the model show growth or decay, and by what percent each period?`, r`\text{growth, } {{r}}\%`, { params: { a: '100..900', r: '10..49' } });

  /* ---------- domain, range, horizontal asymptote ---------- */
  skill('exp-range', 'Domain, range and asymptote of an exponential equation', LG);
  const rng = (a, h, k) => ({ a, h, k });
  const gfun = (base) => r`g(x) = {{a:coef}}\left(` + base + r`\right)^{x {{-h:sign}} } {{k:sign}}`;
  const bI = '{{b}}', bF = r`\frac{1}{ {{q}} }`;
  const rangeAns = (pos) => (pos ? r`({{k}}, \infty)` : r`(-\infty, {{k}})`);
  const P1 = { a: '1..4', b: '2..5', h: '-4..4 !0', k: '-6..6 !0' }, P1f = { a: '1..4', q: '2..6', h: '-4..4 !0', k: '-6..6 !0' };
  const N1 = { a: '-4..-1', b: '2..5', h: '-4..4 !0', k: '-6..6 !0' }, N1f = { a: '-4..-1', q: '2..6', h: '-4..4 !0', k: '-6..6 !0' };
  T('exp-range', 'worked', r`What is the range of the function $ ` + gfun(bI) + r` $?`, rangeAns(true), { params: P1,
    steps: [r`The horizontal asymptote of $ a\cdot b^{x-h}+k $ is $ y = k $, here $ y = {{k}} $.`, r`The coefficient $ {{a}} $ is positive, so the graph is above the asymptote.`, r`Range: $ ({{k}}, \infty) $.`] });
  T('exp-range', 'easier', r`What is the domain of $ f(x) = {{a}}\left({{b}}\right)^{x} {{k:sign}} $?`, r`(-\infty, \infty)`, { params: { a: '1..5', b: '2..5', k: '-6..6 !0' } });
  T('exp-range', 'easier', r`What is the horizontal asymptote of $ f(x) = {{a}}\left({{b}}\right)^{x} {{k:sign}} $?`, r`y = {{k}}`, { params: { a: '1..5', b: '2..5', k: '-6..6 !0' } });
  T('exp-range', 'easier', r`What is the range of $ f(x) = {{b}}^{x} {{k:sign}} $?`, rangeAns(true), { params: { b: '2..7', k: '-6..6 !0' } });
  T('exp-range', 'parallel', r`What is the range of the function $ ` + gfun(bI) + r` $?`, rangeAns(true), { params: P1 });
  T('exp-range', 'parallel', r`What is the range of the function $ ` + gfun(bF) + r` $?`, rangeAns(true), { params: P1f });
  T('exp-range', 'parallel', r`What is the range of the function $ ` + gfun(bI) + r` $?`, rangeAns(false), { params: N1 });
  T('exp-range', 'parallel', r`What is the horizontal asymptote of the function $ ` + gfun(bF) + r` $?`, r`y = {{k}}`, { params: P1f });
  T('exp-range', 'parallel', r`What is the domain of the function $ ` + gfun(bI) + r` $?`, r`(-\infty, \infty)`, { params: P1 });
  T('exp-range', 'challenge', r`What is the range of the function $ ` + gfun(bF) + r` $?`, rangeAns(false), { params: N1f });
  T('exp-range', 'challenge', r`State the horizontal asymptote and the range of $ ` + gfun(bF) + r` $.`, r`y = {{k}};\ ({{k}}, \infty)`, { params: P1f });
  T('exp-range', 'challenge', r`State the horizontal asymptote and the range of $ ` + gfun(bI) + r` $.`, r`y = {{k}};\ (-\infty, {{k}})`, { params: N1 });

  /* ---------- growth or decay from an equation ---------- */
  skill('exp-gd', 'Exponential growth or decay from an equation', LG);
  const gdAns = (g) => (g ? r`\text{growth}` : r`\text{decay}`);
  T('exp-gd', 'worked', r`Is $ f(x) = \left(\frac{ {{p}} }{ {{q}} }\right)^x $ exponential growth or decay?`, gdAns(false), { params: FR, constraints: FRC,
    steps: [r`Look at the base: $ \frac{ {{p}} }{ {{q}} } $.`, r`The base is between $ 0 $ and $ 1 $ (the numerator is smaller than the denominator), so each step multiplies by less than 1: **decay**.`] });
  T('exp-gd', 'easier', r`Is $ f(x) = {{b}}^x $ exponential growth or decay?`, gdAns(true), { params: { b: '2..9' } });
  T('exp-gd', 'easier', r`Is $ f(x) = \left(\frac{1}{ {{q}} }\right)^x $ exponential growth or decay?`, gdAns(false), { params: { q: '2..9' } });
  T('exp-gd', 'parallel', r`Is $ f(x) = \left(\frac{ {{p}} }{ {{q}} }\right)^x $ exponential growth or decay?`, gdAns(false), { params: FR, constraints: FRC });
  T('exp-gd', 'parallel', r`Is $ f(x) = \left(\frac{ {{p}} }{ {{q}} }\right)^x $ exponential growth or decay?`, gdAns(true), { params: { p: '3..9', q: '2..8' }, constraints: ['p > q', 'gcd(p,q) == 1'] });
  T('exp-gd', 'parallel', r`Is $ f(x) = {{a}}\left({{bd:dec2}}\right)^x $ exponential growth or decay?`, gdAns(true), { params: { a: '2..9', r: '2,3,4,5,6,7,8,9' }, derived: { bd: '1 + r/100' } });
  T('exp-gd', 'parallel', r`Is $ f(x) = {{a}}\left({{bd:dec2}}\right)^x $ exponential growth or decay?`, gdAns(false), { params: { a: '2..9', r: '2,3,4,5,6,7,8,9' }, derived: { bd: '1 - r/100' } });
  T('exp-gd', 'parallel', r`Is $ f(x) = -{{b}}^x $ exponential growth or decay?`, gdAns(true), { params: { b: '2..9' } });
  T('exp-gd', 'parallel', r`Is $ f(x) = -{{b}}^x {{k:sign}} $ exponential growth or decay?`, gdAns(true), { params: { b: '2..9', k: '-9..9 !0' } });
  T('exp-gd', 'challenge', r`Is $ f(x) = -\left(\frac{1}{ {{q}} }\right)^x $ exponential growth or decay?`, gdAns(false), { params: { q: '2..9' } });
  T('exp-gd', 'challenge', r`Is $ f(x) = {{a}}\cdot {{b}}^{-x} $ exponential growth or decay?`, gdAns(false), { params: { a: '2..9', b: '2..6' } });
  T('exp-gd', 'challenge', r`Is $ f(x) = {{a}}\left(\frac{1}{ {{q}} }\right)^{-x} $ exponential growth or decay?`, gdAns(true), { params: { a: '2..9', q: '2..6' } });
  T('exp-gd', 'challenge', r`Is $ y = {{a}}(1 - 0.{{r}})^t $ exponential growth or decay?`, gdAns(false), { params: { a: '100..900', r: '10..49' } });
  T('exp-gd', 'challenge', r`Is $ y = {{a}}(1 + 0.{{r}})^t $ exponential growth or decay?`, gdAns(true), { params: { a: '100..900', r: '10..49' } });

  /* ---------- transformations ---------- */
  skill('exp-trans', 'Transformations of exponential functions', LG);
  // answer pieces
  const dirH = (pos) => (pos ? r`\text{right}` : r`\text{left}`), dirV = (pos) => (pos ? r`\text{up}` : r`\text{down}`);
  const hAbs = (pos) => (pos ? '{{h}}' : '{{0-h}}'), kAbs = (pos) => (pos ? '{{k}}' : '{{0-k}}');
  const hr = (pos) => (pos ? '1..6' : '-6..-1');
  const shiftSentence = (hp, kp) => r`\text{Shift ` + (hp ? 'right' : 'left') + r` } ` + hAbs(hp) + r` \text{ units and ` + (kp ? 'up' : 'down') + r` } ` + kAbs(kp) + r` \text{ units}`;
  const parent = (frac) => (frac ? r`\left(\frac{1}{ {{q}} }\right)^x` : '{{b}}^x');
  const moved = (frac) => (frac ? r`\left(\frac{1}{ {{q}} }\right)^{x {{-h:sign}} } {{k:sign}}` : r`{{b}}^{x {{-h:sign}} } {{k:sign}}`);
  for (const hp of [true, false]) for (const kp of [true, false]) for (const frac of [false, true]) {
    const params = Object.assign({ h: hr(hp), k: kp ? '1..7' : '-7..-1' }, frac ? { q: '2..6' } : { b: '2..6' });
    T('exp-trans', 'parallel', r`The parent function is $ f(x) = ` + parent(frac) + r` $. Which statement describes the transformations of $ g(x) = ` + moved(frac) + r` $?`, shiftSentence(hp, kp), { params });
  }
  T('exp-trans', 'worked', r`The parent function is $ f(x) = \left(\frac{1}{ {{q}} }\right)^x $. Which statement describes the transformations of $ g(x) = \left(\frac{1}{ {{q}} }\right)^{x {{-h:sign}} } {{k:sign}} $?`, shiftSentence(true, true), { params: { q: '2..6', h: '1..6', k: '1..7' },
    steps: [r`In $ g(x) = a\cdot b^{x - h} + k $, the number subtracted from $ x $ is $ h $. Here $ x {{-h:sign}} $ means $ h = {{h}} $: shift **right** $ {{h}} $.`, r`The number added at the end is $ k = {{k}} $: shift **up** $ {{k}} $.`] });
  // easier: one change at a time
  T('exp-trans', 'easier', r`How is $ g(x) = {{b}}^{x} {{k:sign}} $ moved from the parent $ f(x) = {{b}}^x $?`, r`\text{Shift up } {{k}} \text{ units}`, { params: { b: '2..6', k: '1..9' } });
  T('exp-trans', 'easier', r`How is $ g(x) = {{b}}^{x} {{k:sign}} $ moved from the parent $ f(x) = {{b}}^x $?`, r`\text{Shift down } {{0-k}} \text{ units}`, { params: { b: '2..6', k: '-9..-1' } });
  T('exp-trans', 'easier', r`How is $ g(x) = {{b}}^{x {{-h:sign}} } $ moved from the parent $ f(x) = {{b}}^x $?`, r`\text{Shift right } {{h}} \text{ units}`, { params: { b: '2..6', h: '1..9' } });
  T('exp-trans', 'easier', r`How is $ g(x) = {{b}}^{x {{-h:sign}} } $ moved from the parent $ f(x) = {{b}}^x $?`, r`\text{Shift left } {{0-h}} \text{ units}`, { params: { b: '2..6', h: '-9..-1' } });
  // describe every transformation (shifts, stretch/compression, reflection)
  const describe = (hp, kp, avals, word) => {
    const aTok = avals === 'frac' ? r`\frac{1}{ {{m}} }` : '{{m}}';
    T('exp-trans', 'parallel', r`Describe each transformation (direction and amount) of $ f(x) = ` + aTok + r`\left(\frac{1}{ {{q}} }\right)^{x {{-h:sign}} } {{k:sign}} $ from its parent function.`,
      dirH(hp) + ' ' + hAbs(hp) + r`,\ ` + dirV(kp) + ' ' + kAbs(kp) + r`,\ \text{vertical ` + word + r` by a factor of } ` + aTok, { params: { m: '2..5', q: '2..6', h: hr(hp), k: kp ? '1..7' : '-7..-1' } });
  };
  for (const hp of [true, false]) for (const kp of [true, false]) { describe(hp, kp, 'frac', 'compression'); describe(hp, kp, 'int', 'stretch'); }
  for (const kp of [true, false]) {
    T('exp-trans', 'parallel', r`Describe each transformation of $ f(x) = -{{b}}^{x} {{k:sign}} $ from the parent function $ y = {{b}}^x $.`, r`\text{reflection over the } x\text{-axis},\ ` + dirV(kp) + ' ' + kAbs(kp), { params: { b: '2..6', k: kp ? '1..7' : '-7..-1' } });
    T('exp-trans', 'challenge', r`Describe each transformation of $ f(x) = -{{m}}\left(\frac{1}{ {{q}} }\right)^{x {{-h:sign}} } {{k:sign}} $ from its parent function.`, r`\text{reflection over the } x\text{-axis},\ \text{vertical stretch by a factor of } {{m}},\ \text{right } {{h}},\ ` + dirV(kp) + ' ' + kAbs(kp), { params: { m: '2..5', q: '2..6', h: '1..6', k: kp ? '1..7' : '-7..-1' } });
  }
  T('exp-trans', 'challenge', r`Describe each transformation of $ f(x) = -\frac{1}{ {{m}} }\left({{b}}\right)^{x {{-h:sign}} } {{k:sign}} $ from the parent function $ y = {{b}}^x $.`, r`\text{reflection over the } x\text{-axis},\ \text{vertical compression by a factor of } \frac{1}{ {{m}} },\ \text{left } {{0-h}},\ \text{up } {{k}}`, { params: { m: '2..5', b: '2..6', h: '-6..-1', k: '1..7' } });
  T('exp-trans', 'challenge', r`Describe each transformation of $ f(x) = {{m}}\left({{b}}\right)^{x {{-h:sign}} } {{k:sign}} $ from the parent function $ y = {{b}}^x $.`, r`\text{vertical stretch by a factor of } {{m}},\ \text{right } {{h}},\ \text{down } {{0-k}}`, { params: { m: '2..5', b: '2..6', h: '1..6', k: '-7..-1' } });

  /* ---------- intercepts ---------- */
  skill('exp-int', 'Intercepts of an exponential function', LG);
  const ev = (a, b, k) => ({ curves: [{ type: 'exp', a, b, h: 0, k }], view: [-5, 5, -8, 12] });
  const IA = (xi) => r`x\text{-intercept: } (` + xi + r`, 0);\ y\text{-intercept: } (0, {{yi}})`;
  T('exp-int', 'worked', r`Find the $ x $- and $ y $-intercepts of $ f(x) = {{b}}^{x} - {{k}} $. Round to 2 decimal places if necessary.`, IA('{{logb(b,k):dec2}}'), { params: { b: '2..5', k: '2..9' }, derived: { yi: '1-k' }, constraints: ['isint(logb(b,k)) == 0'],
    steps: [r`**$ y $-intercept:** let $ x = 0 $: $ f(0) = {{b}}^0 - {{k}} = 1 - {{k}} = {{yi}} $, so $ (0, {{yi}}) $.`, r`**$ x $-intercept:** let $ f(x) = 0 $: $ {{b}}^x - {{k}} = 0 $, so $ {{b}}^x = {{k}} $.`, r`Take the logarithm of both sides: $ x = \log_{ {{b}} }({{k}}) = \frac{\ln {{k}} }{\ln {{b}} } \approx {{logb(b,k):dec2}} $.`] });
  T('exp-int', 'easier', r`Find the $ y $-intercept of $ f(x) = {{b}}^{x} {{k:sign}} $.`, r`(0, {{yi}})`, { params: { b: '2..6', k: '-6..6 !0' }, derived: { yi: '1+k' }, constraints: ['yi != 0'] });
  T('exp-int', 'easier', r`Find the $ y $-intercept of $ f(x) = {{a}}\left({{b}}\right)^{x} {{k:sign}} $.`, r`(0, {{yi}})`, { params: { a: '2..5', b: '2..6', k: '-8..8 !0' }, derived: { yi: 'a+k' }, constraints: ['yi != 0'] });
  T('exp-int', 'easier', r`Find the $ x $- and $ y $-intercepts of $ f(x) = {{b}}^{x} - {{t}} $.`, IA('{{n}}'), { params: { b: '2..4', n: '1..3' }, derived: { t: 'b^n', yi: '1-b^n' }, constraints: ['t <= 64'] });
  T('exp-int', 'parallel', r`Find the $ x $- and $ y $-intercepts of $ f(x) = {{b}}^{x} - {{k}} $. Show your work and round to 2 decimal places if necessary.`, IA('{{logb(b,k):dec2}}'), { params: { b: '2..5', k: '2..9' }, derived: { yi: '1-k' }, constraints: ['isint(logb(b,k)) == 0'], graphs: [ev(1, 'b', '0-k')] });
  T('exp-int', 'parallel', r`Find the $ x $- and $ y $-intercepts of $ f(x) = {{b}}^{x} - {{k}} $. Round to 2 decimal places if necessary.`, IA('{{logb(b,k):dec2}}'), { params: { b: '2..7', k: '2..20' }, derived: { yi: '1-k' }, constraints: ['isint(logb(b,k)) == 0'] });
  T('exp-int', 'parallel', r`Find the $ x $- and $ y $-intercepts of $ f(x) = {{b}}^{x} - {{k}} $.`, IA('{{n}}'), { params: { b: '2..5', n: '1..3' }, derived: { k: 'b^n', yi: '1-b^n' }, constraints: ['k <= 125'] });
  T('exp-int', 'challenge', r`Find the $ x $- and $ y $-intercepts of $ f(x) = {{a}}\cdot {{b}}^{x} - {{k}} $. Round to 2 decimal places.`, IA('{{logb(b,k/a):dec2}}'), { params: { a: '2..5', b: '2..5', k: '6..30' }, derived: { yi: 'a-k' }, constraints: ['k > a', 'isint(logb(b,k/a)) == 0'] });
  T('exp-int', 'challenge', r`Find the $ x $-intercept of $ f(x) = {{b}}^{x {{-h:sign}} } - {{k}} $. Round to 2 decimal places.`, r`x \approx {{h+logb(b,k):dec2}}`, { params: { b: '2..5', h: '-3..3 !0', k: '2..20' }, constraints: ['isint(logb(b,k)) == 0'] });

  /* ---------- calculator evaluation ---------- */
  skill('exp-calc', 'Evaluating exponentials and logarithms with a calculator', LG);
  const RND = r`Round to 2 decimal places.`;
  const V = 'abs(' ;
  T('exp-calc', 'worked', r`Evaluate $ e^{ {{x}} } $. ` + RND, r`{{ex(x):dec2}}`, { params: { s: '-1,1', p: '1..5', q: '2..5' }, derived: { x: 's*p/q' }, constraints: ['gcd(p,q) == 1', 'q > 1', 'abs(ex(x))*100 >= 1'],
    steps: [r`Type the expression into your calculator exactly as written (use the $ e^x $ key and parentheses around the exponent).`, r`$ e^{ {{x}} } \approx {{ex(x):dec2}} $`] });
  T('exp-calc', 'easier', r`Evaluate $ \ln({{n}}) $. ` + RND, r`{{ln(n):dec2}}`, { params: { n: '2..60' }, constraints: ['issq(n) == 0 || n == 4'].slice(0, 1) });
  T('exp-calc', 'easier', r`Evaluate $ \log({{n}}) $ (base 10). ` + RND, r`{{log10(n):dec2}}`, { params: { n: '2..90' }, constraints: ['isint(log10(n)) == 0'] });
  T('exp-calc', 'easier', r`Evaluate $ e^{ {{x}} } $. ` + RND, r`{{ex(x):dec2}}`, { params: { x: '-4,-3,-2,-1,2,3,4' }, constraints: ['abs(ex(x))*100 >= 1'] });
  T('exp-calc', 'parallel', r`Evaluate $ e^{ {{x}} } $. ` + RND, r`{{ex(x):dec2}}`, { params: { s: '-1,1', p: '1..7', q: '2..7' }, derived: { x: 's*p/q' }, constraints: ['gcd(p,q) == 1', 'abs(ex(x))*100 >= 1'] });
  T('exp-calc', 'parallel', r`Evaluate $ \ln\sqrt{ {{n}} } $. ` + RND, r`{{ln(n)/2:dec2}}`, { params: { n: '3..99' }, constraints: ['issq(n) == 0'] });
  T('exp-calc', 'parallel', r`Evaluate $ {{b}}^{\pi} $. ` + RND, r`{{pipow(b):dec2}}`, { params: { b: '2..9' } });
  T('exp-calc', 'parallel', r`Evaluate $ \log\left(\frac{ {{p}} }{ {{q}} }\right) $ (base 10). ` + RND, r`{{log10(p/q):dec2}}`, { params: { p: '1..9', q: '2..9' }, constraints: ['gcd(p,q) == 1', 'p != q', 'abs(log10(p/q))*100 >= 1'] });
  T('exp-calc', 'parallel', r`Evaluate $ \log_{ {{b}} }({{n}}) $. ` + RND, r`{{logb(b,n):dec2}}`, { params: { b: '2..9', n: '2..60' }, constraints: ['b != n', 'isint(logb(b,n)) == 0'] });
  T('exp-calc', 'parallel', r`Evaluate $ \log_{ {{B}} }({{V}}) $. ` + RND, r`{{n/m:dec2}}`, { params: { c: '2..3', m: '2..4', n: '1..5' }, derived: { B: 'c^m', V: 'c^n' }, constraints: ['gcd(n,m) == 1', 'n != m'].concat([]) });
  T('exp-calc', 'challenge', r`Evaluate $ {{a}}\ln({{n}}) {{c:sign}} $. ` + RND, r`{{a*ln(n)+c:dec2}}`, { params: { a: '2..6', n: '2..30', c: '-5..5 !0' } });
  T('exp-calc', 'challenge', r`Evaluate $ {{a}}e^{ {{x}} } $. ` + RND, r`{{a*ex(x):dec2}}`, { params: { a: '2..9', s: '-1,1', p: '1..5', q: '2..5' }, derived: { x: 's*p/q' }, constraints: ['gcd(p,q) == 1', 'abs(a*ex(x))*100 >= 1'] });
  T('exp-calc', 'challenge', r`Evaluate $ \frac{\ln({{n}})}{\ln({{b}})} $. ` + RND, r`{{logb(b,n):dec2}}`, { params: { b: '2..9', n: '2..60' }, constraints: ['b != n', 'isint(logb(b,n)) == 0'] });
  T('exp-calc', 'challenge', r`Evaluate $ \log_{ {{b}} }\left(\frac{ {{p}} }{ {{q}} }\right) $. ` + RND, r`{{logb(b,p/q):dec2}}`, { params: { b: '2..9', p: '1..9', q: '2..9' }, constraints: ['gcd(p,q) == 1', 'p != q', 'abs(logb(b,p/q))*100 >= 1'] });

  /* ---------- solving exponential equations with logarithms ---------- */
  skill('exp-eq-log', 'Solving exponential equations with logarithms', LG);
  const XA = (v) => r`x \approx ` + v;
  T('exp-eq-log', 'worked', r`Solve $ {{b}}^{x} = {{N}} $. Round to 2 decimal places.`, XA('{{logb(b,N):dec2}}'), { params: { b: '2..9', N: '5..200' }, constraints: ['isint(logb(b,N)) == 0', 'b != N'],
    steps: [r`The bases cannot be matched, so take the logarithm of both sides: $ \log({{b}}^x) = \log({{N}}) $.`, r`Bring the exponent down: $ x\log({{b}}) = \log({{N}}) $.`, r`Divide: $ x = \frac{\log({{N}})}{\log({{b}})} \approx {{logb(b,N):dec2}} $.`] });
  T('exp-eq-log', 'easier', r`Solve $ {{b}}^{x} = {{N}} $. Round to 2 decimal places.`, XA('{{logb(b,N):dec2}}'), { params: { b: '2..6', N: '5..60' }, constraints: ['isint(logb(b,N)) == 0', 'b != N'] });
  T('exp-eq-log', 'easier', r`Solve $ {{a}}\cdot {{b}}^{x} = {{N}} $. Round to 2 decimal places.`, XA('{{logb(b,N/a):dec2}}'), { params: { a: '2..5', b: '2..6', N: '20..200' }, constraints: ['N > a', 'isint(logb(b,N/a)) == 0'] });
  T('exp-eq-log', 'parallel', r`Solve $ {{b}}^{ {{c}}x } = {{N}} $. Round to 2 decimal places.`, XA('{{logb(b,N)/c:dec2}}'), { params: { b: '2..9', c: '2..4', N: '50..2000' }, constraints: ['isint(logb(b,N)) == 0'] });
  T('exp-eq-log', 'parallel', r`Solve $ \left(\frac{1}{ {{q}} }\right)^{x} = {{N}} $. Round to 2 decimal places.`, XA('{{0-logb(q,N):dec2}}'), { params: { q: '2..9', N: '10..200' }, constraints: ['isint(logb(q,N)) == 0'] });
  T('exp-eq-log', 'parallel', r`Solve $ {{b}}^{x {{-h:sign}} } {{k:sign}} = {{m}} $. Round to 2 decimal places.`, XA('{{h+logb(b,m-k):dec2}}'), { params: { b: '2..10', h: '-6..6 !0', k: '1..8', m: '9..30' }, constraints: ['m > k', 'isint(logb(b,m-k)) == 0', 'm-k != 1'] });
  T('exp-eq-log', 'parallel', r`Solve $ {{b}}^{x {{-h:sign}} } + {{k}} = {{m}} $. Round to 2 decimal places.`, XA('{{h+logb(b,m-k):dec2}}'), { params: { b: '2..10', h: '1..6', k: '2..8', m: '10..40' }, constraints: ['isint(logb(b,m-k)) == 0'] });
  T('exp-eq-log', 'challenge', r`Solve $ {{b}}^{ {{c}}x {{d:sign}} } = {{N}} $. Round to 2 decimal places.`, XA('{{(logb(b,N)-d)/c:dec2}}'), { params: { b: '2..7', c: '2..4', d: '-5..5 !0', N: '50..900' }, constraints: ['isint(logb(b,N)) == 0'] });
  T('exp-eq-log', 'challenge', r`Solve $ e^{ {{c}}x } = {{N}} $. Round to 2 decimal places.`, XA('{{ln(N)/c:dec2}}'), { params: { c: '2..6', N: '5..400' } });
  T('exp-eq-log', 'challenge', r`Solve $ {{a}}\cdot {{b}}^{x {{-h:sign}} } {{k:sign}} = {{m}} $. Round to 2 decimal places.`, XA('{{h+logb(b,(m-k)/a):dec2}}'), { params: { a: '2..5', b: '2..6', h: '-4..4 !0', k: '-6..6 !0', m: '20..120' }, constraints: ['(m-k)/a > 0', 'isint(logb(b,(m-k)/a)) == 0', '(m-k)/a != 1'] });
  T('exp-eq-log', 'challenge', r`An account starts with $ $ {{P}} $ and earns {{r}}\% interest compounded annually, so the balance is $ {{P}}(1 + 0.0{{r}})^t $. How many years until the balance reaches $ $ {{A}} $? Round to 2 decimal places.`, r`t \approx {{ln(A/P)/ln(1+r/100):dec2}}\text{ years}`, { params: { P: '500,1000,2000,5000', r: '3..9', k: '2..4' }, derived: { A: 'P*k' } });

  /* ---------- inverse functions ---------- */
  skill('inv-fn', 'Inverse functions', IV);
  const tbl = (rows) => r`\begin{array}{c|c} x & y \\ \hline ` + rows.join(r` \\ `) + r` \end{array}`;
  const two = (a, b) => r`$ \text{Table A: } ` + a + r` \qquad \text{Table B: } ` + b + ' $';
  T('inv-fn', 'worked', r`Find the inverse of $ y = {{m}}x {{c:sign}} $.`, r`y = \frac{x {{-c:sign}} }{ {{m}} }`, { params: { m: '2..9', c: '-9..9 !0' },
    steps: [r`Swap $ x $ and $ y $: $ x = {{m}}y {{c:sign}} $.`, r`Subtract $ {{c}} $ (undo the addition): $ x {{-c:sign}} = {{m}}y $.`, r`Divide by $ {{m}} $: $ y = \frac{x {{-c:sign}} }{ {{m}} } $.`] });
  T('inv-fn', 'easier', r`Find the inverse of $ y = x {{c:sign}} $.`, r`y = x {{-c:sign}}`, { params: { c: '-9..9 !0' } });
  T('inv-fn', 'easier', r`Find the inverse of $ y = {{m}}x $.`, r`y = \frac{x}{ {{m}} }`, { params: { m: '2..12' } });
  T('inv-fn', 'easier', r`Find the inverse of $ f(x) = {{b}}^{x} $.`, r`f^{-1}(x) = \log_{ {{b}} }(x)`, { params: { b: '2..9' } });
  T('inv-fn', 'parallel', r`Find the inverse of $ y = {{m}}x {{c:sign}} $.`, r`y = \frac{x {{-c:sign}} }{ {{m}} }`, { params: { m: '2..9', c: '-9..9 !0' } });
  T('inv-fn', 'parallel', r`Find the inverse of $ y = -{{m}}x {{c:sign}} $.`, r`y = -\frac{x {{-c:sign}} }{ {{m}} }`, { params: { m: '2..9', c: '-9..9 !0' } });
  T('inv-fn', 'parallel', r`Find the inverse of $ f(x) = \log_{ {{b}} }(x) $.`, r`f^{-1}(x) = {{b}}^{x}`, { params: { b: '2..9' } });
  T('inv-fn', 'parallel', r`Find the inverse of $ f(x) = {{b}}^{x} {{k:sign}} $.`, r`f^{-1}(x) = \log_{ {{b}} }(x {{-k:sign}})`, { params: { b: '2..9', k: '-9..9 !0' } });
  T('inv-fn', 'parallel', r`Are $ f(x) = {{b}}^{x} {{k:sign}} $ and $ g(x) = \log_{ {{b}} }(x {{-k:sign}}) $ inverses of each other?`, r`\text{Yes}`, { params: { b: '2..7', k: '-9..9 !0' } });
  T('inv-fn', 'parallel', r`Are $ f(x) = {{b}}^{x} {{k:sign}} $ and $ g(x) = \log_{ {{b}} }(x {{k:sign}}) $ inverses of each other?`, r`\text{No}`, { params: { b: '2..7', k: '-9..9 !0' } });
  T('inv-fn', 'parallel', two(tbl(['{{x1}} & {{y1}}', '{{x2}} & {{y2}}', '{{x3}} & {{y3}}']), tbl(['{{y1}} & {{x1}}', '{{y2}} & {{x2}}', '{{y3}} & {{x3}}'])) + r` Are the relations in Table A and Table B inverses of each other?`, r`\text{Yes}`, { params: { b: '2..4', k: '-5..5 !0' }, derived: { x1: '0', y1: '1+k', x2: '1', y2: 'b+k', x3: '2', y3: 'b^2+k' } });
  T('inv-fn', 'parallel', two(tbl(['{{x1}} & {{y1}}', '{{x2}} & {{y2}}', '{{x3}} & {{y3}}']), tbl(['{{y1}} & {{x1}}', '{{y2}} & {{x2}}', '{{y3+1}} & {{x3}}'])) + r` Are the relations in Table A and Table B inverses of each other?`, r`\text{No}`, { params: { b: '2..4', k: '-5..5 !0' }, derived: { x1: '0', y1: '1+k', x2: '1', y2: 'b+k', x3: '2', y3: 'b^2+k' } });
  T('inv-fn', 'parallel', two(tbl(['{{x1}} & {{y1}}', '{{x2}} & {{y2}}', '{{x3}} & {{y3}}']), tbl(['{{x1}} & {{y1}}', '{{x2}} & {{y2}}', '{{x3}} & {{y3}}'])) + r` Are the relations in Table A and Table B inverses of each other?`, r`\text{No}`, { params: { b: '2..4', k: '-5..5 !0' }, derived: { x1: '0', y1: '1+k', x2: '1', y2: 'b+k', x3: '2', y3: 'b^2+k' } });
  T('inv-fn', 'challenge', r`Find the inverse of $ y = \frac{ {{p}} }{ {{q}} }x {{c:sign}} $.`, r`y = \frac{ {{q}} }{ {{p}} }x {{-c*q/p:sign}}`, { params: { p: '2..7', q: '2..7', c: '-9..9 !0' }, constraints: ['gcd(p,q) == 1', 'p != q'] });
  T('inv-fn', 'challenge', r`Find the inverse of $ f(x) = \log_{ {{b}} }(x) {{k:sign}} $.`, r`f^{-1}(x) = {{b}}^{x {{-k:sign}} }`, { params: { b: '2..9', k: '-9..9 !0' } });
  T('inv-fn', 'challenge', r`Find the inverse of $ f(x) = {{a}}\cdot {{b}}^{x} $.`, r`f^{-1}(x) = \log_{ {{b}} }\left(\frac{x}{ {{a}} }\right)`, { params: { a: '2..9', b: '2..6' } });
})();
