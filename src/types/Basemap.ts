import XYZ from 'ol/source/XYZ';

const usgsBasemapNames = [
  'USGSTopo',
  'USGSImageryTopo',
  'USGSImageryOnly',
  'USGSShadedReliefOnly',
  'USGSHydroCached',
] as const;

// Dynamically create literal union type(s) from the list(s)
export type UsgsBasemapName = typeof usgsBasemapNames[number];
export type BasemapName = UsgsBasemapName;

const getUsgsBasemapSource = (basemap: UsgsBasemapName): XYZ => {
  const basemap_url = (
    'https://basemap.nationalmap.gov/arcgis/rest/services'
    + `/${basemap}/MapServer/tile/{z}/{y}/{x}`
  );
  return new XYZ({
    ...basemapSourceDefaults,
    url: basemap_url,
  });
}

const basemapSourceDefaults = {
  maxZoom: 8,
}

export const BASEMAPS: {[name in BasemapName]: XYZ} = {
  'USGSTopo': getUsgsBasemapSource('USGSTopo'),
  'USGSImageryTopo': getUsgsBasemapSource('USGSImageryTopo'),
  'USGSImageryOnly': getUsgsBasemapSource('USGSImageryOnly'),
  'USGSShadedReliefOnly': getUsgsBasemapSource('USGSShadedReliefOnly'),
  'USGSHydroCached': getUsgsBasemapSource('USGSHydroCached'),
}
export const BASEMAP_CHOICES = Object.keys(BASEMAPS);
