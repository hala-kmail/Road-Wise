import { spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.join(fileURLToPath(new URL('.', import.meta.url)), '..');
const opts = { stdio: 'inherit', shell: true, cwd: root, env: process.env };

const vite = spawn('npm', ['run', 'dev'], opts);
const api = spawn('npm', ['run', 'api'], opts);

function shutdown() {
  try {
    vite.kill();
  } catch {
    /* ignore */
  }
  try {
    api.kill();
  } catch {
    /* ignore */
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
