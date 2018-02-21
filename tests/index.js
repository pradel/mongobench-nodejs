const { test: insertTests } = require('./insert');
const { test: deleteTests } = require('./delete');
const { test: readTests } = require('./read');

const test = async () => {
  await insertTests();
  console.log('');
  await deleteTests();
  console.log('');
  await readTests();
};

test();
