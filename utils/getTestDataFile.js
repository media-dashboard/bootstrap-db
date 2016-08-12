'use strict';
const fs = require('fs');

const logError = context => err => console.error(context, err);

module.exports = filePath => {
  return fs.createReadStream(filePath, {encoding: 'utf8'})
    .on('error', logError('Error reading test file', filePath));
};
