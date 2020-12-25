import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateContextProvider } from './context/state'


ReactDOM.render(
  <React.StrictMode>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
