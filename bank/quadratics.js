/* Unit: Quadratic functions — characteristics, average rate of change, transformations, comparing.
 * Modeled on the "Characteristics & Transformations of Quadratics" quiz.
 * Graph-picture items from that quiz are turned into equation / table versions here.
 * This file builds many templates with small loops so the sign cases (left/right, up/down) stay correct. */
(function () {
  const { skill, T } = RB;
  const U = 'Quadratic functions';
  const r = String.raw;
  const NL = '\n';
  const J = (a, b) => ({ params: a, derived: b });

  // vertex form  a(x - h)^2 + k  as printed text
  const VF = r`{{a:coef}}(x{{nh:sign}})^2{{k:sign}}`;
  const AXIS = r`x = {{h}}`;

  // =========================================================== characteristics
  skill('qv-char', 'Characteristics from vertex form', U);
  const base = { h: '-6..6 !0', k: '-8..8 !0' };
  const up = Object.assign({ a: '1..4' }, base), dn = Object.assign({ a: '-4..-1' }, base);
  const nh = { nh: '0-h' };

  T('qv-char', 'worked', r`Find the vertex, axis of symmetry and range of $ f(x) = ${VF} $.`,
    r`\text{vertex }({{h}}, {{k}});\ x = {{h}};\ \text{range }[{{k}}, \infty)`,
    Object.assign(J(up, nh), { steps: [
      r`Compare with $ f(x) = a(x - h)^2 + k $: here $ a = {{a}} $, $ h = {{h}} $, $ k = {{k}} $.`,
      r`The vertex is $ (h, k) = ({{h}}, {{k}}) $, and the axis of symmetry is the vertical line through it: $ x = {{h}} $.`,
      r`Because $ a > 0 $ the parabola opens up, so the vertex is the lowest point and the range is $ [{{k}}, \infty) $.`] }));
  T('qv-char', 'worked', r`Find the vertex, axis of symmetry and range of $ f(x) = ${VF} $.`,
    r`\text{vertex }({{h}}, {{k}});\ x = {{h}};\ \text{range }(-\infty, {{k}}]`,
    Object.assign(J(dn, nh), { steps: [
      r`Compare with $ f(x) = a(x - h)^2 + k $: here $ a = {{a}} $, $ h = {{h}} $, $ k = {{k}} $.`,
      r`The vertex is $ (h, k) = ({{h}}, {{k}}) $, and the axis of symmetry is the vertical line through it: $ x = {{h}} $.`,
      r`Because $ a < 0 $ the parabola opens down, so the vertex is the highest point and the range is $ (-\infty, {{k}}] $.`] }));

  T('qv-char', 'easier', r`What is the axis of symmetry of $ f(x) = (x{{nh:sign}})^2{{k:sign}} $?`, AXIS, J(base, nh));
  T('qv-char', 'easier', r`What is the vertex of $ f(x) = (x{{nh:sign}})^2{{k:sign}} $?`, r`({{h}}, {{k}})`, J(base, nh));
  T('qv-char', 'easier', r`Does the graph of $ f(x) = {{a:coef}}x^2 $ open up or down?`, r`\text{up}`, J({ a: '1..6' }));
  T('qv-char', 'easier', r`Does the graph of $ f(x) = {{a:coef}}x^2 $ open up or down?`, r`\text{down}`, J({ a: '-6..-1' }));

  T('qv-char', 'parallel', r`What is the axis of symmetry of $ f(x) = ${VF} $?`, AXIS, J(Object.assign({ a: '-4..4 !0' }, base), nh));
  T('qv-char', 'parallel', r`What is the vertex of $ f(x) = ${VF} $?`, r`({{h}}, {{k}})`, J(Object.assign({ a: '-4..4 !0' }, base), nh));
  T('qv-char', 'parallel', r`What is the range of $ f(x) = ${VF} $?`, r`[{{k}}, \infty)`, J(up, nh));
  T('qv-char', 'parallel', r`What is the range of $ f(x) = ${VF} $?`, r`(-\infty, {{k}}]`, J(dn, nh));
  T('qv-char', 'parallel', r`Does $ f(x) = ${VF} $ have a maximum or a minimum, and what is its value?`, r`\text{minimum value }{{k}}`, J(up, nh));
  T('qv-char', 'parallel', r`Does $ f(x) = ${VF} $ have a maximum or a minimum, and what is its value?`, r`\text{maximum value }{{k}}`, J(dn, nh));
  T('qv-char', 'parallel', r`What is the interval of increase of $ f(x) = ${VF} $?`, r`({{h}}, \infty)`, J(up, nh));
  T('qv-char', 'parallel', r`What is the interval of increase of $ f(x) = ${VF} $?`, r`(-\infty, {{h}})`, J(dn, nh));
  T('qv-char', 'parallel', r`What is the interval of decrease of $ f(x) = ${VF} $?`, r`(-\infty, {{h}})`, J(up, nh));
  T('qv-char', 'parallel', r`What is the interval of decrease of $ f(x) = ${VF} $?`, r`({{h}}, \infty)`, J(dn, nh));
  T('qv-char', 'parallel', r`What is the $y$-intercept of $ f(x) = ${VF} $?`, r`(0, {{yi}})`, J(Object.assign({ a: '-4..4 !0' }, base), { nh: '0-h', yi: 'a*h^2+k' }));
  // zeros read straight off a perfect square:  a(x-h)^2 + k = 0
  T('qv-char', 'parallel', r`Find the zeros of $ f(x) = ${VF} $.`, r`x = {{z1}}\ \text{and}\ x = {{z2}}`,
    J({ a: '1..3', r: '1..5', h: '-5..5 !0' }, { nh: '0-h', k: '0-a*r^2', z1: 'h-r', z2: 'h+r' }));
  T('qv-char', 'parallel', r`How many real zeros does $ f(x) = ${VF} $ have?`, r`\text{none}`, J({ a: '1..4', h: '-6..6 !0', k: '1..8' }, nh));
  T('qv-char', 'parallel', r`How many real zeros does $ f(x) = ${VF} $ have?`, r`\text{none}`, J({ a: '-4..-1', h: '-6..6 !0', k: '-8..-1' }, nh));

  const std = r`{{a:coef}}x^2{{b:sgncoef}}x{{c:sign}}`;
  const stdP = (a) => J({ a, h: '-4..4 !0', k: '-8..8 !0' }, { b: '0-2*a*h', c: 'a*h^2+k', nh: '0-h' });
  T('qv-char', 'challenge', r`Find the axis of symmetry and the vertex of $ f(x) = ${std} $.`, r`x = {{h}};\ ({{h}}, {{k}})`,
    Object.assign(stdP('1..3'), { constraints: ['c != 0'] }));
  T('qv-char', 'challenge', r`Find the axis of symmetry and the range of $ f(x) = ${std} $.`, r`x = {{h}};\ (-\infty, {{k}}]`,
    Object.assign(stdP('-3..-1'), { constraints: ['c != 0'] }));
  T('qv-char', 'challenge', r`For $ f(x) = ${VF} $, find the interval where $ f $ is increasing and the range.`, r`\text{increasing on }({{h}}, \infty);\ [{{k}}, \infty)`, J(up, nh));
  T('qv-char', 'challenge', r`For $ f(x) = ${VF} $, find the interval where $ f $ is increasing and the range.`, r`\text{increasing on }(-\infty, {{h}});\ (-\infty, {{k}}]`, J(dn, nh));

  // =========================================================== average rate of change
  skill('aroc', 'Average rate of change', U);
  const quad = r`{{a:coef}}x^2{{b:sgncoef}}x{{c:sign}}`;
  const qp = (a) => ({ a, b: '-5..5 !0', c: '-6..6 !0', p: '-4..0', q: '1..4' });
  const qd = { fp: 'a*p^2+b*p+c', fq: 'a*q^2+b*q+c', dn: 'fq-fp', dd: 'q-p', m: '(fq-fp)/(q-p)' };
  const evalAt = (x) => r`{{a:coef}}({{${x}}})^2{{b:sgncoef}}({{${x}}}){{c:sign}}`;
  const wsteps = [
    r`Average rate of change on $ [{{p}}, {{q}}] $ is $ \dfrac{f({{q}}) - f({{p}})}{ {{q}} - ({{p}}) } $.`,
    r`Find $ f({{p}}) = ${evalAt('p')} = {{fp}} $.`,
    r`Find $ f({{q}}) = ${evalAt('q')} = {{fq}} $.`,
    r`$ \dfrac{ {{fq}} - ({{fp}}) }{ {{q}} - ({{p}}) } = \dfrac{ {{dn}} }{ {{dd}} } = {{m}} $`];
  T('aroc', 'worked', r`Find the average rate of change of $ f(x) = ${quad} $ on the interval $ {{p}} \le x \le {{q}} $.`, r`{{m}}`, Object.assign(J(qp('1..3'), qd), { steps: wsteps, constraints: ['p < q'] }));
  T('aroc', 'worked', r`Find the average rate of change of $ f(x) = ${quad} $ on the interval $ {{p}} \le x \le {{q}} $.`, r`{{m}}`, Object.assign(J(qp('-3..-1'), qd), { steps: wsteps, constraints: ['p < q'] }));

  const pts = { p: '-5..2', d: '1..4', m: '-5..5 !0', y1: '-6..6' };
  T('aroc', 'easier', r`A function passes through $ ({{p}}, {{y1}}) $ and $ ({{q}}, {{y2}}) $. What is the average rate of change between these two points?`, r`{{m}}`, J(pts, { q: 'p+d', y2: 'y1+m*d' }));
  T('aroc', 'easier', r`The table shows a linear function. Find the average rate of change from $ x = {{p}} $ to $ x = {{q}} $.${NL}$ \begin{array}{c|cc} x & {{p}} & {{q}} \\ \hline f(x) & {{y1}} & {{y2}} \end{array} $`, r`{{m}}`, J(pts, { q: 'p+d', y2: 'y1+m*d' }));
  T('aroc', 'easier', r`Find the slope of the line through $ ({{p}}, {{y1}}) $ and $ ({{q}}, {{y2}}) $. (For a line, this is the average rate of change.)`, r`{{m}}`, J(pts, { q: 'p+d', y2: 'y1+m*d' }));

  T('aroc', 'parallel', r`Find the average rate of change of $ f(x) = ${quad} $ on the interval $ {{p}} \le x \le {{q}} $. Show your work.`, r`{{m}}`, Object.assign(J(qp('-3..3 !0'), qd), { constraints: ['p < q'] }));
  T('aroc', 'parallel', r`Find the average rate of change of $ f(x) = ${quad} $ on the interval $ {{p}} \le x \le {{q}} $.`, r`{{m}}`, Object.assign(J(qp('-3..3 !0'), qd), { constraints: ['p < q'] }));
  T('aroc', 'parallel', r`The table shows values of a quadratic function. Find the average rate of change from $ x = {{p}} $ to $ x = {{q}} $.${NL}$ \begin{array}{c|cccc} x & {{p}} & {{x2}} & {{x3}} & {{q}} \\ \hline f(x) & {{y0}} & {{y1}} & {{y2}} & {{y3}} \end{array} $`, r`{{m}}`,
    J({ a: '1..3', b: '-4..4', c: '-5..5', p: '-3..1' }, { x2: 'p+1', x3: 'p+2', q: 'p+3', y0: 'a*p^2+b*p+c', y1: 'a*x2^2+b*x2+c', y2: 'a*x3^2+b*x3+c', y3: 'a*q^2+b*q+c', m: 'a*(p+q)+b' }));
  T('aroc', 'parallel', r`Find the average rate of change of $ f(x) = ${VF} $ on the interval $ {{p}} \le x \le {{q}} $.`, r`{{m}}`,
    Object.assign(J({ a: '-3..3 !0', h: '-3..3 !0', k: '-6..6 !0', p: '-3..0', q: '1..4' }, { nh: '0-h', fp: 'a*(p-h)^2+k', fq: 'a*(q-h)^2+k', m: '(fq-fp)/(q-p)' }), { constraints: ['p < q'] }));

  T('aroc', 'challenge', r`Find the average rate of change of $ f(x) = \frac{ {{a2}} }{2}x^2{{b:sgncoef}}x $ on the interval $ {{p}} \le x \le {{q}} $.`, r`{{m}}`,
    Object.assign(J({ a2: '1..5', b: '-5..5 !0', p: '-4..0', q: '1..4' }, { m: 'a2/2*(p+q)+b' }), { constraints: ['p < q'] }));
  T('aroc', 'challenge', r`Find the average rate of change of $ f(x) = ${VF} $ on the interval $ {{lo}} \le x \le {{hi}} $, then explain what it tells you about the vertex.`, r`0`,
    J({ a: '-4..4 !0', h: '-3..3 !0', k: '-6..6 !0', r: '1..4' }, { nh: '0-h', lo: 'h-r', hi: 'h+r' }));
  T('aroc', 'challenge', r`A quadratic has average rate of change $ {{m}} $ on $ {{p}} \le x \le {{q}} $ and $ f(x) = x^2 + bx $. Find $ b $.`, r`b = {{b}}`,
    J({ b: '-6..6 !0', p: '-3..1', q: '2..5' }, { m: 'p+q+b' }));

  // =========================================================== transformations
  skill('qt', 'Transformations of quadratics', U);
  // pieces for describing  a(x - h)^2 + k  from the parent y = x^2
  const AT = {
    none:     { p: {}, d: {}, tok: '', say: null, num: 'a = 1', sw: r`$ a = 1 $, so there is no stretch, compression or reflection.` },
    stretch:  { p: { a: '2..9' }, d: {}, tok: '{{a:coef}}', say: r`\text{vertical stretch by a factor of }{{a}}`, sw: r`$ a = {{a}} $, and $ |a| > 1 $, so the graph is vertically stretched by a factor of $ {{a}} $.` },
    compress: { p: { a2: '2..9' }, d: { a: '1/a2' }, tok: '{{a:coef}}', say: r`\text{vertical compression by a factor of }\tfrac{1}{ {{a2}} }`, sw: r`$ a = \frac{1}{ {{a2}} } $, and $ 0 < |a| < 1 $, so the graph is vertically compressed by a factor of $ \frac{1}{ {{a2}} } $.` },
    reflect:  { p: { a: '-9..-2' }, d: {}, tok: '{{a:coef}}', say: r`\text{reflected across the }x\text{-axis};\ \text{vertical stretch by a factor of }{{a:abs}}`, sw: r`$ a = {{a}} $ is negative, so the graph is reflected across the $ x $-axis, and $ |a| = {{a:abs}} $ stretches it vertically by a factor of $ {{a:abs}} $.` },
    flip:     { p: { a: '-1' }, d: {}, tok: '{{a:coef}}', say: r`\text{reflected across the }x\text{-axis}`, sw: r`$ a = -1 $, so the graph is reflected across the $ x $-axis with no stretch.` }
  };
  const HM = { R: { p: '1..8', say: r`\text{right }{{h:abs}}`, why: 'positive' , dir: 'right' }, L: { p: '-8..-1', say: r`\text{left }{{h:abs}}`, why: 'negative', dir: 'left' } };
  const KM = { U: { p: '1..8', say: r`\text{up }{{k:abs}}`, dir: 'up' }, D: { p: '-8..-1', say: r`\text{down }{{k:abs}}`, dir: 'down' } };

  const GA = { stretch: { a: '2..3' }, reflect: { a: '-3..-2' }, flip: { a: '-1' } }; // simpler numbers when the student reads them off a graph
  function build(tier, at, hm, km, o) {
    o = o || {};
    const A = AT[at], H = hm && HM[hm], K = km && KM[km];
    const params = Object.assign({}, A.p), derived = Object.assign({}, A.d);
    if (H) { params.h = H.p; derived.nh = '0-h'; }
    if (K) params.k = K.p;
    const fx = A.tok + (H ? '(x{{nh:sign}})^2' : 'x^2') + (K ? '{{k:sign}}' : '');
    const shifted = (m, dir, v) => r`\text{shifted ${dir} }{{${v}:abs}}\text{ unit(s)}`;
    const answer = [A.say, H && shifted(null, H.dir, 'h'), K && shifted(null, K.dir, 'k')].filter(Boolean).join(r`;\ `);
    const steps = [];
    if (o.steps) {
      steps.push(r`Match $ f(x) = ${fx} $ to $ a(x - h)^2 + k $: $ a = ${at === 'compress' ? r`\frac{1}{ {{a2}} }` : at === 'none' ? '1' : '{{a}}'} $, $ h = ${H ? '{{h}}' : '0'} $, $ k = ${K ? '{{k}}' : '0'} $.`);
      if (at !== 'none') steps.push(A.sw);
      if (H) steps.push(r`$ h = {{h}} $ is ${H.why}, so the graph shifts ${H.dir} {{h:abs}} unit(s) (watch the sign: $ (x - h) $ with $ h = {{h}} $).`.replace('{{h:abs}}', '$ {{h:abs}} $'));
      if (K) steps.push(r`$ k = {{k}} $ shifts the graph ${K.dir} $ {{k:abs}} $ unit(s).`);
    }
    if (o.graph) Object.assign(params, GA[at] || {});
    const gr = o.graph ? { graphs: [{ curves: [{ type: 'quad', a: 1, h: 0, k: 0, style: 'dashed' }, { type: 'quad', a: at === 'none' ? 1 : 'a', h: H ? 'h' : 0, k: K ? 'k' : 0 }] }] } : {};
    const gprompt = r`The solid graph is a transformation of the parent function $ y = x^2 $ (the dashed graph). Describe the transformations.`;
    T('qt', tier, o.graph ? gprompt : o.prompt ? o.prompt(fx) : r`Describe the transformations of $ f(x) = ${fx} $ from the parent function $ y = x^2 $.`, answer,
      Object.assign({ params, derived }, steps.length ? { steps } : {}, gr));
  }
  const combos = [['R', 'U'], ['R', 'D'], ['L', 'U'], ['L', 'D']];
  combos.forEach(([h, k]) => build('worked', 'stretch', h, k, { steps: true }));
  build('worked', 'reflect', 'L', 'U', { steps: true });
  build('worked', 'compress', 'R', 'D', { steps: true });
  // easier: one change at a time
  [['none', null, 'U'], ['none', null, 'D'], ['none', 'R', null], ['none', 'L', null], ['stretch', null, null], ['compress', null, null], ['reflect', null, null]].forEach(([a, h, k]) => build('easier', a, h, k));
  // concept questions (the "match the constant" items)
  const concept = (q, ans) => T('qt', 'easier', q, ans, { params: {}, derived: {} });
  concept(r`In $ f(x) = a(x - h)^2 + k $, which constant shifts the graph up or down?`, r`k`);
  concept(r`In $ f(x) = a(x - h)^2 + k $, which constant shifts the graph left or right?`, r`h`);
  concept(r`In $ f(x) = a(x - h)^2 + k $, which constant stretches or compresses the graph vertically?`, r`a`);
  // parallel: the quiz's fill-in-the-blank and multiple-choice items as free response
  ['stretch', 'compress', 'reflect'].forEach((a) => combos.forEach(([h, k]) => build('parallel', a, h, k)));
  ['stretch', 'compress'].forEach((a) => build('parallel', a, null, 'U'));
  // the same skills, but read from a graph
  [['none', null, 'U'], ['none', null, 'D'], ['none', 'R', null], ['none', 'L', null]].forEach(([a, h, k]) => build('easier', a, h, k, { graph: true }));
  ['stretch', 'reflect', 'flip'].forEach((a) => combos.forEach(([h, k]) => build('parallel', a, h, k, { graph: true })));
  // reflecting across the x-axis (quiz #20)
  const refl = (tier, prompt, ans, extra) => T('qt', tier, prompt, ans, Object.assign(J({ a: '1..5', h: '-6..6 !0', k: '-8..8 !0' }, { nh: '0-h', na: '0-a', nk: '0-k', nh2: 'h' }), extra || {}));
  refl('parallel', r`If $ f(x) = ${VF} $ is reflected across the $x$-axis to make $ g(x) $, write the equation of $ g(x) $.`, r`g(x) = {{na:coef}}(x{{nh:sign}})^2{{nk:sign}}`);
  refl('parallel', r`The graph of $ f(x) = ${VF} $ is reflected across the $x$-axis to make $ g(x) $. Write $ g(x) $.`, r`g(x) = {{na:coef}}(x{{nh:sign}})^2{{nk:sign}}`);
  refl('challenge', r`If $ f(x) = ${VF} $ is reflected across the $y$-axis to make $ g(x) $, write the equation of $ g(x) $.`, r`g(x) = {{a:coef}}(x{{nh2:sign}})^2{{k:sign}}`);
  // challenge: write the equation from a description
  const write = (aTxt, aTok, ap, ad, hm, km) => {
    const H = HM[hm], K = KM[km];
    T('qt', 'challenge', `Write the equation of the function obtained from $ y = x^2 $ by ${aTxt}shifting it ${H.dir} $ {{h:abs}} $ unit(s) and ${K.dir} $ {{k:abs}} $ unit(s).`,
      r`f(x) = ${aTok}(x{{nh:sign}})^2{{k:sign}}`, J(Object.assign({ h: H.p, k: K.p }, ap), Object.assign({ nh: '0-h' }, ad)));
  };
  combos.forEach(([h, k]) => {
    write(r`vertically stretching it by a factor of $ {{a}} $, `, '{{a:coef}}', { a: '2..5' }, {}, h, k);
    write(r`reflecting it across the $ x $-axis, `, '-', {}, {}, h, k);
  });
  write(r`vertically compressing it by a factor of $ \frac{1}{ {{a2}} } $, `, '{{a:coef}}', { a2: '2..5' }, { a: '1/a2' }, 'R', 'U');
  write(r`vertically compressing it by a factor of $ \frac{1}{ {{a2}} } $, `, '{{a:coef}}', { a2: '2..5' }, { a: '1/a2' }, 'L', 'D');

  // =========================================================== compare two functions
  skill('qcmp', 'Comparing two quadratics', U);
  const hk = { h: '-6..6 !0', k: '-8..8 !0' };
  const FN = (s) => r`{{a${s}:coef}}(x{{nh${s}:sign}})^2{{k${s}:sign}}`;
  const both = (A, B, extra) => ({ params: Object.assign({}, ...['a', 'h', 'k'].map((v) => ({ [v + 'A']: A[v] || hk[v], [v + 'B']: B[v] || hk[v] }))), derived: { nhA: '0-hA', nhB: '0-hB' }, constraints: extra || [] });
  const ask = (what) => r`Function A: $ f(x) = ${FN('A')} $${NL}Function B: $ g(x) = ${FN('B')} $${NL}${what} Answer A, B, Both, or Neither.`;
  const pos = '1..4', neg = '-4..-1';
  const prop = (tier, what, A, B, ans, extra, steps) => {
    const o = both(A, B, extra); if (steps) o.steps = steps;
    T('qcmp', tier, ask(what), r`\text{${ans}}`, o);
  };
  const MAXQ = 'Which function has a maximum value?', ZQ = 'Which function has no real zeros?';
  prop('worked', MAXQ, { a: neg }, { a: pos }, 'A', null, [
    r`A parabola has a maximum when it opens down, which happens when $ a < 0 $.`,
    r`Function A has $ a = {{aA}} $ (negative), so it opens down and has a maximum.`,
    r`Function B has $ a = {{aB}} $ (positive), so it opens up and has a minimum instead.`]);
  prop('worked', ZQ, { a: pos, k: '1..8' }, { a: pos, k: '-8..-1' }, 'A', null, [
    r`A parabola has no real zeros when its vertex is above the $ x $-axis and it opens up, or its vertex is below and it opens down.`,
    r`Function A: $ a = {{aA}} > 0 $ and the vertex $ y = {{kA}} $ is above the axis, so it never reaches $ y = 0 $: no zeros.`,
    r`Function B: $ a = {{aB}} > 0 $ but the vertex $ y = {{kB}} $ is below the axis, so the graph crosses it: two zeros.`]);
  // easier items for this skill are single-function questions
  T('qcmp', 'easier', r`Does $ f(x) = ${FN('A')} $ have a maximum or a minimum?`, r`\text{maximum}`, { params: { aA: neg, hA: hk.h, kA: hk.k }, derived: { nhA: '0-hA' } });
  T('qcmp', 'easier', r`Does $ f(x) = ${FN('A')} $ have a maximum or a minimum?`, r`\text{minimum}`, { params: { aA: pos, hA: hk.h, kA: hk.k }, derived: { nhA: '0-hA' } });
  T('qcmp', 'easier', r`Is the vertex of $ f(x) = ${FN('A')} $ above or below the $x$-axis?`, r`\text{above}`, { params: { aA: pos, hA: hk.h, kA: '1..8' }, derived: { nhA: '0-hA' } });
  T('qcmp', 'easier', r`Is the vertex of $ f(x) = ${FN('A')} $ above or below the $x$-axis?`, r`\text{below}`, { params: { aA: pos, hA: hk.h, kA: '-8..-1' }, derived: { nhA: '0-hA' } });

  prop('parallel', MAXQ, { a: neg }, { a: pos }, 'A');
  prop('parallel', MAXQ, { a: pos }, { a: neg }, 'B');
  prop('parallel', ZQ, { a: pos, k: '-8..-1' }, { a: pos, k: '1..8' }, 'B');
  prop('parallel', ZQ, { a: pos, k: '1..8' }, { a: pos, k: '-8..-1' }, 'A');
  const axisQ = r`Which function has axis of symmetry $ x = {{h0}} $?`;
  const axisT = (ans, hA, hB, ex) => T('qcmp', 'parallel', ask(axisQ), r`\text{${ans}}`, { params: { aA: '-4..4 !0', aB: '-4..4 !0', h0: '-6..6 !0', hA, hB, kA: hk.k, kB: hk.k }, derived: { nhA: '0-hA', nhB: '0-hB' }, constraints: ex });
  axisT('A', '-6..6 !0', '-6..6 !0', ['hA == h0', 'hB != h0']);
  axisT('B', '-6..6 !0', '-6..6 !0', ['hB == h0', 'hA != h0']);
  const rangeQ = r`Which function has range $ (-\infty, {{k0}}] $?`;
  const rangeT = (ans, ex) => T('qcmp', 'parallel', ask(rangeQ), r`\text{${ans}}`, { params: { aA: '-4..-1', aB: '-4..-1', hA: hk.h, hB: hk.h, kA: hk.k, kB: hk.k, k0: hk.k }, derived: { nhA: '0-hA', nhB: '0-hB' }, constraints: ex });
  rangeT('A', ['kA == k0', 'kB != k0']);
  rangeT('B', ['kB == k0', 'kA != k0']);

  // "Both" and "Neither" cases
  T('qcmp', 'challenge', ask(axisQ), r`\text{Both}`, { params: { aA: '-4..4 !0', aB: '-4..4 !0', h0: '-6..6 !0', kA: hk.k, kB: hk.k }, derived: { hA: 'h0', hB: 'h0', nhA: '0-h0', nhB: '0-h0' } });
  T('qcmp', 'challenge', ask(MAXQ), r`\text{Both}`, both({ a: neg }, { a: neg }));
  T('qcmp', 'challenge', ask(ZQ), r`\text{Both}`, both({ a: pos, k: '1..8' }, { a: pos, k: '1..8' }));
  T('qcmp', 'challenge', ask(rangeQ), r`\text{Both}`, { params: { aA: '-4..-1', aB: '-4..-1', hA: hk.h, hB: hk.h, k0: hk.k }, derived: { kA: 'k0', kB: 'k0', nhA: '0-hA', nhB: '0-hB' } });
  T('qcmp', 'challenge', ask('Which function has a maximum value?'), r`\text{Neither}`, both({ a: pos }, { a: pos }));
  T('qcmp', 'challenge', ask('Which function has a vertex that is farther to the right?'), r`\text{A}`, { params: { aA: '-4..4 !0', aB: '-4..4 !0', hA: '-6..6 !0', hB: '-6..6 !0', kA: hk.k, kB: hk.k }, derived: { nhA: '0-hA', nhB: '0-hB' }, constraints: ['hA > hB'] });
  T('qcmp', 'challenge', ask('Which function has a vertex that is farther to the right?'), r`\text{B}`, { params: { aA: '-4..4 !0', aB: '-4..4 !0', hA: '-6..6 !0', hB: '-6..6 !0', kA: hk.k, kB: hk.k }, derived: { nhA: '0-hA', nhB: '0-hB' }, constraints: ['hB > hA'] });
})();
