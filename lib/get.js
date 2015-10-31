var fs = require('fs');
var unzip = require('unzip'); // see also adm-zip
var http = require('http');
var moment = require('moment');

var getRemoteData = function(date, fileStream, done, settings){
  /*
    Download and unzip remote GDELT file,
    exposing a stream of the unzipped tsv in the fileStream callback
  */

  var date = moment(date, 'YYYY-MM-DD'),
      endDate = moment(settings.endDate, 'YYYY-MM-DD'),
      url = settings.baseurl + date.format('YYYYMMDD') + settings.ext;

  console.log('Downloading from', url);

  http.get(url, handleResponse)
    .on('error', (err) => {
      console.error('Error requesting file from url', url, err.message);
      next();
    });

  function next(){
    if( date.isSame(endDate) ){
      return done();
    }
    getRemoteData.call(null, date.add(1, 'days').format('YYYY-MM-DD'), fileStream, done, settings);
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
      // .on('finish', () => console.log('Finished unzipping') )
      .on('entry', (entry) => {
        fileStream(entry, date.format('YYYY-MM-DD'), next);
      });
  }

};

var getLocalData = function(date, fileStream, done, settings){
  /*
    Expose stream of local GDELT tsv data file,
    Normally, you can get data from the GDELT server and expose the file stream in one step w/ getLocalData
    If the files have already been downloaded and written to disk, however,
    getLocal will expose a file stream of those files
  */

  var date = moment(date, 'YYYY-MM-DD'),
      endDate = moment(settings.endDate, 'YYYY-MM-DD'),
      stream = fs.createReadStream(settings.dataDir + date.format('YYYY-MM-DD') + '.csv');

  console.log('\Streaming data from', date.format('YYYY-MM-DD'));

  fileStream(stream, date.format('YYYY-MM-DD'), next);

  function next(){
    if( date.isSame(endDate) ){
      return done();
    }
    getLocalData.call(null, date.add(1, 'days').format('YYYY-MM-DD'), fileStream, done, settings);
  }
}

module.exports = {
  remoteData: getRemoteData,
  localData: getLocalData
};
