import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'dropbox',
  title: 'Dropbox',
  type: 'connector',
  icon: '/assets/connectors/Dropbox.png',
  description: 'Dropbox is a service that keeps your files safe, synced, and easy to share. Connect to Dropbox to manage your files. You can perform various actions such as upload, update, get, and delete files in Dropbox.',
  author: 'Dropbox',
  isInstalled: false,
  category: 'Third party' as const,
  tags: ['dropbox', 'storage', 'files', 'cloud', 'sharing']
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'copy-file',
    moduleId: 'dropbox',
    title: 'Copy file',
    description: 'This operation copies a file to Dropbox.',
    tags: ['dropbox', 'file', 'copy', 'duplicate'],
    usage: 'Use this action to create a copy of a file in your Dropbox.'
  },
  {
    id: 'create-file',
    moduleId: 'dropbox',
    title: 'Create file',
    description: 'This operation creates a file in a folder.',
    tags: ['dropbox', 'file', 'create', 'upload'],
    usage: 'Use this action to upload a new file to your Dropbox.'
  },
  {
    id: 'delete-file',
    moduleId: 'dropbox',
    title: 'Delete file',
    description: 'This operation deletes a file.',
    tags: ['dropbox', 'file', 'delete', 'remove'],
    usage: 'Use this action to permanently delete a file from your Dropbox.'
  },
  {
    id: 'extract-archive-to-folder',
    moduleId: 'dropbox',
    title: 'Extract archive to folder',
    description: 'This operation extracts an archive file into a folder (example: .zip).',
    tags: ['dropbox', 'archive', 'extract', 'zip', 'unpack'],
    usage: 'Use this action to extract the contents of an archive file in your Dropbox.'
  },
  {
    id: 'get-file-content',
    moduleId: 'dropbox',
    title: 'Get file content',
    description: 'This operation gets the content of a file.',
    tags: ['dropbox', 'file', 'content', 'download'],
    usage: 'Use this action to download the content of a file from your Dropbox.'
  },
  {
    id: 'get-file-content-using-path',
    moduleId: 'dropbox',
    title: 'Get file content using path',
    description: 'This operation gets the content of a file using the path.',
    tags: ['dropbox', 'file', 'content', 'download', 'path'],
    usage: 'Use this action to download file content using its full path in Dropbox.'
  },
  {
    id: 'get-file-metadata',
    moduleId: 'dropbox',
    title: 'Get file metadata',
    description: 'This operation gets the metadata for a file.',
    tags: ['dropbox', 'file', 'metadata', 'properties'],
    usage: 'Use this action to retrieve metadata for a file in your Dropbox.'
  },
  {
    id: 'get-file-metadata-using-path',
    moduleId: 'dropbox',
    title: 'Get file metadata using path',
    description: 'This operation gets the metadata of a file using the path.',
    tags: ['dropbox', 'file', 'metadata', 'properties', 'path'],
    usage: 'Use this action to retrieve file metadata using its full path in Dropbox.'
  },
  {
    id: 'list-files-in-folder',
    moduleId: 'dropbox',
    title: 'List files in folder',
    description: 'This operation gets the list of files and subfolders in a folder.',
    tags: ['dropbox', 'folder', 'list', 'browse', 'contents'],
    usage: 'Use this action to list the contents of a specific folder in your Dropbox.'
  },
  {
    id: 'list-files-in-root-folder',
    moduleId: 'dropbox',
    title: 'List files in root folder',
    description: 'This operation gets the list of files and subfolders in the root folder.',
    tags: ['dropbox', 'root', 'list', 'browse', 'contents'],
    usage: 'Use this action to list the contents of your Dropbox root folder.'
  },
  {
    id: 'update-file',
    moduleId: 'dropbox',
    title: 'Update file',
    description: 'This operation updates a file.',
    tags: ['dropbox', 'file', 'update', 'modify'],
    usage: 'Use this action to update the content of an existing file in your Dropbox.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
