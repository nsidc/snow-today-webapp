const usgsBasemapNames = [
  'USGSTopo',
  'USGSImageryTopo',
  'USGSImageryOnly',
  'USGSShadedReliefOnly',
  'USGSHydroCached',
] as const;

const arcGisBasemapNames = [
  'Canvas/World_Light_Gray_Reference',
  'Canvas/World_Light_Gray_Base',
] as const;

// Dynamically create literal union type(s) from the list(s)
export type UsgsBasemapName = typeof usgsBasemapNames[number];
export type ArcGisBasemapName = typeof arcGisBasemapNames[number];
export type BasemapName = UsgsBasemapName | ArcGisBasemapName;
