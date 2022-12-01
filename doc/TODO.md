# TODO

## Names

* selectedRegion -> selectedRegionName
* selectedRegionObject -> selectedRegion


## Data / server-side considerations

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
