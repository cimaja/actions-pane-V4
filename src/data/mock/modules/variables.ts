import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'variables',
  title: 'Variables',
  icon: 'bracesVariable20Regular',
  iconColor: 'red',
  tags: ['Logic'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: true, // Set the module as installed by default
  subGroups: [] // Will be populated with subcategories
};

// Data Table subgroup
export const dataTableSubgroup: ActionGroup = {
  id: 'variables-data-table',
  title: 'Data Table',
  items: [],
  icon: 'table20Regular',
  iconColor: 'gray',
  tags: ['Logic']
};

// Number subgroup
export const numberSubgroup: ActionGroup = {
  id: 'variables-number',
  title: 'Number',
  items: [],
  icon: 'number20Regular',
  iconColor: 'gray',
  tags: ['Logic']
};

// List subgroup
export const listSubgroup: ActionGroup = {
  id: 'variables-list',
  title: 'List',
  items: [],
  icon: 'listRegular',
  iconColor: 'gray',
  tags: ['Logic']
};

// Variable Operations subgroup
export const operationsSubgroup: ActionGroup = {
  id: 'variables-operations',
  title: 'Variable Operations',
  items: [],
  icon: 'variable20Regular',
  iconColor: 'gray',
  tags: ['Logic']
};

// Module actions
// Data Table actions
export const dataTableActions: ActionItemType[] = [
  // Data Table actions
  {
    id: 'create-data-table',
    title: 'Create new data table',
    description: 'Create a new data table variable',
    moduleId: 'variables-data-table'
  },
  {
    id: 'insert-row',
    title: 'Insert row into data table',
    description: 'Add a new row to an existing data table',
    moduleId: 'variables-data-table'
  },
  {
    id: 'delete-row',
    title: 'Delete row from data table',
    description: 'Remove a row from a data table',
    moduleId: 'variables-data-table'
  },
  {
    id: 'update-data-table-item',
    title: 'Update data table item',
    description: 'Update a specific cell in a data table',
    moduleId: 'variables-data-table'
  },
  {
    id: 'find-replace-data-table',
    title: 'Find or replace in data table',
    description: 'Find and optionally replace values in a data table',
    moduleId: 'variables-data-table'
  },
  {
    id: 'insert-column',
    title: 'Insert column into data table',
    description: 'Add a new column to an existing data table',
    moduleId: 'variables-data-table'
  },
  {
    id: 'delete-column',
    title: 'Delete column from data table',
    description: 'Remove a column from a data table',
    moduleId: 'variables-data-table'
  },
  {
    id: 'delete-empty-rows',
    title: 'Delete empty rows from data table',
    description: 'Remove all empty rows from a data table',
    moduleId: 'variables-data-table'
  },
  {
    id: 'delete-duplicate-rows',
    title: 'Delete duplicate rows from data table',
    description: 'Remove duplicate rows from a data table',
    moduleId: 'variables-data-table'
  },
  {
    id: 'clear-data-table',
    title: 'Clear data table',
    description: 'Remove all data from a data table',
    moduleId: 'variables-data-table'
  },
  {
    id: 'sort-data-table',
    title: 'Sort data table',
    description: 'Sort a data table by one or more columns',
    moduleId: 'variables-data-table'
  },
  {
    id: 'filter-data-table',
    title: 'Filter data table',
    description: 'Filter a data table based on specified criteria',
    moduleId: 'variables-data-table'
  },
  {
    id: 'merge-data-tables',
    title: 'Merge data tables',
    description: 'Combine two or more data tables',
    moduleId: 'variables-data-table'
  },
  {
    id: 'join-data-tables',
    title: 'Join data tables',
    description: 'Join two data tables based on a common column',
    moduleId: 'variables-data-table'
  },
  {
    id: 'read-csv',
    title: 'Read from CSV text variable',
    description: 'Convert CSV text to a data table',
    moduleId: 'variables-data-table'
  },
  {
    id: 'data-table-to-text',
    title: 'Convert data table to text',
    description: 'Convert a data table to a text format like CSV',
    moduleId: 'variables-data-table'
  },

].sort((a, b) => a.title.localeCompare(b.title));

// Number actions
export const numberActions: ActionItemType[] = [
  {
    id: 'truncate-number',
    title: 'Truncate number',
    description: 'Truncate a number to a specified number of decimal places',
    moduleId: 'variables-number'
  },
  {
    id: 'random-number',
    title: 'Generate random number',
    description: 'Generate a random number within a specified range',
    moduleId: 'variables-number'
  },

].sort((a, b) => a.title.localeCompare(b.title));

// List actions
export const listActions: ActionItemType[] = [
  {
    id: 'clear-list',
    title: 'Clear list',
    description: 'Remove all items from a list',
    moduleId: 'variables-list'
  },
  {
    id: 'remove-list-item',
    title: 'Remove item from list',
    description: 'Remove a specific item from a list',
    moduleId: 'variables-list'
  },
  {
    id: 'sort-list',
    title: 'Sort list',
    description: 'Sort a list in ascending or descending order',
    moduleId: 'variables-list'
  },
  {
    id: 'shuffle-list',
    title: 'Shuffle list',
    description: 'Randomly reorder items in a list',
    moduleId: 'variables-list'
  },
  {
    id: 'merge-lists',
    title: 'Merge lists',
    description: 'Combine two or more lists into a single list',
    moduleId: 'variables-list'
  },
  {
    id: 'reverse-list',
    title: 'Reverse list',
    description: 'Reverse the order of items in a list',
    moduleId: 'variables-list'
  },
  {
    id: 'remove-duplicates',
    title: 'Remove duplicate items from list',
    description: 'Remove all duplicate items from a list',
    moduleId: 'variables-list'
  },
  {
    id: 'find-common-items',
    title: 'Find common list items',
    description: 'Find items that appear in multiple lists',
    moduleId: 'variables-list'
  },
  {
    id: 'subtract-lists',
    title: 'Subtract lists',
    description: 'Remove items in one list from another list',
    moduleId: 'variables-list'
  },
  {
    id: 'data-table-column-to-list',
    title: 'Retrieve data table column into list',
    description: 'Extract a column from a data table into a list',
    moduleId: 'variables-list'
  },
  {
    id: 'json-to-object',
    title: 'Convert JSON to custom object',
    description: 'Convert a JSON string to a custom object',
    moduleId: 'variables-list'
  },
  {
    id: 'object-to-json',
    title: 'Convert custom object to JSON',
    description: 'Convert a custom object to a JSON string',
    moduleId: 'variables-list'
  },
  {
    id: 'add-list-item',
    title: 'Add item to list',
    description: 'Add a new item to a list',
    moduleId: 'variables-list'
  },
  {
    id: 'create-list',
    title: 'Create new list',
    description: 'Create a new list variable',
    moduleId: 'variables-list'
  },

].sort((a, b) => a.title.localeCompare(b.title));

// Variable Operations
export const operationsActions: ActionItemType[] = [
  {
    id: 'increase-variable',
    title: 'Increase variable',
    description: 'Increase a numeric variable by a specified amount',
    moduleId: 'variables-operations'
  },
  {
    id: 'decrease-variable',
    title: 'Decrease variable',
    description: 'Decrease a numeric variable by a specified amount',
    moduleId: 'variables-operations'
  },
  {
    id: 'set-variable',
    title: 'Set variable',
    description: 'Set a variable to a specified value',
    moduleId: 'variables-operations'
  }
].sort((a, b) => a.title.localeCompare(b.title))
;

// Initialize the subgroups with their actions
dataTableSubgroup.items = dataTableActions;
numberSubgroup.items = numberActions;
listSubgroup.items = listActions;
operationsSubgroup.items = operationsActions;

// Add subgroups to the main module
module.subGroups = [
  dataTableSubgroup,
  numberSubgroup,
  listSubgroup,
  operationsSubgroup
];

// Combine all actions for the main module's items
module.items = [
  ...dataTableActions,
  ...numberActions,
  ...listActions,
  ...operationsActions
];

// Helper function to get all actions for this module
export const getAllActions = () => module.items;

// Helper function to get an action by ID
export const getActionById = (id: string) => module.items.find(action => action.id === id);

// Helper function to get actions by subgroup
export const getActionsBySubgroup = (subgroupId: string) => {
  const subgroup = module.subGroups?.find(sg => sg.id === subgroupId);
  return subgroup ? subgroup.items : [];
};
