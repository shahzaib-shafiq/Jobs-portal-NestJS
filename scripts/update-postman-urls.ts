import * as fs from 'fs';
import * as path from 'path';

function updatePostmanUrls() {
  const collectionPath = path.join(process.cwd(), 'postman-collection.json');
  let content = fs.readFileSync(collectionPath, 'utf-8');
  
  // Replace all {{baseUrl}}:{{port}} with http://localhost:3000
  content = content.replace(/\{\{baseUrl\}\}:\{\{port\}\}/g, 'http://localhost:3000');
  
  // Also replace any standalone {{baseUrl}} or {{port}} references
  content = content.replace(/\{\{baseUrl\}\}/g, 'http://localhost');
  content = content.replace(/\{\{port\}\}/g, '3000');
  
  // Remove baseUrl and port from variables
  const data = JSON.parse(content);
  if (data.variable) {
    data.variable = data.variable.filter((v: any) => 
      v.key !== 'baseUrl' && v.key !== 'port'
    );
  }
  
  fs.writeFileSync(collectionPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Updated Postman collection URLs to use http://localhost:3000');
  console.log('✅ Removed baseUrl and port variables');
}

updatePostmanUrls();








