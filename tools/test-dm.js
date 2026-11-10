const DM = require('../deltamath/dm.js');
global.window = {}; require('../deltamath/skills.js'); require('../deltamath/map.js');
const inv = window.DMINV, map = window.DMMAP;
const assert = require('assert');
// inventory / map integrity
const names = new Set(inv.skills.map((r) => r.n));
let bad = 0; Object.entries(map).forEach(([k, v]) => v.dm.forEach((n) => { if (!names.has(n)) { bad++; console.log('MISSING', k, n); } }));
assert.equal(bad, 0);
require('../engine.js'); global.RB = undefined; global.globalThis.RB = undefined;
// grouping
const items = [{ n: '1', skill: 'a' }, { n: '2', skill: 'b' }, { n: '3', skill: 'c' }, { n: '4', skill: 'none' }];
const dm = { a: ['X', 'Y'], b: ['Y', 'Z'], c: ['W'] };
const dmOf = (it) => dm[it.skill] || [];
const roster = [
  { name: 'A', missed: ['1', '2'] }, { name: 'B', missed: ['1'] }, { name: 'C', missed: ['1', '2', '3'] },
  { name: 'D', missed: ['3'] }, { name: 'E', missed: ['4'] }, { name: 'F', missed: [] }];
const r = DM.groupStudents(items, roster, dmOf);
console.log(JSON.stringify(r, null, 1));
assert.equal(r.groups.length, 2);
assert.deepEqual(r.groups[0].students, ['A', 'B', 'C']);
assert.deepEqual(r.groups[0].skills.map((s) => s.name), ['X', 'Y', 'Z']); // item 2 missed by 2/3 > half; Y once
assert.deepEqual(r.groups[0].skills.find((s) => s.name === 'Y').from, ['1', '2']);
assert.deepEqual(r.groups[0].notCovered, [{ name: 'C', items: ['3'] }]);
assert.deepEqual(r.groups[1].students, ['D']);
assert.deepEqual(r.unmapped, [{ n: '4', count: 1 }]);
assert.equal(DM.search(inv, 'quadratic formula').length > 0, true);
assert.equal(DM.search(inv, 'log', 'AA').every((x) => x.c.includes('AA')), true);
console.log('DM tests OK; skills', inv.skills.length, 'mapped bank skills', Object.keys(map).length);
