import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'ibm-cognitive',
  title: 'IBM Cognitive',
  icon: 'ibmCognitive20Regular',
  iconColor: 'blue',
  tags: ['AI/ML', 'IBM', 'Integration'], // Category tag for this module
  category: 'Integration',
  items: [],
  isInstalled: false
};

// Document Conversion actions
const documentConversionActions: ActionItemType[] = [
  {
    id: 'convert-document',
    title: 'Convert document',

    description: 'Convert documents between different formats',
    moduleId: 'ibm-cognitive'
  }
];

// Language Translator actions
const languageTranslatorActions: ActionItemType[] = [
  {
    id: 'translate',
    title: 'Translate',

    description: 'Translate text between languages',
    moduleId: 'ibm-cognitive'
  },
  {
    id: 'identify-language',
    title: 'Identify language',

    description: 'Identify the language of input text',
    moduleId: 'ibm-cognitive'
  }
];

// Tone Analyzer actions
const toneAnalyzerActions: ActionItemType[] = [
  {
    id: 'analyze-tone',
    title: 'Analyze tone',

    description: 'Analyze the tone of text content',
    moduleId: 'ibm-cognitive'
  }
];

// Visual Recognition actions
const visualRecognitionActions: ActionItemType[] = [
  {
    id: 'classify-image',
    title: 'Classify image',

    description: 'Classify and analyze image content',
    moduleId: 'ibm-cognitive'
  }
];

// Combine all actions
const actions: ActionItemType[] = [
  ...documentConversionActions,
  ...languageTranslatorActions,
  ...toneAnalyzerActions,
  ...visualRecognitionActions
].sort((a, b) => a.title.localeCompare(b.title));

// Define the IBM Cognitive subgroups
const documentConversionGroup: ActionGroup = {
  id: 'ibm-cognitive-document-conversion',
  title: 'Document Conversion',
  items: documentConversionActions,
  icon: 'documentPdf20Regular',
};

const languageTranslatorGroup: ActionGroup = {
  id: 'ibm-cognitive-language-translator',
  title: 'Language Translator',
  items: languageTranslatorActions,
  icon: 'translate20Regular',
};

const toneAnalyzerGroup: ActionGroup = {
  id: 'ibm-cognitive-tone-analyzer',
  title: 'Tone Analyzer',
  items: toneAnalyzerActions,
  icon: 'emoji20Regular',
};

const visualRecognitionGroup: ActionGroup = {
  id: 'ibm-cognitive-visual-recognition',
  title: 'Visual Recognition',
  items: visualRecognitionActions,
  icon: 'imageAlt20Regular',
};

// Add subgroups to the module
module.subGroups = [
  documentConversionGroup,
  languageTranslatorGroup,
  toneAnalyzerGroup,
  visualRecognitionGroup
];

// Helper functions to retrieve actions
export const getAllActions = () => actions;

export const getActionById = (id: string) => {
  return actions.find((action) => action.id === id);
};

// Helper functions to get actions by group
export const getDocumentConversionActions = () => documentConversionActions;
export const getLanguageTranslatorActions = () => languageTranslatorActions;
export const getToneAnalyzerActions = () => toneAnalyzerActions;
export const getVisualRecognitionActions = () => visualRecognitionActions;
