import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {RecoilRoot} from 'recoil';
import {QueryClientProvider} from '@tanstack/react-query';
// NOTE: This shouldn't be included in non-dev builds...
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import './style/index.css';
import './style/common.css';
import App from './App';
import LoadingMessage from './components/common/LoadingMessage';
import {queryClient} from './util/query';

import 'bootstrap/dist/css/bootstrap.min.css';

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
    <Suspense fallback={<div className="centered"><LoadingMessage small={false} /></div>}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('snow-today-webapp-appcontainer')
);
