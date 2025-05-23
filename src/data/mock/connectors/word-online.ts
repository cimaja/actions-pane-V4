import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'word-online',
  title: 'Word Online (Business)',
  type: 'connector',
  icon: '/assets/connectors/Word Online (Business).png',
  description: 'Word Online (Business) connector lets you work with Word files in document libraries supported by Microsoft Graph (OneDrive for Business, SharePoint Online Sites, and Office 365 Groups).',
  author: 'Microsoft',
  isInstalled: true,
  category: 'Microsoft' as const
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'convert-word-document-to-pdf',
    moduleId: 'word-online',
    title: 'Convert Word Document to PDF',
    description: 'Gets a PDF version of the selected file',
    tags: ['word', 'document', 'convert', 'pdf'],
    usage: 'Use this action to convert a Word document to PDF format.'
  },
  {
    id: 'populate-microsoft-word-template',
    moduleId: 'word-online',
    title: 'Populate a Microsoft Word template',
    description: 'Reads a Microsoft Word template to then fill the template fields with selected dynamic values to generate a Word Document.',
    tags: ['word', 'template', 'populate', 'document'],
    usage: 'Use this action to fill a Word template with dynamic data to generate a new document.'
  }
];