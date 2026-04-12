import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Spinner } from './components';
import './i18n';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Suspense fallback={<Spinner $visible={true} />}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
);
