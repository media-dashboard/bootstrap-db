var unzip = require('unzip'); // see also adm-zip
var http = require('http');
var moment = require('moment');

var download = function(date, fileStream, done, settings){
  /*
    Download and unzip GDELT file at settings,
    exposing a stream of the unzipped csv in the fileStream callback
  */

  var date = moment(date, 'YYYY-MM-DD'),
      endDate = moment(settings.endDate, 'YYYY-MM-DD'),
      url = settings.baseurl + date.format('YYYYMMDD') + settings.ext;

  console.log('\nDownloading from', url);

  http.get(url, handleResponse)
    .on('error', (err) => {
      console.error('Error requesting file from url', url, err.message);
      next();
    });

  function next(){
    if( date.isSame(endDate) ){
      return done();
    }
    download.call(null, date.add(1, 'days').format('YYYY-MM-DD'), fileStream, done, settings);
  }

  function handleResponse(res){
    if(res.statusCode !== 200){
      console.error('Error downloading file for date', date.format('YYYY-MM-DD'), res.statusCode, res.statusMessage);
      return next();
    }

    res
      .on('error', (err) => {
        console.error('Response Error for date', date.format('YYYY-MM-DD'), '\n', err);
        next();
      })
      .pipe(unzip.Parse())
      .on('error', (err) => {
        console.error('Unzip Error for date', date.format('YYYY-MM-DD'), '\n', err);
        next();
      })
      .on('finish', () => {
        console.log('Finished unzipping');
      })
      .on('entry', (entry) => {
        fileStream(entry, date.format('YYYY-MM-DD'), next);
      });
  }

};

module.exports = download;
