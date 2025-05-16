import { ActionGroup, ActionItemType, DetailedActionItem } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'aws',
  title: 'AWS',
  icon: 'aws20Regular',
  iconColor: 'blue',
  tags: ['Integration'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false, // Module is not installed by default
  subGroups: [] // Will be populated with subcategories
};

// EC2 Instances subgroup
export const ec2InstancesSubgroup: ActionGroup = {
  id: 'aws-ec2-instances',
  title: 'EC2 Instances',
  items: [],
  icon: 'aws20Regular',
  iconColor: 'blue',
  tags: ['Integration']
};

// EC2 Snapshots subgroup
export const ec2SnapshotsSubgroup: ActionGroup = {
  id: 'aws-ec2-snapshots',
  title: 'EC2 Snapshots',
  items: [],
  icon: 'aws20Regular',
  iconColor: 'blue',
  tags: ['Integration']
};

// EC2 Volumes subgroup
export const ec2VolumesSubgroup: ActionGroup = {
  id: 'aws-ec2-volumes',
  title: 'EC2 Volumes',
  items: [],
  icon: 'aws20Regular',
  iconColor: 'blue',
  tags: ['Integration']
};

// Module actions
// EC2 Instances actions
export const ec2InstancesActions: DetailedActionItem[] = [
  {
    id: 'aws-ec2-start-instance',
    title: 'Start EC2 instance',
    description: 'Start an Amazon EC2 instance',
    moduleId: 'aws-ec2-instances',
    tags: ['AWS', 'EC2', 'Instance', 'EC2 > Instances'],
    usage: 'Use this action to start a stopped EC2 instance.'
  },
  {
    id: 'aws-ec2-stop-instance',
    title: 'Stop EC2 instance',
    description: 'Stop an Amazon EC2 instance',
    moduleId: 'aws-ec2-instances',
    tags: ['AWS', 'EC2', 'Instance', 'EC2 > Instances'],
    usage: 'Use this action to stop a running EC2 instance.'
  },
  {
    id: 'aws-ec2-reboot-instance',
    title: 'Reboot EC2 instance',
    description: 'Reboot an Amazon EC2 instance',
    moduleId: 'aws-ec2-instances',
    tags: ['AWS', 'EC2', 'Instance', 'EC2 > Instances'],
    usage: 'Use this action to reboot a running EC2 instance.'
  },
  {
    id: 'aws-ec2-get-instances',
    title: 'Get available EC2 instances',
    description: 'Get a list of available Amazon EC2 instances',
    moduleId: 'aws-ec2-instances',
    tags: ['AWS', 'EC2', 'Instance', 'EC2 > Instances'],
    usage: 'Use this action to retrieve a list of all available EC2 instances.'
  },
  {
    id: 'aws-ec2-describe-instances',
    title: 'Describe instances',
    description: 'Get detailed information about Amazon EC2 instances',
    moduleId: 'aws-ec2-instances',
    tags: ['AWS', 'EC2', 'Instance', 'EC2 > Instances'],
    usage: 'Use this action to get detailed information about specific EC2 instances.'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// EC2 Snapshots actions
export const ec2SnapshotsActions: DetailedActionItem[] = [
  {
    id: 'aws-ec2-create-snapshot',
    title: 'Create snapshot',
    description: 'Create a snapshot of an Amazon EC2 instance',
    moduleId: 'aws-ec2-snapshots',
    tags: ['AWS', 'EC2', 'Snapshot', 'EC2 > Snapshots'],
    usage: 'Use this action to create a point-in-time snapshot of an EC2 volume.'
  },
  {
    id: 'aws-ec2-describe-snapshots',
    title: 'Describe snapshots',
    description: 'Get detailed information about Amazon EC2 snapshots',
    moduleId: 'aws-ec2-snapshots',
    tags: ['AWS', 'EC2', 'Snapshot', 'EC2 > Snapshots'],
    usage: 'Use this action to get detailed information about EC2 snapshots.'
  },
  {
    id: 'aws-ec2-delete-snapshot',
    title: 'Delete snapshot',
    description: 'Delete an Amazon EC2 snapshot',
    moduleId: 'aws-ec2-snapshots',
    tags: ['AWS', 'EC2', 'Snapshot', 'EC2 > Snapshots'],
    usage: 'Use this action to delete an EC2 snapshot that is no longer needed.'
  }
].sort((a, b) => a.title.localeCompare(b.title));

// EC2 Volumes actions
export const ec2VolumesActions: DetailedActionItem[] = [
  {
    id: 'aws-ec2-create-session',
    title: 'Create EC2 session',
    description: 'Create a new session with an Amazon EC2 instance',
    moduleId: 'aws-ec2-volumes',
    tags: ['AWS', 'EC2', 'Volume', 'EC2 > Volumes'],
    usage: 'Use this action to establish a new session with an EC2 instance.'
  },
  {
    id: 'aws-ec2-end-session',
    title: 'End EC2 session',
    description: 'End an active session with an Amazon EC2 instance',
    moduleId: 'aws-ec2-volumes',
    tags: ['AWS', 'EC2', 'Volume', 'EC2 > Volumes'],
    usage: 'Use this action to terminate an active session with an EC2 instance.'
  }
].sort((a, b) => a.title.localeCompare(b.title));


// Initialize the subgroups with their actions
ec2InstancesSubgroup.items = ec2InstancesActions;
ec2SnapshotsSubgroup.items = ec2SnapshotsActions;
ec2VolumesSubgroup.items = ec2VolumesActions;

// Add subgroups to the main module
module.subGroups = [
  ec2InstancesSubgroup,
  ec2SnapshotsSubgroup,
  ec2VolumesSubgroup
];

// Don't add actions to the main module to avoid duplicates
// Only show actions in their respective subgroups
module.items = [];

// Helper function to get all actions for this module
export const getAllActions = () => module.items;

// Helper function to get an action by ID
export const getActionById = (id: string) => module.items.find(action => action.id === id);

// Helper function to get actions by subgroup
export const getActionsBySubgroup = (subgroupId: string) => {
  const subgroup = module.subGroups?.find(sg => sg.id === subgroupId);
  return subgroup ? subgroup.items : [];
};
