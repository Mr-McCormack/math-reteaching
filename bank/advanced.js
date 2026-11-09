/* Advanced Algebra (Georgia) — batch 1: complex numbers, logarithms, exponential models, radical & fractional exponents, cubes, quartics, polynomial zeros */
(function () {
  const { skill, T } = RB;
  const r = String.raw;
  const CX = 'Adv. Algebra: complex numbers', LG = 'Adv. Algebra: logs & exponentials', RD = 'Adv. Algebra: radicals & exponents', PL = 'Adv. Algebra: polynomials';
  const POW = ['1', 'i', '-1', '-i'];

  /* ---------- powers of i ---------- */
  skill('cx-i-pow', 'Powers of i', CX);
  for (let k = 0; k < 4; k++) {
    const rem = k === 0 ? r`$ {{n}} = 4\cdot {{q}} $, so the remainder is $0$.` : r`$ {{n}} = 4\cdot {{q}} + ${k}$, so the remainder is $${k}$.`;
    const fin = k === 0 ? r`$ i^{ {{n}} } = (i^4)^{ {{q}} } = 1^{ {{q}} } = 1 $` : k === 1 ? r`$ i^{ {{n}} } = (i^4)^{ {{q}} }\cdot i = i $` : r`$ i^{ {{n}} } = (i^4)^{ {{q}} }\cdot i^{${k}} = ${POW[k]}$`;
    T('cx-i-pow', 'worked', r`Simplify: $ i^{ {{n}} } $`, POW[k], { params: { q: '3..9' }, derived: { n: `4*q+${k}` },
      steps: [r`The powers of $i$ repeat in a cycle of 4: $i^1=i,\ i^2=-1,\ i^3=-i,\ i^4=1$.`, 'Divide the exponent by 4: ' + rem, fin] });
    T('cx-i-pow', 'easier', r`Simplify: $ i^{ {{n}} } $`, POW[k], { params: { q: '1..9' }, derived: { n: `4*q+${k}` } });
    T('cx-i-pow', 'parallel', r`Simplify: $ i^{ {{n}} } $`, POW[k], { params: { q: '5..40' }, derived: { n: `4*q+${k}` } });
    T('cx-i-pow', 'parallel', r`Simplify: $ -i^{ {{n}} } $`, POW[(k + 2) % 4], { params: { q: '5..40' }, derived: { n: `4*q+${k}` } });
    T('cx-i-pow', 'challenge', r`Simplify: $ i^{ {{n1}} }\cdot i^{ {{n2}} } $`, POW[k], { params: { r1: '0..3', q1: '3..15', q2: '3..15' }, derived: { r2: `mod(${k}-r1,4)`, n1: '4*q1+r1', n2: '4*q2+r2' } });
  }

  /* ---------- add / subtract complex ---------- */
  skill('cx-addsub', 'Adding and subtracting complex numbers', CX);
  T('cx-addsub', 'worked', r`Add: $ ({{a}}{{b:sgncoef}}i) + ({{c}}{{d:sgncoef}}i) $`, r`{{a+c}}{{b+d:sgncoef}}i`, { params: { a: '-8..8 !0', b: '-8..8 !0', c: '-8..8 !0', d: '-8..8 !0' }, constraints: ['a+c != 0', 'b+d != 0'],
    steps: [r`Add the real parts: $ {{a}} + {{c:paren}} = {{a+c}}$`, r`Add the imaginary parts: $ {{b}} + {{d:paren}} = {{b+d}}$, so the imaginary part is $ {{b+d:coef}}i$`] });
  T('cx-addsub', 'easier', r`Add: $ ({{a}}{{b:sgncoef}}i) + ({{c}}{{d:sgncoef}}i) $`, r`{{a+c}}{{b+d:sgncoef}}i`, { params: { a: '1..6', b: '1..6', c: '1..6', d: '1..6' } });
  T('cx-addsub', 'easier', r`Subtract: $ ({{a}}{{b:sgncoef}}i) - ({{c}}{{d:sgncoef}}i) $`, r`{{a-c}}{{b-d:sgncoef}}i`, { params: { a: '4..12', b: '4..12', c: '1..3', d: '1..3' } });
  T('cx-addsub', 'parallel', r`Add: $ ({{a}}{{b:sgncoef}}i) + ({{c}}{{d:sgncoef}}i) $`, r`{{a+c}}{{b+d:sgncoef}}i`, { params: { a: '-9..9 !0', b: '-9..9 !0', c: '-9..9 !0', d: '-9..9 !0' }, constraints: ['a+c != 0', 'b+d != 0'] });
  T('cx-addsub', 'parallel', r`Subtract: $ ({{a}}{{b:sgncoef}}i) - ({{c}}{{d:sgncoef}}i) $`, r`{{a-c}}{{b-d:sgncoef}}i`, { params: { a: '-9..9 !0', b: '-9..9 !0', c: '-9..9 !0', d: '-9..9 !0' }, constraints: ['a-c != 0', 'b-d != 0'] });
  T('cx-addsub', 'challenge', r`Simplify: $ ({{a}}{{b:sgncoef}}i) - ({{c}}{{d:sgncoef}}i) + ({{e}}{{f:sgncoef}}i) $`, r`{{a-c+e}}{{b-d+f:sgncoef}}i`, { params: { a: '-9..9 !0', b: '-9..9 !0', c: '-9..9 !0', d: '-9..9 !0', e: '-9..9 !0', f: '-9..9 !0' }, constraints: ['a-c+e != 0', 'b-d+f != 0'] });

  /* ---------- multiply complex ---------- */
  skill('cx-mult', 'Multiplying complex numbers', CX);
  T('cx-mult', 'worked', r`Multiply: $ ({{a}}{{b:sgncoef}}i)({{c}}{{d:sgncoef}}i) $`, r`{{a*c-b*d}}{{a*d+b*c:sgncoef}}i`, { params: { a: '-5..5 !0', b: '-5..5 !0', c: '-5..5 !0', d: '-5..5 !0' }, constraints: ['a*c-b*d != 0', 'a*d+b*c != 0', 'abs(b) > 1 || abs(d) > 1'],
    steps: [r`Use FOIL: $ {{a*c}} + ({{a*d}})i + ({{b*c}})i + ({{b*d}})i^2$`, r`Replace $i^2$ with $-1$: $ {{a*c}} + {{-b*d:paren}} + ({{a*d+b*c}})i$`, r`Combine like terms: $ {{a*c-b*d}}{{a*d+b*c:sgncoef}}i$`] });
  T('cx-mult', 'easier', r`Multiply: $ {{a}}i\cdot {{b}}i $`, r`{{-a*b}}`, { params: { a: '2..7', b: '2..7' } });
  T('cx-mult', 'easier', r`Multiply: $ {{a}}({{b}}{{c:sgncoef}}i) $`, r`{{a*b}}{{a*c:sgncoef}}i`, { params: { a: '2..6', b: '1..6', c: '1..6' } });
  T('cx-mult', 'parallel', r`Multiply: $ ({{a}}{{b:sgncoef}}i)({{c}}{{d:sgncoef}}i) $`, r`{{a*c-b*d}}{{a*d+b*c:sgncoef}}i`, { params: { a: '-6..6 !0', b: '-6..6 !0', c: '-6..6 !0', d: '-6..6 !0' }, constraints: ['a*c-b*d != 0', 'a*d+b*c != 0'] });
  T('cx-mult', 'parallel', r`Multiply: $ {{a:coef}}i({{b}}{{c:sgncoef}}i) $`, r`{{-a*c}}{{a*b:sgncoef}}i`, { params: { a: '-6..6 !0', b: '-8..8 !0', c: '-8..8 !0' }, constraints: ['abs(a) > 1 || abs(b) > 1'] });
  T('cx-mult', 'parallel', r`Multiply: $ ({{a}}{{b:sgncoef}}i)({{a}}{{-b:sgncoef}}i) $`, r`{{a^2+b^2}}`, { params: { a: '1..9', b: '1..9' } });
  T('cx-mult', 'challenge', r`Simplify: $ ({{a}}{{b:sgncoef}}i)^2 $`, r`{{a^2-b^2}}{{2*a*b:sgncoef}}i`, { params: { a: '-7..7 !0', b: '-7..7 !0' }, constraints: ['a^2-b^2 != 0'] });

  /* ---------- divide complex ---------- */
  skill('cx-div', 'Dividing complex numbers', CX);
  const dv = (tier, ps, extra) => T('cx-div', tier, r`Divide: $ \frac{ {{n1}}{{n2:sgncoef}}i }{ {{c}}{{d:sgncoef}}i } $`, r`{{p}}{{q:sgncoef}}i`, Object.assign({ params: ps, derived: { n1: 'p*c-q*d', n2: 'p*d+q*c' }, constraints: ['n1 != 0', 'n2 != 0'] }, extra || {}));
  dv('worked', { p: '-4..5 !0', q: '-4..5 !0', c: '1..3', d: '1..3' }, { steps: [r`Multiply the top and bottom by the conjugate of the bottom, $ {{c}}{{-d:sgncoef}}i$.`, r`The bottom becomes $ {{c}}^2 + {{d}}^2 = {{c^2+d^2}}$ (the $i$ terms cancel).`, r`Multiply the top out and replace $i^2$ with $-1$, then divide each part by $ {{c^2+d^2}}$: $ {{p}}{{q:sgncoef}}i$`] });
  dv('easier', { p: '-3..4 !0', q: '-3..4 !0', c: '1..2', d: '1..2' });
  dv('parallel', { p: '-6..6 !0', q: '-6..6 !0', c: '1..4', d: '1..4' });
  dv('parallel', { p: '-6..6 !0', q: '-6..6 !0', c: '1..5', d: '-5..-1' });
  dv('challenge', { p: '-9..9 !0', q: '-9..9 !0', c: '2..6', d: '-6..6 !0' });

  /* ---------- square roots of negatives ---------- */
  skill('cx-sqrt', 'Square roots of negative numbers', CX);
  T('cx-sqrt', 'worked', r`Simplify: $ \sqrt{ -{{n}} } $`, r`{{o:coef}}i\sqrt{ {{rr}} }`, { params: { o: '2..6', rr: '2,3,5,6,7' }, derived: { n: 'o^2*rr' },
    steps: [r`Write $\sqrt{-1}$ as $i$: $ \sqrt{ -{{n}} } = i\sqrt{ {{n}} } $`, r`Simplify $\sqrt{ {{n}} } = {{o}}\sqrt{ {{rr}} }$ since $ {{n}} = {{o^2}}\cdot {{rr}}$.`, r`Result: $ {{o}}i\sqrt{ {{rr}} }$`] });
  T('cx-sqrt', 'easier', r`Simplify: $ \sqrt{ -{{n}} } $`, r`{{o}}i`, { params: { o: '2..12' }, derived: { n: 'o^2' } });
  T('cx-sqrt', 'easier', r`Simplify: $ \sqrt{ -{{n}} } $`, r`i\sqrt{ {{n}} }`, { params: { n: '2,3,5,6,7,10,11,13' } });
  T('cx-sqrt', 'parallel', r`Simplify: $ \sqrt{ -{{n}} } $`, r`{{o:coef}}i\sqrt{ {{rr}} }`, { params: { o: '2..9', rr: '2,3,5,6,7,10' }, derived: { n: 'o^2*rr' } });
  T('cx-sqrt', 'parallel', r`Solve: $ x^2 = -{{n}} $`, r`x = \pm {{o}}i`, { params: { o: '2..12' }, derived: { n: 'o^2' } });
  T('cx-sqrt', 'parallel', r`Solve: $ x^2 + {{n}} = 0 $`, r`x = \pm {{o:coef}}i\sqrt{ {{rr}} }`, { params: { o: '1..5', rr: '2,3,5,6,7' }, derived: { n: 'o^2*rr' } });
  T('cx-sqrt', 'challenge', r`Solve: $ {{a}}x^2 + {{b}} = 0 $`, r`x = \pm {{o}}i`, { params: { a: '2..5', o: '2..7' }, derived: { b: 'a*o^2' } });
  T('cx-sqrt', 'challenge', r`Simplify: $ \sqrt{ -{{m}} }\cdot\sqrt{ -{{n}} } $`, r`-{{m*n}}`, { params: { m: '2..9', n: '2..9' }, constraints: ['issq(m*n)'] });

  /* ---------- evaluating logs ---------- */
  skill('log-eval', 'Evaluating logarithms', LG);
  T('log-eval', 'worked', r`Evaluate: $ \log_{ {{b}} }( {{n}} ) $`, r`{{k}}`, { params: { b: '2,3,4,5,10', k: '2..5' }, derived: { n: 'b^k' }, constraints: ['n <= 1000'],
    steps: [r`$\log_{ {{b}} }( {{n}} )$ asks: $ {{b}}$ to what power equals $ {{n}}$?`, r`$ {{b}}^{ {{k}} } = {{n}}$, so the answer is $ {{k}}$.`] });
  T('log-eval', 'easier', r`Evaluate: $ \log_{ {{b}} }( {{n}} ) $`, r`{{k}}`, { params: { b: '2,3,5,10', k: '1..3' }, derived: { n: 'b^k' } });
  T('log-eval', 'easier', r`Evaluate: $ \log_{ {{b}} }( {{b}} ) $`, r`1`, { params: { b: '2..25' } });
  T('log-eval', 'parallel', r`Evaluate: $ \log_{ {{b}} }( {{n}} ) $`, r`{{k}}`, { params: { b: '2,3,4,5,6,7,8,9', k: '2..6' }, derived: { n: 'b^k' }, constraints: ['n <= 2000'] });
  T('log-eval', 'parallel', r`Evaluate: $ \log_{ {{b}} }\left(\frac{1}{ {{n}} }\right) $`, r`{{-k}}`, { params: { b: '2,3,4,5,10', k: '1..4' }, derived: { n: 'b^k' }, constraints: ['n <= 1000'] });
  T('log-eval', 'parallel', r`Evaluate: $ \log_{ {{b^2}} }( {{b}} ) $`, r`\frac{1}{2}`, { params: { b: '2..15' } });
  T('log-eval', 'parallel', r`Evaluate: $ \log( {{n}} ) $ (base 10)`, r`{{k}}`, { params: { k: '1..6' }, derived: { n: '10^k' } });
  T('log-eval', 'challenge', r`Evaluate: $ \log_{ {{b}} }( {{n1}} ) - \log_{ {{b}} }( {{n2}} ) $`, r`{{k1-k2}}`, { params: { b: '2,3,5', k1: '1..5', k2: '1..4' }, derived: { n1: 'b^k1', n2: 'b^k2' }, constraints: ['k1 != k2', 'n1 <= 700'] });
  T('log-eval', 'challenge', r`Evaluate: $ {{a}}\log_{ {{b}} }( {{n}} ) $`, r`{{a*k}}`, { params: { a: '2..5', b: '2,3,5', k: '2..4' }, derived: { n: 'b^k' } });

  /* ---------- convert log <-> exponential ---------- */
  skill('log-convert', 'Logarithmic and exponential form', LG);
  T('log-convert', 'worked', r`Write $ \log_{ {{b}} }( {{n}} ) = {{k}} $ in exponential form.`, r`{{b}}^{ {{k}} } = {{n}}`, { params: { b: '2..9', k: '2..4' }, derived: { n: 'b^k' }, constraints: ['n <= 1000'],
    steps: [r`In $\log_b(y) = x$, the base is $b$ and the log is the exponent: $b^x = y$.`, r`Here $b = {{b}}$, $x = {{k}}$, $y = {{n}}$: $ {{b}}^{ {{k}} } = {{n}}$`] });
  T('log-convert', 'easier', r`Write $ \log_{ {{b}} }( {{n}} ) = {{k}} $ in exponential form.`, r`{{b}}^{ {{k}} } = {{n}}`, { params: { b: '2..5', k: '2..3' }, derived: { n: 'b^k' } });
  T('log-convert', 'easier', r`Write $ {{b}}^{ {{k}} } = {{n}} $ in logarithmic form.`, r`\log_{ {{b}} }( {{n}} ) = {{k}}`, { params: { b: '2..5', k: '2..3' }, derived: { n: 'b^k' } });
  T('log-convert', 'parallel', r`Write $ \log_{ {{b}} }(x) = {{k}} $ in exponential form.`, r`{{b}}^{ {{k}} } = x`, { params: { b: '2..9', k: '-3,-2,-1,2,3,4,5' } });
  T('log-convert', 'parallel', r`Write $ {{b}}^{ {{k}} } = {{n}} $ in logarithmic form.`, r`\log_{ {{b}} }( {{n}} ) = {{k}}`, { params: { b: '2..9', k: '2..5' }, derived: { n: 'b^k' }, constraints: ['n <= 3000'] });
  T('log-convert', 'parallel', r`Write $ {{b}}^{x} = {{n}} $ in logarithmic form.`, r`x = \log_{ {{b}} }( {{n}} )`, { params: { b: '2..9', n: '3..60' }, constraints: ['b != n'] });
  T('log-convert', 'parallel', r`Write $ \log_{ {{b}} }( {{n}} ) = x $ in exponential form.`, r`{{b}}^{x} = {{n}}`, { params: { b: '2..9', n: '3..60' }, constraints: ['b != n'] });
  T('log-convert', 'challenge', r`Write $ \ln(x) = {{k}} $ in exponential form.`, r`e^{ {{k}} } = x`, { params: { k: '-3,-2,-1,2,3,4,5,6' } });
  T('log-convert', 'challenge', r`Write $ e^{ {{k}} } = x $ in logarithmic form.`, r`\ln(x) = {{k}}`, { params: { k: '-3,-2,-1,2,3,4,5,6' } });

  /* ---------- solving log equations ---------- */
  skill('log-solve', 'Solving logarithmic equations', LG);
  T('log-solve', 'worked', r`Solve: $ \log_{ {{b}} }(x) = {{k}} $`, r`x = {{b^k}}`, { params: { b: '2..6', k: '2..4' }, constraints: ['b^k <= 1000'],
    steps: [r`Rewrite in exponential form: $ x = {{b}}^{ {{k}} } $`, r`$ x = {{b^k}} $`] });
  T('log-solve', 'easier', r`Solve: $ \log_{ {{b}} }(x) = {{k}} $`, r`x = {{b^k}}`, { params: { b: '2..5', k: '2..3' } });
  T('log-solve', 'parallel', r`Solve: $ \log_{ {{b}} }(x{{c:sign}}) = {{k}} $`, r`x = {{b^k-c}}`, { params: { b: '2..6', k: '2..3', c: '-9..9 !0' } });
  T('log-solve', 'parallel', r`Solve: $ \log_{ {{b}} }({{a}}x) = {{k}} $`, r`x = {{b^k/a}}`, { params: { b: '2..6', k: '2..3', a: '2..5' }, constraints: ['mod(b^k,a) == 0'] });
  T('log-solve', 'parallel', r`Solve: $ {{a}}\log_{ {{b}} }(x) = {{a*k}} $`, r`x = {{b^k}}`, { params: { a: '2..4', b: '2..6', k: '1..3' } });
  T('log-solve', 'parallel', r`Solve: $ \log_{ {{b}} }(x) + {{c}} = {{c+k}} $`, r`x = {{b^k}}`, { params: { b: '2..6', k: '2..3', c: '1..6' } });
  T('log-solve', 'challenge', r`Solve: $ \log_{ {{b}} }(x) + \log_{ {{b}} }(x{{-c:sign}}) = \log_{ {{b}} }( {{n}} ) $`, r`x = {{x0}}`, { params: { b: '2,3,5', x0: '4..12', c: '1..9' }, derived: { n: 'x0*(x0-c)' }, constraints: ['c < x0'] });

  /* ---------- exponential equations, common base ---------- */
  skill('exp-eq', 'Exponential equations (common base)', LG);
  T('exp-eq', 'worked', r`Solve: $ {{b}}^{x} = {{n}} $`, r`x = {{k}}`, { params: { b: '2..6', k: '2..4' }, derived: { n: 'b^k' }, constraints: ['n <= 1000'],
    steps: [r`Write $ {{n}}$ as a power of $ {{b}}$: $ {{n}} = {{b}}^{ {{k}} }$`, r`Same base, so the exponents are equal: $x = {{k}}$`] });
  T('exp-eq', 'easier', r`Solve: $ {{b}}^{x} = {{n}} $`, r`x = {{k}}`, { params: { b: '2..5', k: '2..3' }, derived: { n: 'b^k' } });
  T('exp-eq', 'parallel', r`Solve: $ {{b}}^{x{{c:sign}}} = {{n}} $`, r`x = {{k-c}}`, { params: { b: '2..5', k: '3..5', c: '-3..3 !0' }, derived: { n: 'b^k' }, constraints: ['n <= 1000'] });
  T('exp-eq', 'parallel', r`Solve: $ {{b}}^{ {{m}}x } = {{n}} $`, r`x = {{k/m}}`, { params: { b: '2..5', m: '2..4', j: '1..3' }, derived: { k: 'm*j', n: 'b^(m*j)' }, constraints: ['n <= 3000'] });
  T('exp-eq', 'parallel', r`Solve: $ {{b^2}}^{x} = {{n}} $`, r`x = {{k/2}}`, { params: { b: '2..5', k: '2..5' }, derived: { n: 'b^k' } });
  T('exp-eq', 'parallel', r`Solve: $ {{b}}^{x} = \frac{1}{ {{n}} } $`, r`x = {{-k}}`, { params: { b: '2..5', k: '1..4' }, derived: { n: 'b^k' } });
  T('exp-eq', 'challenge', r`Solve: $ {{b^p}}^{x{{c:sign}}} = {{b^q}}^{ {{e}} } $`, r`x = {{q*e/p-c}}`, { params: { b: '2..3', p: '2..3', q: '1..3', e: '2..4', c: '-4..4 !0' }, constraints: ['b^p <= 30', 'b^q <= 30', 'p != q'] });

  /* ---------- exponential models ---------- */
  skill('exp-model', 'Exponential growth and decay models', LG);
  T('exp-model', 'worked', r`A colony starts with $ {{P}}$ bacteria and doubles every hour. How many bacteria are there after $ {{t}}$ hours?`, r`{{P*2^t}}\text{ bacteria}`, { params: { P: '2..9', t: '3..6' },
    steps: [r`Doubling means multiplying by 2 each hour: $N = {{P}}\cdot 2^{t}$`, r`$N = {{P}}\cdot 2^{ {{t}} } = {{P}}\cdot {{2^t}} = {{P*2^t}}$`] });
  T('exp-model', 'easier', r`A population of $ {{P}}$ doubles every year. How many after $ {{t}}$ years?`, r`{{P*2^t}}`, { params: { P: '2..9', t: '2..4' } });
  T('exp-model', 'easier', r`Evaluate $ f(x) = {{a}}\cdot {{b}}^{x} $ at $x = {{n}}$.`, r`{{a*b^n}}`, { params: { a: '1..6', b: '2..4', n: '2..3' } });
  T('exp-model', 'parallel', r`A sample has $ {{P}}$ grams of a substance with a half-life of 1 day. How many grams remain after $ {{t}}$ days?`, r`{{P/2^t}}\text{ grams}`, { params: { t: '2..5', j: '1..9' }, derived: { P: 'j*2^t' }, constraints: ['P <= 600'] });
  T('exp-model', 'parallel', r`A population of $ {{P}}$ triples every year. How many are there after $ {{t}}$ years?`, r`{{P*3^t}}`, { params: { P: '1..9', t: '2..4' } });
  T('exp-model', 'parallel', r`Evaluate $ f(x) = {{a}}\cdot {{b}}^{x} $ at $x = {{n}}$.`, r`{{a*b^n}}`, { params: { a: '1..7', b: '2..5', n: '2..4' }, constraints: ['a*b^n <= 3000'] });
  T('exp-model', 'parallel', r`A population of $ {{P}}$ doubles every year. Write an exponential function $f(t)$ for the population after $t$ years.`, r`f(t) = {{P}}\cdot 2^{t}`, { params: { P: '2..9' } });
  T('exp-model', 'challenge', r`A culture of $ {{P}}$ cells doubles every $ {{d}}$ hours. How many cells are there after $ {{h}}$ hours?`, r`{{P*2^m}}`, { params: { P: '2..9', d: '2,3,4', m: '2..4' }, derived: { h: 'd*m' } });
  T('exp-model', 'challenge', r`A radioactive sample of $ {{P}}$ mg has a half-life of $ {{d}}$ years. How many mg remain after $ {{h}}$ years?`, r`{{P/2^m}}\text{ mg}`, { params: { d: '2,5,10', m: '2..4', j: '1..6' }, derived: { P: 'j*2^m', h: 'd*m' }, constraints: ['P <= 600'] });

  /* ---------- fractional exponents ---------- */
  skill('frac-exp', 'Rational (fractional) exponents', RD);
  T('frac-exp', 'worked', r`Evaluate: $ {{n}}^{ \frac{ {{p}} }{ {{q}} } } $`, r`{{rt^p}}`, { params: { rt: '2..4', q: '3..4', p: '2..3' }, derived: { n: 'rt^q' }, constraints: ['n <= 300', 'p < q', 'gcd(p,q) == 1'],
    steps: [r`The denominator $ {{q}}$ is the root and the numerator $ {{p}}$ is the power: $ {{n}}^{ \frac{ {{p}} }{ {{q}} } } = \left(\sqrt[ {{q}} ]{ {{n}} }\right)^{ {{p}} } $`, r`$ \sqrt[ {{q}} ]{ {{n}} } = {{rt}} $, so $ {{rt}}^{ {{p}} } = {{rt^p}} $`] });
  T('frac-exp', 'easier', r`Evaluate: $ {{n}}^{ \frac{1}{2} } $`, r`{{rt}}`, { params: { rt: '2..12' }, derived: { n: 'rt^2' } });
  T('frac-exp', 'easier', r`Evaluate: $ {{n}}^{ \frac{1}{3} } $`, r`{{rt}}`, { params: { rt: '2..9' }, derived: { n: 'rt^3' } });
  T('frac-exp', 'parallel', r`Evaluate: $ {{n}}^{ \frac{ {{p}} }{ {{q}} } } $`, r`{{rt^p}}`, { params: { rt: '2..5', q: '2..4', p: '1..3' }, derived: { n: 'rt^q' }, constraints: ['n <= 300', 'p != q', 'rt^p <= 130'] });
  T('frac-exp', 'parallel', r`Evaluate: $ {{n}}^{ -\frac{ {{p}} }{ {{q}} } } $`, r`\frac{1}{ {{rt^p}} }`, { params: { rt: '2..5', q: '2..3', p: '1..2' }, derived: { n: 'rt^q' }, constraints: ['n <= 130'] });
  T('frac-exp', 'parallel', r`Write $ \sqrt[ {{q}} ]{ x^{ {{p}} } } $ with a rational exponent.`, r`x^{ \frac{ {{p}} }{ {{q}} } }`, { params: { q: '2..5', p: '2..4' }, constraints: ['gcd(p,q) == 1', 'p != q'] });
  T('frac-exp', 'parallel', r`Write $ x^{ \frac{ {{p}} }{ {{q}} } } $ in radical form.`, r`\sqrt[ {{q}} ]{ x^{ {{p}} } }`, { params: { q: '2..5', p: '2..4' }, constraints: ['gcd(p,q) == 1', 'p != q'] });
  T('frac-exp', 'challenge', r`Evaluate: $ \left(\frac{ {{a^q}} }{ {{b^q}} }\right)^{ -\frac{ {{p}} }{ {{q}} } } $`, r`\frac{ {{b^p}} }{ {{a^p}} }`, { params: { a: '1..4', b: '2..5', q: '2..3', p: '1..2' }, constraints: ['gcd(a,b) == 1', 'a != b', 'b^q <= 130'] });

  /* ---------- radical equations ---------- */
  skill('rad-eq', 'Solving radical equations', RD);
  T('rad-eq', 'worked', r`Solve: $ \sqrt{x{{a:sign}}} = {{b}} $`, r`x = {{b^2-a}}`, { params: { a: '-9..9 !0', b: '2..7' },
    steps: [r`Square both sides: $ x{{a:sign}} = {{b}}^2 = {{b^2}} $`, r`Solve for $x$: $ x = {{b^2-a}} $`, r`Check: $\sqrt{ {{b^2}} } = {{b}}$ ✓`] });
  T('rad-eq', 'easier', r`Solve: $ \sqrt{x} = {{b}} $`, r`x = {{b^2}}`, { params: { b: '2..12' } });
  T('rad-eq', 'easier', r`Solve: $ \sqrt{x{{a:sign}}} = {{b}} $`, r`x = {{b^2-a}}`, { params: { a: '-6..6 !0', b: '2..5' } });
  T('rad-eq', 'parallel', r`Solve: $ \sqrt{x{{a:sign}}} = {{b}} $`, r`x = {{b^2-a}}`, { params: { a: '-12..12 !0', b: '2..9' } });
  T('rad-eq', 'parallel', r`Solve: $ \sqrt{ {{m}}x{{a:sign}} } = {{b}} $`, r`x = {{(b^2-a)/m}}`, { params: { m: '2..5', a: '-9..9 !0', b: '2..8' }, constraints: ['mod(b^2-a,m) == 0'] });
  T('rad-eq', 'parallel', r`Solve: $ \sqrt{x}{{c:sign}} = {{d}} $`, r`x = {{(d-c)^2}}`, { params: { c: '-6..6 !0', d: '3..9' }, constraints: ['d > c'] });
  T('rad-eq', 'parallel', r`Solve: $ {{m}}\sqrt{x{{a:sign}}} = {{m*b}} $`, r`x = {{b^2-a}}`, { params: { m: '2..4', a: '-9..9 !0', b: '2..6' } });
  T('rad-eq', 'challenge', r`Solve and check for extraneous solutions: $ \sqrt{x{{a:sign}}} = x{{-c:sign}} $`, r`x = {{c+s}}`, { params: { c: '-3..5 !0', s: '2..4' }, derived: { a: 's^2-s-c' }, constraints: ['a != 0'] });

  /* ---------- sum / difference of cubes ---------- */
  skill('cubes', 'Sum and difference of cubes', PL);
  T('cubes', 'worked', r`Factor: $ x^3 + {{b^3}} $`, r`(x+{{b}})(x^2-{{b}}x+{{b^2}})`, { params: { b: '2..9' },
    steps: [r`Recognize a sum of cubes: $x^3 + {{b^3}} = x^3 + {{b}}^3$`, r`Use $a^3 + b^3 = (a+b)(a^2 - ab + b^2)$ with $a = x$, $b = {{b}}$`, r`$ (x+{{b}})(x^2-{{b}}x+{{b^2}}) $`] });
  T('cubes', 'easier', r`Factor: $ x^3 + {{b^3}} $`, r`(x+{{b}})(x^2-{{b}}x+{{b^2}})`, { params: { b: '2..7' } });
  T('cubes', 'easier', r`Factor: $ x^3 - {{b^3}} $`, r`(x-{{b}})(x^2+{{b}}x+{{b^2}})`, { params: { b: '2..7' } });
  T('cubes', 'parallel', r`Factor: $ x^3 + {{b^3}} $`, r`(x+{{b}})(x^2-{{b}}x+{{b^2}})`, { params: { b: '2..9' } });
  T('cubes', 'parallel', r`Factor: $ x^3 - {{b^3}} $`, r`(x-{{b}})(x^2+{{b}}x+{{b^2}})`, { params: { b: '2..9' } });
  T('cubes', 'parallel', r`Factor: $ {{a^3}}x^3 + {{b^3}} $`, r`({{a}}x+{{b}})({{a^2}}x^2-{{a*b}}x+{{b^2}})`, { params: { a: '2..4', b: '1..5' } });
  T('cubes', 'parallel', r`Factor: $ {{a^3}}x^3 - {{b^3}} $`, r`({{a}}x-{{b}})({{a^2}}x^2+{{a*b}}x+{{b^2}})`, { params: { a: '2..4', b: '1..5' } });
  T('cubes', 'challenge', r`Factor completely: $ {{k}}x^3 + {{k*b^3}} $`, r`{{k}}(x+{{b}})(x^2-{{b}}x+{{b^2}})`, { params: { k: '2..5', b: '2..4' } });
  T('cubes', 'challenge', r`Factor completely: $ {{k}}x^3 - {{k*b^3}} $`, r`{{k}}(x-{{b}})(x^2+{{b}}x+{{b^2}})`, { params: { k: '2..5', b: '2..4' } });

  /* ---------- quartic trinomials ---------- */
  skill('quartic', 'Factoring quartic trinomials', PL);
  const qt = (tier, ps, extra) => T('quartic', tier, r`Factor completely: $ x^4{{b:sgncoef}}x^2{{c:sign}} $`, r`(x^2{{p:sign}})(x^2{{q:sign}})`, Object.assign({ params: ps, derived: { b: 'p+q', c: 'p*q' }, constraints: ['p < q', 'b != 0'] }, extra || {}));
  qt('worked', { p: '-9..9 !0', q: '-9..9 !0' }, { constraints: ['p < q', 'b != 0', 'issq(abs(p)) == 0', 'issq(abs(q)) == 0'], steps: [r`Treat $x^2$ as a single variable: let $u = x^2$, so the expression is $u^2{{b:sgncoef}}u{{c:sign}}$.`, r`Find two numbers with product $ {{c}}$ and sum $ {{b}}$: $ {{p}}$ and $ {{q}}$.`, r`Factor in $u$: $(u{{p:sign}})(u{{q:sign}})$, then put $x^2$ back: $(x^2{{p:sign}})(x^2{{q:sign}})$`] });
  qt('easier', { p: '1..5', q: '2..6' });
  qt('parallel', { p: '-9..9 !0', q: '-9..9 !0' }, { constraints: ['p < q', 'b != 0', 'issq(abs(p)) == 0', 'issq(abs(q)) == 0'] });
  qt('parallel', { p: '-9..-1', q: '1..9' }, { constraints: ['p < q', 'b != 0', 'issq(abs(p)) == 0', 'issq(abs(q)) == 0'] });
  T('quartic', 'challenge', r`Factor completely: $ x^4 - {{m^4}} $`, r`(x^2+{{m^2}})(x+{{m}})(x-{{m}})`, { params: { m: '2..7' } });
  qt('challenge', { p: '-12..12 !0', q: '-12..12 !0' }, { constraints: ['p < q', 'b != 0', 'issq(abs(p)) == 0', 'issq(abs(q)) == 0', 'abs(p) > 3 || abs(q) > 3'] });

  /* ---------- polynomials from zeros ---------- */
  skill('poly-zeros', 'Writing a polynomial from its zeros', PL);
  T('poly-zeros', 'worked', r`Write a polynomial in standard form with zeros $ x = {{r}} $ and $ x = {{s}} $.`, r`x^2{{-(r+s):sgncoef}}x{{r*s:sign}}`, { params: { r: '-6..6 !0', s: '-6..6 !0' }, constraints: ['r < s', 'r+s != 0'],
    steps: [r`Each zero gives a factor: $(x{{-r:sign}})(x{{-s:sign}})$`, r`Multiply: $x^2{{-(r+s):sgncoef}}x{{r*s:sign}}$`] });
  T('poly-zeros', 'easier', r`Write a polynomial in factored form with zeros $ x = {{r}} $ and $ x = {{s}} $.`, r`(x{{-r:sign}})(x{{-s:sign}})`, { params: { r: '-6..6 !0', s: '-6..6 !0' }, constraints: ['r < s'] });
  T('poly-zeros', 'parallel', r`Write a polynomial in standard form with zeros $ x = {{r}} $ and $ x = {{s}} $.`, r`x^2{{-(r+s):sgncoef}}x{{r*s:sign}}`, { params: { r: '-8..8 !0', s: '-8..8 !0' }, constraints: ['r < s', 'r+s != 0'] });
  T('poly-zeros', 'parallel', r`Find the zeros of $ f(x) = (x{{-r:sign}})(x{{-s:sign}})(x{{-t:sign}}) $.`, r`x = {{r}},\ {{s}},\ {{t}}`, { params: { r: '-6..2 !0', s: '-3..4 !0', t: '1..7 !0' }, constraints: ['r < s', 's < t'] });
  T('poly-zeros', 'parallel', r`Write a polynomial of least degree in factored form with zeros $ {{r}} $, $ {{s}} $ and $ {{t}} $.`, r`(x{{-r:sign}})(x{{-s:sign}})(x{{-t:sign}})`, { params: { r: '-6..2 !0', s: '-3..4 !0', t: '1..7 !0' }, constraints: ['r < s', 's < t'] });
  T('poly-zeros', 'challenge', r`Write a polynomial in standard form with zeros $ {{r}} $, $ {{s}} $ and $ {{t}} $.`, r`x^3{{-(r+s+t):sgncoef}}x^2{{r*s+r*t+s*t:sgncoef}}x{{-r*s*t:sign}}`, { params: { r: '-4..2 !0', s: '-2..3 !0', t: '1..5 !0' }, constraints: ['r < s', 's < t', 'r+s+t != 0', 'r*s+r*t+s*t != 0'] });
  T('poly-zeros', 'challenge', r`Write a polynomial in standard form with zeros $ x = {{r}} $ (double zero) and $ x = {{s}} $.`, r`x^3{{-(2*r+s):sgncoef}}x^2{{r^2+2*r*s:sgncoef}}x{{-r^2*s:sign}}`, { params: { r: '-4..4 !0', s: '-5..5 !0' }, constraints: ['r != s', '2*r+s != 0', 'r^2+2*r*s != 0'] });
})();
