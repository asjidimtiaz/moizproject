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

console.log("Done building static assets for Vercel!");
