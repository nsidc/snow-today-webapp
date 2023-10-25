import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import pkg from '../package.json';
import './style/App.css';
import './style/error.css';
import ControlPanel from './components/ControlPanel';
import MainWindow from './components/MainWindow';
import ErrorFallbackComponent from './components/common/ErrorFallback';


const App: React.FC = () => {
  return (
    <div className={"App"}>
      <div id={"version"}>v{pkg.version}</div>

      <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
        <ControlPanel />
        <MainWindow />
      </ErrorBoundary>

    </div>
  );
}

export default App;
