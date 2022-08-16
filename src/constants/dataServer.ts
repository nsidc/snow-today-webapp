// TODO: Should we just develop an API that serves the correct TIF or GeoJSON
// (or other data)?
export const dataServerUrl = 'http://integration.snow-today.apps.int.nsidc.org:8000'

// Information about regions:
export const regionsIndexUrl = `${dataServerUrl}/regions.json`;

// Cloud-optimized GeoTIFF variables:
export const variablesIndexUrl = `${dataServerUrl}/variables.json`;

// Test data for plotting. TODO: Calculate plot URL for given variable from the variables Index!
export const plotTestFileUrl = `${dataServerUrl}/plots/SnowToday_USCO_Albedo_WY2022_yearToDate.json`;
