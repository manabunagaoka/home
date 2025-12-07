#!/usr/bin/env node
// Auto fallback dev server: tries port 3000 then 3001.
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { existsSync } from 'node:fs';

const PRIMARY = 3000;
const SECONDARY = 3001;

function testPort(port){
  return new Promise(res=>{
    const srv = createServer().once('error', ()=>res(false)).once('listening', ()=>{srv.close(); res(true);}).listen(port,'0.0.0.0');
  });
}

const root = new URL('../', import.meta.url).pathname;

(async () => {
  const args = process.argv.slice(2);
  const wantOpen = args.includes('--open');
  const freePrimary = await testPort(PRIMARY);
  const chosen = freePrimary ? PRIMARY : SECONDARY;
  console.log(`[dev] Starting static server on port ${chosen} (primary free: ${freePrimary})`);
  const child = spawn('npx', ['http-server','apps/player','-p', String(chosen), '-a', '0.0.0.0'], { cwd: root, stdio: 'inherit' });
  child.on('exit', code => console.log(`[dev] http-server exited with code ${code}`));

  if (wantOpen) {
    // Construct URL (Codespaces aware)
    const codeSpace = process.env.CODESPACE_NAME;
    let url;
    if (codeSpace) {
      url = `https://${codeSpace}-${chosen}.app.github.dev/home.html`;
    } else {
      url = `http://localhost:${chosen}/home.html`;
    }
    // Delay a moment for server spin-up
    setTimeout(()=>{
      console.log(`[dev] Opening ${url}`);
      const browser = process.env.BROWSER;
      if (browser) {
        try { spawn(browser, [url], { stdio:'ignore', detached:true }); } catch(e){ /* ignore */ }
      } else {
        // Try xdg-open / open
        const opener = process.platform === 'darwin' ? 'open' : 'xdg-open';
        try { spawn(opener, [url], { stdio:'ignore', detached:true }); } catch(e){ console.log(`[dev] (Could not auto-open browser; please navigate manually) ${url}`); }
      }
      console.log(`
--------------------------------------------------
Home System running.
Kid view: ${url.replace('/home.html','/kid.html')}
Legacy demo (if needed): ${url.replace('/home.html','/index.html?legacy=1')}
--------------------------------------------------
`);
    }, 800);
  } else {
    console.log('Use --open to auto-launch browser.');
  }
})();
