import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'browser-automation',
  title: 'Browser automation',
  icon: 'globe24Regular',
  iconColor: 'orange',
  tags: ['Automation', 'Web', 'Testing'], // Category tag for this module
  category: 'Interaction',
  items: [], // This will be populated with references to the actions
  isInstalled: true, // Set as installed by default
  subGroups: [
    {
      id: 'web-browser-actions',
      title: 'Web browser actions',
      items: [] // Will be populated with web browser actions
    },
    {
      id: 'web-data-extraction',
      title: 'Web data extraction',
      items: [] // Will be populated with web data extraction actions
    },
    {
      id: 'web-form-filling',
      title: 'Web form filling',
      items: [] // Will be populated with web form filling actions
    }
  ].sort((a, b) => a.title.localeCompare(b.title))
};

// Web data extraction actions
export const webDataExtractionActions: ActionItemType[] = [
  {
    id: 'extract-data-from-web-page',
    title: 'Extract data from web page',
    description: 'Extract data from a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'get-details-of-element-on-web-page',
    title: 'Get details of element on web page',
    description: 'Get details of an element on a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'get-details-of-web-page',
    title: 'Get details of web page',
    description: 'Get details of a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'take-screenshot-of-web-page',
    title: 'Take screenshot of web page',
    description: 'Take a screenshot of a web page',
    moduleId: 'browser-automation'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Web form filling actions
export const webFormFillingActions: ActionItemType[] = [
  {
    id: 'focus-text-field-on-web-page',
    title: 'Focus text field on web page',
    description: 'Focus on a text field on a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'populate-text-field-on-web-page',
    title: 'Populate text field on web page',
    description: 'Populate a text field on a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'press-button-on-web-page',
    title: 'Press button on web page',
    description: 'Press a button on a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'select-radio-button-on-web-page',
    title: 'Select radio button on web page',
    description: 'Select a radio button on a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'set-check-box-state-on-web-page',
    title: 'Set check box state on web page',
    description: 'Set the state of a check box on a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'set-drop-down-list-value-on-web-page',
    title: 'Set drop-down list value on web page',
    description: 'Set the value of a drop-down list on a web page',
    moduleId: 'browser-automation'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Web browser actions
export const webBrowserActions: ActionItemType[] = [
  {
    id: 'click-download-link-on-web-page',
    title: 'Click download link on web page',
    description: 'Click a download link on a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'click-link-on-web-page',
    title: 'Click link on web page',
    description: 'Click a link on a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'close-web-browser',
    title: 'Close web browser',
    description: 'Close a web browser',
    moduleId: 'browser-automation'
  },
  {
    id: 'create-new-tab',
    title: 'Create new tab',
    description: 'Create a new tab in the browser',
    moduleId: 'browser-automation'
  },
  {
    id: 'go-to-web-page',
    title: 'Go to web page',
    description: 'Navigate to a specific web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'hover-mouse-over-element-on-web-page',
    title: 'Hover mouse over element on web page',
    description: 'Hover the mouse over an element on a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'if-web-page-contains',
    title: 'If web page contains',
    description: 'Check if a web page contains specific content',
    moduleId: 'browser-automation'
  },
  {
    id: 'launch-new-chrome',
    title: 'Launch new Chrome',
    description: 'Launch a new Chrome browser',
    moduleId: 'browser-automation'
  },
  {
    id: 'launch-new-firefox',
    title: 'Launch new Firefox',
    description: 'Launch a new Firefox browser',
    moduleId: 'browser-automation'
  },
  {
    id: 'launch-new-internet-explorer',
    title: 'Launch new Internet Explorer',
    description: 'Launch a new Internet Explorer browser',
    moduleId: 'browser-automation'
  },
  {
    id: 'launch-new-microsoft-edge',
    title: 'Launch new Microsoft Edge',
    description: 'Launch a new Microsoft Edge browser',
    moduleId: 'browser-automation'
  },
  {
    id: 'run-javascript-function-on-web-page',
    title: 'Run JavaScript function on web page',
    description: 'Run a JavaScript function on a web page',
    moduleId: 'browser-automation'
  },
  {
    id: 'wait-for-web-page-content',
    title: 'Wait for web page content',
    description: 'Wait for specific content to appear on a web page',
    moduleId: 'browser-automation'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize subgroups with their respective actions
if (module.subGroups) {
  const webDataExtractionGroup = module.subGroups.find(group => group.id === 'web-data-extraction');
  if (webDataExtractionGroup) {
    webDataExtractionGroup.items = webDataExtractionActions;
  }
  
  const webFormFillingGroup = module.subGroups.find(group => group.id === 'web-form-filling');
  if (webFormFillingGroup) {
    webFormFillingGroup.items = webFormFillingActions;
  }
  
  const webBrowserActionsGroup = module.subGroups.find(group => group.id === 'web-browser-actions');
  if (webBrowserActionsGroup) {
    webBrowserActionsGroup.items = webBrowserActions;
  }
}

// Helper function to get all actions for this module (including subgroups)
export const getAllActions = () => {
  return [
    ...webDataExtractionActions,
    ...webFormFillingActions,
    ...webBrowserActions
  ];
};

// Helper function to get an action by ID
export const getActionById = (id: string) => getAllActions().find(action => action.id === id);
