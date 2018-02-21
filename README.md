# mongobench-nodejs

Benchmark various MongoDB ORM for Nodejs

## Get started

* You must have a local mongodb instance running
* Install dependencies `yarn install`
* Run the test `yarn start`

Tests available:

* read.js (findOne, find)
* delete.js (deleteOne, deleteMany)
* insert.js (insert)

## Results

MacBook Pro (13-inch, 2017) 16GB 3,1GHz:

```
insert - mongoose x 1,691 ops/sec ±6.94% (72 runs sampled)
save method - mongoose x 1,851 ops/sec ±10.76% (65 runs sampled)
insert - mongolass x 2,732 ops/sec ±8.33% (71 runs sampled)
insert - mongorito x 3,264 ops/sec ±3.84% (72 runs sampled)
insert - native x 4,909 ops/sec ±2.84% (75 runs sampled)
Fastest is insert - native
Slowest is insert - mongoose

deleteOne - mongoose x 5,938 ops/sec ±3.05% (72 runs sampled)
deleteOne - mongolass x 4,461 ops/sec ±2.75% (71 runs sampled)
deleteOne - native x 6,655 ops/sec ±2.37% (78 runs sampled)
deleteMany - mongoose x 6,262 ops/sec ±1.72% (76 runs sampled)
deleteMany - mongolass x 4,252 ops/sec ±2.80% (76 runs sampled)
deleteMany - mongorito x 266 ops/sec ±172.80% (72 runs sampled)
deleteMany - native x 6,242 ops/sec ±2.59% (77 runs sampled)
Fastest is deleteOne - native
Slowest is deleteMany - mongorito

findOne - mongoose x 3,934 ops/sec ±4.85% (75 runs sampled)
findOne lean - mongoose x 4,962 ops/sec ±1.61% (78 runs sampled)
findOne - mongolass x 3,654 ops/sec ±4.43% (73 runs sampled)
findOne - mongorito x 3,427 ops/sec ±3.42% (74 runs sampled)
findOne - native x 5,435 ops/sec ±2.49% (75 runs sampled)
find - mongoose x 129 ops/sec ±4.21% (78 runs sampled)
find lean - mongoose x 310 ops/sec ±2.62% (72 runs sampled)
find - mongolass x 238 ops/sec ±7.34% (60 runs sampled)
find - mongorito x 43.49 ops/sec ±1.88% (69 runs sampled)
find - native x 244 ops/sec ±6.88% (60 runs sampled)
Fastest is findOne - native
Slowest is find - mongorito
```
