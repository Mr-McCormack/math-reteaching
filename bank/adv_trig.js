/* Advanced Algebra — unit circle trigonometry */
(function () {
  const { skill, T } = RB;
  const r = String.raw, TR = 'Adv. Algebra: unit circle trigonometry';
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const radStr = (d) => { if (d === 0) return '0'; const g = gcd(d, 180), n = d / g, m = 180 / g; return m === 1 ? (n === 1 ? r`\pi` : n + r`\pi`) : n === 1 ? r`\frac{\pi}{${m}}` : r`\frac{${n}\pi}{${m}}`; };
  const degStr = (d) => d + r`^\circ`;
  const VAL = { '0.000000': '0', '0.500000': r`\frac{1}{2}`, '0.707107': r`\frac{\sqrt{2}}{2}`, '0.866025': r`\frac{\sqrt{3}}{2}`, '1.000000': '1', '0.577350': r`\frac{\sqrt{3}}{3}`, '1.732051': r`\sqrt{3}`, '1.414214': r`\sqrt{2}`, '2.000000': '2', '1.154701': r`\frac{2\sqrt{3}}{3}` };
  const rad = (d) => d * Math.PI / 180;
  const FN = { sin: (d) => Math.sin(rad(d)), cos: (d) => Math.cos(rad(d)), tan: (d) => Math.tan(rad(d)), csc: (d) => 1 / Math.sin(rad(d)), sec: (d) => 1 / Math.cos(rad(d)), cot: (d) => 1 / Math.tan(rad(d)) };
  const val = (f, d) => { const v = FN[f](d); if (!Number.isFinite(v) || Math.abs(v) > 1e6) return r`\text{undefined}`; const a = Math.abs(v).toFixed(6); if (!(a in VAL)) throw new Error('no table value ' + f + d + ' ' + a); return (v < -1e-9 ? '-' : '') + VAL[a]; };
  const ANG = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

  /* ---------- degrees <-> radians ---------- */
  skill('trig-conv', 'Converting between degrees and radians', TR);
  T('trig-conv', 'worked', r`Convert $ {{d}}^\circ $ to radians.`, r`\frac{ {{n}}\pi }{ {{m}} }`, { params: { d: '120,135,150,210,225,240,300,315,330' }, derived: { g: 'gcd(d,180)', n: 'd/g', m: '180/g' },
    steps: [r`Multiply by $ \frac{\pi}{180} $: $ {{d}}\cdot\frac{\pi}{180} = \frac{ {{d}}\pi }{180} $`, r`Reduce the fraction (divide top and bottom by $ {{g}} $): $ \frac{ {{n}}\pi }{ {{m}} } $`] });
  T('trig-conv', 'easier', r`Convert $ {{d}}^\circ $ to radians.`, r`\frac{\pi}{ {{m}} }`, { params: { d: '30,45,60,90' }, derived: { m: '180/d' }, lowVariety: true });
  T('trig-conv', 'easier', r`Convert $ \frac{\pi}{ {{m}} } $ radians to degrees.`, r`{{d}}^\circ`, { params: { m: '2,3,4,6' }, derived: { d: '180/m' }, lowVariety: true });
  T('trig-conv', 'parallel', r`Convert $ {{d}}^\circ $ to radians.`, r`\frac{ {{n}}\pi }{ {{m}} }`, { params: { d: '120,135,150,210,225,240,270,300,315,330' }, derived: { g: 'gcd(d,180)', n: 'd/g', m: '180/g' } });
  T('trig-conv', 'parallel', r`Convert $ \frac{ {{n}}\pi }{ {{m}} } $ radians to degrees.`, r`{{n*180/m}}^\circ`, { params: { m: '3,4,5,6,8,9', n: '2..11' }, constraints: ['n < 2*m', 'gcd(n,m) == 1', 'n != 1', 'mod(180,m) == 0'] });
  T('trig-conv', 'parallel', r`Convert $ -{{d}}^\circ $ to radians.`, r`-\frac{ {{n}}\pi }{ {{m}} }`, { params: { d: '120,135,150,210,225,240,300,315,330' }, derived: { g: 'gcd(d,180)', n: 'd/g', m: '180/g' } });
  T('trig-conv', 'challenge', r`Convert $ {{d}}^\circ $ to radians.`, r`\frac{ {{n}}\pi }{ {{m}} }`, { params: { d: '390,405,420,450,480,495,510' }, derived: { g: 'gcd(d,180)', n: 'd/g', m: '180/g' } });
  T('trig-conv', 'challenge', r`Convert $ \frac{ {{n}}\pi }{ {{m}} } $ radians to degrees.`, r`{{n*180/m}}^\circ`, { params: { m: '3,4,5,6', n: '13..29' }, constraints: ['gcd(n,m) == 1', 'mod(180,m) == 0'] });

  /* ---------- exact values ---------- */
  skill('trig-exact', 'Exact trig values on the unit circle', TR);
  const mk = (tier, f, d, asRad) => T('trig-exact', tier, 'Find the exact value of $ \\' + f + '\\left(' + (asRad ? radStr(d) : degStr(d)) + '\\right) $.', val(f, d), { lowVariety: true });
  // (the replace calls above just build "\sin\left(30^\circ\right)")
  for (const d of [0, 30, 45, 60, 90]) { mk('easier', 'sin', d, false); mk('easier', 'cos', d, false); }
  for (const d of ANG) for (const f of ['sin', 'cos', 'tan']) { mk('parallel', f, d, false); mk('parallel', f, d, true); }
  for (const d of ANG.filter((x) => x % 90)) for (const f of ['csc', 'sec', 'cot']) mk('challenge', f, d, d % 2 ? false : true);
  for (const f of ['sin', 'cos']) mk('worked', f, 150, false), mk('worked', f, 225, false);
  RB.templates.filter((t) => t.skill === 'trig-exact' && t.tier === 'worked').forEach((t) => { t.steps = [r`Find the reference angle (the acute angle to the $x$-axis) and the quadrant.`, r`Use the unit circle: the coordinates of the point are $ (\cos\theta, \sin\theta) $, with signs set by the quadrant.`, r`Exact value: $ ` + t.answer + ' $']; });

  /* ---------- quadrants, reference angles, coterminal ---------- */
  skill('trig-ref', 'Reference angles and coterminal angles', TR);
  T('trig-ref', 'worked', r`Find the reference angle for $ {{d}}^\circ $.`, r`{{180-d}}^\circ`, { params: { d: '100..170' }, steps: [r`$ {{d}}^\circ $ is between $90^\circ$ and $180^\circ$, so it is in Quadrant II.`, r`In Quadrant II the reference angle is $180^\circ - \theta$: $ 180 - {{d}} = {{180-d}} $.`] });
  T('trig-ref', 'easier', r`In which quadrant does an angle of $ {{d}}^\circ $ lie?`, r`\text{Quadrant I}`, { params: { d: '10..80' } });
  T('trig-ref', 'easier', r`In which quadrant does an angle of $ {{d}}^\circ $ lie?`, r`\text{Quadrant II}`, { params: { d: '100..170' } });
  T('trig-ref', 'easier', r`In which quadrant does an angle of $ {{d}}^\circ $ lie?`, r`\text{Quadrant III}`, { params: { d: '190..260' } });
  T('trig-ref', 'easier', r`In which quadrant does an angle of $ {{d}}^\circ $ lie?`, r`\text{Quadrant IV}`, { params: { d: '280..350' } });
  T('trig-ref', 'parallel', r`Find the reference angle for $ {{d}}^\circ $.`, r`{{180-d}}^\circ`, { params: { d: '95..175' } });
  T('trig-ref', 'parallel', r`Find the reference angle for $ {{d}}^\circ $.`, r`{{d-180}}^\circ`, { params: { d: '185..265' } });
  T('trig-ref', 'parallel', r`Find the reference angle for $ {{d}}^\circ $.`, r`{{360-d}}^\circ`, { params: { d: '275..355' } });
  T('trig-ref', 'parallel', r`Find an angle between $ 0^\circ $ and $ 360^\circ $ that is coterminal with $ {{t}}^\circ $.`, r`{{d}}^\circ`, { params: { d: '10..350', k: '1..3' }, derived: { t: 'd+360*k' } });
  T('trig-ref', 'parallel', r`Find an angle between $ 0^\circ $ and $ 360^\circ $ that is coterminal with $ {{t}}^\circ $.`, r`{{d}}^\circ`, { params: { d: '10..350', k: '1..3' }, derived: { t: 'd-360*k' } });
  T('trig-ref', 'challenge', r`Find the reference angle for $ -{{d}}^\circ $.`, r`{{360-d}}^\circ`, { params: { d: '280..350' } });
  T('trig-ref', 'challenge', r`Find the reference angle for $ {{t}}^\circ $.`, r`{{d-180}}^\circ`, { params: { d: '185..265', k: '1..2' }, derived: { t: 'd+360*k' } });
  T('trig-ref', 'challenge', r`Find the reference angle for $ {{t}}^\circ $.`, r`{{360-d}}^\circ`, { params: { d: '275..355', k: '1..2' }, derived: { t: 'd+360*k' } });

  /* ---------- trig ratios from a point ---------- */
  skill('trig-pt', 'Trig ratios from a point on the terminal side', TR);
  const TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [4, 3, 5], [12, 5, 13]];
  const quad = (sx, sy) => (sx > 0 && sy > 0 ? 'I' : sx < 0 && sy > 0 ? 'II' : sx < 0 && sy < 0 ? 'III' : 'IV');
  const pp = { sx: '-1,1', sy: '-1,1', m: '1..3' };
  TRI.forEach(([a, b, c], i) => {
    const pt = '( {{sx*' + a + '*m}}, {{sy*' + b + '*m}} )';
    const base = (fn, ans, tier, ex) => T('trig-pt', tier, 'The point $ ' + pt + ' $ is on the terminal side of an angle $ \\theta $ in standard position. Find $ \\' + fn + '\\theta $.', ans, Object.assign({ params: pp, derived: { rr: c + '*m' } }, ex || {}));
    const S = `{{sy*${b}/${c}}}`, Co = `{{sx*${a}/${c}}}`, Ta = `{{sy*${b}/(sx*${a})}}`;
    if (i < 4) { base('sin', S, 'parallel'); base('cos', Co, 'parallel'); base('tan', Ta, 'parallel'); }
    if (i === 0) { base('sin', S, 'worked', { steps: [r`The distance from the origin is $ r = \sqrt{x^2 + y^2} = {{rr}} $.`, r`$ \sin\theta = \frac{y}{r} $, $ \cos\theta = \frac{x}{r} $, $ \tan\theta = \frac{y}{x} $.`, r`Substitute and reduce.`] }); base('cos', Co, 'easier'); base('sin', S, 'easier'); }
    if (i === 1) { base('tan', Ta, 'easier'); base('cos', Co, 'worked', { steps: [r`The distance from the origin is $ r = \sqrt{x^2 + y^2} = {{rr}} $.`, r`$ \cos\theta = \frac{x}{r} $. Reduce the fraction.`] }); }
    if (i >= 2 && i < 4) base('sin', S, 'easier');
  });
  // given one ratio and the quadrant, find another
  for (const [a, b, c] of TRI.slice(0, 4)) for (const [sx, sy] of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
    T('trig-pt', 'challenge', 'If $ \\sin\\theta = ' + (sy < 0 ? '-' : '') + '\\frac{' + b + '}{' + c + '} $ and $ \\theta $ is in Quadrant ' + quad(sx, sy) + ', find $ \\cos\\theta $.', (sx < 0 ? '-' : '') + '\\frac{' + a + '}{' + c + '}', { lowVariety: true });
  }
  /* ---------- solving trig equations on [0, 360) ---------- */
  skill('trig-eq', 'Solving basic trig equations', TR);
  const sols = {};
  ['sin', 'cos', 'tan'].forEach((f) => ANG.forEach((d) => { const v = FN[f](d); if (!Number.isFinite(v) || Math.abs(v) > 1e6) return; const k = f + '|' + v.toFixed(6); (sols[k] = sols[k] || { f, d: [], v: val(f, d) }).d.push(d); }));
  Object.values(sols).forEach((s) => {
    const ans = '\\theta = ' + s.d.map((d) => d + '^\\circ').join(',\\ ');
    const q = 'Solve for $ \\theta $ in $ [0^\\circ, 360^\\circ) $: $ \\' + s.f + '\\theta = ' + s.v + ' $.';
    const easy = s.d.length === 2 && !/sqrt|tan/.test(s.v + s.f) && !s.v.startsWith('-');
    T('trig-eq', easy ? 'easier' : 'parallel', q, ans, { lowVariety: true });
    if (s.d.length === 2) T('trig-eq', 'challenge', 'Solve for $ \\theta $ in radians on $ [0, 2\\pi) $: $ \\' + s.f + '\\theta = ' + s.v + ' $.', '\\theta = ' + s.d.map(radStr).join(',\\ '), { lowVariety: true });
  });
  T('trig-eq', 'worked', r`Solve for $ \theta $ in $ [0^\circ, 360^\circ) $: $ \sin\theta = \frac{1}{2} $.`, r`\theta = 30^\circ,\ 150^\circ`, { lowVariety: true, steps: [r`$ \sin 30^\circ = \frac{1}{2} $, so one solution is $ 30^\circ $ (Quadrant I).`, r`Sine is also positive in Quadrant II, where the reference angle is $ 30^\circ $: $ 180^\circ - 30^\circ = 150^\circ $.`, r`Solutions: $ 30^\circ $ and $ 150^\circ $.`] });
})();
