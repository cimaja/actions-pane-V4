import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'azure-devops',
  title: 'Azure DevOps',
  type: 'connector',
  icon: '/assets/connectors/Azure DevOps.png',
  description: 'Azure DevOps provides services for teams to share code, track work, and ship software - for any language, all in a single package. It is the perfect complement to your IDE.',
  author: 'Microsoft',
  isInstalled: true,
  category: 'Microsoft' as const,
  tags: ['devops', 'ci/cd', 'version-control']
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'create-a-new-release',
    moduleId: 'azure-devops',
    title: 'Create a new release',
    description: 'Create a release, based on an existing release definition.',
    tags: ['release', 'deployment'],
    usage: 'Use this action to create a new release based on an existing release definition.'
  },
  {
    id: 'create-a-work-item',
    moduleId: 'azure-devops',
    title: 'Create a work item',
    description: 'Create a new work item with the provided attributes.',
    tags: ['work-item', 'create'],
    usage: 'Use this action to create a new work item with specified attributes.'
  },
  {
    id: 'get-a-user-profile',
    moduleId: 'azure-devops',
    title: 'Get a User Profile',
    description: 'Gets a user profile.',
    tags: ['user', 'profile'],
    usage: 'Use this action to retrieve information about a user profile.'
  },
  {
    id: 'get-query-results',
    moduleId: 'azure-devops',
    title: 'Get query results',
    description: 'Retrieves the result of a work item query.',
    tags: ['work-item', 'query', 'search'],
    usage: 'Use this action to retrieve the results of a work item query.'
  },
  {
    id: 'get-work-item-children',
    moduleId: 'azure-devops',
    title: 'Get work item children',
    description: 'Get a list of children (max size 1000) of a single work item.',
    tags: ['work-item', 'children', 'hierarchy'],
    usage: 'Use this action to retrieve the children of a specific work item.'
  },
  {
    id: 'get-work-item-details',
    moduleId: 'azure-devops',
    title: 'Get work item details',
    description: 'Get the details of a single work item.',
    tags: ['work-item', 'details'],
    usage: 'Use this action to retrieve detailed information about a specific work item.'
  },
  {
    id: 'list-git-repositories',
    moduleId: 'azure-devops',
    title: 'List Git repositories',
    description: 'Retrieves the list of Git repositories in a project.',
    tags: ['git', 'repositories', 'list'],
    usage: 'Use this action to retrieve a list of Git repositories in a project.'
  },
  {
    id: 'list-iterations',
    moduleId: 'azure-devops',
    title: 'List iterations',
    description: 'Retrieves the list of iterations for a project.',
    tags: ['iterations', 'sprints', 'list'],
    usage: 'Use this action to retrieve a list of iterations (sprints) for a project.'
  },
  {
    id: 'list-organizations',
    moduleId: 'azure-devops',
    title: 'List Organizations',
    description: 'Retrieves the list of Organizations the user is a member of.',
    tags: ['organizations', 'list'],
    usage: 'Use this action to retrieve a list of Organizations the user is a member of.'
  },
  {
    id: 'list-pipeline-runs',
    moduleId: 'azure-devops',
    title: 'List pipeline runs',
    description: 'Gets top 10000 runs for a particular pipeline',
    tags: ['pipeline', 'runs', 'list'],
    usage: 'Use this action to retrieve the top 10000 runs for a specific pipeline.'
  },
  {
    id: 'list-pipelines',
    moduleId: 'azure-devops',
    title: 'List pipelines',
    description: 'Retrieves the list of pipelines in a project.',
    tags: ['pipelines', 'list'],
    usage: 'Use this action to retrieve a list of pipelines in a project.'
  },
  {
    id: 'list-projects',
    moduleId: 'azure-devops',
    title: 'List projects',
    description: 'Retrieves the list of projects in an Organization.',
    tags: ['projects', 'list'],
    usage: 'Use this action to retrieve a list of projects in an Organization.'
  },
  {
    id: 'list-queries-within-folder',
    moduleId: 'azure-devops',
    title: 'List queries within folder',
    description: 'Retrieves the list of work item queries within a folder for a given project.',
    tags: ['queries', 'folder', 'list'],
    usage: 'Use this action to retrieve a list of work item queries within a folder for a project.'
  },
  {
    id: 'list-release-definitions',
    moduleId: 'azure-devops',
    title: 'List release definitions',
    description: 'Retrieves the list of release definitions associated with a project.',
    tags: ['release', 'definitions', 'list'],
    usage: 'Use this action to retrieve a list of release definitions for a project.'
  },
  {
    id: 'list-root-level-queries',
    moduleId: 'azure-devops',
    title: 'List root level queries',
    description: 'Retrieves the list of root-level work item queries in a project.',
    tags: ['queries', 'root-level', 'list'],
    usage: 'Use this action to retrieve a list of root-level work item queries in a project.'
  },
  {
    id: 'list-work-item-types',
    moduleId: 'azure-devops',
    title: 'List work item types',
    description: 'Retrieves the list of Work Item Types accessible in a given Azure DevOps project.',
    tags: ['work-item', 'types', 'list'],
    usage: 'Use this action to retrieve a list of Work Item Types available in a project.'
  },
  {
    id: 'list-work-items',
    moduleId: 'azure-devops',
    title: 'List work items',
    description: 'Returns a list of work items.',
    tags: ['work-item', 'list'],
    usage: 'Use this action to retrieve a list of work items.'
  },
  {
    id: 'queue-a-new-build',
    moduleId: 'azure-devops',
    title: 'Queue a new build',
    description: 'Create a build, based on an existing build definition, and add it to the build queue.',
    tags: ['build', 'queue', 'create'],
    usage: 'Use this action to create and queue a new build based on an existing build definition.'
  },
  {
    id: 'send-an-http-request-to-azure-devops',
    moduleId: 'azure-devops',
    title: 'Send an HTTP request to Azure DevOps',
    description: 'Construct an Azure DevOps REST API request to invoke. Please refer to the following link for all available endpoints: https://docs.microsoft.com/rest/api/azure/devops',
    tags: ['http', 'api', 'request'],
    usage: 'Use this action to send custom HTTP requests to the Azure DevOps REST API.'
  },
  {
    id: 'update-a-work-item',
    moduleId: 'azure-devops',
    title: 'Update a work item',
    description: 'Update an existing work item by id.',
    tags: ['work-item', 'update'],
    usage: 'Use this action to update an existing work item by its ID.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = (): DetailedActionItem[] => {
  return [...actions];
};

// Helper function to get an action by ID
export const getActionById = (id: string): DetailedActionItem | undefined => {
  return actions.find(action => action.id === id);
};
