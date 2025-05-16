import { ActionGroup, LibraryItemType, TabType, LibraryCategoryType, DetailedActionItem } from '../models/types';
import * as moduleFiles from './mock/modules';
import { ActionItemType } from '../models/types';
import * as connectorFiles from './mock/connectors';

/**
 * DataService provides a centralized access point for all mock data in the application.
 * It includes methods for retrieving, filtering, and searching data across all categories.
 */
export class DataService {
  // Cache for modules and connectors
  private _modules: ActionGroup[] = [];
  private _connectors: LibraryItemType[] = [];
  private _moduleActions: DetailedActionItem[] = [];
  private _connectorActions: DetailedActionItem[] = [];

  constructor() {
    this.initializeData();
  }

  /**
   * Initialize data from module and connector files
   */
  private initializeData(): void {
    // Initialize modules
    this._modules = Object.values(moduleFiles).map(moduleFile => moduleFile.module);
    
    // Initialize connectors
    this._connectors = Object.values(connectorFiles).map(connectorFile => connectorFile.connector);
    
    // Initialize actions from modules
    this._moduleActions = Object.values(moduleFiles).flatMap(moduleFile => 
      moduleFile.getAllActions().map((action: ActionItemType) => ({
        ...action,
        moduleId: moduleFile.module.id
      }))
    );
    
    // Initialize actions from connectors
    this._connectorActions = Object.values(connectorFiles).flatMap(connectorFile => 
      connectorFile.actions
    );
  }

  // MODULES AND ACTIONS
  
  /**
   * Get all modules that should be displayed in the Actions Pane
   */
  getDisplayModules(): ActionGroup[] {
    return this._modules.filter(module => module.tags && module.tags.length > 0);
  }
  
  /**
   * Get all modules available in the library
   */
  getAllModules(): ActionGroup[] {
    return this._modules;
  }
  
  /**
   * Get modules by category tag
   */
  getModulesByCategory(category: string): ActionGroup[] {
    return this._modules.filter(module => 
      module.tags && module.tags.includes(category)
    );
  }
  
  /**
   * Get a module by its ID
   */
  getModuleById(id: string): ActionGroup | undefined {
    return this._modules.find(module => module.id === id);
  }
  
  /**
   * Search modules by query
   */
  searchModules(query: string): ActionGroup[] {
    const normalizedQuery = query.toLowerCase();
    return this._modules.filter(module => 
      module.title.toLowerCase().includes(normalizedQuery)
    );
  }
  
  /**
   * Get all actions for a specific module
   */
  getActionsByModuleId(moduleId: string): DetailedActionItem[] {
    return this._moduleActions.filter(action => action.moduleId === moduleId);
  }
  
  /**
   * Get an action by its ID
   */
  getActionById(id: string): DetailedActionItem | undefined {
    return [...this._moduleActions, ...this._connectorActions].find(action => action.id === id);
  }
  
  /**
   * Search actions by query
   */
  searchActions(query: string): DetailedActionItem[] {
    const normalizedQuery = query.toLowerCase();
    return [...this._moduleActions, ...this._connectorActions].filter(action => 
      action.title.toLowerCase().includes(normalizedQuery) || 
      (action.description && action.description.toLowerCase().includes(normalizedQuery))
    );
  }
  
  /**
   * Get favorite actions based on user selections
   */
  getFavoriteActions(favoriteItems: Record<string, boolean> = {}): DetailedActionItem[] {
    // Return user-selected favorites only
    const allActions = [...this._moduleActions, ...this._connectorActions];
    return allActions.filter(action => favoriteItems[action.id]);
  }
  
  // CONNECTORS
  
  /**
   * Get all connectors
   */
  getAllConnectors(): LibraryItemType[] {
    return this._connectors;
  }
  
  /**
   * Get installed connectors
   */
  getInstalledConnectors(): LibraryItemType[] {
    return this._connectors.filter(connector => connector.isInstalled);
  }
  
  /**
   * Get available connectors (not installed)
   */
  getAvailableConnectors(): LibraryItemType[] {
    return this._connectors.filter(connector => !connector.isInstalled);
  }
  
  /**
   * Get a connector by its ID
   */
  getConnectorById(id: string): LibraryItemType | undefined {
    return this._connectors.find(connector => connector.id === id);
  }
  
  /**
   * Search connectors by query
   */
  searchConnectors(query: string): LibraryItemType[] {
    const normalizedQuery = query.toLowerCase();
    return this._connectors.filter(connector => 
      connector.title.toLowerCase().includes(normalizedQuery) || 
      (connector.description && connector.description.toLowerCase().includes(normalizedQuery))
    );
  }
  
  // LIBRARY ITEMS
  
  /**
   * Get all library items by category
   */
  getLibraryItemsByCategory(category: LibraryCategoryType): LibraryItemType[] {
    switch (category) {
      case 'Built-in':
        return this.getAllModules().map(module => ({
          id: module.id,
          title: module.title,
          type: 'built-in',
          icon: module.icon || '📦',
          iconColor: module.iconColor,
          tags: module.tags,
          description: `Contains ${module.items.length} actions`,
          isInstalled: module.isInstalled === true, // Respect the module's isInstalled flag, ensuring it's a boolean
          actions: module.items
        }));
      case 'Connectors':
        return this.getAllConnectors();
      case 'Custom Actions':
        return []; // To be implemented
      case 'UI Collections':
        return []; // To be implemented
      case 'Templates':
        return []; // To be implemented
      default:
        return [];
    }
  }
  
  /**
   * Get installed library items by category
   */
  getInstalledLibraryItemsByCategory(category: LibraryCategoryType): LibraryItemType[] {
    const allItems = this.getLibraryItemsByCategory(category);
    return allItems.filter(item => item.isInstalled);
  }
  
  /**
   * Search library items across all categories
   */
  searchLibraryItems(query: string): LibraryItemType[] {
    return [
      ...this.searchConnectors(query),
      // Add other searches when implemented
    ];
  }
  
  // ACTIONS PANE CONTENT
  
  /**
   * Get content for the Actions Pane based on active tab, search query, and favorites
   */
  getActionsPaneContent(activeTab: TabType, searchQuery: string, favoriteItems: Record<string, boolean> = {}): ActionGroup[] {
    if (activeTab === 'Favorites') {
      const favoriteActions = this.getFavoriteActions(favoriteItems);
      
      // Group favorite actions by their module
      const groupedFavorites: { [key: string]: DetailedActionItem[] } = {};
      favoriteActions.forEach(action => {
        if (!groupedFavorites[action.moduleId]) {
          groupedFavorites[action.moduleId] = [];
        }
        groupedFavorites[action.moduleId].push(action);
      });
      
      // Create ActionGroup objects for each module with favorites
      return Object.entries(groupedFavorites).map(([moduleId, items]) => {
        // Look for module or connector to get proper title
        const module = this.getModuleById(moduleId);
        const connector = this.getConnectorById(moduleId);
        
        // Use title from module or connector, with a friendly fallback if not found
        const title = module?.title || connector?.title || `Action Group (${moduleId})`;
        
        return {
          id: moduleId,
          title,
          items: items
        };
      });
    }
    
    // Filter modules based on tab
    let modules: ActionGroup[] = [];
    if (activeTab === 'All') {
      // Include both modules and connectors in the All tab
      const displayModules = this.getDisplayModules().filter(module => 
        !module.tags?.includes('connector')
      );
      
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
      
      // Add connectors directly to the module list
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
      const normalizedQuery = searchQuery.toLowerCase();
      modules = modules.map(module => {
        // Filter items within each module
        const filteredItems = module.items.filter(item => 
          item.title.toLowerCase().includes(normalizedQuery)
        );
        
        // Filter subgroups if they exist
        const filteredSubGroups = module.subGroups?.map(subGroup => {
          const filteredSubItems = subGroup.items.filter(item => 
            item.title.toLowerCase().includes(normalizedQuery)
          );
          return { ...subGroup, items: filteredSubItems };
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
}

// Export a singleton instance
export const dataService = new DataService();