import React, { useState } from 'react'; // Added useState
import './styles/App.css';
import { ActionsPane } from './components/ActionsPane/ActionsPane';
import { BrandThemeProvider } from './styles/BrandThemeProvider';
import { PasswordOverlay } from './components/PasswordProtection/PasswordOverlay';
import { Button, makeStyles, tokens } from '@fluentui/react-components'; // Added Fluent UI components
import { Bug24Regular } from '@fluentui/react-icons'; // Added Bug icon
import { ClearCacheDialog } from './components/common/ClearCacheDialog'; // Added ClearCacheDialog

// Define styles for the debug button
const useAppStyles = makeStyles({
  debugButtonContainer: {
    position: 'fixed',
    bottom: tokens.spacingVerticalL, 
    right: tokens.spacingHorizontalL, 
    zIndex: '10000', 
  },
});

function App() {
  const appStyles = useAppStyles();
  const [isClearCacheDialogOpen, setIsClearCacheDialogOpen] = useState(false);

  return (
    <BrandThemeProvider theme="light">
      <PasswordOverlay correctPassword="actions2025">
        <div className="app-container">
          <ActionsPane />
        </div>
      </PasswordOverlay>
      {/* Debug Button and Dialog */}
      <div className={appStyles.debugButtonContainer}>
        <Button
          appearance="primary"
          icon={<Bug24Regular />}
          onClick={() => setIsClearCacheDialogOpen(true)}
          aria-label="Open Debug Options"
        />
      </div>
      <ClearCacheDialog
        open={isClearCacheDialogOpen}
        onOpenChange={setIsClearCacheDialogOpen}
      />
    </BrandThemeProvider>
  );
}

export default App;
