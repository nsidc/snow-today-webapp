import XYZ from 'ol/source/XYZ';

import {ArcGisBasemapName, UsgsBasemapName} from '../types/Basemap';


const basemapSourceDefaults = {
  maxZoom: 8,
}
export const getUsgsBasemapSource = (
  basemapName: UsgsBasemapName,
): XYZ => {
  const basemap_url = (
    'https://basemap.nationalmap.gov/arcgis/rest/services'
    + `/${basemapName}/MapServer/tile/{z}/{y}/{x}`
  );
  return new XYZ({
    ...basemapSourceDefaults,
    url: basemap_url,
  });
}

export const getArcGisBasemapSource = (
  basemapName: ArcGisBasemapName,
): XYZ => {
  const basemap_url = (
    'https://services.arcgisonline.com/ArcGIS/rest/services/'
    + `${basemapName}/MapServer/tile/{z}/{y}/{x}.pbf`
  );
  return new XYZ({
    ...basemapSourceDefaults,
    url: basemap_url,
  });
}
