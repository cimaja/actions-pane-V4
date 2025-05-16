import { ActionGroup, ActionItemType, DetailedActionItem } from '../../../models/types';

// Module metadata
export const module: ActionGroup = {
  id: 'aws',
  title: 'AWS',
  icon: 'aws20Regular',
  iconColor: 'blue',
  tags: ['Integration'], // Category tag for this module
  items: [], // This will be populated with references to the actions
  isInstalled: false // Module is not installed by default
};

// Module actions
export const actions: DetailedActionItem[] = [
  // EC2 Instances
  {
    id: 'aws-ec2-start-instance',
    title: 'Start EC2 instance',
    description: 'Start an Amazon EC2 instance',
    icon: 'play',
    moduleId: 'aws',
    tags: ['AWS', 'EC2', 'Instance', 'EC2 > Instances'],
    usage: 'Use this action to start a stopped EC2 instance.'
  },
  {
    id: 'aws-ec2-stop-instance',
    title: 'Stop EC2 instance',
    description: 'Stop an Amazon EC2 instance',
    icon: 'stop',
    moduleId: 'aws',
    tags: ['AWS', 'EC2', 'Instance', 'EC2 > Instances'],
    usage: 'Use this action to stop a running EC2 instance.'
  },
  {
    id: 'aws-ec2-reboot-instance',
    title: 'Reboot EC2 instance',
    description: 'Reboot an Amazon EC2 instance',
    icon: 'arrow-repeat',
    moduleId: 'aws',
    tags: ['AWS', 'EC2', 'Instance', 'EC2 > Instances'],
    usage: 'Use this action to reboot a running EC2 instance.'
  },
  {
    id: 'aws-ec2-get-instances',
    title: 'Get available EC2 instances',
    description: 'Get a list of available Amazon EC2 instances',
    icon: 'list',
    moduleId: 'aws',
    tags: ['AWS', 'EC2', 'Instance', 'EC2 > Instances'],
    usage: 'Use this action to retrieve a list of all available EC2 instances.'
  },
  {
    id: 'aws-ec2-describe-instances',
    title: 'Describe instances',
    description: 'Get detailed information about Amazon EC2 instances',
    icon: 'info',
    moduleId: 'aws',
    tags: ['AWS', 'EC2', 'Instance', 'EC2 > Instances'],
    usage: 'Use this action to get detailed information about specific EC2 instances.'
  },
  
  // EC2 Snapshots
  {
    id: 'aws-ec2-create-snapshot',
    title: 'Create snapshot',
    description: 'Create a snapshot of an Amazon EC2 instance',
    icon: 'camera',
    moduleId: 'aws',
    tags: ['AWS', 'EC2', 'Snapshot', 'EC2 > Snapshots'],
    usage: 'Use this action to create a point-in-time snapshot of an EC2 volume.'
  },
  {
    id: 'aws-ec2-describe-snapshots',
    title: 'Describe snapshots',
    description: 'Get detailed information about Amazon EC2 snapshots',
    icon: 'info',
    moduleId: 'aws',
    tags: ['AWS', 'EC2', 'Snapshot', 'EC2 > Snapshots'],
    usage: 'Use this action to get detailed information about EC2 snapshots.'
  },
  {
    id: 'aws-ec2-delete-snapshot',
    title: 'Delete snapshot',
    description: 'Delete an Amazon EC2 snapshot',
    icon: 'delete',
    moduleId: 'aws',
    tags: ['AWS', 'EC2', 'Snapshot', 'EC2 > Snapshots'],
    usage: 'Use this action to delete an EC2 snapshot that is no longer needed.'
  },
  
  // EC2 Volumes
  {
    id: 'aws-ec2-create-session',
    title: 'Create EC2 session',
    description: 'Create a new session with an Amazon EC2 instance',
    icon: 'plug-connected',
    moduleId: 'aws',
    tags: ['AWS', 'EC2', 'Volume', 'EC2 > Volumes'],
    usage: 'Use this action to establish a new session with an EC2 instance.'
  },
  {
    id: 'aws-ec2-end-session',
    title: 'End EC2 session',
    description: 'End an active session with an Amazon EC2 instance',
    icon: 'plug-disconnected',
    moduleId: 'aws',
    tags: ['AWS', 'EC2', 'Volume', 'EC2 > Volumes'],
    usage: 'Use this action to terminate an active session with an EC2 instance.'
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
