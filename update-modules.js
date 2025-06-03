const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'src/data/mock/modules');
const files = fs.readdirSync(modulesDir).filter(file => file.endsWith('.ts') && file !== 'index.ts');

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(modulesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file already has an author property
  if (!content.includes('author:')) {
    // Find the module declaration and add the author property
    const moduleRegex = /(export const module: ActionGroup = \{[^}]*?)(\s*items:)/s;
    if (moduleRegex.test(content)) {
      content = content.replace(moduleRegex, '$1  author: \'Microsoft\',\n$2');
      fs.writeFileSync(filePath, content);
      updatedCount++;
      console.log(`Updated ${file}`);
    } else {
      console.log(`Could not find module declaration in ${file}`);
    }
  } else {
    console.log(`${file} already has an author property`);
  }
});

console.log(`\nUpdated ${updatedCount} module files to include "author: 'Microsoft'"`);
