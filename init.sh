#!/bin/bash

# create database w/ extensions
echo "DROP DATABASE IF EXISTS gdelt" | psql
echo "CREATE DATABASE gdelt" | psql
echo "CREATE EXTENSION IF NOT EXISTS PostGIS" | psql -d gdelt

# create tables
echo "create countryCode table"
psql -d gdelt -f db/countryCodeTable.sql
echo "create ethnicCode table"
psql -d gdelt -f db/ethnicCodeTable.sql
echo "create knownGroupCode table"
psql -d gdelt -f db/knownGroupCodeTable.sql
echo "create religionCode table"
psql -d gdelt -f db/religionCodeTable.sql
echo "create eventCode table"
psql -d gdelt -f db/eventCodeTable.sql
echo "create typeCode table"
psql -d gdelt -f db/typeCodeTable.sql
echo "create events table"
psql -d gdelt -f db/eventsTable.sql

# create views
echo "create events full text view"
psql -d gdelt -f db/eventsFullView.sql
