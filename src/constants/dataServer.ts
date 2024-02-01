const getDataServerUrl = (): string => {
  // If it looks like the app is running in a non-production deployment, treat
  // it like a dev/testing deployment and expect the data server to be running
  // on the same host at the default port.
  if (window.location.port === "8080") {
    return `${window.location.protocol}//${window.location.hostname}`;
  }

  return 'https://nsidc.org/api/snow-today';
}

export const dataServerUrl = getDataServerUrl();
export const sspDataUrl = `${dataServerUrl}/snow-surface-properties`;
export const sweDataUrl = `${dataServerUrl}/snow-water-equivalent`;
export const legendsUrl = `${sspDataUrl}/legends`;

// Information about regions:
export const regionsUrl = `${sspDataUrl}/regions`;
export const regionsIndexUrl = `${regionsUrl}/root.json`;

// Information about satellite variables corresponding to plot data and
// Cloud-Optimized GeoTIFFs:
export const variablesIndexUrl = `${sspDataUrl}/variables.json`;
export const colormapsIndexUrl = `${sspDataUrl}/colormaps.json`;

export const swePointsUrl = `${sweDataUrl}/points/swe.json`;
