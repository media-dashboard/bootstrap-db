const fs = require('fs');
const http = require('http');
const R = require('ramda');
const through = require('through2');
const unzip = require('unzip');
const moment = require('moment');


const env = {
  ENV: 'dev',
  testFilePath: './...',
  downloadPath: '...'
};


const logError = err => console.error.bind(console);

const makeFileGetter = env => {
  if (env.ENV === 'dev') {
    return () => {
      return fs.createReadStream(env.testFilePath, {encoding: 'utf8'});
    };
  }

  return () => {
    // const transformStream = through(function(chunk, enc, cb) {
    //   this.push(chunk);
    //   cb();
    // });

    const unzipTransformStream = unzip.Parse()
      .on('error', logError)
      .on('entry', readable => readable.pipe(transformStream));

    http.request(env.downloadPath, res => {
      res
        .on('error', logError)
        .pipe(unzipTransformStream)
    })
    .on('error', logError);
    .end();

    return unzipTransformStream;
  };
};

makeFileGetter(env)
  .pipe(csv2({ separator: '\t' }))
  .pipe(formatRow)
  .pipe(push2DB)
  .on('error', (err) => {
    console.log('error uploading file', date, 'error', err);
  })
  .on('finish', () => {
    console.log('finish uploading file', date);
  });


const downloader = function(date, fileStreamHandler, done, settings){

  const date = moment(date, 'YYYY-MM-DD'),
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
    downloader.call(null, date.add(1, 'days').format('YYYY-MM-DD'), fileStreamHandler, done, settings);
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
        fileStreamHandler(entry, date.format('YYYY-MM-DD'), next);
      });
  }

};

module.exports = downloader;
