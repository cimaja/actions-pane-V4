// Action item type definition
export interface ActionItemType {
  id: string;
  title: string;
  icon?: string; // Making icon optional
  description?: string;
  isFavorite?: boolean;
  moduleId?: string; // Adding moduleId for actions that belong to a module
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
  icon?: string; // Adding icon property
  iconColor?: string; // Adding iconColor property for Fluent UI theming
  tags?: string[]; // Adding tags for categorization
  isInstalled?: boolean; // Adding isInstalled flag for module installation status
}

// Library item type definition
export interface LibraryItemType {
  id: string;
  title: string;
  type: 'built-in' | 'connector' | 'custom' | 'ui-collection' | 'template';
  icon?: string;
  iconColor?: string;
  tags?: string[];
  description?: string;
  author?: string;
  lastUpdated?: string;
  isInstalled: boolean;
  dependencies?: string[];
  itemCount?: number; // For UI Collections
  actions?: ActionItemType[]; // For modules and connectors
}

// Tab type definition
export type TabType = 'All' | 'Built-in' | 'Connectors' | 'Favorites';

// Library category type definition
export type LibraryCategoryType = 'Built-in' | 'Connectors' | 'Custom Actions' | 'UI Collections' | 'Templates';
