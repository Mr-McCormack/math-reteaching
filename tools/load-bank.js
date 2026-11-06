// Loads every file in /bank into one object (same order index.html uses). Used by the tests.
const fs = require('fs'), path = require('path'), vm = require('vm');
module.exports = function loadBank() {
  const dir = path.join(__dirname, '..', 'bank');
  const files = ['_dsl.js', ...fs.readdirSync(dir).filter((f) => f.endsWith('.js') && f !== '_dsl.js').sort()];
  const sandbox = { console };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f });
  return sandbox.RB;
};
