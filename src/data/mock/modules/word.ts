import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'word',
  title: 'Word',
  icon: 'word',
  iconColor: 'blue', // Integration category color
  tags: ['Integration'],
  isInstalled: false, // Module is installed by default
  items: [
    {
      id: 'launch-word',
      title: 'Launch Word',
      icon: 'word',
      description: 'Launch Microsoft Word application'
    },
    {
      id: 'attach-word',
      title: 'Attach to running Word',
      icon: 'word',
      description: 'Attach to an already running Word instance'
    },
    {
      id: 'save-word',
      title: 'Save Word',
      icon: 'word',
      description: 'Save the active Word document'
    },
    {
      id: 'close-word',
      title: 'Close Word',
      icon: 'word',
      description: 'Close Microsoft Word application'
    },
    {
      id: 'read-word',
      title: 'Read from Word document',
      icon: 'word',
      description: 'Read content from a Word document'
    },
    {
      id: 'write-word',
      title: 'Write to Word document',
      icon: 'word',
      description: 'Write content to a Word document'
    },
    {
      id: 'insert-image-word',
      title: 'Insert image in Word document',
      icon: 'word',
      description: 'Insert an image into a Word document'
    },
    {
      id: 'find-replace-word',
      title: 'Find and replace words in Word document',
      icon: 'word',
      description: 'Find and replace text in a Word document'
    }
  ]
};

/**
 * Get all actions from this module
 */
export const getAllActions = (): ActionItemType[] => {
  return module.items;
};