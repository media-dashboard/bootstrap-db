var fs = require('fs');
var pg = require('pg');
var downloader = require('./lib/downloader');
var moment = require('moment');

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

pgClient.connect((err) => {
  if(err){ return console.error('Error opening connection to postgres', err); }
  var startDate = moment(settings.dateRange.start, "YYYY MM DD");
  var endDate = moment(settings.dateRange.end, "YYYY MM DD");

  var fileStreamCB = function(date){
    console.log('Finished downloading file', date.format('YYYYMMDD'));
    return fs.createWriteStream(settings.dataDir + date.format('YYYYMMDD') + '.csv');
  };

  var allFilesDownloadedCB = function(){
    console.log('Finished downloading all files for date range:', startDate.format('YYYYMMDD'), 'to', endDate.format('YYYYMMDD'));
    return pgClient.end();
  };

  downloader(startDate, endDate, fileStreamCB, allFilesDownloadedCB, settings);
});
