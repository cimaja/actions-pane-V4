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
    id: 'add-key-column-to-table',
    moduleId: 'excel-online',
    title: 'Add a key column to a table',
    description: 'Add a key column to an Excel table. The new column will be appended to the right.',
    tags: ['excel', 'table', 'column', 'key'],
    usage: 'Use this action to add a key column to an Excel table for identification purposes.'
  },
  {
    id: 'add-row-into-table',
    moduleId: 'excel-online',
    title: 'Add a row into a table',
    description: 'Add a new row into the Excel table.',
    tags: ['excel', 'table', 'row', 'add'],
    usage: 'Use this action to add a new row of data to an existing Excel table.'
  },
  {
    id: 'create-table',
    moduleId: 'excel-online',
    title: 'Create table',
    description: 'Create a new table in the Excel workbook.',
    tags: ['excel', 'table', 'create'],
    usage: 'Use this action to create a new table in an Excel workbook with defined columns.'
  },
  {
    id: 'create-worksheet',
    moduleId: 'excel-online',
    title: 'Create worksheet',
    description: 'Create a new worksheet in the Excel workbook.',
    tags: ['excel', 'worksheet', 'create'],
    usage: 'Use this action to add a new worksheet to an existing Excel workbook.'
  },
  {
    id: 'delete-row',
    moduleId: 'excel-online',
    title: 'Delete a row',
    description: 'Delete a row using a key column.',
    tags: ['excel', 'table', 'row', 'delete'],
    usage: 'Use this action to remove a specific row from an Excel table using a key column for identification.'
  },
  {
    id: 'get-row',
    moduleId: 'excel-online',
    title: 'Get a row',
    description: 'Get a row using a key column.',
    tags: ['excel', 'table', 'row', 'get'],
    usage: 'Use this action to retrieve a specific row from an Excel table using a key column for identification.'
  },
  {
    id: 'get-tables',
    moduleId: 'excel-online',
    title: 'Get tables',
    description: 'Get a list of tables in the Excel workbook.',
    tags: ['excel', 'tables', 'list'],
    usage: 'Use this action to retrieve all tables defined in an Excel workbook.'
  },
  {
    id: 'get-worksheets',
    moduleId: 'excel-online',
    title: 'Get worksheets',
    description: 'Get a list of worksheets in the Excel workbook.',
    tags: ['excel', 'worksheets', 'list'],
    usage: 'Use this action to retrieve all worksheets in an Excel workbook.'
  },
  {
    id: 'list-rows-present-in-table',
    moduleId: 'excel-online',
    title: 'List rows present in a table',
    description: 'List rows present in a table.',
    tags: ['excel', 'table', 'rows', 'list'],
    usage: 'Use this action to retrieve all rows from an Excel table.'
  },
  {
    id: 'run-script',
    moduleId: 'excel-online',
    title: 'Run script',
    description: 'Runs an Office Script against an Excel workbook. Use this action when the script is saved in the default location.',
    tags: ['excel', 'script', 'automation'],
    usage: 'Use this action to execute an Office Script stored in the default location against an Excel workbook.'
  },
  {
    id: 'run-script-from-sharepoint-library',
    moduleId: 'excel-online',
    title: 'Run script from SharePoint library',
    description: 'Runs an Office Script against an Excel workbook. Use this action when the script is saved outside of the default location.',
    tags: ['excel', 'script', 'sharepoint', 'automation'],
    usage: 'Use this action to execute an Office Script stored in a SharePoint library against an Excel workbook.'
  },
  {
    id: 'update-row',
    moduleId: 'excel-online',
    title: 'Update a row',
    description: 'Update a row using a key column. The input value will overwrite the specified cells and columns left blank will not be updated. In order to append (instead of overwrite) a value, use the "Get a row" action to retrieve the content first.',
    tags: ['excel', 'table', 'row', 'update'],
    usage: 'Use this action to modify specific cells in a row of an Excel table using a key column for identification.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);