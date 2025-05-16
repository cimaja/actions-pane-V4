import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'cmd',
  title: 'CMD',
  icon: 'code24Regular',
  iconColor: 'teal',
  tags: ['Scripting'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'open-cmd-session',
    title: 'Open CMD session',
    description: 'Start a new command prompt session',
    moduleId: 'cmd'
  },
  {
    id: 'read-from-cmd-session',
    title: 'Read from CMD session',
    description: 'Capture output from a command prompt session',
    moduleId: 'cmd'
  },
  {
    id: 'write-to-cmd-session',
    title: 'Write to CMD session',
    description: 'Send commands or input to a command prompt session',
    moduleId: 'cmd'
  },
  {
    id: 'wait-for-text-on-cmd-session',
    title: 'Wait for text on CMD session',
    description: 'Wait until specific text appears in the command prompt output',
    moduleId: 'cmd'
  },
  {
    id: 'close-cmd-session',
    title: 'Close CMD session',
    description: 'Terminate an active command prompt session',
    moduleId: 'cmd'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
