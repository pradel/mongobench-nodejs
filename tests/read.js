const Benchmark = require('benchmark');
const mongoose = require('mongoose');
const mongorito = require('mongorito');
const { display, setup, dropDatabase, close } = require('./utils');

const test = () => {
  return new Promise(async resolve => {
    const suite = new Benchmark.Suite();
    const { mongolass, native, mongoritoDb } = await setup();
    const UserMongoose = mongoose.model('User', { name: String });
    const UserMongolass = mongolass.model('User', {
      name: { type: 'string' },
    });
    class UserMongorito extends mongorito.Model {}
    mongoritoDb.register(UserMongorito);
    const UserNative = native.collection('users');

    await dropDatabase();

    for (let index = 0; index < 1000; index++) {
      await UserMongoose.create({ name: 'Name' });
      await UserMongolass.insert({ name: 'Name' });
      const user = new UserMongorito({ name: 'Name' });
      await user.save();
      await UserNative.insert({ name: 'Name' });
    }

    suite.add('findOne - mongoose', {
      defer: true,
      fn: async deferred => {
        await UserMongoose.findOne({}).exec();
        deferred.resolve();
      },
    });

    suite.add('findOne lean - mongoose', {
      defer: true,
      fn: async deferred => {
        await UserMongoose.findOne({}).lean().exec();
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

    suite.add('findOne - mongorito', {
      defer: true,
      fn: async deferred => {
        await UserMongorito.findOne({});
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

    suite.add('find lean - mongoose', {
      defer: true,
      fn: async deferred => {
        await UserMongoose.find({}).lean().exec();
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

    suite.add('find - mongorito', {
      defer: true,
      fn: async deferred => {
        await UserMongorito.find({});
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
