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

// In-memory store for shortened / customized links (slug -> { slug, targetUrl, clicks, createdAt })
const shortLinksStore = new Map();

function sanitizeSlug(raw) {
  return String(raw || '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-_]/g, '')
    .slice(0, 48);
}

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
            street: String(payload.street || '—'),
            number: String(payload.number || '—'),
            neighborhood: String(payload.neighborhood || '—'),
            cep: String(payload.cep || '—'),
            city: String(payload.city || '—'),
            country: String(payload.country || '—'),
            lat: payload.lat || null,
            lon: payload.lon || null,
            sourceLabel: String(payload.sourceLabel || 'Consentimento no Link'),
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

  // --- API: Create / List / Delete Shortened & Customized Links (/api/shorten) ---
  if (pathname === '/api/shorten' || pathname.startsWith('/api/shorten/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'GET') {
      const list = Array.from(shortLinksStore.values()).reverse();
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, links: list }));
      return;
    }

    if (req.method === 'DELETE') {
      const slugToDelete = sanitizeSlug(pathname.replace('/api/shorten/', ''));
      shortLinksStore.delete(slugToDelete);
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true }));
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
          let targetUrl = String(payload.targetUrl || '').trim();
          if (!targetUrl) {
            res.writeHead(400);
            res.end(JSON.stringify({ ok: false, error: 'Informe uma URL válida.' }));
            return;
          }

          if (!/^https?:\/\//i.test(targetUrl) && !targetUrl.startsWith('/')) {
            targetUrl = 'https://' + targetUrl;
          }

          const customSlug = sanitizeSlug(payload.customSlug);
          const slug =
            customSlug ||
            '002-' + Math.random().toString(36).substring(2, 7).toLowerCase();

          const entry = {
            slug,
            targetUrl,
            clicks: shortLinksStore.has(slug) ? shortLinksStore.get(slug).clicks : 0,
            createdAt: new Date().toLocaleTimeString('pt-BR')
          };
          shortLinksStore.set(slug, entry);

          res.writeHead(200);
          res.end(
            JSON.stringify({
              ok: true,
              entry,
              shortUrl: `${parsedUrl.origin}/s/${slug}`
            })
          );
        } catch {
          res.writeHead(400);
          res.end(JSON.stringify({ ok: false, error: 'Dados inválidos.' }));
        }
      });
      return;
    }
  }

  // --- Short Link Redirect (/s/:slug) ---
  if (pathname.startsWith('/s/')) {
    const slug = sanitizeSlug(pathname.replace('/s/', ''));
    const entry = shortLinksStore.get(slug);
    if (entry && entry.targetUrl) {
      entry.clicks = (entry.clicks || 0) + 1;
      res.writeHead(302, { Location: entry.targetUrl });
      res.end();
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
