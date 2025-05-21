import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'excel-online',
  title: 'Excel Online (Business)',
  type: 'connector',
  icon: '/assets/connectors/Excel Online (Business).png',
  description: 'Work with data in Excel workbooks stored in OneDrive for Business or SharePoint.',
  author: 'Microsoft',
  isInstalled: true
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'excel-add-row',
    moduleId: 'excel-online',
    title: 'Add a row',
    description: 'Add a row to a table in an Excel workbook',
    tags: ['excel', 'table', 'row', 'add'],
    usage: 'Use this action to add a new row to a table in an Excel workbook.',
    examples: [
      'Add new transaction data to a financial spreadsheet',
      'Insert new inventory items into a tracking table'
    ],
    parameters: [
      {
        name: 'workbookId',
        type: 'string',
        description: 'The ID of the Excel workbook',
        required: true
      },
      {
        name: 'tableName',
        type: 'string',
        description: 'The name of the table',
        required: true
      },
      {
        name: 'values',
        type: 'object',
        description: 'The values to add to the new row',
        required: true
      }
    ]
  },
  {
    id: 'excel-get-rows',
    moduleId: 'excel-online',
    title: 'Get rows',
    description: 'Get rows from a table in an Excel workbook',
    tags: ['excel', 'table', 'row', 'get'],
    usage: 'Use this action to retrieve rows from a table in an Excel workbook with optional filtering.',
    examples: [
      'Retrieve expense records for a specific department',
      'Get all customer records that match certain criteria'
    ],
    parameters: [
      {
        name: 'workbookId',
        type: 'string',
        description: 'The ID of the Excel workbook',
        required: true
      },
      {
        name: 'tableName',
        type: 'string',
        description: 'The name of the table',
        required: true
      },
      {
        name: 'filter',
        type: 'string',
        description: 'Filter expression to apply to the table rows',
        required: false
      }
    ]
  },
  {
    id: 'excel-create-table',
    moduleId: 'excel-online',
    title: 'Create table',
    description: 'Create a new table in an Excel workbook',
    tags: ['excel', 'table', 'create'],
    usage: 'Use this action to create a new table in an Excel workbook.',
    examples: [
      'Create a new sales tracking table',
      'Set up a new project management table with predefined columns'
    ],
    parameters: [
      {
        name: 'workbookId',
        type: 'string',
        description: 'The ID of the Excel workbook',
        required: true
      },
      {
        name: 'tableName',
        type: 'string',
        description: 'The name for the new table',
        required: true
      },
      {
        name: 'range',
        type: 'string',
        description: 'The Excel range for the table (e.g., A1:D5)',
        required: true
      },
      {
        name: 'hasHeaders',
        type: 'boolean',
        description: 'Whether the first row contains headers',
        required: false
      }
    ]
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);