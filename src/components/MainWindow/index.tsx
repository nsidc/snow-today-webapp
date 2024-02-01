import React from 'react';
import {useAtomValue} from 'jotai';
// import { ErrorBoundary } from 'react-error-boundary';

// import ErrorFallbackComponent from '@src/components/common/ErrorFallback';
import {selectedSuperRegionAtom} from '@src/state/client/derived/selectedSuperRegion';
import TileLayout from './TileLayout';
import SuperRegionSplashSelector from './SuperRegionSplashSelector';

const MainWindow: React.FC = () => {
  const selectedSuperRegion = useAtomValue(selectedSuperRegionAtom);

  const MainComponent = selectedSuperRegion ? TileLayout : SuperRegionSplashSelector;
  return (
    <>
    {/* <ErrorBoundary FallbackComponent={ErrorFallbackComponent}> */}
      <MainComponent />
    {/* </ErrorBoundary> */}
    </>
  );
}

export default MainWindow;
