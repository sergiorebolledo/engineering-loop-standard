import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { isAbsolute, join, relative, resolve } from "node:path";
import { validateConfig } from "../schema.js";
import type { EngineeringLoopConfig } from "../types.js";

// engineering-loop.json is often a file the current user didn't author
// themselves (e.g. `doctor` run against a cloned project). memory.directory
// and memory.required_files come straight from it, so a crafted "../../"
// entry must not let a filesystem existence check escape the project dir.
function isInside(parentDir: string, candidate: string): boolean {
  const rel = relative(resolve(parentDir), resolve(candidate));
  return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
}

export interface DoctorCheck {
  name: string;
  passed: boolean;
  detail?: string;
}

export interface DoctorReport {
  ok: boolean;
  checks: DoctorCheck[];
}

export async function runDoctor(dir: string): Promise<DoctorReport> {
  const checks: DoctorCheck[] = [];
  const configPath = join(dir, "engineering-loop.json");

  if (!existsSync(configPath)) {
    checks.push({
      name: "engineering-loop.json exists",
      passed: false,
      detail: `not found at ${configPath}`,
    });
    return { ok: false, checks };
  }
  checks.push({ name: "engineering-loop.json exists", passed: true });

  let raw: string;
  let parsed: unknown;
  try {
    raw = await readFile(configPath, "utf-8");
    parsed = JSON.parse(raw);
    checks.push({ name: "engineering-loop.json is valid JSON", passed: true });
  } catch (error) {
    checks.push({
      name: "engineering-loop.json is valid JSON",
      passed: false,
      detail: error instanceof Error ? error.message : String(error),
    });
    return { ok: false, checks };
  }

  const { valid, errors } = validateConfig(parsed);
  checks.push({
    name: "engineering-loop.json conforms to schema",
    passed: valid,
    detail: valid ? undefined : errors.join("; "),
  });

  if (valid) {
    const config = parsed as EngineeringLoopConfig;
    const memoryDir = join(dir, config.memory.directory);

    if (!isInside(dir, memoryDir)) {
      checks.push({
        name: "memory.directory stays inside the project",
        passed: false,
        detail: `"${config.memory.directory}" resolves outside ${dir}`,
      });
      return { ok: false, checks };
    }

    for (const file of config.memory.required_files) {
      const filePath = join(memoryDir, file);
      const label = `memory file present: ${config.memory.directory}/${file}`;
      if (!isInside(memoryDir, filePath)) {
        checks.push({
          name: label,
          passed: false,
          detail: `"${file}" resolves outside ${memoryDir}`,
        });
        continue;
      }
      const exists = existsSync(filePath);
      checks.push({
        name: label,
        passed: exists,
        detail: exists ? undefined : `missing at ${filePath}`,
      });
    }
  }

  return { ok: checks.every((c) => c.passed), checks };
}
