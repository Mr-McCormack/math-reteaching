# Reteach Sheets

A free, no-account web tool for individualized reteaching after a test.

1. **Tests** – list your test's item numbers and pick the skill each one checks.
2. **Mark misses** – paste a roster, then tick the items each student missed on their paper test.
3. **Print sheets** – every student gets a sheet with, for each missed item, a worked example, an easier warm-up, and problems like the test (optional challenge). New numbers for every student. A matching teacher answer key prints separately.

Everything runs in the browser. Student names are stored only in that browser (localStorage) and are never uploaded. Sheets are printed, so students without computers are covered.

## Put it on GitHub Pages
1. Create a repository and upload everything in this folder (keep the folder structure).
2. Settings → Pages → Deploy from branch → `main` / root.
3. Open `https://YOUR-NAME.github.io/REPO/`.

It also works by double-clicking `index.html` (the shared-bank and online math keyboard features need a web address).

## Working with your colleagues
- **Share a test:** Tests tab → *Export*, send the file, they use *Import a shared test*. Student names are never included.
- **Share questions:** Question bank → *Export my additions* → send the file → *Import*.
- **Department-wide bank:** put approved questions in `shared-bank.json` (same format as an export, with `"skills"` and `"templates"`). It loads for everyone automatically from your Pages site.
- **Back up:** *Back up everything* saves tests, marks and questions in one file. Browser data can be cleared, so do this now and then.

## The math keyboard
*Question bank → + New question* opens an editor with a math keyboard (MathLive). Type words in “words” boxes and math in “math” boxes; the LaTeX is made for you. If the keyboard can’t load (offline), choose *Type LaTeX / text*. To make it work offline, put MathLive’s `mathlive.min.js` and its `fonts/` folder in `vendor/mathlive/`.

“New numbers for each student” questions use a few simple lines:
```
Numbers:     a = -9..9 !0        (range, leaving out 0)   or   b = 2,3,5
Calculated:  c = a*x
Rules:       a != b
```
Click a variable name to drop it into the question. Display options: plain, with +/−, coefficient (hides a 1), parentheses.

## Adding stock questions in code
Copy any file in `bank/`, edit it, and add a `<script>` line for it in `index.html`. Each template looks like:
```js
T('two-step', 'parallel', 'Solve for $x$: $ {{a:coef}}x{{b:sign}} = {{c}} $', 'x = {{x}}',
  { params:{ a:'2..9', x:'-9..9 !0', b:'-9..9 !0' }, derived:{ c:'a*x+b' } });
```
Kinds: `worked`, `easier`, `parallel`, `challenge`. Run `node tools/verify-bank.js` to check every template (needs Node, optional).

## Graph questions
A template can include a `graphs` list and the app draws it (parabolas and lines, with marked points and an auto-chosen window). Numbers are formulas from the template's `params`, so the picture always matches the answer. See `bank/quadratics_graphs.js`. Graphs are set in the bank files, not in the question editor. Editing a graph question in the editor keeps its graph.
`node tools/verify-graphs.js` re-checks every graph answer against the curve that is drawn.

## Files
`index.html` app · `engine.js` problem generator · `graphs.js` graph drawing · `sheets.js` sheet builder · `bank/` questions · `vendor/katex/` math display (MIT) · `tools/` optional tests

## DeltaMath tab (optional)

Tab **4 · DeltaMath** helps you build DeltaMath assignments from the same missed-item marks. Nothing else in the app depends on it.

- **Assignments:** students are grouped by the item most of them missed; a group also gets any other item that more than half of its students missed. Untick any skill, then copy the group's student list and skill names (or download all groups as text) and build the assignment on DeltaMath.
- **Mapping:** each bank skill has suggested DeltaMath skills. Edit them; changes are saved in your browser and can be exported/imported (`reteach-dm` file). Same-named DeltaMath skills in different courses are one skill, tagged with every course they appear in.
- **Browse DeltaMath skills:** search all 758 skills from your 7th, 8th, Algebra I and Advanced Algebra lists, and filter to the ones no bank question set covers yet.
- **Tests tab:** each item has a **DeltaMath skills** cell (Choose…). An item can use a bank skill, DeltaMath skills only, or both.
- **Print sheets:** tick “Add ‘assign on DeltaMath’ line” to print the item's DeltaMath skills under its practice problems (off by default).

Files: `deltamath/skills.js` (inventory), `deltamath/map.js` (suggested matches), `deltamath/dm.js` (grouping logic).

## Test builder tab

Build a full test from the same question bank (tab **Test builder**).

- **Add questions** three ways: search the bank (every result shows a worked example and its answer before you add it; use *Another example* to see different numbers), pick a skill, or pull one question per item from a Reteach test.
- A question added from the search is "pinned" to that exact question type; one added by skill is drawn from any question of that skill at the levels you tick (Warm-up / Standard / Challenge). *Different numbers* re-rolls a single question.
- **Versions A–D** use the same skills with different numbers (optionally a different order). Same title + same numbers code = the same test every time.
- Graph questions print and export with their graphs.
- **Print test / save as PDF** and **Print answer keys** use the browser's print dialog.
- **Export…** downloads one .zip with any of: Word (.docx, with editable Word equations), LaTeX (`exam` class, answer spaces, grading sheet at the back, graphs in `figures/`), and a Reteach test file you can import on tab 1.
- **Make a Reteach test from this** creates the matching test on tab 1 so you can mark misses and print practice sheets after you give it.

Files: `builder/builder.js` (picks the questions), `builder/export.js` (zip, LaTeX, Word), tests in `tools/test-export.js` and `tools/smoke-builder.js`.

### Multiple choice

Each question in the Test builder can be **Free response** or **Multiple choice** (set "New questions are…" before adding, change any question's Format, or use *Make all multiple choice*). Wrong choices are made automatically from common mistakes (sign errors, flipped fractions, off-by-one numbers, opposite words, wrong quadrant or angle, answers from other numbers of the same question). The correct choice is marked ✓ in the builder; *Different choices* re-rolls just the wrong ones, and A/B/C/D versions each get their own numbers and choices. Questions that can't sensibly be multiple choice (graph it, explain it, very long answers) stay free response and say so. Always skim the choices once before printing. Logic: `builder/choices.js`.

## Unit 2 exponentials batch (adv_exp.js)
New skills: exp-base, exp-range, exp-trans, exp-gd, exp-int, exp-calc, exp-eq-log, inv-fn; extra templates added to exp-graph (adv_graphs.js), exp-eq, log-convert, log-eval (advanced.js).
Templates can now give `distractors:[...]` (hand-written wrong choices for multiple choice). The formula language gained ln, log10, logb(b,x), ex(x), pw(a,x), pipow(a) for decimal answers (use with `:dec2`).
Checker: `node tools/verify-exp.js`.
