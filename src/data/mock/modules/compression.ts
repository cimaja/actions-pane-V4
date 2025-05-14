import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'compression',
  title: 'Compression',
  icon: 'folderZip20Regular',
  iconColor: 'amber',
  tags: ['Data'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'unzip-files',
    title: 'Unzip files',
    description: 'Execute unzip files action',
    moduleId: 'compression'
  },
  {
    id: 'zip-files',
    title: 'Zip files',
    description: 'Execute zip files action',
    moduleId: 'compression'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
