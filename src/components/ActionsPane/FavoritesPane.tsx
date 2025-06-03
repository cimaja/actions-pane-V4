import React from 'react';
import {
  makeStyles,
  tokens,
  Button,
  mergeClasses,
  Text,
} from '@fluentui/react-components';
import { EmptyState } from '../common/EmptyState';
import { ActionGroup, DetailedActionItem } from '../../models/types';
import { ActionItem } from './ActionItem';
import { getIconByName, isConnector } from '../../utils/iconUtils';
import { createConnectorImageElement } from '../../utils/connectorImageUtils';
import { getIconColorClass, getIconBackgroundClass } from '../../utils/iconColorUtils';

// Define props for the FavoritesPane component
export interface FavoritesPaneProps {
  groups: ActionGroup[];
  favoriteItems: Record<string, boolean>;
  onFavoriteChange?: (itemId: string, isFavorite: boolean) => void;
  onActionClick?: (action: DetailedActionItem) => void;
  searchQuery: string;
  setActiveTab: (tab: string) => void;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0',  // Remove all padding
    '&.empty': {
      overflow: 'visible',
      height: 'auto',
    },
    '&:not(.empty)': {
      overflowY: 'auto',
    }
  },
  groupContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    minHeight: 'min-content',
    marginBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: tokens.spacingVerticalXS,
    '&:first-child': {
      marginTop: '16px !important',
    },
  },
  groupContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    backgroundColor: 'transparent',
    padding: '0',
    margin: '4px 0 0 0', // Reduced space between header and content
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
  actionItemContainer: {
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.1s ease',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    }
  },
});

export const FavoritesPane: React.FC<FavoritesPaneProps> = ({
  groups,
  favoriteItems,
  onFavoriteChange,
  onActionClick,
  searchQuery,
  setActiveTab,
}) => {
  const styles = useStyles();
  
  // Flatten all groups and subgroups into a single array
  const flattenGroups = (groups: ActionGroup[]): ActionGroup[] => {
    let flattenedGroups: ActionGroup[] = [];
    
    groups.forEach(group => {
      // Add the current group
      flattenedGroups.push({
        ...group,
        // Remove subGroups to prevent nested rendering
        subGroups: undefined
      });
      
      // If there are subgroups, flatten and add them too
      if (group.subGroups && group.subGroups.length > 0) {
        flattenedGroups = [...flattenedGroups, ...flattenGroups(group.subGroups)];
      }
    });
    
    return flattenedGroups;
  };

  // Determine if we have any content to show
  const hasContent = groups.length > 0;
  const containerClasses = mergeClasses(
    styles.container,
    !hasContent && 'empty'
  );

  if (!hasContent) {
    return (
      <div className={containerClasses}>
        <EmptyState
          image={
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 9L30.3 17.5L40 19.5L32 26L34 35.5L24 31L14 35.5L16 26L8 19.5L17.7 17.5L24 9Z" stroke="url(#paint0_linear_favorites)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear_favorites" x1="12" y1="9" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4C92FD"/>
                  <stop offset="1" stopColor="#7D51C9"/>
                </linearGradient>
              </defs>
            </svg>
          }
          title="No favorites yet"
          description="Actions you mark as favorites will appear here for quick access."
          action={
            <Button 
              onClick={() => setActiveTab('All')}
              appearance="primary"
            >
              Browse actions
            </Button>
          }
        />
      </div>
    );
  }

  // If we have a search query but no results
  if (searchQuery && groups.length === 0) {
    return (
      <div className={containerClasses}>
        <EmptyState
          image={
            <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.5 34C28.4036 34 34 28.4036 34 21.5C34 14.5964 28.4036 9 21.5 9C14.5964 9 9 14.5964 9 21.5C9 28.4036 14.5964 34 21.5 34Z" stroke="url(#paint0_linear_search)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M40 40L31 31" stroke="url(#paint1_linear_search)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear_search" x1="11.1671" y1="9" x2="32" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4C92FD"/>
                  <stop offset="1" stopColor="#7D51C9"/>
                </linearGradient>
                <linearGradient id="paint1_linear_search" x1="32" y1="31" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4C92FD"/>
                  <stop offset="1" stopColor="#7D51C9"/>
                </linearGradient>
              </defs>
            </svg>
          }
          title="No actions found"
          description="Try adjusting your search or filters."
          action={
            <Button 
              onClick={() => setActiveTab('All')}
              appearance="primary"
            >
              Clear filters
            </Button>
          }
        />
      </div>
    );
  }

  // Render all favorite groups in a flattened structure
  // Custom header component with fixed height
  const FavoritesHeader = ({ group }: { group: ActionGroup }) => {
    return (
      <div 
        className={styles.groupHeaderContainer} 
        style={{ 
          height: '32px', 
          minHeight: '32px', 
          maxHeight: '32px',
          lineHeight: '32px',
          padding: '0',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className={styles.groupHeaderLeft}>
          <div 
            className={mergeClasses(
              styles.groupIcon,
              getIconBackgroundClass(group.iconColor)
            )}
            style={{ flexShrink: 0 }}
          >
            {isConnector(group.id) 
              ? createConnectorImageElement(group.id)
              : getIconByName(group.icon, getIconColorClass(group.iconColor))}
          </div>
          <Text 
            className={styles.groupTitle}
            style={{ lineHeight: '32px' }}
          >
            {group.title}
          </Text>
        </div>
      </div>
    );
  };

  // Create a modified array with a spacer before the first group
  const groupsToRender = flattenGroups(groups);
  
  return (
    <div className={containerClasses} style={{ marginTop: '16px' }}>
      
      {groupsToRender.map((group, index) => (
        <div 
          key={group.id} 
          className={styles.groupContainer} 
          style={index === 0 ? { marginTop: '16px' } : undefined}
        >
          {/* Simple header without any expand/collapse controls */}
          <FavoritesHeader group={group} />
          
          {/* Always display content - no collapsible functionality */}
          <div className={styles.groupContent}>
            {/* White background container with rounded corners and padding */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '8px',
              marginBottom: '20px' // Increased space after each white container to 20px
            }}>
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
                  className={styles.actionItemContainer}
                >
                  <ActionItem
                    item={modifiedItem}
                    onFavoriteChange={onFavoriteChange}
                    inFavoritesTab={true}
                  />
                </div>
              );
            })}
            </div> {/* Close the white background container */}
          </div>
        </div>
      ))}
    </div>
  );
};
