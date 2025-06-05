import { ActionGroup, LibraryItemType, TabType, LibraryCategoryType, DetailedActionItem, ModuleCategory, CustomActionItemType } from '../models/types';
import * as moduleFiles from './mock/modules';
import { ActionItemType } from '../models/types';
import * as connectorFiles from './mock/connectors';
import * as customActionFiles from './mock/customActions';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

/**
 * DataService provides a centralized access point for all mock data in the application.
 * It includes methods for retrieving, filtering, and searching data across all categories.
 */
export class DataService {
  private listeners: Array<() => void> = [];
  // Cache for modules and connectors
  private _modules: ActionGroup[] = [];
  private _connectors: LibraryItemType[] = [];
  private _moduleActions: DetailedActionItem[] = [];
  private _connectorActions: DetailedActionItem[] = [];
  private _customActions: CustomActionItemType[] = [];

  // Storage keys for installation state
  private readonly INSTALLED_MODULES_KEY = 'installed_modules';
  private readonly INSTALLED_CONNECTORS_KEY = 'installed_connectors';
  private readonly INSTALLED_CUSTOM_ACTIONS_KEY = 'installed_custom_actions';

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => { // Return an unsubscribe function
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener();
      } catch (error) {
        console.error("Error in DataService listener:", error);
      }
    });
  }

  constructor() {
    this.initializeData();
    this.loadInstallationState(); // Load persisted state
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

    // Initialize custom actions
    this._customActions = Object.values(customActionFiles) as CustomActionItemType[];
  }

  /**
   * Load installation state from localStorage and update module and connector objects.
   * Ensures that isInstalled defaults to false if not found in localStorage.
   */
  private loadInstallationState(): void {
    let shouldSaveInitialState = false;
    let finalModuleIds: string[] = [];
    let finalConnectorIds: string[] = [];
    let finalCustomActionIds: string[] = [];

    try {
      // Check for existing module installation state in localStorage
      const rawModulesState = localStorage.getItem(this.INSTALLED_MODULES_KEY);
      if (rawModulesState === null) {
        // No state in localStorage, derive from mock data (initial load)
        finalModuleIds = this._modules.filter(m => m.isInstalled).map(m => m.id);
        shouldSaveInitialState = true;
      } else {
        // State exists in localStorage, parse it
        finalModuleIds = getLocalStorage<string[]>(this.INSTALLED_MODULES_KEY, []);
      }

      // Check for existing connector installation state in localStorage
      const rawConnectorsState = localStorage.getItem(this.INSTALLED_CONNECTORS_KEY);
      if (rawConnectorsState === null) {
        // No state in localStorage, derive from mock data (initial load)
        finalConnectorIds = this._connectors.filter(c => c.isInstalled).map(c => c.id);
        shouldSaveInitialState = true;
      } else {
        // State exists in localStorage, parse it
        finalConnectorIds = getLocalStorage<string[]>(this.INSTALLED_CONNECTORS_KEY, []);
      }

      // Check for existing custom action installation state in localStorage
      const rawCustomActionsState = localStorage.getItem(this.INSTALLED_CUSTOM_ACTIONS_KEY);
      if (rawCustomActionsState === null) {
        // No state in localStorage, derive from mock data (initial load)
        finalCustomActionIds = this._customActions.filter(ca => ca.isInstalled).map(ca => ca.id);
        shouldSaveInitialState = true;
      } else {
        // State exists in localStorage, parse it
        finalCustomActionIds = getLocalStorage<string[]>(this.INSTALLED_CUSTOM_ACTIONS_KEY, []);
      }

      // Apply the determined installation state
      this._modules.forEach(module => {
        module.isInstalled = finalModuleIds.includes(module.id);
      });
      this._connectors.forEach(connector => {
        connector.isInstalled = finalConnectorIds.includes(connector.id);
      });
      this._customActions.forEach(action => {
        action.isInstalled = finalCustomActionIds.includes(action.id);
      });

      // If we derived initial state from mocks, save it back to localStorage
      if (shouldSaveInitialState) {
        this.saveInstallationState();
      }

    } catch (error) {
      console.error('Failed to load or initialize installation state:', error);
      // Default all to not installed and try to clear potentially corrupt localStorage entries
      this._modules.forEach(module => { module.isInstalled = false; });
      this._connectors.forEach(connector => { connector.isInstalled = false; });
      this._customActions.forEach(action => { action.isInstalled = false; });
      try {
        localStorage.removeItem(this.INSTALLED_MODULES_KEY);
        localStorage.removeItem(this.INSTALLED_CONNECTORS_KEY);
        localStorage.removeItem(this.INSTALLED_CUSTOM_ACTIONS_KEY);
      } catch (removeError) {
        console.error('Failed to clear localStorage keys after error:', removeError);
      }
    }
  }
  
  /**
   * Clears all known application-specific keys from localStorage.
   */
  public clearAllApplicationCache(): void {
    try {
      localStorage.removeItem(this.INSTALLED_MODULES_KEY);
      localStorage.removeItem(this.INSTALLED_CONNECTORS_KEY);
      localStorage.removeItem(this.INSTALLED_CUSTOM_ACTIONS_KEY);
      localStorage.removeItem('favorite_actions');
      // Potentially add other keys if they are managed by DataService or globally known
      console.log('Application cache (modules, connectors, custom actions, favorites) cleared from localStorage.');
      // Re-initialize data to mock defaults
      this.initializeData();
      // Load installation state. Since localStorage is empty for these keys,
      // it will apply the defaults from the just-initialized data and save them back to localStorage.
      this.loadInstallationState();

      // Notify listeners to refresh UI
      this.notifyListeners();
    } catch (error) {
      console.error('Error clearing application cache from localStorage:', error);
    }
  }

  /**
   * Clears all installed 'Built-in' modules (sets their isInstalled to false).
   * This refers to items categorized as 'Built-in' in the library.
   */
  public clearInstalledModules(): void {
    try {
      this._modules.forEach(module => { module.isInstalled = false; });
      this.saveInstallationState(); // Persists and notifies
      // console.log('Installed modules cleared.'); // Optional: for debugging
    } catch (error) {
      console.error('Error clearing installed modules:', error);
    }
  }

  /**
   * Clears all installed connectors (sets their isInstalled to false).
   */
  public clearInstalledConnectors(): void {
    try {
      this._connectors.forEach(connector => { connector.isInstalled = false; });
      this.saveInstallationState(); // Persists and notifies
      // console.log('Installed connectors cleared.'); // Optional: for debugging
    } catch (error) {
      console.error('Error clearing installed connectors:', error);
    }
  }

  /**
   * Clears all installed custom actions (sets their isInstalled to false).
   */
  public clearInstalledCustomActions(): void {
    try {
      this._customActions.forEach(action => { action.isInstalled = false; });
      this.saveInstallationState(); // Persists and notifies
      // console.log('Installed custom actions cleared.'); // Optional: for debugging
    } catch (error) {
      console.error('Error clearing installed custom actions:', error);
    }
  }

  /**
   * Clears all favorited items.
   */
  public clearAllFavorites(): void {
    try {
      localStorage.removeItem('favorite_actions');
      // console.log('Favorites cleared.'); // Optional: for debugging
      this.notifyListeners(); // Notify UI to update favorite states
    } catch (error) {
      console.error('Error clearing favorites from localStorage:', error);
    }
  }

  /**
   * Clears all user-selected installed built-in modules, connectors, and all favorites.
   * This effectively uninstalls all built-in modules and connectors and clears favorites,
   * without affecting custom actions or resetting the entire application to mock defaults.
   */
  public clearUserSelections(): void {
    try {
      // Clear installed built-in modules
      this._modules.forEach(module => { module.isInstalled = false; });
      // console.log('Installed modules cleared.');

      // Clear installed connectors
      this._connectors.forEach(connector => { connector.isInstalled = false; });
      // console.log('Installed connectors cleared.');

      // Persist changes to modules and connectors installation state
      this.saveInstallationState(); // This also calls notifyListeners

      // Clear all favorites
      localStorage.removeItem('favorite_actions');
      // console.log('Favorites cleared.');

      // Explicitly notify listeners again in case saveInstallationState's notification
      // doesn't cover all aspects or if favorites need a separate update signal.
      // However, saveInstallationState already calls notifyListeners, so this might be redundant
      // unless favorites state is managed entirely separately from installation state listeners.
      // For now, relying on saveInstallationState's notification.
      // If favorites UI doesn't update, uncomment the line below or ensure favorites update is handled.
      // this.notifyListeners(); 
      console.log('User selections (installed modules, connectors, favorites) cleared.');
    } catch (error) {
      console.error('Error clearing user selections:', error);
    }
  }

  /**
   * Save the current installation state to localStorage.
   */
  private saveInstallationState(): void {
    try {
      const installedModules = this._modules.filter(m => m.isInstalled).map(m => m.id);
      setLocalStorage(this.INSTALLED_MODULES_KEY, installedModules);
      
      const installedConnectors = this._connectors.filter(c => c.isInstalled).map(c => c.id);
      setLocalStorage(this.INSTALLED_CONNECTORS_KEY, installedConnectors);

      const installedCustomActions = this._customActions.filter(ca => ca.isInstalled).map(ca => ca.id);
      setLocalStorage(this.INSTALLED_CUSTOM_ACTIONS_KEY, installedCustomActions);
    this.notifyListeners(); // Notify subscribers of the change
    } catch (error) {
      console.error('Failed to save installation state:', error);
    }
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
   * Get a custom action by its ID
   */
  getCustomActionById(id: string): CustomActionItemType | undefined {
    return this._customActions.find(customAction => customAction.id === id);
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
    
    // Get custom action items
    const customActionItems = this._customActions
      .filter(ca => ca.isInstalled)
      .flatMap(ca => (ca.actions || []).map(action => ({
        ...action,
        moduleId: ca.id,
        moduleTitle: ca.title
      })));
    
    // Combine with connector actions and custom actions
    const allActions = [...allModuleActions, ...this._connectorActions, ...customActionItems];
    
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
        return this._customActions.map(ca => ca as LibraryItemType); // Return loaded custom actions
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

  /**
   * Install a library item (module or connector).
   * @param itemId The ID of the item to install.
   * @returns The updated item with isInstalled=true, or undefined if not found.
   */
  installLibraryItem(itemId: string): LibraryItemType | undefined {
    const moduleIndex = this._modules.findIndex(module => module.id === itemId);
    if (moduleIndex !== -1) {
      this._modules[moduleIndex].isInstalled = true;
      this.saveInstallationState();
      const module = this._modules[moduleIndex];
      // Map ActionGroup to LibraryItemType for consistency
      return {
        id: module.id,
        title: module.title,
        type: 'built-in', // Assuming modules are 'built-in' type in library context
        icon: module.icon,
        iconColor: module.iconColor,
        tags: module.tags,
        category: module.category,
        author: module.author,
        description: '', // ActionGroup itself doesn't have a top-level description; specific items do.
        isInstalled: true,
        actions: module.items, // ActionGroup.items are DetailedActionItem[]
      };
    }
    
    const connectorIndex = this._connectors.findIndex(connector => connector.id === itemId);
    if (connectorIndex !== -1) {
      this._connectors[connectorIndex].isInstalled = true;
      this.saveInstallationState();
      return this._connectors[connectorIndex];
    }
    
    const customActionIndex = this._customActions.findIndex(action => action.id === itemId);
    if (customActionIndex !== -1) {
      this._customActions[customActionIndex].isInstalled = true;
      this.saveInstallationState();
      return this._customActions[customActionIndex] as LibraryItemType;
    }
    
    console.warn(`[DataService] Item with ID ${itemId} not found for installation.`);
    return undefined;
  }

  /**
   * Uninstall a library item (module or connector).
   * @param itemId The ID of the item to uninstall.
   * @returns The updated item with isInstalled=false, or undefined if not found.
   */
  uninstallLibraryItem(itemId: string): LibraryItemType | undefined {
    const moduleIndex = this._modules.findIndex(module => module.id === itemId);
    if (moduleIndex !== -1) {
      this._modules[moduleIndex].isInstalled = false;
      this.saveInstallationState();
      const module = this._modules[moduleIndex];
      // Map ActionGroup to LibraryItemType for consistency
      return {
        id: module.id,
        title: module.title,
        type: 'built-in',
        icon: module.icon,
        iconColor: module.iconColor,
        tags: module.tags,
        category: module.category,
        author: module.author,
        description: '', // ActionGroup itself doesn't have a top-level description; specific items do.
        isInstalled: false,
        actions: module.items,
      };
    }
    
    const connectorIndex = this._connectors.findIndex(connector => connector.id === itemId);
    if (connectorIndex !== -1) {
      this._connectors[connectorIndex].isInstalled = false;
      this.saveInstallationState();
      return this._connectors[connectorIndex];
    }
    
    const customActionIndex = this._customActions.findIndex(action => action.id === itemId);
    if (customActionIndex !== -1) {
      this._customActions[customActionIndex].isInstalled = false;
      this.saveInstallationState();
      return this._customActions[customActionIndex] as LibraryItemType;
    }
    
    console.warn(`[DataService] Item with ID ${itemId} not found for uninstallation.`);
    return undefined;
  }
  
  // ACTIONS PANE CONTENT
  
  private getInstalledCustomActionItemsForPane(): ActionGroup[] {
    return this._customActions
      .filter(ca => ca.isInstalled)
      .map(ca => {
        // Map the sub-actions of the custom action package to DetailedActionItem
        const subActions: DetailedActionItem[] = (ca.actions || []).map(action => ({
          id: action.id,
          title: action.title,
          icon: action.icon,
          iconColor: action.iconColor,
          moduleId: ca.id, // Parent custom action package ID
          moduleTitle: ca.title, // Parent custom action package title
          // description: action.description, // Assuming sub-actions might have descriptions
        }));

        return {
          id: ca.id,
          title: ca.title,
          icon: ca.icon,
          iconColor: ca.iconColor,
          category: 'Custom actions',
          type: 'module', // Treat as a module for rendering purposes
          isInstalled: true,
          tags: ['custom'],
          items: subActions, // Renamed from 'actions' to 'items' to match ActionGroup structure for pane
          // subGroups: undefined, // Explicitly no sub-groups within a custom action package itself
        };
      });
  }
      
  /**
   * Get content for the Actions Pane based on active tab, search query, and favorites
   */
  getActionsPaneContent(activeTab: TabType, searchQuery: string, favoriteItems: Record<string, boolean> = {}): { modules: ActionGroup[], uninstalledCount?: number } {
    let modules: ActionGroup[] = []; // Declare modules at the top
    let uninstalledCountFromLogic: number | undefined; // Keep track of uninstalled count

    if (activeTab === 'Favorites') {
      const favoriteActions = this.getFavoriteActions(favoriteItems);
      const groupedFavorites: { [key: string]: DetailedActionItem[] } = {};
      favoriteActions.forEach(action => {
        if (!groupedFavorites[action.moduleId]) {
          groupedFavorites[action.moduleId] = [];
        }
        groupedFavorites[action.moduleId].push(action);
      });

      modules = Object.entries(groupedFavorites).map(([moduleId, items]) => {
        const module = this.getModuleById(moduleId);
        const connector = this.getConnectorById(moduleId);
        const customAction = this.getCustomActionById(moduleId);
        
        // Use title from module, connector, or custom action with a friendly fallback
        const title = module?.title || connector?.title || customAction?.title || `Action Group (${moduleId})`;
        
        // Use icon and iconColor from module, connector, or custom action
        const icon = module?.icon || connector?.icon || customAction?.icon;
        const iconColor = module?.iconColor || connector?.iconColor || customAction?.iconColor;
        
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
      // Removed early return, flow continues to generic search filter below
    } else {
      // Original logic for non-Favorite tabs to populate 'modules'
      // Filter modules based on tab
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
            tags: ['connector'] // Ensure connectors have a 'connector' tag for filtering if needed
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

        // Add Custom Action groups (each installed custom action is its own group)
        const installedCustomActionGroupsAll = this.getInstalledCustomActionItemsForPane();
        if (installedCustomActionGroupsAll.length > 0) {
          modules.push(...installedCustomActionGroupsAll);
        }
      } else if (activeTab === 'Built-in') {
        modules = this.getDisplayModules().filter(module => 
          !module.tags?.includes('connector') // Exclude items tagged as 'connector' from 'Built-in'
        );

        // Add Custom Action groups (each installed custom action is its own group)
        const installedCustomActionGroupsBuiltIn = this.getInstalledCustomActionItemsForPane();
        if (installedCustomActionGroupsBuiltIn.length > 0) {
          modules.push(...installedCustomActionGroupsBuiltIn);
        }
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
    }
    
    // Apply search filter if query exists and modules array is populated
    if (searchQuery && modules.length > 0) {
      const normalizedQuery = searchQuery.toLowerCase();
      modules = modules.map(module => {
        // Filter items within each module
        const filteredItems = module.items.filter(item => 
          item.title.toLowerCase().includes(normalizedQuery) ||
          (item.description && item.description.toLowerCase().includes(normalizedQuery)) ||
          (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(normalizedQuery)))
        );
        
        // Filter subgroups if they exist
        const filteredSubGroups = module.subGroups?.map(subGroup => {
          const filteredSubItems = subGroup.items.filter(item => 
            item.title.toLowerCase().includes(normalizedQuery) ||
            (item.description && item.description.toLowerCase().includes(normalizedQuery)) ||
            (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(normalizedQuery)))
          );
          return { ...subGroup, items: filteredSubItems };
        }).filter(subGroup => subGroup.items.length > 0);
        
        // Check if module title itself matches
        const moduleTitleMatches = module.title.toLowerCase().includes(normalizedQuery);

        // Only include the module if its title matches, or it has matching items or subgroups
        const hasMatchingItems = filteredItems.length > 0;
        const hasMatchingSubGroups = filteredSubGroups && filteredSubGroups.length > 0;
        
        if (!moduleTitleMatches && !hasMatchingItems && !hasMatchingSubGroups) {
          return null;
        }
        
        return { 
          ...module, 
          items: filteredItems, // Use filtered items
          subGroups: filteredSubGroups // Use filtered subgroups
        };
      }).filter(Boolean) as ActionGroup[]; // Filter out null values and cast back to ActionGroup[]
    }
    
    // If there's a search query, count uninstalled items that match
    // This count should be based on what's *not* in the currently displayed 'modules'
    // but would appear if not filtered by installation status.
    if (searchQuery) {
      // const allPossibleModulesForQuery: ActionGroup[] = [];
      // Logic to get ALL modules/connectors/custom actions that could match query, irrespective of installed status
      // For simplicity, we'll estimate based on searching uninstalled items directly.
      // This part might need refinement if the count is critical for UI that shows "X uninstalled items match"
      
      const uninstalledModulesMatching = this.searchUninstalledModules(searchQuery);
      const uninstalledActionsMatching = this.searchUninstalledActions(searchQuery);
      
      const uniqueUninstalledModuleIds = new Set<string>();
      uninstalledActionsMatching.forEach(action => {
        // Ensure the parent module/connector of this action is indeed uninstalled
        const parentModule = this.getModuleById(action.moduleId);
        const parentConnector = this.getConnectorById(action.moduleId);
        if ((parentModule && parentModule.isInstalled === false) || (parentConnector && !parentConnector.isInstalled)) {
          uniqueUninstalledModuleIds.add(action.moduleId);
        }
      });
      uninstalledModulesMatching.forEach(module => {
        if (module.isInstalled === false) { // Double check, searchUninstalledModules should already ensure this
             uniqueUninstalledModuleIds.add(module.id);
        }
      });
      uninstalledCountFromLogic = uniqueUninstalledModuleIds.size;
    }
    
    return { modules, uninstalledCount: uninstalledCountFromLogic };
  }
}

// Export a singleton instance
export const dataService = new DataService();