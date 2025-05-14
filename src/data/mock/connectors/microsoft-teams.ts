import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'microsoft-teams',
  title: 'Microsoft Teams',
  type: 'connector',
  icon: '/assets/connectors/Microsoft Teams.png',
  description: 'Automate tasks in Microsoft Teams such as sending messages, creating teams, and managing channels.',
  author: 'Microsoft',
  isInstalled: true
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'teams-send-message',
    moduleId: 'microsoft-teams',
    title: 'Send a message',
    description: 'Send a message to a channel or chat in Microsoft Teams',
    tags: ['teams', 'message', 'communication'],
    usage: 'Use this action to send messages to Teams channels or direct chats programmatically.',
    examples: [
      'Send a notification to a team channel when a task is completed',
      'Send a daily report summary to a specific channel'
    ],
    parameters: [
      {
        name: 'teamId',
        type: 'string',
        description: 'The ID of the team where the message will be sent',
        required: true
      },
      {
        name: 'channelId',
        type: 'string',
        description: 'The ID of the channel where the message will be sent',
        required: true
      },
      {
        name: 'message',
        type: 'string',
        description: 'The content of the message to send',
        required: true
      },
      {
        name: 'includeAttachments',
        type: 'boolean',
        description: 'Whether to include attachments with the message',
        required: false
      }
    ]
  },
  {
    id: 'teams-create-channel',
    moduleId: 'microsoft-teams',
    title: 'Create a channel',
    description: 'Create a new channel in a Microsoft Teams team',
    tags: ['teams', 'channel', 'creation'],
    usage: 'Use this action to programmatically create new channels in Teams.',
    examples: [
      'Create project-specific channels automatically when a new project is started',
      'Create temporary channels for events or meetings'
    ],
    parameters: [
      {
        name: 'teamId',
        type: 'string',
        description: 'The ID of the team where the channel will be created',
        required: true
      },
      {
        name: 'channelName',
        type: 'string',
        description: 'The name of the new channel',
        required: true
      },
      {
        name: 'description',
        type: 'string',
        description: 'The description of the new channel',
        required: false
      },
      {
        name: 'isPrivate',
        type: 'boolean',
        description: 'Whether the channel should be private',
        required: false
      }
    ]
  },
  {
    id: 'teams-get-channel-messages',
    moduleId: 'microsoft-teams',
    title: 'Get channel messages',
    description: 'Retrieve messages from a Microsoft Teams channel',
    tags: ['teams', 'messages', 'retrieval'],
    usage: 'Use this action to retrieve and process messages from Teams channels.',
    examples: [
      'Collect feedback messages from a dedicated channel',
      'Archive messages from project channels for documentation'
    ],
    parameters: [
      {
        name: 'teamId',
        type: 'string',
        description: 'The ID of the team containing the channel',
        required: true
      },
      {
        name: 'channelId',
        type: 'string',
        description: 'The ID of the channel to retrieve messages from',
        required: true
      },
      {
        name: 'maxMessages',
        type: 'number',
        description: 'Maximum number of messages to retrieve',
        required: false
      },
      {
        name: 'startDate',
        type: 'date',
        description: 'Retrieve messages sent after this date',
        required: false
      }
    ]
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
