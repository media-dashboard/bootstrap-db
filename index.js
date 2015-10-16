var pg = require('pg');
var moment = require('moment');
var download = require('./gdelt_downloader');
var DateGenerator = require('./util').DateGenerator;

var settings = {
  baseurl: 'http://data.gdeltproject.org/events/',
  ext: '.export.CSV.zip',
  dateRange: {
    start: moment("2013 3 31", "YYYY MM DD"), // min: moment("2013 4 1", "YYYY MM DD") -- inclusive
    end: moment("2013 4 3", "YYYY MM DD") // max: moment() -- inclusive
  },
  dataDir: 'data/',
  user: 'jamesconkling',
  db: 'gdelt',
};

var pgClient = new pg.Client('postgres://' + settings.user + '@localhost/' + settings.db);
var getDate = DateGenerator(settings);

pgClient.connect((err) => {
  if(err){ return console.error('Error opening connection to postgres', err); }

  // download(date, fileDownloaded, allFilesDownloaded, settings)
  var fileDownloaded = function(){
    console.log('done');
  };

  var allFilesDownloaded = function(){
    console.log('Finished downloading all files for date range:', settings.dateRange.start.format('YYYYMMDD'), 'to', settings.dateRange.end.format('YYYYMMDD'));
    pgClient.end()
  };

  download(getDate, fileDownloaded, allFilesDownloaded, settings);
});
