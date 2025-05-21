import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'word-online',
  title: 'Word Online (Business)',
  type: 'connector',
  icon: '/assets/connectors/Word Online (Business).png',
  description: 'Create, edit, and format text documents stored in OneDrive for Business or SharePoint.',
  author: 'Microsoft',
  isInstalled: true
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'word-create-document',
    moduleId: 'word-online',
    title: 'Create document',
    description: 'Create a new Word document',
    tags: ['word', 'document', 'create'],
    usage: 'Use this action to create a new Word document in OneDrive for Business or SharePoint.',
    examples: [
      'Generate contract documents with dynamic content',
      'Create customized reports based on data'
    ],
    parameters: [
      {
        name: 'fileName',
        type: 'string',
        description: 'Name of the document to create',
        required: true
      },
      {
        name: 'folderPath',
        type: 'string',
        description: 'Folder path where the document should be created',
        required: true
      },
      {
        name: 'content',
        type: 'string',
        description: 'Initial content for the document (can include HTML)',
        required: false
      }
    ]
  },
  {
    id: 'word-insert-paragraph',
    moduleId: 'word-online',
    title: 'Insert paragraph',
    description: 'Insert a paragraph into a Word document',
    tags: ['word', 'document', 'paragraph', 'insert'],
    usage: 'Use this action to add paragraphs to an existing Word document.',
    examples: [
      'Add disclaimers to legal documents',
      'Insert dynamic content into report templates'
    ],
    parameters: [
      {
        name: 'documentId',
        type: 'string',
        description: 'ID of the Word document',
        required: true
      },
      {
        name: 'paragraphText',
        type: 'string',
        description: 'Text content for the paragraph',
        required: true
      },
      {
        name: 'insertLocation',
        type: 'string',
        description: 'Where to insert the paragraph (start, end, or after specific text)',
        required: false
      }
    ]
  },
  {
    id: 'word-replace-text',
    moduleId: 'word-online',
    title: 'Replace text',
    description: 'Find and replace text in a Word document',
    tags: ['word', 'document', 'replace', 'text'],
    usage: 'Use this action to find and replace text in a Word document.',
    examples: [
      'Replace placeholder text with actual data',
      'Update document dates and reference numbers'
    ],
    parameters: [
      {
        name: 'documentId',
        type: 'string',
        description: 'ID of the Word document',
        required: true
      },
      {
        name: 'findText',
        type: 'string',
        description: 'Text to find in the document',
        required: true
      },
      {
        name: 'replaceText',
        type: 'string',
        description: 'Text to replace the found text with',
        required: true
      },
      {
        name: 'matchCase',
        type: 'boolean',
        description: 'Whether to match case when finding text',
        required: false
      }
    ]
  },
  {
    id: 'word-get-document-content',
    moduleId: 'word-online',
    title: 'Get document content',
    description: 'Retrieve the content of a Word document',
    tags: ['word', 'document', 'content', 'read'],
    usage: 'Use this action to read the content of a Word document.',
    examples: [
      'Extract text from documents for analysis',
      'Read document content to process form submissions'
    ],
    parameters: [
      {
        name: 'documentId',
        type: 'string',
        description: 'ID of the Word document',
        required: true
      },
      {
        name: 'format',
        type: 'string',
        description: 'Format to retrieve (text, html, or office)',
        required: false
      }
    ]
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);