'use strict';
const through = require('through2');
const csv2 = require('csv2');
const getTestDataFile = require('./utils/getTestDataFile.js');

const logError = context => err => console.error(context, err);
const testDataFilePath = `${__dirname}/test/20150218230000.export.CSV`;
let maxRowCount = 0;
const columns = new Array(60).join().split(',').map((item, idx) => idx);

getTestDataFile(testDataFilePath)
  .pipe(csv2({ separator: '\t' }))
  .pipe(through.obj(function(chunk, enc, next) {
    if (maxRowCount-- <= 0) {
      return next(null);
    }
    const row = columns.reduce((row, column, idx) => {
      row[column] = chunk[idx];
      return row;
    }, {});

    next(null, JSON.stringify(row));
  }))
  .on('error', logError('Error transforming test file'))
  .pipe(process.stdout)

// const stream = require('stream');
// const through = require('through2');

// const getter = function(cb) {
//   setTimeout(() => {
//     const r = new stream.Readable;
//     r.push('data1');
//     r._read = () => {};
//     setTimeout(() => r.push('data2'), 100);
//     setTimeout(() => r.push('data3'), 500);
//     setTimeout(() => r.push('data4'), 1000);
//     setTimeout(() => r.push('data5'), 3000);
//     setTimeout(() => r.push(null), 3100);

//     cb(r);
//   }, 1000);
// }

// const makeStream = function() {
//   const transform = through(function(chunk, enc, cb) {
//     this.push(chunk + '!');
//     cb();
//   });

//   getter(res => {
//     res.pipe(transform);
//   });

//   return transform;
// }

// makeStream().pipe(process.stdout);
