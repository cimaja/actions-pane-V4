import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'ocr',
  title: 'OCR',
  icon: 'scanText24Regular',
  iconColor: 'orange',
  tags: ['AI/ML', 'Image Processing', 'Data Extraction'], // Category tag for this module
  category: 'Interaction',  author: 'Microsoft',

  items: [], // This will be populated with references to the actions
  isInstalled: false // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'if-text-on-screen',
    title: 'If text on screen (OCR)',
    description: 'Check if specific text is visible on the screen using OCR',
    moduleId: 'ocr'
  },
  {
    id: 'wait-for-text-on-screen',
    title: 'Wait for text on screen (OCR)',
    description: 'Wait until specific text appears on the screen using OCR',
    moduleId: 'ocr'
  },
  {
    id: 'extract-text-with-ocr',
    title: 'Extract text with OCR',
    description: 'Extract text from a specified area of the screen using OCR',
    moduleId: 'ocr'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
