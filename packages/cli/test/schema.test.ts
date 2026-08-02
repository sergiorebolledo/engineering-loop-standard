import { describe, expect, it } from "vitest";
import { buildDefaultConfig } from "../src/defaultConfig.js";
import { validateConfig } from "../src/schema.js";

describe("validateConfig", () => {
  it("accepts a config produced by buildDefaultConfig", () => {
    const { valid, errors } = validateConfig(buildDefaultConfig("sample-app"));
    expect(errors).toEqual([]);
    expect(valid).toBe(true);
  });

  it("rejects a config missing required fields", () => {
    const { valid, errors } = validateConfig({ version: "1.0.0" });
    expect(valid).toBe(false);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("rejects a version string that isn't semver", () => {
    const config = buildDefaultConfig("sample-app");
    config.version = "not-a-version";
    const { valid } = validateConfig(config);
    expect(valid).toBe(false);
  });

  it("rejects unknown top-level properties", () => {
    const config = { ...buildDefaultConfig("sample-app"), unexpected: true };
    const { valid } = validateConfig(config);
    expect(valid).toBe(false);
  });
});
