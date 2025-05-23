import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'adobe-pdf-services',
  title: 'Adobe PDF Services',
  type: 'connector',
  icon: '/assets/connectors/Adobe PDF Services.png',
  description: 'Adobe PDF Services API brings a set of powerful cloud-based APIs to integrate multi-step document workflows into any application. Use document generation to create custom PDF documents from Word templates and JSON data. Extract text, tables and images from PDFs in a structured JSON to enable downstream solutions. Convert to PDF, export PDF to other formats, apply OCR, compress, linearize or protect PDFs, and also edit PDFs with tools like merge or split. Auto-tag PDFs for better Accessibility.',
  author: 'Adobe',
  isInstalled: false,
  category: 'Third party' as const,
  tags: ['adobe', 'pdf', 'document', 'conversion', 'processing']
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'apply-electronic-seal',
    moduleId: 'adobe-pdf-services',
    title: 'Apply an Electronic Seal to PDF',
    description: 'Apply an Electronic Seal to your PDF documents. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'seal', 'security'],
    usage: 'Use this action to apply an electronic seal to PDF documents.'
  },
  {
    id: 'compress-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Compress PDF',
    description: 'Compress a PDF file. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'compress', 'optimize'],
    usage: 'Use this action to reduce the file size of a PDF document.'
  },
  {
    id: 'convert-to-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Convert document to PDF',
    description: 'Convert a file to PDF format. Only files with .doc, .docx, .ppt, .pptx, .xls, .xlsx, .bmp, .gif, .jpeg, .jpg, .png, .rtf, .tif, .tiff or .txt extension are supported.',
    tags: ['adobe', 'pdf', 'convert', 'document'],
    usage: 'Use this action to convert various document formats to PDF.'
  },
  {
    id: 'convert-dynamic-html-to-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Convert Dynamic HTML to PDF',
    description: 'Convert a Dynamic HTML file to PDF format. Since HTML/web pages typically contain external assets, the input file must be a zip file containing an index.html at the top level of the archive, as well as any dependencies such as images, css files, and so on. Only files with .zip extension are supported.',
    tags: ['adobe', 'pdf', 'html', 'convert', 'web'],
    usage: 'Use this action to convert dynamic HTML content to PDF.'
  },
  {
    id: 'convert-excel-to-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Convert Excel to PDF',
    description: 'Convert an Excel file to PDF format. Only files with .xls or .xlsx extension are supported.',
    tags: ['adobe', 'pdf', 'excel', 'convert', 'spreadsheet'],
    usage: 'Use this action to convert Excel spreadsheets to PDF.'
  },
  {
    id: 'convert-image-to-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Convert Image to PDF',
    description: 'Convert an image file to PDF format. Only files with .png, .jpeg, .jpg, .tiff, .tif or .gif extension are supported.',
    tags: ['adobe', 'pdf', 'image', 'convert', 'picture'],
    usage: 'Use this action to convert image files to PDF.'
  },
  {
    id: 'convert-pdf-to-excel',
    moduleId: 'adobe-pdf-services',
    title: 'Convert PDF to Excel',
    description: 'Convert a PDF file to an Excel file. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'excel', 'convert', 'extract'],
    usage: 'Use this action to extract tables from PDF to Excel format.'
  },
  {
    id: 'convert-pdf-to-image',
    moduleId: 'adobe-pdf-services',
    title: 'Convert PDF to Image',
    description: 'Convert a PDF file to a zip of images. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'image', 'convert', 'extract'],
    usage: 'Use this action to convert PDF pages to images.'
  },
  {
    id: 'convert-pdf-to-ppt',
    moduleId: 'adobe-pdf-services',
    title: 'Convert PDF to PPT',
    description: 'Convert a PDF file to PPT. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'powerpoint', 'convert', 'presentation'],
    usage: 'Use this action to convert PDF files to PowerPoint presentations.'
  },
  {
    id: 'convert-pdf-to-word',
    moduleId: 'adobe-pdf-services',
    title: 'Convert PDF to Word',
    description: 'Convert a PDF file to a Word file. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'word', 'convert', 'docx'],
    usage: 'Use this action to convert PDF files to editable Word documents.'
  },
  {
    id: 'convert-ppt-to-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Convert PPT to PDF',
    description: 'Convert a PPT file to PDF format. Only files with .ppt or .pptx extension are supported.',
    tags: ['adobe', 'pdf', 'powerpoint', 'convert', 'presentation'],
    usage: 'Use this action to convert PowerPoint presentations to PDF.'
  },
  {
    id: 'convert-static-html-to-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Convert Static HTML to PDF',
    description: 'Convert a static HTML file to PDF format. Since HTML/web pages typically contain external assets, the input file must be a zip file containing an index.html at the top level of the archive, as well as any dependencies such as images, css files, and so on. Only files with .zip extension are supported.',
    tags: ['adobe', 'pdf', 'html', 'convert', 'web'],
    usage: 'Use this action to convert static HTML content to PDF.'
  },
  {
    id: 'convert-word-to-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Convert Word to PDF',
    description: 'Convert a Word file to PDF format. Only files with .doc or .docx extension are supported.',
    tags: ['adobe', 'pdf', 'word', 'convert', 'docx'],
    usage: 'Use this action to convert Word documents to PDF.'
  },
  {
    id: 'create-searchable-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Create Searchable PDF using OCR',
    description: 'OCR a PDF file. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'ocr', 'text', 'recognition'],
    usage: 'Use this action to make scanned PDFs searchable using OCR technology.'
  },
  {
    id: 'create-tagged-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Create tagged PDF',
    description: 'Add tags to PDF documents to make them more accessible. All tags from the input file will be removed, except for existing alt-text images, and a new tagged PDF file will be created as output. Accessibility tags, used by assistive technology such as screen readers, are required to make PDF files compliant. However, the output is not guaranteed to comply with accessibility standards such as WCAG and PDF/UA, as you may need to perform further downstream remediation to meet those standards.',
    tags: ['adobe', 'pdf', 'accessibility', 'tagged', 'wcag'],
    usage: 'Use this action to make PDFs more accessible by adding tags.'
  },
  {
    id: 'export-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Export PDF',
    description: 'Convert a PDF file to various formats. The supported output formats are .doc, .docx, .jpeg, .png, .pptx, .rtf and .xlsx.',
    tags: ['adobe', 'pdf', 'export', 'convert', 'format'],
    usage: 'Use this action to export PDFs to various document and image formats.'
  },
  {
    id: 'extract-images-from-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Extract Images From PDF',
    description: 'Extracts Images from a PDF Document. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'images', 'extract'],
    usage: 'Use this action to extract images embedded in a PDF document.'
  },
  {
    id: 'extract-pdf-structure',
    moduleId: 'adobe-pdf-services',
    title: 'Extract PDF Structure, Tables and Images',
    description: 'Extract PDF structure and content elements, incl. Tables and Images, from PDF Document. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'extract', 'structure', 'tables', 'images'],
    usage: 'Use this action to extract structured content from PDFs, including tables and images.'
  },
  {
    id: 'extract-pdf-structure-json-file',
    moduleId: 'adobe-pdf-services',
    title: 'Extract PDF Structure in a JSON File',
    description: 'Extract PDF Structure in a JSON File. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'extract', 'structure', 'json', 'file'],
    usage: 'Use this action to extract PDF structure and save it as a JSON file.'
  },
  {
    id: 'extract-pdf-structure-json-object',
    moduleId: 'adobe-pdf-services',
    title: 'Extract PDF Structure in a JSON Object',
    description: 'Extract PDF Structure in a JSON Object. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'extract', 'structure', 'json', 'object'],
    usage: 'Use this action to extract PDF structure as a JSON object.'
  },
  {
    id: 'extract-tables-from-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Extract Tables from PDF',
    description: 'Extracts Tables in .xlsx format from a PDF Document. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'tables', 'extract', 'excel'],
    usage: 'Use this action to extract tabular data from PDFs to Excel format.'
  },
  {
    id: 'generate-document-from-template',
    moduleId: 'adobe-pdf-services',
    title: 'Generate document from Word template',
    description: 'Replaces merge fields in a DOCX template document with specified JSON data. The keys in data object should be the same as names of merge fields in document. Template documents can be authored using Adobe Document Generation Word Add-in. Find the add-in and Word templates at: https://adobe.com/go/dcdocgen_home. Detailed documentation for the Document Generation API can be found at: https://adobe.com/go/dcdocgen_overview_doc',
    tags: ['adobe', 'pdf', 'template', 'generate', 'document'],
    usage: 'Use this action to generate documents by merging data with Word templates.'
  },
  {
    id: 'get-pdf-properties',
    moduleId: 'adobe-pdf-services',
    title: 'Get PDF Properties',
    description: 'Get Properties of a PDF Document. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'metadata', 'properties'],
    usage: 'Use this action to retrieve metadata and properties of a PDF document.'
  },
  {
    id: 'linearize-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Linearize PDF',
    description: 'Linearize a PDF file. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'optimize', 'web', 'linearize'],
    usage: 'Use this action to optimize PDFs for web viewing by linearizing them.'
  },
  {
    id: 'merge-pdfs',
    moduleId: 'adobe-pdf-services',
    title: 'Merge PDFs',
    description: 'Merge PDF files into a single file. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'merge', 'combine', 'documents'],
    usage: 'Use this action to combine multiple PDFs into a single document.'
  },
  {
    id: 'protect-pdf-copy-edit-print',
    moduleId: 'adobe-pdf-services',
    title: 'Protect PDF from Copying, Editing and Printing',
    description: 'Protect a PDF document from copying, editing & printing. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'protect', 'security', 'restrictions'],
    usage: 'Use this action to apply copy, edit, and print restrictions to a PDF.'
  },
  {
    id: 'protect-pdf-viewing',
    moduleId: 'adobe-pdf-services',
    title: 'Protect PDF from Viewing',
    description: 'Protect a PDF document from viewing. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'protect', 'security', 'password'],
    usage: 'Use this action to password-protect a PDF document.'
  },
  {
    id: 'protect-pdf-access-permissions',
    moduleId: 'adobe-pdf-services',
    title: 'Protect PDF with Access Permissions',
    description: 'Protect a PDF document from Viewing and other Accesses like Editing, Copying and Printing. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'protect', 'security', 'permissions'],
    usage: 'Use this action to apply granular access permissions to a PDF.'
  },
  {
    id: 'remove-protection-from-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Remove Protection from PDF',
    description: 'Remove password and security & permissions from the protected document. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'unprotect', 'security', 'password'],
    usage: 'Use this action to remove security restrictions from a PDF document.'
  },
  {
    id: 'split-pdf',
    moduleId: 'adobe-pdf-services',
    title: 'Split PDF',
    description: 'Split a PDF Document into multiple PDF Documents. Only files with .pdf extension are supported.',
    tags: ['adobe', 'pdf', 'split', 'divide', 'documents'],
    usage: 'Use this action to split a PDF into multiple documents.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
