var unzip = require('unzip'); // also see adm-zip
var http = require('http');

var download = function(getDate, fileStream, done, settings){
  var date = getDate().date;
  if(!date){
    return done();
  }

  var url = settings.baseurl + date + settings.ext;
  console.log('\nDownloading from', url);

  http.get(url, (res) => {
    // upload to postgres w/o writing to disk
        // see Unzip: https://www.npmjs.com/package/unzip
        // see pg-copy-stream: https://github.com/brianc/node-pg-copy-streams/
    // var pgStream = client.query(copyFrom('COPY my_table FROM STDIN'));
    if(res.statusCode !== 200){
      console.error('Error downloading file for date', date, res.statusCode, res.statusMessage);
      return download(getDate, fileStream, done, settings);
    }

    res
      .pipe(unzip.Parse())
      .on('entry', (entry) => {
        entry.pipe(fileStream())
      })
      .on('finish', () => {
        download(getDate, fileStream, done, settings);
      })
      .on('error', (err) => {
        console.error('Response Error for date', date, '\n', err);
        download(getDate, fileStream, done, settings);
      });

  }).on('error', (err) => {
    console.error('Request Error downloading file for date', date, e.message);
    download(getDate, fileStream, done, settings);
  });
};

module.exports = download;
