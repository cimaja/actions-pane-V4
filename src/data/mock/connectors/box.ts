import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'box',
  title: 'Box',
  type: 'connector',
  icon: '/assets/connectors/Box.png',
  description: 'Box™ is a service that keeps your files safe, synced, and easy to share. Connect to Box to manage your files. You can perform various actions such as upload, update, get, and delete files in Box.',
  author: 'Box',
  isInstalled: false,
  category: 'Third party',
  tags: ['box', 'storage', 'files', 'cloud', 'collaboration']
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'copy-file',
    moduleId: 'box',
    title: 'Copy file',
    description: 'Copy a file to a file path in Box.',
    tags: ['box', 'file', 'copy', 'duplicate'],
    usage: 'Use this action to create a copy of a file in Box.'
  },
  {
    id: 'create-file',
    moduleId: 'box',
    title: 'Create file',
    description: 'Uploads a file to Box.',
    tags: ['box', 'file', 'upload', 'create'],
    usage: 'Use this action to upload a new file to Box.'
  },
  {
    id: 'delete-file',
    moduleId: 'box',
    title: 'Delete file',
    description: 'Deletes an existing file from Box.',
    tags: ['box', 'file', 'delete', 'remove'],
    usage: 'Use this action to permanently delete a file from Box.'
  },
  {
    id: 'extract-archive-to-folder',
    moduleId: 'box',
    title: 'Extract archive to folder',
    description: 'Extracts an archive file into a folder in Box (example: .zip).',
    tags: ['box', 'archive', 'extract', 'zip', 'unpack'],
    usage: 'Use this action to extract the contents of an archive file in Box.'
  },
  {
    id: 'get-file-content-by-id',
    moduleId: 'box',
    title: 'Get file content using id',
    description: 'Retrieves the file content from Box using id.',
    tags: ['box', 'file', 'content', 'download', 'id'],
    usage: 'Use this action to download file content using its Box file ID.'
  },
  {
    id: 'get-file-content-by-path',
    moduleId: 'box',
    title: 'Get file content using path',
    description: 'Retrieves the file contents from Box using path.',
    tags: ['box', 'file', 'content', 'download', 'path'],
    usage: 'Use this action to download file content using its path in Box.'
  },
  {
    id: 'get-file-metadata-by-id',
    moduleId: 'box',
    title: 'Get file metadata using id',
    description: 'Retrieves the file metadata from Box using file id.',
    tags: ['box', 'file', 'metadata', 'properties', 'id'],
    usage: 'Use this action to retrieve metadata for a file using its Box file ID.'
  },
  {
    id: 'get-file-metadata-by-path',
    moduleId: 'box',
    title: 'Get file metadata using path',
    description: 'Retrieves the file metadata from Box using path.',
    tags: ['box', 'file', 'metadata', 'properties', 'path'],
    usage: 'Use this action to retrieve metadata for a file using its path in Box.'
  },
  {
    id: 'list-folder-contents',
    moduleId: 'box',
    title: 'List files and folders in folder',
    description: 'Lists the files and folders in a Box folder.',
    tags: ['box', 'folder', 'list', 'contents', 'browse'],
    usage: 'Use this action to list the contents of a specific folder in Box.'
  },
  {
    id: 'list-root-contents',
    moduleId: 'box',
    title: 'List files and folders in root folder',
    description: 'Lists the files and folders in the Box root folder.',
    tags: ['box', 'root', 'list', 'contents', 'browse'],
    usage: 'Use this action to list the contents of your Box root folder.'
  },
  {
    id: 'update-file',
    moduleId: 'box',
    title: 'Update file',
    description: 'Updates an existing file in Box.',
    tags: ['box', 'file', 'update', 'modify'],
    usage: 'Use this action to update the content of an existing file in Box.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
