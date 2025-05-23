import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'conditionals',
  title: 'Conditionals',
  icon: 'organization24Regular',
  iconColor: 'red',
  tags: ['Logic', 'Flow Control', 'Development'], // Category tag for this module
  category: 'Logic',
  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'case',
    title: 'Case',
    description: 'Define a case for a switch statement.',
    moduleId: 'conditionals'
  },
  {
    id: 'default-case',
    title: 'Default case',
    description: 'Define the default case for a switch statement.',
    moduleId: 'conditionals'
  },
  {
    id: 'else',
    title: 'Else',
    description: 'Execute actions if the preceding if/else if condition is false.',
    moduleId: 'conditionals'
  },
  {
    id: 'else-if',
    title: 'Else if',
    description: 'Execute actions if the preceding if condition is false and this condition is true.',
    moduleId: 'conditionals'
  },
  {
    id: 'if-condition', // Main If action for this module
    title: 'If',
    description: 'Execute actions based on a condition.',
    moduleId: 'conditionals'
  },
  {
    id: 'switch',
    title: 'Switch',
    description: 'Execute different blocks of actions based on the value of a variable.',
    moduleId: 'conditionals'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
