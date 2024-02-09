# Development

To use the development configuration, create a compose override file:

```
ln -s compose.dev.yml compose.override.yml
```


## State management

This app uses Recoil for state management.

Recoil freezes all objects used for state, so do not use objects that are expected to be
mutated in state, e.g. Layer objects. They are OK in derived state (with
`allowDangerousMutations`), but not state that will be directly updated.


## Cloud-Optimized GeoTIFFs

The raster data is stored in COGs accessed by HTTP.

The COGs _must_ be in the same projection as the OpenLayers map in order to properly
display. A script `scripts/make_cogs.sh` can prepare the files correctly.


## Style

### Avoid default exports

This allows imported names to mismatch the export, which is bad for readability when not
done explicitly, i.e. `import {foo as bar} from '...';`.


## TODO

### GeoTIFF Hosting

How are we going to deploy the server hosting the GeoTIFFs?

What's the simplest way to access those images in dev? Should we break that part into a
different repo?
