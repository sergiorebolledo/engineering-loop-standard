import type { AdapterId, EngineeringLoopConfig } from "./types.js";

export const DEFAULT_MEMORY_FILES = [
  "PROJECT.md",
  "ARCHITECTURE.md",
  "ROADMAP.md",
  "TASKS.md",
  "DECISIONS.md",
  "KNOWLEDGE.md",
];

export const DEFAULT_ADAPTERS: AdapterId[] = ["claude", "cursor", "aider", "codex"];

export function buildDefaultConfig(projectName: string): EngineeringLoopConfig {
  return {
    $schema: "./engineering-loop.schema.json",
    version: "1.0.0",
    project: {
      name: projectName,
    },
    memory: {
      directory: "docs/memory",
      required_files: [...DEFAULT_MEMORY_FILES],
    },
    pipeline: {
      pre_code: ["research", "plan"],
      post_code: ["lint", "test", "refactor", "update_docs"],
    },
    commands: {
      test: "npm test",
      lint: "npm run lint",
      build: "npm run build",
    },
    language_policy: {
      code: "en",
      comments: "en",
      docs: "en",
      commits: "en",
    },
    agents: {
      allow_auto_fix: true,
      max_repair_iterations: 3,
    },
    adapters: [...DEFAULT_ADAPTERS],
  };
}
