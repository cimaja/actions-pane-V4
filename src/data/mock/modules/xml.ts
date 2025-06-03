import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'xml',
  title: 'XML',
  icon: 'code20Regular',
  iconColor: 'amber',
  tags: ['Data', 'XML', 'Parsing'], // Category tag for this module
  category: 'Data',  author: 'Microsoft',

  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'read-xml-from-file',
    title: 'Read XML from file',
    description: 'Load XML content from a file into a variable',
    moduleId: 'xml'
  },
  {
    id: 'write-xml-to-file',
    title: 'Write XML to file',
    description: 'Save XML content to a file',
    moduleId: 'xml'
  },
  {
    id: 'execute-xpath-expression',
    title: 'Execute XPath expression',
    description: 'Query XML content using XPath expressions',
    moduleId: 'xml'
  },
  {
    id: 'get-xml-element-attribute',
    title: 'Get XML element attribute',
    description: 'Retrieve the value of an attribute from an XML element',
    moduleId: 'xml'
  },
  {
    id: 'set-xml-element-attribute',
    title: 'Set XML element attribute',
    description: 'Set or modify an attribute of an XML element',
    moduleId: 'xml'
  },
  {
    id: 'remove-xml-element-attribute',
    title: 'Remove XML element attribute',
    description: 'Delete an attribute from an XML element',
    moduleId: 'xml'
  },
  {
    id: 'get-xml-element-value',
    title: 'Get XML element value',
    description: 'Retrieve the text content of an XML element',
    moduleId: 'xml'
  },
  {
    id: 'set-xml-element-value',
    title: 'Set XML element value',
    description: 'Set or modify the text content of an XML element',
    moduleId: 'xml'
  },
  {
    id: 'insert-xml-element',
    title: 'Insert XML element',
    description: 'Add a new XML element to the document',
    moduleId: 'xml'
  },
  {
    id: 'remove-xml-element',
    title: 'Remove XML element',
    description: 'Delete an XML element from the document',
    moduleId: 'xml'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
