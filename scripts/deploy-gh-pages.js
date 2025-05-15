const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const username = 'cimaja';
const repoName = 'actions-pane-V4';
const buildFolder = path.resolve(__dirname, '../build');
const tempFolder = path.resolve(__dirname, '../.gh-pages-temp');

// Ensure build folder exists
if (!fs.existsSync(buildFolder)) {
  console.error('Build folder does not exist. Run npm run build first.');
  process.exit(1);
}

// Create temporary folder for deployment
if (fs.existsSync(tempFolder)) {
  execSync(`rm -rf ${tempFolder}`);
}
fs.mkdirSync(tempFolder);

try {
  // Copy build files to temp folder
  execSync(`cp -R ${buildFolder}/* ${tempFolder}`);
  
  // Initialize git in the temp folder
  process.chdir(tempFolder);
  execSync('git init');
  execSync('git config user.name "cimaja"');
  execSync('git config user.email "cimaja@example.com"');
  
  // Add all files and commit
  execSync('git add .');
  execSync('git commit -m "Deploy to GitHub Pages"');
  
  // Push to GitHub Pages
  const remoteUrl = `https://github.com/${username}/${repoName}.git`;
  execSync(`git branch -M gh-pages`);
  execSync(`git remote add origin ${remoteUrl}`);
  
  console.log('Ready to push to GitHub Pages');
  console.log('');
  console.log('To complete the deployment:');
  console.log('1. Navigate to the temp folder: cd ' + tempFolder);
  console.log('2. Run: git push -f origin gh-pages');
  console.log('');
  console.log('If you encounter authentication issues, you may need to:');
  console.log('- Use a GitHub Personal Access Token');
  console.log('- Configure your git credentials');
  
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}
