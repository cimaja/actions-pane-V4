import React from 'react';
import './styles/App.css';
import { ActionsPane } from './components/ActionsPane/ActionsPane';
import { BrandThemeProvider } from './styles/BrandThemeProvider';
import { PasswordOverlay } from './components/PasswordProtection/PasswordOverlay';

function App() {
  return (
    <BrandThemeProvider theme="light">
      <PasswordOverlay correctPassword="actions2025">
        <div className="app-container">
          <ActionsPane />
        </div>
      </PasswordOverlay>
    </BrandThemeProvider>
  );
}

export default App;
