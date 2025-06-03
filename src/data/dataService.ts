import { ActionGroup, LibraryItemType, TabType, LibraryCategoryType, DetailedActionItem, ModuleCategory } from '../models/types';
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
    this._modules = Object.values(moduleFiles).map(moduleFile => ({
      ...moduleFile.module,
      actions: moduleFile.getAllActions ? moduleFile.getAllActions().map((action: ActionItemType) => ({
        ...action,
        moduleId: moduleFile.module.id
      })) : []
    }));
    
    // Initialize connectors and their actions
    this._connectors = Object.values(connectorFiles).map(connectorFile => ({
      ...connectorFile.connector,
      actions: connectorFile.actions || []
    }));
    
    // Initialize actions from modules (for backward compatibility)
    this._moduleActions = Object.values(moduleFiles).flatMap(moduleFile => 
      moduleFile.getAllActions ? moduleFile.getAllActions().map((action: ActionItemType) => ({
        ...action,
        moduleId: moduleFile.module.id
      })) : []
    );
    
    // Initialize actions from connectors (for backward compatibility)
    this._connectorActions = Object.values(connectorFiles).flatMap(connectorFile => 
      connectorFile.actions || []
    );
  }

  // MODULES AND ACTIONS
  
  /**
   * Get all modules that should be displayed in the Actions Pane
   * A module should be displayed if it has either:
   * 1. A defined category, or
   * 2. At least one tag
   */
  getDisplayModules(): ActionGroup[] {
    return this._modules.filter(module => 
      (module.category !== undefined) || 
      (module.tags && module.tags.length > 0)
    );
  }
  
  /**
   * Get all modules available in the library
   */
  getAllModules(): ActionGroup[] {
    return this._modules;
  }
  
  /**
   * Get modules by category
   * @param category The category to filter by (must be a valid ModuleCategory)
   */
  getModulesByCategory(category: ModuleCategory): ActionGroup[] {
    return this._modules.filter(module => module.category === category);
  }
  
  /**
   * Get a module by its ID
   */
  getModuleById(id: string): ActionGroup | undefined {
    return this._modules.find(module => module.id === id);
  }
  
  /**
   * Search modules by query
   * @param query The search query
   * @param installedOnly Whether to only include installed modules
   */
  searchModules(query: string, installedOnly: boolean = true): ActionGroup[] {
    const normalizedQuery = query.toLowerCase();
    return this._modules.filter(module => 
      module.title.toLowerCase().includes(normalizedQuery) &&
      (!installedOnly || module.isInstalled !== false)
    );
  }

  /**
   * Search for uninstalled modules by query
   * @param query The search query
   */
  searchUninstalledModules(query: string): ActionGroup[] {
    const normalizedQuery = query.toLowerCase();
    return this._modules.filter(module => 
      module.title.toLowerCase().includes(normalizedQuery) &&
      module.isInstalled === false
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
   * @param query The search query
   * @param installedOnly Whether to only include actions from installed modules
   */
  searchActions(query: string, installedOnly: boolean = true): DetailedActionItem[] {
    const normalizedQuery = query.toLowerCase();
    return [...this._moduleActions, ...this._connectorActions].filter(action => {
      const matchesQuery = action.title.toLowerCase().includes(normalizedQuery) || 
        (action.description && action.description.toLowerCase().includes(normalizedQuery));
      
      if (!matchesQuery) return false;
      
      if (installedOnly) {
        // Check if the action's module is installed
        const module = this.getModuleById(action.moduleId);
        const connector = this.getConnectorById(action.moduleId);
        return (module && module.isInstalled !== false) || (connector && connector.isInstalled);
      }
      
      return true;
    });
  }

  /**
   * Search for uninstalled actions by query
   * @param query The search query
   */
  searchUninstalledActions(query: string): DetailedActionItem[] {
    const normalizedQuery = query.toLowerCase();
    return [...this._moduleActions, ...this._connectorActions].filter(action => {
      const matchesQuery = action.title.toLowerCase().includes(normalizedQuery) || 
        (action.description && action.description.toLowerCase().includes(normalizedQuery));
      
      if (!matchesQuery) return false;
      
      // Check if the action's module is not installed
      const module = this.getModuleById(action.moduleId);
      const connector = this.getConnectorById(action.moduleId);
      return (module && module.isInstalled === false) || (connector && !connector.isInstalled);
    });
  }
  
  /**
   * Get favorite actions based on user selections
   */
  getFavoriteActions(favoriteItems: Record<string, boolean> = {}): DetailedActionItem[] {
    // Get all module actions (including those in subgroups)
    const allModuleActions = this._modules.flatMap(module => {
      const moduleActions = module.items.map(item => ({
        ...item,
        moduleId: module.id
      }));
      
      // Get actions from subgroups
      const subGroupActions = (module.subGroups || []).flatMap(subGroup => 
        subGroup.items.map(item => ({
          ...item,
          moduleId: module.id,
          subGroupId: subGroup.id
        }))
      );
      
      return [...moduleActions, ...subGroupActions];
    });
    
    // Combine with connector actions
    const allActions = [...allModuleActions, ...this._connectorActions];
    
    // Filter favorites
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
          category: module.category, // Include the module's category
          author: module.author || 'Microsoft', // Include the module's author with fallback
          description: '',
          isInstalled: module.isInstalled === true, // Respect the module's isInstalled flag, ensuring it's a boolean
          actions: module.items
        }));
      case 'Connectors':
        return this.getAllConnectors().map(connector => ({
          ...connector,
          actions: this._connectorActions.filter(action => action.moduleId === connector.id)
        }));
      case 'Custom actions':
        return []; // To be implemented
      case 'UI collections':
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
  getActionsPaneContent(activeTab: TabType, searchQuery: string, favoriteItems: Record<string, boolean> = {}): { modules: ActionGroup[], uninstalledCount?: number } {
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
      const modules = Object.entries(groupedFavorites).map(([moduleId, items]) => {
        // Look for module or connector to get proper title and icon
        const module = this.getModuleById(moduleId);
        const connector = this.getConnectorById(moduleId);
        
        // Use title from module or connector, with a friendly fallback if not found
        const title = module?.title || connector?.title || `Action Group (${moduleId})`;
        
        // Use icon and iconColor from module or connector
        const icon = module?.icon || connector?.icon;
        const iconColor = module?.iconColor || connector?.iconColor;
        
        // For Favorites tab, ensure we have a flat structure with no subGroups
        const actionGroup: ActionGroup = {
          id: moduleId,
          title,
          icon,
          iconColor,
          items: items,
          tags: module?.tags || connector?.tags || [],
          // Explicitly set subGroups to undefined to prevent accordion rendering
          subGroups: undefined
        };

        // Only add category if it's defined in the module
        if (module?.category) {
          actionGroup.category = module.category;
        }
        
        return actionGroup;
      });
      
      return { modules };
    }
    
    // Filter modules based on tab
    let modules: ActionGroup[] = [];
    if (activeTab === 'All') {
      // Include both modules and connectors in the All tab
      const displayModules = this.getDisplayModules().filter(module => 
        !module.tags?.includes('connector')
      );
      
      // Get connector modules in the 'Connectors' category
      const connectorModules = this.getInstalledConnectors().map(connector => {
        const connectorGroup: ActionGroup = {
          id: connector.id,
          title: connector.title,
          icon: connector.icon,
          items: this._connectorActions.filter(action => action.moduleId === connector.id),
          tags: ['connector']
        };

        // Set category for connectors to 'Connectors'
        connectorGroup.category = 'Connectors';
        
        return connectorGroup;
      });
      
      // Get integration modules (modules with category 'Integration')
      const integrationModules = displayModules.filter(module => module.category === 'Integration');
      
      // Get other modules (excluding integrations)
      const otherModules = displayModules.filter(module => module.category !== 'Integration');
      
      // Combine all modules with connectors at the end
      modules = [...otherModules, ...integrationModules, ...connectorModules];
    } else if (activeTab === 'Built-in') {
      modules = this.getDisplayModules().filter(module => 
        !module.tags?.includes('connector')
      );
    } else if (activeTab === 'Connectors') {
      // Display connectors grouped by their categories
      const connectorItems = this.getInstalledConnectors().map(connector => {
        const connectorGroup: ActionGroup = {
          id: connector.id,
          title: connector.title,
          icon: connector.icon,
          items: this._connectorActions.filter(action => action.moduleId === connector.id),
          tags: connector.tags || [],
          // Use the connector's category if available, otherwise use 'Connectors' as default
          category: (connector.category as ModuleCategory) || 'Connectors'
        };
        
        return connectorGroup;
      });
      
      // If sortOrder is 'category', we'll let the ActionsPaneContent component handle the grouping
      // Otherwise, just return the connector items as is
      modules = connectorItems;
    }
    
    // Apply search filter if query exists
    if (searchQuery) {
      const normalizedQuery = searchQuery.toLowerCase();
      modules = modules.map(module => {
        // Filter items within each module
        const filteredItems = module.items.filter(item => 
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.description?.toLowerCase().includes(normalizedQuery) ||
          item.tags?.some((tag: string) => tag.toLowerCase().includes(normalizedQuery))
        );
        
        // Filter subgroups if they exist
        const filteredSubGroups = module.subGroups?.map(subGroup => {
          const filteredSubItems = subGroup.items.filter(item => 
            item.title.toLowerCase().includes(normalizedQuery) ||
            item.description?.toLowerCase().includes(normalizedQuery) ||
            item.tags?.some((tag: string) => tag.toLowerCase().includes(normalizedQuery))
          );
          return { ...subGroup, items: filteredSubItems };
        }).filter(subGroup => subGroup.items.length > 0);
        
        // Only include the module if it has matching items or subgroups
        const hasMatchingItems = filteredItems.length > 0;
        const hasMatchingSubGroups = filteredSubGroups && filteredSubGroups.length > 0;
        
        if (!hasMatchingItems && !hasMatchingSubGroups) {
          return null;
        }
        
        return { 
          ...module, 
          items: filteredItems,
          subGroups: filteredSubGroups
        };
      }).filter(Boolean) as ActionGroup[]; // Filter out null values and cast back to ActionGroup[]
    }
    
    // If there's a search query, count uninstalled items that match
    let uninstalledCount;
    if (searchQuery) {
      const uninstalledModules = this.searchUninstalledModules(searchQuery);
      const uninstalledActions = this.searchUninstalledActions(searchQuery);
      
      // Count unique modules/connectors that have matching uninstalled actions
      const uniqueModuleIds = new Set<string>();
      uninstalledActions.forEach(action => uniqueModuleIds.add(action.moduleId));
      uninstalledModules.forEach(module => uniqueModuleIds.add(module.id));
      
      uninstalledCount = uniqueModuleIds.size;
    }
    
    return { modules, uninstalledCount };
  }
}

// Export a singleton instance
export const dataService = new DataService();