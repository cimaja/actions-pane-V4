# Actions Pane V4 State Management Plan

## Overview

This document outlines the state management approach for the Actions Pane V4 prototype. It identifies all state requirements, defines state management patterns, and documents state flow and update patterns.

## State Requirements

### UI State

| State | Type | Description | Scope | Persistence |
|-------|------|-------------|-------|------------|
| `activeTab` | string | Currently selected tab (All, Built-in, Connectors, Favorites) | Global | Session |
| `searchQuery` | string | Current search query | Global | None |
| `expandedGroups` | string[] | IDs of expanded action groups | Global | Local Storage |
| `expandedSubGroups` | string[] | IDs of expanded action subgroups | Global | Local Storage |
| `isLibraryModalOpen` | boolean | Whether the Library Modal is open | Global | None |
| `activeLibraryTab` | string | Currently selected tab in the Library Modal | Global | Session |
| `librarySearchQuery` | string | Search query in the Library Modal | Global | None |

### User Preferences

| State | Type | Description | Scope | Persistence |
|-------|------|-------------|-------|------------|
| `favoriteActions` | string[] | IDs of favorited actions | Global | User Settings |
| `actionsPaneWidth` | number | Width of the Actions Pane | Global | User Settings |
| `defaultTab` | string | Default tab to show when opening the Actions Pane | Global | User Settings |
| `recentlyUsedActions` | { id: string, timestamp: number }[] | Recently used actions with timestamps | Global | User Settings |

### Data State

| State | Type | Description | Scope | Persistence |
|-------|------|-------------|-------|------------|
| `modules` | ActionGroup[] | All available modules | Global | Cache |
| `connectors` | LibraryItemType[] | All available connectors | Global | Cache |
| `installedConnectors` | string[] | IDs of installed connectors | Global | User Settings |
| `moduleActions` | DetailedActionItem[] | Actions from modules | Global | Cache |
| `connectorActions` | DetailedActionItem[] | Actions from connectors | Global | Cache |
| `filteredContent` | ActionGroup[] | Filtered content based on active tab and search | Derived | None |

## State Management Approach

### Current Approach (Phase 1)

The current implementation uses React's built-in state management with the following patterns:

1. **Component State**
   - Local state for UI-specific concerns using `useState` hook
   - State is kept as close as possible to where it's used

2. **Lifted State**
   - Shared state is lifted to common parent components
   - The ActionsPane component manages the active tab and search query

3. **Props Drilling**
   - State and callbacks are passed down the component tree via props
   - This approach works well for the current complexity level

4. **Data Service**
   - Singleton service that provides access to all data
   - Initializes data from module and connector files
   - Provides methods for retrieving, filtering, and searching data

### Enhanced Approach (Phase 2)

As the application grows in complexity, we will transition to a more robust state management approach:

1. **Context API for UI State**
   - Create a `UIStateContext` for managing UI-related state
   - Provide state and actions to components without props drilling
   - Implement with `useReducer` for more predictable state updates

```jsx
// Example UIStateContext
const UIStateContext = React.createContext();

function UIStateProvider({ children }) {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);
  
  return (
    <UIStateContext.Provider value={{ state, dispatch }}>
      {children}
    </UIStateContext.Provider>
  );
}

// Usage in components
function SomeComponent() {
  const { state, dispatch } = useContext(UIStateContext);
  
  return (
    <button onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'Connectors' })}>
      Switch to Connectors
    </button>
  );
}
```

2. **User Preferences Context**
   - Create a `UserPreferencesContext` for managing user preferences
   - Implement persistence using local storage or a backend API
   - Provide methods for updating and retrieving preferences

```jsx
// Example UserPreferencesContext
const UserPreferencesContext = React.createContext();

function UserPreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(() => {
    // Load from localStorage or default
    return JSON.parse(localStorage.getItem('userPreferences')) || defaultPreferences;
  });
  
  useEffect(() => {
    // Save to localStorage when preferences change
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);
  
  return (
    <UserPreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
```

3. **Custom Hooks for State Logic**
   - Encapsulate state logic in custom hooks
   - Improve reusability and testability
   - Separate concerns and reduce component complexity

```jsx
// Example custom hook
function useSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
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
```

### Advanced Approach (Phase 3)

For more complex state management needs in the future:

1. **State Management Library**
   - Consider using Redux Toolkit for global state management
   - Provides better tools for debugging and state persistence
   - Offers more predictable state updates and middleware support

2. **Server State Management**
   - When integrating with a backend, use React Query or SWR
   - Handles caching, refetching, and synchronization with server
   - Separates server state from client state

## State Flow Diagrams

### Current State Flow

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

### Enhanced State Flow (Phase 2)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    UIStateContext                       │
│                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │             │    │             │    │             │  │
│  │  activeTab  │    │searchQuery  │    │expandedGroups│  │
│  │             │    │             │    │             │  │
│  └─────────────┘    └─────────────┘    └─────────────┘  │
│                                                         │
└─────────────────────────────┬─────────────────────────┬─┘
                              │                         │
                              ▼                         ▼
┌─────────────────────────────────────┐    ┌─────────────────────┐
│                                     │    │                     │
│         ActionsPaneHeader           │    │  ActionsPaneContent │
│                                     │    │                     │
└─────────────────────────────────────┘    └──────────┬──────────┘
                                                      │
                                                      ▼
                                           ┌─────────────────────┐
                                           │                     │
                                           │     ActionItem      │
                                           │                     │
                                           └─────────────────────┘
```

## State Update Patterns

### Current Update Patterns

1. **Direct State Updates**
   - Components update state directly using `setState` functions
   - State updates are passed down as callbacks via props

```jsx
// Example in ActionsPane
const [activeTab, setActiveTab] = useState('All');
const [searchQuery, setSearchQuery] = useState('');

// Passed down to ActionsPaneHeader
<ActionsPaneHeader 
  activeTab={activeTab}
  onTabChange={setActiveTab}
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
/>
```

2. **Data Service Updates**
   - The data service provides methods for retrieving and filtering data
   - Components call these methods to get the data they need

```jsx
// Example in ActionsPaneContent
const filteredGroups = dataService.getActionsPaneContent(
  activeTab,
  searchQuery
);
```

### Enhanced Update Patterns (Phase 2)

1. **Reducer Pattern**
   - Use reducers for more predictable state updates
   - Define actions for each type of state change
   - Handle complex state logic in reducer functions

```jsx
// Example reducer
function uiReducer(state, action) {
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
    default:
      return state;
  }
}
```

2. **Action Creators**
   - Define action creators for common state updates
   - Improve code reuse and consistency
   - Make state updates more declarative

```jsx
// Example action creators
const uiActions = {
  setActiveTab: (tab) => ({ type: 'SET_ACTIVE_TAB', payload: tab }),
  setSearchQuery: (query) => ({ type: 'SET_SEARCH_QUERY', payload: query }),
  toggleGroupExpansion: (groupId) => ({ type: 'TOGGLE_GROUP_EXPANSION', payload: groupId }),
};
```

3. **Side Effects**
   - Handle side effects using useEffect or custom hooks
   - Keep components focused on rendering
   - Separate concerns for better maintainability

```jsx
// Example side effect in a custom hook
function useFavorites() {
  const { preferences, setPreferences } = useContext(UserPreferencesContext);
  
  const toggleFavorite = useCallback((actionId) => {
    const favorites = preferences.favoriteActions || [];
    const newFavorites = favorites.includes(actionId)
      ? favorites.filter(id => id !== actionId)
      : [...favorites, actionId];
    
    setPreferences({
      ...preferences,
      favoriteActions: newFavorites
    });
    
    // Side effect: Save to localStorage
    localStorage.setItem('favoriteActions', JSON.stringify(newFavorites));
  }, [preferences, setPreferences]);
  
  return {
    favorites: preferences.favoriteActions || [],
    toggleFavorite
  };
}
```

## Implementation Plan

### Phase 1: Current Implementation (Complete)

- [x] Basic state management using React's useState
- [x] State lifting for shared state
- [x] Props drilling for data flow
- [x] Data service for data access and filtering

### Phase 2: Enhanced State Management (Next Steps)

- [ ] Create UIStateContext for UI-related state
- [ ] Implement UserPreferencesContext for user preferences
- [ ] Develop custom hooks for common state logic
- [ ] Update components to use contexts instead of props drilling
- [ ] Implement persistence for user preferences

### Phase 3: Advanced State Management (Future)

- [ ] Evaluate need for a state management library
- [ ] Implement server state management for backend integration
- [ ] Add caching and optimistic updates for better performance
- [ ] Implement state synchronization across multiple instances
- [ ] Add comprehensive state debugging tools

## Conclusion

This state management plan provides a roadmap for evolving the state management approach as the Actions Pane V4 prototype grows in complexity. By starting with a simple approach and gradually introducing more advanced patterns, we can ensure that the state management remains appropriate for the application's needs while maintaining good performance and developer experience.
