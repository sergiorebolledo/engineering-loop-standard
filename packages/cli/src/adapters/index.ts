import type { AdapterId } from "../types.js";
import { aiderAdapter } from "./aider.js";
import { claudeAdapter } from "./claude.js";
import { codexAdapter } from "./codex.js";
import { cursorAdapter } from "./cursor.js";
import type { Adapter } from "./types.js";
import { windsurfAdapter } from "./windsurf.js";

export const ADAPTERS: Record<AdapterId, Adapter> = {
  claude: claudeAdapter,
  cursor: cursorAdapter,
  aider: aiderAdapter,
  codex: codexAdapter,
  // Gemini currently shares the AGENTS.md convention with Codex.
  gemini: codexAdapter,
  windsurf: windsurfAdapter,
};

export function resolveAdapters(ids: AdapterId[]): Adapter[] {
  const seen = new Set<string>();
  const adapters: Adapter[] = [];
  for (const id of ids) {
    const adapter = ADAPTERS[id];
    if (!adapter) {
      throw new Error(`Unknown adapter id: ${id}`);
    }
    if (seen.has(adapter.outputPath)) continue;
    seen.add(adapter.outputPath);
    adapters.push(adapter);
  }
  return adapters;
}

export type { Adapter } from "./types.js";
