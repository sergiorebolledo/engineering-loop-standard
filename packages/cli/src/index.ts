#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Command } from "commander";
import { runDoctor } from "./commands/doctor.js";
import { runInit } from "./commands/init.js";
import { PACKAGE_ROOT } from "./paths.js";
import type { AdapterId } from "./types.js";

const pkg = JSON.parse(readFileSync(join(PACKAGE_ROOT, "package.json"), "utf-8")) as {
  version: string;
};

const VALID_ADAPTER_IDS: AdapterId[] = ["claude", "cursor", "aider", "codex", "gemini"];

function parseAdapters(value: string): AdapterId[] {
  const ids = value.split(",").map((s) => s.trim()) as AdapterId[];
  for (const id of ids) {
    if (!VALID_ADAPTER_IDS.includes(id)) {
      throw new Error(
        `Unknown adapter "${id}". Valid adapters: ${VALID_ADAPTER_IDS.join(", ")}`,
      );
    }
  }
  return ids;
}

const program = new Command();

program
  .name("engineering-loop")
  .description("Scaffold and validate the Engineering Loop Standard in a project")
  .version(pkg.version);

program
  .command("init")
  .description(
    "Create engineering-loop.json, docs/memory/, and generate agent adapters",
  )
  .option("-d, --dir <path>", "target directory", process.cwd())
  .option("-n, --name <name>", "project name (defaults to the directory name)")
  .option(
    "-a, --adapters <list>",
    "comma-separated adapters to generate (claude,cursor,aider,codex,gemini)",
  )
  .option("-f, --force", "overwrite existing files", false)
  .action(async (opts: { dir: string; name?: string; adapters?: string; force: boolean }) => {
    try {
      const adapters = opts.adapters ? parseAdapters(opts.adapters) : undefined;
      const result = await runInit({
        dir: opts.dir,
        name: opts.name,
        adapters,
        force: opts.force,
      });
      for (const file of result.created) {
        console.log(`✔ Created ${file}`);
      }
      for (const file of result.skipped) {
        console.log(`– Skipped ${file} (already exists, use --force to overwrite)`);
      }
      console.log("\nEngineering Loop ready.");
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    }
  });

program
  .command("doctor")
  .description("Validate that a project conforms to the Engineering Loop Standard")
  .option("-d, --dir <path>", "project directory", process.cwd())
  .action(async (opts: { dir: string }) => {
    const report = await runDoctor(opts.dir);
    for (const check of report.checks) {
      const icon = check.passed ? "✔" : "✗";
      const detail = check.detail ? ` (${check.detail})` : "";
      console.log(`${icon} ${check.name}${detail}`);
    }
    if (!report.ok) {
      process.exitCode = 1;
    }
  });

program.parseAsync(process.argv);
