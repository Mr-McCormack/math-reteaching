/* Quadratic functions — questions where the student reads a graph (adds to the skills in quadratics.js).
 * A template's `graphs` list describes what to draw; every number can be a formula using the template's params. */
(function () {
  const { T } = RB;
  const r = String.raw, NL = '\n';
  const Q = (a, h, k) => ({ type: 'quad', a, h, k });
  const G = (curve, extra) => Object.assign({ curves: [curve] }, extra || {});
  const base = { h: '-5..5 !0', k: '-6..6 !0' };
  const P = (a, o) => Object.assign({ a }, base, o || {});
  const UP = '1..2', DN = '-2..-1', ANY = '-2..2 !0';
  const mk = (skill, tier, prompt, answer, o) => T(skill, tier, prompt, answer, o);
  const nh = { nh: '0-h' };

  // ------------------------------------------------------------ characteristics from a graph
  const S = 'qv-char';
  const pt = { points: [{ x: 'h', y: 'k', label: 'coords' }] };
  mk(S, 'worked', 'What is the range of the function graphed below?', r`[{{k}}, \infty)`, { params: P(UP), graphs: [G(Q('a', 'h', 'k'), pt)],
    steps: [r`Find the vertex, the turning point of the parabola: $ ({{h}}, {{k}}) $.`, r`The graph opens up, so the vertex is the lowest point. The $ y $-values start at $ {{k}} $ and go up forever.`, r`Range: $ [{{k}}, \infty) $.`] });
  mk(S, 'worked', 'What is the range of the function graphed below?', r`(-\infty, {{k}}]`, { params: P(DN), graphs: [G(Q('a', 'h', 'k'), pt)],
    steps: [r`Find the vertex, the turning point of the parabola: $ ({{h}}, {{k}}) $.`, r`The graph opens down, so the vertex is the highest point. The $ y $-values go from $ {{k}} $ down forever.`, r`Range: $ (-\infty, {{k}}] $.`] });

  const gv = () => [G(Q('a', 'h', 'k'))];
  mk(S, 'easier', 'Does the parabola graphed below open up or down?', r`\text{up}`, { params: P(UP), graphs: gv() });
  mk(S, 'easier', 'Does the parabola graphed below open up or down?', r`\text{down}`, { params: P(DN), graphs: gv() });
  mk(S, 'easier', 'What is the vertex of the function graphed below?', r`({{h}}, {{k}})`, { params: P(UP), graphs: gv() });
  mk(S, 'easier', 'What is the vertex of the function graphed below?', r`({{h}}, {{k}})`, { params: P(DN), graphs: gv() });

  mk(S, 'parallel', 'What is the axis of symmetry of the function graphed below?', r`x = {{h}}`, { params: P(ANY), graphs: gv() });
  mk(S, 'parallel', 'What is the range of the function graphed below?', r`[{{k}}, \infty)`, { params: P(UP), graphs: gv() });
  mk(S, 'parallel', 'What is the range of the function graphed below?', r`(-\infty, {{k}}]`, { params: P(DN), graphs: gv() });
  mk(S, 'parallel', 'What is the maximum or minimum value of the function graphed below?', r`\text{minimum value }{{k}}`, { params: P(UP), graphs: gv() });
  mk(S, 'parallel', 'What is the maximum or minimum value of the function graphed below?', r`\text{maximum value }{{k}}`, { params: P(DN), graphs: gv() });
  mk(S, 'parallel', 'What is the interval of increase of the function graphed below?', r`({{h}}, \infty)`, { params: P(UP), graphs: gv() });
  mk(S, 'parallel', 'What is the interval of increase of the function graphed below?', r`(-\infty, {{h}})`, { params: P(DN), graphs: gv() });
  mk(S, 'parallel', 'What is the interval of decrease of the function graphed below?', r`(-\infty, {{h}})`, { params: P(UP), graphs: gv() });
  mk(S, 'parallel', 'What is the interval of decrease of the function graphed below?', r`({{h}}, \infty)`, { params: P(DN), graphs: gv() });
  mk(S, 'parallel', r`What is the $ y $-intercept of the function graphed below?`, r`(0, {{yi}})`, { params: { a: '-1,1', h: '-3..3 !0', k: '-6..6 !0' }, derived: { yi: 'a*h^2+k' }, graphs: gv() });
  mk(S, 'parallel', 'Which of the following is a zero of the function graphed below? Give both zeros.', r`x = {{z1}}\ \text{and}\ x = {{z2}}`, { params: { a: '1', h: '-4..4', r: '1..4' }, derived: { k: '0-r^2', z1: 'h-r', z2: 'h+r' }, graphs: gv() });
  mk(S, 'parallel', 'Which of the following is a zero of the function graphed below? Give both zeros.', r`x = {{z1}}\ \text{and}\ x = {{z2}}`, { params: { a: '-1', h: '-4..4', r: '1..4' }, derived: { k: 'r^2', z1: 'h-r', z2: 'h+r' }, graphs: gv() });
  mk(S, 'parallel', 'How many real zeros does the function graphed below have?', r`0`, { params: { a: UP, h: base.h, k: '1..6' }, graphs: gv() });
  mk(S, 'parallel', 'How many real zeros does the function graphed below have?', r`0`, { params: { a: DN, h: base.h, k: '-6..-1' }, graphs: gv() });
  mk(S, 'parallel', 'How many real zeros does the function graphed below have?', r`2`, { params: { a: UP, h: base.h, k: '-6..-1' }, graphs: gv() });
  mk(S, 'parallel', 'How many real zeros does the function graphed below have?', r`2`, { params: { a: DN, h: base.h, k: '1..6' }, graphs: gv() });

  const pt2 = { points: [{ x: 'h', y: 'k', label: 'coords' }, { x: 'h+1', y: 'a+k', label: 'coords' }] };
  mk(S, 'challenge', r`The graph below is a parabola with its vertex and one more point marked. Write its equation in the form $ f(x) = a(x - h)^2 + k $.`, r`f(x) = {{a:coef}}(x{{nh:sign}})^2{{k:sign}}`, { params: P('2..3'), derived: nh, graphs: [G(Q('a', 'h', 'k'), pt2)] });
  mk(S, 'challenge', r`The graph below is a parabola with its vertex and one more point marked. Write its equation in the form $ f(x) = a(x - h)^2 + k $.`, r`f(x) = {{a:coef}}(x{{nh:sign}})^2{{k:sign}}`, { params: P('-3..-2'), derived: nh, graphs: [G(Q('a', 'h', 'k'), pt2)] });
  mk(S, 'challenge', 'Find the interval of increase and the range of the function graphed below.', r`({{h}}, \infty);\ [{{k}}, \infty)`, { params: P(UP), graphs: gv() });
  mk(S, 'challenge', 'Find the interval of increase and the range of the function graphed below.', r`(-\infty, {{h}});\ (-\infty, {{k}}]`, { params: P(DN), graphs: gv() });

  // ------------------------------------------------------------ average rate of change from a graph
  const A = 'aroc';
  const ar = (a) => ({ a, h: '-3..3', k: '-5..5', p: '-4..0', q: '1..4' });
  const lim = ['abs(fp) <= 12', 'abs(fq) <= 12']; // keep the marked points on a readable grid
  const ard = { fp: 'a*(p-h)^2+k', fq: 'a*(q-h)^2+k', m: '(fq-fp)/(q-p)' };
  const two = (lab) => ({ points: [{ x: 'p', y: 'fp', label: lab }, { x: 'q', y: 'fq', label: lab }] });
  const arSteps = [
    r`Read the two points from the graph: $ ({{p}}, {{fp}}) $ and $ ({{q}}, {{fq}}) $.`,
    r`Average rate of change $ = \dfrac{ {{fq}} - ({{fp}}) }{ {{q}} - ({{p}}) } = \dfrac{ {{dn}} }{ {{dd}} } = {{m}} $`];
  const arQ = r`Use the graph to find the average rate of change from $ x = {{p}} $ to $ x = {{q}} $. Show your work.`;
  [UP, DN].forEach((a) => mk(A, 'worked', arQ, r`{{m}}`, { params: ar(a), derived: Object.assign({}, ard, { dn: 'fq-fp', dd: 'q-p' }), constraints: lim, graphs: [G(Q('a', 'h', 'k'), two('coords'))], steps: arSteps }));
  const ln = (mm) => ({ m: mm, b: '-4..4', p: '-4..0', q: '1..3' });
  const lnd = { fp: 'm*p+b', fq: 'm*q+b' };
  const lnG = [G({ type: 'line', m: 'm', b: 'b' }, { points: [{ x: 'p', y: 'fp', label: '' }, { x: 'q', y: 'fq', label: '' }] })];
  mk(A, 'easier', r`The graph shows a line. Find the average rate of change from $ x = {{p}} $ to $ x = {{q}} $.`, r`{{m}}`, { params: ln('1..3'), derived: lnd, graphs: lnG });
  mk(A, 'easier', r`The graph shows a line. Find the average rate of change from $ x = {{p}} $ to $ x = {{q}} $.`, r`{{m}}`, { params: ln('-3..-1'), derived: lnd, graphs: lnG });
  const arG = [G(Q('a', 'h', 'k'), two(''))];
  [UP, DN].forEach((a) => mk(A, 'parallel', arQ, r`{{m}}`, { params: ar(a), derived: ard, constraints: lim, graphs: arG }));
  mk(A, 'parallel', arQ, r`{{m}}`, { params: ar('-2..2 !0'), derived: ard, constraints: lim, graphs: arG });
  mk(A, 'challenge', r`Find the average rate of change of the function graphed below from $ x = {{lo}} $ to $ x = {{hi}} $. What does your answer tell you about the points?`, r`0`,
    { params: { a: '-2..2 !0', h: '-3..3', k: '-4..4', r: '1..3' }, derived: { lo: 'h-r', hi: 'h+r', ylo: 'a*r^2+k' }, graphs: [G(Q('a', 'h', 'k'), { points: [{ x: 'lo', y: 'ylo', label: '' }, { x: 'hi', y: 'ylo', label: '' }] })] });

  // ------------------------------------------------------------ compare Graph A and Graph B
  const C = 'qcmp';
  const W = [-10, 10, -10, 10];
  const two2 = () => [{ label: 'Graph A', view: W, curves: [Q('aA', 'hA', 'kA')] }, { label: 'Graph B', view: W, curves: [Q('aB', 'hB', 'kB')] }];
  const pp = (A_, B_, o) => Object.assign({ aA: A_.a || ANY, aB: B_.a || ANY, hA: A_.h || '-5..5', hB: B_.h || '-5..5', kA: A_.k || '-6..6 !0', kB: B_.k || '-6..6 !0' }, o || {});
  const ask = (what) => `${what} Answer A, B, Both, or Neither.`;
  const cmp = (tier, what, A_, B_, ans, o) => mk(C, tier, ask(what), r`\text{${ans}}`, Object.assign({ params: pp(A_, B_, (o || {}).params), graphs: two2() }, { constraints: (o || {}).constraints, derived: (o || {}).derived, steps: (o || {}).steps }));
  const MAXQ = 'Which graph has a maximum?', ZQ = 'Which graph has no zeros?';
  cmp('worked', MAXQ, { a: DN }, { a: UP }, 'A', { steps: [
    r`A parabola has a maximum when it opens down.`, r`Graph A opens down, so it has a highest point (a maximum).`, r`Graph B opens up, so it has a lowest point (a minimum) instead.`] });
  cmp('worked', ZQ, { a: UP, k: '1..6' }, { a: UP, k: '-6..-1' }, 'A', { steps: [
    r`Zeros are where the graph crosses the $ x $-axis.`, r`Graph A stays above the $ x $-axis, so it never crosses: no zeros.`, r`Graph B dips below the axis, so it crosses in two places.`] });
  const one = (tier, q, ans, params) => mk(C, tier, q, r`\text{${ans}}`, { params, graphs: [G(Q('a', 'h', 'k'))] });
  one('easier', 'Does the graph below have a maximum or a minimum?', 'maximum', P(DN));
  one('easier', 'Does the graph below have a maximum or a minimum?', 'minimum', P(UP));
  one('easier', 'Does the graph below cross the $x$-axis? Answer yes or no.', 'yes', { a: UP, h: base.h, k: '-6..-1' });
  one('easier', 'Does the graph below cross the $x$-axis? Answer yes or no.', 'no', { a: UP, h: base.h, k: '1..6' });

  cmp('parallel', MAXQ, { a: DN }, { a: UP }, 'A');
  cmp('parallel', MAXQ, { a: UP }, { a: DN }, 'B');
  cmp('parallel', ZQ, { a: UP, k: '-6..-1' }, { a: UP, k: '1..6' }, 'B');
  cmp('parallel', ZQ, { a: UP, k: '1..6' }, { a: UP, k: '-6..-1' }, 'A');
  const axq = r`Which graph has axis of symmetry $ x = {{h0}} $?`;
  cmp('parallel', axq, {}, {}, 'A', { params: { h0: '-5..5 !0' }, constraints: ['hA == h0', 'hB != h0'] });
  cmp('parallel', axq, {}, {}, 'B', { params: { h0: '-5..5 !0' }, constraints: ['hB == h0', 'hA != h0'] });
  const rgq = r`Which graph has range $ (-\infty, {{k0}}] $?`;
  cmp('parallel', rgq, { a: DN }, { a: DN }, 'A', { params: { k0: '-6..6 !0' }, constraints: ['kA == k0', 'kB != k0'] });
  cmp('parallel', rgq, { a: DN }, { a: DN }, 'B', { params: { k0: '-6..6 !0' }, constraints: ['kB == k0', 'kA != k0'] });
  const yq = r`Which graph has a $ y $-intercept of $ (0, {{c0}}) $?`;
  const yd = { yA: 'aA*hA^2+kA', yB: 'aB*hB^2+kB' };
  cmp('parallel', yq, { a: UP, h: '-3..3' }, { a: UP, h: '-3..3' }, 'A', { params: { c0: '-3..6' }, derived: yd, constraints: ['yA == c0', 'yB != c0'] });
  cmp('parallel', yq, { a: UP, h: '-3..3' }, { a: UP, h: '-3..3' }, 'B', { params: { c0: '-3..6' }, derived: yd, constraints: ['yB == c0', 'yA != c0'] });
  cmp('parallel', r`Which graph has a domain of $ (-\infty, \infty) $?`, {}, {}, 'Both');

  cmp('challenge', MAXQ, { a: DN }, { a: DN }, 'Both');
  cmp('challenge', MAXQ, { a: UP }, { a: UP }, 'Neither');
  cmp('challenge', ZQ, { a: UP, k: '1..6' }, { a: UP, k: '1..6' }, 'Both');
  cmp('challenge', ZQ, { a: UP, k: '-6..-1' }, { a: UP, k: '-6..-1' }, 'Neither');
  cmp('challenge', axq, {}, {}, 'Both', { params: { h0: '-5..5 !0' }, derived: { hA: 'h0', hB: 'h0' } });
  cmp('challenge', rgq, { a: DN }, { a: DN }, 'Both', { params: { k0: '-6..6 !0' }, derived: { kA: 'k0', kB: 'k0' } });
})();
