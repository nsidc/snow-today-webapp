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
layout. See the [Snow Today Webapp Server
repository](https://github.com/nsidc/snow-today-webapp-server) for details.
