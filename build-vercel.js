const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("Running workspace build...");
try {
  execSync('npm run build --workspace=@workspace/daycare-website', { stdio: 'inherit' });
} catch (error) {
  console.log("Fallback to pnpm...");
  execSync('pnpm --filter @workspace/daycare-website run build', { stdio: 'inherit' });
}

const src = path.join(__dirname, 'artifacts', 'daycare-website', 'dist');
const dest = path.join(__dirname, 'public');

if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
}

console.log(`Moving ${src} to ${dest}...`);
fs.renameSync(src, dest);
console.log("Done building and moving static assets for Vercel!");
