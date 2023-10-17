import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import pkg from '../package.json';
import './style/App.css';
import ControlPanel from './components/ControlPanel';
import TileLayout from './components/TileLayout';


const ErrorFallbackComponent = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Something no good happen!</p>
    <pre style={{backgroundColor: "whitesmoke", color: "red"}}>{error.message}</pre>

    <button onClick={resetErrorBoundary}>Retry</button>
  </div>
);


const App: React.FC = () => {
  return (
    <div className={"App"}>
      <div id={"version"}>v{pkg.version}</div>

      <ErrorBoundary
        FallbackComponent={ErrorFallbackComponent}
        onReset={(something) => {
          console.log(something);
        }}
      >
        <ControlPanel />
        <TileLayout />
      </ErrorBoundary>

    </div>
  );
}

export default App;
