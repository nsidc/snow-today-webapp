// TODO: Should we just develop an API that serves the correct TIF or GeoJSON
// (or other data)?
export const dataServerUrl = 'http://integration.snow-today.apps.int.nsidc.org:8000'

// Cloud-optimized GeoTIFFs:
export const cogsServerUrl = `${dataServerUrl}/cogs`;
export const cogsIndexUrl = `${cogsServerUrl}/index.json`;

// Information about regions:
export const shapesServerUrl = `${dataServerUrl}/shapes`;
export const stateShapeDirUrl = `${shapesServerUrl}/states`;
export const stateShapeIndexUrl = `${stateShapeDirUrl}/index.json`;
