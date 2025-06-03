import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'date-time',
  title: 'Date and time',
  icon: 'clock24Regular',
  iconColor: 'amber',
  tags: ['Data', 'DateTime', 'Utilities'], // Category tag for this module
  category: 'Data',  author: 'Microsoft',

  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'add-to-datetime',
    title: 'Add to datetime',
    description: 'Execute add to datetime action',
    moduleId: 'date-time'
  },
  {
    id: 'get-current-date-time',
    title: 'Get current date and time',
    description: 'Execute get current date and time action',
    moduleId: 'date-time'
  },
  {
    id: 'subtract-dates',
    title: 'Subtract dates',
    description: 'Execute subtract dates action',
    moduleId: 'date-time'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
