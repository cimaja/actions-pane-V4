import React, { useState } from 'react';
import {
  makeStyles,
  Text,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  tokens,
} from '@fluentui/react-components';
import { getIconByName } from '../../utils/iconUtils';
import { getIconColorClass, getIconBackgroundClass } from '../../utils/iconColorUtils';
import { ActionItem } from './ActionItem';
import { TabType } from '../../models/types';
import { SortOrder } from './ActionsPaneHeader';
import { dataService } from '../../data/dataService';

const useStyles = makeStyles({
  expandableGroup: {
    '& .fui-AccordionHeader__button': {
      backgroundColor: 'transparent',
      transition: `background-color ${tokens.durationFaster}`,
      borderRadius: '8px',
      '&:hover': {
        backgroundColor: tokens.colorNeutralBackground2Hover,
      }
    }
  },
  nestedGroup: {
    '& .fui-AccordionHeader__button': {
      backgroundColor: 'transparent',
      transition: `background-color ${tokens.durationFaster}`,
      borderRadius: '8px',
      '&:hover': {
        backgroundColor: tokens.colorNeutralBackground3Hover,
      }
    }
  },
  /* Container styles */
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    height: '100%',
    overflow: 'auto',
    padding: `${tokens.spacingVerticalM} 0`,
  },
  groupContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  groupContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  groupHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalS} 0`,
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
    fontWeight: tokens.fontWeightSemibold
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
      backgroundColor: tokens.colorNeutralBackground2Hover,
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
    '& > *': {
      margin: 0,
    },
  },
  accordionHeader: {
    '& button.fui-AccordionHeader__button': {
      height: '32px',
      minHeight: '32px',
      maxHeight: '32px',
      padding: '4px 0',
      '& > *': {
        lineHeight: '24px',
      }
    },
  },
  emptyState: {
    padding: '16px',
    textAlign: 'center',
    color: tokens.colorNeutralForeground3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 

interface ActionsPaneContentProps {
  activeTab: string;
  searchQuery: string;
  sortOrder: SortOrder;
}

export const ActionsPaneContent: React.FC<ActionsPaneContentProps> = ({
  activeTab,
  searchQuery,
  sortOrder,
}) => {
  const styles = useStyles();
  // Initialize all groups as collapsed by default
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  // Track favorited items
  const [favoriteItems, setFavoriteItems] = useState<Record<string, boolean>>({});

  // Get filtered groups from the data service and apply sorting
  const filteredGroups = (() => {
    const groups = dataService.getActionsPaneContent(
      activeTab as TabType,
      searchQuery,
      favoriteItems
    );

    // Apply sorting based on sortOrder
    if (sortOrder === 'category' && ['All', 'Built-in'].includes(activeTab)) {
      return [...groups].sort((a, b) => {
        // Get the first tag for each group (assuming it's the category)
        const categoryA = a.tags?.[0] || 'Other';
        const categoryB = b.tags?.[0] || 'Other';
        
        // If categories are the same, sort by title
        if (categoryA === categoryB) {
          return a.title.localeCompare(b.title);
        }
        
        // Otherwise, sort by category
        return categoryA.localeCompare(categoryB);
      });
    }
    
    // Default sorting (name-asc or recent)
    return groups;
  })();

  // Toggle group expansion
  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  if (filteredGroups.length === 0) {
    return (
      <div className={styles.emptyState}>
        {activeTab === 'Favorites' ? (
          <Text>No favorites added yet. Click the star icon on any action to add it to favorites.</Text>
        ) : (
          <Text>No actions found. Try adjusting your search or filters.</Text>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {filteredGroups.map(group => {
        const isExpanded = expandedGroups[group.id] === true;

        return (
          <div key={group.id} className={styles.groupContainer}>
            <Accordion
              collapsible
              openItems={isExpanded ? [group.id] : []}
              onToggle={() => toggleGroup(group.id)}
            >
              <AccordionItem value={group.id} className={styles.expandableGroup}>
                <AccordionHeader size="small">
                  <div className={styles.groupHeaderLeft}>
                    {group.icon && (
                      <span className={`${styles.groupIcon} ${getIconBackgroundClass(group.iconColor)} ${getIconColorClass(group.iconColor)}`}>
                        {getIconByName(group.icon, group.id)}
                      </span>
                    )}
                    <Text 
                      className={styles.groupTitle}
                      truncate 
                      block
                      weight="semibold"
                    >
                      {group.title}
                    </Text>
                  </div>
                </AccordionHeader>
                <AccordionPanel>
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
                    <Accordion collapsible multiple defaultOpenItems={[]}>
                      {group.subGroups.map(subGroup => (
                        <AccordionItem key={subGroup.id} value={subGroup.id} className={styles.nestedGroup}>
                          <AccordionHeader size="small">
                            <div className={styles.groupHeaderLeft}>
                              <Text className={styles.groupTitle} truncate block>{subGroup.title}</Text>
                              <Text size={200} weight="regular" style={{marginLeft: 'auto'}}>
                                {subGroup.items.length} items
                              </Text>
                            </div>
                          </AccordionHeader>
                          <AccordionPanel>
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
                          </AccordionPanel>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};
