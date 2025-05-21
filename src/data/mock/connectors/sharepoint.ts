import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'sharepoint',
  title: 'SharePoint',
  type: 'connector',
  icon: '/assets/connectors/SharePoint.png',
  description: 'Create, manage, and share content with SharePoint lists, files, and folders.',
  author: 'Microsoft',
  isInstalled: true
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'sharepoint-create-item',
    moduleId: 'sharepoint',
    title: 'Create item',
    description: 'Create a new item in a SharePoint list',
    tags: ['sharepoint', 'list', 'create'],
    usage: 'Use this action to create new items in a SharePoint list programmatically.',
    examples: [
      'Add new project items to a project tracking list',
      'Create new event entries in an events list'
    ],
    parameters: [
      {
        name: 'siteAddress',
        type: 'string',
        description: 'The address of the SharePoint site',
        required: true
      },
      {
        name: 'list',
        type: 'string',
        description: 'The name or ID of the list',
        required: true
      },
      {
        name: 'title',
        type: 'string',
        description: 'The title of the new item',
        required: true
      },
      {
        name: 'fields',
        type: 'object',
        description: 'The fields and values for the new item',
        required: false
      }
    ]
  },
  {
    id: 'sharepoint-get-items',
    moduleId: 'sharepoint',
    title: 'Get items',
    description: 'Get items from a SharePoint list',
    tags: ['sharepoint', 'list', 'get', 'items'],
    usage: 'Use this action to retrieve items from a SharePoint list with optional filtering.',
    examples: [
      'Get all items in a task list that are not completed',
      'Retrieve documents that match specific criteria'
    ],
    parameters: [
      {
        name: 'siteAddress',
        type: 'string',
        description: 'The address of the SharePoint site',
        required: true
      },
      {
        name: 'list',
        type: 'string',
        description: 'The name or ID of the list',
        required: true
      },
      {
        name: 'filter',
        type: 'string',
        description: 'ODATA filter query to filter the results',
        required: false
      },
      {
        name: 'orderBy',
        type: 'string',
        description: 'Field to order the results by',
        required: false
      }
    ]
  },
  {
    id: 'sharepoint-upload-file',
    moduleId: 'sharepoint',
    title: 'Create file',
    description: 'Upload a file to a SharePoint document library',
    tags: ['sharepoint', 'document', 'upload', 'file'],
    usage: 'Use this action to upload files to a SharePoint document library.',
    examples: [
      'Upload generated reports to a reports library',
      'Save user-submitted files to a document library'
    ],
    parameters: [
      {
        name: 'siteAddress',
        type: 'string',
        description: 'The address of the SharePoint site',
        required: true
      },
      {
        name: 'libraryName',
        type: 'string',
        description: 'The name of the document library',
        required: true
      },
      {
        name: 'fileName',
        type: 'string',
        description: 'The name of the file to create',
        required: true
      },
      {
        name: 'fileContent',
        type: 'string',
        description: 'The content of the file',
        required: true
      }
    ]
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);