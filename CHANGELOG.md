# Changelog

All notable changes to the Engineering Loop Standard follow
[Conventional Commits](https://www.conventionalcommits.org/) and this
project's own semver (§6 of [docs/SPECIFICATION.md](docs/SPECIFICATION.md)).

## [engineering-loop@1.0.1] - 2026-08-02

### Fixed

- `fix(cli)`: `engineering-loop init` generated an `engineering-loop.json`
  with `"$schema": "./engineering-loop.schema.json"` — a relative path that
  never resolves, since the schema file is never copied into the target
  project. Every scaffolded project shipped a broken schema reference.
  `$schema` (and the schema's own `$id`) now point at a real, resolvable
  URL pinned to the `v1.0.0` spec tag on GitHub, instead of the aspirational
  `engineering-loop.org` domain. See ADR-005 in
  [docs/memory/DECISIONS.md](docs/memory/DECISIONS.md).
- `ci`: added GitHub Actions running build/lint/test/`doctor` on
  Node 18/20/22 for every push and PR, plus a packed-tarball install smoke
  test.

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
