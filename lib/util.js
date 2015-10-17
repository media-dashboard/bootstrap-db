var moment = require('moment');

module.exports.DateGenerator = function(startDate, endDate){
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
