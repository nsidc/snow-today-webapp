import React from 'react';
import {useRecoilState} from 'recoil';

import rasterOpacityAtom from '../../clientState/rasterOpacity';


const RasterOpacitySlider: React.FC = () => {
  const [rasterOpacity, setRasterOpacity] = useRecoilState(rasterOpacityAtom);

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
