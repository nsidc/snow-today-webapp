import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { IconContext } from 'react-icons';
import { DevTools } from 'jotai-devtools';

import pkg from '../package.json';
import '@src/style/App.css';
import '@src/style/icons.css';
import MainWindow from '@src/components/MainWindow';
import ErrorFallbackComponent from '@src/components/common/ErrorFallback';


const App: React.FC = () => {
  return (
    <>
      <DevTools />
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <div className={"App"}>
          <div id={"version"}>v{pkg.version}</div>

          <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
            <MainWindow />
          </ErrorBoundary>

        </div>
      </IconContext.Provider>
    </>
  );
}

export default App;
