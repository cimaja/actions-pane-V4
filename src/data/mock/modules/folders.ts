import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'folders',
  title: 'Folders',
  icon: 'folder24Regular',
  iconColor: 'amber',
  tags: ['Files', 'Data', 'System'], // Category tag for this module
  category: 'Data',
  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'if-folder-exists',
    title: 'If folder exists',
    description: 'Execute if folder exists action',
    moduleId: 'folders'
  },
  {
    id: 'get-files-in-folder',
    title: 'Get files in folder',
    description: 'Execute get files in folder action',
    moduleId: 'folders'
  },
  {
    id: 'get-special-folder',
    title: 'Get special folder',
    description: 'Execute get special folder action',
    moduleId: 'folders'
  },
  {
    id: 'get-subfolders-in-folder',
    title: 'Get subfolders in folder',
    description: 'Execute get subfolders in folder action',
    moduleId: 'folders'
  },
  {
    id: 'copy-folder',
    title: 'Copy folder',
    description: 'Execute copy folder action',
    moduleId: 'folders'
  },
  {
    id: 'create-folder',
    title: 'Create folder',
    description: 'Execute create folder action',
    moduleId: 'folders'
  },
  {
    id: 'delete-folder',
    title: 'Delete folder',
    description: 'Execute delete folder action',
    moduleId: 'folders'
  },
  {
    id: 'empty-folder',
    title: 'Empty folder',
    description: 'Execute empty folder action',
    moduleId: 'folders'
  },
  {
    id: 'move-folder',
    title: 'Move folder',
    description: 'Execute move folder action',
    moduleId: 'folders'
  },
  {
    id: 'rename-folder',
    title: 'Rename folder',
    description: 'Execute rename folder action',
    moduleId: 'folders'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
