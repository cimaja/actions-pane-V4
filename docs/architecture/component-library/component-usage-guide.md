# Actions Pane V4 Component Usage Guide

This document provides practical guidance for using and extending the components in the Actions Pane V4 prototype, including implementation examples, props and interfaces, styling guidelines, and best practices.

## Implementation Examples

### Basic Usage

Here's how to use the main `ActionsPane` component in your application:

```jsx
import React from 'react';
import { ActionsPane } from './components/ActionsPane/ActionsPane';

function App() {
  return (
    <div className="app">
      <ActionsPane />
    </div>
  );
}

export default App;
```

### Creating a Custom Action Item

You can create a custom action item component that extends the base `ActionItem`:

```jsx
import React from 'react';
import { makeStyles, Text, Badge } from '@fluentui/react-components';
import { ActionItem } from './components/ActionsPane/ActionItem';
import { ActionItemType } from './models/types';

const useStyles = makeStyles({
  badge: {
    marginLeft: '8px',
  },
});

interface CustomActionItemProps {
  item: ActionItemType;
  isNew?: boolean;
}

export const CustomActionItem: React.FC<CustomActionItemProps> = ({ 
  item, 
  isNew = false 
}) => {
  const styles = useStyles();
  
  // Render the base ActionItem with additional content
  return (
    <div>
      <ActionItem item={item} />
      {isNew && (
        <Badge appearance="filled" color="success" className={styles.badge}>
          New
        </Badge>
      )}
    </div>
  );
};
```

### Creating a Custom Tab

You can create a custom tab for the `ActionsPaneHeader`:

```jsx
import React from 'react';
import { ActionsPaneHeader } from './components/ActionsPane/ActionsPaneHeader';
import { Tab } from '@fluentui/react-components';

// Extend the base ActionsPaneHeader to add a custom tab
export const CustomActionsPaneHeader: React.FC<ActionsPaneHeaderProps> = (props) => {
  return (
    <ActionsPaneHeader {...props}>
      {/* This would be rendered if ActionsPaneHeader supported children */}
      <Tab value="Recent">Recent</Tab>
    </ActionsPaneHeader>
  );
};

// Alternative approach: create a wrapper component
export const ActionsPaneHeaderWithRecentTab: React.FC<ActionsPaneHeaderProps> = (props) => {
  // Clone the props and modify the render function
  const enhancedProps = {
    ...props,
    renderExtraTabs: () => <Tab value="Recent">Recent</Tab>,
  };
  
  return <ActionsPaneHeader {...enhancedProps} />;
};
```

### Creating a Custom Action Group

You can create a custom action group component:

```jsx
import React from 'react';
import {
  makeStyles,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Text,
  Badge,
} from '@fluentui/react-components';
import { ActionItem } from './components/ActionsPane/ActionItem';
import { ActionGroup } from './models/types';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  badge: {
    marginLeft: '8px',
  },
});

interface CustomActionGroupProps {
  group: ActionGroup;
  isExpanded?: boolean;
  onToggleExpand?: (id: string) => void;
}

export const CustomActionGroup: React.FC<CustomActionGroupProps> = ({
  group,
  isExpanded = false,
  onToggleExpand = () => {},
}) => {
  const styles = useStyles();
  
  const handleToggle = () => {
    onToggleExpand(group.id);
  };
  
  return (
    <Accordion collapsible>
      <AccordionItem value={group.id} expanded={isExpanded}>
        <AccordionHeader onClick={handleToggle}>
          <div className={styles.header}>
            <Text weight="semibold">{group.title}</Text>
            <Badge appearance="outline" className={styles.badge}>
              {group.items.length} items
            </Badge>
          </div>
        </AccordionHeader>
        <AccordionPanel>
          {group.items.map(item => (
            <ActionItem key={item.id} item={item} />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
```

## Props and Interfaces

### ActionsPane

```typescript
// No props - ActionsPane is the top-level component
```

### ActionsPaneHeader

```typescript
interface ActionsPaneHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}
```

### ActionsPaneContent

```typescript
interface ActionsPaneContentProps {
  activeTab: string;
  searchQuery: string;
}
```

### ActionItem

```typescript
interface ActionItemProps {
  item: ActionItemType;
}
```

### LibraryEntryPoint

```typescript
// No props - LibraryEntryPoint is a standalone component
```

### Data Models

```typescript
// Action item type definition
export interface ActionItemType {
  id: string;
  title: string;
  icon?: string;
  description?: string;
  isFavorite?: boolean;
  moduleId?: string;
}

// Detailed action item with additional metadata
export interface DetailedActionItem extends ActionItemType {
  moduleId: string;
  tags?: string[];
  usage?: string;
  examples?: string[];
  parameters?: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
}

// Action group type definition
export interface ActionGroup {
  id: string;
  title: string;
  items: ActionItemType[];
  subGroups?: ActionGroup[];
  icon?: string;
  tags?: string[];
}

// Tab type definition
export type TabType = 'All' | 'Built-in' | 'Connectors' | 'Favorites';
```

## Styling Guidelines

### Using makeStyles

All components in the Actions Pane V4 prototype use Fluent UI's `makeStyles` for styling:

```jsx
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground1,
    // ...more styles
  },
  // ...more style objects
});

// In the component:
const styles = useStyles();
return <div className={styles.container}>...</div>;
```

### Style Structure

Follow this structure for component styles:

1. **Container Styles**: Styles for the outermost container
2. **Section Styles**: Styles for major sections within the container
3. **Element Styles**: Styles for individual elements
4. **State Styles**: Styles for different states (hover, active, etc.)
5. **Responsive Styles**: Styles for different screen sizes

### Using Fluent UI Tokens

Use Fluent UI tokens for consistent theming:

```jsx
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalM,
  },
  header: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
  },
  // ...more style objects
});
```

### Common Style Patterns

#### Flex Layout

```jsx
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column', // or 'row'
    justifyContent: 'space-between', // or 'flex-start', 'center', etc.
    alignItems: 'center', // or 'flex-start', 'stretch', etc.
    gap: '8px', // spacing between items
  },
});
```

#### Hover Effects

```jsx
const useStyles = makeStyles({
  button: {
    backgroundColor: tokens.colorNeutralBackground1,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
});
```

#### Conditional Visibility

```jsx
const useStyles = makeStyles({
  hiddenElement: {
    visibility: 'hidden',
    '$container:hover &': {
      visibility: 'visible',
    },
  },
});
```

## Best Practices

### Component Design

1. **Single Responsibility Principle**
   - Each component should have a single, well-defined responsibility
   - Break down complex components into smaller, focused components

2. **Props API Design**
   - Use descriptive prop names
   - Provide sensible defaults for optional props
   - Use callback props for events (e.g., `onClick`, `onChange`)
   - Document props with TypeScript interfaces

3. **Component Composition**
   - Compose components from smaller, focused components
   - Use props to configure component behavior
   - Avoid deeply nested component hierarchies

### State Management

1. **Local State**
   - Use `useState` for simple component state
   - Keep state as close to where it's used as possible
   - Initialize state with sensible defaults

2. **Props Drilling**
   - Pass props down to child components
   - Use callback props for child-to-parent communication
   - Consider using Context API for deeply nested components

3. **Side Effects**
   - Use `useEffect` for side effects (data fetching, DOM manipulation, etc.)
   - Clean up side effects when components unmount
   - Specify dependencies array to control when effects run

### Performance

1. **Memoization**
   - Use `React.memo` for components that render often but rarely change
   - Use `useMemo` for expensive computations
   - Use `useCallback` for callback functions that are passed to child components

2. **Render Optimization**
   - Avoid unnecessary re-renders
   - Use appropriate keys for lists
   - Avoid inline function definitions in render methods

3. **Lazy Loading**
   - Use `React.lazy` and `Suspense` for code splitting
   - Load components only when needed
   - Consider using virtualization for long lists

### Accessibility

1. **Keyboard Navigation**
   - Ensure all interactive elements are keyboard accessible
   - Use appropriate tab order
   - Provide keyboard shortcuts for common actions

2. **Screen Readers**
   - Use semantic HTML elements
   - Provide alternative text for images
   - Use ARIA attributes when necessary

3. **Focus Management**
   - Manage focus for modal dialogs and other interactive elements
   - Provide visual indicators for focus
   - Trap focus in modal dialogs

### Testing

1. **Unit Testing**
   - Test component rendering
   - Test component props and state
   - Test component events and callbacks

2. **Integration Testing**
   - Test component interactions
   - Test data flow between components
   - Test side effects

3. **Snapshot Testing**
   - Use snapshot testing for UI regression testing
   - Update snapshots when UI changes intentionally
   - Review snapshot diffs carefully

## Common Patterns

### Conditional Rendering

```jsx
// Conditional rendering based on props
{isLoading ? (
  <LoadingSpinner />
) : items.length > 0 ? (
  <ItemList items={items} />
) : (
  <EmptyState message="No items found" />
)}

// Conditional rendering with logical AND
{hasError && <ErrorMessage error={error} />}

// Conditional rendering with optional chaining
{user?.profile?.avatar && <Avatar src={user.profile.avatar} />}
```

### Event Handling

```jsx
// Event handling with inline function
<button onClick={() => console.log('Clicked')}>Click me</button>

// Event handling with handler method
const handleClick = () => {
  console.log('Clicked');
};

<button onClick={handleClick}>Click me</button>

// Event handling with parameters
const handleItemClick = (id: string) => {
  console.log(`Clicked item ${id}`);
};

<button onClick={() => handleItemClick(item.id)}>Click me</button>
```

### List Rendering

```jsx
// Rendering a list of items
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>

// Rendering a filtered list
<ul>
  {items
    .filter(item => item.isActive)
    .map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
</ul>

// Rendering a list with index
<ul>
  {items.map((item, index) => (
    <li key={item.id}>
      {index + 1}. {item.name}
    </li>
  ))}
</ul>
```

## Extending the Component Library

### Creating New Components

1. **Create a new component file**
   - Use the naming convention `ComponentName.tsx`
   - Place the file in the appropriate directory

2. **Define the component interface**
   - Define props interface with TypeScript
   - Document props with comments

3. **Implement the component**
   - Use Fluent UI components and styling
   - Follow the established patterns

4. **Export the component**
   - Export the component as a named export
   - Consider re-exporting from an index file

### Enhancing Existing Components

1. **Composition**
   - Compose existing components to create new ones
   - Pass props to configure behavior

2. **Higher-Order Components (HOCs)**
   - Create HOCs to add functionality to existing components
   - Use HOCs for cross-cutting concerns

3. **Render Props**
   - Use render props for flexible component composition
   - Pass render functions as props

### Creating Specialized Variants

1. **Wrapper Components**
   - Create wrapper components that add functionality
   - Pass props through to the wrapped component

2. **Specialized Props**
   - Create components with specialized props
   - Use prop defaults for common configurations

3. **Context Integration**
   - Integrate components with context providers
   - Use context consumers for shared state

## Conclusion

The Actions Pane V4 component library provides a solid foundation for building a modular, maintainable, and extensible UI. By following the guidelines and best practices outlined in this document, you can effectively use and extend the component library to meet the evolving needs of the application.
