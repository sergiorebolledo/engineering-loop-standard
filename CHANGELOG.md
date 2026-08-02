# Changelog

All notable changes to the Engineering Loop Standard follow
[Conventional Commits](https://www.conventionalcommits.org/) and this
project's own semver (§6 of [docs/SPECIFICATION.md](docs/SPECIFICATION.md)).

## [1.0.0] - 2026-08-01

### Added

- `feat(spec)`: initial Engineering Loop Standard specification —
  manifesto, 10-phase loop, `engineering-loop.json` schema
  (draft 2020-12), and the `docs/memory/` persistent-memory convention.
- `feat(cli)`: `engineering-loop` CLI package with `init` and `doctor`
  commands.
- `feat(adapters)`: generated adapters for Claude Code (`CLAUDE.md`),
  Cursor (`.cursorrules`), Aider (`CONVENTIONS.md`), and Codex/Gemini
  (`AGENTS.md`).
- `docs`: README, MANIFESTO, full specification, and adapter-authoring
  guide.
- `test(cli)`: vitest suite covering adapters, schema validation, `init`,
  and `doctor`.
- `docs(memory)`: this repository dogfoods its own standard — see
  `docs/memory/`.
