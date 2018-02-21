const Benchmark = require('benchmark');
const mongoose = require('mongoose');
const mongorito = require('mongorito');
const { display, setup, dropDatabase, close } = require('./utils');

const test = () => {
  return new Promise(async resolve => {
    const suite = new Benchmark.Suite();
    const { mongolass, native, mongoritoDb } = await setup();
    const UserMongoose = mongoose.model('UserInsert', { name: String });
    const UserMongolass = mongolass.model('UserInsert', {
      name: { type: 'string' },
    });
    class UserMongorito extends mongorito.Model {}
    mongoritoDb.register(UserMongorito);
    const UserNative = native.collection('UserInsert');

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

    suite.add('insert - mongorito', {
      defer: true,
      fn: async deferred => {
        const user = new UserMongorito({ name: 'Name' });
        await user.save();
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
        resolve();
      })
      .run({ async: true });
  });
};

exports.test = test;
