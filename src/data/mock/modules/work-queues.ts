import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'work-queues',
  title: 'Work queues',
  icon: 'listBarTree20Regular',
  iconColor: 'blue',
  tags: ['Automation', 'Queues', 'Workflow'], // Category tag for this module
  category: 'Integration',  author: 'Microsoft',

  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'process-work-queue-items',
    title: 'Process work queue items',
    description: 'Process items from a work queue',
    moduleId: 'work-queues'
  },
  {
    id: 'update-work-queue-item',
    title: 'Update work queue item',
    description: 'Update the status or properties of a work queue item',
    moduleId: 'work-queues'
  },
  {
    id: 'add-work-queue-item',
    title: 'Add work queue item',
    description: 'Add a new item to a work queue',
    moduleId: 'work-queues'
  },
  {
    id: 'add-multiple-work-queue-items',
    title: 'Add multiple work queue items',
    description: 'Add multiple items to a work queue in a batch operation',
    moduleId: 'work-queues'
  },
  {
    id: 'requeue-item-with-delay',
    title: 'Requeue item with delay',
    description: 'Return an item to the queue with a specified delay before processing',
    moduleId: 'work-queues'
  },
  {
    id: 'update-work-queue-item-processing-notes',
    title: 'Update work queue item processing notes',
    description: 'Add or update processing notes for a work queue item',
    moduleId: 'work-queues'
  },
  {
    id: 'get-work-queue-items-by-filter',
    title: 'Get work queue items by filter',
    description: 'Retrieve work queue items that match specified filter criteria',
    moduleId: 'work-queues'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
