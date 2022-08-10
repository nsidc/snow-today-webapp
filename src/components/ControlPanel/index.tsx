import React from 'react';

import '../../style/ControlPanel.css';
import BasemapSelector from './BasemapSelector';
import DebugDumpButton from './DebugDumpButton';
import RegionSelector from './RegionSelector';
import RasterVariableSelector from './RasterVariableSelector';
import RasterOpacitySlider from './RasterOpacitySlider';

declare const __ENVIRONMENT__: 'development' | 'production';
if (__ENVIRONMENT__ === 'development') {
  console.debug(`Environment is: ${__ENVIRONMENT__}`);
}


const ControlPanel: React.FC = () => {
  return (
    <div className="ControlPanel">
      {__ENVIRONMENT__ === 'development' &&
        <DebugDumpButton />
      }

      <BasemapSelector />
      <RegionSelector />
      <RasterVariableSelector />
      <RasterOpacitySlider />

    </div>
  );
}

export default ControlPanel;
