Title: Add attachment	
Description: Adds a new attachment to the specified list item.

Title: Approve hub site join request	
Description: Approve hub site join request. This will return an approval token that can be used to complete the join request using the join hub site action.

Title: Cancel hub site join request	
Description: Cancel hub join request. If applicable, you should specify the same Approval Correlation Id as used in the "Set hub site join status to pending" action.

Title: Check in file	
Description: Check in a checked out file in a document library, which makes the version of the document available to others.

Title: Check out file	
Description: Check out a file in a document library to prevent others from editing the document, and your changes from being visible until the documented is checked in.

Title: Copy file	
Description: Copies a file. Works in a similar way to the "Copy to" command in SharePoint libraries. Returns information about the new file after copy.

Title: Copy file (deprecated)	
Description: Copies a file to a SharePoint site.

Title: Copy folder	
Description: Copies a folder. Works in a similar way to the "Copy to" command in SharePoint libraries. Returns information about the new folder after copy.

Title: Create file	
Description: Uploads a file to a SharePoint site. Make sure to pick an existing library.

Title: Create item	
Description: Creates a new item in a SharePoint list.

Title: Create new document set	
Description: Creates a new document set list item.

Title: Create new folder	
Description: Creates a new folder or folder path.

Title: Create sharing link for a file or folder	
Description: Create sharing link for a file or folder.

Title: Delete attachment	
Description: Deletes the specified attachment.

Title: Delete file	
Description: Deletes the file specified by the file identifier.

Title: Delete item	
Description: Deletes an item from a SharePoint list.

Title: Discard check out	
Description: If you check out a file and don’t make changes to it, or you make changes that you don’t want to keep, you can simply discard the checkout, rather than saving the file. If your organization tracks versions, a new version is created each time you check a file back into the library. By discarding the checkout, you can avoid making new versions when you haven’t made any changes to the file.

Title: Extract folder	
Description: Extracts an archive file into a SharePoint folder (example: .zip).

Title: Generate document using Microsoft Syntex (preview)	
Description: Use this action to create documents based on modern templates from Microsoft Syntex. This preview requires a Syntex license. Pricing is subject to change. For more info see: https://docs.microsoft.com/en-us/microsoft-365/contentunderstanding/content-assembly.

Title: Get all lists and libraries	
Description: Get all lists and libraries.

Title: Get attachment content	
Description: Returns file contents using the file identifier. The contents can be copied somewhere else, or be used as an attachment.

Title: Get attachments	
Description: Returns the list of attachments for the specified list item. You can add a "Get attachment content" step and use the "File identifier" property returned by this action to get to the contents of the file.

Title: Get changes for an item or a file (properties only)	
Description: Returns information about columns that have changed within a given time window. Note: The list must have Versioning turned on.

Title: Get file content	
Description: Gets file contents using the file identifier. The contents can be copied somewhere else, or be used as an attachment.

Title: Get file content using path	
Description: Gets file contents using the file path.

Title: Get file metadata	
Description: Gets information about the file such as size, etag, created date, etc. Uses a file identifier to pick the file. Use "Get file properties" action to get to the values stored in the columns in the library.

Title: Get file metadata using path	
Description: Gets information about the file such as size, etag, created date, etc. Uses a file path to pick the file. Use "Get file properties" action to get to the values stored in the columns in the library.

Title: Get file properties	
Description: Gets the properties saved in the columns in the library for the item specified by the item id. You can add a "Get file content" step and use the "File identifier" property returned by this action to get to the contents of the file. When using this with the On-Premises Data Gateway, the name of the library to connect to may need to be entered manually.

Title: Get files (properties only)	
Description: Gets the properties saved in the columns in the library for all folders and files stored in the library. You can also filter down to the items that match a condition. An "Apply to each" section is usually used to work with the output from this action. When using this with the On-Premises Data Gateway, the name of the library to connect to may need to be entered manually.

Title: Get folder metadata	
Description: Gets information about the folder. Uses a file identifier to pick the folder.

Title: Get folder metadata using path	
Description: Gets information about the folder. Uses a folder path to pick the folder.

Title: Get item	
Description: Gets a single item by its id from a SharePoint list.

Title: Get items	
Description: Gets items from a SharePoint list.

Title: Get list views	
Description: Gets views from a SharePoint list.

Title: Get lists	
Description: Gets SharePoint lists from a site.

Title: Grant access to an item or a folder	
Description: Grant access to an item or a folder in SharePoint to specific people.

Title: Join hub site	
Description: Join the requested site to the hub site. An Approval Token is required to complete the join successfully if that hub requires approval. If applicable, you should specify the same Approval Correlation Id as used in the "Set hub site join status to pending" action.

Title: List folder	
Description: Returns files contained in a SharePoint folder.

Title: List root folder	
Description: Returns files in the root SharePoint folder.

Title: Move file	
Description: Moves a file. Works in a similar way to the "Move to" command in SharePoint libraries. Returns information about the new file after move.

Title: Move folder	
Description: Moves a folder. Works in a similar way to the "Move to" command in SharePoint libraries. Returns information about the new folder after move.

Title: Resolve person	
Description: Returns a single matching user value so it can be assigned to a column of type person. If there are no matches, or multiple matches, this action will error out.

Title: Send an HTTP request to SharePoint	
Description: Construct a SharePoint REST API to invoke. Note – This action may execute any SharePoint REST API you have access to. Please proceed with caution.

Title: Set content approval status	
Description: Sets the content approval status for an item in a list or library that has content approval turned on. You must provide an ETag for pages and files. You can get the ETag using the Get File Metadata action. This action is only available for SharePoint Online and SharePoint 2019.

Title: Set hub site join status to pending	
Description: Set the requested site's hub join request status to pending. The Approval Correlation Id is an optional parameter that helps SharePoint identify a particular hub join request. The requesting site can only have one pending request at a given time.

Title: Stop sharing an item or a file	
Description: Delete all links giving access to an item or a file and remove all people with direct access except for owners.

Title: Update file	
Description: Updates the contents of the file specified by the file identifier.

Title: Update file properties	
Description: Updates the properties stored in columns in a library for the item specified by the item id. Use "Update file" action to update file contents. When using this with the On-Premises Data Gateway, the name of the library to connect to may need to be entered manually.

Title: Update file properties using AI Builder model results	
Description: Updates the values stored in library columns for a file analyzed by the model specified by the ModelId.

Title: Update item	
Description: Updates an item in a SharePoint list.