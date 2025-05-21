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
    id: 'assign-category-to-multiple-emails',
    moduleId: 'office365-outlook',
    title: 'Assign a category to multiple emails',
    description: 'This operation assigns an Outlook category to multiple emails.',
    tags: ['outlook', 'email', 'category', 'multiple'],
    usage: 'Use this action to assign a category to multiple emails at once.'
  },
  {
    id: 'assign-outlook-category',
    moduleId: 'office365-outlook',
    title: 'Assigns an Outlook category',
    description: 'This operation assigns an Outlook category to an email.',
    tags: ['outlook', 'email', 'category'],
    usage: 'Use this action to assign a category to a single email.'
  },
  {
    id: 'create-contact-v2',
    moduleId: 'office365-outlook',
    title: 'Create contact (V2)',
    description: 'This operation creates a new contact in a contacts folder.',
    tags: ['outlook', 'contact', 'create'],
    usage: 'Use this action to add a new contact to your Outlook contacts.'
  },
  {
    id: 'create-event-v4',
    moduleId: 'office365-outlook',
    title: 'Create event (V4)',
    description: 'This operation creates a new event in a calendar.',
    tags: ['outlook', 'calendar', 'event', 'create'],
    usage: 'Use this action to schedule a new event in your Outlook calendar.'
  },
  {
    id: 'delete-contact-v2',
    moduleId: 'office365-outlook',
    title: 'Delete contact (V2)',
    description: 'This operation deletes a contact from a contacts folder.',
    tags: ['outlook', 'contact', 'delete'],
    usage: 'Use this action to remove a contact from your Outlook contacts.'
  },
  {
    id: 'delete-email-v2',
    moduleId: 'office365-outlook',
    title: 'Delete email (V2)',
    description: 'This operation deletes an email by id.',
    tags: ['outlook', 'email', 'delete'],
    usage: 'Use this action to delete a specific email from your mailbox.'
  },
  {
    id: 'delete-event-v2',
    moduleId: 'office365-outlook',
    title: 'Delete event (V2)',
    description: 'This operation deletes an event in a calendar.',
    tags: ['outlook', 'calendar', 'event', 'delete'],
    usage: 'Use this action to remove an event from your Outlook calendar.'
  },
  {
    id: 'draft-email-message',
    moduleId: 'office365-outlook',
    title: 'Draft an email message',
    description: 'This operation drafts an email message.',
    tags: ['outlook', 'email', 'draft'],
    usage: 'Use this action to create a draft email without sending it.'
  },
  {
    id: 'export-email-v2',
    moduleId: 'office365-outlook',
    title: 'Export email (V2)',
    description: 'Export the content of the email in the EML file format.',
    tags: ['outlook', 'email', 'export', 'eml'],
    usage: 'Use this action to export an email in EML format for archiving or sharing.'
  },
  {
    id: 'find-meeting-times-v2',
    moduleId: 'office365-outlook',
    title: 'Find meeting times (V2)',
    description: 'Find meeting time suggestions based on organizer, attendee availability, and time or location constraints',
    tags: ['outlook', 'calendar', 'meeting', 'scheduling'],
    usage: 'Use this action to find suitable meeting times based on participants\'s availability.'
  },
  {
    id: 'flag-email-v2',
    moduleId: 'office365-outlook',
    title: 'Flag email (V2)',
    description: 'This operation updates an email flag.',
    tags: ['outlook', 'email', 'flag'],
    usage: 'Use this action to flag an email for follow-up or mark it as complete.'
  },
  {
    id: 'forward-email-v2',
    moduleId: 'office365-outlook',
    title: 'Forward an email (V2)',
    description: 'Forward an email.',
    tags: ['outlook', 'email', 'forward'],
    usage: 'Use this action to forward an existing email to other recipients.'
  },
  {
    id: 'get-attachment-v2',
    moduleId: 'office365-outlook',
    title: 'Get Attachment (V2)',
    description: 'This operation gets an email attachment by id.',
    tags: ['outlook', 'email', 'attachment'],
    usage: 'Use this action to retrieve a specific attachment from an email.'
  },
  {
    id: 'get-calendar-view-of-events-v3',
    moduleId: 'office365-outlook',
    title: 'Get calendar view of events (V3)',
    description: 'This operation gets all events (including instances of recurrences) in a calendar using Graph API. Recurrence property is null in this case.',
    tags: ['outlook', 'calendar', 'events', 'view'],
    usage: 'Use this action to get a calendar view of events within a specific time range.'
  },
  {
    id: 'get-calendars-v2',
    moduleId: 'office365-outlook',
    title: 'Get calendars (V2)',
    description: 'This operation lists available calendars.',
    tags: ['outlook', 'calendars', 'list'],
    usage: 'Use this action to retrieve all available calendars in your Outlook account.'
  },
  {
    id: 'get-contact-v2',
    moduleId: 'office365-outlook',
    title: 'Get contact (V2)',
    description: 'This operation gets a specific contact from a contacts folder.',
    tags: ['outlook', 'contact', 'get'],
    usage: 'Use this action to retrieve details about a specific contact.'
  },
  {
    id: 'get-contact-folders-v2',
    moduleId: 'office365-outlook',
    title: 'Get contact folders (V2)',
    description: 'This operation lists available contacts folders using Graph API',
    tags: ['outlook', 'contact', 'folders'],
    usage: 'Use this action to retrieve all contact folders in your Outlook account.'
  },
  {
    id: 'get-contacts-v2',
    moduleId: 'office365-outlook',
    title: 'Get contacts (V2)',
    description: 'This operation gets contacts from a contacts folder.',
    tags: ['outlook', 'contacts', 'list'],
    usage: 'Use this action to retrieve all contacts from a specific folder.'
  },
  {
    id: 'get-email-v2',
    moduleId: 'office365-outlook',
    title: 'Get email (V2)',
    description: 'This operation gets an email by id.',
    tags: ['outlook', 'email', 'get'],
    usage: 'Use this action to retrieve a specific email by its ID.'
  },
  {
    id: 'get-emails-v3',
    moduleId: 'office365-outlook',
    title: 'Get emails (V3)',
    description: 'This operation gets emails from a folder via graph apis. Please note that filtering related to these fields: To, Cc, To Or Cc, From, Importance, Fetch Only With Attachments, Subject Filter, is performed using first 250 items in a given mail folder. To avoid that limitation you can use \'Search Query\' field.',
    tags: ['outlook', 'emails', 'list', 'filter'],
    usage: 'Use this action to retrieve emails from a specific folder with filtering options.'
  },
  {
    id: 'get-event-v3',
    moduleId: 'office365-outlook',
    title: 'Get event (V3)',
    description: 'This operation gets a specific event from a calendar using Graph API. (V3)',
    tags: ['outlook', 'calendar', 'event', 'get'],
    usage: 'Use this action to retrieve details about a specific calendar event.'
  },
  {
    id: 'get-events-v4',
    moduleId: 'office365-outlook',
    title: 'Get events (V4)',
    description: 'This operation gets events from a calendar using Graph API. (V4)',
    tags: ['outlook', 'calendar', 'events', 'list'],
    usage: 'Use this action to retrieve all events from a specific calendar.'
  },
  {
    id: 'get-mail-tips-for-mailbox-v2',
    moduleId: 'office365-outlook',
    title: 'Get mail tips for a mailbox (V2)',
    description: 'Get mail tips for a mailbox such as automatic replies / OOF message or if the mailbox is full. This is not available in GccHigh and Mooncake.',
    tags: ['outlook', 'mailbox', 'tips', 'oof'],
    usage: 'Use this action to check if a recipient has automatic replies set or if their mailbox is full.'
  },
  {
    id: 'get-outlook-category-names',
    moduleId: 'office365-outlook',
    title: 'Get Outlook category names',
    description: 'This operation gets Outlook category display names.',
    tags: ['outlook', 'category', 'names'],
    usage: 'Use this action to retrieve all available category names in your Outlook account.'
  },
  {
    id: 'get-room-lists-v2',
    moduleId: 'office365-outlook',
    title: 'Get room lists (V2)',
    description: 'Get all the room lists defined in the user\'s tenant',
    tags: ['outlook', 'rooms', 'lists'],
    usage: 'Use this action to retrieve all room lists available in your organization.'
  },
  {
    id: 'get-rooms-v2',
    moduleId: 'office365-outlook',
    title: 'Get rooms (V2)',
    description: 'Get all the meeting rooms defined in the user\'s tenant',
    tags: ['outlook', 'rooms'],
    usage: 'Use this action to retrieve all meeting rooms available in your organization.'
  },
  {
    id: 'get-rooms-in-room-list-v2',
    moduleId: 'office365-outlook',
    title: 'Get rooms in room list (V2)',
    description: 'Get the meeting rooms in a specific room list',
    tags: ['outlook', 'rooms', 'list'],
    usage: 'Use this action to retrieve all meeting rooms in a specific room list.'
  },
  {
    id: 'mark-as-read-or-unread-v3',
    moduleId: 'office365-outlook',
    title: 'Mark as read or unread (V3)',
    description: 'This operation marks an email as read/unread.',
    tags: ['outlook', 'email', 'read', 'unread'],
    usage: 'Use this action to mark emails as read or unread.'
  },
  {
    id: 'move-email-v2',
    moduleId: 'office365-outlook',
    title: 'Move email (V2)',
    description: 'This operation moves an email to the specified folder within the same mailbox.',
    tags: ['outlook', 'email', 'move', 'folder'],
    usage: 'Use this action to move an email to a different folder.'
  },
  {
    id: 'reply-to-email-v3',
    moduleId: 'office365-outlook',
    title: 'Reply to email (V3)',
    description: 'This operation replies to an email.',
    tags: ['outlook', 'email', 'reply'],
    usage: 'Use this action to reply to an existing email.'
  },
  {
    id: 'respond-to-event-invite-v2',
    moduleId: 'office365-outlook',
    title: 'Respond to an event invite (V2)',
    description: 'Respond to an event invite.',
    tags: ['outlook', 'calendar', 'event', 'respond'],
    usage: 'Use this action to accept, decline, or tentatively accept a calendar invitation.'
  },
  {
    id: 'send-draft-message',
    moduleId: 'office365-outlook',
    title: 'Send a Draft message',
    description: 'This operation sends a Draft message.',
    tags: ['outlook', 'email', 'draft', 'send'],
    usage: 'Use this action to send an email that was previously saved as a draft.'
  },
  {
    id: 'send-email-v2',
    moduleId: 'office365-outlook',
    title: 'Send an email (V2)',
    description: 'This operation sends an email message.',
    tags: ['outlook', 'email', 'send'],
    usage: 'Use this action to send a new email message.'
  },
  {
    id: 'send-email-from-shared-mailbox-v2',
    moduleId: 'office365-outlook',
    title: 'Send an email from a shared mailbox (V2)',
    description: 'This operation sends an email from a shared mailbox. Your account should have permission to access the mailbox for this operation to succeed.',
    tags: ['outlook', 'email', 'send', 'shared'],
    usage: 'Use this action to send an email from a shared mailbox that you have access to.'
  },
  {
    id: 'send-http-request',
    moduleId: 'office365-outlook',
    title: 'Send an HTTP request',
    description: 'Construct a Microsoft Graph REST API request to invoke. These segments are supported: 1st segement: /me, /users/ 2nd segment: messages, mailFolders, events, calendar, calendars, outlook, inferenceClassification. Learn more: https://docs.microsoft.com/en-us/graph/use-the-api.',
    tags: ['outlook', 'graph', 'api', 'http'],
    usage: 'Use this action to make custom Graph API requests to Outlook services.'
  },
  {
    id: 'send-approval-email',
    moduleId: 'office365-outlook',
    title: 'Send approval email',
    description: 'This operation sends an approval email and waits for a response from the recipient. Please refer to the following link regarding the support of actionable messages in different mail clients: https://docs.microsoft.com/outlook/actionable-messages/#outlook-version-requirements-for-actionable-messages.',
    tags: ['outlook', 'email', 'approval'],
    usage: 'Use this action to send an email that requires approval from the recipient.'
  },
  {
    id: 'send-email-with-options',
    moduleId: 'office365-outlook',
    title: 'Send email with options',
    description: 'This operation sends an email with multiple options and waits for the recipient to respond back with one of the options. Please refer to the following link regarding the support of actionable messages in different mail clients: https://docs.microsoft.com/outlook/actionable-messages/#outlook-version-requirements-for-actionable-messages.',
    tags: ['outlook', 'email', 'options', 'response'],
    usage: 'Use this action to send an email with multiple response options for the recipient.'
  },
  {
    id: 'set-up-automatic-replies-v2',
    moduleId: 'office365-outlook',
    title: 'Set up automatic replies (V2)',
    description: 'Set the automatic replies setting for your mailbox.',
    tags: ['outlook', 'automatic', 'replies', 'oof'],
    usage: 'Use this action to configure automatic replies (out of office) for your mailbox.'
  },
  {
    id: 'update-contact-v2',
    moduleId: 'office365-outlook',
    title: 'Update contact (V2)',
    description: 'This operation updates a contact in a contacts folder.',
    tags: ['outlook', 'contact', 'update'],
    usage: 'Use this action to update an existing contact in your Outlook contacts.'
  },
  {
    id: 'update-event-v4',
    moduleId: 'office365-outlook',
    title: 'Update event (V4)',
    description: 'This operation updates an event in a calendar using Graph API.',
    tags: ['outlook', 'calendar', 'event', 'update'],
    usage: 'Use this action to modify an existing event in your Outlook calendar.'
  },
  {
    id: 'update-my-contacts-photo',
    moduleId: 'office365-outlook',
    title: 'Update my contact\'s photo',
    description: 'Updates the photo of the specified contact of the current user. The size of the photo must be less than 4 MB.',
    tags: ['outlook', 'contact', 'photo', 'update'],
    usage: 'Use this action to update the photo of a contact in your address book.'
  },
  {
    id: 'update-email-draft-message',
    moduleId: 'office365-outlook',
    title: 'Updates an email Draft message',
    description: 'This operation updates an an email Draft message.',
    tags: ['outlook', 'email', 'draft', 'update'],
    usage: 'Use this action to modify an existing draft email message.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);