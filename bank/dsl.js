/* Bank helpers. Each file in /bank registers skills and templates with:
 *   skill(id, name, unit)
 *   T(skillId, tier, prompt, answer, { params, derived, constraints, steps })
 * Tiers: worked | easier | parallel | challenge   (see engine.js for the template format)
 * To add your own questions, copy any file in /bank, edit it, and list it in index.html. */
(function (g) {
  const RB = (g.RB = g.RB || { skills: [], templates: [], _n: {} });
  RB.skill = function (id, name, unit) { RB.skills.push({ id, name, unit }); };
  RB.T = function (skill, tier, prompt, answer, o) {
    const k = skill + '-' + tier;
    RB._n[k] = (RB._n[k] || 0) + 1;
    RB.templates.push(Object.assign({ id: k + '-' + RB._n[k], skill, tier, prompt, answer }, o || {}));
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
