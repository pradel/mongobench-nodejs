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
insert - mongoose x 1,563 ops/sec ±10.04% (66 runs sampled)
save method - mongoose x 2,069 ops/sec ±4.41% (71 runs sampled)
insert - mongolass x 2,735 ops/sec ±5.01% (68 runs sampled)
insert - native x 3,601 ops/sec ±7.62% (66 runs sampled)
Fastest is insert - native

deleteOne - mongoose x 4,002 ops/sec ±20.75% (70 runs sampled)
deleteOne - mongolass x 4,196 ops/sec ±2.67% (76 runs sampled)
deleteOne - native x 5,804 ops/sec ±2.81% (73 runs sampled)
deleteMany - mongoose x 5,239 ops/sec ±4.51% (74 runs sampled)
deleteMany - mongolass x 3,955 ops/sec ±4.87% (75 runs sampled)
deleteMany - native x 6,036 ops/sec ±2.47% (76 runs sampled)
Fastest is deleteMany - native

findOne - mongoose x 3,939 ops/sec ±3.53% (71 runs sampled)
findOne - mongolass x 3,541 ops/sec ±2.38% (76 runs sampled)
findOne - native x 4,980 ops/sec ±2.55% (78 runs sampled)
find - mongoose x 127 ops/sec ±2.24% (77 runs sampled)
find - mongolass x 241 ops/sec ±7.35% (59 runs sampled)
find - native x 270 ops/sec ±5.81% (61 runs sampled)
Fastest is findOne - native
```
