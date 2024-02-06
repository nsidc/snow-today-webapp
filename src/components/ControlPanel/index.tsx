import React from 'react';
import {useAtomValue} from 'jotai';

import '@src/style/ControlPanel.css';
import {selectedSuperRegionIdAtom} from '@src/state/client/selectedSuperRegionId';
import LoadingMessage from '@src/components/common/LoadingMessage';
import RefreshPageButton from '@src/components/common/RefreshPageButton';
import BasemapSelector from './BasemapSelector';
import LayoutConfigurator from './LayoutConfigurator';
import NotProcessedLayerToggle from './NotProcessedLayerToggle';
import RegionSelector from './RegionSelector';
import RasterOpacitySlider from './RasterOpacitySlider';
import SweSelector from './SweSelector';


const ControlPanel: React.FC = () => {
  const selectedSuperRegionId = useAtomValue(selectedSuperRegionIdAtom);

  if (!selectedSuperRegionId) {
    return (
      <div className={'centered-card-text'}>
        <LoadingMessage message="Select a region to begin..." />
      </div>
    );
  }

  return (
    <div className="ControlPanel">

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
