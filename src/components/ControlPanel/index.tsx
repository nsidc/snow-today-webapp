import React, {Suspense} from 'react';

import '@src/style/ControlPanel.css';
import RefreshPageButton from '@src/components/common/RefreshPageButton';
import BasemapSelector from './BasemapSelector';
import LayoutConfigurator from './LayoutConfigurator';
import NotProcessedLayerToggle from './NotProcessedLayerToggle';
import ShowZeroOrMissingToggle from './ShowZeroOrMissingToggle';
import RegionSelector from './RegionSelector';
import RasterOpacitySlider from './RasterOpacitySlider';
import SweSelector from './SweSelector';
import InteractiveMapSatelliteVariableSelector from './InteractiveMapSatelliteVariableSelector';
import InteractivePlotSatelliteVariableSelector from './InteractivePlotSatelliteVariableSelector';

export enum PanelType {
  TILED = 'tiled',
  MAP = 'map',
  PLOT = 'plot'
}
interface IControlPanelProps {
  layoutType: PanelType
}

const ControlPanel: React.FC<IControlPanelProps> = (props) => {
  const isMap = props.layoutType !== PanelType.PLOT;

  return (
    <div className="ControlPanel">

      <RegionSelector />
      {props.layoutType === PanelType.TILED && <LayoutConfigurator />}

      {isMap && (
        <>
          <BasemapSelector />
          <SweSelector />

          <NotProcessedLayerToggle />
          <ShowZeroOrMissingToggle />
          <RasterOpacitySlider />
        </>
      )}

      {props.layoutType === PanelType.MAP && (
        <Suspense fallback={<div>Loading...</div>}>
          <InteractiveMapSatelliteVariableSelector />
        </Suspense>
      )}

      {props.layoutType === PanelType.PLOT && (
        <Suspense fallback={<div>Loading...</div>}>
          <InteractivePlotSatelliteVariableSelector />
        </Suspense>
      )}

      <RefreshPageButton />

    </div>
  );
}

export default ControlPanel;
