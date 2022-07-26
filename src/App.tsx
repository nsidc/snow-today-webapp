import React from 'react';

import pkg from '../package.json';
import './style/App.css';
import SlippyMap from './components/SlippyMap';
import BasemapSelector from './components/BasemapSelector';
import DebugDumpButton from './components/DebugDumpButton';

declare var __ENVIRONMENT__: 'development' | 'production';
if (__ENVIRONMENT__ === 'development') {
  console.log(`Environment is: ${__ENVIRONMENT__}`);
}

const App: React.FC = () => {
  return (
    <div className="App">
      <div id="version">v{pkg.version}</div>

      {__ENVIRONMENT__ === 'development' &&
        <DebugDumpButton />
      }

      <SlippyMap />

      <BasemapSelector />

    </div>
  );
}

export default App;
