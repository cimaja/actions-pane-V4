/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect } from 'react';
import {
  makeStyles,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Text,
  Card,
  SearchBox,
  tokens,
  Dropdown,
  Option,
  Badge
} from '@fluentui/react-components';

import { 
  Dismiss24Regular, 
  Search24Regular, 
  Checkmark12Regular,
  Beaker24Regular,
  DocumentData24Regular,
  ArrowDownload24Regular,
  Globe24Regular,
  Folder24Regular,
  Comment24Regular,
  Timer24Regular,
  Clipboard24Regular,
  Channel24Regular,
  ArrowRepeatAll24Regular,
  Organization24Regular,
  DocumentPdf24Regular,
  Keyboard24Regular,
  LockClosed24Regular,
  Code24Regular,
  Database24Regular,
  Database24Filled,
  Cube24Regular,
  Cube24Filled,
  Calendar24Regular,
  Document24Regular,
  FolderZip24Regular,
  Laptop24Regular,
  Mail24Regular,
  MailInbox24Regular,
  PlugConnected24Regular,
  PlugConnected24Filled,
  PuzzlePiece24Regular,
  PuzzlePiece24Filled,
  Shapes24Regular,
  Shapes24Filled,
  Book24Regular,
  Book24Filled,
  Star24Regular,
  Star24Filled,
  Braces24Regular,
  Window24Regular,
  WindowConsoleRegular,
  Desktop24Regular,
  Settings24Regular,
  ScanText24Regular,
  TextDescription24Regular,
  ChevronRight24Regular
} from '@fluentui/react-icons';
import { dataService } from '../../data/dataService';
import { LibraryItemType, LibraryCategoryType } from '../../models/types';
import { MailShield24Regular } from './MailShieldIcon';
import { ArrowCircleDownUp24Regular } from './ArrowCircleDownUpIcon';
import { AIBuilder24Regular } from './AIBuilderIcon';
import { AWS24Regular } from './AWSIcon';
import { Azure24Regular } from './AzureIcon';
import { CyberArk24Regular } from './CyberArkIcon';
import { CustomGlobe24Regular } from './GlobeIcon';
import { ActiveDirectory24Regular } from './ActiveDirectoryIcon';
import { ListBarTree24Regular } from './ListBarTreeIcon';
import { GoogleCognitive24Regular } from './GoogleCognitiveIcon';
import { IBMCognitive24Regular } from './IBMCognitiveIcon';
import { MicrosoftCognitive24Regular } from './MicrosoftCognitiveIcon';
import { getIconByName } from '../../utils/iconUtils';
import { getIconColorClass, getIconBackgroundClass } from '../../utils/iconColorUtils';
import { EmptyState } from '../common/EmptyState';

// Extended interface for module items with additional properties
interface ModuleItemType extends LibraryItemType {
  icon?: string;
  iconColor?: string;
  tags?: string[];
}

const useStyles = makeStyles({
  dialogSurface: {
    width: '80vw',
    height: '80vh',
    maxWidth: '1000px',
    maxHeight: '700px',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      width: '90vw',
      maxHeight: '80vh',
    },
    '@media (max-width: 480px)': {
      width: '95vw',
      height: '90vh',
    },
  },
  listView: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  // Details view styles
  detailsView: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: '16px',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    overflowY: 'auto',
    marginRight: '16px', // Added right margin
  },
  detailsHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  detailsContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '0 0 16px 16px', // Remove right padding since we're adding it to detailsActions
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      gap: '16px',
      padding: '0 0 12px 12px', // Remove right padding since we're adding it to detailsActions
    },
  },
  detailsMainRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingRight: '16px',
    boxSizing: 'border-box',
    marginBottom: '24px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '16px',
    },
  },
  detailsLeftContent: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flex: '1 1 auto',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  detailsTextContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    '@media (max-width: 768px)': {
      alignItems: 'center',
    },
  },
  detailsRightCTA: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      width: '100%',
      justifyContent: 'center',
    },
  },
  detailsTitle: {
    margin: 0,
    lineHeight: 1,
  },
  detailsIcon: {
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    '& svg': {
      width: '40px',
      height: '40px',
    },
  },
  detailsInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: 1,
    maxWidth: '100%',
  },
  detailsCategory: {
    color: '#323130 !important', // Exact Grey 110
    marginTop: 0,
    lineHeight: 1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
  },
  detailsActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    width: '100%',
    paddingRight: '16px',
    boxSizing: 'border-box',
  },
  actionsHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: tokens.borderRadiusMedium,
    margin: 0,
  },
  actionsDetailList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderTop: 'none',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
  },
  actionListItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    transition: 'all 0.2s ease',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    cursor: 'pointer',
    backgroundColor: tokens.colorNeutralBackground1,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
    '&:active': {
      backgroundColor: tokens.colorNeutralBackground3,
    },
    '&:last-child': {
      borderBottom: 'none',
      borderBottomLeftRadius: tokens.borderRadiusMedium,
      borderBottomRightRadius: tokens.borderRadiusMedium,
    },
  },
  actionListItemContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    paddingTop: '16px',
  },
  title: {
    margin: 0,
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
  },
  closeButton: {
    marginLeft: 'auto',
  },
  content: {
    display: 'flex',
    flex: 1,
    minHeight: 0, // Allows content to shrink below its minimum height
    padding: 0,
    margin: 0,
    width: '100%',
    overflow: 'hidden',
  },
  navSidebar: {
    width: '224px',
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: '8px 10px',
    flexShrink: 0,
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: '#FAF9F8',
    transition: 'width 0.2s ease',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: tokens.colorNeutralStroke2,
      borderRadius: '2px',
    },
    '@media (max-width: 900px)': {
      width: '48px',
      padding: '8px 0',
    },
  },
  navItem: {
    padding: '10px 8px 10px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    cursor: 'pointer',
    position: 'relative',
    borderRadius: '4px',
    width: '204px',
    '&:hover': {
      backgroundColor: '#F3F2F1',
    },
    '&.selected, &:active': {
      '&::before': {
        content: '""',
        position: 'absolute',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        height: '24px',
        width: '4px',
        backgroundColor: '#0078D4',
        borderRadius: '2px',
      },
      '& span': {
        fontWeight: tokens.fontWeightSemibold,
      }
    },
    transition: 'all 0.2s ease',
    '@media (max-width: 900px)': {
      justifyContent: 'center',
      width: '40px',
      padding: '10px 8px',
      gap: '0',
    },
  },
  navItemText: {
    fontFamily: '"Segoe UI", sans-serif',
    fontSize: '14px',
    lineHeight: '1.4285714286em',
    fontWeight: tokens.fontWeightRegular,
    color: '#323130',
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  navIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    minHeight: 0, // Allows content to shrink below its minimum height
    overflow: 'hidden',
  },
  itemsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  columnHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    cursor: 'pointer',
    fontWeight: tokens.fontWeightSemibold,
    '&:hover': {
      color: tokens.colorBrandForeground2Hover,
    },
  },
  sortIcon: {
    fontSize: tokens.fontSizeBase200,
    display: 'flex',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 0,
  },
  searchBox: {
    width: '320px',
  },
  itemsContainer: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: `12px ${tokens.spacingHorizontalL} 12px`,
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: tokens.colorNeutralStroke2,
      borderRadius: '2px',
    },
  },
  itemsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: tokens.spacingHorizontalM,
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: tokens.spacingHorizontalS,
    },
  },
  card: {
    height: '100%',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 8px',
    marginTop: '4px',
    boxShadow: tokens.shadow2,
    overflow: 'hidden', // Prevent content overflow
    '&:hover': {
      boxShadow: tokens.shadow4,
      transform: 'translateY(-1px)',
      transition: 'all 0.2s ease'
    }
  },
  cardIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    overflow: 'hidden',
    flexShrink: 0,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 0,
    overflow: 'hidden',
    width: '100%',
  },
  cardTitle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: tokens.fontWeightSemibold,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  connectorIcon: {
    width: '64px',
    height: '64px',
    objectFit: 'contain',
  },
  author: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  actionButton: {
    minWidth: '100px',
  },

  description: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  category: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: '16px',
    display: 'block',
    marginTop: 0,
  },
  noResults: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    color: tokens.colorNeutralForeground3,
  },
  categoryGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    marginBottom: '32px'
  },
  categoryHeader: {
    marginTop: 0,
    marginBottom: 0
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: tokens.spacingHorizontalM,
    width: '100%',
    marginTop: 0
  },
});

interface LibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCategory?: string;
  initialItemId?: string; // Added to support opening directly to a specific item
}

export const LibraryModal: React.FC<LibraryModalProps> = ({ open, onOpenChange, initialCategory, initialItemId }) => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<LibraryCategoryType>('Built-in');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortType, setSortType] = useState<'name' | 'category'>('name');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<LibraryItemType | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');

  // Get all available library items
  const getAllLibraryItems = (): LibraryItemType[] => {
    let allItems: LibraryItemType[] = [];
    ['Built-in', 'Connectors', 'Custom Actions', 'UI Collections', 'Templates'].forEach(category => {
      allItems = [...allItems, ...dataService.getLibraryItemsByCategory(category as LibraryCategoryType)];
    });
    return allItems;
  };
  
  // Set active tab based on initialCategory if provided
  useEffect(() => {
    if (initialCategory) {
      // Check if initialCategory is a valid LibraryCategoryType
      if (['Built-in', 'Connectors', 'Custom Actions', 'UI Collections', 'Templates'].includes(initialCategory)) {
        setActiveTab(initialCategory as LibraryCategoryType);
      }
    }
    
    // If initialItemId is provided, find the item and show details
    if (initialItemId) {
      const allItems = getAllLibraryItems();
      const item = allItems.find(item => item.id === initialItemId);
      if (item) {
        setSelectedItem(item);
        setViewMode('details');
      }
    }
  }, [initialCategory, initialItemId]);

  // Helper function to get the category name for an item
  const getItemCategory = (item: LibraryItemType): string => {
    // If the item has a category defined, use it
    if (item.category) {
      return item.category;
    }
    
    // Fallback to 'Other' if no category is defined
    return 'Other';
  };

  // Set sort type handler
  const setSortTypeHandler = (type: 'name' | 'category') => {
    setSortType(type);
  };

  // Get library items based on the selected category and search query
  const libraryItems = dataService.getLibraryItemsByCategory(activeTab);

  // Define the type for processed items
  type ProcessedItems = 
    | { grouped: false; items: LibraryItemType[] }
    | { grouped: true; categories: {name: string; items: LibraryItemType[]}[] };

  // Process items based on search query and sort type
  const processedItems = useMemo<ProcessedItems>(() => {
    let items = libraryItems;
    
    // Apply search filter if query exists
    if (searchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (sortType === 'name') {
      // Sort by name only
      return {
        grouped: false,
        items: [...items].sort((a, b) => a.title.localeCompare(b.title))
      };
    } else {
      // Group by category
      // Get all unique categories
      const categoryMap = new Map<string, LibraryItemType[]>();
      
      // Group items by category
      items.forEach(item => {
        // Use the item's category or fallback to 'Other'
        const category = getItemCategory(item);
        
        if (!categoryMap.has(category)) {
          categoryMap.set(category, []);
        }
        categoryMap.get(category)?.push(item);
      });
      
      // Convert map to array of categories with their items
      const categories = Array.from(categoryMap.entries()).map(([name, items]) => ({
        name,
        items: items.sort((a, b) => a.title.localeCompare(b.title))
      }));
      
      // Sort categories alphabetically
      categories.sort((a, b) => a.name.localeCompare(b.name));
      
      return {
        grouped: true,
        categories
      };
    }
  }, [libraryItems, searchQuery, sortType, activeTab]);

  // Using shared icon color utility
  
  // Helper function to get the icon for each category
  const getCategoryIcon = (category: LibraryCategoryType | string) => {
    const isActive = activeTab === category;
    const iconStyle = { color: isActive ? tokens.colorBrandForeground1 : tokens.colorNeutralForeground2 };
    let IconComponent;
    
    switch (category) {
      case 'Built-in':
        IconComponent = isActive ? PuzzlePiece24Filled : PuzzlePiece24Regular;
        break;
      case 'Connectors':
        IconComponent = isActive ? PlugConnected24Filled : PlugConnected24Regular;
        break;
      case 'Custom Actions':
        IconComponent = isActive ? Shapes24Filled : Shapes24Regular;
        break;
      case 'UI Collections':
        IconComponent = isActive ? Book24Filled : Book24Regular;
        break;
      case 'Templates':
        IconComponent = isActive ? Cube24Filled : Cube24Regular;
        break;
      default:
        IconComponent = isActive ? Cube24Filled : Cube24Regular;
    }
    
    return <IconComponent style={iconStyle} />;
  };

  const handleInstall = (itemId: string) => {
    // This would be implemented to actually install the connector
    console.log(`Installing item with ID: ${itemId}`);
    // In a real implementation, this would call an API to install the item
  };
  
  // Function to handle card click
  const handleCardClick = (item: LibraryItemType) => {
    setSelectedItem(item);
    setViewMode('details');
  };
  
  // Go back to the list view
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedItem(null);
  };
  
  // Function to render the details view
  
  // Render the details view for a selected item
  const renderDetailsView = () => {
    if (!selectedItem) return null;
    
    // Get actions for this module
    const actions = selectedItem.actions || [];
    
    return (
      <div className={styles.detailsView}>
        <div className={styles.detailsHeader}>
          <Button 
            appearance="subtle" 
            icon={<ChevronRight24Regular style={{ transform: 'rotate(180deg)' }} />} 
            onClick={handleBackToList}
          >
            Back to library
          </Button>
        </div>
        
        <div className={styles.detailsContent}>
          {/* Main details row with left content and right CTA */}
          <div className={styles.detailsMainRow}>
            {/* Left side: Content */}
            <div className={styles.detailsLeftContent}>
              <div className={`${styles.detailsIcon} ${getIconBackgroundClass((selectedItem as ModuleItemType).iconColor)} ${getIconColorClass((selectedItem as ModuleItemType).iconColor)}`}>
                {getIconByName(selectedItem.icon, selectedItem.id)}
              </div>
              
              <div className={styles.detailsTextContent}>
                <Text size={600} weight="semibold" className={styles.detailsTitle}>{selectedItem.title}</Text>
                <Text 
                  size={300}
                  style={{
                    color: tokens.colorNeutralForeground3,
                    marginTop: 0,
                    lineHeight: 1,
                  }}
                >
                  {getItemCategory(selectedItem)}
                </Text>
              </div>
            </div>
            
            {/* Right side: CTA button */}
            <div className={styles.detailsRightCTA}>
              {selectedItem.isInstalled ? (
                <Button 
                  appearance="secondary"
                  onClick={() => {
                    console.log('Uninstall module:', selectedItem.id);
                    // Implement uninstall functionality
                  }}
                >
                  Uninstall
                </Button>
              ) : (
                <Button 
                  appearance="primary"
                  icon={<ArrowDownload24Regular />}
                  onClick={() => {
                    console.log('Install module:', selectedItem.id);
                    handleInstall(selectedItem.id);
                  }}
                >
                  Install module
                </Button>
              )}
            </div>
          </div>
          
          <div className={styles.detailsActions}>
            
            <div className={styles.actionsHeader}>
              <Text size={300} weight="semibold">
                {actions.length} action{actions.length !== 1 ? 's' : ''}
              </Text>
            </div>
            
            {actions.length > 0 ? (
              <div className={styles.actionsDetailList}>
                {actions.map(action => (
                  <div key={action.id} className={styles.actionListItem} onClick={() => {
                    console.log('Action selected:', action);
                    // Handle action selection - add to canvas
                  }}>
                    <div className={styles.actionListItemContent}>
                      <Text>{action.title}</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Execute {action.description ? action.description.toLowerCase() : 'action'}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Text>No actions available for this module.</Text>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => onOpenChange(data.open)}>
      <DialogSurface className={styles.dialogSurface} style={{ padding: 0 }}>
        <div className={styles.header}>
          <DialogTitle className={styles.title}>Library</DialogTitle>
          <Button 
            appearance="subtle" 
            icon={<Dismiss24Regular />} 
            aria-label="Close" 
            onClick={() => onOpenChange(false)}
            className={styles.closeButton}
          />
        </div>

        <DialogContent className={styles.content} style={{ padding: 0 }}>
          {/* Left Navigation - Only show in list view */}
          {viewMode === 'list' && (
            <div className={styles.navSidebar}>
              {(['Built-in', 'Connectors', 'Custom Actions', 'UI Collections', 'Templates'] as LibraryCategoryType[]).map((category) => (
                <div 
                  key={category} 
                  className={`${styles.navItem} ${activeTab === category ? 'selected' : ''}`}
                  onClick={() => setActiveTab(category)}
                >
                  <div style={{ padding: '2px', display: 'flex', alignItems: 'center' }}>
                    {getCategoryIcon(category)}
                  </div>
                  <span className={styles.navItemText}>{category}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Main Content */}
          <div className={styles.mainContent}>
            {viewMode === 'details' ? (
              renderDetailsView()
            ) : (
              <div className={styles.listView}>
            <div className={styles.itemsHeader}>
              <div className={styles.columnHeader}>
                {/* Sort options - show more options for Built-in category */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {(activeTab === 'Built-in' || activeTab === 'Connectors') && (
                    <Dropdown
                      value={sortType === 'name' ? 'Name' : 'Category'}
                      onOptionSelect={(_, data) => {
                        if (data.optionValue === 'Name') {
                          setSortTypeHandler('name');
                        } else if (data.optionValue === 'Category') {
                          setSortTypeHandler('category');
                        }
                      }}
                      style={{ minWidth: '120px' }}
                    >
                      <Option value="Name">Name</Option>
                      <Option value="Category">Category</Option>
                    </Dropdown>
                  )}
                </div>
              </div>
              <div className={styles.searchContainer}>
                <SearchBox
                  placeholder="Search"
                  className={styles.searchBox}
                  value={searchQuery}
                  onChange={(_, data) => setSearchQuery(data.value)}
                  contentBefore={<Search24Regular />}
                />
              </div>
            </div>
            <div className={styles.itemsContainer}>
              {/* Empty state for search with no results */}
              {searchQuery && ((!processedItems.grouped && processedItems.items.length === 0) || (processedItems.grouped && processedItems.categories.length === 0)) ? (
                <EmptyState
                  image={
                    <svg width="64" height="64" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.5 6C12.768 6 6.5 12.268 6.5 20C6.5 27.732 12.768 34 20.5 34C23.9159 34 27.0461 32.7766 29.4763 30.7441L40.3662 41.6339C40.8543 42.122 41.6458 42.122 42.1339 41.6339C42.6221 41.1457 42.6221 40.3543 42.1339 39.8661L31.2441 28.9763C33.2766 26.5461 34.5 23.4159 34.5 20C34.5 12.268 28.232 6 20.5 6ZM9 20C9 13.6487 14.1487 8.5 20.5 8.5C26.8513 8.5 32 13.6487 32 20C32 26.3513 26.8513 31.5 20.5 31.5C14.1487 31.5 9 26.3513 9 20Z" fill="url(#paint0_linear_search)"/>
                      <defs>
                        <linearGradient id="paint0_linear_search" x1="12.5004" y1="6" x2="37.4067" y2="42.5517" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#4C92FD"/>
                          <stop offset="1" stopColor="#7D51C9"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  }
                  title="No results found"
                  description={`We couldn't find any matches for "${searchQuery}". Try adjusting your search or filter to find what you're looking for.`}
                />
              ) : activeTab === 'Templates' && (!processedItems.grouped && processedItems.items.length === 0 || processedItems.grouped && processedItems.categories.length === 0) ? (
                // Empty state for Templates tab
                <EmptyState
                  image={
                    <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.25 4C10.7982 4 8 6.79822 8 10.25V37.75C8 41.2018 10.7982 44 14.25 44H38.75C39.4404 44 40 43.4404 40 42.75C40 42.0596 39.4404 41.5 38.75 41.5H14.25C12.4358 41.5 10.9225 40.2117 10.575 38.5H37.75C38.9926 38.5 40 37.4926 40 36.25V10.25C40 6.79822 37.2018 4 33.75 4H14.25ZM37.5 36H10.5V10.25C10.5 8.17893 12.1789 6.5 14.25 6.5H33.75C35.8211 6.5 37.5 8.17893 37.5 10.25V36ZM16.25 10C15.0074 10 14 11.0074 14 12.25V16.75C14 17.9926 15.0074 19 16.25 19H31.75C32.9926 19 34 17.9926 34 16.75V12.25C34 11.0074 32.9926 10 31.75 10H16.25ZM16.5 16.5V12.5H31.5V16.5H16.5Z" fill="url(#paint0_linear_templates)"/>
                      <defs>
                        <linearGradient id="paint0_linear_templates" x1="13.3337" y1="4" x2="42.6899" y2="38.4657" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#4C92FD"/>
                          <stop offset="1" stopColor="#7D51C9"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  }
                  title="No templates yet"
                  description="Templates are pre-built workflow configurations that can be used as starting points for common automation scenarios."
                />
              ) : activeTab === 'UI Collections' && (!processedItems.grouped && processedItems.items.length === 0 || processedItems.grouped && processedItems.categories.length === 0) ? (
                // Empty state for UI Collections tab
                <EmptyState
                  image={
                    <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5 6.5C11.4249 6.5 6.5 11.4249 6.5 17.5C6.5 22.8921 10.3798 27.3781 15.5 28.3186V30.8529C8.99258 29.8865 4 24.2763 4 17.5C4 10.0442 10.0442 4 17.5 4C24.2763 4 29.8865 8.99258 30.8529 15.5H28.3186C27.3781 10.3798 22.8921 6.5 17.5 6.5ZM23.25 18C20.3505 18 18 20.3505 18 23.25V38.75C18 41.6495 20.3505 44 23.25 44H38.75C41.6495 44 44 41.6495 44 38.75V23.25C44 20.3505 41.6495 18 38.75 18H23.25ZM20.5 23.25C20.5 21.7312 21.7312 20.5 23.25 20.5H38.75C40.2688 20.5 41.5 21.7312 41.5 23.25V38.75C41.5 40.2688 40.2688 41.5 38.75 41.5H23.25C21.7312 41.5 20.5 40.2688 20.5 38.75V23.25Z" fill="url(#paint0_linear_11324_41626)"/>
                      <defs>
                        <linearGradient id="paint0_linear_11324_41626" x1="10.6671" y1="4" x2="38.3408" y2="44.6129" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#4C92FD"/>
                          <stop offset="1" stopColor="#7D51C9"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  }
                  title="No UI collections yet"
                  description="UI collections help organize and manage related UI components for better reusability across workflows."
                />
              ) : activeTab === 'Custom Actions' && (!processedItems.grouped && processedItems.items.length === 0 || processedItems.grouped && processedItems.categories.length === 0) ? (
                // Empty state for Custom Actions tab
                <EmptyState
                  image={
                    <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25 6.5C23.067 6.5 21.5 8.067 21.5 10V12.5H14.75C14.0596 12.5 13.5 13.0596 13.5 13.75V20.5H11C9.067 20.5 7.5 22.067 7.5 24C7.5 25.933 9.067 27.5 11 27.5H13.5V34.25C13.5 34.9404 14.0596 35.5 14.75 35.5H21.5V38C21.5 39.933 23.067 41.5 25 41.5C26.933 41.5 28.5 39.933 28.5 38V35.5H35.25C35.9404 35.5 36.5 34.9404 36.5 34.25V30H36C32.6863 30 30 27.3137 30 24C30 20.6863 32.6863 18 36 18H36.5V13.75C36.5 13.0596 35.9404 12.5 35.25 12.5H28.5V10C28.5 8.067 26.933 6.5 25 6.5ZM19 10C19 6.68629 21.6863 4 25 4C28.3137 4 31 6.68629 31 10H35.25C37.3211 10 39 11.6789 39 13.75V20.5H36C34.067 20.5 32.5 22.067 32.5 24C32.5 25.933 34.067 27.5 36 27.5H39V34.25C39 36.3211 37.3211 38 35.25 38H31C31 41.3137 28.3137 44 25 44C21.6863 44 19 41.3137 19 38H14.75C12.6789 38 11 36.3211 11 34.25V30H11C7.68629 30 5 27.3137 5 24C5 20.6863 7.68629 18 11 18L11 13.75C11 11.6789 12.6789 10 14.75 10H19Z" fill="url(#paint0_linear_11324_41626)"/>
                      <defs>
                        <linearGradient id="paint0_linear_11324_41626" x1="10.6671" y1="4" x2="39.6898" y2="40.2038" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#4C92FD"/>
                          <stop offset="1" stopColor="#7D51C9"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  }
                  title="No custom actions yet"
                  description="Custom actions are reusable components that can be created to extend the functionality of your workflows."
                />
              ) : processedItems.grouped ? (
                // Grouped by category display
                processedItems.categories.map((category: {name: string, items: LibraryItemType[]}) => (
                  <div key={category.name} className={styles.categoryGroup}>
                    <div className={styles.categoryHeader}>
                      <Text weight="semibold" size={300}>{category.name}</Text>
                    </div>
                    <div className={styles.itemsGrid}>
                      {category.items.map((item: LibraryItemType) => (
                        <Card
                          key={item.id}
                          className={styles.card}
                          onClick={() => {
                            setSelectedItem(item);
                            setViewMode('details');
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div 
                            className={`${styles.cardIcon} ${getIconBackgroundClass((item as ModuleItemType).iconColor)} ${getIconColorClass((item as ModuleItemType).iconColor)}`}
                          >
                            {getIconByName(item.icon, item.id)}
                          </div>
                          <div className={styles.cardContent}>
                            <Text className={styles.cardTitle}>{item.title}</Text>

                            {/* Show category directly from the first tag */}
                            <Text className={styles.category}>
                              {(() => {
                                const moduleItem = item as ModuleItemType;
                                const category = moduleItem.tags && moduleItem.tags.length > 0
                                  ? moduleItem.tags[0]
                                  : 'Other';
                                
                                return category;
                              })()}
                            </Text>
                          </div>
                          {item.isInstalled && (
                            <div className={styles.cardFooter}>
                              <Badge 
                                appearance="tint"
                                color="success"
                                icon={<Checkmark12Regular />}
                                size="small"
                              />
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // Regular flat display
                <div className={styles.itemsGrid}>
                  {processedItems.items.length > 0 ? (
                    processedItems.items.map((item: LibraryItemType) => (
                      <Card
                        key={item.id}
                        className={styles.card}
                        onClick={() => {
                          setSelectedItem(item);
                          setViewMode('details');
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div 
                          className={`${styles.cardIcon} ${getIconBackgroundClass((item as ModuleItemType).iconColor)} ${getIconColorClass((item as ModuleItemType).iconColor)}`}
                        >
                          {getIconByName(item.icon, item.id)}
                        </div>
                        <div className={styles.cardContent}>
                          <Text className={styles.cardTitle}>{item.title}</Text>

                          <Text className={styles.category}>
                            {getItemCategory(item)}
                          </Text>
                        </div>
                        {item.isInstalled && (
                          <div className={styles.cardFooter}>
                            <Badge 
                              appearance="tint"
                              color="success"
                              icon={<Checkmark12Regular />}
                              size="small"
                            />
                          </div>
                        )}
                      </Card>
                    ))
                  ) : (
                    <div className={styles.noResults}>
                      <Text>No items found.</Text>
                    </div>
                  )}
                </div>
              )}
            </div>
              </div>
            )}
          </div>
        </DialogContent>

      </DialogSurface>
    </Dialog>
  );
};
