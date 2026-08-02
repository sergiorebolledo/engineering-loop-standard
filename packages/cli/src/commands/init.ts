import { existsSync } from "node:fs";
import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { resolveAdapters } from "../adapters/index.js";
import { buildDefaultConfig } from "../defaultConfig.js";
import { TEMPLATES_DIR } from "../paths.js";
import type { AdapterId, EngineeringLoopConfig } from "../types.js";

export interface InitOptions {
  dir: string;
  name?: string;
  adapters?: AdapterId[];
  force?: boolean;
}

export interface InitResult {
  created: string[];
  skipped: string[];
}

async function writeIfAllowed(
  path: string,
  contents: string,
  force: boolean,
  result: InitResult,
): Promise<void> {
  if (!force && existsSync(path)) {
    result.skipped.push(path);
    return;
  }
  await writeFile(path, contents, "utf-8");
  result.created.push(path);
}

export async function runInit(options: InitOptions): Promise<InitResult> {
  const targetDir = options.dir;
  const projectName = options.name ?? basename(targetDir);
  const result: InitResult = { created: [], skipped: [] };

  await mkdir(targetDir, { recursive: true });

  const config: EngineeringLoopConfig = buildDefaultConfig(projectName);
  if (options.adapters && options.adapters.length > 0) {
    config.adapters = options.adapters;
  }

  const configPath = join(targetDir, "engineering-loop.json");
  await writeIfAllowed(
    configPath,
    `${JSON.stringify(config, null, 2)}\n`,
    Boolean(options.force),
    result,
  );

  const memoryDir = join(targetDir, config.memory.directory);
  await mkdir(memoryDir, { recursive: true });
  const templateFiles = await readdir(TEMPLATES_DIR);
  for (const file of templateFiles) {
    const destination = join(memoryDir, file);
    if (!options.force && existsSync(destination)) {
      result.skipped.push(destination);
      continue;
    }
    await copyFile(join(TEMPLATES_DIR, file), destination);
    result.created.push(destination);
  }

  const adapterIds = config.adapters ?? [];
  const adapters = resolveAdapters(adapterIds);
  for (const adapter of adapters) {
    const outputPath = join(targetDir, adapter.outputPath);
    await writeIfAllowed(outputPath, `${adapter.render(config)}\n`, Boolean(options.force), result);
  }

  return result;
}
