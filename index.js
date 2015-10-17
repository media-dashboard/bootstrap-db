var fs = require('fs');
var pg = require('pg');
var downloader = require('./lib/downloader');
var DateGenerator = require('./lib/util').DateGenerator;

var settings = {
  baseurl: 'http://data.gdeltproject.org/events/',
  ext: '.export.CSV.zip',
  dateRange: {
    start: "2013 3 31", // format: "YYYY MM DD", min: "2013 4 1" -- inclusive
    end: "2013 4 3" // format: "YYYY MM DD", max: moment() -- inclusive
  },
  dataDir: 'data/',
  user: 'jamesconkling',
  db: 'gdelt',
};

var pgClient = new pg.Client('postgres://' + settings.user + '@localhost/' + settings.db);
var getDate = DateGenerator(settings.dateRange.start, settings.dateRange.end);

pgClient.connect((err) => {
  if(err){ return console.error('Error opening connection to postgres', err); }

  var fileStreamCB = function(date){
    console.log('Finished downloading file', date);
    return fs.createWriteStream(settings.dataDir + date + '.csv');
  };

  var allFilesDownloadedCB = function(){
    var startDate = settings.dateRange.start;
    var endDate = settings.dateRange.end;

    console.log('Finished downloading all files for date range:', startDate, 'to', endDate);
    return pgClient.end();
  };

  downloader(getDate, fileStreamCB, allFilesDownloadedCB, settings);
});
