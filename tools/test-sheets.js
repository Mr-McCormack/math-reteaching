// Tests for sheet building. Run: node tools/test-sheets.js
const E = require('../engine.js'), S = require('../sheets.js'), RB = require('./load-bank.js')();
let fails = 0; const eq = (n, g, w) => { if (g !== w) { fails++; console.log('FAIL', n, '\n  got ', JSON.stringify(g), '\n  want', JSON.stringify(w)); } };
const test = { name: 'Unit 4 Quiz', items: [{ n: '1', skill: 'one-step' }, { n: '2', skill: 'two-step' }, { n: '10', skill: 'two-step' }, { n: '3', skill: '' }, { n: '4', skill: 'two-step' }] };
const opts = { counts: { worked: 1, easier: 1, parallel: 2, challenge: 0 } };
const mk = (roster, code) => S.buildPacket({ test, roster, templates: RB.templates, skills: RB.skills, options: opts, setCode: code || 'A1' });

const p = mk([{ name: 'Ava', missed: ['10', '2', '1', '3'] }, { name: 'Ben', missed: [] }, { name: 'Cy', missed: ['2'] }]);
eq('students with no misses are skipped', p.map((x) => x.student).join(','), 'Ava,Cy');
eq('items sorted numerically (2 before 10)', p[0].items.map((i) => i.n).join(','), '1,2,3,10');
eq('missing skill is flagged', !!p[0].items[2].warning, true);
const two = p[0].items[1];
eq('tier order', two.tiers.map((t) => t.tier).join(','), 'worked,easier,parallel');
eq('worked count is always 1', two.tiers[0].problems.length, 1);
eq('parallel count honored', two.tiers[2].problems.length, 2);
eq('challenge omitted when 0', two.tiers.some((t) => t.tier === 'challenge'), false);
// same set code => identical, different set code => different
eq('reproducible', JSON.stringify(mk([{ name: 'Cy', missed: ['2'] }])), JSON.stringify(mk([{ name: 'Cy', missed: ['2'] }])));
eq('new set code changes numbers', JSON.stringify(mk([{ name: 'Cy', missed: ['2'] }], 'B2')) !== JSON.stringify(mk([{ name: 'Cy', missed: ['2'] }])), true);
// different students get different problems for the same item
const ava2 = p[0].items[1].tiers[2].problems.map((x) => x.prompt).join('|'), cy2 = p[1].items[0].tiers[2].problems.map((x) => x.prompt).join('|');
eq('two students get different problems', ava2 !== cy2, true);
// one student, same skill twice (items 2, 4, 10): no repeated prompt anywhere on that sheet
const q = mk([{ name: 'Dee', missed: ['2', '4', '10'] }])[0];
const prompts = q.items.flatMap((i) => i.tiers.flatMap((t) => t.problems.map((x) => x.prompt)));
eq('no repeated prompt on one student sheet', new Set(prompts).size, prompts.length);
// a skill with no templates in some tier is tolerated
const odd = S.buildPacket({ test: { name: 't', items: [{ n: '1', skill: 'x' }] }, roster: [{ name: 'A', missed: ['1'] }], templates: [], skills: [{ id: 'x', name: 'X' }], options: opts, setCode: 'z' });
eq('empty pool gives a warning, not a crash', odd[0].items[0].warning, 'No practice problems are available for this skill yet.');
console.log(fails ? fails + ' FAILED' : 'sheets: all tests passed'); process.exit(fails ? 1 : 0);
