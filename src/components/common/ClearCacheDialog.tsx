import React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  makeStyles,
  tokens,
  InfoLabel, // Added InfoLabel, removed Field
} from '@fluentui/react-components';
import { dataService } from '../../data/dataService'; // Adjust path as necessary

interface ClearCacheDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Single consolidated useStyles definition
const useStyles = makeStyles({
  dialogSurface: {
    width: '480px',
    maxWidth: '100%',
    padding: tokens.spacingVerticalL,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL, // Gap between each action group
  },
  actionItemGroup: { // Group for InfoLabel and its Button
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS, // Gap between InfoLabel and Button
  },
  actionButton: {
    width: '100%',
    justifyContent: 'flex-start',
  },
});

export const ClearCacheDialog: React.FC<ClearCacheDialogProps> = ({ open, onOpenChange }) => {
  const styles = useStyles();

  const handleClearAllAndReset = () => {
    dataService.clearAllApplicationCache();
    onOpenChange(false);
  };

  const handleClearUserSelections = () => {
    dataService.clearUserSelections();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => onOpenChange(data.open)} modalType="modal">
      <DialogSurface className={styles.dialogSurface}>
        <DialogBody>
          <DialogTitle>Debug Options</DialogTitle>
          <DialogContent className={styles.content}>
            <div className={styles.actionItemGroup}>
              <InfoLabel 
                info="Clears all user-installed items and favorites. Resets the application to its initial state, preserving items installed by default in mock data."
              >
                Reset Prototype to Defaults
              </InfoLabel>
              <Button 
                appearance="primary" 
                onClick={handleClearAllAndReset} 
                className={styles.actionButton}
              >
                Reset Prototype
              </Button>
            </div>

            <div className={styles.actionItemGroup}>
              <InfoLabel 
                info="Clears all installed built-in modules, connectors, and all favorites. Custom actions remain untouched."
              >
                Clear User Selections
              </InfoLabel>
              <Button onClick={handleClearUserSelections} className={styles.actionButton}>
                Clear Installed Items & Favorites
              </Button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
