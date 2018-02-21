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
insert - mongoose x 1,736 ops/sec ±7.55% (67 runs sampled)
save method - mongoose x 2,070 ops/sec ±3.50% (74 runs sampled)
insert - mongolass x 2,555 ops/sec ±5.53% (67 runs sampled)
insert - native x 4,095 ops/sec ±3.36% (71 runs sampled)
Fastest is insert - native

deleteOne - mongoose x 477 ops/sec ±173.11% (70 runs sampled)
deleteOne - mongolass x 3,207 ops/sec ±13.83% (62 runs sampled)
deleteOne - native x 5,390 ops/sec ±4.36% (69 runs sampled)
deleteMany - mongoose x 5,370 ops/sec ±4.73% (72 runs sampled)
deleteMany - mongolass x 3,881 ops/sec ±5.52% (69 runs sampled)
deleteMany - native x 6,515 ops/sec ±2.62% (76 runs sampled)
Fastest is deleteMany - native

findOne - mongoose x 3,923 ops/sec ±4.90% (69 runs sampled)
findOne - mongolass x 3,570 ops/sec ±2.74% (73 runs sampled)
findOne - native x 5,262 ops/sec ±2.00% (79 runs sampled)
find - mongoose x 129 ops/sec ±1.94% (75 runs sampled)
find - mongolass x 199 ops/sec ±12.10% (51 runs sampled)
find - native x 237 ops/sec ±10.25% (54 runs sampled)
Fastest is findOne - native
```
