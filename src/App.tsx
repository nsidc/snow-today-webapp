import React from 'react';

import pkg from '../package.json';
import './style/App.css';
import SlippyMap from './components/SlippyMap';
import BasemapSelector from './components/BasemapSelector';
import DebugDumpButton from './components/DebugDumpButton';


const App: React.FC = () => {
  return (
    <div className="App">
      <div id="version">v{pkg.version}</div>

      <DebugDumpButton />

      <SlippyMap />

      <BasemapSelector />

    </div>
  );
}

export default App;
