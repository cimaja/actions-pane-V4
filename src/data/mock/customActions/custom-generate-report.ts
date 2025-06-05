import { CustomActionItemType } from '../../../models/types';

export const customGenerateReport: CustomActionItemType = {
  id: 'custom-generate-report',
  title: 'Generate daily report',
  type: 'custom',
  icon: 'PuzzlePiece20Regular',
  iconColor: 'purple',
  author: 'Alice Wonderland',
  description: 'Automatically generates and distributes the daily sales report.',
  lastUpdated: '2024-05-01',
  sizeMB: 2.5,
  isInstalled: false,
  actions: [
    { id: 'custom-generate-report-action1', title: 'Configure report parameters', icon: 'Settings20Regular', iconColor: 'inherit' },
    { id: 'custom-generate-report-action2', title: 'Set distribution list', icon: 'MailMultiple20Regular', iconColor: 'inherit' },
    { id: 'custom-generate-report-action3', title: 'View last run log', icon: 'DocumentText20Regular', iconColor: 'inherit' },
  ],
};
