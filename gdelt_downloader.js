var fs = require('fs');
var unzip = require('unzip'); // also see adm-zip
var pg = require('pg');
var http = require('http');
var moment = require('moment');


var settings = {
  baseurl: 'http://data.gdeltproject.org/events/',
  ext: '.export.CSV.zip',
  dateRange: {
    start: moment("2013 3 31", "YYYY MM DD"), // min: moment("2013 4 1", "YYYY MM DD") -- inclusive
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
      remaining: dateCount - dateIdx
    };
  };
};

var download = function(date){
  if(!date){
    console.log('Finished downloading all files for date range:', settings.dateRange.start.format('YYYYMMDD'), 'to', settings.dateRange.end.format('YYYYMMDD'));
    return;
  }

  var url = settings.baseurl + date + settings.ext;
  console.log('\nDownloading from', url);

  req = http.get(url, (res) => {
    // upload to postgres w/o writing to disk
        // see Unzip: https://www.npmjs.com/package/unzip
        // see pg-copy-stream: https://github.com/brianc/node-pg-copy-streams/
    // var pgStream = client.query(copyFrom('COPY my_table FROM STDIN'));
    if(res.statusCode !== 200){
      console.error('Error downloading file for date', date, res.statusCode, res.statusMessage);
      return download(getDate().date);
    }

    res
      .pipe(unzip.Parse())
      .on('entry', (entry) => entry.pipe(fs.createWriteStream(settings.dataDir + date + '.csv')) )
      .on('finish', () => {
        console.log('Finished downloading file', date);
        download(getDate().date);
      })
      .on('error', (err) => {
        console.error('Response Error for date', date, '\n', err);
        download(getDate().date);
      });

      // .pipe(pgStream)
      // .on('finish', () => {
      //    done()
      //    download(getDate().date);
      //  })
      // .on('error', () => {
      //   done()
      //   download(getDate().date);
      // });

  }).on('error', (err) => {
    console.error('Request Error downloading file for date', date, e.message);
    download(getDate().date);
  });
};

var getDate = DateGenerator(settings);
var date = getDate().date;
download(date);
