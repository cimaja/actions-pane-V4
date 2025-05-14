import { ActionGroup, ActionItemType } from '../../../models/types';

/**
 * Module with Subgroups Template
 * 
 * Use this template to create new module files that have subgroups.
 * 1. Save as a new file in the modules directory with an appropriate name
 * 2. Replace placeholder values with actual module data
 * 3. Add appropriate actions for this module and its subgroups
 */

// Module metadata
export const module: ActionGroup = {
  id: 'module-id', // Replace with actual module ID (e.g., 'ui-automation')
  title: 'Module Title', // Replace with actual module title (e.g., 'UI Automation')
  icon: '📦', // Replace with appropriate emoji icon
  tags: ['category'], // Replace with one of: 'advanced', 'files', 'integration', 'interaction', 'logic', 'system'
  items: [], // This will be populated with references to the main actions
  subGroups: [
    {
      id: 'subgroup-1-id', // Replace with actual subgroup ID
      title: 'Subgroup 1 Title', // Replace with actual subgroup title
      items: [] // Will be populated with subgroup 1 actions
    },
    {
      id: 'subgroup-2-id', // Replace with actual subgroup ID
      title: 'Subgroup 2 Title', // Replace with actual subgroup title
      items: [] // Will be populated with subgroup 2 actions
    }
    // Add more subgroups as needed
  ]
};

// Module main actions
export const mainActions: ActionItemType[] = [
  {
    id: 'main-action-id-1', // Replace with actual action ID
    title: 'Main Action Title 1', // Replace with actual action title
    description: 'Main action description 1' // Replace with actual action description
  },
  {
    id: 'main-action-id-2', // Replace with actual action ID
    title: 'Main Action Title 2', // Replace with actual action title
    description: 'Main action description 2' // Replace with actual action description
  }
  // Add more main actions as needed
];

// Subgroup 1 actions
export const subgroup1Actions: ActionItemType[] = [
  {
    id: 'subgroup1-action-id-1', // Replace with actual action ID
    title: 'Subgroup 1 Action Title 1', // Replace with actual action title
    description: 'Subgroup 1 action description 1' // Replace with actual action description
  },
  {
    id: 'subgroup1-action-id-2', // Replace with actual action ID
    title: 'Subgroup 1 Action Title 2', // Replace with actual action title
    description: 'Subgroup 1 action description 2' // Replace with actual action description
  }
  // Add more subgroup 1 actions as needed
];

// Subgroup 2 actions
export const subgroup2Actions: ActionItemType[] = [
  {
    id: 'subgroup2-action-id-1', // Replace with actual action ID
    title: 'Subgroup 2 Action Title 1', // Replace with actual action title
    description: 'Subgroup 2 action description 1' // Replace with actual action description
  },
  {
    id: 'subgroup2-action-id-2', // Replace with actual action ID
    title: 'Subgroup 2 Action Title 2', // Replace with actual action title
    description: 'Subgroup 2 action description 2' // Replace with actual action description
  }
  // Add more subgroup 2 actions as needed
];

// Initialize the module with its actions
module.items = mainActions;

// Initialize subgroups with their respective actions
if (module.subGroups) {
  const subgroup1 = module.subGroups.find(group => group.id === 'subgroup-1-id');
  if (subgroup1) {
    subgroup1.items = subgroup1Actions;
  }
  
  const subgroup2 = module.subGroups.find(group => group.id === 'subgroup-2-id');
  if (subgroup2) {
    subgroup2.items = subgroup2Actions;
  }
}

// Helper function to get all actions for this module (including subgroups)
export const getAllActions = () => {
  return [
    ...mainActions,
    ...subgroup1Actions,
    ...subgroup2Actions
  ];
};

// Helper function to get an action by ID
export const getActionById = (id: string) => getAllActions().find(action => action.id === id);
