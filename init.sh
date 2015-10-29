#!/bin/bash

# create database w/ extensions
echo "DROP DATABASE IF EXISTS gdelt" | psql
echo "CREATE DATABASE gdelt" | psql
echo "CREATE EXTENSION IF NOT EXISTS PostGIS" | psql -d gdelt

# create tables
psql -d gdelt -a -f db/eventsTable.sql
psql -d gdelt -a -f db/countryCodeTable.sql
psql -d gdelt -a -f db/ethnicCodeTable.sql
psql -d gdelt -a -f db/knownGroupCodeTable.sql
psql -d gdelt -a -f db/religionCodeTable.sql
psql -d gdelt -a -f db/typeCodeTable.sql
