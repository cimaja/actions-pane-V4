import * as React from 'react';
import { createConnectorImageElement } from './connectorImageUtils';
import { getIconBackgroundClass, getIconColorClass } from './iconColorUtils';
import { 
  Cube24Regular, 
  Beaker24Regular,
  DocumentData24Regular,
  Document24Regular,
  DocumentPdf24Regular,
  Globe24Regular,
  ClipboardTask24Regular,
  Code24Regular,
  Braces24Regular,
  BracesVariable24Regular,
  Folder24Regular,
  FolderZip24Regular,
  Password24Regular,
  LockClosed24Regular,
  Database24Regular,
  Calendar24Regular,
  Clock24Regular,
  Mail24Regular,
  Mail20Regular,
  ArrowCircleDown24Regular,
  ArrowRepeatAll24Regular,
  Timer24Regular,
  Chat24Regular,
  Channel24Regular,
  KeyboardShift24Regular,
  Keyboard24Regular,
  ScanText24Regular,
  Window24Regular,
  TextField24Regular,
  Laptop24Regular,
  Script24Regular,
  DesktopTower24Regular,
  DesktopMac24Regular,
  TextDescription24Regular,
  WindowApps24Regular,
  DataUsageSettings24Regular,
  WindowSettings20Regular,
  WindowConsole20Regular,
  BrainCircuit24Regular,
  Organization24Regular,
  PuzzlePiece20Regular, // Added for custom actions
  Settings20Regular,
  MailMultiple20Regular,
  DocumentText20Regular,
  FolderOpen20Regular,
  CalendarClock20Regular,
  PlayCircle20Regular,
  Chat20Regular, // Already have Chat24Regular, adding 20 for specificity if needed
  Channel20Regular, // Already have Channel24Regular, adding 20 for specificity if needed
  Send20Regular,
  ArrowUpload20Regular,
  ArrowSyncCircle20Regular,
  Eye20Regular
} from '@fluentui/react-icons';
import { Word24Regular } from '../components/Library/WordIcon';
import { Excel24Regular } from '../components/Library/ExcelIcon';
import { Exchange24Regular } from '../components/Library/ExchangeIcon';
import { Access24Regular } from '../components/Library/AccessIcon';
import { IBMCognitive24Regular } from '../components/Library/IBMCognitiveIcon';
import { MicrosoftCognitive24Regular } from '../components/Library/MicrosoftCognitiveIcon';
import { AIBuilder24Regular } from '../components/Library/AIBuilderIcon';
import { AWS24Regular } from '../components/Library/AWSIcon';
import { ActiveDirectory24Regular } from '../components/Library/ActiveDirectoryIcon';
import { ArrowCircleDownUp24Regular } from '../components/Library/ArrowCircleDownUpIcon';
import { Azure24Regular } from '../components/Library/AzureIcon';
import { CyberArk24Regular } from '../components/Library/CyberArkIcon';
import { CustomGlobe24Regular } from '../components/Library/CustomGlobeIcon';
import { GoogleCognitive24Regular } from '../components/Library/GoogleCognitiveIcon';
import { ListBarTree24Regular } from '../components/Library/ListBarTreeIcon';
import { MailShield24Regular } from '../components/Library/MailShieldIcon';

// Define the icon component type
type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

// Define the icon map
const iconMap: Record<string, IconComponent> = {
  // Default icon
  default: Cube24Regular,

  // Custom Actions
  PuzzlePiece20Regular: PuzzlePiece20Regular,

  // Icons for Custom Action sub-actions
  Settings20Regular: Settings20Regular,
  MailMultiple20Regular: MailMultiple20Regular,
  DocumentText20Regular: DocumentText20Regular,
  FolderOpen20Regular: FolderOpen20Regular,
  CalendarClock20Regular: CalendarClock20Regular,
  PlayCircle20Regular: PlayCircle20Regular,
  Chat20Regular: Chat20Regular,
  Channel20Regular: Channel20Regular,
  Send20Regular: Send20Regular,
  ArrowUpload20Regular: ArrowUpload20Regular,
  ArrowSyncCircle20Regular: ArrowSyncCircle20Regular,
  Eye20Regular: Eye20Regular,

  // Email & Communication
  mail: Mail24Regular,
  mail20Regular: Mail24Regular,
  mail24Regular: Mail24Regular,
  mailShield: MailShield24Regular,
  mailShield20Regular: MailShield24Regular,
  mailShield24Regular: MailShield24Regular,
  exchange: Exchange24Regular,
  exchange20Regular: Exchange24Regular,
  exchange24Regular: Exchange24Regular,
  'exchange-server': Exchange24Regular,
  
  // Microsoft Office
  word: Word24Regular,
  word20Regular: Word24Regular,
  word24Regular: Word24Regular,
  excel: Excel24Regular,
  excel20Regular: Excel24Regular,
  excel24Regular: Excel24Regular,
  access: Access24Regular,
  access20Regular: Access24Regular,
  access24Regular: Access24Regular,
  
  // AI & Cognitive
  aiBuilder: AIBuilder24Regular,
  aiBuilder20Regular: AIBuilder24Regular,
  aiBuilder24Regular: AIBuilder24Regular,
  brainCircuit: BrainCircuit24Regular,
  brainCircuit20Regular: BrainCircuit24Regular,
  brainCircuit24Regular: BrainCircuit24Regular,
  microsoftCognitive: MicrosoftCognitive24Regular,
  microsoftCognitive20Regular: MicrosoftCognitive24Regular,
  microsoftCognitive24Regular: MicrosoftCognitive24Regular,
  ibmCognitive: IBMCognitive24Regular,
  ibmCognitive20Regular: IBMCognitive24Regular,
  ibmCognitive24Regular: IBMCognitive24Regular,
  googleCognitive: GoogleCognitive24Regular,
  googleCognitive20Regular: GoogleCognitive24Regular,
  googleCognitive24Regular: GoogleCognitive24Regular,
  
  // Cloud Providers
  aws: AWS24Regular,
  aws20Regular: AWS24Regular,
  aws24Regular: AWS24Regular,
  azure: Azure24Regular,
  azure20Regular: Azure24Regular,
  azure24Regular: Azure24Regular,
  
  // Active Directory
  activeDirectory: ActiveDirectory24Regular,
  activeDirectory20Regular: ActiveDirectory24Regular,
  activeDirectory24Regular: ActiveDirectory24Regular,
  customActiveDirectory20Regular: ActiveDirectory24Regular,
  'active-directory': ActiveDirectory24Regular,
  
  // Security
  cyberArk: CyberArk24Regular,
  cyberark20Regular: CyberArk24Regular,
  'cyber-ark': CyberArk24Regular,
  
  // Data & Storage
  database: Database24Regular,
  database20Regular: Database24Regular,
  database24Regular: Database24Regular,
  
  // Clipboard
  clipboard: ClipboardTask24Regular,
  clipboard20Regular: ClipboardTask24Regular,
  clipboard24Regular: ClipboardTask24Regular,
  
  // Documents
  documentData: DocumentData24Regular,
  documentData20Regular: DocumentData24Regular,
  documentData24Regular: DocumentData24Regular,
  documentPdf: DocumentPdf24Regular,
  documentPdf20Regular: DocumentPdf24Regular,
  documentPdf24Regular: DocumentPdf24Regular,
  
  // Web & Network
  globe: Globe24Regular,
  globe20Regular: Globe24Regular,
  globe24Regular: Globe24Regular,
  arrowCircleDown: ArrowCircleDown24Regular,
  arrowCircleDown20Regular: ArrowCircleDown24Regular,
  arrowCircleDown24Regular: ArrowCircleDown24Regular,
  arrowRepeatAll: ArrowRepeatAll24Regular,
  arrowRepeatAll20Regular: ArrowRepeatAll24Regular,
  arrowRepeatAll24Regular: ArrowRepeatAll24Regular,
  arrowCircleDownUp: ArrowCircleDownUp24Regular,
  arrowCircleDownUp20Regular: ArrowCircleDownUp24Regular,
  
  customGlobe: CustomGlobe24Regular,
  customGlobe20Regular: CustomGlobe24Regular,
  
  // Work Management
  listBarTree: ListBarTree24Regular,
  listBarTree20Regular: ListBarTree24Regular,
  'work-queues': ListBarTree24Regular,
  workQueues: ListBarTree24Regular,
  workqueues: ListBarTree24Regular,
  
  document: Document24Regular,
  document24Regular: Document24Regular,
  
  // Development
  code: Code24Regular,
  code20Regular: Code24Regular,
  code24Regular: Code24Regular,
  braces: Braces24Regular,
  braces20Regular: Braces24Regular,
  braces24Regular: Braces24Regular,
  bracesVariable: BracesVariable24Regular,
  bracesVariable20Regular: BracesVariable24Regular,
  bracesVariable24Regular: BracesVariable24Regular,
  
  // Files & Folders
  folder: Folder24Regular,
  folder20Regular: Folder24Regular,
  folder24Regular: Folder24Regular,
  folderZip: FolderZip24Regular,
  folderZip20Regular: FolderZip24Regular,
  folderZip24Regular: FolderZip24Regular,
  
  // Security
  password: Password24Regular,
  password20Regular: Password24Regular,
  password24Regular: Password24Regular,
  lockClosed: LockClosed24Regular,
  lockClosed20Regular: LockClosed24Regular,
  lockClosed24Regular: LockClosed24Regular,
  
  // Time
  calendar: Calendar24Regular,
  calendar20Regular: Calendar24Regular,
  calendar24Regular: Calendar24Regular,
  clock: Clock24Regular,
  clock20Regular: Clock24Regular,
  clock24Regular: Clock24Regular,
  timer: Timer24Regular,
  timer20Regular: Timer24Regular,
  timer24Regular: Timer24Regular,
  
  // Communication
  chat: Chat24Regular,
  chat20Regular: Chat24Regular,
  chat24Regular: Chat24Regular,
  channel: Channel24Regular,
  channel20Regular: Channel24Regular,
  channel24Regular: Channel24Regular,
  
  // Input
  keyboard: Keyboard24Regular,
  keyboard20Regular: Keyboard24Regular,
  keyboard24Regular: Keyboard24Regular,
  keyboardShift: KeyboardShift24Regular,
  keyboardShift20Regular: KeyboardShift24Regular,
  keyboardShift24Regular: KeyboardShift24Regular,
  scanText: ScanText24Regular,
  scanText20Regular: ScanText24Regular,
  scanText24Regular: ScanText24Regular,
  textField: TextField24Regular,
  textField20Regular: TextField24Regular,
  textField24Regular: TextField24Regular,
  textDescription: TextDescription24Regular,
  textDescription20Regular: TextDescription24Regular,
  textDescription24Regular: TextDescription24Regular,
  
  // Windows & Apps
  window: Window24Regular,
  window20Regular: Window24Regular,
  window24Regular: Window24Regular,
  windowApps: WindowApps24Regular,
  windowApps20Regular: WindowApps24Regular,
  windowApps24Regular: WindowApps24Regular,
  windowSettings: WindowSettings20Regular,
  windowSettings20Regular: WindowSettings20Regular,
  windowConsole: WindowConsole20Regular,
  windowConsole20Regular: WindowConsole20Regular,
  
  // Devices
  laptop: Laptop24Regular,
  laptop20Regular: Laptop24Regular,
  laptop24Regular: Laptop24Regular,
  desktopTower: DesktopTower24Regular,
  desktopTower20Regular: DesktopTower24Regular,
  desktopTower24Regular: DesktopTower24Regular,
  desktopMac: DesktopMac24Regular,
  desktopMac20Regular: DesktopMac24Regular,
  desktopMac24Regular: DesktopMac24Regular,
  
  // Miscellaneous
  beaker: Beaker24Regular,
  beaker20Regular: Beaker24Regular,
  beaker24Regular: Beaker24Regular,
  clipboardTask: ClipboardTask24Regular,
  clipboardTask20Regular: ClipboardTask24Regular,
  clipboardTask24Regular: ClipboardTask24Regular,
  script: Script24Regular,
  script20Regular: Script24Regular,
  script24Regular: Script24Regular,
  dataUsageSettings: DataUsageSettings24Regular,
  dataUsageSettings20Regular: DataUsageSettings24Regular,
  dataUsageSettings24Regular: DataUsageSettings24Regular,
  organization: Organization24Regular,
  organization20Regular: Organization24Regular,
  organization24Regular: Organization24Regular
};

/**
 * Checks if a module is a connector type that should use an image instead of an icon
 * @param moduleId The ID of the module
 * @returns True if the module is a connector
 */
export const isConnector = (moduleId?: string): boolean => {
  if (!moduleId) return false;
  
  // List of module IDs that are connectors
  const connectorModules = [
    'microsoft-teams',
    'sharepoint',
    'onedrive',
    'onedrive-business',
    'office365',
    'office365-outlook',
    'dynamics365',
    'azure-blob-storage',
    'azure-key-vault',
    'azure-openai',
    'azure-devops',
    'sql-server',
    'sap',
    'salesforce',
    'github',
    'jira',
    'google-calendar',
    'google-drive',
    'google-sheets',
    'google-tasks',
    'dropbox',
    'box',
    'adobe-sign',
    'adobe-acrobat-sign',
    'adobe-pdf-services',
    'bitly',
    'bing-maps',
    'linkedin',
    'surveymonkey',
    'power-bi',
    'planner',
    'microsoft-forms',
    'microsoft-todo',
    'onenote',
    'word-online',
    'excel-online'
  ];
  
  return connectorModules.includes(moduleId);
};

/**
 * Get the image path for a connector module
 * @param moduleId The ID of the module
 * @returns The path to the connector image
 */
export const getConnectorImagePath = (moduleId?: string): string => {
  // All connector images are in the public/assets/connectors directory
  // The public directory is the root for static assets in React
  // Use absolute paths starting with a forward slash
  
  // For Microsoft Teams, use the Microsoft Teams.png image
  if (moduleId === 'microsoft-teams') {
    return '/assets/connectors/Microsoft Teams.png';
  }
  
  // For Exchange Server, use Office 365 Outlook.png
  if (moduleId === 'exchange-server') {
    return '/assets/connectors/Office 365 Outlook.png';
  }
  
  // Default to using the module ID to find a matching image
  // If no specific image is found, use the Default connector.png
  return `/assets/connectors/Default connector.png`;
};

/**
 * Get the appropriate icon component based on the icon name
 * @param iconName The name of the icon
 * @param moduleId Optional module ID to check if it's a connector
 * @returns React element with the appropriate icon
 */
export const getIconByName = (iconName?: string, moduleId?: string): React.ReactElement => {
  // If this is a connector module, we'll use an image instead of an icon
  if (moduleId && isConnector(moduleId)) {
    // Use the connector image utility to create the image element
    return createConnectorImageElement(moduleId);
  }
  
  // For non-connectors, use the regular icon system
  // If no icon name is provided or it doesn't exist in our map, use the default
  let iconComponent = iconMap.default;
  
  try {
    // Only try to get the icon if a name is provided
    if (iconName && iconMap[iconName]) {
      iconComponent = iconMap[iconName];
    }
  } catch (error) {
    console.warn(`Icon not found: ${iconName}`, error);
    // Fall back to default icon
    iconComponent = iconMap.default;
  }
  
  // Create and return the React element
  return React.createElement(iconComponent);
};


