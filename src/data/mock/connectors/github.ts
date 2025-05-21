import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'github',
  title: 'GitHub',
  type: 'connector',
  icon: '/assets/connectors/GitHub.png',
  description: 'Automate workflows with GitHub repositories, issues, and pull requests.',
  author: 'Microsoft',
  isInstalled: true
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'github-create-issue',
    moduleId: 'github',
    title: 'Create an issue',
    description: 'Create a new issue in a GitHub repository',
    tags: ['github', 'issue', 'repository'],
    usage: 'Use this action to create new issues in a GitHub repository programmatically.',
    examples: [
      'Create an issue when a bug is detected in your application',
      'Create issues for new feature requests based on user feedback'
    ],
    parameters: [
      {
        name: 'owner',
        type: 'string',
        description: 'The owner of the repository',
        required: true
      },
      {
        name: 'repository',
        type: 'string',
        description: 'The name of the repository',
        required: true
      },
      {
        name: 'title',
        type: 'string',
        description: 'The title of the issue',
        required: true
      },
      {
        name: 'body',
        type: 'string',
        description: 'The body content of the issue',
        required: false
      },
      {
        name: 'labels',
        type: 'array',
        description: 'Labels to assign to the issue',
        required: false
      }
    ]
  },
  {
    id: 'github-list-issues',
    moduleId: 'github',
    title: 'List repository issues',
    description: 'List issues from a GitHub repository',
    tags: ['github', 'issue', 'list', 'repository'],
    usage: 'Use this action to retrieve a list of issues from a GitHub repository with optional filtering.',
    examples: [
      'List all open issues assigned to a specific user',
      'Find all issues with a specific label or milestone'
    ],
    parameters: [
      {
        name: 'owner',
        type: 'string',
        description: 'The owner of the repository',
        required: true
      },
      {
        name: 'repository',
        type: 'string',
        description: 'The name of the repository',
        required: true
      },
      {
        name: 'state',
        type: 'string',
        description: 'Filter issues by state (open, closed, or all)',
        required: false
      },
      {
        name: 'labels',
        type: 'string',
        description: 'Comma-separated list of label names',
        required: false
      }
    ]
  },
  {
    id: 'github-create-pull-request',
    moduleId: 'github',
    title: 'Create a pull request',
    description: 'Create a new pull request in a GitHub repository',
    tags: ['github', 'pull request', 'repository'],
    usage: 'Use this action to create pull requests programmatically between branches.',
    examples: [
      'Create a pull request when a feature branch is ready for review',
      'Automatically create pull requests for dependency updates'
    ],
    parameters: [
      {
        name: 'owner',
        type: 'string',
        description: 'The owner of the repository',
        required: true
      },
      {
        name: 'repository',
        type: 'string',
        description: 'The name of the repository',
        required: true
      },
      {
        name: 'title',
        type: 'string',
        description: 'The title of the pull request',
        required: true
      },
      {
        name: 'head',
        type: 'string',
        description: 'The name of the branch where your changes are implemented',
        required: true
      },
      {
        name: 'base',
        type: 'string',
        description: 'The name of the branch you want the changes pulled into',
        required: true
      },
      {
        name: 'body',
        type: 'string',
        description: 'The contents of the pull request',
        required: false
      }
    ]
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);