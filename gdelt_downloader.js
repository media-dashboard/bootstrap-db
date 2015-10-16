var fs = require('fs');
var unzip = require('unzip'); // also see adm-zip
var http = require('http');

var download = function(getDate, fileDone, allDone, settings){
  var date = getDate().date;
  if(!date){
    return allDone();
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
      return download(getDate, fileDone, allDone, settings);
    }

    res
      .pipe(unzip.Parse())
      .on('entry', (entry) => entry.pipe(fs.createWriteStream(settings.dataDir + date + '.csv')) )
      .on('finish', () => {
        console.log('Finished downloading file', date);
        fileDone();
        download(getDate, fileDone, allDone, settings);
      })
      .on('error', (err) => {
        console.error('Response Error for date', date, '\n', err);
        download(getDate, fileDone, allDone, settings);
      });

  }).on('error', (err) => {
    console.error('Request Error downloading file for date', date, e.message);
    download(getDate, fileDone, allDone, settings);
  });
};

module.exports = download;
