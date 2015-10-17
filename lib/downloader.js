var unzip = require('unzip'); // also see adm-zip
var http = require('http');

var download = function(date, endDate, fileStream, done, settings){
  if( date.isAfter(endDate) ){
    return done();
  }

  var url = settings.baseurl + date.format('YYYYMMDD') + settings.ext;
  console.log('\nDownloading from', url);

  http.get(url, (res) => {
    // upload to postgres w/o writing to disk
        // see Unzip: https://www.npmjs.com/package/unzip
        // see pg-copy-stream: https://github.com/brianc/node-pg-copy-streams/
    // var pgStream = client.query(copyFrom('COPY my_table FROM STDIN'));
    if(res.statusCode !== 200){
      console.error('Error downloading file for date', date.format('YYYYMMDD'), res.statusCode, res.statusMessage);
      return download(date.add(1, 'days'), endDate, fileStream, done, settings);
    }

    res
      .pipe(unzip.Parse())
      .on('entry', (entry) => {
        fileStream(entry, date);
      })
      .on('finish', () => {
        download(date.add(1, 'days'), endDate, fileStream, done, settings);
      })
      .on('error', (err) => {
        console.error('Response Error for date', date.format('YYYYMMDD'), '\n', err);
        download(date.add(1, 'days'), endDate, fileStream, done, settings);
      });

  }).on('error', (err) => {
    console.error('Request Error downloading file for date', date.format('YYYYMMDD'), e.message);
    download(date.add(1, 'days'), endDate, fileStream, done, settings);
  });
};

module.exports = download;
