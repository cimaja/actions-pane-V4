import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'word',
  title: 'Word',
  icon: 'word',
  iconColor: 'blue', // Integration category color
  tags: ['Office', 'Word Processing', 'Documents'], // Category tag for this module
  category: 'Integration',
  isInstalled: false, // Module is installed by default
  items: [
    {
      id: 'launch-word',
      title: 'Launch Word',
      description: 'Launch Microsoft Word application'
    },
    {
      id: 'attach-word',
      title: 'Attach to running Word',
      description: 'Attach to an already running Word instance'
    },
    {
      id: 'save-word',
      title: 'Save Word',
      description: 'Save the active Word document'
    },
    {
      id: 'close-word',
      title: 'Close Word',
      description: 'Close Microsoft Word application'
    },
    {
      id: 'read-word',
      title: 'Read from Word document',
      description: 'Read content from a Word document'
    },
    {
      id: 'write-word',
      title: 'Write to Word document',
      description: 'Write content to a Word document'
    },
    {
      id: 'insert-image-word',
      title: 'Insert image in Word document',
      description: 'Insert an image into a Word document'
    },
    {
      id: 'find-replace-word',
      title: 'Find and replace words in Word document',
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