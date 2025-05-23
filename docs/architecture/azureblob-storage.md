Title: Copy blob (V2)	
Description: This operation copies a blob. If blob is being deleted/renamed on server right after it was copied, connector may return HTTP 404 error by it's design. Please use a delay for 1 minute before deleting or renaming newly created blob. Chunk transfer is not supported in this action. If source and destination are present in same storage account, please use relative path. Otherwise, maximum size of a source for copy blob operation is 50 MB.

Title: Create blob (V2)	
Description: This operation uploads a blob to Azure Blob Storage.

Title: Create block blob (V2)	
Description: This operation uploads a block blob to Azure Blob Storage.

Title: Create SAS URI by path (V2)	
Description: This operation creates a SAS link for a blob using the path.

Title: Delete blob (V2)	
Description: This operation deletes a blob.

Title: Extract archive to folder (V2)	
Description: This operation extracts an archive blob into a folder (example: .zip).

Title: Get available access policies (V2)	
Description: This operation gets available shared access policies for a blob.

Title: Get blob content (V2)	
Description: This operation retrieves blob contents using id.

Title: Get blob content using path (V2)	
Description: This operation retrieves blob contents using path.

Title: Get Blob Metadata (V2)	
Description: This operation retrieves blob metadata using blob id.

Title: Get Blob Metadata using path (V2)	
Description: This operation retrieves blob metadata using path.

Title: Lists blobs (V2)	
Description: This operation lists blobs in a container.

Title: Lists blobs in the root folder (V2)	
Description: This operation lists blobs in the Azure Blob Storage root folder.

Title: Set blob tier by path (V2)	
Description: This operation sets a tier for a block blob on a standard storage account using the path.

Title: Update blob (V2)	
Description: This operation updates a blob in Azure Blob Storage.