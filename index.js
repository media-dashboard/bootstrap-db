var fs = require('fs');
var pg = require('pg');
var copyFrom = require('pg-copy-streams').from;
var through = require('through2');
var csv2 = require('csv2');
var downloader = require('./lib/downloader');

var settings = {
  baseurl: 'http://data.gdeltproject.org/events/',
  ext: '.export.CSV.zip',
  startDate: "2013-03-31", // format: "YYYY-MM-DD", min: "2013-04-01" -- inclusive
  endDate: "2013-04-1", // format: "YYYY-MM-DD", max: today -- inclusive
  dataDir: 'data/',
  user: 'jamesconkling',
  db: 'gdelt',
};

/* downloader function signature
  date: date from which to start downloading files
  fileStreamHandler: callback invoked after each file has been downloaded and unzipped
    given the function signature (stream, date, next)
  doneHandler: callback invoked after file for date settings.endDate has been fully downloaded and handled via it's callback handler
*/
var pgClient = new pg.Client('postgres://' + settings.user + '@localhost/' + settings.db);

pgClient.connect((err) => {
  if(err){ return console.error('Error opening connection to postgres', err); }

  downloader(settings.startDate, fileStreamHandler, doneHandler, settings);

  function fileStreamHandler(fileStream, date, next){
    console.log('Finished downloading file', date);

    var pgStream = pgClient.query(copyFrom("COPY events FROM STDIN WITH CSV DELIMITER E'\t'"));

    fileStream
      // .pipe(csv2({ separator: '\t' }))
      // .pipe(through.obj((line, enc, nextLine) => {
      //   this.push(line);
      //   nextLine();
      // }))
      .pipe(pgStream)
      .on('error', (err) => {
        console.log('error uploading file', date, 'error', err);
        next();
      })
      .on('finish', () => {
        console.log('finish uploading file', date);
        next();
      });

  }

  function doneHandler(){
    console.log('done uploading all files');
    pgClient.end();
  }

});
