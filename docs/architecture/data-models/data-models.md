# Actions Pane V4 Data Models

This document provides a comprehensive overview of the data models used in the Actions Pane V4 prototype. It defines the structure of all entities, their relationships, and how they are used in the application.

## Core Data Models

### ActionItemType

The `ActionItemType` represents an individual action that can be performed in Power Automate Desktop.

```typescript
export interface ActionItemType {
  id: string;           // Unique identifier for the action
  title: string;        // Display name of the action
  icon?: string;        // Optional icon for the action
  description?: string; // Optional description of what the action does
  isFavorite?: boolean; // Whether the action is favorited by the user
  moduleId?: string;    // ID of the module this action belongs to
}
```

#### Usage

- Used to display individual actions in the Actions Pane
- Used in action groups and subgroups
- Used in search results

#### Relationships

- Belongs to a module or connector (via `moduleId`)
- Can be part of an `ActionGroup`
- Can be extended by `DetailedActionItem`

### DetailedActionItem

The `DetailedActionItem` extends `ActionItemType` with additional metadata for more complex actions, particularly those in connectors.

```typescript
export interface DetailedActionItem extends ActionItemType {
  moduleId: string;     // ID of the module/connector this action belongs to (required)
  tags?: string[];      // Optional tags for categorization
  usage?: string;       // Optional usage information
  examples?: string[];  // Optional usage examples
  parameters?: {        // Optional parameters for the action
    name: string;       // Parameter name
    type: string;       // Parameter type (string, number, boolean, etc.)
    description: string; // Parameter description
    required: boolean;  // Whether the parameter is required
  }[];
}
```

#### Usage

- Used for connector actions that require more detailed information
- Used in the Library Modal for detailed action views
- Used for documentation and help

#### Relationships

- Extends `ActionItemType`
- Belongs to a connector (via `moduleId`)

### ActionGroup

The `ActionGroup` represents a group of related actions, which can be a module, a connector, or a subgroup within a module.

```typescript
export interface ActionGroup {
  id: string;               // Unique identifier for the group
  title: string;            // Display name of the group
  items: ActionItemType[];  // Actions in this group
  subGroups?: ActionGroup[]; // Optional subgroups
  icon?: string;            // Optional icon for the group
  tags?: string[];          // Optional tags for categorization
}
```

#### Usage

- Used to organize actions in the Actions Pane
- Used to represent modules and connectors
- Used to create hierarchical structures with subgroups

#### Relationships

- Contains `ActionItemType` items
- Can contain other `ActionGroup` instances as subgroups
- Referenced by the data service for filtering and searching

### LibraryItemType

The `LibraryItemType` represents an item in the Library Modal, which can be a module, connector, custom action, UI collection, or template.

```typescript
export interface LibraryItemType {
  id: string;                // Unique identifier for the library item
  title: string;             // Display name of the library item
  type: 'built-in' | 'connector' | 'custom' | 'ui-collection' | 'template'; // Type of library item
  icon?: string;             // Optional icon for the library item
  description?: string;      // Optional description of the library item
  author?: string;           // Optional author of the library item
  lastUpdated?: string;      // Optional last updated date
  isInstalled: boolean;      // Whether the item is installed
  dependencies?: string[];   // Optional dependencies on other items
  itemCount?: number;        // Optional number of items (for UI Collections)
  actions?: ActionItemType[]; // Optional actions (for modules and connectors)
}
```

#### Usage

- Used to display items in the Library Modal
- Used to manage installation status
- Used to provide metadata for library items

#### Relationships

- Can contain `ActionItemType` instances (via `actions`)
- Referenced by the data service for filtering and searching

## Type Definitions

### TabType

The `TabType` represents the tabs in the Actions Pane.

```typescript
export type TabType = 'All' | 'Built-in' | 'Connectors' | 'Favorites';
```

#### Usage

- Used to determine which content to display in the Actions Pane
- Used for tab selection and filtering

### LibraryCategoryType

The `LibraryCategoryType` represents the categories in the Library Modal.

```typescript
export type LibraryCategoryType = 'Built-in Actions' | 'Connectors' | 'Custom Actions' | 'UI Collections' | 'Templates';
```

#### Usage

- Used to organize content in the Library Modal
- Used for navigation and filtering in the Library Modal

## Data Relationships

The following diagram illustrates the relationships between the data models:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  ActionItemType │◄────┤  ActionGroup    │◄────┤ LibraryItemType │
│                 │     │                 │     │                 │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         │
         ▼
┌─────────────────┐
│                 │
│DetailedActionItem│
│                 │
└─────────────────┘
```

- A `LibraryItemType` can contain multiple `ActionGroup` instances
- An `ActionGroup` can contain multiple `ActionItemType` instances and other `ActionGroup` instances (as subgroups)
- An `ActionItemType` can be extended by a `DetailedActionItem` for more complex actions

## Mock Data Structure

The mock data for the Actions Pane V4 prototype is organized in a modular structure:

```
src/data/mock/
├── modules/           # Built-in modules
│   ├── index.ts       # Exports all modules
│   ├── date-time.ts   # Date Time module
│   └── ui-automation.ts # UI Automation module
├── connectors/        # Connectors
│   ├── index.ts       # Exports all connectors
│   └── microsoft-teams.ts # Microsoft Teams connector
└── templates/         # Templates for creating new modules and connectors
    ├── module-template.ts # Template for modules
    ├── module-with-subgroups-template.ts # Template for modules with subgroups
    └── connector-template.ts # Template for connectors
```

### Module File Structure

Each module file exports:

1. A `module` object of type `ActionGroup` with metadata about the module
2. Action arrays for the module's actions and subgroup actions
3. Helper functions for getting all actions and finding actions by ID

Example:

```typescript
// date-time.ts
import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'date-time',
  title: 'Date Time',
  icon: '📅',
  tags: ['utility'],
  items: [] // Will be populated with actions
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'add-to-datetime',
    title: 'Add to datetime',
    description: 'Add a specified amount of time to a datetime',
    moduleId: 'date-time'
  },
  // More actions...
];

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
```

### Connector File Structure

Each connector file exports:

1. A `connector` object of type `LibraryItemType` with metadata about the connector
2. An `actions` array of type `DetailedActionItem[]` with the connector's actions

Example:

```typescript
// microsoft-teams.ts
import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'microsoft-teams',
  title: 'Microsoft Teams',
  type: 'connector',
  icon: '👥',
  description: 'Automate tasks in Microsoft Teams such as sending messages, creating teams, and managing channels.',
  author: 'Microsoft',
  isInstalled: true
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'teams-send-message',
    moduleId: 'microsoft-teams',
    title: 'Send a message',
    description: 'Send a message to a channel or chat in Microsoft Teams',
    tags: ['teams', 'message', 'communication'],
    usage: 'Use this action to send messages to Teams channels or direct chats programmatically.',
    examples: [
      'Send a notification to a team channel when a task is completed',
      'Send a daily report summary to a specific channel'
    ],
    parameters: [
      {
        name: 'teamId',
        type: 'string',
        description: 'The ID of the team where the message will be sent',
        required: true
      },
      // More parameters...
    ]
  },
  // More actions...
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
```

## Data Service

The data service (`src/data/dataService.ts`) provides a centralized access point for all data in the application. It includes methods for retrieving, filtering, and searching data across all categories.

### Key Methods

- `getDisplayModules()`: Get all modules that should be displayed in the Actions Pane
- `getAllModules()`: Get all modules available in the library
- `getModulesByCategory(category: string)`: Get modules by category tag
- `getModuleById(id: string)`: Get a module by its ID
- `searchModules(query: string)`: Search modules by query
- `getActionsByModuleId(moduleId: string)`: Get all actions for a specific module
- `getActionById(id: string)`: Get an action by its ID
- `searchActions(query: string)`: Search actions by query
- `getFavoriteActions()`: Get favorite actions
- `getAllConnectors()`: Get all connectors
- `getInstalledConnectors()`: Get installed connectors
- `getAvailableConnectors()`: Get available connectors (not installed)
- `getConnectorById(id: string)`: Get a connector by its ID
- `searchConnectors(query: string)`: Search connectors by query
- `getLibraryItemsByCategory(category: LibraryCategoryType)`: Get all library items by category
- `getInstalledLibraryItemsByCategory(category: LibraryCategoryType)`: Get installed library items by category
- `searchLibraryItems(query: string)`: Search library items across all categories
- `getActionsPaneContent(activeTab: TabType, searchQuery: string)`: Get content for the Actions Pane based on active tab and search query

## Future Enhancements

While the current data models are sufficient for the prototype, the following enhancements could be considered for future development:

1. **Action Parameters**
   - Add support for parameter types beyond the basic types
   - Add validation rules for parameters
   - Add support for dynamic parameters

2. **Action Categories**
   - Add more structured categorization for actions
   - Add support for multiple categories per action
   - Add support for hierarchical categories

3. **Action Relationships**
   - Add support for action dependencies
   - Add support for action sequences
   - Add support for action variants

4. **User Data**
   - Add support for user-specific data
   - Add support for user preferences
   - Add support for user history

5. **Versioning**
   - Add support for versioning of modules and connectors
   - Add support for compatibility checking
   - Add support for update notifications

## Conclusion

The data models for the Actions Pane V4 prototype provide a flexible and extensible foundation for the application. The modular structure allows for easy addition of new modules and connectors, while the type definitions ensure type safety and consistency throughout the application.
