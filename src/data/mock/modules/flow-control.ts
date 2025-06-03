import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'flow-control',
  title: 'Flow control',
  icon: 'timer24Regular', // Using code icon since Flow isn't in our icon set
  iconColor: 'red',
  tags: ['Logic', 'Flow Control', 'Development'], // Category tag for this module
  category: 'Logic',  author: 'Microsoft',

  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'comment',
    title: 'Comment',
    description: 'Add a comment to the flow.',
    moduleId: 'flow-control'
  },
  {
    id: 'end-block',
    title: 'End',
    description: 'Marks the end of a block (e.g., region, error handling).',
    moduleId: 'flow-control'
  },
  {
    id: 'end-region',
    title: 'End region',
    description: 'Marks the end of a region block.',
    moduleId: 'flow-control'
  },
  {
    id: 'exit-subflow',
    title: 'Exit subflow',
    description: 'Exit the current subflow and return to the caller.',
    moduleId: 'flow-control'
  },
  {
    id: 'get-last-error',
    title: 'Get last error',
    description: 'Retrieve details of the last error that occurred.',
    moduleId: 'flow-control'
  },
  {
    id: 'go-to',
    title: 'Go to',
    description: 'Jump to a specific label in the flow.',
    moduleId: 'flow-control'
  },
  {
    id: 'label',
    title: 'Label',
    description: 'Define a named point in the flow to jump to.',
    moduleId: 'flow-control'
  },
  {
    id: 'on-block-error',
    title: 'On block error',
    description: 'Define error handling for a block of actions.',
    moduleId: 'flow-control'
  },
  {
    id: 'region',
    title: 'Region',
    description: 'Group a set of actions into a collapsible region.',
    moduleId: 'flow-control'
  },
  {
    id: 'run-desktop-flow',
    title: 'Run desktop flow',
    description: 'Execute another desktop flow.',
    moduleId: 'flow-control'
  },
  {
    id: 'run-subflow',
    title: 'Run subflow',
    description: 'Execute a subflow.',
    moduleId: 'flow-control'
  },
  {
    id: 'stop-flow',
    title: 'Stop flow',
    description: 'Terminate the execution of the current flow.',
    moduleId: 'flow-control'
  },
  {
    id: 'wait',
    title: 'Wait',
    description: 'Pause the flow for a specified duration.',
    moduleId: 'flow-control'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
