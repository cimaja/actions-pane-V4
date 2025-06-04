import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';


const useStyles = makeStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(8px)',
    backgroundColor: tokens.colorNeutralBackgroundAlpha,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
  }
});

interface PasswordOverlayProps {
  correctPassword: string;
  children: React.ReactNode;
}

export const PasswordOverlay: React.FC<PasswordOverlayProps> = ({ correctPassword, children }) => {
  const styles = useStyles();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  // Check if user has already authenticated in this session
  useEffect(() => {
    const authenticated = sessionStorage.getItem('authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
      setIsDialogOpen(false);
    }
  }, []);

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setIsDialogOpen(false);
      sessionStorage.setItem('authenticated', 'true');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <>
      <div className={styles.overlay}>
        <Dialog open={isDialogOpen} modalType="modal">
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Password Protected Content</DialogTitle>
              <DialogContent className={styles.dialogContent}>
                <Text>This content is password protected. Please enter the password to continue.</Text>
                <Input
                  type="password"
                  value={password}
                  onChange={(e, data) => setPassword(data.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter password"
                  autoFocus
                />
                {error && <Text className={styles.errorText}>{error}</Text>}
              </DialogContent>
              <DialogActions>
                <Button appearance="primary" onClick={handlePasswordSubmit}>Submit</Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>
    </>
  );
};
