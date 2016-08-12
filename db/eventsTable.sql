-- below is the full schema for the GDELT dataset
-- redundant columns have been removed to save space
CREATE TABLE events (
  GLOBALEVENTID bigint PRIMARY KEY ,
  SQLDATE date ,
  -- MonthYear text, -- redundant
  -- Year text , -- redundant
  -- FractionDate real , -- redundant
  Actor1Code text , -- redundant?: ActorCode is a concatenation of Name, CountryCode, GroupCode, etc. --char(3)
  Actor1Name text ,
  Actor1CountryCode text REFERENCES countrycode ,
  Actor1KnownGroupCode text REFERENCES groupcode ,
  Actor1EthnicCode text REFERENCES ethniccode ,
  Actor1Religion1Code text REFERENCES religioncode ,
  Actor1Religion2Code text REFERENCES religioncode ,
  Actor1Type1Code text REFERENCES typecode ,
  Actor1Type2Code text REFERENCES typecode ,
  Actor1Type3Code text REFERENCES typecode ,
  Actor2Code text , -- redundant?: ActorCode is a concatenation of Name, CountryCode, GroupCode, etc. --char(3)
  Actor2Name text ,
  Actor2CountryCode text REFERENCES countrycode ,
  Actor2KnownGroupCode text REFERENCES groupcode ,
  Actor2EthnicCode text REFERENCES ethniccode ,
  Actor2Religion1Code text REFERENCES religioncode ,
  Actor2Religion2Code text REFERENCES religioncode ,
  Actor2Type1Code text REFERENCES typecode ,
  Actor2Type2Code text REFERENCES typecode ,
  Actor2Type3Code text REFERENCES typecode ,
  IsRootEvent int ,
  EventCode text REFERENCES eventcode ,
  EventBaseCode text REFERENCES eventcode , -- redundant?: these are shortened versions of EventBaseCode
  EventRootCode text REFERENCES eventcode , -- redundant?: these are shortened versions of EventBaseCode
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
  -- ActionGeo_Lat float , -- compute as postgres geom data type
  -- ActionGeo_Long float , -- compute as postgres geom data type
  ActionGeo geom , -- computed from above Lat/Long pair
  ActionGeo_FeatureID text , --int
  DATEADDED int ,
  SOURCEURL text
);

-- TODO: find out if/how/when indexes need to be updated
CREATE INDEX SQLDATE_idx ON events (SQLDATE);

-- create GIN indexes on JSON columns
CREATE INDEX EventCode_idx ON events USING GIN (EventCode);
CREATE INDEX Actor1Code_idx ON events USING GIN (Actor1Code);
CREATE INDEX Actor2Code_idx ON events USING GIN (Actor2Code);

-- create GiST indexes on geo columns
CREATE INDEX Geo_idx ON events USING GiST (ActionGeo);


