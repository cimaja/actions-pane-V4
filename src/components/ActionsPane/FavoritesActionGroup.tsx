import React from 'react';
import { makeStyles, Text, tokens, mergeClasses } from '@fluentui/react-components';
import { ActionItem } from './ActionItem';
import { ActionGroup, DetailedActionItem } from '../../models/types';
import { getIconByName, isConnector } from '../../utils/iconUtils';
import { createConnectorImageElement } from '../../utils/connectorImageUtils';
import { getIconColorClass, getIconBackgroundClass } from '../../utils/iconColorUtils';

// Define props for the FavoritesActionGroup component
export interface FavoritesActionGroupProps {
  group: ActionGroup;
  favoriteItems: Record<string, boolean>;
  onFavoriteChange?: (itemId: string, isFavorite: boolean) => void;
  onActionClick?: (action: DetailedActionItem) => void;
}

const useStyles = makeStyles({
  groupContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    minHeight: 'min-content',
    marginBottom: tokens.spacingVerticalS,
  },
  groupHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: '4px',
    justifyContent: 'space-between',
    height: '32px',
    boxSizing: 'border-box',
    marginBottom: tokens.spacingVerticalXXS,
  },
  groupHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
  },
  groupIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
    '& svg': {
      width: '16px',
      height: '16px',
    },
  },
  groupTitle: {
    flex: 1,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: 0,
    fontWeight: tokens.fontWeightSemibold,
  },
  actionItemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: '4px 0',
  },
  actionItemWrapper: {
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.1s ease',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    }
  },
});

export const FavoritesActionGroup: React.FC<FavoritesActionGroupProps> = ({
  group,
  favoriteItems,
  onFavoriteChange,
  onActionClick,
}) => {
  const styles = useStyles();
  
  return (
    <div className={styles.groupContainer}>
      {/* Simple header without any expand/collapse controls */}
      <div className={styles.groupHeaderContainer}>
        <div className={styles.groupHeaderLeft}>
          <div className={mergeClasses(
            styles.groupIcon,
            getIconBackgroundClass(group.iconColor)
          )}>
            {isConnector(group.id) 
              ? createConnectorImageElement(group.id)
              : getIconByName(group.icon, getIconColorClass(group.iconColor))}
          </div>
          <Text className={styles.groupTitle}>{group.title}</Text>
        </div>
      </div>
      
      {/* Container for action items with proper styling */}
      <div className={styles.actionItemsContainer}>
        {group.items?.map(item => {
          // Create a modified item with isFavorite property set
          const modifiedItem = {
            ...item,
            isFavorite: !!favoriteItems[item.id]
          };
          
          return (
            <div 
              key={item.id} 
              onClick={() => onActionClick?.(item as DetailedActionItem)}
              className={styles.actionItemWrapper}
            >
              <ActionItem
                item={modifiedItem}
                onFavoriteChange={onFavoriteChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
