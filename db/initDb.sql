CREATE EXTENSION IF NOT EXISTS PostGIS;

-- below is the full schema for the GDELT dataset
-- redundant columns have been removed to save space
CREATE TABLE events (
  GLOBALEVENTID bigint PRIMARY KEY ,
  SQLDATE date ,
  -- MonthYear text, -- redundant
  -- Year text , -- redundant
  -- FractionDate real , -- redundant
  -- Actor1Code text , -- redundant: ActorCode is a concatenation of Name, CountryCode, GroupCode, etc. --char(3)
  Actor1Name text ,
  Actor1CountryCode text ,
  Actor1KnownGroupCode text ,
  Actor1EthnicCode text ,
  Actor1Religion1Code text ,
  Actor1Religion2Code text ,
  Actor1Type1Code text ,
  Actor1Type2Code text ,
  Actor1Type3Code text ,
  -- Actor2Code text , --char(3)
  Actor2Name text ,
  Actor2CountryCode text ,
  Actor2KnownGroupCode text ,
  Actor2EthnicCode text ,
  Actor2Religion1Code text ,
  Actor2Religion2Code text ,
  Actor2Type1Code text ,
  Actor2Type2Code text ,
  Actor2Type3Code text ,
  IsRootEvent int ,
  EventCode text ,
  -- EventBaseCode text , -- redundant: these are shortened versions of EventBaseCode
  -- EventRootCode text , -- redundant: these are shortened versions of EventBaseCode
  QuadClass int ,
  GoldsteinScale real ,
  NumMentions int ,
  NumSources int ,
  NumArticles int ,
  AvgTone real ,
  Actor1Geo_Type text , --int
  Actor1Geo_FullName text ,
  Actor1Geo_CountryCode text ,
  Actor1Geo_ADM1Code text ,
  Actor1Geo_Lat float ,
  Actor1Geo_Long float ,
  Actor1Geo_FeatureID text , --int
  Actor2Geo_Type text , --int
  Actor2Geo_FullName text ,
  Actor2Geo_CountryCode text ,
  Actor2Geo_ADM1Code text ,
  Actor2Geo_Lat float ,
  Actor2Geo_Long float ,
  Actor2Geo_FeatureID text , --int
  ActionGeo_Type text , --int
  ActionGeo_FullName text ,
  ActionGeo_CountryCode text ,
  ActionGeo_ADM1Code text ,
  ActionGeo_Lat float ,
  ActionGeo_Long float ,
  ActionGeo_FeatureID text , --int
  DATEADDED int ,
  SOURCEURL text
);

