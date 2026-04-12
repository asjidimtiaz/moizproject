/**
 * build-app.mjs
 * Bundles artifacts/api-server/src/app.ts into api/app.bundle.js
 * for use as a self-contained Vercel Serverless Function.
 *
 * Run from within artifacts/api-server (via pnpm --filter build:app)
 * so that esbuild is resolved correctly.
 */
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

globalThis.require = createRequire(import.meta.url);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.resolve(artifactDir, "../../api/app.bundle.js");

console.log(`Bundling src/app.ts → ${outFile} ...`);

await build({
  entryPoints: [path.resolve(artifactDir, "src/app.ts")],
  platform: "node",
  bundle: true,
  format: "esm",
  outfile: outFile,
  logLevel: "info",
  // Externalize native binaries only — everything else is inlined into the bundle
  external: [
    "*.node",
    "sharp",
    "better-sqlite3",
    "sqlite3",
    "canvas",
    "bufferutil",
    "utf-8-validate",
    "fsevents",
    "libsql",
    "@libsql/client",
  ],
  // Polyfill __dirname/__filename for ESM output (needed by express / path.join)
  banner: {
    js: `import { createRequire as __cr } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';
globalThis.require = __cr(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);
`,
  },
});

console.log("Bundle complete!");
