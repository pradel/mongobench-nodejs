const mongoose = require('mongoose');
const Mongolass = require('mongolass');
const { MongoClient } = require('mongodb');

let mongolass;
let native;
let nativeClient;

exports.setup = async () => {
  // Connect mongoose
  mongoose.connect('mongodb://localhost/test-mongoose');
  // Connect mongolass
  mongolass = new Mongolass('mongodb://localhost/test-mongolass');
  await mongolass.connect();
  // Connect native
  nativeClient = await MongoClient.connect('mongodb://localhost');
  native = nativeClient.db('test-native');
  return {
    mongolass,
    native,
  };
};

exports.close = async () => {
  mongoose.connection.close();
  mongolass._client.close();
  nativeClient.close();
};

exports.dropDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongolass._db.dropDatabase();
  await native.dropDatabase();
};

exports.display = result => {
  console.log('Fastest is ' + result.filter('fastest').map('name'));
};
