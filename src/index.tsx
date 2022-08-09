import React from 'react';
import ReactDOM from 'react-dom';
import {RecoilRoot} from 'recoil';
import {QueryClientProvider} from '@tanstack/react-query';
// NOTE: This shouldn't be included in non-dev builds...
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import './style/index.css';
import App from './App';
import {queryClient} from './util/query';

// TODO: Do we need all these weights?
import '@fontsource/roboto';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';


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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
