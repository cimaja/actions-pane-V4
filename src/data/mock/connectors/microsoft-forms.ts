import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'microsoft-forms',
  title: 'Microsoft Forms',
  type: 'connector',
  icon: '/assets/connectors/Microsoft Forms.png',
  description: 'Create surveys, quizzes, and polls, and easily view results as they come in.',
  author: 'Microsoft',
  isInstalled: true
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'forms-get-responses',
    moduleId: 'microsoft-forms',
    title: 'Get form responses',
    description: 'Retrieve responses submitted to a Microsoft Form',
    tags: ['forms', 'response', 'survey', 'poll'],
    usage: 'Use this action to retrieve and process responses submitted to a Microsoft Form.',
    examples: [
      'Collect survey responses and save them to a database',
      'Process quiz answers and calculate scores'
    ],
    parameters: [
      {
        name: 'formId',
        type: 'string',
        description: 'The ID of the Microsoft Form',
        required: true
      },
      {
        name: 'top',
        type: 'number',
        description: 'Number of responses to retrieve (default is all)',
        required: false
      },
      {
        name: 'includeQuestions',
        type: 'boolean',
        description: 'Whether to include question text in the results',
        required: false
      }
    ]
  },
  {
    id: 'forms-get-response-details',
    moduleId: 'microsoft-forms',
    title: 'Get response details',
    description: 'Get detailed information about a specific form response',
    tags: ['forms', 'response', 'details'],
    usage: 'Use this action to get detailed information about a specific response to a Microsoft Form.',
    examples: [
      'Get details of a specific survey response',
      'Analyze individual quiz submissions'
    ],
    parameters: [
      {
        name: 'formId',
        type: 'string',
        description: 'The ID of the Microsoft Form',
        required: true
      },
      {
        name: 'responseId',
        type: 'string',
        description: 'The ID of the response to retrieve',
        required: true
      }
    ]
  },
  {
    id: 'forms-create-form',
    moduleId: 'microsoft-forms',
    title: 'Create a form',
    description: 'Create a new Microsoft Form',
    tags: ['forms', 'create', 'survey', 'quiz'],
    usage: 'Use this action to programmatically create a new Microsoft Form.',
    examples: [
      'Create a feedback survey for a new product',
      'Generate a quiz based on educational content'
    ],
    parameters: [
      {
        name: 'title',
        type: 'string',
        description: 'Title of the form',
        required: true
      },
      {
        name: 'description',
        type: 'string',
        description: 'Description of the form',
        required: false
      },
      {
        name: 'questions',
        type: 'array',
        description: 'Array of questions to add to the form',
        required: false
      }
    ]
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);