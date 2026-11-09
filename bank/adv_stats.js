/* Advanced Algebra — normal distribution (z-scores and the empirical rule) */
(function () {
  const { skill, T } = RB;
  const r = String.raw, ST = 'Adv. Algebra: statistics';

  skill('z-score', 'Finding a z-score', ST);
  T('z-score', 'worked', r`A test has a mean of $ {{mu}} $ and a standard deviation of $ {{s}} $. Find the z-score for a score of $ {{x}} $.`, r`z = {{k}}`, { params: { mu: '60,65,70,75,80', s: '4,5,6,8,10', k: '-3..3 !0' }, derived: { x: 'mu+k*s' },
    steps: [r`Use $ z = \frac{x - \mu}{\sigma} $.`, r`$ z = \frac{ {{x}} - {{mu}} }{ {{s}} } = \frac{ {{x-mu}} }{ {{s}} } = {{k}} $`] });
  T('z-score', 'easier', r`The mean is $ {{mu}} $ and the standard deviation is $ {{s}} $. Find the z-score for $ x = {{x}} $.`, r`z = {{k}}`, { params: { mu: '50,60,70,80,100', s: '5,10', k: '1..3' }, derived: { x: 'mu+k*s' } });
  T('z-score', 'easier', r`The mean is $ {{mu}} $ and the standard deviation is $ {{s}} $. Find the z-score for $ x = {{x}} $.`, r`z = {{k}}`, { params: { mu: '50,60,70,80,100', s: '5,10', k: '-3..-1' }, derived: { x: 'mu+k*s' } });
  T('z-score', 'parallel', r`The mean is $ {{mu}} $ and the standard deviation is $ {{s}} $. Find the z-score for $ x = {{x}} $.`, r`z = {{k}}`, { params: { mu: '40..90', s: '3,4,6,7,9,12', k: '-3..3 !0' }, derived: { x: 'mu+k*s' } });
  T('z-score', 'parallel', r`Find the x-value that has a z-score of $ {{k}} $ when the mean is $ {{mu}} $ and the standard deviation is $ {{s}} $.`, r`x = {{mu+k*s}}`, { params: { mu: '40..90', s: '3,4,5,6,8,10', k: '-3..3 !0' } });
  T('z-score', 'parallel', r`Scores on an exam have mean $ {{mu}} $ and standard deviation $ {{s}} $. Find the z-score of a score of $ {{x}} $.`, r`z = {{k}}`, { params: { mu: '60..85', s: '5,6,8,10', k: '-3..3 !0' }, derived: { x: 'mu+k*s' } });
  T('z-score', 'parallel', r`A value has $ z = {{k}} $. If the standard deviation is $ {{s}} $ and the value is $ {{x}} $, what is the mean?`, r`\mu = {{mu}}`, { params: { mu: '40..90', s: '3,4,5,6,8,10', k: '-3..3 !0' }, derived: { x: 'mu+k*s' } });
  T('z-score', 'challenge', r`Student A scored $ {{xa}} $ on a test with mean $ {{ma}} $ and standard deviation $ {{sa}} $. Student B scored $ {{xb}} $ on a test with mean $ {{mb}} $ and standard deviation $ {{sb}} $. Who did better relative to their class?`, r`\text{Student A } (z = {{ka}}) \text{ — higher } z`, { params: { ma: '60,70,80', sa: '5,10', ka: '1..2', mb: '60,70,80', sb: '4,8', kb: '-1..0' }, derived: { xa: 'ma+ka*sa', xb: 'mb+kb*sb' }, constraints: ['ka > kb'] });
  T('z-score', 'challenge', r`A value has $ z = {{k}} $. If the mean is $ {{mu}} $ and the value is $ {{x}} $, find the standard deviation.`, r`\sigma = {{s}}`, { params: { mu: '40..90', s: '3,4,5,6,8,10', k: '-3..3 !0' }, derived: { x: 'mu+k*s' } });

  skill('emp-rule', 'Empirical rule (68-95-99.7)', ST);
  T('emp-rule', 'worked', r`Heights are normally distributed with mean $ {{mu}} $ in. and standard deviation $ {{s}} $ in. About what percent of heights are between $ {{lo}} $ and $ {{hi}} $ inches?`, r`95\%`, { params: { mu: '60..70', s: '2,3' }, derived: { lo: 'mu-2*s', hi: 'mu+2*s' },
    steps: [r`$ {{lo}} = {{mu}} - 2({{s}}) $ and $ {{hi}} = {{mu}} + 2({{s}}) $, so the interval is within 2 standard deviations of the mean.`, r`The empirical rule says about $95\%$ of data lie within 2 standard deviations.`] });
  T('emp-rule', 'easier', r`In a normal distribution, about what percent of the data lie within 1 standard deviation of the mean?`, r`68\%`, { lowVariety: true });
  T('emp-rule', 'easier', r`In a normal distribution, about what percent of the data lie within 2 standard deviations of the mean?`, r`95\%`, { lowVariety: true });
  T('emp-rule', 'easier', r`In a normal distribution, about what percent of the data lie within 3 standard deviations of the mean?`, r`99.7\%`, { lowVariety: true });
  const win = (j, ans) => T('emp-rule', 'parallel', r`Data are normally distributed with mean $ {{mu}} $ and standard deviation $ {{s}} $. About what percent of the data are between $ {{lo}} $ and $ {{hi}} $?`, ans, { params: { mu: '40..90', s: '3,4,5,6,8,10' }, derived: { lo: 'mu-' + j + '*s', hi: 'mu+' + j + '*s' } });
  win(1, r`68\%`); win(2, r`95\%`); win(3, r`99.7\%`);
  const side = (lo, hi, ans, txt) => T('emp-rule', 'parallel', r`Data are normally distributed with mean $ {{mu}} $ and standard deviation $ {{s}} $. About what percent of the data are ` + txt + `?`, ans, { params: { mu: '40..90', s: '3,4,5,6,8,10' }, derived: { a: 'mu+' + (lo) + '*s', b: 'mu+' + (hi) + '*s', t1: 'mu+1*s', t2: 'mu+2*s', t3: 'mu+3*s', n1: 'mu-1*s', n2: 'mu-2*s' } });
  side(0, 0, r`50\%`, r`above $ {{mu}} $`);
  side(0, 0, r`84\%`, r`below $ {{t1}} $`);
  side(0, 0, r`16\%`, r`below $ {{n1}} $`);
  side(0, 0, r`2.5\%`, r`above $ {{t2}} $`);
  side(0, 0, r`97.5\%`, r`below $ {{t2}} $`);
  side(0, 0, r`34\%`, r`between $ {{mu}} $ and $ {{t1}} $`);
  side(0, 0, r`47.5\%`, r`between $ {{mu}} $ and $ {{t2}} $`);
  side(0, 0, r`81.5\%`, r`between $ {{n1}} $ and $ {{t2}} $`);
  T('emp-rule', 'challenge', r`The weights of a certain fruit are normally distributed with mean $ {{mu}} $ g and standard deviation $ {{s}} $ g. In a shipment of $ {{N}} $ pieces, about how many weigh between $ {{lo}} $ and $ {{hi}} $ g?`, r`{{N*95/100}}`, { params: { mu: '100,150,200', s: '5,10,20', q: '1..5' }, derived: { N: '200*q', lo: 'mu-2*s', hi: 'mu+2*s' } });
  T('emp-rule', 'challenge', r`Test scores are normally distributed with mean $ {{mu}} $ and standard deviation $ {{s}} $. Out of $ {{N}} $ students, about how many scored above $ {{t2}} $?`, r`{{N*25/1000}}`, { params: { mu: '60,70,75,80', s: '4,5,6,8', q: '1..5' }, derived: { N: '200*q', t2: 'mu+2*s' } });
  T('emp-rule', 'challenge', r`Data are normally distributed with mean $ {{mu}} $ and standard deviation $ {{s}} $. About what percent of the data are between $ {{n1}} $ and $ {{t3}} $?`, r`83.85\%`, { params: { mu: '40..90', s: '3,4,5,6,8,10' }, derived: { n1: 'mu-1*s', t3: 'mu+3*s' } });
})();
