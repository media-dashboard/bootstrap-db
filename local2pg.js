var fs = require('fs');
var pg = require('pg');
var copyFrom = require('pg-copy-streams').from;
var through = require('through2');
var csv2 = require('csv2');
var get = require('./lib/get').localData; // get module exposes get.remoteData and get.localData
var helpers = require('./lib/helpers'),
    col2Idx = helpers.gdeltCol2Idx,
    dropColumns = helpers.dropColumns,
    insertColumn = helpers.insertColumn;

var settings = {
  baseurl: 'http://data.gdeltproject.org/events/',
  ext: '.export.CSV.zip',
  startDate: "2013-4-1", // format: "YYYY-MM-DD", min: "2013-04-01" -- inclusive
  endDate: "2013-4-2", // format: "YYYY-MM-DD", max: today -- inclusive
  // dataDir: 'data/',
  user: 'jamesconkling',
  db: 'gdelt',
};
var pgClient = new pg.Client('postgres://' + settings.user + '@localhost/' + settings.db);

/* get function signature
  date: date from which to start downloading files
  fileStreamHandler: callback invoked after each file has been downloaded and unzipped
    given the function signature (stream, date, next)
  doneHandler: callback invoked after file for date settings.endDate has been fully downloaded and handled via it's callback handler
*/

function fileStreamHandler(fileStream, date, next){
  var pgStream = pgClient.query(copyFrom("COPY events FROM STDIN WITH CSV DELIMITER E'\t'"));

  fileStream
    .pipe(csv2({ separator: '\t' }))
    .pipe(through.obj(function(line, enc, nextLine){
      // insert a new geographic column
      var lat = line[col2Idx('ActionGeo_Lat')],
          lon = line[col2Idx('ActionGeo_Long')],
          geo = 'POINT(' + lon + ' ' + lat + ')';

      insertColumn(line, 'ActionGeo_Long', geo);

      // remove redundant columns to match schema in db/eventsTable.sql
      dropColumns(line, ['MonthYear', 'Year', 'FractionDate', 'ActionGeo_Lat', 'ActionGeo_Long']);

      this.push(line.join('\t') + '\n');
      nextLine();
    }))
    .pipe(pgStream)
    .on('error', (err) => console.log('Error uploading file', date, 'error', err) )
    .on('finish', () => {
      console.log('Finish uploading file', date);
      next();
    });
}

function doneHandler(){
  console.log('done filtering data\n');
  pgClient.end();
}

pgClient.connect((err) => {
  if(err){ return console.error('Error opening connection to postgres', err); }

  get(settings.startDate, fileStreamHandler, doneHandler, settings);
});
