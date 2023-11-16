import React from 'react';

import '../../style/ControlPanel.css';
import BasemapSelector from './BasemapSelector';
import DebugDumpButton from './DebugDumpButton';
import LayoutConfigurator from './LayoutConfigurator';
import NotProcessedLayerToggle from './NotProcessedLayerToggle';
import RegionSelector from './RegionSelector';
import RasterOpacitySlider from './RasterOpacitySlider';
import RefreshPageButton from './RefreshPageButton';
import SweSelector from './SweSelector';
import {ENVIRONMENT} from '../../constants/env';


const ControlPanel: React.FC = () => {
  return (
    <div className="ControlPanel">
      {ENVIRONMENT === 'development' &&
        <DebugDumpButton />
      }

      <LayoutConfigurator />

      <BasemapSelector />
      <RegionSelector />
      <SweSelector />

      <NotProcessedLayerToggle />
      <RasterOpacitySlider />

      <RefreshPageButton />

    </div>
  );
}

export default ControlPanel;
