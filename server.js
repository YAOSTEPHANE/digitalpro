const { spawn } = require('child_process');
const path = require('path');

// Pour Next.js sur Hostinger/cPanel
// Ce fichier sera créé automatiquement, mais vous pouvez le modifier

const npm = spawn('npm', ['start'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

npm.on('close', (code) => {
  console.log(`Process exited with code ${code}`);
});

