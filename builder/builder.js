/* Test builder core. No DOM. Pulls questions from the same bank the Reteach sheets use.
 * ReteachBuilder.build({ slots, versions, seed, templates, shuffle }) -> [{ label, questions:[...] }]
 *   slot: { id, skill, tiers:['parallel'], tplId?:'pinned template id', reroll:0, pts:4, space:1.6 (inches of work room) }
 *   Same seed + same slots => the same test every time. Each version (A, B, ...) gets different numbers.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('../engine.js'), require('./choices.js'));
  else root.ReteachBuilder = factory(root.ReteachEngine, root.ReteachChoices);
})(typeof self !== 'undefined' ? self : this, function (E, CH) {
  'use strict';
  const LABELS = 'ABCDEFGH';
  const DEFAULT_SPACE = { easier: 1.2, parallel: 1.6, challenge: 2.2, worked: 1.6 };
  const spaceFor = (tiers, hasGraph) => (DEFAULT_SPACE[(tiers && tiers[tiers.length - 1]) || 'parallel'] || 1.6) + (hasGraph ? 0.4 : 0);

  function poolFor(slot, templates) {
    const tiers = (slot.tiers && slot.tiers.length ? slot.tiers : ['parallel']);
    let pool = templates.filter((t) => t.skill === slot.skill && tiers.includes(t.tier));
    if (!pool.length) pool = templates.filter((t) => t.skill === slot.skill && t.tier !== 'worked');
    return pool;
  }

  function makeQuestion(slot, label, templates, byId, usedPrompts, tag) {
    const base = [tag || 'T', label, slot.id, slot.reroll || 0].join('|');
    let tpl = slot.tplId ? byId[slot.tplId] : null;
    const pool = tpl ? [tpl] : poolFor(slot, templates);
    if (!pool.length) return { slotId: slot.id, skill: slot.skill, tplId: null, missing: true, prompt: '(No questions are available for this skill yet.)', answer: '', steps: [], graphs: [] };
    let g = null;
    for (let t = 0; t < 16; t++) {
      const seed = base + '|' + t;
      const pick = tpl || pool[Math.floor(E.makeRng(seed + '|pick')() * pool.length)];
      g = E.generate(pick, seed); g._tpl = pick.id;
      if (!usedPrompts.has(g.prompt)) break;
    }
    usedPrompts.add(g.prompt);
    const q = { slotId: slot.id, skill: slot.skill, tier: g.tier, tplId: g._tpl, prompt: g.prompt, answer: g.answer, steps: g.steps, graphs: g.graphs || [], type: 'free' };
    if (slot.type === 'mc') {
      const used = byId[g._tpl];
      if (CH.eligible(g.prompt, g.answer) && used) {
        const sibs = []; for (let k = 0; k < 12; k++) { try { sibs.push(E.generate(used, base + '|sib' + k).answer); } catch (e) { /* skip */ } }
        const r = (g.distractors && g.distractors.length >= 2 ? CH.assemble(g.answer, g.distractors, base + '|mc' + (slot.mcRe || 0), 4) : null) || CH.makeChoices(g.answer, sibs, base + '|mc' + (slot.mcRe || 0), 4);
        if (r) { q.type = 'mc'; q.choices = r.choices; q.correct = r.correct; q.letter = 'ABCD'[r.correct]; }
      }
      if (q.type !== 'mc') q.mcFailed = true;
    }
    return q;
  }

  function build({ slots, versions, seed, templates, templatesById, shuffle }) {
    const byId = templatesById || {}; if (!templatesById) templates.forEach((t) => { byId[t.id] = t; });
    const nVer = Math.max(1, Math.min(LABELS.length, versions || 1));
    const out = [];
    const usedAcross = {}; // per slot: prompts already shown in an earlier version
    for (let v = 0; v < nVer; v++) {
      const label = LABELS[v];
      const used = new Set();
      let order = slots.slice();
      if (shuffle && v > 0) order = E.makeRng === undefined ? order : shuffleSeeded(order, seed + '|order|' + label);
      const questions = order.map((slot, i) => {
        const seen = usedAcross[slot.id] = usedAcross[slot.id] || new Set();
        const prior = new Set([...used, ...seen]);
        const q = makeQuestion(slot, label, templates, byId, prior, seed);
        used.add(q.prompt); seen.add(q.prompt);
        q.n = i + 1; q.pts = slot.pts == null ? 4 : slot.pts;
        q.space = slot.space != null ? slot.space : (q.type === 'mc' ? 0.8 : spaceFor(slot.tiers, q.graphs && q.graphs.length));
        return q;
      });
      out.push({ label, questions });
    }
    return out;
  }

  function shuffleSeeded(arr, seed) { const rng = E.makeRng(seed), a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  const totalPoints = (version) => version.questions.reduce((s, q) => s + (+q.pts || 0), 0);

  return { build, totalPoints, LABELS, spaceFor, poolFor };
});
