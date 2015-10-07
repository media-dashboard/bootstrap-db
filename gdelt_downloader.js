var fs = require('fs');
var requestPromise = require('request-promise');
var unzip = require('unzip');
var pg = require('pg');
var moment = require('moment');


var settings = {
  baseurl: 'http://data.gdeltproject.org/events/',
  ext: '.export.CSV.zip',
  dateRange: {
    start: moment("2015 10 2", "YYYY MM DD"), // min: moment("2013 4 1", "YYYY MM DD") -- inclusive
    end: moment() // max: moment() -- inclusive
  },
  dataDir: 'data/'
};

// pg.connection({})

var dateGenerator = function(settings){
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

var unzip2File = function(zipStream){
  // unzip file in memory, and write to csv file
  console.log('Unzipping');

  var unzipPromise = new Promise();

  zipStream.pipe(unzip.Extract({ path: settings.dataDir }))
  zipStream.on('end', () => {
    unzipPromise.resolve(date);
  });
  zipStream.on('error', (err) => {
    console.log('Error unzipping file for date', date, err.message);
    unzipPromise.error(err);
  });

  return unzipPromise;
};

var upload2Pg = function(date){
  var pgPromise = new Promise();

  // pg.uploadSomehow(date)
  console.log('uploaded', date);
  pgPromise.resolve(date);
};

var download = function(date, settings){
  if(!date){ return; }

  console.log('downloading', settings.baseurl + date + settings.ext);

  requestPromise(settings.baseurl + date + settings.ext)
    .then(unzip2File)
    .then(upload2Pg)
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      download(getDate.date);
    });
};

// initialize date generator
var getDate = dateGenerator(settings);

// recursively download
download(getDate().date, settings);


var getDate = dateGenerator(settings),
    date = getDate().date;



// while(date){
//   console.log('Downloading ', date);
//   request = http.get(settings.baseurl + settings.ext, (res) => {
//     res.pipe(fs.createWriteStream('./data/' + date + '.zip'));
//   }).on('error', (err) => { console.log('Error downloading file for date', date, e.message);
//   }).on('end', () => {

//   });

//   // date = getDate().date;
//   date = false;
// }
