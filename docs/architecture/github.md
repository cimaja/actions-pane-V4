Title: Add selected repository to an organization secret (Preview)	
Description: Adds a repository to an organization secret when the visibility for repository access is set to selected. The visibility is set when you Create or update an organization secret. You must authenticate using an access token with the admin:org scope to use this endpoint. GitHub Apps must have the secrets organization permission to use this endpoint.

Title: Check if a user is a repository collaborator	
Description: Check if a user is a repository collaborator.

Title: Compare two commits (Preview)	
Description: Both base and head must be branch names in repositoryName. To compare branches across other repositories in the same network as repositoryName, use the format <USERNAME>:branch. The response is equivalent to running the git log base..head command; however, commits are returned in chronological order.

Title: Create a pull request (Preview)	
Description: This operation is to create a pull request in a repository. To open or update a pull request in a public repository, you must have write access to the head or the source branch. For organization-owned repositories, you must be a member of the organization that owns the repository to create a pull request.

Title: Create a reference (Preview)	
Description: Creates a reference for your repository. You are unable to create new references for empty repositories, even if the commit SHA-1 hash used exists. Empty repositories are repositories without branches.

Title: Create a repository dispatch event (Preview)	
Description: This operation is to trigger a webhook event called repository_dispatch when you want activity that happens outside of GitHub to trigger a GitHub Actions workflow or GitHub App webhook. You must configure your GitHub Actions workflow or GitHub App to run when the repository_dispatch event occurs.

Title: Create a repository using a template (Preview)	
Description: Creates a new repository using a repository template. The authenticated user must own or be a member of an organization that owns the repository.

Title: Create an issue	
Description: This operation is used to create a new issue for a specific repository.

Title: Create or update a repository secret (Preview)	
Description: Creates or updates a repository secret with an encrypted value. Encrypt your secret using LibSodium.

Title: Deletes a GitHub Webhook (Preview)	
Description: Deletes a GitHub Webhook

Title: Find issues by state and keyword	
Description: Find issues by state and keyword.

Title: Get a particular issue of a repository	
Description: Get a particular issue of a repository.

Title: Get a pull request (Preview)	
Description: This operation is used to get a pull request for the repository.

Title: Get a reference (Preview)	
Description: Returns a single reference from your Git database. The reference parameter must be formatted as heads/<branch name> for branches and tags/<tag name> for tags. If the reference doesn't match an existing ref, a 404 is returned.

Title: Get a repository by Id (Preview)	
Description: Gets a repository by Id.

Title: Get a repository public key (Preview)	
Description: Get your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets.

Title: Get all issues of a repository	
Description: Get all issues of a repository.

Title: Get all Pull Requests of A Repository	
Description: Get all Pull Requests of A Repository.

Title: Get the authenticated user	
Description: Get the authenticated user.

Title: Get the list of files from a pull request (Preview)	
Description: This operation is used to get the list of files from a pull request for the repository.

Title: List repository collaborators	
Description: List repository collaborators.

Title: Lists all labels for a repository	
Description: Lists all labels for a repository.

Title: Lists all labels for an issue	
Description: Lists all labels for an issue.

Title: Lists all milestones of a repository	
Description: Lists all milestones of a repository.

Title: Lists all public repositories for a user	
Description: Lists all public repositories for a user.

Title: Lists all public repositories for an organization	
Description: Lists all public repositories for an organization.

Title: Lists all repositories for the authenticated user	
Description: Lists all repositories (both public and private) for the authenticated user.

Title: Lists the available assignees for issues in a repository	
Description: Lists the available assignees for issues in a repository.

Title: Merge a pull request (Preview)	
Description: This operation is used to merge a pull request for the repository.

Title: Remove requested reviewers from a pull request (Preview)	
Description: Remove requested reviewers from a pull request from a given set of users and/or teams.

Title: Remove selected repository from an organization secret (Preview)	
Description: Removes a repository from an organization secret when the visibility for repository access is set to selected. The visibility is set when you Create or update an organization secret. You must authenticate using an access token with the admin:org scope to use this endpoint. GitHub Apps must have the secrets organization permission to use this endpoint.

Title: Request reviewers for a pull request (Preview)	
Description: Requests reviews for a pull request from a given set of users and/or teams.

Title: Search Github using Query	
Description: Search Github using Query.

Title: Update a milestone	
Description: Update an existing milestone.

Title: Update a pull request (Preview)	
Description: This operation is used to update a pull request for the repository. To update a pull request in a public repository, you must have write access to the head or the source branch. For organization-owned repositories, you must be a member of the organization that owns the repository to open or update a pull request.

Title: Update an Issue	
Description: Update an existing issue given the issue number.