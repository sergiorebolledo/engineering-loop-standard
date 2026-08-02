import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { validateConfig } from "./schema.js";
import type { EngineeringLoopConfig } from "./types.js";

export type LoadConfigResult =
  | { ok: true; config: EngineeringLoopConfig }
  | { ok: false; reason: "missing"; configPath: string }
  | { ok: false; reason: "invalid-json"; configPath: string; detail: string }
  | { ok: false; reason: "invalid-schema"; configPath: string; detail: string };

export async function loadConfig(dir: string): Promise<LoadConfigResult> {
  const configPath = join(dir, "engineering-loop.json");
  if (!existsSync(configPath)) {
    return { ok: false, reason: "missing", configPath };
  }

  let parsed: unknown;
  try {
    const raw = await readFile(configPath, "utf-8");
    parsed = JSON.parse(raw);
  } catch (error) {
    return {
      ok: false,
      reason: "invalid-json",
      configPath,
      detail: error instanceof Error ? error.message : String(error),
    };
  }

  const { valid, errors } = validateConfig(parsed);
  if (!valid) {
    return { ok: false, reason: "invalid-schema", configPath, detail: errors.join("; ") };
  }

  return { ok: true, config: parsed as EngineeringLoopConfig };
}
