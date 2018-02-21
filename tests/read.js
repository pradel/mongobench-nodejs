const Benchmark = require('benchmark');
const mongoose = require('mongoose');
const { display, setup, dropDatabase, close } = require('./utils');

const test = () => {
  return new Promise(async resolve => {
    const suite = new Benchmark.Suite();
    const { mongolass, native } = await setup();
    const UserMongoose = mongoose.model('User', { name: String });
    const UserMongolass = mongolass.model('User', {
      name: { type: 'string' },
    });
    const UserNative = native.collection('users');

    await dropDatabase();

    for (let index = 0; index < 1000; index++) {
      await UserMongoose.create({ name: 'Name' });
      await UserMongolass.insert({ name: 'Name' });
      await UserNative.insert({ name: 'Name' });
    }

    suite.add('findOne - mongoose', {
      defer: true,
      fn: async deferred => {
        await UserMongoose.findOne({}).exec();
        deferred.resolve();
      },
    });

    suite.add('findOne - mongolass', {
      defer: true,
      fn: async deferred => {
        await UserMongolass.findOne({}).exec();
        deferred.resolve();
      },
    });

    suite.add('findOne - native', {
      defer: true,
      fn: async deferred => {
        await UserNative.findOne({});
        deferred.resolve();
      },
    });

    suite.add('find - mongoose', {
      defer: true,
      fn: async deferred => {
        await UserMongoose.find({}).exec();
        deferred.resolve();
      },
    });

    suite.add('find - mongolass', {
      defer: true,
      fn: async deferred => {
        await UserMongolass.find({}).exec();
        deferred.resolve();
      },
    });

    suite.add('find - native', {
      defer: true,
      fn: async deferred => {
        await UserNative.find({}).toArray();
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
        resolve();
      })
      .run({ async: true });
  });
};

exports.test = test;
