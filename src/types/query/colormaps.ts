export interface IColormap {
  name: string;
  colors: [number, number, number][] | [number, number, number, number][];
}
export interface IColormapsIndex {
  [colormapId: string]: IColormap;
}
