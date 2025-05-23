import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'github',
  title: 'GitHub',
  type: 'connector',
  icon: '/assets/connectors/GitHub.png',
  description: 'GitHub is a web-based Git repository hosting service. It offers all of the distributed revision control and source code management (SCM) functionality of Git as well as adding its own features.',
  author: 'Microsoft',
  isInstalled: true,
  category: 'Third party' as const
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'add-selected-repository-to-an-organization-secret',
    moduleId: 'github',
    title: 'Add selected repository to an organization secret (Preview)',
    description: 'Adds a repository to an organization secret when the visibility for repository access is set to selected. The visibility is set when you Create or update an organization secret. You must authenticate using an access token with the admin:org scope to use this endpoint. GitHub Apps must have the secrets organization permission to use this endpoint.',
    tags: ['github', 'organization', 'secret', 'repository'],
    usage: 'Use this action to add a repository to an organization secret with selected visibility.'
  },
  {
    id: 'check-if-a-user-is-a-repository-collaborator',
    moduleId: 'github',
    title: 'Check if a user is a repository collaborator',
    description: 'Check if a user is a repository collaborator.',
    tags: ['github', 'repository', 'collaborator', 'user'],
    usage: 'Use this action to verify if a specific user is a collaborator on a repository.'
  },
  {
    id: 'compare-two-commits',
    moduleId: 'github',
    title: 'Compare two commits (Preview)',
    description: 'Both base and head must be branch names in repositoryName. To compare branches across other repositories in the same network as repositoryName, use the format <USERNAME>:branch. The response is equivalent to running the git log base..head command; however, commits are returned in chronological order.',
    tags: ['github', 'commits', 'compare', 'branches'],
    usage: 'Use this action to compare commits between two branches and view the differences.'
  },
  {
    id: 'create-a-pull-request',
    moduleId: 'github',
    title: 'Create a pull request (Preview)',
    description: 'This operation is to create a pull request in a repository. To open or update a pull request in a public repository, you must have write access to the head or the source branch. For organization-owned repositories, you must be a member of the organization that owns the repository to create a pull request.',
    tags: ['github', 'pull-request', 'repository', 'create'],
    usage: 'Use this action to create a new pull request to propose and collaborate on changes to a repository.'
  },
  {
    id: 'create-a-reference',
    moduleId: 'github',
    title: 'Create a reference (Preview)',
    description: 'Creates a reference for your repository. You are unable to create new references for empty repositories, even if the commit SHA-1 hash used exists. Empty repositories are repositories without branches.',
    tags: ['github', 'reference', 'repository', 'git'],
    usage: 'Use this action to create a new reference (branch or tag) in a repository.'
  },
  {
    id: 'create-a-repository-dispatch-event',
    moduleId: 'github',
    title: 'Create a repository dispatch event (Preview)',
    description: 'This operation is to trigger a webhook event called repository_dispatch when you want activity that happens outside of GitHub to trigger a GitHub Actions workflow or GitHub App webhook. You must configure your GitHub Actions workflow or GitHub App to run when the repository_dispatch event occurs.',
    tags: ['github', 'repository', 'dispatch', 'webhook', 'actions'],
    usage: 'Use this action to trigger GitHub Actions workflows from external events.'
  },
  {
    id: 'create-a-repository-using-a-template',
    moduleId: 'github',
    title: 'Create a repository using a template (Preview)',
    description: 'Creates a new repository using a repository template. The authenticated user must own or be a member of an organization that owns the repository.',
    tags: ['github', 'repository', 'template', 'create'],
    usage: 'Use this action to create a new repository based on an existing template repository.'
  },
  {
    id: 'create-an-issue',
    moduleId: 'github',
    title: 'Create an issue',
    description: 'This operation is used to create a new issue for a specific repository.',
    tags: ['github', 'issue', 'repository', 'create'],
    usage: 'Use this action to create a new issue in a GitHub repository.'
  },
  {
    id: 'create-or-update-a-repository-secret',
    moduleId: 'github',
    title: 'Create or update a repository secret (Preview)',
    description: 'Creates or updates a repository secret with an encrypted value. Encrypt your secret using LibSodium.',
    tags: ['github', 'repository', 'secret', 'encrypt'],
    usage: 'Use this action to securely store sensitive information as repository secrets.'
  },
  {
    id: 'deletes-a-github-webhook',
    moduleId: 'github',
    title: 'Deletes a GitHub Webhook (Preview)',
    description: 'Deletes a GitHub Webhook',
    tags: ['github', 'webhook', 'delete'],
    usage: 'Use this action to remove a webhook from a GitHub repository.'
  },
  {
    id: 'find-issues-by-state-and-keyword',
    moduleId: 'github',
    title: 'Find issues by state and keyword',
    description: 'Find issues by state and keyword.',
    tags: ['github', 'issues', 'search', 'filter'],
    usage: 'Use this action to search for issues matching specific states and keywords.'
  },
  {
    id: 'get-a-particular-issue-of-a-repository',
    moduleId: 'github',
    title: 'Get a particular issue of a repository',
    description: 'Get a particular issue of a repository.',
    tags: ['github', 'issue', 'repository', 'get'],
    usage: 'Use this action to retrieve detailed information about a specific issue.'
  },
  {
    id: 'get-a-pull-request',
    moduleId: 'github',
    title: 'Get a pull request (Preview)',
    description: 'This operation is used to get a pull request for the repository.',
    tags: ['github', 'pull-request', 'repository', 'get'],
    usage: 'Use this action to retrieve detailed information about a specific pull request.'
  },
  {
    id: 'get-a-reference',
    moduleId: 'github',
    title: 'Get a reference (Preview)',
    description: 'Returns a single reference from your Git database. The reference parameter must be formatted as heads/<branch name> for branches and tags/<tag name> for tags. If the reference doesn\'t match an existing ref, a 404 is returned.',
    tags: ['github', 'reference', 'git', 'branch', 'tag'],
    usage: 'Use this action to get information about a specific Git reference (branch or tag).'
  },
  {
    id: 'get-a-repository-by-id',
    moduleId: 'github',
    title: 'Get a repository by Id (Preview)',
    description: 'Gets a repository by Id.',
    tags: ['github', 'repository', 'get'],
    usage: 'Use this action to retrieve repository information using its unique ID.'
  },
  {
    id: 'get-a-repository-public-key',
    moduleId: 'github',
    title: 'Get a repository public key (Preview)',
    description: 'Get your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets.',
    tags: ['github', 'repository', 'public-key', 'secrets'],
    usage: 'Use this action to get the public key needed to encrypt repository secrets.'
  },
  {
    id: 'get-all-issues-of-a-repository',
    moduleId: 'github',
    title: 'Get all issues of a repository',
    description: 'Get all issues of a repository.',
    tags: ['github', 'issues', 'repository', 'list'],
    usage: 'Use this action to retrieve all issues from a GitHub repository.'
  },
  {
    id: 'get-all-pull-requests-of-a-repository',
    moduleId: 'github',
    title: 'Get all Pull Requests of A Repository',
    description: 'Get all Pull Requests of A Repository.',
    tags: ['github', 'pull-requests', 'repository', 'list'],
    usage: 'Use this action to retrieve all pull requests from a GitHub repository.'
  },
  {
    id: 'get-the-authenticated-user',
    moduleId: 'github',
    title: 'Get the authenticated user',
    description: 'Get the authenticated user.',
    tags: ['github', 'user', 'authentication'],
    usage: 'Use this action to retrieve information about the currently authenticated GitHub user.'
  },
  {
    id: 'get-the-list-of-files-from-a-pull-request',
    moduleId: 'github',
    title: 'Get the list of files from a pull request (Preview)',
    description: 'This operation is used to get the list of files from a pull request for the repository.',
    tags: ['github', 'pull-request', 'files', 'list'],
    usage: 'Use this action to retrieve all files changed in a specific pull request.'
  },
  {
    id: 'list-repository-collaborators',
    moduleId: 'github',
    title: 'List repository collaborators',
    description: 'List repository collaborators.',
    tags: ['github', 'repository', 'collaborators', 'list'],
    usage: 'Use this action to retrieve all collaborators for a GitHub repository.'
  },
  {
    id: 'lists-all-labels-for-a-repository',
    moduleId: 'github',
    title: 'Lists all labels for a repository',
    description: 'Lists all labels for a repository.',
    tags: ['github', 'repository', 'labels', 'list'],
    usage: 'Use this action to retrieve all labels defined in a GitHub repository.'
  },
  {
    id: 'lists-all-labels-for-an-issue',
    moduleId: 'github',
    title: 'Lists all labels for an issue',
    description: 'Lists all labels for an issue.',
    tags: ['github', 'issue', 'labels', 'list'],
    usage: 'Use this action to retrieve all labels assigned to a specific issue.'
  },
  {
    id: 'lists-all-milestones-of-a-repository',
    moduleId: 'github',
    title: 'Lists all milestones of a repository',
    description: 'Lists all milestones of a repository.',
    tags: ['github', 'repository', 'milestones', 'list'],
    usage: 'Use this action to retrieve all milestones defined in a GitHub repository.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);