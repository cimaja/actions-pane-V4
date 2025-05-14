import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'pdf',
  title: 'PDF',
  icon: 'pdf',
  iconColor: 'amber',
  tags: ['Data'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: true // Set as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'extract-images-from-pdf',
    title: 'Extract images from PDF',
    description: 'Execute extract images from pdf action',
    moduleId: 'pdf'
  },
  {
    id: 'extract-pdf-file-pages',
    title: 'Extract PDF file pages to new PDF file',
    description: 'Execute extract pdf file pages to new pdf file action',
    moduleId: 'pdf'
  },
  {
    id: 'extract-tables-from-pdf',
    title: 'Extract tables from PDF',
    description: 'Execute extract tables from pdf action',
    moduleId: 'pdf'
  },
  {
    id: 'extract-text-from-pdf',
    title: 'Extract text from PDF',
    description: 'Execute extract text from pdf action',
    moduleId: 'pdf'
  },
  {
    id: 'merge-pdf-files',
    title: 'Merge PDF files',
    description: 'Execute merge pdf files action',
    moduleId: 'pdf'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
