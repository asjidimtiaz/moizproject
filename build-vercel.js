const { execSync } = require('child_process');

console.log("=== Vercel Build Start ===");

// Step 1: Build frontend static assets
console.log("\n[1/2] Building frontend...");
execSync('pnpm --filter @workspace/daycare-website run build', { stdio: 'inherit' });

// Step 2: Bundle the entire API server (including all workspace dependencies)
// into a single self-contained ESM file.
// We run this via the api-server package so esbuild + esbuild-plugin-pino are available.
console.log("\n[2/2] Bundling API server for Vercel serverless function...");
execSync('pnpm --filter @workspace/api-server run build:app', { stdio: 'inherit' });

console.log("\n=== Vercel Build Complete! ===");


