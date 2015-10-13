#!/bin/bash
echo "DROP DATABSE IF EXISTS gdelt" | psql
echo "CREATE DATABASE gdelt" | psql
psql -d gdelt -a -f initDB.sql
