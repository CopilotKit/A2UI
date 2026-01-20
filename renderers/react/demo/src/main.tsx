import React from 'react';
import ReactDOM from 'react-dom/client';
import { A2UIProvider, initializeDefaultCatalog, litTheme } from '@a2ui/react';
import App from './App';
import './index.css';

// Initialize the default component catalog
initializeDefaultCatalog();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <A2UIProvider theme={litTheme}>
      <App />
    </A2UIProvider>
  </React.StrictMode>
);
