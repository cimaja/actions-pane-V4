import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'cyberark',
  title: 'CyberArk',
  icon: 'cyberark20Regular',
  iconColor: 'blue',
  tags: ['Integration'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: true // Module is installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'get-password-from-cyberark',
    title: 'Get password from CyberArk',
    description: 'Retrieve a password or credential from the CyberArk vault',
    moduleId: 'cyberark'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
