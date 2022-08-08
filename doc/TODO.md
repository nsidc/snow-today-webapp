# TODO

## Architecture

* Consider how raster variables should be indexed on the server. Currently the GeoJSON
  shape data is indexed by an `index.json` file. Should we do the same thing for raster
  variables?


## Types

* There are a lot of `any`s around the queries to the server. How do we deal with typing
  data we don't have until runtime? JSON schemas?
