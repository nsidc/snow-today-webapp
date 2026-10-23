import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {useAtomValue} from 'jotai';

import ErrorFallbackComponent from '@src/components/common/ErrorFallback';
import {selectedSuperRegionAtom} from '@src/state/client/derived/selectedSuperRegion';
import TabLayout from './TabLayout';
import SuperRegionSplashSelector from './SuperRegionSplashSelector';

const MainWindow: React.FC = () => {
  const selectedSuperRegion = useAtomValue(selectedSuperRegionAtom);

  const MainComponent = selectedSuperRegion ? TabLayout : SuperRegionSplashSelector;
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <MainComponent />
    </ErrorBoundary>
  );
}

export default MainWindow;
