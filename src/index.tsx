import React from 'react';
import ReactDOM from 'react-dom';
import {RecoilRoot} from 'recoil';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import './style/index.css';
import App from './App';

// TODO: Do we need all these weights?
import '@fontsource/roboto';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

const queryClient = new QueryClient()

// NOTE: The React 18 way of doing this seems to break the interface between
// OpenLayers and React. I don't know why. This is the new way that causes
// issues:
//
//     import { createRoot } from 'react-dom/client';
//
//     const container = document.getElementById('root');
//     const root = createRoot(container!);
//     root.render(
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     )
//
// See the browser console for details on this issue and a link to more docs.
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
