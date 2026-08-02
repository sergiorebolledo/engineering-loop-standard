import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { runDoctor } from "../src/commands/doctor.js";
import { runInit } from "../src/commands/init.js";

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "els-doctor-"));
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("runDoctor", () => {
  it("fails when engineering-loop.json is missing", async () => {
    const report = await runDoctor(dir);
    expect(report.ok).toBe(false);
    expect(report.checks[0]?.passed).toBe(false);
  });

  it("passes on a freshly initialized project", async () => {
    await runInit({ dir, name: "my-app" });
    const report = await runDoctor(dir);
    expect(report.ok).toBe(true);
    expect(report.checks.every((c) => c.passed)).toBe(true);
  });

  it("fails when a required memory file is deleted", async () => {
    await runInit({ dir, name: "my-app" });
    await rm(join(dir, "docs/memory/DECISIONS.md"));
    const report = await runDoctor(dir);
    expect(report.ok).toBe(false);
    const failing = report.checks.find((c) => c.name.includes("DECISIONS.md"));
    expect(failing?.passed).toBe(false);
  });

  it("fails when engineering-loop.json is malformed JSON", async () => {
    await writeFile(join(dir, "engineering-loop.json"), "{ not json", "utf-8");
    const report = await runDoctor(dir);
    expect(report.ok).toBe(false);
  });

  it("fails when engineering-loop.json does not conform to the schema", async () => {
    await writeFile(join(dir, "engineering-loop.json"), JSON.stringify({ version: "1.0.0" }), "utf-8");
    const report = await runDoctor(dir);
    expect(report.ok).toBe(false);
  });

  it("rejects a required_files entry that escapes the memory directory", async () => {
    await runInit({ dir, name: "my-app" });
    const configPath = join(dir, "engineering-loop.json");
    const config = JSON.parse(await readFile(configPath, "utf-8"));
    config.memory.required_files = ["../../../../etc/passwd"];
    await writeFile(configPath, JSON.stringify(config), "utf-8");

    const report = await runDoctor(dir);
    expect(report.ok).toBe(false);
    const traversalCheck = report.checks.find((c) => c.name.includes("passwd"));
    expect(traversalCheck?.passed).toBe(false);
    expect(traversalCheck?.detail).toMatch(/resolves outside/);
  });

  it("rejects a memory.directory that escapes the project root", async () => {
    await runInit({ dir, name: "my-app" });
    const configPath = join(dir, "engineering-loop.json");
    const config = JSON.parse(await readFile(configPath, "utf-8"));
    config.memory.directory = "../../outside";
    await writeFile(configPath, JSON.stringify(config), "utf-8");

    const report = await runDoctor(dir);
    expect(report.ok).toBe(false);
    const escapeCheck = report.checks.find((c) => c.name === "memory.directory stays inside the project");
    expect(escapeCheck?.passed).toBe(false);
  });
});
