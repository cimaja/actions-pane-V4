import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'azure-openai',
  title: 'Azure OpenAI',
  type: 'connector',
  icon: '/assets/connectors/Azure OpenAI.png',
  description: 'Access Azure OpenAI services for advanced AI capabilities including language models and embeddings.',
  author: 'Microsoft',
  isInstalled: true,
  tags: ['ai', 'machine-learning', 'language-models']
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'creates-a-completion-for-the-chat-message',
    moduleId: 'azure-openai',
    title: 'Creates a completion for the chat message',
    description: 'Creates a completion for the chat message',
    tags: ['chat', 'completion', 'gpt'],
    usage: 'Use this action to generate a completion for a chat message using Azure OpenAI.'
  },
  {
    id: 'get-an-embedding',
    moduleId: 'azure-openai',
    title: 'Get an embedding',
    description: 'Get a vector representation of a given input that can be easily consumed by machine learning models and algorithms',
    tags: ['embeddings', 'vectors', 'machine-learning'],
    usage: 'Use this action to generate vector embeddings for text using Azure OpenAI.'
  },
  {
    id: 'get-multiple-embeddings',
    moduleId: 'azure-openai',
    title: 'Get multiple embeddings',
    description: 'Get vector representations of a given array of inputs that can be easily consumed by machine learning models and algorithms',
    tags: ['embeddings', 'vectors', 'machine-learning', 'batch'],
    usage: 'Use this action to generate multiple vector embeddings for an array of text inputs using Azure OpenAI.'
  },
  {
    id: 'using-extensions-to-create-a-completion-for-chat-messages',
    moduleId: 'azure-openai',
    title: 'Using extensions to create a completion for chat messages',
    description: 'Using extensions to create a completion for chat messages',
    tags: ['chat', 'completion', 'extensions', 'gpt'],
    usage: 'Use this action to generate a completion for chat messages using extensions in Azure OpenAI.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = (): DetailedActionItem[] => {
  return [...actions];
};

// Helper function to get an action by ID
export const getActionById = (id: string): DetailedActionItem | undefined => {
  return actions.find(action => action.id === id);
};
