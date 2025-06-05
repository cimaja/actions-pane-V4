import { CustomActionItemType } from '../../../models/types';

export const customArchiveFiles: CustomActionItemType = {
  id: 'custom-archive-files',
  title: 'Archive old files',
  type: 'custom',
  icon: 'PuzzlePiece20Regular',
  iconColor: 'purple',
  author: 'Bob The Builder',
  description: 'Archives files older than 90 days from the specified directory.',
  lastUpdated: '2024-04-15',
  sizeMB: 1.8,
  isInstalled: false,
  actions: [
    { id: 'custom-archive-files-action1', title: 'Specify target directory', icon: 'FolderOpen20Regular', iconColor: 'inherit' },
    { id: 'custom-archive-files-action2', title: 'Define age threshold', icon: 'CalendarClock20Regular', iconColor: 'inherit' },
    { id: 'custom-archive-files-action3', title: 'Run archival process', icon: 'PlayCircle20Regular', iconColor: 'inherit' },
  ],
};
