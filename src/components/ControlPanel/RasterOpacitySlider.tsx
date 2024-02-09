import React from 'react';
import {useAtom} from 'jotai';

import {rasterOpacityAtom} from '@src/state/client/rasterOpacity';


const RasterOpacitySlider: React.FC = () => {
  const [rasterOpacity, setRasterOpacity] = useAtom(rasterOpacityAtom);

  return (
    <span className={'RasterOpacity'}>
      <label htmlFor={'raster-opacity-slider'}>Raster opacity: </label>
      <input id={'raster-opacity-slider'}
        type={'range'}
        min={0}
        max={100}
        className={'slider'}
        value={rasterOpacity}
        onChange={e => setRasterOpacity(Number(e.currentTarget.value))} />
    </span>
  );
};

export default RasterOpacitySlider; 
