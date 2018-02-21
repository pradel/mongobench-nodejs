const Benchmark = require('benchmark');
const mongoose = require('mongoose');
const { display, setup, dropDatabase, close } = require('./utils');

const test = async () => {
  const suite = new Benchmark.Suite();
  const { mongolass, native } = await setup();
  const UserMongoose = mongoose.model('User', { name: String });
  const UserMongolass = mongolass.model('User', {
    name: { type: 'string' },
  });
  const UserNative = native.collection('users');

  await dropDatabase();

  suite.add('insert - mongoose', {
    defer: true,
    fn: async deferred => {
      await UserMongoose.create({ name: 'Name' });
      deferred.resolve();
    },
  });

  suite.add('save method - mongoose', {
    defer: true,
    fn: async deferred => {
      await new UserMongoose({ name: 'Name' }).save();
      deferred.resolve();
    },
  });

  suite.add('insert - mongolass', {
    defer: true,
    fn: async deferred => {
      await UserMongolass.insert({ name: 'Name' });
      deferred.resolve();
    },
  });

  suite.add('insert - native', {
    defer: true,
    fn: async deferred => {
      await UserNative.insert({ name: 'Name' });
      deferred.resolve();
    },
  });

  suite
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', async function complete() {
      display(this);
      await close();
    })
    .run({ async: true });
};

test();