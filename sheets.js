/* Builds the data for printable reteach sheets. No DOM — the app renders the result.
 * buildPacket({ test, roster, templates, skills, options, setCode }) -> [{ student, items:[...] }]
 *   test:      { name, items: [{ n: '1', skill: 'two-step' }, ...] }
 *   roster:    [{ name: 'Ava', missed: ['2', '5'] }, ...]
 *   templates: every available template (hidden ones already removed)
 *   skills:    [{ id, name, unit }]
 *   options:   { counts: { worked: 1, easier: 1, parallel: 1, challenge: 0 } }
 *   setCode:   any string; same code + same names => identical sheets (so a lost sheet can be reprinted)
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./engine.js'));
  else root.ReteachSheets = factory(root.ReteachEngine);
})(typeof self !== 'undefined' ? self : this, function (E) {
  'use strict';

  const byItem = (a, b) => String(a.n).localeCompare(String(b.n), undefined, { numeric: true });

  function buildPacket({ test, roster, templates, skills, options, setCode }) {
    const pools = {};
    for (const t of templates) (pools[t.skill + '|' + t.tier] = pools[t.skill + '|' + t.tier] || []).push(t);
    const skillName = (id) => { const s = skills.find((k) => k.id === id); return s ? s.name : id; };
    const out = [];
    for (const stu of roster) {
      const missed = new Set((stu.missed || []).map(String));
      const items = test.items.filter((it) => missed.has(String(it.n))).sort(byItem);
      if (!items.length) continue;
      const used = new Set();
      const blocks = items.map((it) => {
        if (!it.skill) return { n: it.n, skill: null, name: null, tiers: [], warning: 'No skill chosen for this item.' };
        const tiers = [];
        for (const tier of E.TIERS) {
          const count = (options.counts && options.counts[tier]) || 0;
          if (!count) continue;
          const pool = pools[it.skill + '|' + tier] || [];
          if (!pool.length) continue;
          const seed = [setCode, stu.name, it.n, tier].join('|');
          tiers.push({ tier, label: E.TIER_LABEL[tier], problems: E.buildTier(pool, tier === 'worked' ? 1 : count, seed, used) });
        }
        const warning = tiers.length ? null : 'No practice problems are available for this skill yet.';
        return { n: it.n, skill: it.skill, name: skillName(it.skill), tiers, warning };
      });
      out.push({ student: stu.name, items: blocks });
    }
    return out;
  }

  return { buildPacket, byItem };
});
