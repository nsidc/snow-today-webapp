# TODO

## Names

* SatelliteVariables -> RasterVariables? We now have two mutually exclusive "types" of
  variables: SWE points, and various raster variables.
* selectedRegion -> selectedRegionName
* selectedRegionObject -> selectedRegion


### Recoil atoms/selectors

Selectors are not atoms. We should use the suffix `State` per the docs.



## Data / server-side considerations

* Consider moving `variablesIndex` into Recoil state graph instead of ReactQuery, then
  the `tileLayout` state can be a selector depending on it, instead of the current hacky
  callback approach.

### SWE

Consider converting to GeoJSON in the ingest process.


## Dependencies

### React-query

Do we need it? Recoil documents async queries:
https://recoiljs.org/docs/guides/asynchronous-data-queries

The codebase could be much simpler if we eliminated ReactQuery -- we're not using any of
its mutation features anyway.


## Versioning

* How to keep track of compatibility between the server (data schemas) and this app
  (query types)? Can we write a utility that analyzes jsonschema files with typescript
  type definitions for compatibility? Maybe we could use `typescript-json-schema` to
  convert the Typescript interfaces to JSON schemas and diff?


## Checks

* Disallow subscript notation (`foo["bar"]`) in favor of dot notation (`foo.bar`) to get
  stronger interface safety. (<https://eslint.org/docs/latest/rules/dot-notation>)


## Package size

* Use only one icon set, instead of 3 (Bootstrap, FontAwesome, Material)
