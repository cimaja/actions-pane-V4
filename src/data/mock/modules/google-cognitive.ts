import { ActionGroup, ActionItemType } from '../../../models/types';

// Define the natural language actions
const naturalLanguageActions: ActionItemType[] = [
  {
    id: 'analyze-sentiment',
    title: 'Analyze sentiment',

    description: 'Analyze the sentiment of text content',
    moduleId: 'google-cognitive',
  },
  {
    id: 'analyze-entities',
    title: 'Analyze entities',

    description: 'Identify entities in text content',
    moduleId: 'google-cognitive',
  },
  {
    id: 'analyze-syntax',
    title: 'Analyze syntax',

    description: 'Analyze the syntax of text content',
    moduleId: 'google-cognitive',
  },
];

// Define the vision actions
const visionActions: ActionItemType[] = [
  {
    id: 'label-detection',
    title: 'Label detection',

    description: 'Detect labels in images',
    moduleId: 'google-cognitive',
  },
  {
    id: 'landmark-detection',
    title: 'Landmark detection',

    description: 'Detect landmarks in images',
    moduleId: 'google-cognitive',
  },
  {
    id: 'text-detection',
    title: 'Text detection',

    description: 'Detect text in images',
    moduleId: 'google-cognitive',
  },
  {
    id: 'logo-detection',
    title: 'Logo detection',

    description: 'Detect logos in images',
    moduleId: 'google-cognitive',
  },
  {
    id: 'image-properties-detection',
    title: 'Image properties detection',

    description: 'Detect properties in images',
    moduleId: 'google-cognitive',
  },
  {
    id: 'safe-search-detection',
    title: 'Safe search detection',

    description: 'Detect inappropriate content in images',
    moduleId: 'google-cognitive',
  },
];

// Combine all actions
const actions: ActionItemType[] = [...naturalLanguageActions, ...visionActions];

// Define the Google Cognitive subgroups
const naturalLanguageGroup: ActionGroup = {
  id: 'google-cognitive-natural-language',
  title: 'Natural Language',
  items: naturalLanguageActions,
  icon: 'textGrammar20Regular',
};

const visionGroup: ActionGroup = {
  id: 'google-cognitive-vision',
  title: 'Vision',
  items: visionActions,
  icon: 'imageAlt20Regular',
};

// Define the Google Cognitive module
export const module: ActionGroup = {
  id: 'google-cognitive',
  title: 'Google Cognitive',
  icon: 'googleCognitive20Regular',
  iconColor: 'blue', // Blue color for Integration category
  tags: ['Integration'],
  items: [],
  subGroups: [naturalLanguageGroup, visionGroup],
  isInstalled: false,
};

// Helper functions to retrieve actions
export const getAllActions = () => actions;

export const getActionById = (id: string) => {
  return actions.find((action) => action.id === id);
};

// Helper functions to get actions by group
export const getNaturalLanguageActions = () => naturalLanguageActions;
export const getVisionActions = () => visionActions;
