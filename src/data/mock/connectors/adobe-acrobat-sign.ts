import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'adobe-acrobat-sign',
  title: 'Adobe Acrobat Sign',
  type: 'connector',
  icon: '/assets/connectors/Adobe Acrobat Sign.png',
  description: 'Automate document signing workflows with Adobe Acrobat Sign.',
  author: 'Adobe',
  isInstalled: true
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'adobe-sign-create-agreement',
    moduleId: 'adobe-acrobat-sign',
    title: 'Create an agreement',
    description: 'Create a new agreement to be signed',
    tags: ['adobe', 'sign', 'agreement', 'document'],
    usage: 'Use this action to create a new agreement that needs to be signed by one or more participants.',
    examples: [
      'Create an employment contract to be signed by a new employee',
      'Create a sales agreement to be signed by multiple parties'
    ],
    parameters: [
      {
        name: 'documentName',
        type: 'string',
        description: 'Name of the agreement document',
        required: true
      },
      {
        name: 'fileContent',
        type: 'object',
        description: 'Content of the file to be signed',
        required: true
      },
      {
        name: 'recipientEmail',
        type: 'string',
        description: 'Email address of the recipient who will sign the agreement',
        required: true
      },
      {
        name: 'message',
        type: 'string',
        description: 'Message to include in the agreement email',
        required: false
      }
    ]
  },
  {
    id: 'adobe-sign-get-agreement',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get agreement info',
    description: 'Retrieve information about an existing agreement',
    tags: ['adobe', 'sign', 'agreement', 'retrieve'],
    usage: 'Use this action to get details about an existing agreement, including its status and participants.',
    examples: [
      'Track the status of a contract sent for signature',
      'Verify if all parties have signed an agreement'
    ],
    parameters: [
      {
        name: 'agreementId',
        type: 'string',
        description: 'ID of the agreement to retrieve',
        required: true
      }
    ]
  },
  {
    id: 'adobe-sign-send-reminder',
    moduleId: 'adobe-acrobat-sign',
    title: 'Send agreement reminder',
    description: 'Send a reminder to participants who have not signed an agreement',
    tags: ['adobe', 'sign', 'reminder', 'notification'],
    usage: 'Use this action to send a reminder to participants who have not yet signed an agreement.',
    examples: [
      'Send a reminder for an overdue signature',
      'Follow up with participants who have not completed their signature'
    ],
    parameters: [
      {
        name: 'agreementId',
        type: 'string',
        description: 'ID of the agreement to send a reminder for',
        required: true
      },
      {
        name: 'recipientEmail',
        type: 'string',
        description: 'Email of the recipient to send the reminder to',
        required: true
      },
      {
        name: 'reminderMessage',
        type: 'string',
        description: 'Custom message to include in the reminder',
        required: false
      }
    ]
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);