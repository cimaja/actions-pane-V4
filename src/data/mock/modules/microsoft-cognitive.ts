import { ActionGroup, ActionItemType } from '../../../models/types';

// Bing Spell Check actions
const bingSpellCheckActions: ActionItemType[] = [
  {
    id: 'spell-check',
    title: 'Spell check',
    description: 'Check text for spelling errors using Bing Spell Check',
    moduleId: 'microsoft-cognitive'
  }
];

// Computer Vision actions
const computerVisionActions: ActionItemType[] = [
  {
    id: 'analyze-image',
    title: 'Analyze image',
    description: 'Analyze image content and return detailed information',
    moduleId: 'microsoft-cognitive'
  },
  {
    id: 'describe-image',
    title: 'Describe image',
    description: 'Generate a human-readable description of an image',
    moduleId: 'microsoft-cognitive'
  },
  {
    id: 'ocr',
    title: 'OCR',
    description: 'Extract text from images using OCR',
    moduleId: 'microsoft-cognitive'
  },
  {
    id: 'tag-image',
    title: 'Tag image',
    description: 'Generate tags for the image content',
    moduleId: 'microsoft-cognitive'
  }
];

// Combine all actions
const actions: ActionItemType[] = [
  ...bingSpellCheckActions,
  ...computerVisionActions
].sort((a, b) => a.title.localeCompare(b.title));

// Define the Microsoft Cognitive subgroups
const bingSpellCheckGroup: ActionGroup = {
  id: 'microsoft-cognitive-bing-spell-check',
  title: 'Bing Spell Check',
  items: bingSpellCheckActions,
  icon: 'textSpellingError20Regular',
};

const computerVisionGroup: ActionGroup = {
  id: 'microsoft-cognitive-computer-vision',
  title: 'Computer Vision',
  items: computerVisionActions,
  icon: 'imageSearch20Regular',
};

// Define the Microsoft Cognitive module
export const module: ActionGroup = {
  id: 'microsoft-cognitive',
  title: 'Microsoft Cognitive',
  icon: 'brainCircuit24Regular',
  iconColor: 'blue',
  tags: ['AI/ML', 'Microsoft', 'Integration'], // Category tag for this module
  category: 'Integration',
  items: [],
  subGroups: [
    bingSpellCheckGroup,
    computerVisionGroup
  ],
  isInstalled: false,
};

// Helper functions to retrieve actions
export const getAllActions = () => actions;

export const getActionById = (id: string) => {
  return actions.find((action) => action.id === id);
};

// Helper functions to get actions by group
export const getBingSpellCheckActions = () => bingSpellCheckActions;
export const getComputerVisionActions = () => computerVisionActions;
