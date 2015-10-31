var moment = require('moment');
var gdeltSchema = {
  "GLOBALEVENTID": 0,
  "SQLDATE": 1,
  "MonthYear": 2,
  "Year": 3,
  "FractionDate": 4,
  "Actor1Code": 5,
  "Actor1Name": 6,
  "Actor1CountryCode": 7,
  "Actor1KnownGroupCode": 8,
  "Actor1EthnicCode": 9,
  "Actor1Religion1Code": 10,
  "Actor1Religion2Code": 11,
  "Actor1Type1Code": 12,
  "Actor1Type2Code": 13,
  "Actor1Type3Code": 14,
  "Actor2Code": 15,
  "Actor2Name": 16,
  "Actor2CountryCode": 17,
  "Actor2KnownGroupCode": 18,
  "Actor2EthnicCode": 19,
  "Actor2Religion1Code": 20,
  "Actor2Religion2Code": 21,
  "Actor2Type1Code": 22,
  "Actor2Type2Code": 23,
  "Actor2Type3Code": 24,
  "IsRootEvent": 25,
  "EventCode": 26,
  "EventBaseCode": 27,
  "EventRootCode": 28,
  "QuadClass": 29,
  "GoldsteinScale": 30,
  "NumMentions": 31,
  "NumSources": 32,
  "NumArticles": 33,
  "AvgTone": 34,
  "Actor1Geo_Type": 35,
  "Actor1Geo_FullName": 36,
  "Actor1Geo_CountryCode": 37,
  "Actor1Geo_ADM1Code": 38,
  "Actor1Geo_Lat": 39,
  "Actor1Geo_Long": 40,
  "Actor1Geo_FeatureID": 41,
  "Actor2Geo_Type": 42,
  "Actor2Geo_FullName": 43,
  "Actor2Geo_CountryCode": 44,
  "Actor2Geo_ADM1Code": 45,
  "Actor2Geo_Lat": 46,
  "Actor2Geo_Long": 47,
  "Actor2Geo_FeatureID": 48,
  "ActionGeo_Type": 49,
  "ActionGeo_FullName": 50,
  "ActionGeo_CountryCode": 51,
  "ActionGeo_ADM1Code": 52,
  "ActionGeo_Lat": 53,
  "ActionGeo_Long": 54,
  "ActionGeo_FeatureID": 55,
  "DATEADDED": 56,
  "SOURCEURL": 57
};



var multisplice = function(collection, indices){
  // modifies collection in place by removing elements in collection at each index in indices
  Array.prototype.slice.apply(indices).sort((a,b) => {
    return b - a;
  }).forEach((index) => {
    collection.splice(index, 1);
  });
};

var gdeltCol2Idx = function(name){
  // TODO: rewrite gdeltSchema in lower case to prevent case errors
  // name = name.toLowerCase();
  if(gdeltSchema[name] === undefined){ throw new Error('column name', name, 'doesn\t exist'); }
  return gdeltSchema[name];
};

var dropColumns = function(line, names){
  var indices = Array.prototype.slice.apply(names).map(gdeltCol2Idx);
  multisplice(line, indices);
};

var insertColumn = function(line, after, )

var dateGenerator = function(startDate, endDate){
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

module.exports = {
  multisplice: multisplice,
  gdeltCol2Idx: gdeltCol2Idx,
  dropColumns: dropColumns,
  dateGenerator: dateGenerator
};
