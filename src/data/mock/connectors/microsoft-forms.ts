import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'microsoft-forms',
  title: 'Microsoft Forms',
  type: 'connector',
  icon: '/assets/connectors/Microsoft Forms.png',
  description: 'Microsoft Forms is a new part of Office 365 Education that allows teachers and students to quickly and easily create custom quizzes, surveys, questionnaires, registrations and more.',
  author: 'Microsoft',
  isInstalled: true,
  category: 'Microsoft' as const
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'get-response-details',
    moduleId: 'microsoft-forms',
    title: 'Get response details',
    description: 'This action retrieves a form response',
    tags: ['forms', 'response', 'details'],
    usage: 'Use this action to retrieve detailed information about a specific form response.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);