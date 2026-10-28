import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.csv': 'text/csv; charset=utf-8', '.png': 'image/png', '.md': 'text/plain; charset=utf-8' };
const server = http.createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
    const parsed = new URL(request.url, 'http://localhost');
    const rel = decodeURIComponent(parsed.pathname);
    const target = path.resolve(root, '.' + (rel.endsWith('/') ? rel + 'index.html' : rel));
    if (!target.startsWith(root + path.sep)) { response.writeHead(403); response.end(); return; }
    const bytes = await fs.readFile(target);
    response.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : bytes);
  } catch { response.writeHead(404, { 'Content-Type': 'text/plain' }); response.end('Not found'); }
});
server.listen(port, '127.0.0.1', () => process.stdout.write(`EEG Pretraining Atlas\nLocal: http://127.0.0.1:${port}/\n`));
server.on('error', error => { process.stderr.write(error.message + '\n'); process.exit(1); });
