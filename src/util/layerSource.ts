import XYZ from 'ol/source/XYZ';

import {UsgsBasemapName} from '../types/Basemap';


const basemapSourceDefaults = {
  maxZoom: 8,
}
export const getUsgsBasemapSource = (basemap: UsgsBasemapName): XYZ => {
  const basemap_url = (
    'https://basemap.nationalmap.gov/arcgis/rest/services'
    + `/${basemap}/MapServer/tile/{z}/{y}/{x}`
  );
  return new XYZ({
    ...basemapSourceDefaults,
    url: basemap_url,
  });
}
