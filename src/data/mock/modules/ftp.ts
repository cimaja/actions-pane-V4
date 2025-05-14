import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'ftp',
  title: 'FTP',
  icon: 'arrowCircleDownUp20Regular',
  iconColor: 'blue',
  tags: ['Integration'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: true // Module is installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'open-ftp-connection',
    title: 'Open FTP connection',
    description: 'Establish a connection to an FTP server',
    moduleId: 'ftp'
  },
  {
    id: 'list-ftp-directory',
    title: 'List FTP directory',
    description: 'Get a list of files and folders in the current FTP directory',
    moduleId: 'ftp'
  },
  {
    id: 'open-secure-ftp-connection',
    title: 'Open secure FTP connection',
    description: 'Establish a secure connection to an FTPS or SFTP server',
    moduleId: 'ftp'
  },
  {
    id: 'close-connection',
    title: 'Close connection',
    description: 'Terminate an active FTP connection',
    moduleId: 'ftp'
  },
  {
    id: 'change-working-directory',
    title: 'Change working directory',
    description: 'Navigate to a different directory on the FTP server',
    moduleId: 'ftp'
  },
  {
    id: 'download-files-from-ftp',
    title: 'Download file(s) from FTP',
    description: 'Download one or more files from the FTP server to the local system',
    moduleId: 'ftp'
  },
  {
    id: 'download-folders-from-ftp',
    title: 'Download folder(s) from FTP',
    description: 'Download one or more folders and their contents from the FTP server',
    moduleId: 'ftp'
  },
  {
    id: 'upload-files-to-ftp',
    title: 'Upload file(s) to FTP',
    description: 'Upload one or more files from the local system to the FTP server',
    moduleId: 'ftp'
  },
  {
    id: 'upload-folders-to-ftp',
    title: 'Upload folder(s) to FTP',
    description: 'Upload one or more folders and their contents to the FTP server',
    moduleId: 'ftp'
  },
  {
    id: 'delete-ftp-file',
    title: 'Delete FTP file',
    description: 'Remove a file from the FTP server',
    moduleId: 'ftp'
  },
  {
    id: 'rename-ftp-file',
    title: 'Rename FTP file',
    description: 'Change the name of a file on the FTP server',
    moduleId: 'ftp'
  },
  {
    id: 'create-ftp-directory',
    title: 'Create FTP directory',
    description: 'Create a new directory on the FTP server',
    moduleId: 'ftp'
  },
  {
    id: 'delete-ftp-directory',
    title: 'Delete FTP directory',
    description: 'Remove a directory from the FTP server',
    moduleId: 'ftp'
  },
  {
    id: 'invoke-ftp-command',
    title: 'Invoke FTP command',
    description: 'Execute a custom FTP command on the server',
    moduleId: 'ftp'
  },
  {
    id: 'synchronize-directories',
    title: 'Synchronize directories',
    description: 'Synchronize contents between a local directory and an FTP directory',
    moduleId: 'ftp'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
