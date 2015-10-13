var fs = require('fs');
var unzip = require('unzip');
var pg = require('pg');
var http = require('http');
var moment = require('moment');


var settings = {
  baseurl: 'http://data.gdeltproject.org/events/',
  ext: '.export.CSV.zip',
  dateRange: {
    start: moment("2013 4 1", "YYYY MM DD"), // min: moment("2013 4 1", "YYYY MM DD") -- inclusive
    end: moment("2013 4 3", "YYYY MM DD") // max: moment() -- inclusive
  },
  dataDir: 'data/'
};

var DateGenerator = function(settings){
  // clone start date and end date
  var date = settings.dateRange.start,
      endDate = settings.dateRange.end,
      dateCount = date.diff(endDate, 'days'),
      dateIdx = 1;

  return function(){
    // if date is > dateRange.end, return false
    // if date <= dateRange.end, return parsedDate string
    var parsedDate = date.isAfter(endDate) ? false : date.format('YYYYMMDD');

    date.add(1, 'days');
    return {
      date: parsedDate,
      index: dateIdx++,
      left: dateCount - dateIdx
    };
  };
};

var download = function(date){
  if(!date){ return; }

  var url = settings.baseurl + date + settings.ext;
  console.log('Downloading from', url);

  req = http.get(url, (res) => {
    res
      .pipe(unzip.Extract({ path: settings.dataDir }))
      .on('finish', () => {
        console.log('finish unzipping', date, '\n');
        // initiate async upload to pg
        // pg.upload(...)

        // while uploading to pg, initiate the next download
        download(getDate().date);
      });
  }).on('error', (err) => {
    console.log('Error downloading file for date', date, e.message);
    download(getDate().date);
  });
};

var getDate = DateGenerator(settings);
var date = getDate().date;
download(date);
