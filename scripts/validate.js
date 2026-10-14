const { execFileSync } = require('node:child_process');
const { existsSync } = require('node:fs');
const path = require('node:path');

const FROZEN = 'fixtures/frozen/';
const NORMATIVE = 'docs/policy-synthetic.md';
const CLOSEOUT = 'docs/task-closeout.md';

function validate(changed) {
  const errors = [];
  const frozen = changed.filter(x => x === 'fixtures/frozen' || x.startsWith(FROZEN));
  if (frozen.length) errors.push('Frozen files changed: ' + frozen.join(', '));
  if (changed.includes(NORMATIVE) && !changed.includes(CLOSEOUT)) {
    errors.push('Normative change without changed closeout record: ' + CLOSEOUT);
  }
  return errors;
}

function changes(base, head) {
  return execFileSync('git', ['diff', '--name-only', '-z', `${base}...${head}`], { encoding: 'utf8' })
    .split('\0').filter(Boolean).map(s => s.replaceAll('\\', '/'));
}

if (require.main === module) {
  if (!existsSync(path.join(process.cwd(), '.git'))) {
    console.error('Run in a Git checkout; PR gate requires base/head commits.');
    process.exit(2);
  }
  const base = process.env.BASE_SHA;
  const head = process.env.HEAD_SHA;
  if (!base || !head) { console.error('BASE_SHA and HEAD_SHA required (PR context).'); process.exit(2); }
  const files = changes(base, head);
  const errors = validate(files);
  console.log('Files changed:', files);
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
  console.log('Synthetic governance check passed.');
}
module.exports = { validate };
