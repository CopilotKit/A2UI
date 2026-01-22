import React from 'react';
import ReactDOM from 'react-dom/client';
import { A2UIProvider, initializeDefaultCatalog } from '@a2ui/react';
import { injectStyles } from '@a2ui/react/styles';
import { FixturePage } from './FixturePage';
import { visualParityTheme } from '../../fixtures/theme';

// Initialize the default component catalog
initializeDefaultCatalog();

// Inject A2UI structural CSS (required for litTheme utility classes)
injectStyles();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <A2UIProvider theme={visualParityTheme}>
      <FixturePage />
    </A2UIProvider>
  </React.StrictMode>
);
