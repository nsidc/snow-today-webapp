import React from 'react';
import {useRecoilValue} from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallbackComponent from '@src/components/common/ErrorFallback';
import selectedSuperRegionAtom from '@src/state/client/derived/selectedSuperRegion';
import TileLayout from './TileLayout';
import SuperRegionSplashSelector from './SuperRegionSplashSelector';

const MainWindow: React.FC = () => {
  const selectedSuperRegion = useRecoilValue(selectedSuperRegionAtom);

  const MainComponent = selectedSuperRegion ? TileLayout : SuperRegionSplashSelector;
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <MainComponent />
    </ErrorBoundary>
  );
}

export default MainWindow;
