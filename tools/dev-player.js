#!/usr/bin/env node
// Auto fallback dev server: tries port 3000 then 3001.
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';

const PRIMARY = 3000;
const SECONDARY = 3001;

function testPort(port){
  return new Promise(res=>{
    const srv = createServer().once('error', ()=>res(false)).once('listening', ()=>{srv.close(); res(true);}).listen(port,'0.0.0.0');
  });
}

const root = new URL('../', import.meta.url).pathname;

(async () => {
  const freePrimary = await testPort(PRIMARY);
  const chosen = freePrimary ? PRIMARY : SECONDARY;
  console.log(`[dev-player] Starting http-server on port ${chosen} (primary free: ${freePrimary})`);
  const child = spawn('npx', ['http-server','apps/player','-p', String(chosen), '-a', '0.0.0.0'], { cwd: root, stdio: 'inherit' });
  child.on('exit', code => console.log(`[dev-player] http-server exited with code ${code}`));
})();
