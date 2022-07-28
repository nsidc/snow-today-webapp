import colormap from 'colormap';


export const colorStopsFromColorMap = (
  colorMapName: string,
  min: number,
  max: number,
  steps: number,
  reverse: boolean,
): Array<number | number[]> => {
  /* Generate OpenLayers style color-stops from colormap name.
   *
   * Based on educational materials from OpenLayers:
   *     https://openlayers.org/workshop/en/cog/colormap.html
   */
  const delta = (max - min) / (steps - 1);
  const stops = new Array<number | number[]>(steps * 2);
  const colors = colormap({
    colormap: colorMapName,
    nshades: steps,
    format: 'rgba',
  });
  if (reverse) {
    colors.reverse();
  }
  for (let i = 0; i < steps; i++) {
    stops[i * 2] = min + i * delta;
    stops[i * 2 + 1] = colors[i];
  }
  return stops;
}
