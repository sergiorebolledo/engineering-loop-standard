# Changelog

All notable changes to the Engineering Loop Standard follow
[Conventional Commits](https://www.conventionalcommits.org/) and this
project's own semver (§6 of [docs/SPECIFICATION.md](docs/SPECIFICATION.md)).

## [engineering-loop@1.0.2] - 2026-08-02

### Security

- `fix(cli)`: `doctor` read `memory.directory` and `memory.required_files`
  straight from an `engineering-loop.json` that may not have been authored
  by the current user (e.g. running `doctor` against a cloned project). A
  crafted `"../../../../etc/passwd"` entry would resolve outside the
  project without any bound check before the existence test — low severity
  (existence check only, no read/write) but CWE-22-shaped. `doctor` now
  fails cleanly instead of resolving a path outside its parent. See ADR-007
  in [docs/memory/DECISIONS.md](docs/memory/DECISIONS.md).
- `chore`: bumped `vitest` 1.6 -> 4.1.10 in `packages/cli`, clearing all 4
  `npm audit` findings (an esbuild dev-server vulnerability, transitive via
  vite/vite-node). Dev-dependency only; nothing shipped in the published
  package changed.

### Other

- `docs`: removed the repo-root `CLAUDE.md` — this project's positioning is
  agent-agnostic, and a Claude-specific file sitting at the root sent the
  wrong signal. The "claude" adapter and its generated output for
  *consumer* projects are unaffected.
- `docs`: README now uses Mermaid diagrams (architecture, 10-phase loop)
  instead of ASCII art, plus a table of contents.
- `ci`: split into a `test` job (Node 20/22/24, needs vitest 4) and a
  `runtime-compat` job that packs and runs the real tarball on Node
  18/20/22 without vitest, to keep proving the CLI's `engines: ">=18"`
  claim now that the test suite itself needs Node >= 20. See ADR-006.

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
