import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'message-boxes',
  title: 'Message boxes',
  icon: 'channel24Regular', // Using channel icon for message boxes
  iconColor: 'orange',
  tags: ['Interaction'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'display-custom-form',
    title: 'Display custom form',
    description: 'Display a custom form for user input.',
    moduleId: 'message-boxes'
  },
  {
    id: 'display-input-dialog',
    title: 'Display input dialog',
    description: 'Display a dialog to get input from the user.',
    moduleId: 'message-boxes'
  },
  {
    id: 'display-message',
    title: 'Display message',
    description: 'Display a message box with custom text and buttons.',
    moduleId: 'message-boxes'
  },
  {
    id: 'display-select-date-dialog',
    title: 'Display select date dialog',
    description: 'Display a dialog to allow the user to select a date.',
    moduleId: 'message-boxes'
  },
  {
    id: 'display-select-file-dialog',
    title: 'Display select file dialog',
    description: 'Display a dialog to allow the user to select a file.',
    moduleId: 'message-boxes'
  },
  {
    id: 'display-select-folder-dialog',
    title: 'Display select folder dialog',
    description: 'Display a dialog to allow the user to select a folder.',
    moduleId: 'message-boxes'
  },
  {
    id: 'display-select-from-list-dialog',
    title: 'Display select from list dialog',
    description: 'Display a dialog to allow the user to select an item from a list.',
    moduleId: 'message-boxes'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
