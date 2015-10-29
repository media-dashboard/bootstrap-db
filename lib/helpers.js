var moment = require('moment');

exports.multisplice = function(collection, indices){
  // modifies collection in place by removing elements in collection at each index in indices
  indices.sort((a,b) => {
    return b - a;
  }).forEach((index) => {
    collection.splice(index, 1);
  });
};

exports.dateGenerator = function(startDate, endDate){
  // clone start date and end date
  var date = moment(startDate, "YYYY MM DD"),
      endDate = moment(endDate, "YYYY MM DD"),
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
