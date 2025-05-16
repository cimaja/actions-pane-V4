import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'logging',
  title: 'Logging',
  icon: 'documentData24Regular',
  iconColor: 'red', // Logic category color
  tags: ['Logic'],
  items: [
    {
      id: 'log-message',
      title: 'Log message',
      description: 'Write a message to the log file'
    }
  ],
  isInstalled: true // Module is installed by default
};

/**
 * Get all actions from this module
 */
export const getAllActions = (): ActionItemType[] => {
  return module.items;
};
