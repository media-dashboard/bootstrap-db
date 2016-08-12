## Inconsistencies
* csv vs. tsv
* 2013-04-01 contains rows for dates 2003-04-04 - 2013-03-31
* single story (i.e. same url) coded as multiple events (coded similarly)
* duplicate 'WTO' entries in KnownGroupCode; duplicate 'Unknown State Actor' in typeCode; duplicate in ethnicCode; many key conflicts in knownGroupCode, ethnicCode
* GeoCountryCodes do not map to CAMEO countryCodes, as ActorCountryCodes do

### Column Inconsistencies
* Url: shows 'BBC Monitoring'
  * this is mentioned in the docs
* Geo_FeatureID: can contain data from Geo_ADM1Code (FIPS10-4 country code or admin1 code), rather than GNS/GNIS code
  * these are cases when Geo_Type != 3 or 4, meaning precision isn't high enough.  though documentation says fields should be blank in these cases
* eventcode can be '---', rather than null
* ActorCode is not a concatenation of all the disaggregated actorcodes (e.g. country, ethnic, religious, type):
      SELECT actor1code, char_length(actor1code),
        char_length(actor1code) = char_length( COALESCE(actor1name, '') || COALESCE(actor1countrycode, '') ||
        COALESCE(actor1knowngroupcode, '') || COALESCE(actor1ethniccode, '') ||
        COALESCE(actor1religion1code, '') || COALESCE(actor1religion2code, '') ||
        COALESCE(actor1type1code, '') || COALESCE(actor1type2code, '') || COALESCE(actor1type3code, '')) AS isequal,
        actor1name, actor1countrycode, actor1knowngroupcode, actor1ethniccode,
        actor1religion1code, actor1religion2code,
        actor1type1code, actor1type2code, actor1type3code
      FROM events
      WHERE actor1code IS NOT NULL
      ORDER BY char_length(actor1code) DESC;

### CAMEO Codebook
* 1213 and 1214 don't exist in Ch 6 CAMEO Event Codes summary, though they are described in Ch 2
