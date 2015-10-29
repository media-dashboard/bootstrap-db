#!/bin/bash
echo "DROP DATABASE IF EXISTS gdelt" | psql
echo "CREATE DATABASE gdelt" | psql
echo "CREATE EXTENSION IF NOT EXISTS PostGIS" | psql -d gdelt
psql -d gdelt -a -f db/eventsTable.sql
