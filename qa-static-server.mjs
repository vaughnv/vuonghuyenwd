import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const ROOT = new URL('./out/', import.meta.url).pathname;
const PORT = 3000;
const TYPES = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.mp3':'audio/mpeg', '.otf':'font/otf', '.ttf':'font/ttf', '.woff2':'font/woff2', '.txt':'text/plain', '.ico':'image/x-icon' };
http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent((req.url||'/').split('?')[0]);
    if (p === '/') p = '/index.html';
    let file = join(ROOT, normalize(p).replace(/^(\.\.[/\\])+/, ''));
    let data;
    try { data = await readFile(file); }
    catch { if (!extname(file)) { file = join(ROOT, 'index.html'); data = await readFile(file); } else throw new Error('nf'); }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  } catch { res.writeHead(404); res.end('404'); }
}).listen(PORT, '127.0.0.1', () => console.log(`serving out/ on http://127.0.0.1:${PORT}`));
