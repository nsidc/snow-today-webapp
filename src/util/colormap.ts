import colormap from 'colormap';


export const colorStopsFromColorMapName = (
  colorMapName: string,
  min: number,
  max: number,
  steps: number,
  reverse: boolean,
): Array<number | number[]> => {
  /* Generate OpenLayers style color-stops from colormap name. */
  const colors = colormap({
    colormap: colorMapName,
    nshades: steps,
    format: 'rgba',
  });

  return colorStopsFromColorMap(
    colors,
    min,
    max,
    reverse,
  );
}

export const colorStopsFromColorMap = (
  colorMap: Array<number[]>,
  min: number,
  max: number,
  reverse: boolean,
): Array<number | number[]> => {
  /* Generate OpenLayers style color-stops from colormap.
   *
   * Based on educational materials from OpenLayers:
   *     https://openlayers.org/workshop/en/cog/colormap.html
   */
  const steps = colorMap.length;
  const delta = (max - min) / (steps - 1);
  const stops = new Array<number | number[]>(steps * 2);
  if (reverse) {
    colorMap.reverse();
  }
  for (let i = 0; i < steps; i++) {
    stops[i * 2] = min + i * delta;
    stops[i * 2 + 1] = colorMap[i];
  }
  return stops;
}
