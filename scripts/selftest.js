const assert = require('node:assert/strict');
const { validate } = require('./validate');
assert.deepEqual(validate(['docs/notes.md']), []);
assert.equal(validate(['fixtures/frozen/example.json']).length, 1);
assert.equal(validate(['docs/policy-synthetic.md']).length, 1);
assert.deepEqual(validate(['docs/policy-synthetic.md', 'docs/task-closeout.md']), []);
assert.equal(validate(['fixtures/frozen/new-file.json']).length, 1);
console.log('PASS: 5 synthetic validator scenarios');
