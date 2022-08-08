import {colormapBuPu} from '../../constants/colormaps';
import {
  colorStopsFromColorMap,
  colorStopsFromColorMapName,
} from '../colormap'


test('Generates correct number of color stops from hard-coded colormap', () =>{
  const colorStops = colorStopsFromColorMap(colormapBuPu, 0, 100, false);
  expect(colorStops.length).toEqual(colormapBuPu.length * 2);
});

test('Generates correct number of color stops from named colormap', () => {
  const steps = 15
  const colorStops = colorStopsFromColorMapName('temperature', 0, 100, steps, false);
  expect(colorStops.length).toEqual(steps * 2);
});
