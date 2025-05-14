# Actions Pane V4 State Flow Diagrams

This document provides visual representations of the state flow in the Actions Pane V4 prototype, both for the current implementation and the proposed enhanced approach.

## Current State Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                          App                                    │
│                           │                                     │
│                           ▼                                     │
│                    ┌─────────────┐                              │
│                    │             │                              │
│                    │ ActionsPane │                              │
│                    │             │                              │
│                    └─────┬───────┘                              │
│                          │                                      │
│            ┌─────────────┼─────────────┐                        │
│            │             │             │                        │
│            ▼             ▼             ▼                        │
│    ┌──────────────┐ ┌──────────┐ ┌───────────┐                  │
│    │              │ │          │ │           │                  │
│    │ActionsPaneHeader│ │ActionsPaneContent│ │LibraryEntryPoint│  │
│    │              │ │          │ │           │                  │
│    └──────────────┘ └────┬─────┘ └───────────┘                  │
│                          │                                      │
│                          ▼                                      │
│                    ┌───────────┐                                │
│                    │           │                                │
│                    │ActionGroup│                                │
│                    │           │                                │
│                    └─────┬─────┘                                │
│                          │                                      │
│                          ▼                                      │
│                    ┌───────────┐                                │
│                    │           │                                │
│                    │ActionItem │                                │
│                    │           │                                │
│                    └───────────┘                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### State Flow Description

1. **App Component**
   - Renders the ActionsPane component
   - No state management at this level

2. **ActionsPane Component**
   - Manages the `activeTab` state (All, Built-in, Connectors, Favorites)
   - Manages the `searchQuery` state
   - Passes state and callbacks to child components

3. **ActionsPaneHeader Component**
   - Receives `activeTab` and `onTabChange` callback from ActionsPane
   - Receives `searchQuery` and `onSearchChange` callback from ActionsPane
   - Updates parent state when user interacts with tabs or search

4. **ActionsPaneContent Component**
   - Receives `activeTab` and `searchQuery` from ActionsPane
   - Uses these to fetch filtered content from the data service
   - Renders ActionGroup components based on the filtered content

5. **ActionGroup Component**
   - Renders a group of actions with a title and optional subgroups
   - Manages its own expansion state (expanded/collapsed)

6. **ActionItem Component**
   - Renders a single action item
   - Manages its own favorite state
   - Handles click events for the action

7. **LibraryEntryPoint Component**
   - Provides access to the Library Modal
   - No state management at this level

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                      Data Service                               │
│                           │                                     │
│                           │                                     │
│                           ▼                                     │
│                    ┌─────────────┐                              │
│                    │             │                              │
│                    │ ActionsPane │                              │
│                    │             │                              │
│                    └─────┬───────┘                              │
│                          │                                      │
│                          │                                      │
│                          ▼                                      │
│                  ┌──────────────┐                               │
│                  │              │                               │
│                  │ActionsPaneContent│                           │
│                  │              │                               │
│                  └──────┬───────┘                               │
│                         │                                       │
│                         │                                       │
│                         ▼                                       │
│                   ┌───────────┐                                 │
│                   │           │                                 │
│                   │ActionGroup│                                 │
│                   │           │                                 │
│                   └─────┬─────┘                                 │
│                         │                                       │
│                         │                                       │
│                         ▼                                       │
│                   ┌───────────┐                                 │
│                   │           │                                 │
│                   │ActionItem │                                 │
│                   │           │                                 │
│                   └───────────┘                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Description

1. **Data Service**
   - Initializes data from module and connector files
   - Provides methods for retrieving, filtering, and searching data
   - Acts as a central repository for all data in the application

2. **ActionsPane Component**
   - Doesn't directly interact with the data service
   - Passes state to ActionsPaneContent for data retrieval

3. **ActionsPaneContent Component**
   - Calls `dataService.getActionsPaneContent(activeTab, searchQuery)`
   - Receives filtered action groups based on the active tab and search query
   - Passes the filtered data to ActionGroup components

4. **ActionGroup Component**
   - Receives action group data from ActionsPaneContent
   - Renders action items based on the data
   - Passes action item data to ActionItem components

5. **ActionItem Component**
   - Receives action item data from ActionGroup
   - Renders the action item based on the data

## Enhanced State Flow (Proposed)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                          App                                    │
│                           │                                     │
│                           ▼                                     │
│                  ┌─────────────────┐                            │
│                  │                 │                            │
│                  │UIStateProvider  │                            │
│                  │                 │                            │
│                  └────────┬────────┘                            │
│                           │                                     │
│                           ▼                                     │
│                ┌────────────────────┐                           │
│                │                    │                           │
│                │UserPreferencesProvider                         │
│                │                    │                           │
│                └────────┬───────────┘                           │
│                         │                                       │
│                         ▼                                       │
│                   ┌───────────┐                                 │
│                   │           │                                 │
│                   │ActionsPane│                                 │
│                   │           │                                 │
│                   └─────┬─────┘                                 │
│                         │                                       │
│           ┌─────────────┼─────────────┐                         │
│           │             │             │                         │
│           ▼             ▼             ▼                         │
│   ┌──────────────┐ ┌──────────┐ ┌───────────┐                   │
│   │              │ │          │ │           │                   │
│   │ActionsPaneHeader│ │ActionsPaneContent│ │LibraryEntryPoint│   │
│   │              │ │          │ │           │                   │
│   └──────────────┘ └────┬─────┘ └───────────┘                   │
│                         │                                       │
│                         ▼                                       │
│                   ┌───────────┐                                 │
│                   │           │                                 │
│                   │ActionGroup│                                 │
│                   │           │                                 │
│                   └─────┬─────┘                                 │
│                         │                                       │
│                         ▼                                       │
│                   ┌───────────┐                                 │
│                   │           │                                 │
│                   │ActionItem │                                 │
│                   │           │                                 │
│                   └───────────┘                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Enhanced State Flow Description

1. **App Component**
   - Wraps the application with context providers
   - No direct state management

2. **UIStateProvider**
   - Provides UI-related state to all components
   - Manages `activeTab`, `searchQuery`, `expandedGroups`, etc.
   - Uses `useReducer` for predictable state updates

3. **UserPreferencesProvider**
   - Provides user preferences to all components
   - Manages `favoriteActions`, `actionsPaneWidth`, etc.
   - Handles persistence of user preferences

4. **ActionsPane Component**
   - Uses contexts for state instead of managing its own
   - Focuses on layout and composition

5. **ActionsPaneHeader Component**
   - Consumes UI state from UIStateContext
   - Dispatches actions to update state
   - No props drilling for state or callbacks

6. **ActionsPaneContent Component**
   - Consumes UI state from UIStateContext
   - Uses custom hooks for data fetching and filtering
   - Renders based on the state from contexts

7. **ActionGroup Component**
   - Consumes UI state for expansion status
   - Dispatches actions to toggle expansion
   - Renders based on the state from contexts

8. **ActionItem Component**
   - Consumes user preferences for favorite status
   - Dispatches actions to toggle favorites
   - Renders based on the state from contexts

## State Update Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                       User Interaction                          │
│                              │                                  │
│                              ▼                                  │
│                      ┌──────────────┐                           │
│                      │              │                           │
│                      │  Component   │                           │
│                      │              │                           │
│                      └──────┬───────┘                           │
│                             │                                   │
│                             ▼                                   │
│                      ┌──────────────┐                           │
│                      │              │                           │
│                      │   Action     │                           │
│                      │              │                           │
│                      └──────┬───────┘                           │
│                             │                                   │
│                             ▼                                   │
│                      ┌──────────────┐                           │
│                      │              │                           │
│                      │   Reducer    │                           │
│                      │              │                           │
│                      └──────┬───────┘                           │
│                             │                                   │
│                             ▼                                   │
│                      ┌──────────────┐                           │
│                      │              │                           │
│                      │  New State   │                           │
│                      │              │                           │
│                      └──────┬───────┘                           │
│                             │                                   │
│                             ▼                                   │
│                      ┌──────────────┐                           │
│                      │              │                           │
│                      │  Re-render   │                           │
│                      │              │                           │
│                      └──────────────┘                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### State Update Flow Description

1. **User Interaction**
   - User interacts with a component (e.g., clicks a tab, enters a search query)

2. **Component**
   - Component handles the interaction
   - Calls the appropriate action creator or dispatch function

3. **Action**
   - Action is created with a type and payload
   - Action is dispatched to the reducer

4. **Reducer**
   - Reducer receives the action
   - Updates the state based on the action type and payload
   - Returns the new state

5. **New State**
   - Context is updated with the new state
   - All components that consume the context are notified

6. **Re-render**
   - Components that consume the affected state re-render
   - UI is updated to reflect the new state
