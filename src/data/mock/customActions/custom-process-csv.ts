import { CustomActionItemType } from '../../../models/types';

export const customProcessCsv: CustomActionItemType = {
  id: 'custom-process-csv',
  title: 'Process CSV data',
  type: 'custom',
  icon: 'PuzzlePiece20Regular',
  iconColor: 'purple',
  author: 'David Copperfield',
  description: 'Parses a CSV file and performs data transformations.',
  lastUpdated: '2024-03-20',
  sizeMB: 0.9,
  isInstalled: false,
  actions: [
    { id: 'custom-process-csv-action1', title: 'Upload CSV file', icon: 'ArrowUpload20Regular', iconColor: 'inherit' },
    { id: 'custom-process-csv-action2', title: 'Define transformation rules', icon: 'ArrowSyncCircle20Regular', iconColor: 'inherit' },
    { id: 'custom-process-csv-action3', title: 'Preview output', icon: 'Eye20Regular', iconColor: 'inherit' },
  ],
};
