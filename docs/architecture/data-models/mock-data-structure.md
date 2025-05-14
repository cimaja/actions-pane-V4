# Actions Pane V4 Mock Data Structure

This document provides a detailed overview of the mock data structure used in the Actions Pane V4 prototype. It describes how the mock data is organized, how it is accessed, and how it can be extended.

## Directory Structure

The mock data for the Actions Pane V4 prototype is organized in a modular structure:

```
src/data/mock/
├── modules/           # Built-in modules
│   ├── index.ts       # Exports all modules
│   ├── date-time.ts   # Date Time module
│   ├── ui-automation.ts # UI Automation module
│   ├── file-system.ts # File System module
│   └── ...            # Other modules
├── connectors/        # Connectors
│   ├── index.ts       # Exports all connectors
│   ├── microsoft-teams.ts # Microsoft Teams connector
│   ├── sharepoint.ts  # SharePoint connector
│   └── ...            # Other connectors
└── templates/         # Templates for creating new modules and connectors
    ├── module-template.ts # Template for modules
    ├── module-with-subgroups-template.ts # Template for modules with subgroups
    └── connector-template.ts # Template for connectors
```

## Module Structure

### Module File Template

Each module file follows a standard template:

```typescript
// Example: src/data/mock/modules/module-template.ts
import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'module-id',
  title: 'Module Title',
  icon: '🔍', // Emoji or icon reference
  tags: ['tag1', 'tag2'], // For categorization
  items: [] // Will be populated with actions
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'action-1',
    title: 'Action 1',
    description: 'Description of Action 1',
    moduleId: 'module-id'
  },
  {
    id: 'action-2',
    title: 'Action 2',
    description: 'Description of Action 2',
    moduleId: 'module-id'
  }
  // More actions...
];

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
```

### Module with Subgroups Template

For modules with subgroups, the template is extended:

```typescript
// Example: src/data/mock/modules/module-with-subgroups-template.ts
import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'module-id',
  title: 'Module Title',
  icon: '🔍',
  tags: ['tag1', 'tag2'],
  items: [], // Will be populated with main actions
  subGroups: [] // Will be populated with subgroups
};

// Main actions (directly in the module)
export const mainActions: ActionItemType[] = [
  {
    id: 'main-action-1',
    title: 'Main Action 1',
    description: 'Description of Main Action 1',
    moduleId: 'module-id'
  }
  // More main actions...
];

// Subgroup 1
export const subGroup1: ActionGroup = {
  id: 'subgroup-1',
  title: 'Subgroup 1',
  items: [
    {
      id: 'subgroup-1-action-1',
      title: 'Subgroup 1 Action 1',
      description: 'Description of Subgroup 1 Action 1',
      moduleId: 'module-id'
    }
    // More subgroup 1 actions...
  ]
};

// Subgroup 2
export const subGroup2: ActionGroup = {
  id: 'subgroup-2',
  title: 'Subgroup 2',
  items: [
    {
      id: 'subgroup-2-action-1',
      title: 'Subgroup 2 Action 1',
      description: 'Description of Subgroup 2 Action 1',
      moduleId: 'module-id'
    }
    // More subgroup 2 actions...
  ]
};

// Initialize the module with its actions and subgroups
module.items = mainActions;
module.subGroups = [subGroup1, subGroup2];

// Helper function to get all actions for this module (including subgroups)
export const getAllActions = () => {
  return [
    ...mainActions,
    ...subGroup1.items,
    ...subGroup2.items
  ];
};

// Helper function to get an action by ID
export const getActionById = (id: string) => getAllActions().find(action => action.id === id);
```

## Connector Structure

### Connector File Template

Each connector file follows a standard template:

```typescript
// Example: src/data/mock/connectors/connector-template.ts
import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'connector-id',
  title: 'Connector Title',
  type: 'connector',
  icon: '🔌', // Emoji or icon reference
  description: 'Description of the connector',
  author: 'Author Name',
  lastUpdated: '2023-05-01',
  isInstalled: true, // or false
  dependencies: [], // Optional dependencies
  itemCount: 5 // Number of actions
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'connector-action-1',
    moduleId: 'connector-id',
    title: 'Connector Action 1',
    description: 'Description of Connector Action 1',
    tags: ['tag1', 'tag2'],
    usage: 'Usage information for Connector Action 1',
    examples: [
      'Example 1 for Connector Action 1',
      'Example 2 for Connector Action 1'
    ],
    parameters: [
      {
        name: 'param1',
        type: 'string',
        description: 'Description of param1',
        required: true
      },
      {
        name: 'param2',
        type: 'number',
        description: 'Description of param2',
        required: false
      }
    ]
  }
  // More actions...
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
```

## Module Index

The module index file (`src/data/mock/modules/index.ts`) exports all modules and their actions:

```typescript
// Example: src/data/mock/modules/index.ts
import * as dateTime from './date-time';
import * as uiAutomation from './ui-automation';
import * as fileSystem from './file-system';
// Import other modules...

// Export all modules
export const modules = [
  dateTime.module,
  uiAutomation.module,
  fileSystem.module
  // Add other modules...
];

// Export all actions
export const allActions = [
  ...dateTime.getAllActions(),
  ...uiAutomation.getAllActions(),
  ...fileSystem.getAllActions()
  // Add actions from other modules...
];

// Helper function to get a module by ID
export const getModuleById = (id: string) => modules.find(module => module.id === id);

// Helper function to get an action by ID
export const getActionById = (id: string) => allActions.find(action => action.id === id);
```

## Connector Index

The connector index file (`src/data/mock/connectors/index.ts`) exports all connectors and their actions:

```typescript
// Example: src/data/mock/connectors/index.ts
import * as microsoftTeams from './microsoft-teams';
import * as sharePoint from './sharepoint';
// Import other connectors...

// Export all connectors
export const connectors = [
  microsoftTeams.connector,
  sharePoint.connector
  // Add other connectors...
];

// Export all connector actions
export const allConnectorActions = [
  ...microsoftTeams.getAllActions(),
  ...sharePoint.getAllActions()
  // Add actions from other connectors...
];

// Helper function to get a connector by ID
export const getConnectorById = (id: string) => connectors.find(connector => connector.id === id);

// Helper function to get a connector action by ID
export const getConnectorActionById = (id: string) => allConnectorActions.find(action => action.id === id);
```

## Data Service Integration

The data service (`src/data/dataService.ts`) integrates all mock data and provides a unified interface for accessing it:

```typescript
// Example: src/data/dataService.ts (simplified)
import { modules, allActions, getModuleById, getActionById } from './mock/modules';
import { connectors, allConnectorActions, getConnectorById, getConnectorActionById } from './mock/connectors';
import { ActionGroup, ActionItemType, LibraryItemType, TabType, LibraryCategoryType, DetailedActionItem } from '../models/types';

export class DataService {
  private _modules: ActionGroup[] = modules;
  private _actions: ActionItemType[] = allActions;
  private _connectors: LibraryItemType[] = connectors;
  private _connectorActions: DetailedActionItem[] = allConnectorActions;
  
  // Get all modules
  getAllModules(): ActionGroup[] {
    return this._modules;
  }
  
  // Get a module by ID
  getModuleById(id: string): ActionGroup | undefined {
    return getModuleById(id);
  }
  
  // Get actions by module ID
  getActionsByModuleId(moduleId: string): ActionItemType[] {
    return this._actions.filter(action => action.moduleId === moduleId);
  }
  
  // Get an action by ID
  getActionById(id: string): ActionItemType | undefined {
    return getActionById(id) || getConnectorActionById(id);
  }
  
  // Search actions by query
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
  
  // Get all connectors
  getAllConnectors(): LibraryItemType[] {
    return this._connectors;
  }
  
  // Get installed connectors
  getInstalledConnectors(): LibraryItemType[] {
    return this._connectors.filter(connector => connector.isInstalled);
  }
  
  // Get available connectors (not installed)
  getAvailableConnectors(): LibraryItemType[] {
    return this._connectors.filter(connector => !connector.isInstalled);
  }
  
  // Get a connector by ID
  getConnectorById(id: string): LibraryItemType | undefined {
    return getConnectorById(id);
  }
  
  // Get content for the Actions Pane based on active tab and search query
  getActionsPaneContent(activeTab: TabType, searchQuery: string): ActionGroup[] {
    // Implementation...
    return [];
  }
  
  // More methods...
}

// Create and export a singleton instance
export const dataService = new DataService();
```

## Adding New Mock Data

### Adding a New Module

To add a new module:

1. Create a new file in `src/data/mock/modules/` using the module template
2. Define the module metadata and actions
3. Add the module to the module index file

Example:

```typescript
// 1. Create a new file: src/data/mock/modules/new-module.ts
import { ActionGroup, ActionItemType } from '../../../models/types';

export const module: ActionGroup = {
  id: 'new-module',
  title: 'New Module',
  icon: '🆕',
  tags: ['new'],
  items: []
};

export const actions: ActionItemType[] = [
  {
    id: 'new-action-1',
    title: 'New Action 1',
    description: 'Description of New Action 1',
    moduleId: 'new-module'
  },
  {
    id: 'new-action-2',
    title: 'New Action 2',
    description: 'Description of New Action 2',
    moduleId: 'new-module'
  }
];

module.items = actions;

export const getAllActions = () => actions;
export const getActionById = (id: string) => actions.find(action => action.id === id);

// 2. Update the module index file: src/data/mock/modules/index.ts
import * as newModule from './new-module';

export const modules = [
  // Existing modules...
  newModule.module
];

export const allActions = [
  // Existing actions...
  ...newModule.getAllActions()
];
```

### Adding a New Connector

To add a new connector:

1. Create a new file in `src/data/mock/connectors/` using the connector template
2. Define the connector metadata and actions
3. Add the connector to the connector index file

Example:

```typescript
// 1. Create a new file: src/data/mock/connectors/new-connector.ts
import { LibraryItemType, DetailedActionItem } from '../../../models/types';

export const connector: LibraryItemType = {
  id: 'new-connector',
  title: 'New Connector',
  type: 'connector',
  icon: '🔌',
  description: 'Description of the new connector',
  author: 'Author Name',
  isInstalled: true
};

export const actions: DetailedActionItem[] = [
  {
    id: 'new-connector-action-1',
    moduleId: 'new-connector',
    title: 'New Connector Action 1',
    description: 'Description of New Connector Action 1',
    tags: ['new'],
    usage: 'Usage information',
    examples: ['Example 1', 'Example 2'],
    parameters: [
      {
        name: 'param1',
        type: 'string',
        description: 'Parameter 1',
        required: true
      }
    ]
  }
];

export const getAllActions = () => actions;
export const getActionById = (id: string) => actions.find(action => action.id === id);

// 2. Update the connector index file: src/data/mock/connectors/index.ts
import * as newConnector from './new-connector';

export const connectors = [
  // Existing connectors...
  newConnector.connector
];

export const allConnectorActions = [
  // Existing connector actions...
  ...newConnector.getAllActions()
];
```

## Best Practices for Mock Data

When working with mock data in the Actions Pane V4 prototype, follow these best practices:

1. **Use Consistent IDs**
   - Use kebab-case for IDs (e.g., `'file-system'`, `'create-file'`)
   - Prefix action IDs with the module ID for easy identification (e.g., `'file-system-create-file'`)

2. **Provide Meaningful Descriptions**
   - Include clear and concise descriptions for all actions
   - Use active voice (e.g., "Creates a new file" instead of "A new file is created")

3. **Use Realistic Data**
   - Make the mock data as realistic as possible
   - Include all required fields and properties
   - Use realistic values for all properties

4. **Organize Actions Logically**
   - Group related actions together
   - Use subgroups for complex modules
   - Order actions by frequency of use or logical flow

5. **Keep Mock Data Separate**
   - Keep mock data separate from the application code
   - Use the data service as the interface between the application and the mock data
   - Don't hardcode mock data in components

6. **Document Mock Data**
   - Document the structure and purpose of mock data
   - Include examples of how to use the mock data
   - Document any assumptions or limitations

7. **Test Mock Data**
   - Test that mock data is correctly loaded and accessed
   - Test edge cases (e.g., empty arrays, missing properties)
   - Test search and filtering functionality

## Conclusion

The mock data structure for the Actions Pane V4 prototype provides a flexible and extensible foundation for the application. The modular structure allows for easy addition of new modules and connectors, while the data service provides a unified interface for accessing the data. By following the templates and best practices outlined in this document, you can easily extend the mock data to support new features and functionality.
