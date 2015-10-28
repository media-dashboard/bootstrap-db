CREATE EXTENSION IF NOT EXISTS PostGIS;

CREATE TABLE events (
  GLOBALEVENTID bigint PRIMARY KEY,
  SQLDATE date ,
  MonthYear varchar(6) ,
  Year varchar(4) ,
  FractionDate real ,
  Actor1Code varchar(20) , --char(3)
  Actor1Name varchar(255) ,
  Actor1CountryCode varchar(3) ,
  Actor1KnownGroupCode varchar(3) ,
  Actor1EthnicCode varchar(3) ,
  Actor1Religion1Code varchar(3) ,
  Actor1Religion2Code varchar(3) ,
  Actor1Type1Code varchar(3) ,
  Actor1Type2Code varchar(3) ,
  Actor1Type3Code varchar(3) ,
  Actor2Code varchar(20) , --char(3)
  Actor2Name varchar(255) ,
  Actor2CountryCode varchar(3) ,
  Actor2KnownGroupCode varchar(3) ,
  Actor2EthnicCode varchar(3) ,
  Actor2Religion1Code varchar(3) ,
  Actor2Religion2Code varchar(3) ,
  Actor2Type1Code varchar(3) ,
  Actor2Type2Code varchar(3) ,
  Actor2Type3Code varchar(3) ,
  IsRootEvent int ,
  EventCode varchar(4) ,
  EventBaseCode varchar(4) ,
  EventRootCode varchar(4) ,
  QuadClass int ,
  GoldsteinScale real ,
  NumMentions int ,
  NumSources int ,
  NumArticles int ,
  AvgTone real ,
  Actor1Geo_Type varchar(20) , --int
  Actor1Geo_FullName varchar(255) ,
  Actor1Geo_CountryCode varchar(2) ,
  Actor1Geo_ADM1Code varchar(4) ,
  Actor1Geo_Lat float ,
  Actor1Geo_Long float ,
  Actor1Geo_FeatureID varchar(20) , --int
  Actor2Geo_Type varchar(20) , --int
  Actor2Geo_FullName varchar(255) ,
  Actor2Geo_CountryCode varchar(2) ,
  Actor2Geo_ADM1Code varchar(4) ,
  Actor2Geo_Lat float ,
  Actor2Geo_Long float ,
  Actor2Geo_FeatureID varchar(20) , --int
  ActionGeo_Type varchar(20) , --int
  ActionGeo_FullName varchar(255) ,
  ActionGeo_CountryCode varchar(2) ,
  ActionGeo_ADM1Code varchar(4) ,
  ActionGeo_Lat float ,
  ActionGeo_Long float ,
  ActionGeo_FeatureID varchar(20) , --int
  DATEADDED int ,
  SOURCEURL varchar(255)
);

