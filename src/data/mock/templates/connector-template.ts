import { LibraryItemType, DetailedActionItem } from '../../../models/types';

/**
 * Connector Template
 * 
 * Use this template to create new connector files.
 * 1. Save as a new file in the connectors directory with an appropriate name
 * 2. Replace placeholder values with actual connector data
 * 3. Add appropriate actions for this connector
 */

// Connector metadata
export const connector: LibraryItemType = {
  id: 'connector-id', // Replace with actual connector ID (e.g., 'microsoft-teams')
  title: 'Connector Title', // Replace with actual connector title (e.g., 'Microsoft Teams')
  type: 'connector',
  icon: '🔌', // Replace with appropriate emoji icon
  description: 'Connector description', // Replace with actual connector description
  author: 'Author Name', // Replace with actual author name (e.g., 'Microsoft')
  isInstalled: false // Set to true if the connector is installed by default
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'action-id-1', // Replace with actual action ID
    moduleId: 'connector-id', // Should match the connector ID above
    title: 'Action Title 1', // Replace with actual action title
    description: 'Action description 1', // Replace with actual action description
    tags: ['tag1', 'tag2'], // Replace with relevant tags
    usage: 'Usage description for action 1', // Replace with actual usage description
    examples: [
      'Example 1 for action 1',
      'Example 2 for action 1'
    ],
    parameters: [
      {
        name: 'param1',
        type: 'string', // One of: string, number, boolean, date, object, array
        description: 'Parameter 1 description',
        required: true
      },
      {
        name: 'param2',
        type: 'number',
        description: 'Parameter 2 description',
        required: false
      }
      // Add more parameters as needed
    ]
  },
  {
    id: 'action-id-2', // Replace with actual action ID
    moduleId: 'connector-id', // Should match the connector ID above
    title: 'Action Title 2', // Replace with actual action title
    description: 'Action description 2', // Replace with actual action description
    tags: ['tag1', 'tag3'], // Replace with relevant tags
    usage: 'Usage description for action 2', // Replace with actual usage description
    examples: [
      'Example 1 for action 2',
      'Example 2 for action 2'
    ],
    parameters: [
      {
        name: 'param1',
        type: 'string',
        description: 'Parameter 1 description',
        required: true
      },
      {
        name: 'param2',
        type: 'boolean',
        description: 'Parameter 2 description',
        required: false
      }
      // Add more parameters as needed
    ]
  }
  // Add more actions as needed
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
