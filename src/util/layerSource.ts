import XYZ from 'ol/source/XYZ';

import {ArcGisBasemapName, UsgsBasemapName} from '../types/Basemap';


export const getUsgsBasemapSource = (
  basemapName: UsgsBasemapName,
): XYZ => {
  const basemap_url = (
    'https://basemap.nationalmap.gov/arcgis/rest/services'
    + `/${basemapName}/MapServer/tile/{z}/{y}/{x}`
  );
  return new XYZ({
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
    url: basemap_url,
  });
}
