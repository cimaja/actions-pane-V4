import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'http',
  title: 'HTTP',
  icon: 'customGlobe20Regular',
  iconColor: 'blue',
  tags: ['Integration'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'download-from-web',
    title: 'Download from web',
    description: 'Download a file from a URL to the local file system',
    moduleId: 'http'
  },
  {
    id: 'invoke-soap-web-service',
    title: 'Invoke SOAP web service',
    description: 'Call a SOAP web service and process the response',
    moduleId: 'http'
  },
  {
    id: 'invoke-web-service',
    title: 'Invoke web service',
    description: 'Call a REST API and process the response',
    moduleId: 'http'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
