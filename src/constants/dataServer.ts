const getDataServerUrl = (): string => {
  // If it looks like the app is running in a non-production deployment, treat
  // it like a dev/testing deployment and expect the data server to be running
  // on the same host at the default port.
  if (window.location.port == "8080") {
    return `${window.location.protocol}//${window.location.hostname}`;
  }

  return 'https://nsidc.org/api/snow-today';
}

export const dataServerUrl = getDataServerUrl();

// Information about regions:
export const regionsIndexUrl = `${dataServerUrl}/regions.json`;

// Information about satellite variables corresponding to plot data and
// Cloud-Optimized GeoTIFFs:
export const variablesIndexUrl = `${dataServerUrl}/variables.json`;

export const swePointsUrl = `${dataServerUrl}/points/swe.json`;
