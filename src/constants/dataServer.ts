// TODO: Should we just develop an API that serves the correct TIF or GeoJSON
// (or other data)?
export const dataServerUrl = 'http://integration.snow-today.apps.int.nsidc.org:8000'

// Cloud-optimized GeoTIFFs:
export const cogsServerUrl = `${dataServerUrl}/cogs`;
export const testDataUrl = `${cogsServerUrl}/SnowToday_USwest_20220629_Albedo.tif`;

// Information about regions:
export const shapesServerUrl = `${dataServerUrl}/shapes`;
export const stateShapeIndexJson = `${shapesServerUrl}/states/index.json`;
