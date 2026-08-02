import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { runInit } from "../src/commands/init.js";

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "els-init-"));
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("runInit", () => {
  it("creates engineering-loop.json, memory files, and default adapters", async () => {
    const result = await runInit({ dir, name: "my-app" });

    expect(existsSync(join(dir, "engineering-loop.json"))).toBe(true);
    expect(existsSync(join(dir, "docs/memory/PROJECT.md"))).toBe(true);
    expect(existsSync(join(dir, "docs/memory/DECISIONS.md"))).toBe(true);
    expect(existsSync(join(dir, "CLAUDE.md"))).toBe(true);
    expect(existsSync(join(dir, ".cursorrules"))).toBe(true);
    expect(existsSync(join(dir, "CONVENTIONS.md"))).toBe(true);
    expect(existsSync(join(dir, "AGENTS.md"))).toBe(true);
    expect(result.created.length).toBeGreaterThan(0);
    expect(result.skipped).toEqual([]);

    const config = JSON.parse(await readFile(join(dir, "engineering-loop.json"), "utf-8"));
    expect(config.project.name).toBe("my-app");
  });

  it("only generates the requested adapters", async () => {
    await runInit({ dir, name: "my-app", adapters: ["claude"] });
    expect(existsSync(join(dir, "CLAUDE.md"))).toBe(true);
    expect(existsSync(join(dir, ".cursorrules"))).toBe(false);
  });

  it("does not overwrite existing files without --force", async () => {
    await runInit({ dir, name: "my-app" });
    const result = await runInit({ dir, name: "my-app" });
    expect(result.created).toEqual([]);
    expect(result.skipped.length).toBeGreaterThan(0);
  });

  it("overwrites existing files when force is set", async () => {
    await runInit({ dir, name: "my-app" });
    const result = await runInit({ dir, name: "renamed-app", force: true });
    expect(result.created.length).toBeGreaterThan(0);
    const config = JSON.parse(await readFile(join(dir, "engineering-loop.json"), "utf-8"));
    expect(config.project.name).toBe("renamed-app");
  });

  it("defaults the project name to the directory name", async () => {
    await runInit({ dir });
    const config = JSON.parse(await readFile(join(dir, "engineering-loop.json"), "utf-8"));
    expect(config.project.name).toBe(dir.split(/[\\/]/).pop());
  });
});
