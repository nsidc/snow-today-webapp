// TODO: Should we just develop an API that serves the correct TIF or GeoJSON
// (or other data)?
export const dataServerUrl = 'http://integration.snow-today.apps.int.nsidc.org:8000'

// Information about regions:
export const regionsIndexUrl = `${dataServerUrl}/regions.json`;

// Satellite variables corresponding to plot data and Cloud-Optimized GeoTIFFs:
export const variablesIndexUrl = `${dataServerUrl}/variables.json`;
