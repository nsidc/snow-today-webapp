import React from 'react';

import '../../style/ControlPanel.css';
import BasemapSelector from './BasemapSelector';
import DebugDumpButton from './DebugDumpButton';
import LayoutConfigurator from './LayoutConfigurator';
import NotProcessedLayerToggle from './NotProcessedLayerToggle';
import RegionSelector from './RegionSelector';
import RasterOpacitySlider from './RasterOpacitySlider';
import RefreshPageButton from './RefreshPageButton';

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
      <LayoutConfigurator />

      <NotProcessedLayerToggle />
      <RasterOpacitySlider />

      <RefreshPageButton />

    </div>
  );
}

export default ControlPanel;
