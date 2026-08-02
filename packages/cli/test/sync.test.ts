import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { runInit } from "../src/commands/init.js";
import { runSync } from "../src/commands/sync.js";

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "els-sync-"));
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("runSync", () => {
  it("throws when there is no engineering-loop.json to sync from", async () => {
    await expect(runSync({ dir })).rejects.toThrow(/engineering-loop init/);
  });

  it("creates adapter files that don't exist yet", async () => {
    // adapters: ["cursor"] so init does NOT create CLAUDE.md itself.
    await runInit({ dir, name: "my-app", adapters: ["cursor"] });
    const result = await runSync({ dir, adapters: ["claude"] });
    expect(result.created).toEqual([join(dir, "CLAUDE.md")]);
    expect(await readFile(join(dir, "CLAUDE.md"), "utf-8")).toContain("Understand before acting");
  });

  it("reports unchanged when nothing about the config changed", async () => {
    await runInit({ dir, name: "my-app", adapters: ["claude"] });
    const result = await runSync({ dir });
    expect(result.unchanged).toEqual([join(dir, "CLAUDE.md")]);
    expect(result.updated).toEqual([]);
  });

  it("updates the managed block and preserves hand-written content outside it", async () => {
    await runInit({ dir, name: "my-app", adapters: ["claude"] });
    const claudePath = join(dir, "CLAUDE.md");
    const original = await readFile(claudePath, "utf-8");
    const withHandNotes = `${original}\n## Project-specific notes\n\nDon't touch this section, ever.\n`;
    await writeFile(claudePath, withHandNotes, "utf-8");

    // Change the config so the rendered managed block actually differs.
    const configPath = join(dir, "engineering-loop.json");
    const config = JSON.parse(await readFile(configPath, "utf-8"));
    config.commands.test = "pytest -q";
    await writeFile(configPath, JSON.stringify(config), "utf-8");

    const result = await runSync({ dir });
    expect(result.updated).toEqual([claudePath]);

    const updated = await readFile(claudePath, "utf-8");
    expect(updated).toContain("pytest -q");
    expect(updated).toContain("Don't touch this section, ever.");
  });

  it("skips a file with no managed block instead of overwriting it", async () => {
    await runInit({ dir, name: "my-app", adapters: ["cursor"] });
    const claudePath = join(dir, "CLAUDE.md");
    await writeFile(claudePath, "# Hand-written, no markers here at all.\n", "utf-8");

    const result = await runSync({ dir, adapters: ["claude"] });
    expect(result.skipped).toHaveLength(1);
    expect(result.skipped[0]?.path).toBe(claudePath);
    expect(await readFile(claudePath, "utf-8")).toBe("# Hand-written, no markers here at all.\n");
  });

  it("defaults to the adapters listed in engineering-loop.json when none are passed", async () => {
    await runInit({ dir, name: "my-app", adapters: ["claude", "cursor"] });
    const result = await runSync({ dir });
    expect(result.unchanged.sort()).toEqual(
      [join(dir, "CLAUDE.md"), join(dir, ".cursorrules")].sort(),
    );
  });

  it("is idempotent - running sync repeatedly does not grow the file", async () => {
    await runInit({ dir, name: "my-app", adapters: ["claude"] });
    const claudePath = join(dir, "CLAUDE.md");
    const afterInit = await readFile(claudePath, "utf-8");

    await runSync({ dir });
    await runSync({ dir });
    const afterTwoSyncs = await readFile(claudePath, "utf-8");

    expect(afterTwoSyncs).toBe(afterInit);
  });
});
