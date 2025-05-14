import React from 'react';
import './styles/App.css';
import { ActionsPane } from './components/ActionsPane/ActionsPane';
import { BrandThemeProvider } from './styles/BrandThemeProvider';

function App() {
  return (
    <BrandThemeProvider theme="light">
      <div className="app-container">
        <ActionsPane />
      </div>
    </BrandThemeProvider>
  );
}

export default App;
