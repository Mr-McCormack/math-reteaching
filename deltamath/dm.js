/* DeltaMath helpers (no DOM). Loaded after skills.js and map.js.
 *   ReteachDM.search(inv, query, course)  -> matching inventory rows [{n, c, s}]
 *   ReteachDM.groupStudents(items, roster, dmOf) -> { groups, unmapped }
 * Grouping rule: take the item missed by the most remaining students; its students form a group. The group also
 * gets every other item that MORE THAN HALF of the group's students missed. Then those students are removed and
 * the process repeats. Each skill name appears once per group even if several items map to it.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ReteachDM = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function search(inv, query, course) {
    const words = String(query || '').toLowerCase().split(/\s+/).filter(Boolean);
    return inv.skills.filter((r) => {
      if (course && !r.c.includes(course)) return false;
      const hay = (r.n + ' ' + r.s.join(' ')).toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }

  function groupStudents(items, roster, dmOf) {
    const mapped = items.filter((it) => dmOf(it).length);
    const key = (it) => String(it.n);
    const missedMap = (stu) => new Set((stu.missed || []).map(String));
    let pool = roster.filter((s) => mapped.some((it) => missedMap(s).has(key(it))));
    const unmapped = items.filter((it) => !dmOf(it).length && roster.some((s) => missedMap(s).has(key(it)))).map((it) => ({ n: it.n, count: roster.filter((s) => missedMap(s).has(key(it))).length }));
    const groups = [];
    while (pool.length) {
      let best = null, bestN = 0;
      for (const it of mapped) {
        const n = pool.filter((s) => missedMap(s).has(key(it))).length;
        if (n > bestN) { best = it; bestN = n; }
      }
      if (!best) break;
      const members = pool.filter((s) => missedMap(s).has(key(best)));
      const counts = {};
      mapped.forEach((it) => { counts[key(it)] = members.filter((s) => missedMap(s).has(key(it))).length; });
      const extras = mapped.filter((it) => it !== best && counts[key(it)] * 2 > members.length);
      const chosen = [best].concat(extras);
      const skills = [];
      chosen.forEach((it) => dmOf(it).forEach((name) => {
        let e = skills.find((x) => x.name === name);
        if (!e) skills.push(e = { name, from: [] });
        if (!e.from.includes(it.n)) e.from.push(it.n);
      }));
      const covered = new Set(chosen.map(key));
      const notCovered = members.map((s) => ({ name: s.name, items: mapped.filter((it) => missedMap(s).has(key(it)) && !covered.has(key(it))).map((it) => it.n) })).filter((x) => x.items.length);
      groups.push({ main: best, extras, students: members.map((s) => s.name), skills, counts, notCovered });
      pool = pool.filter((s) => !members.includes(s));
    }
    return { groups, unmapped };
  }

  return { search, groupStudents };
});
