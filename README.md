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

## Files
`index.html` app · `engine.js` problem generator · `sheets.js` sheet builder · `bank/` questions · `vendor/katex/` math display (MIT) · `tools/` optional tests
