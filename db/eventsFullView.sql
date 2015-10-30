CREATE VIEW eventsfull AS
  SELECT GLOBALEVENTID, SQLDATE,
    Actor1Name, c1.label AS Actor1Country, g1.label AS Actor1KnownGroup, e1.label AS Actor1Ethnic, r11.label AS Actor1Religion1, r12.label AS Actor1Religion2, t11.label AS Actor1Type1, t12.label AS Actor1Type2, t13.label AS Actor1Type3,
    Actor2Name, c2.label AS Actor2Country, g2.label AS Actor2KnownGroup, e2.label AS Actor2Ethnic, r21.label AS Actor2Religion1, r22.label AS Actor2Religion2, t21.label AS Actor2Type1, t22.label AS Actor2Type2, t23.label AS Actor2Type3,
    IsRootEvent, ev1.label AS Event, ev2.label AS EventBase, ev3.label AS EventRoot, QuadClass, GoldsteinScale, NumMentions, NumSources, NumArticles, AvgTone,
    Actor1Geo_Type, Actor1Geo_FullName, Actor1Geo_CountryCode, Actor1Geo_ADM1Code, Actor1Geo_Lat, Actor1Geo_Long, Actor1Geo_FeatureID,
    Actor2Geo_Type, Actor2Geo_FullName, Actor2Geo_CountryCode, Actor2Geo_ADM1Code, Actor2Geo_Lat, Actor2Geo_Long, Actor2Geo_FeatureID,
    ActionGeo_Type, ActionGeo_FullName, ActionGeo_CountryCode, ActionGeo_ADM1Code, ActionGeo_Lat, ActionGeo_Long, ActionGeo_FeatureID, DATEADDED, SOURCEURL
  FROM events
  LEFT JOIN countrycode   AS c1  ON events.Actor1CountryCode = c1.code
  LEFT JOIN groupcode     AS g1  ON events.Actor1KnownGroupCode = g1.code
  LEFT JOIN ethniccode    AS e1  ON events.Actor1EthnicCode = e1.code
  LEFT JOIN religioncode  AS r11 ON events.Actor1Religion1Code = r11.code
  LEFT JOIN religioncode  AS r12 ON events.Actor1Religion2Code = r12.code
  LEFT JOIN typecode      AS t11 ON events.Actor1Type1Code = t11.code
  LEFT JOIN typecode      AS t12 ON events.Actor1Type2Code = t12.code
  LEFT JOIN typecode      AS t13 ON events.Actor1Type3Code = t13.code

  LEFT JOIN countrycode   AS c2  ON events.Actor2CountryCode = c2.code
  LEFT JOIN groupcode     AS g2  ON events.Actor2KnownGroupCode = g2.code
  LEFT JOIN ethniccode    AS e2  ON events.Actor2EthnicCode = e2.code
  LEFT JOIN religioncode  AS r21 ON events.Actor2Religion1Code = r21.code
  LEFT JOIN religioncode  AS r22 ON events.Actor2Religion2Code = r22.code
  LEFT JOIN typecode      AS t21 ON events.Actor2Type1Code = t21.code
  LEFT JOIN typecode      AS t22 ON events.Actor2Type2Code = t22.code
  LEFT JOIN typecode      AS t23 ON events.Actor2Type3Code = t23.code

  LEFT JOIN eventcode     AS ev1 ON events.EventCode = ev1.code
  LEFT JOIN eventcode     AS ev2 ON events.EventBaseCode = ev2.code
  LEFT JOIN eventcode     AS ev3 ON events.EventRootCode = ev3.code;
