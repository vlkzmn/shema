import React from 'react';
import ReactDOM from 'react-dom/client';

import { DataProvider } from './DataContext';
import { App } from './App';
import './index.scss';
import './i18n.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
