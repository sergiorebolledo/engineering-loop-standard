# Roadmap

## v1.0.0 (current)

- [x] Manifesto + 10-phase loop specification.
- [x] `engineering-loop.json` schema (draft 2020-12).
- [x] `docs/memory/` convention and templates.
- [x] CLI: `init` command with adapters for Claude Code, Cursor, Aider,
      Codex/Gemini.
- [x] CLI: `doctor` command for schema + memory validation.
- [x] Published `engineering-loop` to npm.
- [x] Repository public on GitHub (`sergiorebolledo/engineering-loop-standard`).
- [x] GitHub Action that runs build/lint/test/`doctor` in CI.
- [x] Schema `$id` and generated `$schema` references point at a real,
      resolvable URL (tagged raw GitHub content) instead of the aspirational
      `engineering-loop.org` domain.

## v1.1.0 (planned)

- [ ] `engineering-loop sync` — re-render adapters after
      `engineering-loop.json` changes, without touching hand-edited sections.
- [ ] `engineering-loop.org` documentation site generated from
      `docs/SPECIFICATION.md`, with the schema eventually served from there
      and registered on [SchemaStore.org](https://www.schemastore.org/).
- [ ] Adapter for Windsurf.
- [x] CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md.
- [ ] `examples/` with a real project using the standard.

## Later / unscheduled

- [ ] Community adapter registry (third-party adapters outside this repo).

Status changes here should be reflected the same day in
[TASKS.md](TASKS.md); this file tracks direction, not day-to-day state.
