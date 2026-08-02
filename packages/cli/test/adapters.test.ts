import { describe, expect, it } from "vitest";
import { ADAPTERS, resolveAdapters } from "../src/adapters/index.js";
import { MANAGED_END, MANAGED_START } from "../src/adapters/shared.js";
import { buildDefaultConfig } from "../src/defaultConfig.js";

describe("adapters", () => {
  const config = buildDefaultConfig("sample-app");

  it("renders all six manifesto principles for every adapter", () => {
    for (const adapter of Object.values(ADAPTERS)) {
      const output = adapter.render(config);
      expect(output).toContain("Understand before acting");
      expect(output).toContain("Leave the codebase better than you found it");
    }
  });

  it("renders the declared commands", () => {
    const output = ADAPTERS.claude.render(config);
    expect(output).toContain("npm test");
    expect(output).toContain("npm run lint");
  });

  it("renders the language policy", () => {
    const output = ADAPTERS.cursor.render(config);
    expect(output).toContain("code=en");
  });

  it("writes to the expected output path per adapter", () => {
    expect(ADAPTERS.claude.outputPath).toBe("CLAUDE.md");
    expect(ADAPTERS.cursor.outputPath).toBe(".cursorrules");
    expect(ADAPTERS.aider.outputPath).toBe("CONVENTIONS.md");
    expect(ADAPTERS.codex.outputPath).toBe("AGENTS.md");
    expect(ADAPTERS.windsurf.outputPath).toBe(".windsurfrules");
  });

  it("gemini shares the codex AGENTS.md convention", () => {
    expect(ADAPTERS.gemini.outputPath).toBe("AGENTS.md");
  });

  it("wraps every adapter's output in exactly one managed block", () => {
    for (const adapter of Object.values(ADAPTERS)) {
      const output = adapter.render(config);
      expect(output.indexOf(MANAGED_START)).toBe(output.lastIndexOf(MANAGED_START));
      expect(output.indexOf(MANAGED_END)).toBe(output.lastIndexOf(MANAGED_END));
      expect(output.indexOf(MANAGED_START)).toBeLessThan(output.indexOf(MANAGED_END));
    }
  });

  it("resolveAdapters deduplicates by output path", () => {
    const adapters = resolveAdapters(["codex", "gemini"]);
    expect(adapters).toHaveLength(1);
  });

  it("resolveAdapters throws on an unknown id", () => {
    // @ts-expect-error intentionally invalid id for the runtime check
    expect(() => resolveAdapters(["not-a-tool"])).toThrow(/Unknown adapter/);
  });
});
