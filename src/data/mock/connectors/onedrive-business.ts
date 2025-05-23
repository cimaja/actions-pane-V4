import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'onedrive-business',
  title: 'OneDrive for Business',
  type: 'connector',
  icon: '/assets/connectors/OneDrive for Business.png',
  description: 'OneDrive for Business is a cloud storage, file hosting service that allows users to sync files and later access them from a web browser or mobile device. Connect to OneDrive for Business to manage your files. You can perform various actions such as upload, update, get, and delete files.',
  author: 'Microsoft',
  isInstalled: true,
  category: 'Microsoft' as const
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'convert-file-preview',
    moduleId: 'onedrive-business',
    title: 'Convert file (Preview)',
    description: 'This operation converts a file to another format. The list of supported conversions can be found at https://aka.ms/onedriveconversions',
    tags: ['onedrive', 'file', 'convert', 'format'],
    usage: 'Use this action to convert a file to a different format.'
  },
  {
    id: 'convert-file-using-path-preview',
    moduleId: 'onedrive-business',
    title: 'Convert file using path (Preview)',
    description: 'This operation converts a file to another format using the path. The list of supported conversions can be found at https://aka.ms/onedriveconversions',
    tags: ['onedrive', 'file', 'convert', 'path'],
    usage: 'Use this action to convert a file to a different format using its path.'
  },
  {
    id: 'copy-file',
    moduleId: 'onedrive-business',
    title: 'Copy file',
    description: 'This operation copies a file within OneDrive.',
    tags: ['onedrive', 'file', 'copy'],
    usage: 'Use this action to create a copy of a file in OneDrive.'
  },
  {
    id: 'copy-file-using-path',
    moduleId: 'onedrive-business',
    title: 'Copy file using path',
    description: 'This operation copies a file within OneDrive by path.',
    tags: ['onedrive', 'file', 'copy', 'path'],
    usage: 'Use this action to create a copy of a file in OneDrive using its path.'
  },
  {
    id: 'create-file',
    moduleId: 'onedrive-business',
    title: 'Create file',
    description: 'This operation creates a file.',
    tags: ['onedrive', 'file', 'create'],
    usage: 'Use this action to create a new file in OneDrive.'
  },
  {
    id: 'create-share-link',
    moduleId: 'onedrive-business',
    title: 'Create share link',
    description: 'This operation creates a share link for a file.',
    tags: ['onedrive', 'file', 'share', 'link'],
    usage: 'Use this action to generate a shareable link for a file.'
  },
  {
    id: 'create-share-link-by-path',
    moduleId: 'onedrive-business',
    title: 'Create share link by path',
    description: 'This operation creates a share link for a file using the path.',
    tags: ['onedrive', 'file', 'share', 'link', 'path'],
    usage: 'Use this action to generate a shareable link for a file using its path.'
  },
  {
    id: 'delete-file',
    moduleId: 'onedrive-business',
    title: 'Delete file',
    description: 'This operation deletes a file.',
    tags: ['onedrive', 'file', 'delete'],
    usage: 'Use this action to permanently remove a file from OneDrive.'
  },
  {
    id: 'extract-archive-to-folder',
    moduleId: 'onedrive-business',
    title: 'Extract archive to folder',
    description: 'This operation extracts an archive file into a folder (example: .zip). Maximum archive size is 50 MB and 100 files inside.',
    tags: ['onedrive', 'archive', 'extract', 'zip'],
    usage: 'Use this action to extract the contents of an archive file into a folder.'
  },
  {
    id: 'find-files-in-folder',
    moduleId: 'onedrive-business',
    title: 'Find files in folder',
    description: 'This operation finds files within a folder using search or name pattern match.',
    tags: ['onedrive', 'file', 'search', 'find'],
    usage: 'Use this action to search for specific files within a folder.'
  },
  {
    id: 'find-files-in-folder-by-path',
    moduleId: 'onedrive-business',
    title: 'Find files in folder by path',
    description: 'This operation finds files within a folder by path using search or name pattern match.',
    tags: ['onedrive', 'file', 'search', 'find', 'path'],
    usage: 'Use this action to search for specific files within a folder using its path.'
  },
  {
    id: 'get-file-content',
    moduleId: 'onedrive-business',
    title: 'Get file content',
    description: 'This operation gets the content of a file.',
    tags: ['onedrive', 'file', 'content', 'download'],
    usage: 'Use this action to retrieve the content of a file from OneDrive.'
  },
  {
    id: 'get-file-content-using-path',
    moduleId: 'onedrive-business',
    title: 'Get file content using path',
    description: 'This operation gets the content of a file using the path.',
    tags: ['onedrive', 'file', 'content', 'download', 'path'],
    usage: 'Use this action to retrieve the content of a file from OneDrive using its path.'
  },
  {
    id: 'get-file-metadata',
    moduleId: 'onedrive-business',
    title: 'Get file metadata',
    description: 'This operation gets the metadata for a file.',
    tags: ['onedrive', 'file', 'metadata'],
    usage: 'Use this action to retrieve information about a file such as size, creation date, etc.'
  },
  {
    id: 'get-file-metadata-using-path',
    moduleId: 'onedrive-business',
    title: 'Get file metadata using path',
    description: 'This operation gets the metadata of a file using the path.',
    tags: ['onedrive', 'file', 'metadata', 'path'],
    usage: 'Use this action to retrieve information about a file using its path.'
  },
  {
    id: 'get-file-thumbnail',
    moduleId: 'onedrive-business',
    title: 'Get file thumbnail',
    description: 'This operation gets the thumbnail of a file. The thumbnail will only be valid for 6 hours.',
    tags: ['onedrive', 'file', 'thumbnail', 'preview'],
    usage: 'Use this action to retrieve a thumbnail preview of a file.'
  },
  {
    id: 'list-files-in-folder',
    moduleId: 'onedrive-business',
    title: 'List files in folder',
    description: 'This operation gets the list of files and subfolders in a folder.',
    tags: ['onedrive', 'file', 'list', 'folder'],
    usage: 'Use this action to get a list of all files and subfolders within a specific folder.'
  },
  {
    id: 'list-files-in-root-folder',
    moduleId: 'onedrive-business',
    title: 'List files in root folder',
    description: 'This operation gets the list of files and subfolders in the root folder.',
    tags: ['onedrive', 'file', 'list', 'root'],
    usage: 'Use this action to get a list of all files and subfolders in the root directory.'
  },
  {
    id: 'move-or-rename-a-file',
    moduleId: 'onedrive-business',
    title: 'Move or rename a file',
    description: 'This operation moves or renames a file.',
    tags: ['onedrive', 'file', 'move', 'rename'],
    usage: 'Use this action to move a file to a different location or change its name.'
  },
  {
    id: 'move-or-rename-a-file-using-path',
    moduleId: 'onedrive-business',
    title: 'Move or rename a file using path',
    description: 'This operation moves or renames a file using the path.',
    tags: ['onedrive', 'file', 'move', 'rename', 'path'],
    usage: 'Use this action to move or rename a file using its path.'
  },
  {
    id: 'update-file',
    moduleId: 'onedrive-business',
    title: 'Update file',
    description: 'This operation updates a file.',
    tags: ['onedrive', 'file', 'update', 'edit'],
    usage: 'Use this action to update the content of an existing file.'
  },
  {
    id: 'upload-file-from-url',
    moduleId: 'onedrive-business',
    title: 'Upload file from URL',
    description: 'This operation uploads a file from a URL to OneDrive.',
    tags: ['onedrive', 'file', 'upload', 'url'],
    usage: 'Use this action to download a file from a URL and save it to OneDrive.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);