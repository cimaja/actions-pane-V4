import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'terminal-emulation',
  title: 'Terminal emulation',
  icon: 'windowConsole20Regular',
  iconColor: 'teal',
  tags: ['Scripting'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'open-terminal-session',
    title: 'Open terminal session',
    description: 'Start a new terminal emulation session',
    moduleId: 'terminal-emulation'
  },
  {
    id: 'close-terminal-session',
    title: 'Close terminal session',
    description: 'Terminate an active terminal emulation session',
    moduleId: 'terminal-emulation'
  },
  {
    id: 'move-cursor-on-terminal-session',
    title: 'Move cursor on terminal session',
    description: 'Move the cursor to a specific position in the terminal',
    moduleId: 'terminal-emulation'
  },
  {
    id: 'get-text-from-terminal-session',
    title: 'Get text from terminal session',
    description: 'Capture text from a specific region of the terminal',
    moduleId: 'terminal-emulation'
  },
  {
    id: 'set-text-on-terminal-session',
    title: 'Set text on terminal session',
    description: 'Insert text at the current cursor position in the terminal',
    moduleId: 'terminal-emulation'
  },
  {
    id: 'send-key-to-terminal-session',
    title: 'Send key to terminal session',
    description: 'Send a keyboard key or combination to the terminal',
    moduleId: 'terminal-emulation'
  },
  {
    id: 'wait-for-text-on-terminal-session',
    title: 'Wait for text on terminal session',
    description: 'Wait until specific text appears in the terminal output',
    moduleId: 'terminal-emulation'
  },
  {
    id: 'search-for-text-on-terminal-session',
    title: 'Search for text on terminal session',
    description: 'Search for specific text patterns in the terminal output',
    moduleId: 'terminal-emulation'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
