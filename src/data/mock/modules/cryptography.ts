import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'cryptography',
  title: 'Cryptography',
  icon: 'lockClosed24Regular',
  iconColor: 'teal',
  tags: ['Scripting'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'encrypt-text-with-aes',
    title: 'Encrypt text with AES',
    description: 'Encrypt text using AES encryption algorithm',
    moduleId: 'cryptography'
  },
  {
    id: 'decrypt-text-with-aes',
    title: 'Decrypt text with AES',
    description: 'Decrypt text using AES encryption algorithm',
    moduleId: 'cryptography'
  },
  {
    id: 'encrypt-from-file-with-aes',
    title: 'Encrypt from file with AES',
    description: 'Encrypt file contents using AES encryption algorithm',
    moduleId: 'cryptography'
  },
  {
    id: 'decrypt-to-file-with-aes',
    title: 'Decrypt to file with AES',
    description: 'Decrypt text to a file using AES encryption algorithm',
    moduleId: 'cryptography'
  },
  {
    id: 'hash-text',
    title: 'Hash text',
    description: 'Generate a hash value from text',
    moduleId: 'cryptography'
  },
  {
    id: 'hash-from-file',
    title: 'Hash from file',
    description: 'Generate a hash value from file contents',
    moduleId: 'cryptography'
  },
  {
    id: 'hash-text-with-key',
    title: 'Hash text with key',
    description: 'Generate a keyed hash value (HMAC) from text',
    moduleId: 'cryptography'
  },
  {
    id: 'hash-from-file-with-key',
    title: 'Hash from file with key',
    description: 'Generate a keyed hash value (HMAC) from file contents',
    moduleId: 'cryptography'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
