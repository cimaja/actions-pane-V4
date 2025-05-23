import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'files',
  title: 'Files',
  icon: 'document24Regular',
  iconColor: 'amber',
  tags: ['Files', 'Data', 'System'], // Category tag for this module
  category: 'Data',
  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'convert-base64-to-file',
    title: 'Convert Base64 to file',
    description: 'Execute convert base64 to file action',
    moduleId: 'files'
  },
  {
    id: 'convert-binary-data-to-file',
    title: 'Convert binary data to file',
    description: 'Execute convert binary data to file action',
    moduleId: 'files'
  },
  {
    id: 'convert-file-to-base64',
    title: 'Convert file to Base64',
    description: 'Execute convert file to base64 action',
    moduleId: 'files'
  },
  {
    id: 'convert-file-to-binary-data',
    title: 'Convert file to binary data',
    description: 'Execute convert file to binary data action',
    moduleId: 'files'
  },
  {
    id: 'copy-file',
    title: 'Copy file(s)',
    description: 'Execute copy file(s) action',
    moduleId: 'files'
  },
  {
    id: 'delete-file',
    title: 'Delete file(s)',
    description: 'Execute delete file(s) action',
    moduleId: 'files'
  },
  {
    id: 'get-file-path-part',
    title: 'Get file path part',
    description: 'Execute get file path part action',
    moduleId: 'files'
  },
  {
    id: 'get-temporary-file',
    title: 'Get temporary file',
    description: 'Execute get temporary file action',
    moduleId: 'files'
  },
  {
    id: 'if-file-exists',
    title: 'If file exists',
    description: 'Execute if file exists action',
    moduleId: 'files'
  },
  {
    id: 'move-file',
    title: 'Move file(s)',
    description: 'Execute move file(s) action',
    moduleId: 'files'
  },
  {
    id: 'read-from-csv-file',
    title: 'Read from CSV file',
    description: 'Execute read from csv file action',
    moduleId: 'files'
  },
  {
    id: 'read-text-from-file',
    title: 'Read text from file',
    description: 'Execute read text from file action',
    moduleId: 'files'
  },
  {
    id: 'rename-file',
    title: 'Rename file(s)',
    description: 'Execute rename file(s) action',
    moduleId: 'files'
  },
  {
    id: 'wait-for-file',
    title: 'Wait for file',
    description: 'Execute wait for file action',
    moduleId: 'files'
  },
  {
    id: 'write-text-to-file',
    title: 'Write text to file',
    description: 'Execute write text to file action',
    moduleId: 'files'
  },
  {
    id: 'write-to-csv-file',
    title: 'Write to CSV file',
    description: 'Execute write to csv file action',
    moduleId: 'files'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
