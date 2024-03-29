# TODO

## Refactors

* Minimize undefined checks. The fact that we have them in so many places is a smell I
  don't like!
* Eliminate all positional parameters from functions with >1 parameter (partial exceptions are
  OK for functions with obvious context, like
  `const logMessage = (message: str, params:  {...}) -> ...`


### Names

* SatelliteVariables -> RasterVariables? We now have two mutually exclusive "types" of
  variables: SWE points, and various raster variables.
* selectedRegion -> selectedRegionName
* selectedRegionObject -> selectedRegion


### State

* More consistent use of jotai-tanstack-query functions
* Combine ID atoms with their related object atoms, e.g. combine region ID and region
  definition into one atom. 
      export interface StateWithId<StateType, IdType = string> {
        id: IdType;
        state: StateType;
      }


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


### Webpack dev server

[v4.12.x-v4.15.x](https://github.com/webpack/webpack-dev-server/blob/master/CHANGELOG.md)
added overlays for runtime errors and unhandled promise rejection. These seem to be
triggered by errors that we are handling with error boundaries. Disabled runtime error
overlays to work around. We need to add handling for the runtime errors, or figure out
why webpack-dev-server isn't understanding our error boundaries.


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
