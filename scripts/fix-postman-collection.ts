import * as fs from 'fs';
import * as path from 'path';

function fixPostmanCollection() {
  const collectionPath = path.join(process.cwd(), 'postman-collection.json');
  const data = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));

  // Fix URL structure to be compatible with Postman
  function fixUrl(url: any): any {
    if (!url || typeof url !== 'object') return url;

    const newUrl: any = {
      raw: url.raw,
    };

    // Extract path from raw URL or use existing path
    if (url.path && Array.isArray(url.path)) {
      const cleanPath = url.path.filter((p: string) => p && p.length > 0);
      if (cleanPath.length > 0) {
        newUrl.path = cleanPath;
      }
    } else if (url.raw) {
      // Extract path from raw URL
      const match = url.raw.match(/:\/\/[^\/]+(:[0-9]+)?\/(.*?)(\?|$)/);
      if (match) {
        const pathStr = match[2];
        if (pathStr && pathStr.length > 0) {
          newUrl.path = pathStr.split('/').filter((p: string) => p);
        }
      }
    }

    // Preserve query parameters
    if (url.query && Array.isArray(url.query) && url.query.length > 0) {
      newUrl.query = url.query;
    }

    // Remove host, protocol, port as they're not needed with raw URL
    // Postman will parse these from the raw URL automatically

    return newUrl;
  }

  function fixItem(item: any): any {
    if (item.request && item.request.url) {
      item.request.url = fixUrl(item.request.url);
    }
    if (item.item && Array.isArray(item.item)) {
      item.item = item.item.map(fixItem);
    }
    return item;
  }

  data.item = data.item.map(fixItem);

  // Write fixed collection
  fs.writeFileSync(collectionPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Fixed Postman collection URL structure');
}

fixPostmanCollection();









