const getDataServerUrl = (): string => {
  // If it looks like the app is running in a non-production deployment, treat
  // it like a dev/testing deployment and expect the data server to be running
  // on the same host at the default port.
  if (window.location.port === "8080") {
    return `${window.location.protocol}//${window.location.hostname}`;
  }

  // Integration Data Server URL: https://integration.nsidc.org/api/snow-today/
  // Production Data Server URL (pasted below): https://nsidc.org/api/snow-today/ 

  return 'https://nsidc.org/api/snow-today';
}

export const dataServerUrl = getDataServerUrl();
export const commonDataUrl = `${dataServerUrl}/common`;
export const sspDataUrl = `${dataServerUrl}/snow-surface-properties`;
export const sweDataUrl = `${dataServerUrl}/snow-water-equivalent`;

export const colormapsIndexUrl = `${commonDataUrl}/colormaps.json`;

export const regionsUrl = `${sspDataUrl}/regions`;
export const regionsIndexUrl = `${regionsUrl}/root.json`;

export const sspVariablesIndexUrl = `${sspDataUrl}/variables.json`;
export const sspLegendsUrl = `${sspDataUrl}/legends`;

export const sweVariablesIndexUrl = `${sweDataUrl}/variables.json`;
export const sweLegendsUrl = `${sweDataUrl}/regions/legends`;
export const swePointsUrl = `${sweDataUrl}/points/swe.json`;
