import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'office365-outlook',
  title: 'Office 365 Outlook',
  type: 'connector',
  icon: '/assets/connectors/Office 365 Outlook.png',
  description: 'Send and receive emails, manage your calendar, and handle contacts in Office 365.',
  author: 'Microsoft',
  isInstalled: true
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'outlook-send-email',
    moduleId: 'office365-outlook',
    title: 'Send an email',
    description: 'Send an email using Office 365 Outlook',
    tags: ['outlook', 'email', 'send'],
    usage: 'Use this action to send emails through Office 365 Outlook.',
    examples: [
      'Send automated notifications when tasks are completed',
      'Send weekly report summaries to team members'
    ],
    parameters: [
      {
        name: 'to',
        type: 'string',
        description: 'Email addresses of recipients (comma-separated)',
        required: true
      },
      {
        name: 'subject',
        type: 'string',
        description: 'Subject of the email',
        required: true
      },
      {
        name: 'body',
        type: 'string',
        description: 'Body content of the email',
        required: true
      },
      {
        name: 'isHtml',
        type: 'boolean',
        description: 'Whether the body contains HTML formatting',
        required: false
      },
      {
        name: 'cc',
        type: 'string',
        description: 'Email addresses for CC (comma-separated)',
        required: false
      },
      {
        name: 'bcc',
        type: 'string',
        description: 'Email addresses for BCC (comma-separated)',
        required: false
      }
    ]
  },
  {
    id: 'outlook-get-emails',
    moduleId: 'office365-outlook',
    title: 'Get emails',
    description: 'Retrieve emails from Office 365 Outlook',
    tags: ['outlook', 'email', 'receive', 'get'],
    usage: 'Use this action to retrieve emails from your Office 365 Outlook inbox or other folders.',
    examples: [
      'Process incoming support requests automatically',
      'Monitor specific email addresses for important messages'
    ],
    parameters: [
      {
        name: 'folderPath',
        type: 'string',
        description: 'The mail folder to retrieve emails from (e.g., Inbox, Sent Items)',
        required: false
      },
      {
        name: 'from',
        type: 'string',
        description: 'Filter emails from a specific sender',
        required: false
      },
      {
        name: 'subject',
        type: 'string',
        description: 'Filter emails with a specific subject',
        required: false
      },
      {
        name: 'includeAttachments',
        type: 'boolean',
        description: 'Whether to include attachments in the results',
        required: false
      },
      {
        name: 'markAsRead',
        type: 'boolean',
        description: 'Whether to mark retrieved emails as read',
        required: false
      }
    ]
  },
  {
    id: 'outlook-create-event',
    moduleId: 'office365-outlook',
    title: 'Create event',
    description: 'Create a new event in Office 365 calendar',
    tags: ['outlook', 'calendar', 'event', 'meeting'],
    usage: 'Use this action to create calendar events in Office 365 Outlook.',
    examples: [
      'Schedule follow-up meetings after customer inquiries',
      'Create project milestone events automatically'
    ],
    parameters: [
      {
        name: 'subject',
        type: 'string',
        description: 'Subject of the event',
        required: true
      },
      {
        name: 'start',
        type: 'date',
        description: 'Start time of the event',
        required: true
      },
      {
        name: 'end',
        type: 'date',
        description: 'End time of the event',
        required: true
      },
      {
        name: 'location',
        type: 'string',
        description: 'Location of the event',
        required: false
      },
      {
        name: 'attendees',
        type: 'array',
        description: 'Email addresses of attendees',
        required: false
      },
      {
        name: 'body',
        type: 'string',
        description: 'Body content of the event',
        required: false
      }
    ]
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);