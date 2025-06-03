import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'excel',
  title: 'Excel',
  icon: 'excel',
  iconColor: 'blue', // Integration category color
  tags: ['Office', 'Spreadsheet', 'Data'], // Category tag for this module
  category: 'Integration',
  isInstalled: false, // Module is installed by default  author: 'Microsoft',

  items: [],
  subGroups: [
    {
      id: 'excel-basic',
      title: 'Basic Operations',
      items: [
        {
          id: 'launch-excel',
          title: 'Launch Excel',

          description: 'Launch Microsoft Excel application'
        },
        {
          id: 'attach-excel',
          title: 'Attach to running Excel',

          description: 'Attach to an already running Excel instance'
        },
        {
          id: 'read-excel',
          title: 'Read from Excel worksheet',

          description: 'Read content from an Excel worksheet'
        },
        {
          id: 'get-active-cell',
          title: 'Get active cell on Excel worksheet',

          description: 'Get the currently active cell in Excel worksheet'
        },
        {
          id: 'save-excel',
          title: 'Save Excel',

          description: 'Save the active Excel workbook'
        },
        {
          id: 'write-excel',
          title: 'Write to Excel worksheet',

          description: 'Write content to an Excel worksheet'
        },
        {
          id: 'close-excel',
          title: 'Close Excel',

          description: 'Close Microsoft Excel application'
        },
        {
          id: 'set-active-worksheet',
          title: 'Set active Excel worksheet',

          description: 'Set the active worksheet in Excel'
        },
        {
          id: 'add-worksheet',
          title: 'Add new worksheet',

          description: 'Add a new worksheet to Excel workbook'
        },
        {
          id: 'get-first-free',
          title: 'Get first free column/row from Excel worksheet',

          description: 'Find the first empty column or row in Excel worksheet'
        },
        {
          id: 'get-column-name',
          title: 'Get column name on Excel worksheet',

          description: 'Get the name of a column in Excel worksheet'
        },
        {
          id: 'clear-cells',
          title: 'Clear cells in Excel worksheet',

          description: 'Clear content from cells in Excel worksheet'
        },
        {
          id: 'sort-cells',
          title: 'Sort cells in Excel worksheet',

          description: 'Sort cells in Excel worksheet'
        },
        {
          id: 'filter-cells',
          title: 'Filter cells in Excel worksheet',

          description: 'Apply filter to cells in Excel worksheet'
        },
        {
          id: 'clear-filters',
          title: 'Clear filters in Excel worksheet',

          description: 'Remove all filters from Excel worksheet'
        },
        {
          id: 'get-empty-cell',
          title: 'Get empty cell',

          description: 'Find an empty cell in Excel worksheet'
        }
      ]
    },
    {
      id: 'excel-advanced',
      title: 'Advanced Operations',
      items: [
        {
          id: 'resize-columns-rows',
          title: 'Resize columns/rows in Excel worksheet',

          description: 'Resize columns or rows in Excel worksheet'
        },
        {
          id: 'run-macro',
          title: 'Run Excel macro',

          description: 'Execute a macro in Excel'
        },
        {
          id: 'get-active-worksheet',
          title: 'Get active Excel worksheet',

          description: 'Get the currently active worksheet'
        },
        {
          id: 'get-all-worksheets',
          title: 'Get all Excel worksheets',

          description: 'Get all worksheets in Excel workbook'
        },
        {
          id: 'delete-worksheet',
          title: 'Delete Excel worksheet',

          description: 'Delete a worksheet from Excel workbook'
        },
        {
          id: 'rename-worksheet',
          title: 'Rename Excel worksheet',

          description: 'Rename an Excel worksheet'
        },
        {
          id: 'copy-worksheet',
          title: 'Copy Excel worksheet',

          description: 'Create a copy of an Excel worksheet'
        },
        {
          id: 'activate-cell',
          title: 'Activate cell in Excel worksheet',

          description: 'Set a specific cell as active in Excel worksheet'
        },
        {
          id: 'select-cells',
          title: 'Select cells in Excel worksheet',

          description: 'Select a range of cells in Excel worksheet'
        },
        {
          id: 'get-selected-range',
          title: 'Get selected cell range from Excel worksheet',

          description: 'Get the currently selected range of cells'
        },
        {
          id: 'copy-cells',
          title: 'Copy cells from Excel worksheet',

          description: 'Copy cells from Excel worksheet'
        },
        {
          id: 'paste-cells',
          title: 'Paste cells to Excel worksheet',

          description: 'Paste cells to Excel worksheet'
        },
        {
          id: 'delete-from-worksheet',
          title: 'Delete from Excel worksheet',

          description: 'Delete content from Excel worksheet'
        },
        {
          id: 'insert-row',
          title: 'Insert row to Excel worksheet',

          description: 'Insert a new row in Excel worksheet'
        },
        {
          id: 'delete-row',
          title: 'Delete row from Excel worksheet',

          description: 'Delete a row from Excel worksheet'
        },
        {
          id: 'insert-column',
          title: 'Insert column to Excel worksheet',

          description: 'Insert a new column in Excel worksheet'
        },
        {
          id: 'delete-column',
          title: 'Delete column from Excel worksheet',

          description: 'Delete a column from Excel worksheet'
        },
        {
          id: 'find-replace-cells',
          title: 'Find and replace cells in Excel worksheet',

          description: 'Find and replace content in Excel worksheet cells'
        },
        {
          id: 'get-first-free-row',
          title: 'Get first free row on column from Excel worksheet',

          description: 'Find the first empty row in a specific column'
        },
        {
          id: 'read-formula',
          title: 'Read formula from Excel',

          description: 'Read a formula from Excel cell'
        },
        {
          id: 'get-table-range',
          title: 'Get table range from Excel worksheet',

          description: 'Get the range of a table in Excel worksheet'
        },
        {
          id: 'auto-fill-cells',
          title: 'Auto fill cells in Excel worksheet',

          description: 'Auto fill a range of cells in Excel worksheet'
        },
        {
          id: 'append-cells',
          title: 'Append cells in Excel worksheet',

          description: 'Append content to cells in Excel worksheet'
        },
        {
          id: 'lookup-range',
          title: 'Lookup range in Excel worksheet',

          description: 'Look up a range in Excel worksheet'
        },
        {
          id: 'set-cell-color',
          title: 'Set color of cells in Excel worksheet',

          description: 'Set the color of cells in Excel worksheet'
        }
      ]
    }
  ]
};

/**
 * Get all actions from this module
 */
export const getAllActions = (): ActionItemType[] => {
  return [
    ...(module.items || []),
    ...(module.subGroups?.flatMap(group => group.items) || [])
  ];
};
