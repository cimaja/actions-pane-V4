import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'bitly',
  title: 'Bitly',
  type: 'connector',
  icon: '/assets/connectors/Bitly.png',
  description: 'Bitly is a link management tool. You can shorten links, reroute existing ones and associate them with campaigns across channels and devices.',
  author: 'Bitly',
  isInstalled: false,
  category: 'Third party',
  tags: ['bitly', 'url', 'shortener', 'links', 'analytics']
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'create-bitlink',
    moduleId: 'bitly',
    title: 'Create a bitlink (V2) (Preview)',
    description: 'Create a shortened Bitlink.',
    tags: ['bitly', 'url', 'shorten', 'link', 'create'],
    usage: 'Use this action to create a shortened Bitly link from a long URL.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
