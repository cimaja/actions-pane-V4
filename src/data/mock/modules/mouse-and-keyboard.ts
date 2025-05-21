import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'mouse-and-keyboard',
  title: 'Mouse and keyboard',
  icon: 'keyboard24Regular', // Using keyboard icon for mouse and keyboard module
  iconColor: 'orange',
  tags: ['Interaction'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'block-input',
    title: 'Block Input',
    description: 'Block mouse and keyboard input',
    moduleId: 'mouse-and-keyboard'
  },
  {
    id: 'get-keyboard-identifier',
    title: 'Get keyboard identifier',
    description: 'Get the identifier of the current keyboard layout',
    moduleId: 'mouse-and-keyboard'
  },
  {
    id: 'get-mouse-position',
    title: 'Get mouse position',
    description: 'Get the current X and Y coordinates of the mouse cursor',
    moduleId: 'mouse-and-keyboard'
  },
  {
    id: 'move-mouse',
    title: 'Move mouse',
    description: 'Move the mouse cursor to specified coordinates',
    moduleId: 'mouse-and-keyboard'
  },
  {
    id: 'move-mouse-to-image',
    title: 'Move mouse to image',
    description: 'Move the mouse cursor to the center of a found image on screen',
    moduleId: 'mouse-and-keyboard'
  },
  {
    id: 'move-mouse-to-text-ocr',
    title: 'Move mouse to text on screen (OCR)',
    description: 'Move the mouse cursor to specified text found on screen using OCR',
    moduleId: 'mouse-and-keyboard'
  },
  {
    id: 'press-release-key',
    title: 'Press/release key',
    description: 'Simulate pressing or releasing a specific key',
    moduleId: 'mouse-and-keyboard'
  },
  {
    id: 'send-keys',
    title: 'Send keys',
    description: 'Send a sequence of keystrokes',
    moduleId: 'mouse-and-keyboard'
  },
  {
    id: 'send-mouse-click',
    title: 'Send mouse click',
    description: 'Simulate a mouse click (left, right, middle, double)',
    moduleId: 'mouse-and-keyboard'
  },
  {
    id: 'set-key-state',
    title: 'Set key state',
    description: 'Set the state of modifier keys (Caps Lock, Num Lock, Scroll Lock)',
    moduleId: 'mouse-and-keyboard'
  },
  {
    id: 'wait-for-mouse',
    title: 'Wait for mouse',
    description: 'Pause execution until a mouse event occurs',
    moduleId: 'mouse-and-keyboard'
  },
  {
    id: 'wait-for-shortcut-key',
    title: 'Wait for shortcut key',
    description: 'Pause execution until a specific shortcut key combination is pressed',
    moduleId: 'mouse-and-keyboard'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
