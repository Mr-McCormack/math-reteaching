/* Advanced Algebra — questions where the student reads a graph: exponential, logarithmic, polynomial and rational functions. */
(function () {
  const { skill, T } = RB;
  const r = String.raw;
  const LG = 'Adv. Algebra: logs & exponentials', PL = 'Adv. Algebra: polynomials', RF = 'Adv. Algebra: rational functions';
  const g = (curve, extra) => Object.assign({ curves: [curve] }, extra || {});

  /* ================= exponential graphs ================= */
  skill('exp-graph', 'Reading graphs of exponential functions', LG);
  const EV = [-5, 5, -6, 10];
  const ex = (a, b, k) => ({ type: 'exp', a, b, h: 0, k });
  const exv = (a, b, k, extra) => g(ex(a, b, k), Object.assign({ view: EV }, extra || {}));
  const GR = { a: '1..2', b: '2,3', k: '-3..3' }, DC = { a: '1..2', q: '2,3', k: '-3..3' }, dcd = { b: '1/q' };
  T('exp-graph', 'worked', 'Does the exponential function graphed below show growth or decay?', r`\text{growth}`, { params: GR, graphs: [exv('a', 'b', 'k')],
    steps: ['Read the graph from left to right.', 'The $ y $-values keep getting larger as $ x $ increases, so the function is increasing.', 'An exponential function that increases is **growth** (its base is greater than 1).'] });
  T('exp-graph', 'easier', 'Does the exponential function graphed below show growth or decay?', r`\text{growth}`, { params: GR, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'easier', 'Does the exponential function graphed below show growth or decay?', r`\text{decay}`, { params: DC, derived: dcd, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'easier', r`What is the $ y $-intercept of the function graphed below?`, r`(0, {{yi}})`, { params: { a: '1..2', b: '2,3', k: '-2..2' }, derived: { yi: 'a+k' }, graphs: [exv('a', 'b', 'k', { points: [] })] });
  const asyQ = r`What is the equation of the horizontal asymptote of the function graphed below?`;
  T('exp-graph', 'parallel', asyQ, r`y = {{k}}`, { params: GR, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', asyQ, r`y = {{k}}`, { params: DC, derived: dcd, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', r`What is the $ y $-intercept of the function graphed below?`, r`(0, {{yi}})`, { params: { a: '1..3', b: '2,3', k: '-3..3' }, derived: { yi: 'a+k' }, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', 'What is the range of the function graphed below?', r`({{k}}, \infty)`, { params: GR, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', 'What is the range of the function graphed below?', r`(-\infty, {{k}})`, { params: { a: '-2..-1', b: '2,3', k: '-3..3' }, graphs: [g(ex('a', 'b', 'k'), { view: [-5, 5, -10, 6] })] });
  T('exp-graph', 'parallel', 'What is the domain of the function graphed below?', r`(-\infty, \infty)`, { params: GR, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', r`Write an exponential function $ f(x) = b^x $ whose graph is shown below.`, r`f(x) = {{b}}^{x}`, { params: { b: '2..7' }, graphs: [g(ex(1, 'b', 0), { view: [-3, 3, -2, 9], points: [{ x: 0, y: 1, label: 'coords' }, { x: 1, y: 'b', label: 'coords' }] })] });
  T('exp-graph', 'parallel', r`Write an exponential function $ f(x) = a\cdot b^x $ whose graph is shown below.`, r`f(x) = {{a}}\cdot {{b}}^{x}`, { params: { a: '2..4', b: '2,3' }, constraints: ['a*b <= 12'], graphs: [g(ex('a', 'b', 0), { view: [-4, 4, -2, 14], points: [{ x: 0, y: 'a', label: 'coords' }, { x: 1, y: 'a*b', label: 'coords' }] })] });
  T('exp-graph', 'challenge', r`Write an exponential function $ f(x) = a\cdot b^x $ whose graph is shown below.`, r`f(x) = {{a}}\left(\frac{1}{2}\right)^{x}`, { params: { a: '2,4,6,8,10,12' }, graphs: [g(ex('a', 0.5, 0), { view: [-4, 4, -2, 14], points: [{ x: 0, y: 'a', label: 'coords' }, { x: 1, y: 'a/2', label: 'coords' }] })] });
  T('exp-graph', 'challenge', r`The graph of $ f(x) = a\cdot b^x {{k:sign}} $ is shown with its asymptote. Find $ a $ and $ b $... write the function.`.replace(r` Find $ a $ and $ b $... write the function.`, ' Write the function.').replace(r`$ f(x) = a\cdot b^x {{k:sign}} $`, 'the function'), r`f(x) = {{a}}\cdot {{b}}^{x}{{k:sign}}`, { params: { a: '2..3', b: '2,3', k: '-3..3 !0' }, constraints: ['a*b+k <= 9'], graphs: [g(ex('a', 'b', 'k'), { view: [-4, 4, -6, 10], asym: [{ y: 'k' }], points: [{ x: 0, y: 'a+k', label: 'coords' }, { x: 1, y: 'a*b+k', label: 'coords' }] })] });

  const endG = r`\text{As } x\to-\infty,\ f(x)\to {{k}};\ \text{as } x\to\infty,\ f(x)\to\infty`;
  const endD = r`\text{As } x\to-\infty,\ f(x)\to\infty;\ \text{as } x\to\infty,\ f(x)\to {{k}}`;
  T('exp-graph', 'parallel', 'Describe the end behavior of the function graphed below.', endG, { params: GR, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', 'Describe the end behavior of the function graphed below.', endD, { params: DC, derived: dcd, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', 'On what interval is the function graphed below increasing?', r`(-\infty, \infty)`, { params: GR, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', 'On what interval is the function graphed below decreasing?', r`(-\infty, \infty)`, { params: DC, derived: dcd, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', 'True or false: the graph below shows exponential growth.', r`\text{False}`, { params: DC, derived: dcd, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', 'True or false: the graph below shows exponential growth.', r`\text{True}`, { params: GR, graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', r`The graph below is $ f(x) = a\cdot b^x {{k:sign}} $. Which could be the value of the base $ b $?`, r`b = {{b}}`, { params: Object.assign({}, GR, { k: '-3..3 !0' }), distractors: [r`b = \frac{1}{ {{b}} }`, r`b = -{{b}}`, r`b = {{b+2}}`], graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'parallel', r`The graph below is $ f(x) = a\cdot b^x {{k:sign}} $. Which could be the value of the base $ b $?`, r`b = \frac{1}{ {{q}} }`, { params: Object.assign({}, DC, { k: '-3..3 !0' }), derived: dcd, distractors: [r`b = {{q}}`, r`b = -{{q}}`, r`b = \frac{ {{q+1}} }{ {{q}} }`], graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'challenge', r`The graph below is $ f(x) = a\cdot b^x {{k:sign}} $. Which could be the value of the base $ b $?`, r`b = \frac{1}{ {{q}} }`, { params: Object.assign({}, DC, { k: '-3..3 !0' }), derived: dcd, distractors: [r`b = {{q}}`, r`b = -{{q}}`, r`b = \frac{ {{q+1}} }{ {{q}} }`], graphs: [exv('a', 'b', 'k')] });
  T('exp-graph', 'challenge', 'Describe the end behavior of the function graphed below.', endD, { params: DC, derived: dcd, graphs: [exv('a', 'b', 'k')] });

  /* ================= logarithmic graphs ================= */
  skill('log-graph', 'Reading graphs of logarithmic functions', LG);
  const LV = [-6, 10, -6, 6];
  const lg = (b, h, k) => ({ type: 'log', a: 1, b, h, k });
  const lgv = (b, h, k, extra) => g(lg(b, h, k), Object.assign({ view: LV }, extra || {}));
  const LP = { b: '2,3', h: '-3..3', k: '0' };
  T('log-graph', 'worked', 'What is the equation of the vertical asymptote of the function graphed below?', r`x = {{h}}`, { params: { b: '2,3', h: '-3..3 !0', k: '0' }, graphs: [lgv('b', 'h', 'k')],
    steps: ['The graph gets closer and closer to a vertical line but never touches it.', 'Find where that line crosses the $ x $-axis: $ x = {{h}} $.', 'The vertical asymptote is $ x = {{h}} $.'] });
  T('log-graph', 'easier', 'What is the equation of the vertical asymptote of the function graphed below?', r`x = {{h}}`, { params: { b: '2,3', h: '-3..3 !0', k: '0' }, graphs: [lgv('b', 'h', 'k', { asym: [{ x: 'h' }] })] });
  T('log-graph', 'easier', 'What is the equation of the vertical asymptote of the function graphed below?', r`x = {{h}}`, { params: { b: '2,3', h: '-3..3 !0', k: '-2..2 !0' }, graphs: [lgv('b', 'h', 'k', { asym: [{ x: 'h' }] })] });
  T('log-graph', 'parallel', 'What is the equation of the vertical asymptote of the function graphed below?', r`x = {{h}}`, { params: { b: '2,3', h: '-4..4 !0', k: '-2..2' }, graphs: [lgv('b', 'h', 'k')] });
  T('log-graph', 'parallel', 'What is the domain of the function graphed below?', r`({{h}}, \infty)`, { params: { b: '2,3', h: '-4..4', k: '-2..2' }, graphs: [lgv('b', 'h', 'k')] });
  T('log-graph', 'parallel', 'What is the range of the function graphed below?', r`(-\infty, \infty)`, { params: { b: '2,3', h: '-4..4', k: '-2..2' }, graphs: [lgv('b', 'h', 'k')] });
  T('log-graph', 'parallel', r`What is the $ x $-intercept of the function graphed below?`, r`({{h+1}}, 0)`, { params: { b: '2,3', h: '-4..4' }, graphs: [lgv('b', 'h', 0)] });
  T('log-graph', 'parallel', r`The graph of $ f(x) = \log_b(x) $ is shown below. What is $ b $?`, r`b = {{b}}`, { params: { b: '2..7' }, graphs: [g(lg('b', 0, 0), { view: [-2, 10, -4, 4], points: [{ x: 1, y: 0, label: 'coords' }, { x: 'b', y: 1, label: 'coords' }] })] });
  T('log-graph', 'challenge', 'Write the equation of the logarithmic function $ f(x) = \\log_b(x - h) $ graphed below.', r`f(x) = \log_{ {{b}} }(x{{-h:sign}})`, { params: { b: '2,3', h: '-3..3 !0' }, graphs: [g(lg('b', 'h', 0), { view: LV, asym: [{ x: 'h' }], points: [{ x: 'h+1', y: 0, label: 'coords' }, { x: 'h+b', y: 1, label: 'coords' }] })] });
  T('log-graph', 'challenge', r`The graph below is a logarithmic function with a vertical shift. At what $ x $-value does it cross the $ x $-axis?`, r`x = {{h+b^(0-k)}}`, { params: { b: '2,3', h: '-3..3', k: '-2..-1' }, constraints: ['h+b^(0-k) <= 8'], graphs: [g(lg('b', 'h', 'k'), { view: [-6, 10, -5, 5], asym: [{ x: 'h' }] })] });

  /* ================= polynomial graphs ================= */
  skill('poly-graph', 'Reading graphs of polynomial functions', PL);
  const PV = [-5, 5, -20, 20];
  const pl = (a, roots) => ({ type: 'poly', a, roots });
  const plv = (a, roots, extra) => g(pl(a, roots), Object.assign({ view: PV }, extra || {}));
  const R3 = { r: '-3..-1', s: '0..1', t: '2..3' };
  const zq = 'What are the zeros of the polynomial function graphed below?';
  T('poly-graph', 'worked', zq, r`x = {{r}},\ {{s}},\ {{t}}`, { params: R3, graphs: [plv(1, ['r', 's', 't'])],
    steps: ['The zeros are the $ x $-values where the graph crosses or touches the $ x $-axis.', 'Read them from left to right: $ x = {{r}} $, $ x = {{s}} $, $ x = {{t}} $.'] });
  T('poly-graph', 'easier', 'How many times does the graph below cross the $ x $-axis?'.replace('$ x $', 'x'), r`3`, { params: R3, graphs: [plv(1, ['r', 's', 't'])] });
  T('poly-graph', 'easier', zq, r`x = {{r}},\ {{s}},\ {{t}}`, { params: R3, graphs: [plv(1, ['r', 's', 't'])] });
  T('poly-graph', 'parallel', zq, r`x = {{r}},\ {{s}},\ {{t}}`, { params: { r: '-3..-1', s: '-1..1', t: '1..3' }, constraints: ['r < s', 's < t'], graphs: [plv(-1, ['r', 's', 't'])] });
  // end behavior (odd degree: cubic)
  const ebq = 'Describe the end behavior of the polynomial function graphed below.';
  T('poly-graph', 'parallel', ebq, r`\text{as } x\to -\infty,\ f(x)\to -\infty;\ \text{as } x\to \infty,\ f(x)\to \infty`, { params: R3, graphs: [plv(1, ['r', 's', 't'])] });
  T('poly-graph', 'parallel', ebq, r`\text{as } x\to -\infty,\ f(x)\to \infty;\ \text{as } x\to \infty,\ f(x)\to -\infty`, { params: R3, graphs: [plv(-1, ['r', 's', 't'])] });
  const R4 = { r: '-3..-2', s: '-1..0', t: '1..2', u: '3..3' };
  T('poly-graph', 'parallel', ebq, r`\text{as } x\to -\infty,\ f(x)\to \infty;\ \text{as } x\to \infty,\ f(x)\to \infty`, { params: R4, graphs: [plv(1, ['r', 's', 't', 'u'], { view: [-5, 5, -30, 30] })] });
  T('poly-graph', 'parallel', ebq, r`\text{as } x\to -\infty,\ f(x)\to -\infty;\ \text{as } x\to \infty,\ f(x)\to -\infty`, { params: R4, graphs: [plv(-1, ['r', 's', 't', 'u'], { view: [-5, 5, -30, 30] })] });
  const dq = 'Is the degree of the polynomial graphed below odd or even, and is the leading coefficient positive or negative?';
  T('poly-graph', 'parallel', dq, r`\text{odd degree, positive leading coefficient}`, { params: R3, graphs: [plv(1, ['r', 's', 't'])] });
  T('poly-graph', 'parallel', dq, r`\text{odd degree, negative leading coefficient}`, { params: R3, graphs: [plv(-1, ['r', 's', 't'])] });
  T('poly-graph', 'parallel', dq, r`\text{even degree, positive leading coefficient}`, { params: R4, graphs: [plv(1, ['r', 's', 't', 'u'], { view: [-5, 5, -30, 30] })] });
  T('poly-graph', 'parallel', dq, r`\text{even degree, negative leading coefficient}`, { params: R4, graphs: [plv(-1, ['r', 's', 't', 'u'], { view: [-5, 5, -30, 30] })] });
  T('poly-graph', 'challenge', r`The graph below touches the $ x $-axis at one of its zeros without crossing. Which zero is it?`, r`x = {{r}}`, { params: { r: '-3..3 !0', s: '-3..3' }, constraints: ['abs(r-s) >= 2'], graphs: [plv(1, ['r', 'r', 's'], { view: [-5, 5, -15, 15] })] });
  T('poly-graph', 'challenge', 'Write the polynomial in factored form from its graph. The leading coefficient is 1.', r`f(x) = (x{{-r:sign}})(x{{-s:sign}})(x{{-t:sign}})`, { params: { r: '-3..3 !0', s: '-3..3 !0', t: '-3..3 !0' }, constraints: ['r < s', 's < t'], graphs: [plv(1, ['r', 's', 't'])] });
  T('poly-graph', 'challenge', 'Write the polynomial in factored form from its graph. The leading coefficient is $-1$.', r`f(x) = -(x{{-r:sign}})(x{{-s:sign}})(x{{-t:sign}})`, { params: { r: '-3..3 !0', s: '-3..3 !0', t: '-3..3 !0' }, constraints: ['r < s', 's < t'], graphs: [plv(-1, ['r', 's', 't'])] });

  /* ================= rational function graphs ================= */
  skill('rat-graph', 'Reading graphs of rational functions', RF);
  const HV = [-8, 8, -8, 8];
  const hy = (a, h, k) => ({ type: 'hyp', a, h, k });
  const hyv = (extra) => g(hy('a', 'h', 'k'), Object.assign({ view: HV }, extra || {}));
  const HP = { a: '-2..2 !0', h: '-4..4 !0', k: '-4..4 !0' };
  T('rat-graph', 'worked', 'What is the equation of the vertical asymptote of the function graphed below?', r`x = {{h}}`, { params: HP, graphs: [hyv()],
    steps: ['A vertical asymptote is a vertical line the graph approaches but never touches.', 'Both pieces of the graph bend toward the same vertical line, which crosses the $ x $-axis at $ {{h}} $.', 'The vertical asymptote is $ x = {{h}} $.'] });
  T('rat-graph', 'easier', 'What is the equation of the vertical asymptote of the function graphed below?', r`x = {{h}}`, { params: HP, graphs: [hyv({ asym: [{ x: 'h' }, { y: 'k' }] })] });
  T('rat-graph', 'easier', 'What is the equation of the horizontal asymptote of the function graphed below?', r`y = {{k}}`, { params: HP, graphs: [hyv({ asym: [{ x: 'h' }, { y: 'k' }] })] });
  T('rat-graph', 'parallel', 'What is the equation of the vertical asymptote of the function graphed below?', r`x = {{h}}`, { params: HP, graphs: [hyv()] });
  T('rat-graph', 'parallel', 'What is the equation of the horizontal asymptote of the function graphed below?', r`y = {{k}}`, { params: HP, graphs: [hyv()] });
  T('rat-graph', 'parallel', 'What is the domain of the function graphed below?', r`x \neq {{h}}`, { params: HP, graphs: [hyv()] });
  T('rat-graph', 'parallel', 'What is the range of the function graphed below?', r`y \neq {{k}}`, { params: HP, graphs: [hyv()] });
  const RV = [-8, 8, -8, 8];
  const rt = (n, d) => ({ type: 'rat', a: 1, num: [n], den: [d] });
  T('rat-graph', 'parallel', r`What is the $ x $-intercept of the function graphed below?`, r`({{n}}, 0)`, { params: { n: '-5..5 !0', d: '-5..5 !0' }, constraints: ['n != d'], graphs: [g(rt('n', 'd'), { view: RV })] });
  T('rat-graph', 'challenge', r`The graph below has an open circle (a hole). At what $ x $-value is the hole?`, r`x = {{c}}`, { params: { c: '-4..4', d: '-4..4', y0: '-4,-3,-2,-1,2,3,4' }, derived: { n: 'c-y0*(c-d)' }, constraints: ['c != d', 'abs(n) <= 6'],
    graphs: [g(rt('n', 'd'), { view: RV, points: [{ x: 'c', y: 'y0', open: true }] })] });
  T('rat-graph', 'challenge', r`The graph below has a hole and a vertical asymptote. What are the coordinates of the hole?`, r`({{c}}, {{y0}})`, { params: { c: '-4..4', d: '-4..4', y0: '-4,-3,-2,-1,2,3,4' }, derived: { n: 'c-y0*(c-d)' }, constraints: ['c != d', 'abs(n) <= 6'],
    graphs: [g(rt('n', 'd'), { view: RV, points: [{ x: 'c', y: 'y0', open: true }] })] });
  T('rat-graph', 'challenge', r`Write the function $ f(x) = \frac{a}{x - h} + k $ graphed below. Its asymptotes are shown.`, r`f(x) = \frac{ {{a}} }{ x{{-h:sign}} }{{k:sign}}`, { params: { a: '-2..2 !0', h: '-3..3 !0', k: '-3..3 !0' },
    graphs: [hyv({ asym: [{ x: 'h' }, { y: 'k' }], points: [{ x: 'h+1', y: 'a+k', label: 'coords' }, { x: 'h-1', y: 'k-a', label: 'coords' }] })] });
})();
