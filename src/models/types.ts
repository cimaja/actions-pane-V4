// Action item type definition
export interface ActionItemType {
  id: string;
  title: string;
  icon?: string; // Making icon optional
  iconColor?: string; // Adding iconColor property for Fluent UI theming
  description?: string;
  isFavorite?: boolean;
  moduleId?: string; // Adding moduleId for actions that belong to a module
  tags?: string[]; // Adding tags for categorization and search
}

// Detailed action item with additional metadata
export interface DetailedActionItem extends ActionItemType {
  moduleId: string;
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
  category?: ModuleCategory; // Adding category for module/connector classification
  isInstalled?: boolean; // Adding isInstalled flag for module installation status
}

// Module categories
export type ModuleCategory = 
  | 'Data' 
  | 'Integration' 
  | 'Interaction' 
  | 'Logic' 
  | 'Scripting' 
  | 'System'
  | 'Connectors';

// Connector categories
export type ConnectorCategory = 
  | 'Microsoft'
  | 'Third party'
  | 'Document Management'
  | 'Development & IT'
  | 'AI & Machine Learning'
  | 'Cloud Storage'
  | 'Security'
  | 'Maps & Location'
  | 'Productivity';

// Library item type definition
export interface LibraryItemType {
  id: string;
  title: string;
  type: 'built-in' | 'connector' | 'custom' | 'ui-collection' | 'template';
  icon?: string;
  iconColor?: string;
  tags?: string[];
  category?: ModuleCategory | ConnectorCategory; // Single category for the item
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
