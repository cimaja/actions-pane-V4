import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'clipboard',
  title: 'Clipboard',
  icon: 'clipboard24Regular', // Using cube icon since Paste isn't in our icon set
  iconColor: 'orange',
  tags: ['Productivity', 'System'], // Category tag for this module
  category: 'Interaction',  author: 'Microsoft',

  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'clear-clipboard-contents',
    title: 'Clear clipboard contents',
    description: 'Clear all contents from the clipboard',
    moduleId: 'clipboard'
  },
  {
    id: 'get-clipboard-text',
    title: 'Get clipboard text',
    description: 'Retrieve text content from the clipboard',
    moduleId: 'clipboard'
  },
  {
    id: 'set-clipboard-text',
    title: 'Set clipboard text',
    description: 'Set text content to the clipboard',
    moduleId: 'clipboard'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
