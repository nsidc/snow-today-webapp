# Development

To use the development configuration, create a compose override file:

```
ln -s compose.dev.yml compose.override.yml
```

Run the docker file

```
docker compose -f compose.dev.yml up
```

If the docker container is successfully created and running, then your app should be available to view at __http://localhost:8080__.


## Snow Today Server

It takes a lot to create a local [Snow Today server](https://github.com/nsidc/snow-today-webapp-server) to use for development, so if you are not making changes to it, use the publically deployed Snow Today server instead.

To use the publically available Snow Today server, edit the `/src/constants/dataServer.ts` file by commenting out lines 5-7. This will ensure the data server used is __https://nsidc.org/api/snow-today__ instead of __http://localhost:8080__.


## State management

This app uses Jotai for state management.

~~Recoil freezes all objects used for state, so do not use objects that are expected to be
mutated in state, e.g. Layer objects. They are OK in derived state (with
`allowDangerousMutations`), but not state that will be directly updated.~~ TODO: Update for Jotai


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
