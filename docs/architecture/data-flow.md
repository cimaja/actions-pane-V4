# Actions Pane V4 Data Flow Architecture

## Data Flow Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Module Files   │────▶│  Data Service   │◀────│ Connector Files │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │                 │
                        │   ActionsPane   │
                        │                 │
                        └────────┬────────┘
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
                 ▼               ▼               ▼
        ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
        │             │  │             │  │             │
        │   Header    │  │   Content   │  │   Footer    │
        │             │  │             │  │             │
        └─────────────┘  └─────────────┘  └─────────────┘
```

## Data Sources

The Actions Pane V4 prototype uses a modular data structure with the following sources:

1. **Module Files**
   - Located in `/src/data/mock/modules/`
   - Each file represents a single module with its actions
   - Exported as a named export from the modules index file

2. **Connector Files**
   - Located in `/src/data/mock/connectors/`
   - Each file represents a single connector with its actions
   - Exported as a named export from the connectors index file

3. **Template Files**
   - Located in `/src/data/mock/templates/`
   - Provide boilerplate templates for creating new modules and connectors

## Data Service

The Data Service (`/src/data/dataService.ts`) acts as a central repository for all data in the application. It provides the following functionality:

1. **Data Initialization**
   - Loads all module and connector files
   - Extracts actions from modules and connectors
   - Initializes the data cache

2. **Data Access**
   - Provides methods for retrieving modules, connectors, and actions
   - Filters data based on various criteria (tab, search query, etc.)
   - Formats data for display in the UI

3. **Search and Filtering**
   - Implements search functionality across all data
   - Filters data based on the active tab
   - Handles special cases like favorites

## State Management

The Actions Pane V4 prototype uses React's built-in state management with the following approach:

1. **Component State**
   - Local state for UI-specific concerns (e.g., is a dropdown open)
   - State is kept as close as possible to where it's used

2. **Lifted State**
   - Shared state is lifted to common parent components
   - The ActionsPane component manages the active tab and search query

3. **Props Drilling**
   - State and callbacks are passed down the component tree via props
   - This approach works well for the current complexity level

## State Flow

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                      ActionsPane                        │
│                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │             │    │             │    │             │  │
│  │  activeTab  │    │searchQuery  │    │  favorites  │  │
│  │             │    │             │    │             │  │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘  │
│         │                  │                   │         │
└─────────┼──────────────────┼───────────────────┼─────────┘
          │                  │                   │
          ▼                  ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│                 │  │                 │  │                 │
│ ActionsPaneHeader│  │ActionsPaneContent│  │  ActionItem    │
│                 │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Key State Elements

1. **activeTab**
   - Type: string
   - Values: 'All', 'Built-in', 'Connectors', 'Favorites'
   - Managed by: ActionsPane component
   - Used by: ActionsPaneHeader, ActionsPaneContent

2. **searchQuery**
   - Type: string
   - Managed by: ActionsPane component
   - Used by: ActionsPaneHeader, ActionsPaneContent

3. **favorites**
   - Type: boolean (per action)
   - Managed by: Individual ActionItem components
   - In a full implementation, this would be persisted and managed centrally

## Data Transformation

The data flows through several transformation steps:

1. **Raw Data** (from module and connector files)
2. **Normalized Data** (processed by the Data Service)
3. **Filtered Data** (based on active tab and search query)
4. **Rendered Data** (displayed in the UI)

## Future Enhancements

As the application grows in complexity, the following enhancements to state management could be considered:

1. **Context API**
   - Create contexts for shared state (e.g., ActiveTabContext, SearchContext)
   - Reduce props drilling and make state more accessible

2. **Custom Hooks**
   - Encapsulate state logic in custom hooks (e.g., useSearch, useFavorites)
   - Improve reusability and testability

3. **State Management Library**
   - For more complex state, consider Redux, Zustand, or Recoil
   - Provides better tools for debugging and state persistence

4. **Server State Management**
   - When integrating with a backend, consider React Query or SWR
   - Handles caching, refetching, and synchronization with server
