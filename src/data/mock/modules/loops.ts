import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'loops',
  title: 'Loops',
  icon: 'arrowRepeatAll24Regular', // Using code icon since ArrowRepeatAll isn't in our icon set
  iconColor: 'red',
  tags: ['Logic'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'exit-loop',
    title: 'Exit loop',
    description: 'Terminate the current loop prematurely.',
    moduleId: 'loops'
  },
  {
    id: 'for-each',
    title: 'For each',
    description: 'Iterate over a collection of items.',
    moduleId: 'loops'
  },
  {
    id: 'loop',
    title: 'Loop',
    description: 'Repeat a block of actions a specified number of times.',
    moduleId: 'loops'
  },
  {
    id: 'loop-condition',
    title: 'Loop condition',
    description: 'Repeat a block of actions as long as a condition is true.',
    moduleId: 'loops'
  },
  {
    id: 'next-loop',
    title: 'Next loop',
    description: 'Proceed to the next iteration of a loop.',
    moduleId: 'loops'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
