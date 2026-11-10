// Exercises the builder + exporters on EVERY skill; writes sample files into $OUT (default /tmp/exp) for LibreOffice / pdfLaTeX checks.
const fs = require('fs'), path = require('path');
const RB = require('./load-bank.js')(), B = require('../builder/builder.js'), X = require('../builder/export.js'), E = require('../engine.js');
const OUT = process.env.OUT || '/tmp/exp'; fs.mkdirSync(OUT, { recursive: true });
let bad = 0; const fail = (m) => { bad++; console.log('FAIL', m); };
// 1. every bank problem converts to Word math without unknown commands
const warns = new Set();
for (const t of RB.templates) for (let i = 0; i < 3; i++) { const g = E.generate(t, 'x' + i); for (const s of [g.prompt, g.answer, ...g.steps]) E.splitMath(s).forEach((seg) => { if (seg.type === 'math') X.omml(seg.s, (m) => warns.add(m + ' in ' + t.id)); }); }
if (warns.size) fail([...warns].slice(0, 10).join('\n'));
// 2. zip round trip
const z = X.zip([{ name: 'a.txt', data: 'hello' }, { name: 'd/b.bin', data: Uint8Array.from([1, 2, 3, 250]) }]);
fs.writeFileSync(path.join(OUT, 'z.zip'), z);
// 3. one question per skill, 3 versions, shuffled
const slots = RB.skills.map((s, i) => ({ id: 's' + i, skill: s.id, tiers: ['parallel', 'challenge'], pts: 3, type: i % 2 ? 'mc' : 'free' }));
const versions = B.build({ slots, versions: 3, seed: 'T', templates: RB.templates, shuffle: true });
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
const imgs = {}; versions.forEach((v) => v.questions.forEach((q) => (q.graphs || []).forEach((g, i) => { imgs[X.imgKey(v, q, i)] = { bytes: new Uint8Array(png), w: 300, h: 300 }; })));
const doc = { title: 'Export Test', school: 'Test School', course: 'Advanced Algebra', teacher: 'J. McCormack, M.Ed.', instructions: 'Show your work. **Circle** answers.', showPoints: true, gradeSheet: true, versions };
const out = X.exportAll(doc, imgs, { word: true, latex: true, key: true, retest: true }, '{}', (m) => fail(m));
fs.writeFileSync(path.join(OUT, 'all.zip'), out);
const mcN = versions[0].questions.filter((q) => q.type === 'mc').length, failN = versions[0].questions.filter((q) => q.mcFailed).length; console.log('multiple choice:', mcN, 'could not make choices:', failN);
if (mcN < 20) fail('too few multiple-choice questions');
console.log('ok; written to', OUT, 'questions per version', slots.length, 'bad', bad);
process.exit(bad ? 1 : 0);
