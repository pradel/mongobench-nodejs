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

  suite.add('deleteOne - mongoose', {
    defer: true,
    fn: async deferred => {
      await UserMongoose.deleteOne({});
      deferred.resolve();
    },
  });

  suite.add('deleteOne - mongolass', {
    defer: true,
    fn: async deferred => {
      await UserMongolass.deleteOne({});
      deferred.resolve();
    },
  });

  suite.add('deleteOne - native', {
    defer: true,
    fn: async deferred => {
      await UserNative.deleteOne({});
      deferred.resolve();
    },
  });

  suite.add('deleteMany - mongoose', {
    defer: true,
    fn: async deferred => {
      await UserMongoose.deleteMany({});
      deferred.resolve();
    },
  });

  suite.add('deleteMany - mongolass', {
    defer: true,
    fn: async deferred => {
      await UserMongolass.deleteMany({});
      deferred.resolve();
    },
  });

  suite.add('deleteMany - native', {
    defer: true,
    fn: async deferred => {
      await UserNative.deleteMany({});
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