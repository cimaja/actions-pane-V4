import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'exchange-server',
  title: 'Exchange server',
  icon: 'exchange24Regular',
  iconColor: 'blue',
  tags: ['Email', 'Communication', 'Microsoft'], // Category tag for this module
  category: 'Integration',
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'connect-to-exchange-server',
    title: 'Connect to Exchange server',
    description: 'Establish a connection to a Microsoft Exchange server',
    moduleId: 'exchange-server'
  },
  {
    id: 'retrieve-exchange-email-messages',
    title: 'Retrieve Exchange email messages',
    description: 'Download email messages from an Exchange server',
    moduleId: 'exchange-server'
  },
  {
    id: 'send-exchange-email-message',
    title: 'Send Exchange email message',
    description: 'Send an email message through an Exchange server',
    moduleId: 'exchange-server'
  },
  {
    id: 'process-exchange-email-messages',
    title: 'Process Exchange email messages',
    description: 'Parse and extract information from Exchange email messages',
    moduleId: 'exchange-server'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
