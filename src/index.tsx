import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/iconStyles.css';
import App from './App';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
