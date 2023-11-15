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


### Webpack dev server

[v4.12.x-v4.15.x](https://github.com/webpack/webpack-dev-server/blob/master/CHANGELOG.md)
added overlays for runtime errors and unhandled promise rejection. These seem to be
triggered by errors that we are handling with error boundaries. Disabled runtime error
overlays to work around. We need to add handling for the runtime errors, or figure out
why webpack-dev-server isn't understanding our error boundaries.


### Some babel plugins

```
One of your dependencies, babel-preset-react-app, is importing the
"@babel/plugin-proposal-private-property-in-object" package without
declaring it in its dependencies. This is currently working because
"@babel/plugin-proposal-private-property-in-object" is already in your
node_modules folder for unrelated reasons, but it may break at any time.

babel-preset-react-app is part of the create-react-app project, which
is not maintianed anymore. It is thus unlikely that this bug will
ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to
your devDependencies to work around this error. This will make this message
go away.

$ npm i --save-dev "@babel/plugin-proposal-private-property-in-object"
  npm WARN deprecated @babel/plugin-proposal-private-property-in-object@7.21.11: This
  proposal has been merged to the ECMAScript standard and thus this plugin is no longer
  maintained. Please use @babel/plugin-transform-private-property-in-object instead.
```

What do?


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
