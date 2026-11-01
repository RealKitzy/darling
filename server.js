const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// In-memory store for shared location links (by signal code)
const signalStore = new Map();

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // --- API: Receive or Poll Shared Link Location (/api/sinal/:code) ---
  if (pathname.startsWith('/api/sinal/')) {
    const code = pathname.replace('/api/sinal/', '').trim();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');

    if (!code) {
      res.writeHead(400);
      res.end(JSON.stringify({ ok: false, error: 'Missing code' }));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
        if (body.length > 1e5) req.socket.destroy();
      });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          signalStore.set(code, {
            writtenAddress: String(payload.writtenAddress || ''),
            lat: payload.lat || null,
            lon: payload.lon || null,
            sourceLabel: String(payload.sourceLabel || 'Link'),
            clickedAt: new Date().toISOString()
          });
          res.writeHead(200);
          res.end(JSON.stringify({ ok: true }));
        } catch {
          res.writeHead(400);
          res.end(JSON.stringify({ ok: false }));
        }
      });
      return;
    }

    if (req.method === 'GET') {
      const found = signalStore.get(code) || null;
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, data: found }));
      return;
    }
  }

  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 - Arquivo não encontrado');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Zero Two Portal rodando na porta ${PORT}`);
});
