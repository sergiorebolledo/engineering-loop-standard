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

## v1.1.0 (shipped 2026-08-02)

- [x] `engineering-loop sync` — re-renders each adapter's managed block
      (`<!-- engineering-loop:managed:start/end -->`) from the current
      `engineering-loop.json`, leaving content outside the block untouched.
      Skips files with no managed block at all rather than risk overwriting
      hand-authored content. See ADR-008/ADR-009.
- [x] Adapter for Windsurf (`.windsurfrules`), now in the default adapter
      set alongside Claude/Cursor/Aider/Codex.
- [x] CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md.
- [x] `examples/todo-api` — a real, tested project using the standard.

## v1.2.0 (in progress)

- [x] Documentation site generated from `docs/`, live at
      [sergiorebolledo.github.io/engineering-loop-standard](https://sergiorebolledo.github.io/engineering-loop-standard/)
      (GitHub Pages, `just-the-docs` theme, source: `main` / `docs`). No
      custom domain needed to ship this — `engineering-loop.org` can be
      pointed at the same Pages site via CNAME later without redoing
      anything.
- [ ] Point `engineering-loop.org` at the GitHub Pages site once bought.
- [ ] Register the schema on [SchemaStore.org](https://www.schemastore.org/).

## Later / unscheduled

- [ ] Community adapter registry (third-party adapters outside this repo).

Status changes here should be reflected the same day in
[TASKS.md](TASKS.md); this file tracks direction, not day-to-day state.
