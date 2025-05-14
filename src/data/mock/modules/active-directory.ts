import { ActionGroup, ActionItemType } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'active-directory',
  title: 'Active Directory',
  icon: 'customActiveDirectory20Regular',
  iconColor: 'blue',
  tags: ['Integration'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: ActionItemType[] = [
  // Group actions
  {
    id: 'create-group',
    title: 'Create group',
    description: 'Create a new group in Active Directory',
    moduleId: 'active-directory',
    group: 'Group'
  },
  {
    id: 'get-group-info',
    title: 'Get group info',
    description: 'Retrieve information about an Active Directory group',
    moduleId: 'active-directory',
    group: 'Group'
  },
  {
    id: 'get-group-members',
    title: 'Get group members',
    description: 'Retrieve the members of an Active Directory group',
    moduleId: 'active-directory',
    group: 'Group'
  },
  {
    id: 'modify-group',
    title: 'Modify group',
    description: 'Modify the properties of an Active Directory group',
    moduleId: 'active-directory',
    group: 'Group'
  },
  
  // Object actions
  {
    id: 'create-object',
    title: 'Create object',
    description: 'Create a new object in Active Directory',
    moduleId: 'active-directory',
    group: 'Object'
  },
  {
    id: 'delete-object',
    title: 'Delete object',
    description: 'Delete an object from Active Directory',
    moduleId: 'active-directory',
    group: 'Object'
  },
  {
    id: 'move-object',
    title: 'Move object',
    description: 'Move an object to a different location in Active Directory',
    moduleId: 'active-directory',
    group: 'Object'
  },
  {
    id: 'rename-object',
    title: 'Rename object',
    description: 'Rename an object in Active Directory',
    moduleId: 'active-directory',
    group: 'Object'
  },
  
  // User actions
  {
    id: 'create-user',
    title: 'Create user',
    description: 'Create a new user in Active Directory',
    moduleId: 'active-directory',
    group: 'User'
  },
  {
    id: 'get-user-info',
    title: 'Get user info',
    description: 'Retrieve information about an Active Directory user',
    moduleId: 'active-directory',
    group: 'User'
  },
  {
    id: 'modify-user',
    title: 'Modify user',
    description: 'Modify the properties of an Active Directory user',
    moduleId: 'active-directory',
    group: 'User'
  },
  {
    id: 'unlock-user',
    title: 'Unlock user',
    description: 'Unlock a locked Active Directory user account',
    moduleId: 'active-directory',
    group: 'User'
  },
  {
    id: 'update-user-info',
    title: 'Update user info',
    description: 'Update the information for an Active Directory user',
    moduleId: 'active-directory',
    group: 'User'
  },
  
  // Connection actions
  {
    id: 'connect-to-server',
    title: 'Connect to server',
    description: 'Establish a connection to an Active Directory server',
    moduleId: 'active-directory'
  },
  {
    id: 'close-connection',
    title: 'Close connection',
    description: 'Close an Active Directory server connection',
    moduleId: 'active-directory'
  }
].sort((a, b) => {
  // First sort by group (if both have groups)
  if (a.group && b.group) {
    if (a.group !== b.group) {
      return a.group.localeCompare(b.group);
    }
  } else if (a.group) {
    return -1; // a has group, b doesn't, so a comes first
  } else if (b.group) {
    return 1; // b has group, a doesn't, so b comes first
  }
  
  // Then sort by title
  return a.title.localeCompare(b.title);
});

// Initialize the module with its actions
module.items = actions;

// Helper function to get all actions for this module
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
