import { ActionGroup, ActionItemType, DetailedActionItem } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'azure',
  title: 'Azure',
  icon: 'azure20Regular',
  iconColor: 'blue',
  tags: ['Cloud', 'Integration', 'Automation'], // Category tag for this module
  category: 'Integration',  author: 'Microsoft',

  items: [], // This will be populated with references to the actions
  isInstalled: false, // Module is not installed by default
  subGroups: [] // Will be populated with subcategories
};

// Resource Groups subgroup
export const resourceGroupsSubgroup: ActionGroup = {
  id: 'azure-resource-groups',
  title: 'Resource Groups',
  items: [],
  icon: 'azure20Regular',
  iconColor: 'blue',
  tags: ['Integration']
};

// VM Disks subgroup
export const vmDisksSubgroup: ActionGroup = {
  id: 'azure-vm-disks',
  title: 'VM Disks',
  items: [],
  icon: 'azure20Regular',
  iconColor: 'blue',
  tags: ['Integration']
};

// VM Snapshots subgroup
export const vmSnapshotsSubgroup: ActionGroup = {
  id: 'azure-vm-snapshots',
  title: 'VM Snapshots',
  items: [],
  icon: 'azure20Regular',
  iconColor: 'blue',
  tags: ['Integration']
};

// VM Actions subgroup
export const vmActionsSubgroup: ActionGroup = {
  id: 'azure-vm-actions',
  title: 'VM Actions',
  items: [],
  icon: 'azure20Regular',
  iconColor: 'blue',
  tags: ['Integration']
};

// VM Sessions subgroup
export const vmSessionsSubgroup: ActionGroup = {
  id: 'azure-vm-sessions',
  title: 'VM Sessions',
  items: [],
  icon: 'azure20Regular',
  iconColor: 'blue',
  tags: ['Integration']
};

// Resource Groups actions
export const resourceGroupsActions: DetailedActionItem[] = [
  {
    id: 'azure-get-resource-groups',
    title: 'Get resource groups',
    description: 'Retrieve a list of all resource groups in the Azure subscription',
    moduleId: 'azure-resource-groups',
    tags: ['Azure', 'Resource Groups'],
    usage: 'Use this action to get all resource groups in your Azure subscription.'
  },
  {
    id: 'azure-create-resource-group',
    title: 'Create resource group',
    description: 'Create a new resource group in Azure',
    moduleId: 'azure-resource-groups',
    tags: ['Azure', 'Resource Groups'],
    usage: 'Use this action to create a new resource group in your Azure subscription.'
  },
  {
    id: 'azure-delete-resource-group',
    title: 'Delete resource group',
    description: 'Delete an existing resource group from Azure',
    moduleId: 'azure-resource-groups',
    tags: ['Azure', 'Resource Groups'],
    usage: 'Use this action to delete a resource group from your Azure subscription.'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// VM Disks actions
export const vmDisksActions: DetailedActionItem[] = [
  
  {
    id: 'azure-get-disks',
    title: 'Get disks',
    description: 'Retrieve a list of all disks in the Azure subscription',
    moduleId: 'azure-vm-disks',
    tags: ['Azure', 'Virtual Machines', 'Disks'],
    usage: 'Use this action to get all disks in your Azure subscription.'
  },
  {
    id: 'azure-attach-disk',
    title: 'Attach disk',
    description: 'Attach a disk to an Azure virtual machine',
    moduleId: 'azure-vm-disks',
    tags: ['Azure', 'Virtual Machines', 'Disks'],
    usage: 'Use this action to attach a disk to a virtual machine.'
  },
  {
    id: 'azure-detach-disk',
    title: 'Detach disk',
    description: 'Detach a disk from an Azure virtual machine',
    moduleId: 'azure-vm-disks',
    tags: ['Azure', 'Virtual Machines', 'Disks'],
    usage: 'Use this action to detach a disk from a virtual machine.'
  },
  {
    id: 'azure-create-managed-disk',
    title: 'Create managed disk',
    description: 'Create a new managed disk in Azure',
    moduleId: 'azure-vm-disks',
    tags: ['Azure', 'Virtual Machines', 'Disks'],
    usage: 'Use this action to create a new managed disk in Azure.'
  },
  {
    id: 'azure-delete-disk',
    title: 'Delete disk',
    description: 'Delete an existing disk from Azure',
    moduleId: 'azure-vm-disks',
    tags: ['Azure', 'Virtual Machines', 'Disks'],
    usage: 'Use this action to delete a disk from your Azure subscription.'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// VM Snapshots actions
export const vmSnapshotsActions: DetailedActionItem[] = [
  
  {
    id: 'azure-get-snapshots',
    title: 'Get snapshots',
    description: 'Retrieve a list of all snapshots in the Azure subscription',
    moduleId: 'azure-vm-snapshots',
    tags: ['Azure', 'Virtual Machines', 'Snapshots'],
    usage: 'Use this action to get all snapshots in your Azure subscription.'
  },
  {
    id: 'azure-create-snapshot',
    title: 'Create snapshot',
    description: 'Create a new snapshot of an Azure disk',
    moduleId: 'azure-vm-snapshots',
    tags: ['Azure', 'Virtual Machines', 'Snapshots'],
    usage: 'Use this action to create a new snapshot of a disk in Azure.'
  },
  {
    id: 'azure-delete-snapshot',
    title: 'Delete snapshot',
    description: 'Delete an existing snapshot from Azure',
    moduleId: 'azure-vm-snapshots',
    tags: ['Azure', 'Virtual Machines', 'Snapshots'],
    usage: 'Use this action to delete a snapshot from your Azure subscription.'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// VM Actions actions
export const vmActionsActions: DetailedActionItem[] = [
  
  {
    id: 'azure-get-virtual-machines',
    title: 'Get virtual machines',
    description: 'Retrieve a list of all virtual machines in the Azure subscription',
    moduleId: 'azure-vm-actions',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to get all virtual machines in your Azure subscription.'
  },
  {
    id: 'azure-describe-virtual-machine',
    title: 'Describe virtual machine',
    description: 'Get detailed information about an Azure virtual machine',
    moduleId: 'azure-vm-actions',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to get detailed information about a specific virtual machine.'
  },
  {
    id: 'azure-start-virtual-machine',
    title: 'Start virtual machine',
    description: 'Start an Azure virtual machine',
    moduleId: 'azure-vm-actions',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to start a stopped virtual machine.'
  },
  {
    id: 'azure-stop-virtual-machine',
    title: 'Stop virtual machine',
    description: 'Stop an Azure virtual machine (still incurs compute charges)',
    moduleId: 'azure-vm-actions',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to stop a running virtual machine (still incurs compute charges).'
  },
  {
    id: 'azure-shutdown-virtual-machine',
    title: 'Shut down virtual machine',
    description: 'Shut down an Azure virtual machine (deallocates resources)',
    moduleId: 'azure-vm-actions',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to shut down a virtual machine and deallocate resources.'
  },
  {
    id: 'azure-restart-virtual-machine',
    title: 'Restart virtual machine',
    description: 'Restart an Azure virtual machine',
    moduleId: 'azure-vm-actions',
    tags: ['Azure', 'Virtual Machines', 'VM Actions'],
    usage: 'Use this action to restart a running virtual machine.'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// VM Sessions actions
export const vmSessionsActions: DetailedActionItem[] = [
  
  {
    id: 'azure-create-session',
    title: 'Create session',
    description: 'Create a new session with Azure',
    moduleId: 'azure-vm-sessions',
    tags: ['Azure', 'Sessions'],
    usage: 'Use this action to create a new authenticated session with Azure.'
  },
  {
    id: 'azure-get-subscriptions',
    title: 'Get subscriptions',
    description: 'Retrieve a list of all Azure subscriptions',
    moduleId: 'azure-vm-sessions',
    tags: ['Azure', 'Sessions'],
    usage: 'Use this action to get all Azure subscriptions available to the authenticated user.'
  },
  {
    id: 'azure-end-session',
    title: 'End session',
    description: 'End an active session with Azure',
    moduleId: 'azure-vm-sessions',
    tags: ['Azure', 'Sessions'],
    usage: 'Use this action to end an active Azure session.'
  }
].sort((a, b) => a.title.localeCompare(b.title));


// Initialize the subgroups with their actions
resourceGroupsSubgroup.items = resourceGroupsActions;
vmDisksSubgroup.items = vmDisksActions;
vmSnapshotsSubgroup.items = vmSnapshotsActions;
vmActionsSubgroup.items = vmActionsActions;
vmSessionsSubgroup.items = vmSessionsActions;

// Add subgroups to the main module
module.subGroups = [
  resourceGroupsSubgroup,
  vmDisksSubgroup,
  vmSnapshotsSubgroup,
  vmActionsSubgroup,
  vmSessionsSubgroup
];

// Don't add actions to the main module to avoid duplicates
// Only show actions in their respective subgroups
module.items = [];

// Helper function to get all actions for this module
export const getAllActions = () => [
  ...resourceGroupsActions,
  ...vmDisksActions,
  ...vmSnapshotsActions,
  ...vmActionsActions,
  ...vmSessionsActions
];

// Helper function to get an action by ID
export const getActionById = (id: string) => {
  const allActions = getAllActions();
  return allActions.find(action => action.id === id);
};

// Helper function to get actions by subgroup
export const getActionsBySubgroup = (subgroupId: string) => {
  const subgroup = module.subGroups?.find(sg => sg.id === subgroupId);
  return subgroup ? subgroup.items : [];
};
