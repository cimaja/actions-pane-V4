import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'azure-blob-storage',
  title: 'Azure Blob Storage',
  type: 'connector',
  icon: '/assets/connectors/Azure Blob Storage.png',
  description: 'Microsoft Azure Storage provides a massively scalable, durable, and highly available storage for data on the cloud, and serves as the data storage solution for modern applications. Connect to Blob Storage to perform various operations such as create, update, get and delete on blobs in your Azure Storage account.',
  author: 'Microsoft',
  isInstalled: false,
  category: 'Microsoft' as const,
  tags: ['azure', 'storage', 'blob', 'cloud']
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'copy-blob-v2',
    moduleId: 'azure-blob-storage',
    title: 'Copy blob (V2)',
    description: "This operation copies a blob. If blob is being deleted/renamed on server right after it was copied, connector may return HTTP 404 error by it's design. Please use a delay for 1 minute before deleting or renaming newly created blob. Chunk transfer is not supported in this action. If source and destination are present in same storage account, please use relative path. Otherwise, maximum size of a source for copy blob operation is 50 MB.",
    tags: ['azure', 'blob', 'storage', 'copy', 'v2'],
    usage: 'Use this action to copy a blob within the same storage account or between storage accounts.'
  },
  {
    id: 'create-blob-v2',
    moduleId: 'azure-blob-storage',
    title: 'Create blob (V2)',
    description: 'This operation uploads a blob to Azure Blob Storage.',
    tags: ['azure', 'blob', 'storage', 'create', 'upload', 'v2'],
    usage: 'Use this action to upload a new blob to your Azure Blob Storage.'
  },
  {
    id: 'create-block-blob-v2',
    moduleId: 'azure-blob-storage',
    title: 'Create block blob (V2)',
    description: 'This operation uploads a block blob to Azure Blob Storage.',
    tags: ['azure', 'blob', 'storage', 'block', 'upload', 'v2'],
    usage: 'Use this action to upload a block blob, which is optimized for uploading large blobs.'
  },
  {
    id: 'create-sas-uri-v2',
    moduleId: 'azure-blob-storage',
    title: 'Create SAS URI by path (V2)',
    description: 'This operation creates a SAS link for a blob using the path.',
    tags: ['azure', 'blob', 'storage', 'sas', 'uri', 'link', 'v2'],
    usage: 'Use this action to generate a shared access signature (SAS) URI for secure access to a blob.'
  },
  {
    id: 'delete-blob-v2',
    moduleId: 'azure-blob-storage',
    title: 'Delete blob (V2)',
    description: 'This operation deletes a blob.',
    tags: ['azure', 'blob', 'storage', 'delete', 'v2'],
    usage: 'Use this action to permanently delete a blob from your storage account.'
  },
  {
    id: 'extract-archive-v2',
    moduleId: 'azure-blob-storage',
    title: 'Extract archive to folder (V2)',
    description: 'This operation extracts an archive blob into a folder (example: .zip).',
    tags: ['azure', 'blob', 'storage', 'extract', 'archive', 'zip', 'v2'],
    usage: 'Use this action to extract the contents of an archive blob (like .zip) into a folder.'
  },
  {
    id: 'get-access-policies-v2',
    moduleId: 'azure-blob-storage',
    title: 'Get available access policies (V2)',
    description: 'This operation gets available shared access policies for a blob.',
    tags: ['azure', 'blob', 'storage', 'access', 'policies', 'v2'],
    usage: 'Use this action to retrieve the available shared access policies for a blob.'
  },
  {
    id: 'get-blob-content-v2',
    moduleId: 'azure-blob-storage',
    title: 'Get blob content (V2)',
    description: 'This operation retrieves blob contents using id.',
    tags: ['azure', 'blob', 'storage', 'content', 'download', 'v2'],
    usage: 'Use this action to download the contents of a blob using its ID.'
  },
  {
    id: 'get-blob-content-path-v2',
    moduleId: 'azure-blob-storage',
    title: 'Get blob content using path (V2)',
    description: 'This operation retrieves blob contents using path.',
    tags: ['azure', 'blob', 'storage', 'content', 'download', 'path', 'v2'],
    usage: 'Use this action to download the contents of a blob using its path.'
  },
  {
    id: 'get-blob-metadata-v2',
    moduleId: 'azure-blob-storage',
    title: 'Get Blob Metadata (V2)',
    description: 'This operation retrieves blob metadata using blob id.',
    tags: ['azure', 'blob', 'storage', 'metadata', 'v2'],
    usage: 'Use this action to retrieve metadata for a specific blob using its ID.'
  },
  {
    id: 'get-blob-metadata-path-v2',
    moduleId: 'azure-blob-storage',
    title: 'Get Blob Metadata using path (V2)',
    description: 'This operation retrieves blob metadata using path.',
    tags: ['azure', 'blob', 'storage', 'metadata', 'path', 'v2'],
    usage: 'Use this action to retrieve metadata for a specific blob using its path.'
  },
  {
    id: 'list-blobs-v2',
    moduleId: 'azure-blob-storage',
    title: 'List blobs (V2)',
    description: 'This operation lists blobs in a container.',
    tags: ['azure', 'blob', 'storage', 'list', 'container', 'v2'],
    usage: 'Use this action to list all blobs within a specific container.'
  },
  {
    id: 'list-root-blobs-v2',
    moduleId: 'azure-blob-storage',
    title: 'List blobs in the root folder (V2)',
    description: 'This operation lists blobs in the Azure Blob Storage root folder.',
    tags: ['azure', 'blob', 'storage', 'list', 'root', 'v2'],
    usage: 'Use this action to list all blobs in the root folder of your storage account.'
  },
  {
    id: 'set-blob-tier-v2',
    moduleId: 'azure-blob-storage',
    title: 'Set blob tier by path (V2)',
    description: 'This operation sets a tier for a block blob on a standard storage account using the path.',
    tags: ['azure', 'blob', 'storage', 'tier', 'path', 'v2'],
    usage: 'Use this action to change the access tier of a block blob (Hot, Cool, or Archive).'
  },
  {
    id: 'update-blob-v2',
    moduleId: 'azure-blob-storage',
    title: 'Update blob (V2)',
    description: 'This operation updates a blob in Azure Blob Storage.',
    tags: ['azure', 'blob', 'storage', 'update', 'v2'],
    usage: 'Use this action to update the contents or properties of an existing blob.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
