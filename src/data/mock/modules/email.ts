import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'email',
  title: 'Email',
  icon: 'mail20Regular',
  iconColor: 'blue',
  tags: ['Integration'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'retrieve-email-messages',
    title: 'Retrieve email messages',
    description: 'Download email messages from a mail server',
    moduleId: 'email'
  },
  {
    id: 'process-email-messages',
    title: 'Process email messages',
    description: 'Parse and extract information from email messages',
    moduleId: 'email'
  },
  {
    id: 'send-email',
    title: 'Send email',
    description: 'Send an email message through a mail server',
    moduleId: 'email'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
