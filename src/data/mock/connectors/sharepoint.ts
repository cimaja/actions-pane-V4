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
    id: 'add-attachment',
    moduleId: 'sharepoint',
    title: 'Add attachment',
    description: 'Adds a new attachment to the specified list item.',
    tags: ['sharepoint', 'attachment', 'list'],
    usage: 'Use this action to add an attachment to a SharePoint list item.'
  },
  {
    id: 'approve-hub-site-join-request',
    moduleId: 'sharepoint',
    title: 'Approve hub site join request',
    description: 'Approve hub site join request. This will return an approval token that can be used to complete the join request using the join hub site action.',
    tags: ['sharepoint', 'hub', 'site', 'approve'],
    usage: 'Use this action to approve a request for a site to join a hub site.'
  },
  {
    id: 'cancel-hub-site-join-request',
    moduleId: 'sharepoint',
    title: 'Cancel hub site join request',
    description: 'Cancel hub join request. If applicable, you should specify the same Approval Correlation Id as used in the "Set hub site join status to pending" action.',
    tags: ['sharepoint', 'hub', 'site', 'cancel'],
    usage: 'Use this action to cancel a pending hub site join request.'
  },
  {
    id: 'check-in-file',
    moduleId: 'sharepoint',
    title: 'Check in file',
    description: 'Check in a checked out file in a document library, which makes the version of the document available to others.',
    tags: ['sharepoint', 'file', 'check-in'],
    usage: 'Use this action to check in a file that was previously checked out.'
  },
  {
    id: 'check-out-file',
    moduleId: 'sharepoint',
    title: 'Check out file',
    description: 'Check out a file in a document library to prevent others from editing the document, and your changes from being visible until the documented is checked in.',
    tags: ['sharepoint', 'file', 'check-out'],
    usage: 'Use this action to check out a file for exclusive editing.'
  },
  {
    id: 'copy-file',
    moduleId: 'sharepoint',
    title: 'Copy file',
    description: 'Copies a file. Works in a similar way to the "Copy to" command in SharePoint libraries. Returns information about the new file after copy.',
    tags: ['sharepoint', 'file', 'copy'],
    usage: 'Use this action to copy a file to another location in SharePoint.'
  },
  {
    id: 'copy-folder',
    moduleId: 'sharepoint',
    title: 'Copy folder',
    description: 'Copies a folder. Works in a similar way to the "Copy to" command in SharePoint libraries. Returns information about the new folder after copy.',
    tags: ['sharepoint', 'folder', 'copy'],
    usage: 'Use this action to copy a folder to another location in SharePoint.'
  },
  {
    id: 'create-file',
    moduleId: 'sharepoint',
    title: 'Create file',
    description: 'Uploads a file to a SharePoint site. Make sure to pick an existing library.',
    tags: ['sharepoint', 'file', 'upload', 'create'],
    usage: 'Use this action to upload a new file to a SharePoint document library.'
  },
  {
    id: 'create-item',
    moduleId: 'sharepoint',
    title: 'Create item',
    description: 'Creates a new item in a SharePoint list.',
    tags: ['sharepoint', 'list', 'item', 'create'],
    usage: 'Use this action to create a new item in a SharePoint list.'
  },
  {
    id: 'create-new-document-set',
    moduleId: 'sharepoint',
    title: 'Create new document set',
    description: 'Creates a new document set list item.',
    tags: ['sharepoint', 'document-set', 'create'],
    usage: 'Use this action to create a new document set in a SharePoint library.'
  },
  {
    id: 'create-new-folder',
    moduleId: 'sharepoint',
    title: 'Create new folder',
    description: 'Creates a new folder or folder path.',
    tags: ['sharepoint', 'folder', 'create'],
    usage: 'Use this action to create a new folder in a SharePoint library.'
  },
  {
    id: 'create-sharing-link-for-a-file-or-folder',
    moduleId: 'sharepoint',
    title: 'Create sharing link for a file or folder',
    description: 'Create sharing link for a file or folder.',
    tags: ['sharepoint', 'sharing', 'link'],
    usage: 'Use this action to generate a sharing link for a file or folder.'
  },
  {
    id: 'delete-attachment',
    moduleId: 'sharepoint',
    title: 'Delete attachment',
    description: 'Deletes the specified attachment.',
    tags: ['sharepoint', 'attachment', 'delete'],
    usage: 'Use this action to delete an attachment from a SharePoint list item.'
  },
  {
    id: 'delete-file',
    moduleId: 'sharepoint',
    title: 'Delete file',
    description: 'Deletes the file specified by the file identifier.',
    tags: ['sharepoint', 'file', 'delete'],
    usage: 'Use this action to delete a file from a SharePoint library.'
  },
  {
    id: 'delete-item',
    moduleId: 'sharepoint',
    title: 'Delete item',
    description: 'Deletes an item from a SharePoint list.',
    tags: ['sharepoint', 'list', 'item', 'delete'],
    usage: 'Use this action to delete an item from a SharePoint list.'
  },
  {
    id: 'discard-check-out',
    moduleId: 'sharepoint',
    title: 'Discard check out',
    description: 'If you check out a file and don\'t make changes to it, or you make changes that you don\'t want to keep, you can simply discard the checkout, rather than saving the file. If your organization tracks versions, a new version is created each time you check a file back into the library. By discarding the checkout, you can avoid making new versions when you haven\'t made any changes to the file.',
    tags: ['sharepoint', 'file', 'checkout', 'discard'],
    usage: 'Use this action to discard a checkout without saving changes.'
  },
  {
    id: 'extract-folder',
    moduleId: 'sharepoint',
    title: 'Extract folder',
    description: 'Extracts an archive file into a SharePoint folder (example: .zip).',
    tags: ['sharepoint', 'archive', 'extract'],
    usage: 'Use this action to extract the contents of an archive file into a SharePoint folder.'
  },
  {
    id: 'get-all-lists-and-libraries',
    moduleId: 'sharepoint',
    title: 'Get all lists and libraries',
    description: 'Get all lists and libraries.',
    tags: ['sharepoint', 'lists', 'libraries'],
    usage: 'Use this action to retrieve all lists and document libraries from a SharePoint site.'
  },
  {
    id: 'get-attachment-content',
    moduleId: 'sharepoint',
    title: 'Get attachment content',
    description: 'Returns file contents using the file identifier. The contents can be copied somewhere else, or be used as an attachment.',
    tags: ['sharepoint', 'attachment', 'content'],
    usage: 'Use this action to retrieve the content of an attachment from a SharePoint list item.'
  },
  {
    id: 'get-attachments',
    moduleId: 'sharepoint',
    title: 'Get attachments',
    description: 'Returns the list of attachments for the specified list item. You can add a "Get attachment content" step and use the "File identifier" property returned by this action to get to the contents of the file.',
    tags: ['sharepoint', 'attachments', 'list'],
    usage: 'Use this action to retrieve all attachments for a SharePoint list item.'
  },
  {
    id: 'get-changes-for-an-item-or-a-file',
    moduleId: 'sharepoint',
    title: 'Get changes for an item or a file (properties only)',
    description: 'Returns information about columns that have changed within a given time window. Note: The list must have Versioning turned on.',
    tags: ['sharepoint', 'changes', 'versioning'],
    usage: 'Use this action to track changes to a SharePoint item or file properties.'
  },
  {
    id: 'get-file-content',
    moduleId: 'sharepoint',
    title: 'Get file content',
    description: 'Gets file contents using the file identifier. The contents can be copied somewhere else, or be used as an attachment.',
    tags: ['sharepoint', 'file', 'content'],
    usage: 'Use this action to retrieve the content of a file from a SharePoint library.'
  },
  {
    id: 'get-file-content-using-path',
    moduleId: 'sharepoint',
    title: 'Get file content using path',
    description: 'Gets file contents using the file path.',
    tags: ['sharepoint', 'file', 'content', 'path'],
    usage: 'Use this action to retrieve the content of a file using its path.'
  },
  {
    id: 'get-file-metadata',
    moduleId: 'sharepoint',
    title: 'Get file metadata',
    description: 'Gets information about the file such as size, etag, created date, etc. Uses a file identifier to pick the file. Use "Get file properties" action to get to the values stored in the columns in the library.',
    tags: ['sharepoint', 'file', 'metadata'],
    usage: 'Use this action to retrieve metadata about a file in a SharePoint library.'
  },
  {
    id: 'get-file-metadata-using-path',
    moduleId: 'sharepoint',
    title: 'Get file metadata using path',
    description: 'Gets information about the file such as size, etag, created date, etc. Uses a file path to pick the file. Use "Get file properties" action to get to the values stored in the columns in the library.',
    tags: ['sharepoint', 'file', 'metadata', 'path'],
    usage: 'Use this action to retrieve metadata about a file using its path.'
  },
  {
    id: 'get-file-properties',
    moduleId: 'sharepoint',
    title: 'Get file properties',
    description: 'Gets the properties saved in the columns in the library for the item specified by the item id. You can add a "Get file content" step and use the "File identifier" property returned by this action to get to the contents of the file. When using this with the On-Premises Data Gateway, the name of the library to connect to may need to be entered manually.',
    tags: ['sharepoint', 'file', 'properties'],
    usage: 'Use this action to retrieve the column values for a file in a SharePoint library.'
  },
  {
    id: 'get-files-properties-only',
    moduleId: 'sharepoint',
    title: 'Get files (properties only)',
    description: 'Gets the properties saved in the columns in the library for all folders and files stored in the library. You can also filter down to the items that match a condition. An "Apply to each" section is usually used to work with the output from this action. When using this with the On-Premises Data Gateway, the name of the library to connect to may need to be entered manually.',
    tags: ['sharepoint', 'files', 'properties'],
    usage: 'Use this action to retrieve properties for all files in a SharePoint library.'
  },
  {
    id: 'get-folder-metadata',
    moduleId: 'sharepoint',
    title: 'Get folder metadata',
    description: 'Gets information about the folder. Uses a file identifier to pick the folder.',
    tags: ['sharepoint', 'folder', 'metadata'],
    usage: 'Use this action to retrieve metadata about a folder in a SharePoint library.'
  },
  {
    id: 'get-folder-metadata-using-path',
    moduleId: 'sharepoint',
    title: 'Get folder metadata using path',
    description: 'Gets information about the folder. Uses a folder path to pick the folder.',
    tags: ['sharepoint', 'folder', 'metadata', 'path'],
    usage: 'Use this action to retrieve metadata about a folder using its path.'
  },
  {
    id: 'get-item',
    moduleId: 'sharepoint',
    title: 'Get item',
    description: 'Gets a single item by its id from a SharePoint list.',
    tags: ['sharepoint', 'list', 'item'],
    usage: 'Use this action to retrieve a specific item from a SharePoint list.'
  },
  {
    id: 'get-items',
    moduleId: 'sharepoint',
    title: 'Get items',
    description: 'Gets items from a SharePoint list.',
    tags: ['sharepoint', 'list', 'items'],
    usage: 'Use this action to retrieve multiple items from a SharePoint list.'
  },
  {
    id: 'get-list-views',
    moduleId: 'sharepoint',
    title: 'Get list views',
    description: 'Gets views from a SharePoint list.',
    tags: ['sharepoint', 'list', 'views'],
    usage: 'Use this action to retrieve all views defined for a SharePoint list.'
  },
  {
    id: 'get-lists',
    moduleId: 'sharepoint',
    title: 'Get lists',
    description: 'Gets SharePoint lists from a site.',
    tags: ['sharepoint', 'lists'],
    usage: 'Use this action to retrieve all lists from a SharePoint site.'
  },
  {
    id: 'grant-access-to-an-item-or-a-folder',
    moduleId: 'sharepoint',
    title: 'Grant access to an item or a folder',
    description: 'Grant access to an item or a folder in SharePoint to specific people.',
    tags: ['sharepoint', 'access', 'permissions'],
    usage: 'Use this action to grant specific users access to a SharePoint item or folder.'
  },
  {
    id: 'join-hub-site',
    moduleId: 'sharepoint',
    title: 'Join hub site',
    description: 'Join the requested site to the hub site. An Approval Token is required to complete the join successfully if that hub requires approval. If applicable, you should specify the same Approval Correlation Id as used in the "Set hub site join status to pending" action.',
    tags: ['sharepoint', 'hub', 'site', 'join'],
    usage: 'Use this action to join a site to a hub site.'
  },
  {
    id: 'list-folder',
    moduleId: 'sharepoint',
    title: 'List folder',
    description: 'Returns files contained in a SharePoint folder.',
    tags: ['sharepoint', 'folder', 'list', 'files'],
    usage: 'Use this action to list all files in a specific SharePoint folder.'
  },
  {
    id: 'list-root-folder',
    moduleId: 'sharepoint',
    title: 'List root folder',
    description: 'Returns files in the root SharePoint folder.',
    tags: ['sharepoint', 'root', 'folder', 'list'],
    usage: 'Use this action to list all files in the root folder of a SharePoint library.'
  },
  {
    id: 'move-file',
    moduleId: 'sharepoint',
    title: 'Move file',
    description: 'Moves a file. Works in a similar way to the "Move to" command in SharePoint libraries. Returns information about the new file after move.',
    tags: ['sharepoint', 'file', 'move'],
    usage: 'Use this action to move a file to another location in SharePoint.'
  },
  {
    id: 'move-folder',
    moduleId: 'sharepoint',
    title: 'Move folder',
    description: 'Moves a folder. Works in a similar way to the "Move to" command in SharePoint libraries. Returns information about the new folder after move.',
    tags: ['sharepoint', 'folder', 'move'],
    usage: 'Use this action to move a folder to another location in SharePoint.'
  },
  {
    id: 'resolve-person',
    moduleId: 'sharepoint',
    title: 'Resolve person',
    description: 'Returns a single matching user value so it can be assigned to a column of type person. If there are no matches, or multiple matches, this action will error out.',
    tags: ['sharepoint', 'person', 'resolve', 'user'],
    usage: 'Use this action to resolve a person for use in a SharePoint person field.'
  },
  {
    id: 'send-an-http-request-to-sharepoint',
    moduleId: 'sharepoint',
    title: 'Send an HTTP request to SharePoint',
    description: 'Construct a SharePoint REST API to invoke. Note – This action may execute any SharePoint REST API you have access to. Please proceed with caution.',
    tags: ['sharepoint', 'http', 'rest', 'api'],
    usage: 'Use this action to make custom REST API calls to SharePoint.'
  },
  {
    id: 'set-content-approval-status',
    moduleId: 'sharepoint',
    title: 'Set content approval status',
    description: 'Sets the content approval status for an item in a list or library that has content approval turned on. You must provide an ETag for pages and files. You can get the ETag using the Get File Metadata action. This action is only available for SharePoint Online and SharePoint 2019.',
    tags: ['sharepoint', 'approval', 'status'],
    usage: 'Use this action to approve or reject content in a SharePoint list or library.'
  },
  {
    id: 'set-hub-site-join-status-to-pending',
    moduleId: 'sharepoint',
    title: 'Set hub site join status to pending',
    description: 'Set the requested site\'s hub join request status to pending. The Approval Correlation Id is an optional parameter that helps SharePoint identify a particular hub join request. The requesting site can only have one pending request at a given time.',
    tags: ['sharepoint', 'hub', 'site', 'pending'],
    usage: 'Use this action to request that a site join a hub site.'
  },
  {
    id: 'stop-sharing-an-item-or-a-file',
    moduleId: 'sharepoint',
    title: 'Stop sharing an item or a file',
    description: 'Delete all links giving access to an item or a file and remove all people with direct access except for owners.',
    tags: ['sharepoint', 'sharing', 'stop'],
    usage: 'Use this action to remove all sharing for a SharePoint item or file.'
  },
  {
    id: 'update-file',
    moduleId: 'sharepoint',
    title: 'Update file',
    description: 'Updates the contents of the file specified by the file identifier.',
    tags: ['sharepoint', 'file', 'update'],
    usage: 'Use this action to update the content of a file in a SharePoint library.'
  },
  {
    id: 'update-file-properties',
    moduleId: 'sharepoint',
    title: 'Update file properties',
    description: 'Updates the properties stored in columns in a library for the item specified by the item id. Use "Update file" action to update file contents. When using this with the On-Premises Data Gateway, the name of the library to connect to may need to be entered manually.',
    tags: ['sharepoint', 'file', 'properties', 'update'],
    usage: 'Use this action to update the column values for a file in a SharePoint library.'
  },
  {
    id: 'update-file-properties-using-ai-builder-model-results',
    moduleId: 'sharepoint',
    title: 'Update file properties using AI Builder model results',
    description: 'Updates the values stored in library columns for a file analyzed by the model specified by the ModelId.',
    tags: ['sharepoint', 'file', 'properties', 'ai'],
    usage: 'Use this action to update file properties with results from an AI Builder model.'
  },
  {
    id: 'update-item',
    moduleId: 'sharepoint',
    title: 'Update item',
    description: 'Updates an item in a SharePoint list.',
    tags: ['sharepoint', 'list', 'item', 'update'],
    usage: 'Use this action to update an existing item in a SharePoint list.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);