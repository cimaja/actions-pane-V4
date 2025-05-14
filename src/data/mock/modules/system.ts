import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'system',
  title: 'System',
  icon: 'window20Regular',
  iconColor: 'green',
  tags: ['System'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'if-process',
    title: 'If process',
    description: 'Check if a specific process is running',
    moduleId: 'system'
  },
  {
    id: 'wait-for-process',
    title: 'Wait for process',
    description: 'Wait for a specific process to start or terminate',
    moduleId: 'system'
  },
  {
    id: 'run-application',
    title: 'Run application',
    description: 'Start an application or execute a command',
    moduleId: 'system'
  },
  {
    id: 'terminate-process',
    title: 'Terminate process',
    description: 'End a running process',
    moduleId: 'system'
  },
  {
    id: 'ping',
    title: 'Ping',
    description: 'Check network connectivity to a host',
    moduleId: 'system'
  },
  {
    id: 'set-windows-environment-variable',
    title: 'Set Windows environment variable',
    description: 'Create or modify a Windows environment variable',
    moduleId: 'system'
  },
  {
    id: 'get-windows-environment-variable',
    title: 'Get Windows environment variable',
    description: 'Retrieve the value of a Windows environment variable',
    moduleId: 'system'
  },
  {
    id: 'delete-windows-environment-variable',
    title: 'Delete Windows environment variable',
    description: 'Remove a Windows environment variable',
    moduleId: 'system'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
