import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import pkg from '../package.json';
import './style/App.css';
import './style/error.css';
import ControlPanel from './components/ControlPanel';
import TileLayout from './components/TileLayout';
import ErrorFallbackComponent from './components/ErrorFallback';


const App: React.FC = () => {
  return (
    <div className={"App"}>
      <div id={"version"}>v{pkg.version}</div>

      <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
        <ControlPanel />
        <TileLayout />
      </ErrorBoundary>

    </div>
  );
}

export default App;
