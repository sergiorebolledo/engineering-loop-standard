# Knowledge

Domain insights and lessons that aren't obvious from reading the code.

- **Editing `engineering-loop.json` by hand doesn't update the generated
  adapters.** After customizing `commands` in this project's config (removed
  a `build` step this project doesn't have), the four adapter files
  (`CLAUDE.md`, `.cursorrules`, `CONVENTIONS.md`, `AGENTS.md`) still had the
  stale command until edited manually — there's no `engineering-loop sync`
  yet (tracked in the standard's own
  [ROADMAP.md](../../../../docs/memory/ROADMAP.md)). Until that ships,
  re-running `init --force` regenerates everything from scratch (including
  overwriting hand customizations to `engineering-loop.json` itself), so
  hand-editing adapters is currently the only non-destructive option.
