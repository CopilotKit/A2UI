import React from 'react';
import ReactDOM from 'react-dom/client';
import { A2UIProvider, initializeDefaultCatalog, litTheme } from '@a2ui/react';
import { injectStyles } from '@a2ui/react/styles';
import { FixturePage } from './FixturePage';

// Initialize the default component catalog
initializeDefaultCatalog();

// Inject A2UI structural CSS (required for litTheme utility classes)
injectStyles();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <A2UIProvider theme={litTheme}>
      <FixturePage />
    </A2UIProvider>
  </React.StrictMode>
);
