## Download Scripts


### Setup DB

run `./init.sh` to set up all postgres tables.  The `init` script will delete the database (called `gdelt` by default) if it already exists, so be careful to only run it when you want to rebuild from scratch.


### Download GDELT

The `lib/get.js` module exposes a file stream of GDELT tsv tabular data for a date range from local or remote sources.  The following scripts demonstrate how to interact with the `get.js` API.

* To get GDELT data from the project's servers and upload to pg, configure date range settings in `remote2pg.js` and run `node remote2pg.js`.

* To get local GDELT data from `data/`, filter, and write out as JSON, configure date range settings and run `node local2JSON.js`. This does not require postgres tables to be set up via `./init.sh`.


### Download Phoenix

...*coming soon?*


### Download ACLED

...*coming soon?*
