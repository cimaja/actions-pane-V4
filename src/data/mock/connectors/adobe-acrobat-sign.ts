import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'adobe-acrobat-sign',
  title: 'Adobe Acrobat Sign',
  type: 'connector',
  icon: '/assets/connectors/Adobe Acrobat Sign.png',
  description: 'Adobe is the most trusted digital document sign service in the world. With Adobe Acrobat Sign, you can transform manual processes into all-digital experiences. Incorporate Adobe Acrobat Sign functionality into your favorite applications to create, send and monitor the status of agreements.',
  author: 'Adobe',
  isInstalled: true,
  category: 'Third party' as const,
  tags: ['document']
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'cancel-an-agreement',
    moduleId: 'adobe-acrobat-sign',
    title: 'Cancel an agreement',
    description: 'Cancels the agreement identified by agreementId in the path.',
    tags: ['adobe', 'sign', 'agreement', 'cancel'],
    usage: 'Use this action to cancel an agreement that has been sent for signature.'
  },
  {
    id: 'create-a-library-template-from-a-document-url',
    moduleId: 'adobe-acrobat-sign',
    title: 'Create a library template from a document URL',
    description: 'This operation creates a template in Adobe Acrobat Sign library from a document URL. Use this template for sending agreements',
    tags: ['adobe', 'sign', 'template', 'document', 'url'],
    usage: 'Use this action to create a reusable template from a document URL.'
  },
  {
    id: 'create-a-library-template-from-an-uploaded-document',
    moduleId: 'adobe-acrobat-sign',
    title: 'Create a library template from an uploaded document',
    description: 'This operation creates a template in Adobe Acrobat Sign library from an uploaded document. Use this template for sending agreements.',
    tags: ['adobe', 'sign', 'template', 'document', 'upload'],
    usage: 'Use this action to create a reusable template from an uploaded document.'
  },
  {
    id: 'create-an-agreement-from-a-document-url-and-send-for-signature',
    moduleId: 'adobe-acrobat-sign',
    title: 'Create an agreement from a document URL and send for signature',
    description: 'This operation creates an agreement from a document uploaded in Adobe Acrobat Sign and sends it for signature.',
    tags: ['adobe', 'sign', 'agreement', 'document', 'url'],
    usage: 'Use this action to create and send an agreement from a document URL.'
  },
  {
    id: 'create-an-agreement-from-a-file-content-and-send-for-signature',
    moduleId: 'adobe-acrobat-sign',
    title: 'Create an agreement from a file content and send for signature',
    description: 'This operation creates an agreement from a file in Adobe Acrobat Sign and sends it for signature.',
    tags: ['adobe', 'sign', 'agreement', 'file', 'content'],
    usage: 'Use this action to create and send an agreement from file content.'
  },
  {
    id: 'create-an-agreement-from-a-library-template-and-send-for-signature',
    moduleId: 'adobe-acrobat-sign',
    title: 'Create an agreement from a library template and send for signature',
    description: 'This operation creates an agreement from a template stored in the user\'s Adobe Acrobat Sign library and sends it for signature.',
    tags: ['adobe', 'sign', 'agreement', 'template', 'library'],
    usage: 'Use this action to create and send an agreement from a library template.'
  },
  {
    id: 'create-an-agreement-from-a-workflow-and-send-for-signature',
    moduleId: 'adobe-acrobat-sign',
    title: 'Create an agreement from a workflow and send for signature',
    description: 'This operation creates an agreement from a workflow in Adobe Acrobat Sign and sends it for signature.',
    tags: ['adobe', 'sign', 'agreement', 'workflow'],
    usage: 'Use this action to create and send an agreement from a workflow.'
  },
  {
    id: 'create-an-agreement-from-an-uploaded-document-and-send-for-signature',
    moduleId: 'adobe-acrobat-sign',
    title: 'Create an agreement from an uploaded document and send for signature',
    description: 'This operation creates an agreement from a document uploaded in Adobe Acrobat Sign and sends it for signature.',
    tags: ['adobe', 'sign', 'agreement', 'document', 'upload'],
    usage: 'Use this action to create and send an agreement from an uploaded document.'
  },
  {
    id: 'get-a-document-from-an-agreement',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get a document from an agreement',
    description: 'This operation fetches the file stream of a specific document of the agreement.',
    tags: ['adobe', 'sign', 'agreement', 'document', 'fetch'],
    usage: 'Use this action to retrieve a specific document from an agreement.'
  },
  {
    id: 'get-a-list-of-all-agreements',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get a list of all agreements',
    description: 'This operation fetches the list of all agreements of the user.',
    tags: ['adobe', 'sign', 'agreement', 'list'],
    usage: 'Use this action to retrieve a list of all agreements.'
  },
  {
    id: 'get-a-list-of-all-agreements-based-on-search-criteria',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get a list of all agreements based on search criteria',
    description: 'This operation searches agreements by criteria such as Workflow ID, etc.',
    tags: ['adobe', 'sign', 'agreement', 'search', 'criteria'],
    usage: 'Use this action to search for agreements based on specific criteria.'
  },
  {
    id: 'get-a-list-of-all-groups-the-user-belongs-to',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get a list of all groups the user belongs to',
    description: 'This operation fetches the list of all groups user belongs to.',
    tags: ['adobe', 'sign', 'groups', 'user'],
    usage: 'Use this action to retrieve all groups that the user is a member of.'
  },
  {
    id: 'get-a-list-of-all-library-templates',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get a list of all library templates',
    description: 'This operation fetches the list of all documents stored as templates in the Adobe Acrobat Sign library of the user.',
    tags: ['adobe', 'sign', 'templates', 'library'],
    usage: 'Use this action to retrieve all templates from the user\'s library.'
  },
  {
    id: 'get-a-list-of-all-the-document-ids-from-an-agreement',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get a list of all the document IDs from an agreement',
    description: 'This operation fetches the IDs of all documents and supporting documents of an agreement.',
    tags: ['adobe', 'sign', 'agreement', 'document', 'ids'],
    usage: 'Use this action to retrieve all document IDs associated with an agreement.'
  },
  {
    id: 'get-a-list-of-all-web-forms',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get a list of all web forms',
    description: 'This operation fetches the list of all web forms of the user.',
    tags: ['adobe', 'sign', 'web', 'forms'],
    usage: 'Use this action to retrieve all web forms created by the user.'
  },
  {
    id: 'get-a-list-of-all-workflows',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get a list of all workflows',
    description: 'This operation fetches the list of all workflows of the user.',
    tags: ['adobe', 'sign', 'workflows'],
    usage: 'Use this action to retrieve all workflows created by the user.'
  },
  {
    id: 'get-a-pdf-of-a-signed-agreement',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get a PDF of a signed agreement',
    description: 'This operation fetches the PDF file stream of the combined or signed agreement. Note that the file stream should be stored with a filename ending in .pdf file extension.',
    tags: ['adobe', 'sign', 'agreement', 'pdf', 'signed'],
    usage: 'Use this action to download a PDF of a signed agreement.'
  },
  {
    id: 'get-a-pdf-of-the-agreements-audit-trail',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get a PDF of the agreement\'s audit trail',
    description: 'This operation fetches the PDF file stream of the agreement audit trail. Note that the file stream should be stored with a filename ending in .pdf file extension.',
    tags: ['adobe', 'sign', 'agreement', 'audit', 'trail', 'pdf'],
    usage: 'Use this action to download a PDF of an agreement\'s audit trail.'
  },
  {
    id: 'get-form-field-data-of-agreement-in-csv-format',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get form field data of agreement in CSV format',
    description: 'Retrieves data entered into the interactive form fields of the agreement.',
    tags: ['adobe', 'sign', 'agreement', 'form', 'data', 'csv'],
    usage: 'Use this action to export form field data from an agreement in CSV format.'
  },
  {
    id: 'get-form-field-data-of-agreement-in-json-format',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get form field data of agreement in JSON format',
    description: 'Retrieves data entered into the interactive form fields of the agreement.',
    tags: ['adobe', 'sign', 'agreement', 'form', 'data', 'json'],
    usage: 'Use this action to export form field data from an agreement in JSON format.'
  },
  {
    id: 'get-the-detailed-info-of-the-workflow',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get the detailed info of the workflow',
    description: 'This operation fetches detailed pieces of information about the workflow.',
    tags: ['adobe', 'sign', 'workflow', 'details'],
    usage: 'Use this action to retrieve detailed information about a specific workflow.'
  },
  {
    id: 'get-the-status-of-an-agreement',
    moduleId: 'adobe-acrobat-sign',
    title: 'Get the status of an agreement',
    description: 'This operation fetches all the current information of an agreement, like status.',
    tags: ['adobe', 'sign', 'agreement', 'status'],
    usage: 'Use this action to check the current status of an agreement.'
  },
  {
    id: 'retrieve-the-signing-url',
    moduleId: 'adobe-acrobat-sign',
    title: 'Retrieve the Signing URL',
    description: 'This operation retrieves the URL for the e-sign page for the current signer(s) of an agreement.',
    tags: ['adobe', 'sign', 'agreement', 'signing', 'url'],
    usage: 'Use this action to get the URL where signers can sign the agreement.'
  },
  {
    id: 'upload-a-document-and-get-a-document-id',
    moduleId: 'adobe-acrobat-sign',
    title: 'Upload a document and get a document ID',
    description: 'This operation uploads a document and returns a document ID.',
    tags: ['adobe', 'sign', 'document', 'upload', 'id'],
    usage: 'Use this action to upload a document and get its ID for use in other operations.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);