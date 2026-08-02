import { existsSync } from "node:fs";
import { isAbsolute, join, relative, resolve } from "node:path";
import { loadConfig } from "../loadConfig.js";

export interface DoctorCheck {
  name: string;
  passed: boolean;
  detail?: string;
}

export interface DoctorReport {
  ok: boolean;
  checks: DoctorCheck[];
}

// engineering-loop.json is often a file the current user didn't author
// themselves (e.g. `doctor` run against a cloned project). memory.directory
// and memory.required_files come straight from it, so a crafted "../../"
// entry must not let a filesystem existence check escape the project dir.
function isInside(parentDir: string, candidate: string): boolean {
  const rel = relative(resolve(parentDir), resolve(candidate));
  return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
}

export async function runDoctor(dir: string): Promise<DoctorReport> {
  const checks: DoctorCheck[] = [];
  const loaded = await loadConfig(dir);

  if (!loaded.ok && loaded.reason === "missing") {
    checks.push({
      name: "engineering-loop.json exists",
      passed: false,
      detail: `not found at ${loaded.configPath}`,
    });
    return { ok: false, checks };
  }
  checks.push({ name: "engineering-loop.json exists", passed: true });

  if (!loaded.ok && loaded.reason === "invalid-json") {
    checks.push({
      name: "engineering-loop.json is valid JSON",
      passed: false,
      detail: loaded.detail,
    });
    return { ok: false, checks };
  }
  checks.push({ name: "engineering-loop.json is valid JSON", passed: true });

  if (!loaded.ok) {
    checks.push({
      name: "engineering-loop.json conforms to schema",
      passed: false,
      detail: loaded.detail,
    });
    return { ok: false, checks };
  }
  checks.push({ name: "engineering-loop.json conforms to schema", passed: true });

  const config = loaded.config;
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

  return { ok: checks.every((c) => c.passed), checks };
}
