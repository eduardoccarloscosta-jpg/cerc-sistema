const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3333;
const DIR = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  let filePath = path.join(DIR, pathname === '/' ? 'cerc_sistema_v33.html' : pathname);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'text/plain',
      'Cache-Control': 'no-store'
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`CERC rodando em http://localhost:${PORT}`);
});
