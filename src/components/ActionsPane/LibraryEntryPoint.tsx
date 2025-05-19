import React, { useState, useEffect } from 'react';
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

interface LibraryEntryPointProps {
  initialCategory?: string;
  onOpenLibrary?: () => void;
}

// Global state for library modal
let globalInitialCategory: string | undefined = undefined;

// Reference to the current instance's state updater
let currentSetIsLibraryOpen: ((open: boolean) => void) | null = null;
let currentSetCategory: ((category: string) => void) | null = null;

// Function to open library with a specific category
export const openLibraryWithCategory = (category: string) => {
  console.log('openLibraryWithCategory called with:', category);
  globalInitialCategory = category;
  
  if (currentSetCategory && currentSetIsLibraryOpen) {
    console.log('Setting category to:', category);
    currentSetCategory(category);
    currentSetIsLibraryOpen(true);
  } else {
    console.log('Library entry point is not initialized yet');
  }
};

export const LibraryEntryPoint: React.FC<LibraryEntryPointProps> = ({ 
  initialCategory,
  onOpenLibrary
}) => {
  const styles = useStyles();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(initialCategory);
  
  // Store references to the state updaters
  useEffect(() => {
    currentSetIsLibraryOpen = setIsLibraryOpen;
    currentSetCategory = setCurrentCategory;
    
    // If there's a pending category when the component mounts, use it
    if (globalInitialCategory) {
      setCurrentCategory(globalInitialCategory);
      setIsLibraryOpen(true);
    }
    
    return () => {
      currentSetIsLibraryOpen = null;
      currentSetCategory = null;
    };
  }, []);
  
  const handleOpenLibrary = () => {
    setIsLibraryOpen(true);
    onOpenLibrary?.();
  };
  
  const handleCloseLibrary = (open: boolean) => {
    setIsLibraryOpen(open);
    if (!open) {
      globalInitialCategory = undefined;
    }
  };
  
  return (
    <>
      <div className={`${styles.container} libraryEntryPoint`} onClick={handleOpenLibrary}>
        <Text className={styles.label}>Library</Text>
        <ChevronRight24Regular />
      </div>
      
      <LibraryModal 
        open={isLibraryOpen} 
        onOpenChange={handleCloseLibrary} 
        initialCategory={currentCategory || initialCategory}
      />
    </>
  );
};
