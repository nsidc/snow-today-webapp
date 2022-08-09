import {
  colorStopsFromColorMap,
  colorStopsFromColorMapName,
} from '../colormap'

const colormapTest = [
  [255, 255, 217],
  [237, 248, 177],
  [199, 233, 180],
  [127, 205, 187],
  [65, 182, 196],
  [29, 145, 192],
  [34, 94, 168],
  [37, 52, 148],
  [8, 29, 88],
]


test('Generates correct number of color stops from hard-coded colormap', () =>{
  const colorStops = colorStopsFromColorMap(colormapTest, 0, 100, false);
  expect(colorStops.length).toEqual(colormapTest.length * 2);
});

test('Generates correct number of color stops from named colormap', () => {
  const steps = 15
  const colorStops = colorStopsFromColorMapName('temperature', 0, 100, steps, false);
  expect(colorStops.length).toEqual(steps * 2);
});
