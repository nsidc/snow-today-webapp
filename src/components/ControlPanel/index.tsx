import React from 'react';
import {useRecoilValue} from 'recoil';

import '@src/style/ControlPanel.css';
import selectedSuperRegionIdAtom from '@src/state/client/selectedSuperRegionId';
import LoadingMessage from '@src/components/common/LoadingMessage';
import BasemapSelector from './BasemapSelector';
import DebugDumpButton from './DebugDumpButton';
import LayoutConfigurator from './LayoutConfigurator';
import NotProcessedLayerToggle from './NotProcessedLayerToggle';
import RegionSelector from './RegionSelector';
import RasterOpacitySlider from './RasterOpacitySlider';
import RefreshPageButton from './RefreshPageButton';
import SweSelector from './SweSelector';

declare const __ENVIRONMENT__: 'development' | 'production';
if (__ENVIRONMENT__ === 'development') {
  console.debug(`Environment is: ${__ENVIRONMENT__}`);
}


const ControlPanel: React.FC = () => {
  const selectedSuperRegionId = useRecoilValue(selectedSuperRegionIdAtom);

  if (!selectedSuperRegionId) {
    return (
      <div className={'centered-card-text'}>
        <LoadingMessage message="Select a region to begin..." />
      </div>
    );
  }

  return (
    <div className="ControlPanel">
      {__ENVIRONMENT__ === 'development' &&
        <DebugDumpButton />
      }

      <RegionSelector />
      <LayoutConfigurator />

      <BasemapSelector />
      <SweSelector />

      <NotProcessedLayerToggle />
      <RasterOpacitySlider />

      <RefreshPageButton />

    </div>
  );
}

export default ControlPanel;
