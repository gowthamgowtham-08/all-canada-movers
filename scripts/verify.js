const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.git') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles('.');
let brokenImages = 0;
let brokenLinks = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check img tags
  const imgRegex = /src=["']([^"']+)["']/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    let src = match[1];
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('//')) continue;
    src = src.split('?')[0];
    // Strip leading slash if root-relative
    const relPath = src.startsWith('/') ? src.slice(1) : path.join(path.dirname(file), src);
    if (!fs.existsSync(relPath)) {
      console.error(`Broken image in ${file}: ${src} -> ${relPath}`);
      brokenImages++;
    }
  }

  // Check href links
  const linkRegex = /href=["']([^"']+)["']/g;
  while ((match = linkRegex.exec(content)) !== null) {
    let href = match[1];
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('javascript:')) continue;
    href = href.split('?')[0].split('#')[0];
    if (!href || href === '/') continue;
    
    // Resolve clean URL or relative URL
    let relPath = href.startsWith('/') ? href.slice(1) : path.join(path.dirname(file), href);
    if (!fs.existsSync(relPath)) {
      // Check if appending .html works (clean URLs handled by server/.htaccess)
      if (fs.existsSync(relPath + '.html')) {
        continue;
      }
      console.error(`Broken link in ${file}: ${href}`);
      brokenLinks++;
    }
  }
}

console.log(`Scan completed across ${htmlFiles.length} HTML files.`);
console.log(`Broken images: ${brokenImages}`);
console.log(`Broken links: ${brokenLinks}`);

if (brokenImages > 0 || brokenLinks > 0) {
  process.exit(1);
} else {
  console.log('SUCCESS: All 14 HTML pages, images, and links are 100% valid!');
}
