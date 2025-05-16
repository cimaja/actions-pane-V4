import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'ai-builder',
  title: 'AI Builder (Preview)',
  icon: 'aiBuilder20Regular',
  iconColor: 'blue',
  tags: ['Integration'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: true // Module is installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'create-text-with-gpt',
    title: 'Create text with GPT (Preview)',
    description: 'Generate text content using GPT language models',
    moduleId: 'ai-builder'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
