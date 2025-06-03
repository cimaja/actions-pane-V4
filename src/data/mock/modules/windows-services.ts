import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'windows-services',
  title: 'Windows services',
  icon: 'window24Regular',
  iconColor: 'green',
  tags: ['System', 'Windows', 'Services'], // Category tag for this module
  category: 'System',  author: 'Microsoft',

  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'if-service',
    title: 'If service',
    description: 'Check if a Windows service is running, stopped, or exists',
    moduleId: 'windows-services'
  },
  {
    id: 'wait-for-service',
    title: 'Wait for service',
    description: 'Wait for a Windows service to reach a specific state',
    moduleId: 'windows-services'
  },
  {
    id: 'start-service',
    title: 'Start service',
    description: 'Start a Windows service',
    moduleId: 'windows-services'
  },
  {
    id: 'stop-service',
    title: 'Stop service',
    description: 'Stop a Windows service',
    moduleId: 'windows-services'
  },
  {
    id: 'pause-service',
    title: 'Pause service',
    description: 'Pause a running Windows service',
    moduleId: 'windows-services'
  },
  {
    id: 'resume-service',
    title: 'Resume service',
    description: 'Resume a paused Windows service',
    moduleId: 'windows-services'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
