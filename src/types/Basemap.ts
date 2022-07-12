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
