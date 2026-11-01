// Servidor estático mínimo para ver la web en local: node serve.mjs [puerto]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(import.meta.dirname);
const port = Number(process.argv[2] ?? 5174);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.mp4': 'video/mp4', '.woff2': 'font/woff2' };

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = normalize(join(root, path.endsWith('/') ? `${path}index.html` : path));
  if (!file.startsWith(root)) return res.writeHead(403).end();
  try {
    const body = await readFile(file);
    const type = types[extname(file)] ?? 'application/octet-stream';
    // Rangos de bytes: el navegador los pide para reproducir y saltar en los vídeos.
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '');
    if (range) {
      const start = range[1] ? Number(range[1]) : Math.max(0, body.length - Number(range[2]));
      const end = range[1] && range[2] ? Math.min(Number(range[2]), body.length - 1) : body.length - 1;
      return res.writeHead(206, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${body.length}` }).end(body.subarray(start, end + 1));
    }
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes' }).end(body);
  } catch {
    res.writeHead(404).end('No encontrado');
  }
}).listen(port, '127.0.0.1', () => console.log(`Web en http://localhost:${port}`));
