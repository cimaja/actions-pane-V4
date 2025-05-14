# Actions Pane V4 Data Service

This document provides a detailed overview of the data service implementation for the Actions Pane V4 prototype. It describes how the data service interacts with the mock data, how it provides data to the components, and how it can be extended.

## Overview

The data service is a central component that provides a unified interface for accessing all data in the application. It encapsulates the logic for retrieving, filtering, and transforming data, hiding the implementation details from the components that consume the data.

In the Actions Pane V4 prototype, the data service is implemented as a singleton class that loads mock data from the modules and connectors directories. It provides methods for retrieving data based on various criteria, such as tab selection, search queries, and filtering options.

## Data Service Implementation

The data service is implemented in `src/data/dataService.ts` as a singleton class:

```typescript
// src/data/dataService.ts
import { modules, allActions, getModuleById, getActionById } from './mock/modules';
import { connectors, allConnectorActions, getConnectorById, getConnectorActionById } from './mock/connectors';
import { ActionGroup, ActionItemType, LibraryItemType, TabType, LibraryCategoryType, DetailedActionItem } from '../models/types';

export class DataService {
  private _modules: ActionGroup[] = modules;
  private _actions: ActionItemType[] = allActions;
  private _connectors: LibraryItemType[] = connectors;
  private _connectorActions: DetailedActionItem[] = allConnectorActions;
  private _favoriteActions: string[] = []; // IDs of favorite actions
  
  constructor() {
    // Initialize favorite actions (could be loaded from localStorage in a real app)
    this._favoriteActions = ['ui-automation-click', 'date-time-get-current-date'];
  }
  
  // Methods for accessing modules
  
  getAllModules(): ActionGroup[] {
    return this._modules;
  }
  
  getModuleById(id: string): ActionGroup | undefined {
    return getModuleById(id);
  }
  
  getModulesByCategory(category: string): ActionGroup[] {
    return this._modules.filter(module => 
      module.tags && module.tags.includes(category)
    );
  }
  
  searchModules(query: string): ActionGroup[] {
    const lowerQuery = query.toLowerCase();
    return this._modules.filter(module => 
      module.title.toLowerCase().includes(lowerQuery) || 
      (module.tags && module.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }
  
  // Methods for accessing actions
  
  getActionsByModuleId(moduleId: string): ActionItemType[] {
    return this._actions.filter(action => action.moduleId === moduleId);
  }
  
  getActionById(id: string): ActionItemType | undefined {
    return getActionById(id) || getConnectorActionById(id);
  }
  
  searchActions(query: string): ActionItemType[] {
    const lowerQuery = query.toLowerCase();
    return [
      ...this._actions.filter(action => 
        action.title.toLowerCase().includes(lowerQuery) || 
        (action.description && action.description.toLowerCase().includes(lowerQuery))
      ),
      ...this._connectorActions.filter(action => 
        action.title.toLowerCase().includes(lowerQuery) || 
        (action.description && action.description.toLowerCase().includes(lowerQuery))
      )
    ];
  }
  
  getFavoriteActions(): ActionItemType[] {
    return [
      ...this._actions.filter(action => this._favoriteActions.includes(action.id)),
      ...this._connectorActions.filter(action => this._favoriteActions.includes(action.id))
    ];
  }
  
  toggleFavoriteAction(id: string): boolean {
    const isFavorite = this._favoriteActions.includes(id);
    if (isFavorite) {
      this._favoriteActions = this._favoriteActions.filter(actionId => actionId !== id);
      return false;
    } else {
      this._favoriteActions.push(id);
      return true;
    }
  }
  
  // Methods for accessing connectors
  
  getAllConnectors(): LibraryItemType[] {
    return this._connectors;
  }
  
  getInstalledConnectors(): LibraryItemType[] {
    return this._connectors.filter(connector => connector.isInstalled);
  }
  
  getAvailableConnectors(): LibraryItemType[] {
    return this._connectors.filter(connector => !connector.isInstalled);
  }
  
  getConnectorById(id: string): LibraryItemType | undefined {
    return getConnectorById(id);
  }
  
  searchConnectors(query: string): LibraryItemType[] {
    const lowerQuery = query.toLowerCase();
    return this._connectors.filter(connector => 
      connector.title.toLowerCase().includes(lowerQuery) || 
      (connector.description && connector.description.toLowerCase().includes(lowerQuery)) ||
      (connector.author && connector.author.toLowerCase().includes(lowerQuery))
    );
  }
  
  // Methods for accessing library items
  
  getLibraryItemsByCategory(category: LibraryCategoryType): LibraryItemType[] {
    switch (category) {
      case 'Built-in Actions':
        return this._modules.map(module => ({
          id: module.id,
          title: module.title,
          type: 'built-in',
          icon: module.icon,
          description: `Built-in actions for ${module.title}`,
          isInstalled: true,
          itemCount: module.items.length,
          actions: module.items
        }));
      case 'Connectors':
        return this._connectors;
      case 'Custom Actions':
        // In a real app, this would return custom actions
        return [];
      case 'UI Collections':
        // In a real app, this would return UI collections
        return [];
      case 'Templates':
        // In a real app, this would return templates
        return [];
      default:
        return [];
    }
  }
  
  getInstalledLibraryItemsByCategory(category: LibraryCategoryType): LibraryItemType[] {
    return this.getLibraryItemsByCategory(category).filter(item => item.isInstalled);
  }
  
  searchLibraryItems(query: string): LibraryItemType[] {
    const lowerQuery = query.toLowerCase();
    return [
      ...this.getLibraryItemsByCategory('Built-in Actions').filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        (item.description && item.description.toLowerCase().includes(lowerQuery))
      ),
      ...this.getLibraryItemsByCategory('Connectors').filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
        (item.author && item.author.toLowerCase().includes(lowerQuery))
      )
      // Add other categories as needed
    ];
  }
  
  // Methods for the Actions Pane
  
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
    } else if (activeTab === 'Favorites') {
      // Group favorite actions by module
      const favoriteActions = this.getFavoriteActions();
      const moduleIds = [...new Set(favoriteActions.map(action => action.moduleId))];
      
      modules = moduleIds.map(moduleId => {
        const module = this.getModuleById(moduleId);
        const connector = this.getConnectorById(moduleId);
        
        return {
          id: moduleId || '',
          title: module?.title || connector?.title || 'Unknown',
          icon: module?.icon || connector?.icon,
          items: favoriteActions.filter(action => action.moduleId === moduleId),
          tags: module?.tags || (connector ? ['connector'] : [])
        };
      });
    }
    
    // Apply search filter if query exists
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      
      // Filter modules and their items
      modules = modules.map(module => {
        const filteredItems = module.items.filter(item => 
          item.title.toLowerCase().includes(lowerQuery) || 
          (item.description && item.description.toLowerCase().includes(lowerQuery))
        );
        
        // Filter subgroups if they exist
        const filteredSubGroups = module.subGroups?.map(subGroup => {
          const filteredSubItems = subGroup.items.filter(item => 
            item.title.toLowerCase().includes(lowerQuery) || 
            (item.description && item.description.toLowerCase().includes(lowerQuery))
          );
          
          return {
            ...subGroup,
            items: filteredSubItems
          };
        }).filter(subGroup => subGroup.items.length > 0);
        
        return {
          ...module,
          items: filteredItems,
          subGroups: filteredSubGroups
        };
      }).filter(module => module.items.length > 0 || (module.subGroups && module.subGroups.length > 0));
    }
    
    return modules;
  }
  
  // Helper methods
  
  private getDisplayModules(): ActionGroup[] {
    // Return modules that should be displayed in the Actions Pane
    return this._modules;
  }
}

// Create and export a singleton instance
export const dataService = new DataService();
```

## Data Flow

The data service interacts with the mock data and provides data to the components through a well-defined interface. The following diagram illustrates the data flow:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Mock Data     │────►│  Data Service   │────►│   Components    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

1. **Mock Data to Data Service**
   - The data service loads mock data from the modules and connectors directories
   - The mock data is stored in private properties of the data service
   - The data service provides methods for accessing the mock data

2. **Data Service to Components**
   - Components call methods on the data service to retrieve data
   - The data service filters and transforms the data based on the method parameters
   - The data service returns the filtered and transformed data to the components

## Usage Examples

### Getting Actions Pane Content

The `getActionsPaneContent` method is used by the `ActionsPaneContent` component to get the content to display based on the active tab and search query:

```jsx
// src/components/ActionsPane/ActionsPaneContent.tsx
import React from 'react';
import { dataService } from '../../data/dataService';
import { ActionGroup } from '../../models/types';

interface ActionsPaneContentProps {
  activeTab: string;
  searchQuery: string;
}

export const ActionsPaneContent: React.FC<ActionsPaneContentProps> = ({ 
  activeTab, 
  searchQuery 
}) => {
  const [groups, setGroups] = React.useState<ActionGroup[]>([]);
  
  React.useEffect(() => {
    // Get content from the data service
    const content = dataService.getActionsPaneContent(activeTab, searchQuery);
    setGroups(content);
  }, [activeTab, searchQuery]);
  
  // Render the content
  // ...
};
```

### Searching for Actions

The `searchActions` method is used by the search functionality to find actions that match a query:

```jsx
// src/components/Search/SearchResults.tsx
import React from 'react';
import { dataService } from '../../data/dataService';
import { ActionItemType } from '../../models/types';

interface SearchResultsProps {
  query: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [results, setResults] = React.useState<ActionItemType[]>([]);
  
  React.useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    
    // Search for actions that match the query
    const searchResults = dataService.searchActions(query);
    setResults(searchResults);
  }, [query]);
  
  // Render the search results
  // ...
};
```

### Managing Favorite Actions

The `toggleFavoriteAction` method is used to add or remove actions from the favorites list:

```jsx
// src/components/ActionsPane/ActionItem.tsx
import React from 'react';
import { dataService } from '../../data/dataService';
import { ActionItemType } from '../../models/types';

interface ActionItemProps {
  item: ActionItemType;
}

export const ActionItem: React.FC<ActionItemProps> = ({ item }) => {
  const [isFavorite, setIsFavorite] = React.useState(item.isFavorite || false);
  
  const handleToggleFavorite = () => {
    // Toggle the favorite status
    const newIsFavorite = dataService.toggleFavoriteAction(item.id);
    setIsFavorite(newIsFavorite);
  };
  
  // Render the action item
  // ...
};
```

## Enhanced Implementation with Context API

In the enhanced implementation of the state management plan, the data service can be integrated with the React Context API to provide a more declarative and reactive approach to data access:

```jsx
// src/contexts/DataContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataService } from '../data/dataService';
import { ActionGroup, ActionItemType, LibraryItemType, TabType } from '../models/types';

// Define the context type
type DataContextType = {
  modules: ActionGroup[];
  actions: ActionItemType[];
  connectors: LibraryItemType[];
  favoriteActions: ActionItemType[];
  getActionsPaneContent: (activeTab: TabType, searchQuery: string) => ActionGroup[];
  searchActions: (query: string) => ActionItemType[];
  toggleFavoriteAction: (id: string) => boolean;
  // Add other methods as needed
};

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create the provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<ActionGroup[]>([]);
  const [actions, setActions] = useState<ActionItemType[]>([]);
  const [connectors, setConnectors] = useState<LibraryItemType[]>([]);
  const [favoriteActions, setFavoriteActions] = useState<ActionItemType[]>([]);
  
  // Load data from the data service
  useEffect(() => {
    setModules(dataService.getAllModules());
    setActions(dataService.getAllActions());
    setConnectors(dataService.getAllConnectors());
    setFavoriteActions(dataService.getFavoriteActions());
  }, []);
  
  // Define the context value
  const value: DataContextType = {
    modules,
    actions,
    connectors,
    favoriteActions,
    getActionsPaneContent: (activeTab, searchQuery) => 
      dataService.getActionsPaneContent(activeTab, searchQuery),
    searchActions: (query) => 
      dataService.searchActions(query),
    toggleFavoriteAction: (id) => {
      const newIsFavorite = dataService.toggleFavoriteAction(id);
      setFavoriteActions(dataService.getFavoriteActions());
      return newIsFavorite;
    }
    // Add other methods as needed
  };
  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook for using the context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
```

Components can then use the `useData` hook to access the data:

```jsx
// src/components/ActionsPane/ActionsPaneContent.tsx
import React from 'react';
import { useData } from '../../contexts/DataContext';
import { useUIState } from '../../contexts/UIStateContext';

export const ActionsPaneContent: React.FC = () => {
  const { getActionsPaneContent } = useData();
  const { state } = useUIState();
  const { activeTab, searchQuery } = state;
  
  const groups = getActionsPaneContent(activeTab, searchQuery);
  
  // Render the content
  // ...
};
```

## Future Enhancements

While the current data service implementation is sufficient for the prototype, the following enhancements could be considered for future development:

1. **Caching**
   - Implement caching to improve performance
   - Cache frequently accessed data
   - Implement cache invalidation strategies

2. **Pagination**
   - Implement pagination for large data sets
   - Add support for lazy loading
   - Add support for infinite scrolling

3. **Sorting and Filtering**
   - Add more advanced sorting and filtering options
   - Add support for multiple filters
   - Add support for custom sorting functions

4. **Data Persistence**
   - Implement data persistence for user preferences
   - Add support for saving and loading data
   - Add support for synchronization with a backend

5. **Real-time Updates**
   - Implement real-time updates for data changes
   - Add support for WebSockets or Server-Sent Events
   - Add support for optimistic updates

6. **Error Handling**
   - Implement more robust error handling
   - Add support for retry logic
   - Add support for fallback data

## Conclusion

The data service for the Actions Pane V4 prototype provides a flexible and extensible foundation for accessing and manipulating data in the application. The modular structure and well-defined interface make it easy to extend the service to support new features and functionality. By following the patterns and best practices outlined in this document, you can easily enhance the data service to meet the evolving needs of the application.
