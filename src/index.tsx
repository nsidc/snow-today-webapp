import React from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import App from './App';

// TODO: Do we need all these weights?
import '@fontsource/roboto';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
