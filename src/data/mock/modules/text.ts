import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'text',
  title: 'Text',
  icon: 'textField24Regular',
  iconColor: 'amber',
  tags: ['Text Processing', 'Data', 'Utilities'], // Category tag for this module
  category: 'Data',
  items: [], // This will be populated with references to the actions
  isInstalled: true // Set the module as installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'append-line-to-text',
    title: 'Append line to text',
    description: 'Add a new line to the end of a text string',
    moduleId: 'text'
  },
  {
    id: 'get-subtext',
    title: 'Get subtext',
    description: 'Extract a portion of text based on position and length',
    moduleId: 'text'
  },
  {
    id: 'crop-text',
    title: 'Crop text',
    description: 'Remove characters from the beginning and/or end of text',
    moduleId: 'text'
  },
  {
    id: 'pad-text',
    title: 'Pad text',
    description: 'Add characters to the beginning or end of text to reach a specific length',
    moduleId: 'text'
  },
  {
    id: 'trim-text',
    title: 'Trim text',
    description: 'Remove whitespace from the beginning and end of text',
    moduleId: 'text'
  },
  {
    id: 'reverse-text',
    title: 'Reverse text',
    description: 'Reverse the order of characters in a text string',
    moduleId: 'text'
  },
  {
    id: 'change-text-case',
    title: 'Change text case',
    description: 'Convert text to uppercase, lowercase, or title case',
    moduleId: 'text'
  },
  {
    id: 'convert-text-to-number',
    title: 'Convert text to number',
    description: 'Parse a text string into a numeric value',
    moduleId: 'text'
  },
  {
    id: 'convert-number-to-text',
    title: 'Convert number to text',
    description: 'Format a numeric value as a text string',
    moduleId: 'text'
  },
  {
    id: 'convert-text-to-datetime',
    title: 'Convert text to datetime',
    description: 'Parse a text string into a date and time value',
    moduleId: 'text'
  },
  {
    id: 'convert-datetime-to-text',
    title: 'Convert datetime to text',
    description: 'Format a date and time value as a text string',
    moduleId: 'text'
  },
  {
    id: 'create-random-text',
    title: 'Create random text',
    description: 'Generate random text with specified characteristics',
    moduleId: 'text'
  },
  {
    id: 'join-text',
    title: 'Join text',
    description: 'Combine multiple text strings with a delimiter',
    moduleId: 'text'
  },
  {
    id: 'split-text',
    title: 'Split text',
    description: 'Divide a text string into parts based on a delimiter',
    moduleId: 'text'
  },
  {
    id: 'parse-text',
    title: 'Parse text',
    description: 'Extract structured data from text using patterns',
    moduleId: 'text'
  },
  {
    id: 'replace-text',
    title: 'Replace text',
    description: 'Replace occurrences of a substring with another string',
    moduleId: 'text'
  },
  {
    id: 'escape-text-for-regex',
    title: 'Escape text for regular expression',
    description: 'Escape special characters in text for use in regular expressions',
    moduleId: 'text'
  },
  {
    id: 'recognize-entities-in-text',
    title: 'Recognize entities in text',
    description: 'Identify and extract entities like dates, emails, and phone numbers from text',
    moduleId: 'text'
  },
  {
    id: 'create-html-content',
    title: 'Create HTML content',
    description: 'Generate HTML markup from text with formatting',
    moduleId: 'text'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
