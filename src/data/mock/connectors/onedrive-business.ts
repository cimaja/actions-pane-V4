import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'onedrive-business',
  title: 'OneDrive for Business',
  type: 'connector',
  icon: '/assets/connectors/OneDrive for Business.png',
  description: 'Store, access, and share your files securely from anywhere with OneDrive for Business.',
  author: 'Microsoft',
  isInstalled: true
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'onedrive-create-file',
    moduleId: 'onedrive-business',
    title: 'Create file',
    description: 'Create a new file in OneDrive for Business',
    tags: ['onedrive', 'file', 'create'],
    usage: 'Use this action to create new files in OneDrive for Business.',
    examples: [
      'Create a log file to store application events',
      'Generate and save report files automatically'
    ],
    parameters: [
      {
        name: 'folderPath',
        type: 'string',
        description: 'The folder path where the file should be created',
        required: true
      },
      {
        name: 'fileName',
        type: 'string',
        description: 'Name of the file to create',
        required: true
      },
      {
        name: 'fileContent',
        type: 'string',
        description: 'Content to write to the file',
        required: true
      }
    ]
  },
  {
    id: 'onedrive-get-file-content',
    moduleId: 'onedrive-business',
    title: 'Get file content',
    description: 'Retrieve the content of a file from OneDrive for Business',
    tags: ['onedrive', 'file', 'content', 'read'],
    usage: 'Use this action to read the content of files stored in OneDrive for Business.',
    examples: [
      'Read configuration files for your application',
      'Process data from CSV or text files stored in OneDrive'
    ],
    parameters: [
      {
        name: 'filePath',
        type: 'string',
        description: 'The full path to the file',
        required: true
      }
    ]
  },
  {
    id: 'onedrive-list-files',
    moduleId: 'onedrive-business',
    title: 'List files',
    description: 'List files and folders in a OneDrive for Business folder',
    tags: ['onedrive', 'folder', 'files', 'list'],
    usage: 'Use this action to list files and folders in a specific OneDrive for Business folder.',
    examples: [
      'Inventory all files in a project folder',
      'Find files matching certain naming patterns'
    ],
    parameters: [
      {
        name: 'folderPath',
        type: 'string',
        description: 'The folder path to list files from',
        required: true
      },
      {
        name: 'recursive',
        type: 'boolean',
        description: 'Whether to list files in subfolders as well',
        required: false
      },
      {
        name: 'fileExtension',
        type: 'string',
        description: 'Filter files by extension (e.g., .docx, .pdf)',
        required: false
      }
    ]
  },
  {
    id: 'onedrive-copy-file',
    moduleId: 'onedrive-business',
    title: 'Copy file',
    description: 'Copy a file to another location in OneDrive for Business',
    tags: ['onedrive', 'file', 'copy'],
    usage: 'Use this action to copy files between different locations in OneDrive for Business.',
    examples: [
      'Back up important files to an archive folder',
      'Copy templates to project-specific folders'
    ],
    parameters: [
      {
        name: 'sourceFilePath',
        type: 'string',
        description: 'The path to the source file',
        required: true
      },
      {
        name: 'destinationFolderPath',
        type: 'string',
        description: 'The destination folder path',
        required: true
      },
      {
        name: 'newFileName',
        type: 'string',
        description: 'New name for the copied file',
        required: false
      }
    ]
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);