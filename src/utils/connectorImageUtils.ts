import React from 'react';

// Import connector images directly
// TypeScript will recognize these imports thanks to our declaration file
import microsoftTeamsImage from '../assets/connectors/Microsoft Teams.png';
import office365OutlookImage from '../assets/connectors/Office 365 Outlook.png';
import azureDevOpsImage from '../assets/connectors/Azure DevOps.png';
import azureOpenAIImage from '../assets/connectors/Azure OpenAI.png';
import defaultConnectorImage from '../assets/connectors/Default connector.png';

// Map of module IDs to their imported images
const connectorImageImports: Record<string, string> = {
  'microsoft-teams': microsoftTeamsImage,
  'exchange-server': office365OutlookImage,
  'azure-devops': azureDevOpsImage,
  'azure-openai': azureOpenAIImage
};

// Get the image for a connector module
const getConnectorImage = (moduleId: string): string => {
  // Return the imported image if available, otherwise use the default
  return connectorImageImports[moduleId] || defaultConnectorImage;
};

// Map module IDs to their corresponding image filenames
const getImageNameForModule = (moduleId: string): string => {
  const imageMap: Record<string, string> = {
    'microsoft-teams': 'Microsoft Teams.png',
    'exchange-server': 'Office 365 Outlook.png',
    'sharepoint': 'SharePoint.png',
    'onedrive': 'OneDrive for Business.png',
    'office365': 'Office 365 Outlook.png',
    'dynamics365': 'Dynamics 365 Business Central.png',
    'azure-blob': 'Azure Blob Storage.png',
    'azure-keyvault': 'Azure Key Vault.png',
    'azure-openai': 'Azure OpenAI.png',
    'azure-devops': 'Azure DevOps.png',
    'sql-server': 'SQL Server.png',
    'sap': 'SAP.png',
    'salesforce': 'Salesforce.png',
    'github': 'GitHub.png',
    'jira': 'Jira.png',
    'google-calendar': 'Google Calendar.png',
    'google-drive': 'Google Drive.png',
    'google-sheets': 'Google Sheets.png',
    'google-tasks': 'Google Tasks.png',
    'dropbox': 'Dropbox.png',
    'box': 'Box.png',
    'adobe-sign': 'Adobe Acrobat Sign.png',
    'adobe-pdf': 'Adobe PDF Services.png',
    'bitly': 'Bitly.png',
    'bing-maps': 'Bing Maps.png',
    'linkedin': 'LinkedIn V2.png',
    'surveymonkey': 'SurveyMonkey.png',
    'power-bi': 'Power BI.png',
    'planner': 'Planner.png',
    'microsoft-forms': 'Microsoft Forms.png',
    'microsoft-todo': 'Microsoft To-Do (Business).png',
    'onenote': 'OneNote (Business).png',
    'word-online': 'Word Online (Business).png',
    'excel-online': 'Excel Online (Business).png'
  };

  return imageMap[moduleId] || 'Default connector.png';
};

/**
 * Creates a React element for a connector image
 * @param moduleId The ID of the connector module
 * @returns React element with the connector image
 */
export const createConnectorImageElement = (moduleId: string): React.ReactElement => {
  return React.createElement('img', {
    src: getConnectorImage(moduleId),
    alt: moduleId,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      padding: '2px',
      backgroundColor: 'white',
      borderRadius: '8px'
    }
  });
};
