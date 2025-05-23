import React from 'react';

// Import connector images directly
// TypeScript will recognize these imports thanks to our declaration file
import microsoftTeamsImage from '../assets/connectors/Microsoft Teams.png';
import office365OutlookImage from '../assets/connectors/Office 365 Outlook.png';
import azureDevOpsImage from '../assets/connectors/Azure DevOps.png';
import azureOpenAIImage from '../assets/connectors/Azure OpenAI.png';
import adobeAcrobatSignImage from '../assets/connectors/Adobe Acrobat Sign.png';
import adobePdfServicesImage from '../assets/connectors/Adobe PDF Services.png';
import azureBlobStorageImage from '../assets/connectors/Azure Blob Storage.png';
import azureKeyVaultImage from '../assets/connectors/Azure Key Vault.png';
import bingMapsImage from '../assets/connectors/Bing Maps.png';
import bitlyImage from '../assets/connectors/Bitly.png';
import boxImage from '../assets/connectors/Box.png';
import dropboxImage from '../assets/connectors/Dropbox.png';
import dynamics365Image from '../assets/connectors/Dynamics 365 Business Central.png';
import excelOnlineImage from '../assets/connectors/Excel Online (Business).png';
import githubImage from '../assets/connectors/GitHub.png';
import googleCalendarImage from '../assets/connectors/Google Calendar.png';
import googleDriveImage from '../assets/connectors/Google Drive.png';
import googleSheetsImage from '../assets/connectors/Google Sheets.png';
import googleTasksImage from '../assets/connectors/Google Tasks.png';
import jiraImage from '../assets/connectors/Jira.png';
import microsoftFormsImage from '../assets/connectors/Microsoft Forms.png';
import microsoftTodoImage from '../assets/connectors/Microsoft To-Do (Business).png';
import onedriveBusinessImage from '../assets/connectors/OneDrive for Business.png';
import onenoteImage from '../assets/connectors/OneNote (Business).png';
import plannerImage from '../assets/connectors/Planner.png';
import powerBiImage from '../assets/connectors/Power BI.png';
import salesforceImage from '../assets/connectors/Salesforce.png';
import sapImage from '../assets/connectors/SAP.png';
import sharepointImage from '../assets/connectors/SharePoint.png';
import sqlServerImage from '../assets/connectors/SQL Server.png';
import surveyMonkeyImage from '../assets/connectors/SurveyMonkey.png';
import wordOnlineImage from '../assets/connectors/Word Online (Business).png';
import defaultConnectorImage from '../assets/connectors/Default connector.png';

// Map of module IDs to their imported images
const connectorImageImports: Record<string, string> = {
  'microsoft-teams': microsoftTeamsImage,
  'exchange-server': office365OutlookImage,
  'azure-devops': azureDevOpsImage,
  'azure-openai': azureOpenAIImage,
  'azure-blob-storage': azureBlobStorageImage,
  'azure-key-vault': azureKeyVaultImage,
  'adobe-acrobat-sign': adobeAcrobatSignImage,
  'adobe-pdf-services': adobePdfServicesImage,
  'bing-maps': bingMapsImage,
  'bitly': bitlyImage,
  'box': boxImage,
  'dropbox': dropboxImage,
  'dynamics365': dynamics365Image,
  'office365-outlook': office365OutlookImage,
  'onedrive': onedriveBusinessImage,
  'onedrive-business': onedriveBusinessImage, // Alias for backward compatibility
  'excel-online': excelOnlineImage,
  'github': githubImage,
  'google-calendar': googleCalendarImage,
  'google-drive': googleDriveImage,
  'google-sheets': googleSheetsImage,
  'google-tasks': googleTasksImage,
  'jira': jiraImage,
  'microsoft-forms': microsoftFormsImage,
  'microsoft-todo': microsoftTodoImage,
  'onenote': onenoteImage,
  'planner': plannerImage,
  'power-bi': powerBiImage,
  'salesforce': salesforceImage,
  'sap': sapImage,
  'sharepoint': sharepointImage,
  'sql-server': sqlServerImage,
  'surveymonkey': surveyMonkeyImage,
  'word-online': wordOnlineImage
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
    'adobe-acrobat-sign': 'Adobe Acrobat Sign.png',
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
