# Development

To use the development configuration, create a compose override file:

```
ln -s compose.dev.yml compose.override.yml
```

Run the docker file

```
docker compose up --detach
```

View docker logs when using `--detach`

```
docker compose logs --follow
```

If the docker container is successfully created and running, then your app should be available to view at <http://localhost:8080>.


## Snow Today Server

The Snow Today webapp relies on a backend service provided by the [Snow Today server](https://github.com/nsidc/snow-today-webapp-server). See the Snow Today server documentation for more information about developing the server.

In a development environment, the Snow Today webapp assumes that the Snow Today server is available on the localhost. To develop the Snow Today webapp while using the production Snow Today server (e.g., because you only need to make changes to the frontend and do not need to setup the server for development purposes), manually edit [getDataServerUrl](https://github.com/nsidc/snow-today-webapp/blob/cb34c97ad41bb81bb4571555a0ff5e226cdc982e/src/constants/dataServer.ts#L1-L10) to always return the production data server [URL](https://nsidc.org/api/snow-today). 

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
