import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'scripting',
  title: 'Scripting',
  icon: 'braces24Regular',
  iconColor: 'teal',
  tags: ['Scripting'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  {
    id: 'run-dos-command',
    title: 'Run DOS command',
    description: 'Execute a DOS command and capture the output',
    moduleId: 'scripting'
  },
  {
    id: 'run-vbscript',
    title: 'Run VBScript',
    description: 'Execute a VBScript script and capture the output',
    moduleId: 'scripting'
  },
  {
    id: 'run-javascript',
    title: 'Run JavaScript',
    description: 'Execute a JavaScript script and capture the output',
    moduleId: 'scripting'
  },
  {
    id: 'run-powershell-script',
    title: 'Run PowerShell script',
    description: 'Execute a PowerShell script and capture the output',
    moduleId: 'scripting'
  },
  {
    id: 'run-python-script',
    title: 'Run Python script',
    description: 'Execute a Python script and capture the output',
    moduleId: 'scripting'
  },
  {
    id: 'run-dotnet-script',
    title: 'Run .NET script',
    description: 'Execute a .NET script and capture the output',
    moduleId: 'scripting'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
