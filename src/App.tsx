import React from 'react';

import pkg from '../package.json';
import './style/App.css';
import MapComponent from './components/Map';
import BasemapSelector from './components/BasemapSelector';
import DebugDumpButton from './components/DebugDumpButton';

declare var __ENVIRONMENT__: string;


const App: React.FC = () => (
  <div className="App">

    <div id="version">v{pkg.version}</div>

    <MapComponent />

    <BasemapSelector />

    <DebugDumpButton />

  </div>
);

export default App;
