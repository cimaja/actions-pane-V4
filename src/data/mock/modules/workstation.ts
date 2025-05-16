import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'workstation',
  title: 'Workstation',
  icon: 'desktopTower24Regular',
  iconColor: 'green',
  tags: ['System'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'print-document',
    title: 'Print document',
    description: 'Send a document to the printer',
    moduleId: 'workstation'
  },
  {
    id: 'get-default-printer',
    title: 'Get default printer',
    description: 'Retrieve the current default printer',
    moduleId: 'workstation'
  },
  {
    id: 'set-default-printer',
    title: 'Set default printer',
    description: 'Change the default printer',
    moduleId: 'workstation'
  },
  {
    id: 'show-desktop',
    title: 'Show desktop',
    description: 'Minimize all windows to show the desktop',
    moduleId: 'workstation'
  },
  {
    id: 'lock-workstation',
    title: 'Lock workstation',
    description: 'Lock the computer',
    moduleId: 'workstation'
  },
  {
    id: 'play-sound',
    title: 'Play sound',
    description: 'Play a sound file',
    moduleId: 'workstation'
  },
  {
    id: 'empty-recycle-bin',
    title: 'Empty recycle bin',
    description: 'Empty the Windows recycle bin',
    moduleId: 'workstation'
  },
  {
    id: 'take-screenshot',
    title: 'Take screenshot',
    description: 'Capture a screenshot of the screen',
    moduleId: 'workstation'
  },
  {
    id: 'control-screen-saver',
    title: 'Control screen saver',
    description: 'Enable, disable, or start the screen saver',
    moduleId: 'workstation'
  },
  {
    id: 'get-screen-resolution',
    title: 'Get screen resolution',
    description: 'Get the current screen resolution',
    moduleId: 'workstation'
  },
  {
    id: 'set-screen-resolution',
    title: 'Set screen resolution',
    description: 'Change the screen resolution',
    moduleId: 'workstation'
  },
  {
    id: 'log-off-user',
    title: 'Log off user',
    description: 'Log off the current user',
    moduleId: 'workstation'
  },
  {
    id: 'shutdown-computer',
    title: 'Shutdown computer',
    description: 'Shut down the computer',
    moduleId: 'workstation'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
