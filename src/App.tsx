import React, {useState} from 'react';
import BaseLayer from 'ol/layer/Base';

import pkg from '../package.json';
import './style/App.css';
import Map from './components/Map';
import BasemapSelector from './components/BasemapSelector';
import {basemapUsgsTopo, basemapLayersByName} from './util/layers';


const App: React.FC = () => {
  const [ selectedBasemap, setSelectedBasemap ] = useState<BaseLayer>(basemapUsgsTopo);

  // debugger;
  return (
    <div className="App">
      <div id="version">v{pkg.version}</div>

      <Map
        selectedBasemap={selectedBasemap} />

      <BasemapSelector
        basemapLayersByName={basemapLayersByName}
        selectedBasemap={selectedBasemap}
        onChange={setSelectedBasemap} />

    </div>
  );
}

export default App;
