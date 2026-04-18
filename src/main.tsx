import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("MAIN TSX RUNNING");

import '@ionic/react/css/core.css';

const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);