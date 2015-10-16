module.exports.DateGenerator = function(settings){
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
