const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3005;
const PUBLIC_DIR = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Parse URL and remove query strings/hashes
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let reqPath = decodeURIComponent(parsedUrl.pathname);

  // 1. CANONICAL 301 REDIRECTS FOR CLEAN URLS (Removes file names & .html from address bar)
  // Redirect /index.html or /index to /
  if (reqPath === '/index.html' || reqPath === '/index') {
    res.writeHead(301, { 'Location': '/' + (parsedUrl.search || '') });
    res.end();
    return;
  }

  // Redirect /services/index.html to /services
  if (reqPath.endsWith('/index.html')) {
    const cleanDir = reqPath.slice(0, -11) || '/';
    res.writeHead(301, { 'Location': cleanDir + (parsedUrl.search || '') });
    res.end();
    return;
  }

  // Redirect any request ending in .html to extensionless clean route (e.g. /about.html -> /about)
  if (reqPath.endsWith('.html')) {
    const cleanRoute = reqPath.slice(0, -5);
    res.writeHead(301, { 'Location': cleanRoute + (parsedUrl.search || '') });
    res.end();
    return;
  }

  // 2. NORMALIZE PATH AND PREVENT DIRECTORY TRAVERSAL
  let safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  // Direct crawler fallback for favicons requested from root
  if (reqPath === '/favicon.ico') {
    filePath = path.join(PUBLIC_DIR, 'favicon.ico');
  } else if (reqPath === '/apple-touch-icon.png') {
    filePath = path.join(PUBLIC_DIR, 'apple-touch-icon.png');
  } else if (reqPath === '/site.webmanifest') {
    filePath = path.join(PUBLIC_DIR, 'assets', 'favicons', 'site.webmanifest');
  }

  // 3. TRANSPARENT EXTENSIONLESS FILE RESOLUTION
  // If path is a directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    // If no file extension, look for matching .html file
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
  }

  // 4. SERVE FILE OR 404
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html><html><head><title>404 Not Found</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>404 - Page Not Found</h1><p>The requested page could not be found.</p><a href="/" style="color:#ED1C24;font-weight:bold;">Return to Home</a></body></html>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/ (Clean URLs enabled)`);
});
