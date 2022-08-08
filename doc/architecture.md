# Architecture

This application has a client which runs in a user's browser that is responsible for
fetching data and visualizing it, and a server which is responsible for serving up
static data files generated in combination by code in this repository and external code
running on external systems.


## Client

This repository contains a Typescript codebase for visualizing various data stored on a
server.

The client uses OpenLayers to display geospatial data, and ??? to display plots. It uses
`react-query` to manage many communications with the server, but for fetching
Cloud-Optimized GeoTIFFs, OpenLayers directly communicates with the server.


## Server

The server is required for the client to function. The server is a simple HTTP server,
e.g. NGINX or Apache, serving static data files which must be structured in a specific
layout.

```
cogs/                   # Cloud-Optimized GeoTIFFs of raster data variables
  ...
shapes/                 # Shapes of various regions/sub-regions
  states/
    index.json
    <region_id>.json 
statistics/             # Statistics for generating plot visualizations
  ...
```

This repository contains the data needed to populate the `shapes/` directory. The
`cogs/` directory must be populated by running `scripts/make_cogs.sh` on GeoTIFFs
generated externally.
