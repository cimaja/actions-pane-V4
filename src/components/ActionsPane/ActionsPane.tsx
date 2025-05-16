import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, Divider } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { GridDots20Regular } from '@fluentui/react-icons';
import { ActionsPaneHeader, SortOrder } from './ActionsPaneHeader';
import { ActionsPaneContent } from './ActionsPaneContent';
import { LibraryEntryPoint } from './LibraryEntryPoint';

// Constants for resize constraints
const MIN_WIDTH = 320;
const MAX_WIDTH = 600;
const DEFAULT_WIDTH = 360;

// Load saved width from localStorage if available
const getSavedWidth = (): number => {
  try {
    const savedWidth = localStorage.getItem('actionsPaneWidth');
    if (savedWidth) {
      const width = parseInt(savedWidth, 10);
      if (width >= MIN_WIDTH && width <= MAX_WIDTH) {
        return width;
      }
    }
  } catch (error) {
    console.error('Error loading saved width:', error);
  }
  return DEFAULT_WIDTH;
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', /* Use viewport height to ensure full height */
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
    position: 'relative',
    overflow: 'hidden', /* Prevent double scrollbars */
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    transition: 'width 0.1s ease-out', /* Smooth transition when width changes programmatically */
  },
  resizeHandle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '8px',
    height: '100%',
    cursor: 'ew-resize',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    '&:active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },
  },
  resizeHandleAtMin: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '4px',
      height: '40px',
      backgroundColor: tokens.colorBrandBackground,
      opacity: 0.3,
      borderRadius: '8px',
    },
  },
  resizeHandleAtMax: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '4px',
      height: '40px',
      backgroundColor: tokens.colorNeutralForeground3,
      opacity: 0.3,
      borderRadius: '8px',
    },
  },
  resizeHandleActive: {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
  },
  // Removed tooltip styles
  resizeIcon: {
    color: tokens.colorNeutralForeground3,
    pointerEvents: 'none', /* Ensure the icon doesn't interfere with drag events */
  },
  resizing: {
    userSelect: 'none', /* Prevent text selection during resize */
    cursor: 'ew-resize',
  },
  header: {
    flexShrink: 0, /* Prevent header from shrinking */
  },
  content: {
    flex: '1 1 auto', /* Changed to flex-grow: 1, flex-shrink: 1, flex-basis: auto */
    overflow: 'auto',
    padding: '0 8px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0, /* Critical for Firefox to respect flex-grow within a container */
  },
  footer: {
    padding: '8px',
    borderTop: '1px solid #e0e0e0',
    flexShrink: 0, /* Prevent footer from shrinking */
  }
});

export const ActionsPane: React.FC = () => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('category');
  const [width, setWidth] = useState<number>(getSavedWidth());
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [isAtMinWidth, setIsAtMinWidth] = useState<boolean>(width <= MIN_WIDTH);
  const [isAtMaxWidth, setIsAtMaxWidth] = useState<boolean>(width >= MAX_WIDTH);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  // Save width to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('actionsPaneWidth', width.toString());
    } catch (error) {
      console.error('Error saving width:', error);
    }
  }, [width]);

  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    
    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', handleResizeEnd);
  };
  
  // Handle double-click to reset to default size
  const handleDoubleClick = () => {
    setWidth(DEFAULT_WIDTH);
    setIsAtMinWidth(DEFAULT_WIDTH <= MIN_WIDTH);
    setIsAtMaxWidth(DEFAULT_WIDTH >= MAX_WIDTH);
    
    if (containerRef.current) {
      containerRef.current.style.width = `${DEFAULT_WIDTH}px`;
    }
    
    try {
      localStorage.setItem('actionsPaneWidth', DEFAULT_WIDTH.toString());
    } catch (error) {
      console.error('Error saving default width:', error);
    }
  };

  // Handle resize move
  const handleResizeMove = useRef((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const deltaX = e.clientX - startXRef.current;
    const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidthRef.current + deltaX));
    
    if (containerRef.current) {
      containerRef.current.style.width = `${newWidth}px`;
    }
    
    setWidth(newWidth);
    setIsAtMinWidth(newWidth <= MIN_WIDTH);
    setIsAtMaxWidth(newWidth >= MAX_WIDTH);
  }).current;

  // Handle resize end
  const handleResizeEnd = useRef((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(false);
    window.removeEventListener('mousemove', handleResizeMove);
    window.removeEventListener('mouseup', handleResizeEnd);
    
    // Save final width
    if (containerRef.current) {
      const finalWidth = parseInt(containerRef.current.style.width || width.toString(), 10);
      if (!isNaN(finalWidth)) {
        setWidth(finalWidth);
      }
    }
  }).current;

  // Clean up event listeners
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [handleResizeMove, handleResizeEnd]);

  return (
    <div 
      className={`${styles.container} ${isResizing ? styles.resizing : ''}`}
      ref={containerRef}
      style={{ width: `${width}px` }}>
      <div className={styles.header}>
        <ActionsPaneHeader 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
        <Divider />
      </div>
      <div className={styles.content}>
        <ActionsPaneContent 
          activeTab={activeTab}
          searchQuery={searchQuery}
          sortOrder={sortOrder}
        />
      </div>
      <div className={styles.footer}>
        <LibraryEntryPoint />
      </div>
      <div 
        className={`
          ${styles.resizeHandle} 
          ${isAtMinWidth ? styles.resizeHandleAtMin : ''} 
          ${isAtMaxWidth ? styles.resizeHandleAtMax : ''} 
          ${isResizing ? styles.resizeHandleActive : ''}
        `} 
        onMouseDown={handleResizeStart}
        onDoubleClick={handleDoubleClick}
      >
        <GridDots20Regular className={styles.resizeIcon} />
      </div>
    </div>
  );
};
