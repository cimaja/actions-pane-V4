import React, { useState, useRef, useEffect } from 'react';
import {
  makeStyles,
  Button,
  Tooltip,
  tokens,
  mergeClasses,
} from '@fluentui/react-components';
import { Star24Regular, Star24Filled } from '@fluentui/react-icons';
import { ActionItemType } from '../../models/types';

const useStyles = makeStyles({
  /* Container styles */
  container: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.1s ease-in-out',
    width: '100%',
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: '4px 12px 4px 10px',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  containerActive: {
    backgroundColor: tokens.colorNeutralBackground1Hover,
  },
  /* Content styles */
  icon: {
    marginRight: '8px',
    fontSize: '20px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorNeutralForeground2,
    borderRadius: '8px',
  },
  title: {
    flex: 1,
    fontSize: '14px',
    lineHeight: '1.43',
    maxWidth: '100%',
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#242424',
  },
  /* Button styles */
  favoriteButton: {
    visibility: 'hidden',
    transition: 'visibility 0.1s ease-in-out, color 0.1s ease-in-out',
    color: tokens.colorNeutralForeground3,
    '&:hover': {
      color: tokens.colorNeutralForeground2,
    },
  },
  favoriteButtonVisible: {
    visibility: 'visible',
  },
  favoriteButtonActive: {
    color: tokens.colorCompoundBrandForeground1,
    visibility: 'visible',
    '&:hover': {
      color: tokens.colorCompoundBrandForeground1Hover,
    },
  },
});

interface ActionItemProps {
  item: ActionItemType;
  onFavoriteChange?: (itemId: string, isFavorite: boolean) => void;
}

export const ActionItem: React.FC<ActionItemProps> = ({ item, onFavoriteChange }) => {
  const styles = useStyles();
  const [isFavorite, setIsFavorite] = useState(item.isFavorite || false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use the actual description from the action data or a fallback message
  const description = item.description || `No description available for ${item.title}.`;

  // Handle mouse events for hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Show tooltip after a delay
    hoverTimerRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 500); // 500ms delay before showing tooltip
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
    
    // Clear the timer if mouse leaves before tooltip is shown
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (onFavoriteChange) {
      onFavoriteChange(item.id, newFavoriteState);
    }
  };

  // Determine container class based on state
  const containerClass = mergeClasses(
    styles.container,
    isHovered && styles.containerActive
  );

  // Determine favorite button class based on state
  const favoriteButtonClass = mergeClasses(
    styles.favoriteButton,
    (isHovered || isFavorite) && styles.favoriteButtonVisible,
    isFavorite && styles.favoriteButtonActive
  );

  return (
    <Tooltip 
      content={description} 
      relationship="description" 
      withArrow
      visible={showTooltip}
    >
      <div 
        className={containerClass} 
        onClick={() => console.log(`Clicked on ${item.title}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={styles.icon}>{item.icon}</span>
        <span className={styles.title}>{item.title}</span>
        <Button
          className={favoriteButtonClass}
          icon={isFavorite ? <Star24Filled /> : <Star24Regular />}
          appearance="transparent"
          size="small"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        />
      </div>
    </Tooltip>
  );
};
