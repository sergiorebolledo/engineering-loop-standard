# Writing an adapter

An adapter turns `engineering-loop.json` + [MANIFESTO.md](https://github.com/sergiorebolledo/engineering-loop-standard/blob/main/MANIFESTO.md)
into one AI coding tool's native configuration format. The CLI
(`packages/cli`) ships five adapters out of the box; this document describes
the interface so a sixth can be added without touching core logic.

## Interface

Every adapter lives at `packages/cli/src/adapters/<name>.ts` and exports a
single object matching this shape:

```typescript
export interface Adapter {
  /** Stable identifier, matches the `adapters` enum in the schema. */
  id: "claude" | "cursor" | "aider" | "codex" | "gemini" | "windsurf";

  /** Human-readable name shown in CLI output. */
  label: string;

  /** Path, relative to the project root, the adapter file is written to. */
  outputPath: string;

  /**
   * Render the adapter file's contents from the loaded config.
   * Must be pure: same config in, same string out. Wrap the return value
   * with `wrapManaged()` from `./shared.js` (see "Managed blocks" below).
   */
  render(config: EngineeringLoopConfig): string;
}
```

Register the new adapter in `packages/cli/src/adapters/index.ts`'s
`ADAPTERS` map. `engineering-loop init --adapters <id>`,
`engineering-loop sync`, and `engineering-loop doctor` pick it up
automatically once registered.

## Managed blocks (required for `sync` to work)

`render()` must wrap its output with `wrapManaged()` from
`packages/cli/src/adapters/shared.ts`, which surrounds the content with
`<!-- engineering-loop:managed:start -->` / `...:end` markers. This is what
lets `engineering-loop sync` re-render just the generated portion of a file
after `engineering-loop.json` changes, while preserving anything a human
appended outside the markers verbatim. An adapter that returns unwrapped
content still works with `init`, but `sync` will never find a managed block
to replace in files it creates — always use `wrapManaged()`.

## What every adapter output must contain

Regardless of the target tool's native format, a generated adapter file
MUST include:

1. The six manifesto principles (verbatim or lightly reworded to fit the
   tool's tone) with a link back to `MANIFESTO.md`.
2. The `language_policy` from the config, stated explicitly.
3. A reference to the 10-phase loop (full text may live in
   `docs/SPECIFICATION.md`; the adapter file can summarize).
4. The commands from `commands` (test/lint/build/format), if present.
5. A pointer to the `memory.directory` and its required files.

## Existing adapters

| id | Output | Notes |
|---|---|---|
| `claude` | `CLAUDE.md` | Followed automatically by Claude Code at the project root. |
| `cursor` | `.cursorrules` | Cursor's legacy single-file rules format. |
| `aider` | `CONVENTIONS.md` | Referenced via Aider's `--read` / conventions convention. |
| `codex` / `gemini` | `AGENTS.md` | Shared file; both tools read plain-Markdown agent instructions from the project root. |
| `windsurf` | `.windsurfrules` | Windsurf's project rules file, read automatically from the project root. |

## Testing an adapter

Adapters are pure functions of `EngineeringLoopConfig -> string`, so they are
tested with plain unit tests (`packages/cli/test/adapters.test.ts`) — no
filesystem or process mocking required. Add a fixture config, assert on the
rendered output for any new adapter, and confirm it contains exactly one
managed block (see the existing `"wraps every adapter's output..."` test).
