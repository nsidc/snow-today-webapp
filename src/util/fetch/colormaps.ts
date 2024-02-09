import {colormapsIndexUrl} from '@src/constants/dataServer';
import {IColormapsIndex} from '@src/types/query/colormaps';
import {genericFetch} from './generic';


export const fetchColormapsIndex = (): Promise<IColormapsIndex> => (
  genericFetch<IColormapsIndex>(colormapsIndexUrl, "index of colormap data")
);
