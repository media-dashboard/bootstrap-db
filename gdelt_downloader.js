var fs = require('fs');
var rp = require('request-promise');
var unzip = require('unzip');
var pg = require('pg');
var moment = require('moment');


var settings = {
  baseurl: 'http://data.gdeltproject.org/events/',
  ext: '.export.CSV.zip',
  dateRange: {
    start: moment("2013 4 5", "YYYY MM DD"), // min: moment("2013 4 1", "YYYY MM DD")
    end: moment() // max: moment() -- inclusive
  },
  dataDir: 'data/'
};

pg.connection({})

var dateGenerator = function(){
  // clone start date and end date
  var date = moment(settings.dateRange.start),
      endDate = moment(settings.dateRange.end),
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


var grab = function(date){
  // download file
  var url = settings.baseurl + date + settings.ext;
  console.log('Downloading', url);

  return rp(url);
    // .then(() => {
    // }).catch(() => {});
};

var unzip2File = function(zipStreamPromise){
  // unzip file in memory, and write to csv file
  console.log('Unzipping');

  zipStreamPromise.then( (zipStream) => {
      // buffer file, unzip while in memory, and save to file
      zipStream.pipe(unzip.Extract({ path: settings.dataDir }))
      zipStream.on('end', () => { return date });
    })
    .catch( (err) => {
      console.log('Error unzipping file for date', date, err.message);
      return err;
    });

  return req;
};

var upload2Pg = function(datePromise){
  datePromise
    .then((date) => {
      console.log('uploaded', date);
    }).catch((err) => {
      console.log('error uploading date', date, err.message);
    });
};


var getDate = dateGenerator(),
    date = getDate().date;

grab(date)
  .unzip2File()
  .upload


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
