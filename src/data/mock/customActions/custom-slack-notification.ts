import { CustomActionItemType } from '../../../models/types';

export const customSlackNotification: CustomActionItemType = {
  id: 'custom-slack-notification',
  title: 'Send Slack notification',
  type: 'custom',
  icon: 'PuzzlePiece20Regular',
  iconColor: 'purple',
  author: 'Carol Danvers',
  description: 'Sends a custom message to a specified Slack channel.',
  lastUpdated: '2024-05-10',
  sizeMB: 3.1,
  isInstalled: false,
  actions: [
    { id: 'custom-slack-notification-action1', title: 'Compose message', icon: 'Chat20Regular', iconColor: 'inherit' },
    { id: 'custom-slack-notification-action2', title: 'Select channel', icon: 'Channel20Regular', iconColor: 'inherit' },
    { id: 'custom-slack-notification-action3', title: 'Send test message', icon: 'Send20Regular', iconColor: 'inherit' },
  ],
};
