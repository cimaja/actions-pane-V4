import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'access',
  title: 'Access',
  icon: 'access20Regular',
  iconColor: 'blue',
  category: 'Integration',
  tags: ['Office', 'Integration', 'Database'],
  author: 'Microsoft',
  items: [],
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'launch-access',
    title: 'Launch Access',
    description: 'Launch Microsoft Access application',
    moduleId: 'access'
  },
  {
    id: 'read-access-table',
    title: 'Read Access table',
    description: 'Read data from an Access database table',
    moduleId: 'access'
  },
  {
    id: 'run-access-query',
    title: 'Run Access query',
    description: 'Execute a query in an Access database',
    moduleId: 'access'
  },
  {
    id: 'run-access-macro',
    title: 'Run Access macro',
    description: 'Execute a macro in an Access database',
    moduleId: 'access'
  },
  {
    id: 'close-access',
    title: 'Close Access',
    description: 'Close Microsoft Access application',
    moduleId: 'access'
  }
];

// Add actions to the module
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
