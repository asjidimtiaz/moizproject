const { execSync } = require('child_process');

console.log("=== Vercel Build Start ===");

// Step 1: Build frontend static assets
console.log("\n[1/2] Building frontend...");
execSync('pnpm --filter @workspace/daycare-website run build', { stdio: 'inherit' });

// Step 2: Bundle the entire API server (including all workspace dependencies)
// into a single self-contained ESM file using esbuild.
// This avoids Vercel's runtime trying to load TypeScript files from node_modules symlinks.
console.log("\n[2/2] Bundling API server for Vercel serverless function...");
execSync(
  [
    'pnpm exec esbuild',
    'artifacts/api-server/src/app.ts',
    '--bundle',
    '--format=esm',
    '--platform=node',
    '--target=node20',
    '--outfile=api/app.bundle.js',
    '--external:*.node',
    '--external:bufferutil',
    '--external:utf-8-validate',
    '--external:fsevents',
    '--external:pino',
    '--external:pino-http',
    '--log-level=info',
  ].join(' '),
  { stdio: 'inherit' }
);

console.log("\n=== Vercel Build Complete! ===");

