import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'testing',
  title: 'Testing',
  icon: 'beaker24Regular',
  iconColor: 'red', // Logic category color
  tags: ['Logic'],
  items: [],
  isInstalled: true // Module is installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'assert',
    title: 'Assert',
    description: 'Assert a condition and handle success/failure',
    moduleId: 'testing'
  },
  {
    id: 'test-desktop-flow',
    title: 'Test desktop flow',
    description: 'Run and validate a desktop flow',
    moduleId: 'testing'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Add actions to the module
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
