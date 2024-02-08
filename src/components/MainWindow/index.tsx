import React from 'react';
import {useAtomValue} from 'jotai';

import {selectedSuperRegionAtom} from '@src/state/client/derived/selectedSuperRegion';
import TileLayout from './TileLayout';
import SuperRegionSplashSelector from './SuperRegionSplashSelector';

const MainWindow: React.FC = () => {
  const selectedSuperRegion = useAtomValue(selectedSuperRegionAtom);

  const MainComponent = selectedSuperRegion ? TileLayout : SuperRegionSplashSelector;
  return (
    <>
      <MainComponent />
    </>
  );
}

export default MainWindow;
