#!/usr/bin/env node
// Copies the repo's canonical engineering-loop.schema.json into this
// package's own schema/ directory so the published npm package is
// self-contained and never depends on a path outside packages/cli.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = join(packageRoot, "..", "..");

const source = join(repoRoot, "engineering-loop.schema.json");
const destinationDir = join(packageRoot, "schema");
const destination = join(destinationDir, "engineering-loop.schema.json");

if (!existsSync(source)) {
  if (existsSync(destination)) {
    console.warn(
      `sync-schema: source schema not found at ${source}, keeping existing ${destination}`,
    );
    process.exit(0);
  }
  console.error(`sync-schema: source schema not found at ${source}`);
  process.exit(1);
}

mkdirSync(destinationDir, { recursive: true });
copyFileSync(source, destination);
console.log(`sync-schema: copied ${source} -> ${destination}`);
