import { ActionGroup, ActionItemType, DetailedActionItem } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'azure',
  title: 'Azure',
  icon: 'azure20Regular',
  iconColor: 'blue',
  tags: ['Integration'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: DetailedActionItem[] = [
  // Resource Groups
  {
    id: 'azure-get-resource-groups',
    title: 'Get resource groups',
    description: 'Retrieve a list of all resource groups in the Azure subscription',
    icon: 'folder-list',
    moduleId: 'azure',
    tags: ['Azure', 'Resource Groups'],
    usage: 'Use this action to get all resource groups in your Azure subscription.'
  },
  {
    id: 'azure-create-resource-group',
    title: 'Create resource group',
    description: 'Create a new resource group in Azure',
    icon: 'folder-add',
    moduleId: 'azure',
    tags: ['Azure', 'Resource Groups'],
    usage: 'Use this action to create a new resource group in your Azure subscription.'
  },
  {
    id: 'azure-delete-resource-group',
    title: 'Delete resource group',
    description: 'Delete an existing resource group from Azure',
    icon: 'folder-delete',
    moduleId: 'azure',
    tags: ['Azure', 'Resource Groups'],
    usage: 'Use this action to delete a resource group from your Azure subscription.'
  },
  
  // Virtual Machines - Disks
  {
    id: 'azure-get-disks',
    title: 'Get disks',
    description: 'Retrieve a list of all disks in the Azure subscription',
    icon: 'hard-drive',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'Disks'],
    usage: 'Use this action to get all disks in your Azure subscription.'
  },
  {
    id: 'azure-attach-disk',
    title: 'Attach disk',
    description: 'Attach a disk to an Azure virtual machine',
    icon: 'plug-connected',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'Disks'],
    usage: 'Use this action to attach a disk to a virtual machine.'
  },
  {
    id: 'azure-detach-disk',
    title: 'Detach disk',
    description: 'Detach a disk from an Azure virtual machine',
    icon: 'plug-disconnected',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'Disks'],
    usage: 'Use this action to detach a disk from a virtual machine.'
  },
  {
    id: 'azure-create-managed-disk',
    title: 'Create managed disk',
    description: 'Create a new managed disk in Azure',
    icon: 'add-circle',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'Disks'],
    usage: 'Use this action to create a new managed disk in Azure.'
  },
  {
    id: 'azure-delete-disk',
    title: 'Delete disk',
    description: 'Delete an existing disk from Azure',
    icon: 'delete',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'Disks'],
    usage: 'Use this action to delete a disk from your Azure subscription.'
  },
  
  // Virtual Machines - Snapshots
  {
    id: 'azure-get-snapshots',
    title: 'Get snapshots',
    description: 'Retrieve a list of all snapshots in the Azure subscription',
    icon: 'camera',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'Snapshots'],
    usage: 'Use this action to get all snapshots in your Azure subscription.'
  },
  {
    id: 'azure-create-snapshot',
    title: 'Create snapshot',
    description: 'Create a new snapshot of an Azure disk',
    icon: 'camera-add',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'Snapshots'],
    usage: 'Use this action to create a new snapshot of a disk in Azure.'
  },
  {
    id: 'azure-delete-snapshot',
    title: 'Delete snapshot',
    description: 'Delete an existing snapshot from Azure',
    icon: 'delete',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'Snapshots'],
    usage: 'Use this action to delete a snapshot from your Azure subscription.'
  },
  
  // Virtual Machine Actions
  {
    id: 'azure-get-virtual-machines',
    title: 'Get virtual machines',
    description: 'Retrieve a list of all virtual machines in the Azure subscription',
    icon: 'server',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to get all virtual machines in your Azure subscription.'
  },
  {
    id: 'azure-describe-virtual-machine',
    title: 'Describe virtual machine',
    description: 'Get detailed information about an Azure virtual machine',
    icon: 'info',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to get detailed information about a specific virtual machine.'
  },
  {
    id: 'azure-start-virtual-machine',
    title: 'Start virtual machine',
    description: 'Start an Azure virtual machine',
    icon: 'play',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to start a stopped virtual machine.'
  },
  {
    id: 'azure-stop-virtual-machine',
    title: 'Stop virtual machine',
    description: 'Stop an Azure virtual machine (still incurs compute charges)',
    icon: 'pause',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to stop a running virtual machine (still incurs compute charges).'
  },
  {
    id: 'azure-shutdown-virtual-machine',
    title: 'Shut down virtual machine',
    description: 'Shut down an Azure virtual machine (deallocates resources)',
    icon: 'stop',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to shut down a virtual machine and deallocate resources.'
  },
  {
    id: 'azure-restart-virtual-machine',
    title: 'Restart virtual machine',
    description: 'Restart an Azure virtual machine',
    icon: 'arrow-repeat',
    moduleId: 'azure',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to restart a running virtual machine.'
  },
  
  // Sessions
  {
    id: 'azure-create-session',
    title: 'Create session',
    description: 'Create a new session with Azure',
    icon: 'key',
    moduleId: 'azure',
    tags: ['Azure', 'Sessions'],
    usage: 'Use this action to create a new authenticated session with Azure.'
  },
  {
    id: 'azure-get-subscriptions',
    title: 'Get subscriptions',
    description: 'Retrieve a list of all Azure subscriptions',
    icon: 'list',
    moduleId: 'azure',
    tags: ['Azure', 'Sessions'],
    usage: 'Use this action to get all Azure subscriptions available to the authenticated user.'
  },
  {
    id: 'azure-end-session',
    title: 'End session',
    description: 'End an active session with Azure',
    icon: 'sign-out',
    moduleId: 'azure',
    tags: ['Azure', 'Sessions'],
    usage: 'Use this action to end an active Azure session.'
  }
];

// Create ActionItemType objects from the DetailedActionItem objects
const actionItems: ActionItemType[] = actions.map(action => ({
  id: action.id,
  title: action.title,
  icon: action.icon,
  description: action.description,
  moduleId: action.moduleId
}));

// Add actions to the module
module.items = actionItems;

// Helper function to get all actions for this module
export const getAllActions = () => actionItems;

// Helper function to get an action by ID
export const getActionById = (id: string) => actionItems.find(action => action.id === id);
