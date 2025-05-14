import React, { useState } from 'react';
import {
  makeStyles,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Checkbox,
  tokens,
  Tooltip,
  Badge,
} from '@fluentui/react-components';
import { SearchBox } from '@fluentui/react-search';
import { 
  Filter24Regular,
  Checkmark20Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  /* Container styles */
  header: {
    padding: '16px 16px 0 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    borderBottom: `1px solid ${tokens.colorNeutralBackground4}`,
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
  },
  searchInput: {
    width: '100%',
    '& input': {
      height: '32px',
      fontSize: '14px',
    },
    '& span[class*="contentBefore"]': {
      color: tokens.colorNeutralForeground3,
    },
  },
  clearButton: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorNeutralForeground3,
    '&:hover': {
      color: tokens.colorNeutralForeground2,
    },
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '8px',
    paddingBottom: '8px',
  },
  badgeContainer: {
    display: 'flex',
    gap: '8px',
    flex: 1,
    alignItems: 'center',
  },
  badge: {
    cursor: 'pointer',
    padding: '4px 8px',
  },

  filterButton: {
    marginLeft: '8px',
    position: 'relative',
    height: '24px',
    minWidth: '24px',
    padding: '0',
  },
  filterBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
  },
  /* Menu styles */
  menuPopover: {
    padding: '4px 0',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  menuSection: {
    padding: '4px 12px',
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    height: '32px',
  },
  menuItemContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  checkIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    marginRight: '8px',
  },
  menuItemText: {
    marginLeft: '0',
  },
  menuItemCheckbox: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 12px',
    height: '32px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  menuDivider: {
    height: '1px',
    backgroundColor: tokens.colorNeutralBackground4,
    margin: '4px 0',
  },
  clearFiltersButton: {
    width: '100%',
    justifyContent: 'center',
    color: tokens.colorBrandForeground1,
  },
});

interface ActionsPaneHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

type SortOrder = 'name-asc' | 'recent';

export const ActionsPaneHeader: React.FC<ActionsPaneHeaderProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}) => {
  const styles = useStyles();
  const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc');
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    { id: 'new', label: 'New', checked: false },
    { id: 'premium', label: 'Premium', checked: false },
    { id: 'dlp', label: 'Data loss prevention', checked: false },
  ]);

  // Count active filters
  const activeFilterCount = filterOptions.filter(option => option.checked).length + 
    (sortOrder !== 'name-asc' ? 1 : 0);

  const handleFilterOptionChange = (id: string) => {
    setFilterOptions(options => 
      options.map(option => 
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  const handleSortOrderChange = (order: SortOrder) => {
    setSortOrder(order);
    setFilterMenuOpen(false);
  };

  const handleClearFilters = () => {
    setFilterOptions(options => options.map(option => ({ ...option, checked: false })));
    setSortOrder('name-asc');
  };

  return (
    <div className={styles.header}>
      <div className={styles.searchContainer}>
        <SearchBox
          className={styles.searchInput}
          placeholder="Search actions..."
          value={searchQuery}
          onChange={(e, data) => onSearchChange(data.value)}
          size="medium"
        />
      </div>
      <div className={styles.tabsContainer}>
        <div className={styles.badgeContainer}>
          <Badge 
            className={styles.badge}
            appearance={activeTab === "All" ? "tint" : "outline"}
            color={activeTab === "All" ? "brand" : "informative"}
            shape="circular"
            size="large"
            onClick={() => onTabChange("All")}
          >
            All
          </Badge>
          <Badge 
            className={styles.badge}
            appearance={activeTab === "Built-in" ? "tint" : "outline"}
            color={activeTab === "Built-in" ? "brand" : "informative"}
            shape="circular"
            size="large"
            onClick={() => onTabChange("Built-in")}
          >
            Built-in
          </Badge>
          <Badge 
            className={styles.badge}
            appearance={activeTab === "Connectors" ? "tint" : "outline"}
            color={activeTab === "Connectors" ? "brand" : "informative"}
            shape="circular"
            size="large"
            onClick={() => onTabChange("Connectors")}
          >
            Connectors
          </Badge>
          <Badge 
            className={styles.badge}
            appearance={activeTab === "Favorites" ? "tint" : "outline"}
            color={activeTab === "Favorites" ? "brand" : "informative"}
            shape="circular"
            size="large"
            onClick={() => onTabChange("Favorites")}
          >
            Favorites
          </Badge>
        </div>
        
        <Menu open={filterMenuOpen} onOpenChange={(e, data) => setFilterMenuOpen(data.open)}>
          <MenuTrigger disableButtonEnhancement>
            <Tooltip content="Filter and sort" relationship="label">
              <Button
                className={styles.filterButton}
                icon={<Filter24Regular fontSize={16} />}
                appearance="subtle"
                size="small"
                aria-label="Filter options"
                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              >
                {activeFilterCount > 0 && (
                  <Badge 
                    className={styles.filterBadge} 
                    appearance="filled" 
                    color="brand"
                    size="tiny"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </Tooltip>
          </MenuTrigger>
          <MenuPopover className={styles.menuPopover}>
            <MenuList>
              <div className={styles.menuSection}>Sort by</div>
              <MenuItem 
                className={styles.menuItem}
                onClick={() => handleSortOrderChange('name-asc')}
              >
                <div className={styles.menuItemContent}>
                  <div className={styles.checkIcon}>
                    {sortOrder === 'name-asc' && <Checkmark20Regular />}
                  </div>
                  <span className={styles.menuItemText}>Name (A to Z)</span>
                </div>
              </MenuItem>
              <MenuItem 
                className={styles.menuItem}
                onClick={() => handleSortOrderChange('recent')}
              >
                <div className={styles.menuItemContent}>
                  <div className={styles.checkIcon}>
                    {sortOrder === 'recent' && <Checkmark20Regular />}
                  </div>
                  <span className={styles.menuItemText}>Most recent</span>
                </div>
              </MenuItem>
              
              <div className={styles.menuDivider}></div>
              <div className={styles.menuSection}>Filter by</div>
              {filterOptions.map(option => (
                <MenuItem key={option.id} className={styles.menuItemCheckbox}>
                  <div className={styles.checkboxContainer}>
                    <Checkbox 
                      label={option.label} 
                      checked={option.checked}
                      onChange={() => handleFilterOptionChange(option.id)}
                    />
                  </div>
                </MenuItem>
              ))}
              
              {activeFilterCount > 0 && (
                <>
                  <div className={styles.menuDivider}></div>
                  <MenuItem onClick={handleClearFilters} className={styles.clearFiltersButton}>
                    Clear all filters
                  </MenuItem>
                </>
              )}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </div>
  );
};
