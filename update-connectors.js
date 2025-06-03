const fs = require('fs');
const path = require('path');

const connectorsDir = path.join(__dirname, 'src/data/mock/connectors');
const files = fs.readdirSync(connectorsDir).filter(file => file.endsWith('.ts'));

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(connectorsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file already has an author property
  if (!content.includes('author:')) {
    // Find the connector declaration and add the author property
    const connectorRegex = /(export const connector: LibraryItemType = \{[^}]*?)(\s*isInstalled:)/s;
    if (connectorRegex.test(content)) {
      content = content.replace(connectorRegex, '$1  author: \'Third party\',\n$2');
      fs.writeFileSync(filePath, content);
      updatedCount++;
      console.log(`Updated ${file}`);
    } else {
      console.log(`Could not find connector declaration in ${file}`);
    }
  } else {
    console.log(`${file} already has an author property`);
  }
});

console.log(`\nUpdated ${updatedCount} connector files to include "author: 'Third party'"`);
