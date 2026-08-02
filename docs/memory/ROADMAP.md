# Roadmap

## v1.0.0 (current)

- [x] Manifesto + 10-phase loop specification.
- [x] `engineering-loop.json` schema (draft 2020-12).
- [x] `docs/memory/` convention and templates.
- [x] CLI: `init` command with adapters for Claude Code, Cursor, Aider,
      Codex/Gemini.
- [x] CLI: `doctor` command for schema + memory validation.

## v1.1.0 (planned)

- [ ] `engineering-loop sync` — re-render adapters after
      `engineering-loop.json` changes, without touching hand-edited sections.
- [ ] `engineering-loop.org` documentation site generated from
      `docs/SPECIFICATION.md`.
- [ ] Adapter for Windsurf.
- [ ] Publish `engineering-loop` to npm.

## Later / unscheduled

- [ ] GitHub Action that runs `engineering-loop doctor` in CI.
- [ ] JSON Schema published at a stable, versioned URL
      (`https://engineering-loop.org/schema/v1.json`) once the project has a
      domain.
- [ ] Community adapter registry (third-party adapters outside this repo).

Status changes here should be reflected the same day in
[TASKS.md](TASKS.md); this file tracks direction, not day-to-day state.
