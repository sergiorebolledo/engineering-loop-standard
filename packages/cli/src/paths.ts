import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// This file must stay directly under src/ (compiling to dist/paths.js one
// level below the package root) so PACKAGE_ROOT resolves correctly whether
// running compiled (dist/paths.js) or via tsx in dev (src/paths.ts) — both
// sit exactly one directory below the package root.
const thisFileDir = dirname(fileURLToPath(import.meta.url));
export const PACKAGE_ROOT = dirname(thisFileDir);

export const TEMPLATES_DIR = join(PACKAGE_ROOT, "templates", "memory");
export const SCHEMA_PATH = join(PACKAGE_ROOT, "schema", "engineering-loop.schema.json");
