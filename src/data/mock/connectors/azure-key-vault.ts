import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'azure-key-vault',
  title: 'Azure Key Vault',
  type: 'connector',
  icon: '/assets/connectors/Azure Key Vault.png',
  description: 'Azure Key Vault is a service to securely store and access secrets.',
  author: 'Microsoft',
  isInstalled: false,
  category: 'Microsoft' as const,
  tags: ['azure', 'security', 'keyvault', 'secrets', 'encryption']
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'decrypt-data-with-key',
    moduleId: 'azure-key-vault',
    title: 'Decrypt data with key',
    description: 'Decrypt data using the latest version of a key. Output of this operation is typically classified as secret and can be visible in the run history.',
    tags: ['azure', 'keyvault', 'decrypt', 'key', 'security'],
    usage: 'Use this action to decrypt data using the latest version of a key from Azure Key Vault.'
  },
  {
    id: 'decrypt-data-with-key-version',
    moduleId: 'azure-key-vault',
    title: 'Decrypt data with key version',
    description: 'Decrypt data using a specific version of a key. Output of this operation is typically classified as secret and can be visible in the run history.',
    tags: ['azure', 'keyvault', 'decrypt', 'key', 'version', 'security'],
    usage: 'Use this action to decrypt data using a specific version of a key from Azure Key Vault.'
  },
  {
    id: 'encrypt-data-with-key',
    moduleId: 'azure-key-vault',
    title: 'Encrypt data with key',
    description: 'Encrypt data using the latest version of a key.',
    tags: ['azure', 'keyvault', 'encrypt', 'key', 'security'],
    usage: 'Use this action to encrypt data using the latest version of a key from Azure Key Vault.'
  },
  {
    id: 'encrypt-data-with-key-version',
    moduleId: 'azure-key-vault',
    title: 'Encrypt data with key version',
    description: 'Encrypt data using a specific version of a key.',
    tags: ['azure', 'keyvault', 'encrypt', 'key', 'version', 'security'],
    usage: 'Use this action to encrypt data using a specific version of a key from Azure Key Vault.'
  },
  {
    id: 'get-key-metadata',
    moduleId: 'azure-key-vault',
    title: 'Get key metadata',
    description: 'Gets metadata of a key.',
    tags: ['azure', 'keyvault', 'key', 'metadata', 'security'],
    usage: 'Use this action to retrieve metadata about a key in Azure Key Vault.'
  },
  {
    id: 'get-key-version-metadata',
    moduleId: 'azure-key-vault',
    title: 'Get key version metadata',
    description: 'Gets metadata of a version of a key.',
    tags: ['azure', 'keyvault', 'key', 'version', 'metadata', 'security'],
    usage: 'Use this action to retrieve metadata about a specific version of a key in Azure Key Vault.'
  },
  {
    id: 'get-secret',
    moduleId: 'azure-key-vault',
    title: 'Get secret',
    description: 'Gets a secret. Output of this operation is typically classified as secret and can be visible in the run history.',
    tags: ['azure', 'keyvault', 'secret', 'security'],
    usage: 'Use this action to retrieve a secret from Azure Key Vault.'
  },
  {
    id: 'get-secret-metadata',
    moduleId: 'azure-key-vault',
    title: 'Get secret metadata',
    description: 'Gets metadata of a secret.',
    tags: ['azure', 'keyvault', 'secret', 'metadata', 'security'],
    usage: 'Use this action to retrieve metadata about a secret in Azure Key Vault.'
  },
  {
    id: 'get-secret-version',
    moduleId: 'azure-key-vault',
    title: 'Get secret version',
    description: 'Gets a version of a secret. Output of this operation is typically classified as secret and can be visible in the run history.',
    tags: ['azure', 'keyvault', 'secret', 'version', 'security'],
    usage: 'Use this action to retrieve a specific version of a secret from Azure Key Vault.'
  },
  {
    id: 'get-secret-version-metadata',
    moduleId: 'azure-key-vault',
    title: 'Get secret version metadata',
    description: 'Gets metadata of a version of a secret.',
    tags: ['azure', 'keyvault', 'secret', 'version', 'metadata', 'security'],
    usage: 'Use this action to retrieve metadata about a specific version of a secret in Azure Key Vault.'
  },
  {
    id: 'list-key-versions',
    moduleId: 'azure-key-vault',
    title: 'List key versions',
    description: 'List versions of a key.',
    tags: ['azure', 'keyvault', 'key', 'versions', 'list', 'security'],
    usage: 'Use this action to list all versions of a key in Azure Key Vault.'
  },
  {
    id: 'list-keys',
    moduleId: 'azure-key-vault',
    title: 'List keys',
    description: 'List keys.',
    tags: ['azure', 'keyvault', 'keys', 'list', 'security'],
    usage: 'Use this action to list all keys in an Azure Key Vault.'
  },
  {
    id: 'list-secret-versions',
    moduleId: 'azure-key-vault',
    title: 'List secret versions',
    description: 'List versions of a secret.',
    tags: ['azure', 'keyvault', 'secret', 'versions', 'list', 'security'],
    usage: 'Use this action to list all versions of a secret in Azure Key Vault.'
  },
  {
    id: 'list-secrets',
    moduleId: 'azure-key-vault',
    title: 'List secrets',
    description: 'List secrets.',
    tags: ['azure', 'keyvault', 'secrets', 'list', 'security'],
    usage: 'Use this action to list all secrets in an Azure Key Vault.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
