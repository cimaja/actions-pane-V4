import React, { useState, useMemo, useEffect } from 'react';
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
  mergeClasses,
} from '@fluentui/react-components';
import { FavoritesPane } from './FavoritesPane';
import { Star24Regular, Search24Regular, ChevronDown16Regular, ChevronRight16Regular, ChevronUp16Regular, ArrowUpRight16Regular } from '@fluentui/react-icons';
import { EmptyState } from '../common/EmptyState';
import { getIconByName, isConnector } from '../../utils/iconUtils';
import { createConnectorImageElement } from '../../utils/connectorImageUtils';
import { getIconColorClass, getIconBackgroundClass } from '../../utils/iconColorUtils';
import { ActionItem } from './ActionItem';
import { TabType, ActionGroup, ActionItemType, DetailedActionItem } from '../../models/types';
import { SortOrder } from './ActionsPaneHeader';
import { dataService } from '../../data/dataService';
import { openLibraryWithCategory } from './LibraryEntryPoint';
import { LibraryModal } from '../Library/LibraryModal';

// Define interfaces for uninstalled items
interface UninstalledAction {
  id: string;
  title: string;
  icon?: string;
  iconColor?: string;
  moduleId: string;
  description?: string;
}

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
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    padding: `0 8px 24px 8px`, // Added 24px bottom padding for improved scroll experience
    '&.empty': {
      overflow: 'visible',
      height: 'auto',
    },
    '&:not(.empty)': {
      overflowY: 'auto',
    }
  },
  
  // Special container for favorites tab
  // This is a global CSS rule to target the specific element shown in the screenshot
  '@global': {
    /* Add spacing to the top of the Favorites tab */
    '&.favorites-tab-content': {
      paddingTop: '16px !important',
    },
    '&div[class*="___1dc11em_"]': {
      height: '32px !important',
      minHeight: '32px !important',
      maxHeight: '32px !important',
      lineHeight: '32px !important',
    },
    // Ensure all accordion headers have 32px height
    '&.fui-AccordionHeader': {
      height: '32px !important',
      minHeight: '32px !important',
      maxHeight: '32px !important',
      lineHeight: '32px !important',
      boxSizing: 'border-box',
    },
    // Center the filter button icon
    '&#menur5': {
      display: 'flex !important',
      alignItems: 'center !important',
      justifyContent: 'center !important',
    },
    '&#menur5 .fui-Button__icon': {
      display: 'flex !important',
      alignItems: 'center !important',
      justifyContent: 'center !important',
    },
  },
  favoritesContainer: {
    backgroundColor: 'transparent',
    borderRadius: '0',
    padding: '0',
    margin: '16px 0 0 0', // Add 16px margin to the top of the container
    boxShadow: 'none',
    // Ensure all accordion headers have 32px height
    '& .fui-AccordionHeader': {
      height: '32px !important',
      minHeight: '32px !important',
      maxHeight: '32px !important',
      lineHeight: '32px !important',
      boxSizing: 'border-box',
    },
    '& > div, & > div > div': {
      backgroundColor: 'transparent',
    },
    '& .groupItemsContainer, & .accordionPanel, & .fui-AccordionPanel': {
      backgroundColor: 'transparent !important',
      boxShadow: 'none !important',
      borderRadius: '0 !important',
    },
    // Hide any spacer elements that push content to the right
    '& [class*="___1u3rbdd_1sfwjdk"]': {
      display: 'none !important',
    },
    // Ensure header is exactly 32px in height - target all possible header elements
    '& div[class*="groupHeaderContainer"], & div[class*="headerContainer"], & div[class*="header"], & div[class*="Adobe"]': {
      height: '32px !important',
      minHeight: '32px !important',
      maxHeight: '32px !important',
      lineHeight: '32px !important',
      boxSizing: 'border-box',
    },
    // Target all header elements in the Favorites tab
    '& div[class*="___f39xgn0_0000000"]': {
      height: '32px !important',
      minHeight: '32px !important',
      maxHeight: '32px !important',
      lineHeight: '32px !important',
    },
    // Target the specific div element with dimensions shown in screenshot (428x24)
    '& div[class*="___1dc11em_"]': {
      height: '32px !important',
      minHeight: '32px !important',
      maxHeight: '32px !important',
      lineHeight: '32px !important',
    },
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
    backgroundColor: 'transparent',
  },
  accordionPanel: {
    padding: '0',
    margin: '0',
    '& .fui-AccordionPanel': {
      margin: '0',
      padding: '0',
      backgroundColor: 'transparent',
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
    height: '32px !important',
    minHeight: '32px !important',
    maxHeight: '32px !important',
    lineHeight: '32px !important',
    boxSizing: 'border-box',
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
  
  // Uninstalled items styles
  uninstalledToggle: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
    gap: '4px',
    color: tokens.colorBrandForeground1,
    marginTop: tokens.spacingVerticalXL,
    marginBottom: tokens.spacingVerticalXS,
    paddingTop: tokens.spacingVerticalM,
    width: '100%', // Ensure it takes full width for proper centering
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  uninstalledCount: {
    color: tokens.colorNeutralForeground2,
  },
  uninstalledSection: {
    marginTop: tokens.spacingVerticalXS,
  },
  uninstalledHeader: {
    padding: '0',
    marginTop: tokens.spacingVerticalXXS,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '32px',
  },
  uninstalledContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '8px',
    padding: '8px',
    marginBottom: tokens.spacingVerticalS,
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: tokens.fontWeightSemibold,
    color: '#242424',
    lineHeight: '1.43',
  },
  uninstalledModule: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4px 12px 4px 10px', // Match the installed items padding
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '2px 0', // Match the installed items margin
    height: '32px', // Set a fixed height to match installed items
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  moduleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
  },
  // Using the same styles as groupIcon for consistency
  moduleTitle: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: 0,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  uninstalledActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalXS,
  },
  libraryResultsMessage: {
    padding: '8px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '8px',
    marginBottom: tokens.spacingVerticalS,
  },
  uninstalledAction: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  moreActions: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    fontStyle: 'italic',
  },

}); 

interface ActionsPaneContentProps {
  activeTab: string;
  searchQuery: string;
  sortOrder: SortOrder;
  setActiveTab: (tab: string) => void;
  favoriteItems?: Record<string, boolean>;
  onFavoriteChange?: (itemId: string, isFavorite: boolean) => void;
  onSearchChange?: (query: string) => void;
}

export const ActionsPaneContent: React.FC<ActionsPaneContentProps> = ({
  activeTab,
  searchQuery,
  sortOrder,
  setActiveTab,
  favoriteItems = {},
  onFavoriteChange,
  onSearchChange,
}) => {
  const styles = useStyles();
  // Initialize all groups as collapsed by default
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // State for uninstalled items
  const [showUninstalledItems, setShowUninstalledItems] = useState<boolean>(false);
  
  // State for library dialog props
  const [dataVersion, setDataVersion] = useState(0);

  // State for library dialog props
  const [libraryDialogProps, setLibraryDialogProps] = useState<{
    open: boolean;
    initialCategory?: string;
    initialItemId?: string;
  }>({
    open: false
  });

  // Subscribe to dataService updates to refresh content when installation status changes
  useEffect(() => {
    const unsubscribe = dataService.subscribe(() => {
      setDataVersion(prevVersion => prevVersion + 1);
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  // Get filtered groups from the data service and apply sorting
  // Make sure to recalculate when activeTab changes
  const { modules: filteredGroups, uninstalledCount: totalUninstalledCount } = useMemo<{ modules: ActionGroup[], uninstalledCount?: number }>(() => {
    const result = dataService.getActionsPaneContent(
      activeTab as TabType,
      searchQuery,
      favoriteItems
    );
    
    // Always make a copy of the array to avoid mutating the original
    const sortedGroups: ActionGroup[] = [...result.modules];

    // Apply sorting based on sortOrder
    switch (sortOrder) {
      case 'category':
        if (['All', 'Built-in', 'Connectors'].includes(activeTab)) {
          sortedGroups.sort((a: ActionGroup, b: ActionGroup) => {
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
        sortedGroups.sort((a: ActionGroup, b: ActionGroup) => a.title.localeCompare(b.title));
        break;
      
      case 'name-desc':
        sortedGroups.sort((a: ActionGroup, b: ActionGroup) => b.title.localeCompare(a.title));
        break;
      
      case 'recent':
      default:
        // No sorting needed for recent, as it's the default order
        break;
    }

    return { modules: sortedGroups, uninstalledCount: result.uninstalledCount };
  }, [activeTab, searchQuery, sortOrder, favoriteItems, dataVersion]);

  // Toggle group expansion
  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };
  

  
  // Toggle uninstalled items visibility
  const toggleUninstalledItems = (): void => {
    setShowUninstalledItems(prev => !prev);
    
    // If we're showing uninstalled items, force a refresh of the data
    if (!showUninstalledItems && searchQuery && totalUninstalledCount && totalUninstalledCount > 0) {
      // Force refresh the uninstalled actions data
      dataService.searchUninstalledActions(searchQuery);
    }
  };

  // Handle clicking on an uninstalled item
  const handleUninstalledItemClick = (moduleId: string): void => {
    setLibraryDialogProps({
      open: true,
      initialItemId: moduleId,
    });
  };

  // Handle action click
  const handleActionClick = (action: DetailedActionItem) => {
    // Add any action click handling logic here
    console.log('Action clicked:', action.title);
  };

  // Filter to only show installed modules
  const installedGroups = useMemo(() => {
    return filteredGroups.filter((group: ActionGroup) => group.isInstalled !== false);
  }, [filteredGroups]);
  
  // Get uninstalled actions when showing them and there's a search query
  // This needs to run even before the toggle is clicked to get an accurate count
  const uninstalledActions = useMemo((): DetailedActionItem[] => {
    if (searchQuery && totalUninstalledCount && totalUninstalledCount > 0) {
      const actions = dataService.searchUninstalledActions(searchQuery);
      
      // Filter actions based on active tab
      if (activeTab === 'Built-in') {
        return actions.filter(action => !isConnector(action.moduleId));
      } else if (activeTab === 'Connectors') {
        return actions.filter(action => isConnector(action.moduleId));
      }
      
      return actions;
    }
    return [];
  }, [searchQuery, totalUninstalledCount, activeTab, showUninstalledItems]);
  
  // Calculate filtered uninstalled count based on active tab
  // Force recalculation when activeTab changes
  const filteredUninstalledCount = useMemo((): number => {
    if (!totalUninstalledCount) return 0;
    if (activeTab === 'Favorites') return 0;
    
    // If we have actual uninstalled actions, count the unique modules
    if (uninstalledActions.length > 0) {
      // Get unique module IDs from the uninstalled actions
      const uniqueModuleIds = new Set<string>();
      uninstalledActions.forEach(action => uniqueModuleIds.add(action.moduleId));
      return uniqueModuleIds.size;
    }
    
    // If we don't have the actual modules yet, make an estimate based on total count
    // This is just an approximation until the actual modules are loaded
    if (activeTab === 'Built-in') {
      // For Built-in tab, estimate that about 40% of uninstalled items are non-connectors
      return Math.ceil(totalUninstalledCount * 0.4);
    } else if (activeTab === 'Connectors') {
      // For Connectors tab, estimate that about 60% of uninstalled items are connectors
      return Math.ceil(totalUninstalledCount * 0.6);
    }
    
    return totalUninstalledCount;
  }, [totalUninstalledCount, activeTab, uninstalledActions]);
  


  // Group uninstalled actions by module
  const groupedUninstalledActions = useMemo(() => {
    if (!uninstalledActions || uninstalledActions.length === 0) return {};
    
    // Don't show uninstalled items if we're in Favorites tab and there's no search query
    if (activeTab === 'Favorites' && !searchQuery) return {};
    
    const groupedByModule: { [key: string]: UninstalledAction[] } = {};
    
    uninstalledActions.forEach((action) => {
      if (!groupedByModule[action.moduleId]) {
        groupedByModule[action.moduleId] = [];
      }
      
      groupedByModule[action.moduleId].push({
        id: action.id,
        title: action.title,
        icon: action.icon,
        iconColor: action.icon ? getIconColorClass(action.icon) : undefined,
        moduleId: action.moduleId,
        description: action.description
      });
    });
    
    return groupedByModule;
  }, [uninstalledActions, activeTab, searchQuery]);

  // Group items by category when sorting by category
  const groupedByCategory = useMemo(() => {
    // Only apply category grouping for All, Built-in, and Connectors tabs with category sorting
    // AND when there's no active search query
    if (searchQuery || sortOrder !== 'category' || !['All', 'Built-in', 'Connectors'].includes(activeTab)) {
      return null;
    }
    
    // Safety check - if we don't have any groups, don't try to categorize
    if (!installedGroups || installedGroups.length === 0) {
      return null;
    }

    const categoryGroups: Record<string, ActionGroup[]> = {};
    
    installedGroups.forEach((group: ActionGroup) => {
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
      .map(([category, categoryGroups]) => ({
        category,
        groups: categoryGroups
      }));
  }, [installedGroups, sortOrder, activeTab]);

  // Render a favorite group without accordion/expand-collapse functionality
  const renderFavoriteGroup = (group: ActionGroup): JSX.Element => {
    return (
      <div className={styles.groupContainer}>
        <div className={styles.groupHeaderContainer}>
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
        </div>
        <div className={styles.groupItemsContainer}>
          {group.items.map(item => (
            <div key={item.id} className={styles.actionItem}>
              <ActionItem 
                item={{
                  ...item, 
                  isFavorite: !!favoriteItems[item.id],
                  // Remove icon for actions
                  icon: undefined,
                  iconColor: undefined
                }}
                onFavoriteChange={(itemId, isFavorite) => {
                  onFavoriteChange && onFavoriteChange(itemId, isFavorite);
                }} 
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render a group with its items and subgroups
  // Custom header component with fixed height for Favorites tab
const FavoritesHeader = ({ group, isFirst }: { group: ActionGroup, isFirst?: boolean }) => {
  return (
    <div 
      className={styles.groupHeaderContainer} 
      style={{ 
        height: '32px', 
        minHeight: '32px', 
        maxHeight: '32px',
        lineHeight: '32px',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        marginTop: isFirst ? '16px' : undefined
      }} 
    >
      <div className={styles.groupHeaderLeft}>
        {group.icon && (
          <span 
            className={`${styles.groupIcon} ${getIconBackgroundClass(group.iconColor)} ${getIconColorClass(group.iconColor)}`}
            style={{ flexShrink: 0 }}
          >
            {getIconByName(group.icon, group.id)}
          </span>
        )}
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

const renderGroup = (group: ActionGroup): JSX.Element => {
    const isExpanded = expandedGroups[group.id] === true;

    // For Favorites tab OR when a search query is active, render without accordion/expand-collapse functionality
    if (activeTab === 'Favorites' || searchQuery) {
      return (
        <div key={group.id} className={styles.groupContainer}>
          <div className={styles.expandableGroup}>
            {/* Group header */}
            <FavoritesHeader group={group} />
            
            {/* Group items (no accordion panel) - with white background, rounded corners, and padding */}
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacingVerticalXS,
              margin: 0,
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '8px',
              marginTop: '4px', // Reduced space between header and white container
              marginBottom: '20px' // Increased space after each white container to 20px
            }}>
              {/* Render items */}
              {group.items.map(item => (
                <div key={item.id} className={styles.actionItem}>
                  <ActionItem 
                    item={{
                      ...item, 
                      isFavorite: !!favoriteItems[item.id],
                      // Remove icon for actions
                      icon: undefined,
                      iconColor: undefined
                    }}
                    onFavoriteChange={(itemId, isFavorite) => {
                      onFavoriteChange && onFavoriteChange(itemId, isFavorite);
                    }}
                    inFavoritesTab={true}
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
                            item={{
                              ...item, 
                              isFavorite: !!favoriteItems[item.id],
                              // Remove icon for actions
                              icon: undefined,
                              iconColor: undefined
                            }}
                            onFavoriteChange={onFavoriteChange || (() => {})}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // For other tabs, use the accordion/expand-collapse functionality
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
                      item={{
                        ...item, 
                        isFavorite: !!favoriteItems[item.id],
                        // Remove icon for actions
                        icon: undefined,
                        iconColor: undefined
                      }}
                      onFavoriteChange={(itemId, isFavorite) => {
                        onFavoriteChange && onFavoriteChange(itemId, isFavorite);
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
                              item={{
                                ...item, 
                                isFavorite: !!favoriteItems[item.id],
                                // Remove icon for actions
                                icon: undefined,
                                iconColor: undefined
                              }}
                              onFavoriteChange={onFavoriteChange || (() => {})}
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

  // Render uninstalled items section
  const renderUninstalledItems = (): JSX.Element | null => {
    if (!showUninstalledItems || !filteredUninstalledCount || filteredUninstalledCount <= 0) {
      return null;
    }
    
    // Check if we actually have any uninstalled actions to show after filtering
    if (Object.keys(groupedUninstalledActions).length === 0) {
      return (
        <div className={styles.uninstalledSection}>
          <div className={styles.uninstalledContainer}>
            <Text className={styles.moduleTitle}>No uninstalled items match your search in this tab.</Text>
          </div>
        </div>
      );
    }
    
    return (
      <div className={styles.uninstalledSection}>
        <div className={styles.uninstalledContainer}>
          {Object.entries(groupedUninstalledActions).map(([moduleId, actions]) => {
            // Get module info if available
            const moduleInfo = dataService.getModuleById(moduleId) || 
                            dataService.getConnectorById(moduleId);
            
            // Skip modules that don't match the active tab filter
            if ((activeTab === 'Built-in' && isConnector(moduleId)) || 
                (activeTab === 'Connectors' && !isConnector(moduleId))) {
              return null;
            }
            
            return (
              <div 
                key={moduleId} 
                className={styles.uninstalledModule}
                onClick={() => handleUninstalledItemClick(moduleId)}
              >
                <div className={styles.moduleHeader}>
                  {moduleInfo?.icon && (
                    <span className={`${styles.groupIcon} ${getIconBackgroundClass(moduleInfo.iconColor)} ${getIconColorClass(moduleInfo.iconColor)}`}>
                      {isConnector(moduleId) 
                        ? createConnectorImageElement(moduleId)
                        : getIconByName(moduleInfo.icon, moduleId)
                      }
                    </span>
                  )}
                  <Text className={styles.moduleTitle}>{moduleInfo?.title || `Module ${moduleId}`}</Text>
                </div>
                <ArrowUpRight16Regular />
              </div>
            );
          }).filter(Boolean)}
        </div>
      </div>
    );
  };
  
  // Render empty state if no groups found
  if (installedGroups.length === 0 && (!searchQuery || !filteredUninstalledCount)) {
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
                  // Clear the search query and switch to All tab
                  if (onSearchChange) {
                    onSearchChange('');
                  }
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
  const containerClasses = `${styles.contentContainer}${isEmptyState ? ' empty' : ''}`;

  const renderContent = () => {
    // Check if we actually have any uninstalled actions to show after filtering
    const hasUninstalledItemsToShow = Object.entries(groupedUninstalledActions)
      .some(([moduleId, _]) => {
        // Check if this module matches the current tab filter
        if (activeTab === 'Built-in') {
          return !isConnector(moduleId);
        } else if (activeTab === 'Connectors') {
          return isConnector(moduleId);
        }
        return true; // For 'All' tab, all modules match
      });
    
    // Check if we have no installed items but have uninstalled items
    const hasNoInstalledResults = filteredGroups.length === 0;
    const shouldShowLibraryResults = hasNoInstalledResults && hasUninstalledItemsToShow && searchQuery;
    
    // If there's a search query and uninstalled items that match the current tab
    if (searchQuery && filteredUninstalledCount && filteredUninstalledCount > 0 && hasUninstalledItemsToShow) {
      // If no installed results, automatically show library results with a message
      if (shouldShowLibraryResults) {
        // Force uninstalled items to be visible
        if (!showUninstalledItems) {
          setShowUninstalledItems(true);
        }
        
        return (
          <>
            <Text className={styles.categoryTitle}>Library results</Text>
            <div className={styles.categoryContainer}>
              {Object.entries(groupedUninstalledActions).map(([moduleId, actions]) => {
                // Get module info if available
                const moduleInfo = dataService.getModuleById(moduleId) || 
                                dataService.getConnectorById(moduleId);
                
                // Skip modules that don't match the active tab filter
                if ((activeTab === 'Built-in' && isConnector(moduleId)) || 
                    (activeTab === 'Connectors' && !isConnector(moduleId))) {
                  return null;
                }
                
                return (
                  <div 
                    key={moduleId} 
                    className={styles.uninstalledModule}
                    onClick={() => handleUninstalledItemClick(moduleId)}
                  >
                    <div className={styles.moduleHeader}>
                      {moduleInfo?.icon && (
                        <span className={`${styles.groupIcon} ${getIconBackgroundClass(moduleInfo.iconColor)} ${getIconColorClass(moduleInfo.iconColor)}`}>
                          {isConnector(moduleId) 
                            ? createConnectorImageElement(moduleId)
                            : getIconByName(moduleInfo.icon, moduleId)
                          }
                        </span>
                      )}
                      <Text className={styles.moduleTitle}>{moduleInfo?.title || `Module ${moduleId}`}</Text>
                    </div>
                    <ArrowUpRight16Regular />
                  </div>
                );
              }).filter(Boolean)}
            </div>
          </>
        );
      }
      
      // Otherwise show toggle as usual
      const toggleText = showUninstalledItems ? 'Hide library results' : `${filteredUninstalledCount} more results in the library`;
      
      // When search is active, use a flat layout similar to Favorites tab
      if (searchQuery) {
        // For Connectors tab, we need to flatten the structure to match other tabs
        let groupsToRender = [...installedGroups];
        
        // If we're in the Connectors tab and have results grouped by category,
        // flatten the structure to ensure consistent rendering
        if (activeTab === 'Connectors' && groupedByCategory) {
          groupsToRender = [];
          // Extract all individual connector groups from the category groups
          groupedByCategory.forEach(({ groups }) => {
            groupsToRender.push(...groups);
          });
        }
        
        // Process each group to move subgroup items to the parent group's items
        groupsToRender = groupsToRender.map(group => {
          // Create a new group with the same properties
          const newGroup = { ...group };
          
          // If the group has subgroups, move all their items to the parent group's items
          if (newGroup.subGroups && newGroup.subGroups.length > 0) {
            // Create a new items array containing the parent items
            const allItems = [...newGroup.items];
            
            // Add all items from subgroups to the parent's items
            newGroup.subGroups.forEach(subGroup => {
              allItems.push(...subGroup.items);
            });
            
            // Update the group with all items and remove subgroups
            newGroup.items = allItems;
            newGroup.subGroups = undefined;
          }
          
          return newGroup;
        });
        
        // Sort all groups alphabetically by title
        const sortedGroups = groupsToRender.sort((a, b) => 
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        
        return (
          <>
            {/* Add padding at the top of search results like Favorites tab */}
            <div style={{ height: '16px', width: '100%', flexShrink: 0 }}></div>
            {/* Render all groups alphabetically without categories */}
            {sortedGroups.map((group: ActionGroup) => renderGroup(group))}
            
            {/* Show uninstalled actions toggle */}
            <div className={styles.uninstalledToggle} onClick={toggleUninstalledItems}>
              {toggleText}
              {showUninstalledItems ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
            </div>
            
            {/* Render uninstalled items if toggle is on */}
            {renderUninstalledItems()}
          </>
        );
      }
      
      return (
        <>
          {/* Render by category if grouped and not searching */}
          {groupedByCategory ? (
            <>
              {groupedByCategory.map(({ category, groups }) => (
                <React.Fragment key={category}>
                  <div className={styles.categoryHeader}>
                    <Text className={styles.categoryTitle}>
                      {category === 'connector' ? 'Connectors' : category}
                    </Text>
                    <Text 
                      className={styles.seeAllLink} 
                      onClick={() => {
                        // Map the category to a valid category string
                        let libraryCategory = 'Built-in';
                        
                        if (category === 'connector' || category === 'Connectors') {
                          libraryCategory = 'Connectors';
                        } else if (category === 'Data' || category === 'Integration') {
                          libraryCategory = 'Built-in';
                        }
                        
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
              ))}
            </>
          ) : (
            // Render without categories
            activeTab === 'Favorites' ? (
              <>
                <div style={{ height: '16px', width: '100%', flexShrink: 0 }}></div>
                <div className={styles.favoritesContainer}>
                  <FavoritesPane
                  groups={installedGroups}
                  favoriteItems={favoriteItems || {}}
                  onFavoriteChange={onFavoriteChange}
                  onActionClick={handleActionClick}
                  searchQuery={searchQuery}
                  setActiveTab={setActiveTab}
                  />
                </div>
              </>
            ) : (
              // Regular rendering for other tabs
              installedGroups.map((group: ActionGroup) => renderGroup(group))
            )
          )}
          
          {/* Show uninstalled actions toggle - moved below the list of results */}
          <div className={styles.uninstalledToggle} onClick={toggleUninstalledItems}>
            {toggleText}
            {showUninstalledItems ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
          </div>
          
          {/* Render uninstalled items if toggle is on */}
          {renderUninstalledItems()}
        </>
      );
    }
    
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
                  // Clear the search query and switch to All tab
                  if (onSearchChange) {
                    onSearchChange('');
                  }
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
    return installedGroups.map((group: ActionGroup) => renderGroup(group));
  };

  return (
    <>
      <div className={containerClasses}>
        {activeTab === 'Favorites' && <div style={{ height: '16px', width: '100%', flexShrink: 0 }}></div>}
        {renderContent()}
      </div>
      
      {/* Library Modal */}
      <LibraryModal 
        open={libraryDialogProps.open}
        onOpenChange={(open) => setLibraryDialogProps({...libraryDialogProps, open})}
        initialCategory={libraryDialogProps.initialCategory}
        initialItemId={libraryDialogProps.initialItemId}
      />
    </>
  );
};
