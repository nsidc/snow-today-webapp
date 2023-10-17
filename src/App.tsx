import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import pkg from '../package.json';
import './style/App.css';
import './style/error.css';
import ControlPanel from './components/ControlPanel';
import TileLayout from './components/TileLayout';


const ErrorFallbackComponent = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="error">
    <h3>Woops!</h3>

    <div className="error-message">{error.message}</div>

    <p>
     It's likely this application is down because other web services it depends on are currently down.
     Refresh the page later to try again.
    </p>

    <p><b>
      {"Please contact "}
      <a href="mailto:nsidc@nsidc.org">NSIDC User Services</a>
      {" if you need additional assistance."}
    </b></p>
  </div>
);


const App: React.FC = () => {
  return (
    <div className={"App"}>
      <div id={"version"}>v{pkg.version}</div>

      <ErrorBoundary
        FallbackComponent={ErrorFallbackComponent}
        onReset={(something) => {
          debugger;
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
