import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'ui-automation',
  title: 'UI automation',
  icon: 'laptop24Regular',
  iconColor: 'orange',
  tags: ['Automation', 'UI', 'Testing'], // Category tag for this module
  category: 'Interaction',  author: 'Microsoft',

  items: [], // This will be populated with references to the actions
  isInstalled: true, // Set as installed by default
  subGroups: (() => {
    const groups = [
      {
        id: 'data-extraction',
        title: 'Data extraction',
        items: [] // Will be populated with data extraction actions
      },
      {
        id: 'form-filling',
        title: 'Form filling',
        items: [] // Will be populated with form filling actions
      },
      {
        id: 'general',
        title: 'General',
        items: [] // Will be populated with main UI Automation actions
      },
      {
        id: 'windows',
        title: 'Windows',
        items: [] // Will be populated with window management actions
      }
    ];
    const generalGroup = groups.find(g => g.title === 'General');
    const otherGroups = groups.filter(g => g.title !== 'General').sort((a, b) => a.title.localeCompare(b.title));
    return generalGroup ? [generalGroup, ...otherGroups] : otherGroups;
  })()
};

// Module actions - General UI Automation actions
export const generalActions: ActionItemType[] = [
  {
    id: 'click-ui-element',
    title: 'Click UI element in window',
    description: 'Click on a UI element in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'drag-and-drop',
    title: 'Drag and drop UI element in window',
    description: 'Drag and drop a UI element in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'expand-collapse-tree-node',
    title: 'Expand/collapse tree node in window',
    description: 'Expand or collapse a tree node in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'hover-mouse-over-ui-element',
    title: 'Hover mouse over UI element in window',
    description: 'Hover mouse over a UI element in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'if-image',
    title: 'If image',
    description: 'Check if image exists on screen',
    moduleId: 'ui-automation'
  },
  {
    id: 'if-virtual-desktop-available',
    title: 'If virtual desktop available',
    description: 'Check if virtual desktop is available',
    moduleId: 'ui-automation'
  },
  {
    id: 'if-window',
    title: 'If window',
    description: 'Check if window exists',
    moduleId: 'ui-automation'
  },
  {
    id: 'if-window-contains',
    title: 'If window contains',
    description: 'Check if window contains specific element or text',
    moduleId: 'ui-automation'
  },
  {
    id: 'select-menu-option',
    title: 'Select menu option in window',
    description: 'Select an option from a menu in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'select-tab-in-window',
    title: 'Select tab in window',
    description: 'Select a tab in a window',
    moduleId: 'ui-automation'
  },
  {
    id: 'use-desktop',
    title: 'Use desktop',
    description: 'Use desktop for automation',
    moduleId: 'ui-automation'
  },
  {
    id: 'wait-for-image',
    title: 'Wait for image',
    description: 'Wait for image to appear on screen',
    moduleId: 'ui-automation'
  },
  {
    id: 'wait-for-virtual-desktop',
    title: 'Wait for virtual desktop',
    description: 'Wait for virtual desktop to be available',
    moduleId: 'ui-automation'
  },
  {
    id: 'wait-for-window',
    title: 'Wait for window',
    description: 'Wait for window to appear',
    moduleId: 'ui-automation'
  },
  {
    id: 'wait-for-window-content',
    title: 'Wait for window content',
    description: 'Wait for specific content to appear in window',
    moduleId: 'ui-automation'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Data extraction actions
export const dataExtractionActions: ActionItemType[] = [
  {
    id: 'extract-data-from-table',
    title: 'Extract data from table',
    description: 'Extract data from a table in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'extract-data-from-window',
    title: 'Extract data from window',
    description: 'Extract data from window',
    moduleId: 'ui-automation'
  },
  {
    id: 'get-details-of-ui-element',
    title: 'Get details of the UI element in window',
    description: 'Get details of a UI element in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'get-details-of-window',
    title: 'Get details of window',
    description: 'Get details of a window',
    moduleId: 'ui-automation'
  },
  {
    id: 'get-selected-checkboxes',
    title: 'Get selected checkboxes in window',
    description: 'Get selected checkboxes in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'get-selected-radio-button',
    title: 'Get selected radio button in window',
    description: 'Get selected radio button in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'take-screenshot-of-ui-element',
    title: 'Take screenshot of UI element',
    description: 'Take a screenshot of a UI element',
    moduleId: 'ui-automation'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Form filling actions
export const formFillingActions: ActionItemType[] = [
  {
    id: 'focus-text-field',
    title: 'Focus text field in window',
    description: 'Focus on a text field in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'populate-text-field',
    title: 'Populate text field in window',
    description: 'Populate a text field in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'press-button',
    title: 'Press button in window',
    description: 'Press a button in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'select-radio-button',
    title: 'Select radio button in window',
    description: 'Select a radio button in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'set-checkbox-state',
    title: 'Set checkbox state in window',
    description: 'Set the state of a checkbox in window',
    moduleId: 'ui-automation'
  },
  {
    id: 'set-dropdown-list-value',
    title: 'Set drop-down list value in window',
    description: 'Set a value in a drop-down list in window',
    moduleId: 'ui-automation'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Windows actions
export const windowsActions: ActionItemType[] = [
  {
    id: 'close-window',
    title: 'Close window',
    description: 'Close a window',
    moduleId: 'ui-automation'
  },
  {
    id: 'focus-window',
    title: 'Focus window',
    description: 'Focus on a window',
    moduleId: 'ui-automation'
  },
  {
    id: 'get-window',
    title: 'Get window',
    description: 'Get a window',
    moduleId: 'ui-automation'
  },
  {
    id: 'move-window',
    title: 'Move window',
    description: 'Move a window',
    moduleId: 'ui-automation'
  },
  {
    id: 'resize-window',
    title: 'Resize window',
    description: 'Resize a window',
    moduleId: 'ui-automation'
  },
  {
    id: 'set-window-state',
    title: 'Set window state',
    description: 'Set the state of a window',
    moduleId: 'ui-automation'
  },
  {
    id: 'set-window-visibility',
    title: 'Set window visibility',
    description: 'Set the visibility of a window',
    moduleId: 'ui-automation'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize subgroups with their respective actions
if (module.subGroups) {
  const generalGroup = module.subGroups.find(group => group.id === 'general');
  if (generalGroup) {
    generalGroup.items = generalActions;
  }

  const dataExtractionGroup = module.subGroups.find(group => group.id === 'data-extraction');
  if (dataExtractionGroup) {
    dataExtractionGroup.items = dataExtractionActions;
  }
  
  const formFillingGroup = module.subGroups.find(group => group.id === 'form-filling');
  if (formFillingGroup) {
    formFillingGroup.items = formFillingActions;
  }
  
  const windowsGroup = module.subGroups.find(group => group.id === 'windows');
  if (windowsGroup) {
    windowsGroup.items = windowsActions;
  }
}

// Helper function to get all actions for this module (including subgroups)
export const getAllActions = () => {
  return [
    ...generalActions,
    ...dataExtractionActions,
    ...formFillingActions,
    ...windowsActions
  ];
};

// Helper function to get an action by ID
export const getActionById = (id: string) => getAllActions().find(action => action.id === id);
