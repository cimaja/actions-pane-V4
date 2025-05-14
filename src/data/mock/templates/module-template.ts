import { ActionGroup, ActionItemType } from '../../../models/types';

/**
 * Module Template
 * 
 * Use this template to create new module files.
 * 1. Save as a new file in the modules directory with an appropriate name
 * 2. Replace placeholder values with actual module data
 * 3. Add appropriate actions for this module
 */

// Module metadata
export const module: ActionGroup = {
  id: 'module-id', // Replace with actual module ID (e.g., 'file-management')
  title: 'Module Title', // Replace with actual module title (e.g., 'File Management')
  icon: '📦', // Replace with appropriate emoji icon
  tags: ['category'], // Replace with one of: 'advanced', 'files', 'integration', 'interaction', 'logic', 'system'
  items: [] // This will be populated with references to the actions
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'action-id-1', // Replace with actual action ID
    title: 'Action Title 1', // Replace with actual action title
    description: 'Action description 1' // Replace with actual action description
  },
  {
    id: 'action-id-2', // Replace with actual action ID
    title: 'Action Title 2', // Replace with actual action title
    description: 'Action description 2' // Replace with actual action description
  }
  // Add more actions as needed
];

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
