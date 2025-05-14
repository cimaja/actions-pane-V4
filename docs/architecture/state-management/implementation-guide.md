# Actions Pane V4 State Management Implementation Guide

This guide provides practical implementation details for the state management approach outlined in the state management plan.

## Phase 1: Current Implementation

The current implementation uses React's built-in state management with component state and props drilling.

### Component State Example

```jsx
// ActionsPane.tsx
export const ActionsPane: React.FC = () => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ActionsPaneHeader 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <Divider />
      </div>
      <div className={styles.content}>
        <ActionsPaneContent 
          activeTab={activeTab}
          searchQuery={searchQuery}
        />
      </div>
      <div className={styles.footer}>
        <LibraryEntryPoint />
      </div>
    </div>
  );
};
```

### Data Service Example

```typescript
// dataService.ts (excerpt)
export class DataService {
  // ...

  getActionsPaneContent(activeTab: TabType, searchQuery: string): ActionGroup[] {
    // Filter modules based on tab
    let modules: ActionGroup[] = [];
    
    if (activeTab === 'All') {
      // Include both modules and connectors in the All tab
      const displayModules = this.getDisplayModules();
      
      // Get connector modules in the same format as regular modules
      const connectorModules = this.getInstalledConnectors().map(connector => {
        return {
          id: connector.id,
          title: connector.title,
          icon: connector.icon,
          items: this._connectorActions.filter(action => action.moduleId === connector.id),
          tags: ['connector']
        };
      });
      
      modules = [...displayModules, ...connectorModules];
    } else if (activeTab === 'Built-in') {
      modules = this.getDisplayModules().filter(module => 
        !module.tags?.includes('connector')
      );
    } else if (activeTab === 'Connectors') {
      // Display each connector directly without grouping by author
      modules = this.getInstalledConnectors().map(connector => {
        return {
          id: connector.id,
          title: connector.title,
          icon: connector.icon,
          items: this._connectorActions.filter(action => action.moduleId === connector.id),
          tags: ['connector']
        };
      });
    }
    
    // Apply search filter if query exists
    if (searchQuery) {
      // Filter logic...
    }
    
    return modules;
  }
}
```

## Phase 2: Enhanced Implementation

The enhanced implementation uses React Context API and custom hooks for more scalable state management.

### Step 1: Create UI State Context

```jsx
// src/contexts/UIStateContext.tsx
import React, { createContext, useContext, useReducer } from 'react';

// Define the state interface
interface UIState {
  activeTab: string;
  searchQuery: string;
  expandedGroups: string[];
  expandedSubGroups: string[];
  isLibraryModalOpen: boolean;
  activeLibraryTab: string;
  librarySearchQuery: string;
}

// Define the initial state
const initialState: UIState = {
  activeTab: 'All',
  searchQuery: '',
  expandedGroups: [],
  expandedSubGroups: [],
  isLibraryModalOpen: false,
  activeLibraryTab: 'Built-in Actions',
  librarySearchQuery: ''
};

// Define action types
type UIAction = 
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_GROUP_EXPANSION'; payload: string }
  | { type: 'TOGGLE_SUBGROUP_EXPANSION'; payload: string }
  | { type: 'TOGGLE_LIBRARY_MODAL'; payload?: boolean }
  | { type: 'SET_ACTIVE_LIBRARY_TAB'; payload: string }
  | { type: 'SET_LIBRARY_SEARCH_QUERY'; payload: string };

// Create the reducer
function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'TOGGLE_GROUP_EXPANSION':
      const groupId = action.payload;
      const expandedGroups = state.expandedGroups.includes(groupId)
        ? state.expandedGroups.filter(id => id !== groupId)
        : [...state.expandedGroups, groupId];
      return { ...state, expandedGroups };
    case 'TOGGLE_SUBGROUP_EXPANSION':
      const subGroupId = action.payload;
      const expandedSubGroups = state.expandedSubGroups.includes(subGroupId)
        ? state.expandedSubGroups.filter(id => id !== subGroupId)
        : [...state.expandedSubGroups, subGroupId];
      return { ...state, expandedSubGroups };
    case 'TOGGLE_LIBRARY_MODAL':
      return { 
        ...state, 
        isLibraryModalOpen: action.payload !== undefined 
          ? action.payload 
          : !state.isLibraryModalOpen 
      };
    case 'SET_ACTIVE_LIBRARY_TAB':
      return { ...state, activeLibraryTab: action.payload };
    case 'SET_LIBRARY_SEARCH_QUERY':
      return { ...state, librarySearchQuery: action.payload };
    default:
      return state;
  }
}

// Create the context
type UIStateContextType = {
  state: UIState;
  dispatch: React.Dispatch<UIAction>;
};

const UIStateContext = createContext<UIStateContextType | undefined>(undefined);

// Create the provider component
export const UIStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  
  return (
    <UIStateContext.Provider value={{ state, dispatch }}>
      {children}
    </UIStateContext.Provider>
  );
};

// Create a custom hook for using the context
export const useUIState = () => {
  const context = useContext(UIStateContext);
  if (context === undefined) {
    throw new Error('useUIState must be used within a UIStateProvider');
  }
  return context;
};

// Create action creators
export const uiActions = {
  setActiveTab: (tab: string) => ({ type: 'SET_ACTIVE_TAB', payload: tab } as const),
  setSearchQuery: (query: string) => ({ type: 'SET_SEARCH_QUERY', payload: query } as const),
  toggleGroupExpansion: (groupId: string) => ({ type: 'TOGGLE_GROUP_EXPANSION', payload: groupId } as const),
  toggleSubGroupExpansion: (subGroupId: string) => ({ type: 'TOGGLE_SUBGROUP_EXPANSION', payload: subGroupId } as const),
  toggleLibraryModal: (isOpen?: boolean) => ({ type: 'TOGGLE_LIBRARY_MODAL', payload: isOpen } as const),
  setActiveLibraryTab: (tab: string) => ({ type: 'SET_ACTIVE_LIBRARY_TAB', payload: tab } as const),
  setLibrarySearchQuery: (query: string) => ({ type: 'SET_LIBRARY_SEARCH_QUERY', payload: query } as const),
};
```

### Step 2: Create User Preferences Context

```jsx
// src/contexts/UserPreferencesContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the preferences interface
interface UserPreferences {
  favoriteActions: string[];
  actionsPaneWidth: number;
  defaultTab: string;
  recentlyUsedActions: { id: string, timestamp: number }[];
}

// Define the initial preferences
const defaultPreferences: UserPreferences = {
  favoriteActions: [],
  actionsPaneWidth: 360,
  defaultTab: 'All',
  recentlyUsedActions: []
};

// Create the context
type UserPreferencesContextType = {
  preferences: UserPreferences;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
  toggleFavorite: (actionId: string) => void;
  addRecentlyUsedAction: (actionId: string) => void;
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

// Create the provider component
export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    // Load from localStorage or use defaults
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
  });
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);
  
  // Update preferences
  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };
  
  // Toggle favorite
  const toggleFavorite = (actionId: string) => {
    setPreferences(prev => {
      const favorites = prev.favoriteActions || [];
      const newFavorites = favorites.includes(actionId)
        ? favorites.filter(id => id !== actionId)
        : [...favorites, actionId];
      
      return { ...prev, favoriteActions: newFavorites };
    });
  };
  
  // Add recently used action
  const addRecentlyUsedAction = (actionId: string) => {
    setPreferences(prev => {
      const recentlyUsed = prev.recentlyUsedActions || [];
      const newRecentlyUsed = [
        { id: actionId, timestamp: Date.now() },
        ...recentlyUsed.filter(item => item.id !== actionId)
      ].slice(0, 10); // Keep only the 10 most recent
      
      return { ...prev, recentlyUsedActions: newRecentlyUsed };
    });
  };
  
  return (
    <UserPreferencesContext.Provider value={{ 
      preferences, 
      updatePreferences, 
      toggleFavorite, 
      addRecentlyUsedAction 
    }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

// Create a custom hook for using the context
export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
```

### Step 3: Create Custom Hooks

```jsx
// src/hooks/useSearch.ts
import { useState, useEffect } from 'react';
import { dataService } from '../data/dataService';
import { DetailedActionItem } from '../models/types';

export function useSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<DetailedActionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Debounce search to avoid excessive API calls
    const debounceTimeout = setTimeout(() => {
      const searchResults = dataService.searchActions(query);
      setResults(searchResults);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(debounceTimeout);
  }, [query]);
  
  return { query, setQuery, results, isLoading };
}

// src/hooks/useActionGroups.ts
import { useState, useEffect } from 'react';
import { dataService } from '../data/dataService';
import { ActionGroup, TabType } from '../models/types';

export function useActionGroups(activeTab: TabType, searchQuery: string) {
  const [groups, setGroups] = useState<ActionGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Get action groups based on active tab and search query
    const actionGroups = dataService.getActionsPaneContent(activeTab, searchQuery);
    setGroups(actionGroups);
    setIsLoading(false);
  }, [activeTab, searchQuery]);
  
  return { groups, isLoading };
}
```

### Step 4: Update App Component

```jsx
// src/App.tsx
import React from 'react';
import './styles/App.css';
import { ActionsPane } from './components/ActionsPane/ActionsPane';
import { UIStateProvider } from './contexts/UIStateContext';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';

function App() {
  return (
    <UIStateProvider>
      <UserPreferencesProvider>
        <div className="app-container">
          <ActionsPane />
        </div>
      </UserPreferencesProvider>
    </UIStateProvider>
  );
}

export default App;
```

### Step 5: Update ActionsPane Component

```jsx
// src/components/ActionsPane/ActionsPane.tsx
import React from 'react';
import { 
  makeStyles,
  Divider,
} from '@fluentui/react-components';
import { ActionsPaneHeader } from './ActionsPaneHeader';
import { ActionsPaneContent } from './ActionsPaneContent';
import { LibraryEntryPoint } from './LibraryEntryPoint';
import { useUIState } from '../../contexts/UIStateContext';
import { useUserPreferences } from '../../contexts/UserPreferencesContext';

const useStyles = makeStyles({
  // Styles...
});

export const ActionsPane: React.FC = () => {
  const styles = useStyles();
  const { preferences } = useUserPreferences();
  
  return (
    <div className={styles.container} style={{ width: `${preferences.actionsPaneWidth}px` }}>
      <div className={styles.header}>
        <ActionsPaneHeader />
        <Divider />
      </div>
      <div className={styles.content}>
        <ActionsPaneContent />
      </div>
      <div className={styles.footer}>
        <LibraryEntryPoint />
      </div>
    </div>
  );
};
```

### Step 6: Update ActionsPaneHeader Component

```jsx
// src/components/ActionsPane/ActionsPaneHeader.tsx
import React from 'react';
import {
  makeStyles,
  TabList,
  Tab,
  Input,
  tokens,
} from '@fluentui/react-components';
import { Search24Regular } from '@fluentui/react-icons';
import { useUIState, uiActions } from '../../contexts/UIStateContext';

const useStyles = makeStyles({
  // Styles...
});

export const ActionsPaneHeader: React.FC = () => {
  const styles = useStyles();
  const { state, dispatch } = useUIState();
  
  const handleTabChange = (tab: string) => {
    dispatch(uiActions.setActiveTab(tab));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(uiActions.setSearchQuery(e.target.value));
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <Input
          contentBefore={<Search24Regular />}
          placeholder="Search actions..."
          value={state.searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
      <TabList 
        selectedValue={state.activeTab}
        onTabSelect={(_, data) => handleTabChange(data.value as string)}
        className={styles.tabList}
      >
        <Tab value="All">All</Tab>
        <Tab value="Built-in">Built-in</Tab>
        <Tab value="Connectors">Connectors</Tab>
        <Tab value="Favorites">Favorites</Tab>
      </TabList>
    </div>
  );
};
```

### Step 7: Update ActionsPaneContent Component

```jsx
// src/components/ActionsPane/ActionsPaneContent.tsx
import React from 'react';
import {
  makeStyles,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Text,
  Button,
  tokens,
} from '@fluentui/react-components';
import { ActionItem } from './ActionItem';
import { useUIState, uiActions } from '../../contexts/UIStateContext';
import { useActionGroups } from '../../hooks/useActionGroups';

const useStyles = makeStyles({
  // Styles...
});

export const ActionsPaneContent: React.FC = () => {
  const styles = useStyles();
  const { state, dispatch } = useUIState();
  const { groups, isLoading } = useActionGroups(state.activeTab, state.searchQuery);
  
  if (isLoading) {
    return <div className={styles.loadingState}>Loading...</div>;
  }
  
  if (groups.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Text>No actions found. Try adjusting your search or filters.</Text>
      </div>
    );
  }
  
  const handleGroupExpansion = (groupId: string) => {
    dispatch(uiActions.toggleGroupExpansion(groupId));
  };
  
  const handleSubGroupExpansion = (subGroupId: string) => {
    dispatch(uiActions.toggleSubGroupExpansion(subGroupId));
  };
  
  return (
    <div className={styles.container}>
      <Accordion 
        collapsible 
        multiple 
        defaultOpenItems={state.expandedGroups}
        onToggle={(event, data) => handleGroupExpansion(data.value as string)}
      >
        {groups.map(group => (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionHeader>
              <div className={styles.groupHeader}>
                <Text weight="semibold">{group.title}</Text>
                <Button
                  className={styles.seeAllLink}
                  appearance="transparent"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    // This would open the Library Modal filtered to this group
                    dispatch(uiActions.toggleLibraryModal(true));
                  }}
                >
                  See all
                </Button>
              </div>
            </AccordionHeader>
            <AccordionPanel>
              {/* Render items */}
              {group.items.map(item => (
                <ActionItem key={item.id} item={item} />
              ))}
              
              {/* Render subgroups if they exist */}
              {group.subGroups && group.subGroups.length > 0 && (
                <Accordion 
                  collapsible 
                  multiple
                  defaultOpenItems={state.expandedSubGroups}
                  onToggle={(event, data) => handleSubGroupExpansion(data.value as string)}
                >
                  {group.subGroups.map(subGroup => (
                    <AccordionItem key={subGroup.id} value={subGroup.id}>
                      <AccordionHeader>
                        <div className={styles.groupHeader}>
                          <Text>{subGroup.title}</Text>
                          <Text size={200} weight="regular">
                            {subGroup.items.length} items
                          </Text>
                        </div>
                      </AccordionHeader>
                      <AccordionPanel>
                        {subGroup.items.map(item => (
                          <ActionItem key={item.id} item={item} />
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
```

### Step 8: Update ActionItem Component

```jsx
// src/components/ActionsPane/ActionItem.tsx
import React from 'react';
import {
  makeStyles,
  Text,
  Button,
  Tooltip,
  tokens,
} from '@fluentui/react-components';
import { Star24Regular, Star24Filled } from '@fluentui/react-icons';
import { ActionItemType } from '../../models/types';
import { useUserPreferences } from '../../contexts/UserPreferencesContext';

const useStyles = makeStyles({
  // Styles...
});

interface ActionItemProps {
  item: ActionItemType;
}

export const ActionItem: React.FC<ActionItemProps> = ({ item }) => {
  const styles = useStyles();
  const { preferences, toggleFavorite, addRecentlyUsedAction } = useUserPreferences();
  
  const isFavorite = preferences.favoriteActions.includes(item.id);
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };
  
  const handleActionClick = () => {
    addRecentlyUsedAction(item.id);
    console.log(`Clicked on ${item.title}`);
  };
  
  return (
    <Tooltip content={item.description || `No description available for ${item.title}.`} relationship="description" withArrow>
      <div className={styles.container} onClick={handleActionClick}>
        <span className={styles.icon}>{item.icon}</span>
        <Text className={styles.title}>{item.title}</Text>
        <Button
          className={isFavorite ? styles.visibleFavorite : styles.favoriteButton}
          icon={isFavorite ? <Star24Filled /> : <Star24Regular />}
          appearance="transparent"
          size="small"
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        />
      </div>
    </Tooltip>
  );
};
```

## Phase 3: Advanced Implementation (Future)

For future implementation with Redux Toolkit and React Query, refer to the state management plan document.

## Migration Strategy

To migrate from the current implementation to the enhanced implementation:

1. Create the context providers and custom hooks
2. Update the App component to wrap the application with providers
3. Update components one by one to use contexts instead of props
4. Test thoroughly after each component update
5. Remove unused props and state from components

This incremental approach allows for a smooth transition without disrupting the application's functionality.
