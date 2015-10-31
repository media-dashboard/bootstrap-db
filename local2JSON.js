var fs = require('fs');
var through = require('through2');
var csv2 = require('csv2');
var get = require('./lib/get').localData; // get module exposes get.remoteData and get.localData
var dropColumns = require('./lib/helpers').dropColumns
var col2Idx = require('./lib/helpers').gdeltCol2Idx

var settings = {
  baseurl: 'http://data.gdeltproject.org/events/',
  ext: '.export.CSV.zip',
  startDate: "2013-4-1", // format: "YYYY-MM-DD", min: "2013-04-01" -- inclusive
  endDate: "2013-4-2", // format: "YYYY-MM-DD", max: today -- inclusive
  dataDir: 'data/',
  // user: 'jamesconkling',
  // db: 'gdelt',
};

/* get function signature
  date: date from which to start downloading files
  fileStreamHandler: callback invoked after each file has been downloaded and unzipped
    given the function signature (stream, date, next)
  doneHandler: callback invoked after file for date settings.endDate has been fully downloaded and handled via it's callback handler
*/

get(settings.startDate, fileStreamHandler, doneHandler, settings);

function fileStreamHandler(fileStream, date, next){
  fileStream
    .pipe(csv2({ separator: '\t' }))
    .pipe(through.obj(function(line, enc, nextLine){
      var data = {
        actor1:   line[col2Idx('Actor1Name')],
        event:    line[col2Idx('EventCode')],
        actor2:   line[col2Idx('Actor2Name')],
        location: line[col2Idx('ActionGeo_FullName')],
        date:     line[col2Idx('SQLDATE')]
      };

      this.push(JSON.stringify(data) + ',\n');
      nextLine();
    }))
    .pipe(fs.createWriteStream(settings.dataDir + date + '.json'))
    .on('error', (err) => console.log('Error writing file', date, 'error', err) )
    .on('finish', () => {
      console.log('Finish writing file', date, '\n');
      next();
    });
}

function doneHandler(){
  console.log('done filtering data\n');
}
