var fs = require('fs');
var pg = require('pg');
var copyFrom = require('pg-copy-streams').from;
var downloader = require('./lib/downloader');

var settings = {
  baseurl: 'http://data.gdeltproject.org/events/',
  ext: '.export.CSV.zip',
  startDate: "2013-03-31", // format: "YYYY-MM-DD", min: "2013-04-01" -- inclusive
  endDate: "2013-04-3", // format: "YYYY-MM-DD", max: today -- inclusive
  dataDir: 'data/',
  user: 'jamesconkling',
  db: 'gdelt',
};

function fileStreamHandler(fileStream, date, next){
  var writeStream = fs.createWriteStream(settings.dataDir + date + '.csv');

  fileStream.pipe(writeStream)
    .on('error', () => {
      console.log('ERROR piping to data dir to', settings.dataDir + date);
      next();
    })
    .on('finish', () => {
      console.log('Finished writing', date);
      next();
    });
}

function doneHandler(){
  console.log('done');
}

downloader(settings.startDate, fileStreamHandler, doneHandler, settings);
