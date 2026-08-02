import type { AdapterId, EngineeringLoopConfig } from "./types.js";

// A relative path here would break the moment `init` writes it into a
// project, since the schema file isn't copied alongside it. Point at the
// tagged spec release instead, which always resolves.
export const SCHEMA_URL =
  "https://raw.githubusercontent.com/sergiorebolledo/engineering-loop-standard/v1.0.0/engineering-loop.schema.json";

export const DEFAULT_MEMORY_FILES = [
  "PROJECT.md",
  "ARCHITECTURE.md",
  "ROADMAP.md",
  "TASKS.md",
  "DECISIONS.md",
  "KNOWLEDGE.md",
];

export const DEFAULT_ADAPTERS: AdapterId[] = ["claude", "cursor", "aider", "codex", "windsurf"];

export function buildDefaultConfig(projectName: string): EngineeringLoopConfig {
  return {
    $schema: SCHEMA_URL,
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
