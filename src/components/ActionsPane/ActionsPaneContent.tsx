import React, { useState, useMemo } from 'react';
import {
  makeStyles,
  Text,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  tokens,
  Divider,
  Button,
} from '@fluentui/react-components';
import { Star24Regular, Search24Regular } from '@fluentui/react-icons';
import { EmptyState } from '../common/EmptyState';
import { getIconByName } from '../../utils/iconUtils';
import { getIconColorClass, getIconBackgroundClass } from '../../utils/iconColorUtils';
import { ActionItem } from './ActionItem';
import { TabType, ActionGroup } from '../../models/types';
import { SortOrder } from './ActionsPaneHeader';
import { dataService } from '../../data/dataService';
import { openLibraryWithCategory } from './LibraryEntryPoint';

const useStyles = makeStyles({
  expandableGroup: {
    '& .fui-AccordionHeader__button': {
      backgroundColor: 'transparent',
      transition: `background-color ${tokens.durationFaster}`,
      borderRadius: '8px',
      '&:hover': {
        backgroundColor: tokens.colorNeutralBackground1Hover,
      }
    }
  },
  nestedGroup: {
    '& .fui-AccordionHeader__button': {
      backgroundColor: 'transparent',
      transition: `background-color ${tokens.durationFaster}`,
      borderRadius: '8px',
      paddingLeft: '40px',
      '&:hover': {
        backgroundColor: tokens.colorNeutralBackground1Hover,
      }
    }
  },
  /* Container styles */
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    padding: `${tokens.spacingVerticalM} 8px`,
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
    gap: tokens.spacingVerticalXS,
    minHeight: 'min-content',
  },

  groupContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  groupHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalS} 0 0 0`,
    borderRadius: '8px',
    justifyContent: 'space-between',
    height: '32px',
    boxSizing: 'border-box',
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
    borderRadius: '8px',
    overflow: 'hidden',
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
  },
  actionItem: {
    backgroundColor: 'transparent',
    borderRadius: '8px',
    padding: `${tokens.spacingVerticalS} 0`,
    height: '32px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: `background-color ${tokens.durationFaster}`,
    margin: 0,
    color: tokens.colorNeutralForeground1,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  actionItemIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > span': {
      display: 'inline-flex',
    },
    '& svg': {
      width: '1em',
      height: '1em',
    },
  },
  groupItemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    margin: 0,
  },
  accordionPanel: {
    padding: '0',
    margin: '0',
    '& .fui-AccordionPanel': {
      margin: '0',
      padding: '0',
    },
  },
  accordionHeader: {
    '& button.fui-AccordionHeader__button': {
      height: '32px',
      minHeight: '32px',
      maxHeight: '32px',
      padding: '4px 0 4px 0', /* top, right, bottom, left */
      '& > *': {
        lineHeight: '24px',
      }
    },
  },
  emptyState: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    padding: '16px',
    textAlign: 'center',
    color: tokens.colorNeutralForeground3,
    boxSizing: 'border-box',
  },
  categoryHeader: {
    padding: '0',
    marginTop: tokens.spacingVerticalS, /* Reduced from M to S */
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '32px',
  },
  categoryContainer: {
    backgroundColor: tokens.colorNeutralBackground1, /* White background */
    borderRadius: '8px',
    padding: '8px', /* 8px padding on all sides */
    marginBottom: tokens.spacingVerticalS,
  },
  categoryTitle: {
    fontSize: '14px',
    fontWeight: tokens.fontWeightSemibold,
    color: '#242424',
    lineHeight: '1.43',
  },
  seeAllLink: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  subGroupsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    marginTop: tokens.spacingVerticalXS,
  },
  subGroupHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalS} 0 ${tokens.spacingVerticalS} 40px`,
  },
  subGroupTitle: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground2,
  },
}); 

interface ActionsPaneContentProps {
  activeTab: string;
  searchQuery: string;
  sortOrder: SortOrder;
  setActiveTab: (tab: string) => void;
}

export const ActionsPaneContent: React.FC<ActionsPaneContentProps> = ({
  activeTab,
  searchQuery,
  sortOrder,
  setActiveTab,
}) => {
  const styles = useStyles();
  // Initialize all groups as collapsed by default
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  // Track favorited items
  const [favoriteItems, setFavoriteItems] = useState<Record<string, boolean>>({});

  // Get filtered groups from the data service and apply sorting
  const filteredGroups = useMemo(() => {
    const groups = dataService.getActionsPaneContent(
      activeTab as TabType,
      searchQuery,
      favoriteItems
    );

    // Always make a copy of the array to avoid mutating the original
    const sortedGroups = [...groups];

    // Apply sorting based on sortOrder
    switch (sortOrder) {
      case 'category':
        if (['All', 'Built-in', 'Connectors'].includes(activeTab)) {
          return sortedGroups.sort((a, b) => {
            // Use the category field, falling back to tags for backward compatibility
            const categoryA = a.category || a.tags?.[0] || 'Other';
            const categoryB = b.category || b.tags?.[0] || 'Other';
            
            // If categories are the same, sort by title
            if (categoryA === categoryB) {
              return a.title.localeCompare(b.title);
            }
            
            // Otherwise, sort by category
            return categoryA.localeCompare(categoryB);
          });
        }
        break;
      
      case 'name-asc':
        return sortedGroups.sort((a, b) => a.title.localeCompare(b.title));
      
      case 'name-desc':
        return sortedGroups.sort((a, b) => b.title.localeCompare(a.title));
      
      case 'recent':
      default:
        // Default to the order returned by the data service
        break;
    }
    
    return sortedGroups;
  }, [activeTab, searchQuery, favoriteItems, sortOrder]);

  // Toggle group expansion
  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // Filter to only show installed modules
  const installedGroups = useMemo(() => {
    return filteredGroups.filter(group => group.isInstalled !== false);
  }, [filteredGroups]);

  // Group items by category when sorting by category
  const groupedByCategory = useMemo(() => {
    // Only apply category grouping for All, Built-in, and Connectors tabs with category sorting
    if (sortOrder !== 'category' || !['All', 'Built-in', 'Connectors'].includes(activeTab)) {
      return null;
    }
    
    // Safety check - if we don't have any groups, don't try to categorize
    if (!installedGroups || installedGroups.length === 0) {
      return null;
    }

    const categoryGroups: Record<string, ActionGroup[]> = {};
    
    installedGroups.forEach(group => {
      // Use the category field, falling back to tags for backward compatibility
      const category = group.category || group.tags?.[0] || 'Other';
      if (!categoryGroups[category]) {
        categoryGroups[category] = [];
      }
      categoryGroups[category].push(group);
    });

    // Convert to array and sort categories alphabetically
    return Object.entries(categoryGroups)
      .sort(([categoryA], [categoryB]) => categoryA.localeCompare(categoryB))
      .map(([category, groups]) => ({
        category,
        groups
      }));
  }, [installedGroups, sortOrder, activeTab]);

  // Render a group with its items and subgroups
  const renderGroup = (group: ActionGroup) => {
    const isExpanded = expandedGroups[group.id] === true;

    return (
      <div key={group.id} className={styles.groupContainer}>
        <Accordion
          collapsible
          openItems={isExpanded ? [group.id] : []}
          onToggle={() => toggleGroup(group.id)}
        >
          <AccordionItem value={group.id} className={styles.expandableGroup}>
            <AccordionHeader size="small" expandIconPosition="end">
              <div className={styles.groupHeaderLeft}>
                {group.icon && (
                  <span className={`${styles.groupIcon} ${getIconBackgroundClass(group.iconColor)} ${getIconColorClass(group.iconColor)}`}>
                    {getIconByName(group.icon, group.id)}
                  </span>
                )}
                <Text className={styles.groupTitle}>
                  {group.title}
                </Text>
              </div>
            </AccordionHeader>
            <AccordionPanel className={styles.accordionPanel}>
              <div className={styles.groupItemsContainer}>
                {/* Render items */}
                {group.items.map(item => (
                  <div key={item.id} className={styles.actionItem}>
                    <ActionItem 
                      item={{...item, isFavorite: !!favoriteItems[item.id]}}
                      onFavoriteChange={(itemId, isFavorite) => {
                        setFavoriteItems(prev => ({
                          ...prev,
                          [itemId]: isFavorite
                        }));
                      }} 
                    />
                  </div>
                ))}
              </div>
              
              {/* Render subgroups if they exist */}
              {group.subGroups && group.subGroups.length > 0 && (
                <div className={styles.subGroupsContainer}>
                  {group.subGroups.map(subGroup => (
                    <div key={subGroup.id}>
                      <div className={styles.subGroupHeader}>
                        <Text className={styles.subGroupTitle} weight="semibold">
                          {subGroup.title}
                        </Text>
                      </div>
                      <div className={styles.groupItemsContainer}>
                        {subGroup.items.map(item => (
                          <div key={item.id} className={styles.actionItem}>
                            <ActionItem 
                              item={{...item, isFavorite: !!favoriteItems[item.id]}}
                              onFavoriteChange={(itemId, isFavorite) => {
                                setFavoriteItems(prev => ({
                                  ...prev,
                                  [itemId]: isFavorite
                                }));
                              }} 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  // Render empty state if no groups found
  if (installedGroups.length === 0) {
    return (
      <div className={styles.emptyState}>
        {activeTab === 'Favorites' ? (
          <EmptyState
            image={
              <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.303 6.08569C23.2017 4.26474 25.7983 4.26473 26.697 6.08568L31.5493 15.9177L42.3996 17.4943C44.4091 17.7863 45.2115 20.2558 43.7574 21.6732L35.9061 29.3264L37.7595 40.1327C38.1028 42.1342 36.0021 43.6604 34.2047 42.7155L24.5 37.6134L14.7952 42.7155C12.9978 43.6604 10.8971 42.1342 11.2404 40.1327L13.0938 29.3264L5.24255 21.6732C3.78843 20.2558 4.59083 17.7863 6.60037 17.4943L17.4506 15.9177L22.303 6.08569ZM24.5 7.28295L19.6808 17.0476C19.3239 17.7707 18.6341 18.2719 17.8361 18.3879L7.06012 19.9537L14.8577 27.5545C15.4351 28.1173 15.6986 28.9283 15.5623 29.7231L13.7216 40.4555L23.3599 35.3883C24.0736 35.0131 24.9263 35.0131 25.6401 35.3883L35.2784 40.4555L33.4376 29.7231C33.3013 28.9283 33.5648 28.1173 34.1422 27.5545L41.9398 19.9537L31.1638 18.3879C30.3658 18.2719 29.676 17.7707 29.3191 17.0476L24.5 7.28295Z" fill="url(#paint0_linear_11305_18852)"/>
                <defs>
                  <linearGradient id="paint0_linear_11305_18852" x1="11.1671" y1="4.71997" x2="37.2091" y2="44.653" gradientUnits="userSpaceOnUse">
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
        ) : (
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
                onClick={() => {
                  // This would typically clear the search, but we need to implement this
                  // in the parent component. For now, just switch to All tab
                  setActiveTab('All');
                }}
                appearance="primary"
              >
                Clear filters
              </Button>
            }
          />
        )}
      </div>
    );
  }

  const isEmptyState = filteredGroups.length === 0;
  const containerClasses = `${styles.container}${isEmptyState ? ' empty' : ''}`;

  const renderContent = () => {
    if (isEmptyState) {
      return (
        <div className={styles.emptyState}>
          {activeTab === 'Favorites' ? (
            <EmptyState
              image={
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.303 6.08569C23.2017 4.26474 25.7983 4.26473 26.697 6.08568L31.5493 15.9177L42.3996 17.4943C44.4091 17.7863 45.2115 20.2558 43.7574 21.6732L35.9061 29.3264L37.7595 40.1327C38.1028 42.1342 36.0021 43.6604 34.2047 42.7155L24.5 37.6134L14.7952 42.7155C12.9978 43.6604 10.8971 42.1342 11.2404 40.1327L13.0938 29.3264L5.24255 21.6732C3.78843 20.2558 4.59083 17.7863 6.60037 17.4943L17.4506 15.9177L22.303 6.08569ZM24.5 7.28295L19.6808 17.0476C19.3239 17.7707 18.6341 18.2719 17.8361 18.3879L7.06012 19.9537L14.8577 27.5545C15.4351 28.1173 15.6986 28.9283 15.5623 29.7231L13.7216 40.4555L23.3599 35.3883C24.0736 35.0131 24.9263 35.0131 25.6401 35.3883L35.2784 40.4555L33.4376 29.7231C33.3013 28.9283 33.5648 28.1173 34.1422 27.5545L41.9398 19.9537L31.1638 18.3879C30.3658 18.2719 29.676 17.7707 29.3191 17.0476L24.5 7.28295Z" fill="url(#paint0_linear_11305_18852)"/>
                <defs>
                  <linearGradient id="paint0_linear_11305_18852" x1="11.1671" y1="4.71997" x2="37.2091" y2="44.653" gradientUnits="userSpaceOnUse">
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
        ) : (
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
                onClick={() => {
                  // This would typically clear the search, but we need to implement this
                  // in the parent component. For now, just switch to All tab
                  setActiveTab('All');
                }}
                appearance="primary"
              >
                Clear filters
              </Button>
            }
          />
          )}
        </div>
      );
    }

    if (groupedByCategory) {
      return (
        groupedByCategory.map(({ category, groups }) => (
          <React.Fragment key={category}>
            <div className={styles.categoryHeader}>
              <Text className={styles.categoryTitle}>
                {category === 'connector' ? 'Connectors' : category}
              </Text>
              <Text 
                className={styles.seeAllLink} 
                onClick={() => {
                  // Map the category to a valid LibraryCategoryType
                  let libraryCategory;
                  console.log('See all clicked for category:', category);
                  
                  if (category === 'connector' || category === 'Connectors') {
                    libraryCategory = 'Connectors';
                  } else if (category === 'Data' || category === 'Integration') {
                    libraryCategory = 'Built-in';
                  } else {
                    libraryCategory = 'Built-in';
                  }
                  
                  console.log('Mapped to library category:', libraryCategory);
                  
                  // Open library with the selected category
                  openLibraryWithCategory(libraryCategory);
                }}
              >
                See all
              </Text>
            </div>
            <div className={styles.categoryContainer}>
              {groups.map(group => renderGroup(group))}
            </div>
          </React.Fragment>
        ))
      );
    }

    // Render groups without category headers
    return installedGroups.map(group => renderGroup(group));
  };

  return <div className={containerClasses}>{renderContent()}</div>;
};
