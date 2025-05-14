# Actions Pane V4 Core Components

This document provides detailed documentation for the core components of the Actions Pane V4 prototype, including their purpose, props, state, and implementation details.

## ActionsPane

The `ActionsPane` component is the main container for the Actions Pane. It manages the overall layout and state for the pane.

### Props

```typescript
// No props - ActionsPane is the top-level component
```

### State

```typescript
const [activeTab, setActiveTab] = useState<string>('All');
const [searchQuery, setSearchQuery] = useState<string>('');
```

### Styles

```typescript
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '360px',
    minWidth: '320px',
    maxWidth: '500px',
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    position: 'relative',
    resize: 'horizontal',
    overflow: 'hidden',
  },
  header: {
    flexShrink: 0,
  },
  content: {
    flex: '1 1 auto',
    overflow: 'auto',
    padding: '0 8px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  footer: {
    padding: '8px',
    borderTop: '1px solid #e0e0e0',
    flexShrink: 0,
  }
});
```

### Implementation

```jsx
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

### Usage

```jsx
// In App.tsx
import { ActionsPane } from './components/ActionsPane/ActionsPane';

function App() {
  return (
    <div className="app">
      <ActionsPane />
    </div>
  );
}
```

### Key Features

- Manages state for active tab and search query
- Provides a resizable container for the Actions Pane
- Handles layout for header, content, and footer sections
- Passes state and callbacks to child components

## ActionsPaneHeader

The `ActionsPaneHeader` component renders the header section of the Actions Pane, including the search input and tab navigation.

### Props

```typescript
interface ActionsPaneHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}
```

### Styles

```typescript
const useStyles = makeStyles({
  header: {
    padding: '12px 16px',
  },
  searchContainer: {
    marginBottom: '12px',
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabs: {
    flex: 1,
  },
});
```

### Implementation

```jsx
export const ActionsPaneHeader: React.FC<ActionsPaneHeaderProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}) => {
  const styles = useStyles();

  const handleTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    onTabChange(data.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className={styles.header}>
      <div className={styles.searchContainer}>
        <Input
          placeholder="Search actions..."
          value={searchQuery}
          onChange={handleSearchChange}
          contentBefore={<Search24Regular />}
          appearance="outline"
          size="medium"
        />
      </div>
      <div className={styles.tabsContainer}>
        <TabList
          className={styles.tabs}
          selectedValue={activeTab}
          onTabSelect={handleTabSelect}
          size="small"
        >
          <Tab value="All">All</Tab>
          <Tab value="Built-in">Built-in</Tab>
          <Tab value="Connectors">Connectors</Tab>
          <Tab value="Favorites">Favorites</Tab>
        </TabList>
        <Button
          icon={<Filter24Regular />}
          appearance="subtle"
          aria-label="Filter options"
          title="Filter options"
        />
      </div>
    </div>
  );
};
```

### Usage

```jsx
// In ActionsPane.tsx
import { ActionsPaneHeader } from './ActionsPaneHeader';

// Inside the ActionsPane component:
<ActionsPaneHeader 
  activeTab={activeTab}
  onTabChange={setActiveTab}
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
/>
```

### Key Features

- Renders search input for filtering actions
- Provides tab navigation for different categories
- Includes filter button for additional filtering options
- Calls callbacks when user interacts with search or tabs

## ActionsPaneContent

The `ActionsPaneContent` component renders the main content of the Actions Pane, including action groups and items.

### Props

```typescript
interface ActionsPaneContentProps {
  activeTab: string;
  searchQuery: string;
}
```

### Styles

```typescript
const useStyles = makeStyles({
  container: {
    padding: '8px 0',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    overflowY: 'auto',
    minHeight: 0,
  },
  groupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  seeAllLink: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
  },
  emptyState: {
    padding: '16px',
    textAlign: 'center',
    color: tokens.colorNeutralForeground3,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### Implementation

```jsx
export const ActionsPaneContent: React.FC<ActionsPaneContentProps> = ({
  activeTab,
  searchQuery,
}) => {
  const styles = useStyles();

  // Get filtered groups from the data service
  const filteredGroups = dataService.getActionsPaneContent(
    activeTab as TabType,
    searchQuery
  );

  if (filteredGroups.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Text>No actions found. Try adjusting your search or filters.</Text>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Accordion collapsible multiple defaultOpenItems={filteredGroups.map(group => group.id)}>
        {filteredGroups.map(group => (
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
                    console.log(`See all for ${group.title}`);
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
                <Accordion collapsible multiple>
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
                        
                        {/* Render nested subgroups if they exist */}
                        {subGroup.subGroups && subGroup.subGroups.length > 0 && (
                          <Accordion collapsible multiple>
                            {subGroup.subGroups.map(nestedSubGroup => (
                              <AccordionItem key={nestedSubGroup.id} value={nestedSubGroup.id}>
                                <AccordionHeader>
                                  <Text>{nestedSubGroup.title}</Text>
                                </AccordionHeader>
                                <AccordionPanel>
                                  {nestedSubGroup.items.map(item => (
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
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
```

### Usage

```jsx
// In ActionsPane.tsx
import { ActionsPaneContent } from './ActionsPaneContent';

// Inside the ActionsPane component:
<ActionsPaneContent 
  activeTab={activeTab}
  searchQuery={searchQuery}
/>
```

### Key Features

- Fetches and displays filtered action groups based on active tab and search query
- Renders action groups as accordion items
- Supports nested subgroups for complex hierarchies
- Displays empty state when no actions match the filters
- Renders ActionItem components for each action

## ActionItem

The `ActionItem` component renders an individual action item with favorite functionality.

### Props

```typescript
interface ActionItemProps {
  item: ActionItemType;
}
```

### State

```typescript
const [isFavorite, setIsFavorite] = useState(false);
```

### Styles

```typescript
const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 4px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '2px 0',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  icon: {
    marginRight: '8px',
    fontSize: '20px',
    width: '24px',
    textAlign: 'center',
  },
  title: {
    flex: 1,
  },
  favoriteButton: {
    visibility: 'hidden',
    '$container:hover &': {
      visibility: 'visible',
    },
  },
  visibleFavorite: {
    visibility: 'visible',
  },
});
```

### Implementation

```jsx
export const ActionItem: React.FC<ActionItemProps> = ({ item }) => {
  const styles = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Use the actual description from the action data or a fallback message
  const description = item.description || `No description available for ${item.title}.`;

  return (
    <Tooltip content={description} relationship="description" withArrow>
      <div className={styles.container} onClick={() => console.log(`Clicked on ${item.title}`)}>
        <span className={styles.icon}>{item.icon}</span>
        <Text className={styles.title}>{item.title}</Text>
        <Button
          className={isFavorite ? styles.visibleFavorite : styles.favoriteButton}
          icon={isFavorite ? <Star24Filled /> : <Star24Regular />}
          appearance="transparent"
          size="small"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        />
      </div>
    </Tooltip>
  );
};
```

### Usage

```jsx
// In ActionsPaneContent.tsx
import { ActionItem } from './ActionItem';

// Inside the ActionsPaneContent component:
{group.items.map(item => (
  <ActionItem key={item.id} item={item} />
))}
```

### Key Features

- Renders an action item with icon, title, and favorite button
- Provides tooltip with action description
- Manages favorite state locally
- Shows favorite button on hover or when favorited
- Handles click events for the action and favorite button

## LibraryEntryPoint

The `LibraryEntryPoint` component renders a link to the Library Modal in the footer of the Actions Pane.

### Props

```typescript
// No props - LibraryEntryPoint is a standalone component
```

### Styles

```typescript
const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    cursor: 'pointer',
    padding: '4px 0',
    '&:hover': {
      color: tokens.colorBrandForeground2Hover,
    },
  },
  label: {
    fontWeight: tokens.fontWeightSemibold,
  },
});
```

### Implementation

```jsx
export const LibraryEntryPoint: React.FC = () => {
  const styles = useStyles();

  const handleOpenLibrary = () => {
    // This would open the Library Modal
    console.log('Opening Library Modal');
  };

  return (
    <div className={styles.container} onClick={handleOpenLibrary}>
      <Text className={styles.label}>Library</Text>
      <ChevronRight24Regular />
    </div>
  );
};
```

### Usage

```jsx
// In ActionsPane.tsx
import { LibraryEntryPoint } from './LibraryEntryPoint';

// Inside the ActionsPane component:
<div className={styles.footer}>
  <LibraryEntryPoint />
</div>
```

### Key Features

- Renders a link to the Library Modal
- Provides visual feedback on hover
- Handles click events to open the Library Modal (currently just logs to console)
- Uses Fluent UI icons and styling

## Component Dependencies

The core components have the following dependencies:

### External Dependencies

- **React**: For component structure and hooks
- **Fluent UI**: For UI components and styling
  - makeStyles
  - Input
  - TabList, Tab
  - Button
  - Accordion, AccordionItem, AccordionHeader, AccordionPanel
  - Text
  - Tooltip
  - Divider
  - Icons (Search24Regular, Filter24Regular, Star24Regular, Star24Filled, ChevronRight24Regular)

### Internal Dependencies

- **Data Models**: Types and interfaces for data
  - ActionItemType
  - TabType
- **Data Service**: For fetching and filtering data
  - dataService.getActionsPaneContent

## Component Lifecycle

The core components follow this lifecycle:

1. **Initialization**
   - Components are initialized with default state
   - Styles are created using makeStyles

2. **Rendering**
   - Parent components render child components with props
   - Child components render based on props and local state

3. **User Interaction**
   - User interacts with components (clicks, types, etc.)
   - Event handlers update state or call callbacks

4. **Re-rendering**
   - Components re-render when props or state change
   - Data is re-fetched and filtered as needed

## Best Practices

When working with the core components, follow these best practices:

1. **Props Typing**
   - Always define prop interfaces with TypeScript
   - Use optional props (?) for non-required props
   - Provide default values for optional props

2. **State Management**
   - Keep state as close to where it's used as possible
   - Lift state up only when necessary
   - Use callbacks for child-to-parent communication

3. **Styling**
   - Use makeStyles for component styling
   - Use Fluent UI tokens for consistent theming
   - Follow the styling patterns established in the core components

4. **Component Composition**
   - Compose components from smaller, focused components
   - Use props to configure component behavior
   - Avoid deeply nested component hierarchies

5. **Performance**
   - Memoize expensive computations
   - Avoid unnecessary re-renders
   - Use appropriate React hooks for performance optimization

## Conclusion

The core components of the Actions Pane V4 prototype provide a solid foundation for building the user interface. By understanding these components and their interactions, you can extend and enhance the Actions Pane to meet new requirements and improve the user experience.
