/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
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
  Option
} from '@fluentui/react-components';

import React from 'react';
import { 
  Dismiss24Regular, 
  Search24Regular, 
  CheckmarkCircle24Filled,
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
  Cube24Regular,
  Calendar24Regular,
  Document24Regular,
  FolderZip24Regular,
  Laptop24Regular,
  Mail24Regular,
  MailInbox24Regular,
  PlugConnected24Regular,
  PuzzlePiece24Regular,
  Shapes24Regular,
  Book24Regular,
  Star24Regular,
  Braces24Regular,
  BracesVariable24Regular,
  Window24Regular,
  WindowConsoleRegular,
  Desktop24Regular,
  Settings24Regular,
  ScanText24Regular,
  TextDescription24Regular
} from '@fluentui/react-icons';
import { dataService } from '../../data/dataService';
import { LibraryItemType, LibraryCategoryType } from '../../models/types';
import { MailShield24Regular } from './MailShieldIcon';
import { ArrowCircleDownUp24Regular } from './ArrowCircleDownUpIcon';
import { CustomGlobe24Regular } from './GlobeIcon';
import { ActiveDirectory24Regular } from './ActiveDirectoryIcon';
import { ListBarTree24Regular } from './ListBarTreeIcon';



// Extended interface for module items with additional properties
interface ModuleItemType extends LibraryItemType {
  icon?: string;
  iconColor?: string;
  tags?: string[];
}

const useStyles = makeStyles({
  dialogSurface: {
    width: '80vw',
    maxWidth: '1000px',
    height: '80vh',
    maxHeight: '800px',
    padding: 0,
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
    height: 'calc(100% - 120px)',
    padding: '0',
    margin: '0',
    width: '100%',
  },
  navSidebar: {
    width: '250px',
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: 0,
    flexShrink: 0,
    height: '100%',
    overflow: 'auto',
  },
  navItem: {
    padding: tokens.spacingVerticalS,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    '&.selected': {
      backgroundColor: tokens.colorNeutralBackground1Selected,
      color: tokens.colorBrandForeground1,
    },
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    height: '44px',
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
    overflowY: 'auto',
    padding: `12px ${tokens.spacingHorizontalL} 0`,
    flex: 1,
  },
  itemsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: tokens.spacingHorizontalL,
  },
  card: {
    height: '100%',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    marginTop: '8px',
    boxShadow: tokens.shadow2,
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
    flexShrink: 0,
  },
  // Logic category (red)
  iconAmber: {
    backgroundColor: '#FEF3C7',
    color: '#CA5010',
  },
  // Integration category (blue)
  iconBlue: {
    backgroundColor: '#E0E7FF',
    color: '#4F6BED',
  },
  // Advanced category (green)
  iconGreen: {
    backgroundColor: '#D1FAE5',
    color: '#059669',
  },
  // Custom actions (purple)
  iconPurple: {
    backgroundColor: '#F3E8FF',
    color: '#881798',
  },
  // Logic category (red)
  iconRed: {
    backgroundColor: '#FFE4E6',
    color: '#E11D48',
  },
  // Interaction category (orange)
  iconOrange: {
    backgroundColor: '#FFEDD5',
    color: '#EA580C',
  },
  // System category (gray)
  iconGray: {
    backgroundColor: '#F3F4F6',
    color: '#605E5C',
  },
  // Connector (light blue)
  iconLightBlue: {
    backgroundColor: '#E5F1FB',
    color: '#0078D4',
  },
  // Scripting category (teal)
  iconTeal: {
    backgroundColor: '#E6FFFA',
    color: '#00A381',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  installedBadge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '4px',
    padding: '0px 4px',
    height: '20px',
    borderRadius: '9999px',
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1,
    fontSize: tokens.fontSizeBase200,
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
  footer: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalM,
    width: '100%',
    boxSizing: 'border-box',
  },
  description: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  category: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    display: 'block',
    marginTop: '2px',
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
}



export const LibraryModal = ({ open, onOpenChange }: LibraryModalProps) => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<LibraryCategoryType>('Connectors');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState<'name' | 'category'>('category');

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
        // Simply use the first tag as the category, or 'Other' if no tags
        const category = item.tags && item.tags.length > 0 ? item.tags[0] : 'Other';
        
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

  // Set sort type
  const setSortTypeHandler = (type: 'name' | 'category') => {
    setSortType(type);
  };

  // Helper function to get an icon based on the icon name
  const getModuleIcon = (iconName?: string) => {
    if (!iconName) return <Cube24Regular />;
    
    // Handle the new icon format (e.g., folderZip20Regular)
    if (iconName.includes('20Regular') || iconName.includes('24Regular') || iconName.includes('48Regular')) {
      // For specific icon names, handle them directly
      if (iconName === 'shapes20Regular') {
        return <Shapes24Regular />;
      } else if (iconName === 'book20Regular') {
        return <Book24Regular />;
      }
      
      // For other icons, extract the base name without size and style
      const baseName = iconName.replace(/\d+Regular$/, '');
      
      switch (baseName.toLowerCase()) {
        case 'folderzip':
          return <FolderZip24Regular />;
        case 'document':
          return <Document24Regular />;
        case 'laptop':
          return <Laptop24Regular />;
        case 'plugconnected':
          return <PlugConnected24Regular />;
        case 'puzzlepiece':
          return <PuzzlePiece24Regular />;
        case 'braces':
          return <Braces24Regular />;
        case 'bracesvariable':
          return <BracesVariable24Regular />;
        case 'window':
          return <Window24Regular />;
        case 'windowconsole':
          return <WindowConsoleRegular style={{ fontSize: '24px' }} />;
        case 'desktoptower':
          return <Desktop24Regular />;
        case 'windowsettings':
          return <Settings24Regular />;
        case 'scantext':
          return <ScanText24Regular />;
        case 'textfield':
          return <TextDescription24Regular />;
        case 'database':
          return <Database24Regular />;
        case 'mail':
          return <Mail24Regular />;
        case 'mailunread':
          return <Mail24Regular />;
        case 'mailinbox':
          return <MailInbox24Regular />;
        case 'mailshield':
          // Using our custom MailShield icon implementation
          return <MailShield24Regular />;
        case 'arrowcircledownup':
          return <ArrowCircleDownUp24Regular />;
        case 'customglobe':
          return <CustomGlobe24Regular />;
        case 'customactivedirectory':
          return <ActiveDirectory24Regular />;
        case 'listbartree':
          return <ListBarTree24Regular />;
        case 'code':
          return <Code24Regular />;
        case 'lockclosed':
          return <LockClosed24Regular />;
        case 'listorder':
          return <Channel24Regular />;
        case 'peopleteam':
          return <Organization24Regular />;
        // Add more cases for other icons in the new format as needed
        default:
          return <Cube24Regular />;
      }
    }
    
    // Handle the old icon format
    switch (iconName.toLowerCase()) {
      case 'globe':
        return <Globe24Regular />;
      case 'folder':
        return <Folder24Regular />;
      case 'comment':
        return <Comment24Regular />;
      case 'clock':
        return <Calendar24Regular />;
      case 'calendar':
        return <Calendar24Regular />;
      case 'code':
        return <Code24Regular />;
      case 'windowconsole':
        return <WindowConsoleRegular style={{ fontSize: '24px' }} />; // Using dedicated console icon

      case 'document':
        return <Document24Regular />;
      case 'cube':
        return <Cube24Regular />;
      case 'organization':
        return <Organization24Regular />;
      case 'timer':
        return <Timer24Regular />;
      case 'clipboard':
        return <Clipboard24Regular />;
      case 'channel':
        return <Channel24Regular />;
      case 'arrow-repeat-all':
        return <ArrowRepeatAll24Regular />;
      case 'keyboard':
        return <Keyboard24Regular />;
      case 'pdf':
        return <DocumentPdf24Regular />;
      case 'database':
        return <Database24Regular />;
      case 'server':
        return <Database24Regular />;
      case 'folder-zip':
        return <FolderZip24Regular />;
      default:
        return <Cube24Regular />;
    }
  };

  // Helper function to get the appropriate icon color class
  const getIconColorClass = (iconColor?: string) => {
    if (!iconColor) return styles.iconBlue;
    
    switch (iconColor.toLowerCase()) {
      case 'amber':
        return styles.iconAmber;
      case 'blue':
        return styles.iconBlue;
      case 'green':
        return styles.iconGreen;
      case 'purple':
        return styles.iconPurple;
      case 'red':
        return styles.iconRed;
      case 'orange':
        return styles.iconOrange;
      case 'grey':
      case 'gray':
        return styles.iconGray;
      case 'lightblue':
        return styles.iconLightBlue;
      case 'teal':
        return styles.iconTeal; // Using the dedicated teal style
      default:
        return styles.iconBlue;
    }
  };
  
  // Helper function to get a category name from tags
  const getCategoryFromTags = (tags: string[]) => {
    if (tags.includes('advanced')) return 'Advanced';
    if (tags.includes('data')) return 'Data';
    if (tags.includes('integration')) return 'Integration';
    if (tags.includes('interaction')) return 'Interaction';
    if (tags.includes('logic')) return 'Logic';
    if (tags.includes('system')) return 'System';
    if (tags.includes('Scripting') || tags.includes('scripting')) return 'Scripting';
    return 'Other';
  };

  // Helper function to get the icon for each category
  const getCategoryIcon = (category: LibraryCategoryType | string) => {
    switch (category) {
      case 'Built-in':
        return <Cube24Regular />;
      case 'Connectors':
        return <PlugConnected24Regular />;
      case 'Custom Actions':
        return <PuzzlePiece24Regular />;
      case 'UI Collections':
        // Using the exact icon format as requested: shapes20Regular
        return <Shapes24Regular />;
      case 'Templates':
        return <Book24Regular />;
      case 'Advanced':
        return <Star24Regular />;
      case 'Data':
        return <Database24Regular />;
      default:
        return <Cube24Regular />;
    }
  };

  const handleInstall = (itemId: string) => {
    // This would be implemented to actually install the connector
    console.log(`Installing item with ID: ${itemId}`);
    // In a real implementation, this would call an API to install the item
    // For now, we'll just log the action
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
          {/* Left Navigation */}
          <div className={styles.navSidebar}>
            {(['Built-in', 'Connectors', 'Custom Actions', 'UI Collections', 'Templates'] as LibraryCategoryType[]).map((category) => (
              <div 
                key={category} 
                className={`${styles.navItem} ${activeTab === category ? 'selected' : ''}`}
                onClick={() => setActiveTab(category)}
              >
                <span className={styles.navIcon}>{getCategoryIcon(category)}</span>
                <Text>{category}</Text>
              </div>
            ))}
          </div>
          
          {/* Main Content */}
          <div className={styles.mainContent}>
            <div className={styles.itemsHeader}>
              <div className={styles.columnHeader}>
                {/* Sort options - show more options for Built-in category */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Text size={200}>Sort by:</Text>
                  {activeTab === 'Built-in' && (
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
              {processedItems.grouped ? (
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
                        >
                          <div 
                            className={`${styles.cardIcon} ${getIconColorClass((item as ModuleItemType).iconColor)}`}
                          >
                            {getModuleIcon((item as ModuleItemType).icon)}
                          </div>
                          <div className={styles.cardContent}>
                            <Text weight="regular">{item.title}</Text>

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
                          <div className={styles.cardFooter}>
                            {item.isInstalled ? (
                              <div className={styles.installedBadge}>
                                <CheckmarkCircle24Filled fontSize={12} />
                              </div>
                            ) : (
                              <Button 
                                appearance="transparent"
                                icon={<ArrowDownload24Regular />}
                                size="small"
                                onClick={() => handleInstall(item.id)}
                                aria-label="Install"
                              />
                            )}
                          </div>
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
                      >
                        <div 
                          className={`${styles.cardIcon} ${getIconColorClass((item as ModuleItemType).iconColor)}`}
                        >
                          {getModuleIcon((item as ModuleItemType).icon)}
                        </div>
                        <div className={styles.cardContent}>
                          <Text weight="regular">{item.title}</Text>

                          <Text className={styles.category}>
                            {(() => {
                              const moduleItem = item as ModuleItemType;
                              const category = moduleItem.tags && moduleItem.tags.length > 0
                                ? getCategoryFromTags(moduleItem.tags)
                                : moduleItem.id === 'date-time' ? 'Logic' : 'Other';
                              return category;
                            })()}
                          </Text>
                        </div>
                        <div className={styles.cardFooter}>
                          {item.isInstalled ? (
                            <div className={styles.installedBadge}>
                              <CheckmarkCircle24Filled fontSize={12} />
                            </div>
                          ) : (
                            <Button 
                              appearance="transparent"
                              icon={<ArrowDownload24Regular />}
                              size="small"
                              onClick={() => handleInstall(item.id)}
                              aria-label="Install"
                            />
                          )}
                        </div>
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
        </DialogContent>

        <DialogActions className={styles.footer}>
          <Button appearance="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button appearance="primary" onClick={() => onOpenChange(false)}>Done</Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};
