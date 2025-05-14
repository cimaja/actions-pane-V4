import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'database',
  title: 'Database',
  icon: 'database20Regular',
  iconColor: 'blue',
  tags: ['Integration'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'open-sql-connection',
    title: 'Open SQL connection',
    description: 'Establish a connection to a SQL database server',
    moduleId: 'database'
  },
  {
    id: 'execute-sql-statement',
    title: 'Execute SQL statement',
    description: 'Run a SQL query or command on the connected database',
    moduleId: 'database'
  },
  {
    id: 'close-sql-connection',
    title: 'Close SQL connection',
    description: 'Terminate an active SQL database connection',
    moduleId: 'database'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
