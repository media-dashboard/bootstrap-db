'use strict';
const fs = require('fs');
const http = require('http');
const through = require('through2');
const unzip = require('unzip');

const logError = context => err => console.error(context, err);

module.exports = url => {
  // can probably replace this w/ unzip.Parse() transformStream
  const transformStream = through(function(chunk, enc, cb) {
    this.push(chunk);
    cb();
  });

  http.request(url, res => {
    res
      .on('error', logError(`Error on response for file ${url}`))
      .pipe(unzip.Parse())
      .on('error', logError(`Error unzipping file ${url}`))
      .on('entry', readable => readable.pipe(transformStream))
  })
  .on('error', logError(`Error requesting file ${url}`))
  .end();

  return transformStream;
};
