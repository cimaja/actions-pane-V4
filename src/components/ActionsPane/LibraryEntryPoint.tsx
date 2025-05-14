import React, { useState } from 'react';
import {
  makeStyles,
  Text,
  tokens,
} from '@fluentui/react-components';
import { ChevronRight24Regular } from '@fluentui/react-icons';
import { LibraryModal } from '../Library/LibraryModal';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    cursor: 'pointer',
    padding: '4px 0',
    '&:hover': {
      color: tokens.colorBrandForeground2Hover,
    },
  },
  label: {
    fontWeight: tokens.fontWeightSemibold,
  },
});

export const LibraryEntryPoint: React.FC = () => {
  const styles = useStyles();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const handleOpenLibrary = () => {
    setIsLibraryOpen(true);
  };

  return (
    <>
      <div className={styles.container} onClick={handleOpenLibrary}>
        <Text className={styles.label}>Library</Text>
        <ChevronRight24Regular />
      </div>
      
      <LibraryModal open={isLibraryOpen} onOpenChange={setIsLibraryOpen} />
    </>
  );
};
