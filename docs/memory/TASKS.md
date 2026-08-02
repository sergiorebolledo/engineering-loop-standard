# Tasks

## Active

- None — see [ROADMAP.md](ROADMAP.md) v1.1.0 for what's next
  (`engineering-loop sync`, Windsurf adapter). `engineering-loop@1.0.1`
  (the `$schema` fix) is built and verified but not yet published to npm —
  npm still serves the buggy 1.0.0.

## Backlog

See [ROADMAP.md](ROADMAP.md) for v1.1.0 and later.

## Done (recent)

- 2026-08-02: Added `examples/todo-api` — a real, tested (7 passing tests),
  zero-dependency service with hand-tuned `engineering-loop.json` and
  filled `docs/memory/`, not a blank scaffold. Surfaced and fixed two real
  bugs while building it: `node --test <dir>/` fails on this Windows/Node 24
  combo (fixed by pointing at the file explicitly), and the root README's
  repository-layout tree claimed a `prompts/` directory that never existed.
- 2026-08-02: Fixed broken `$schema` reference (ADR-005) — was a relative
  path that never resolved in generated projects, now points at a tagged
  raw GitHub URL. Bumped CLI to 1.0.1.
- 2026-08-02: Published `engineering-loop@1.0.0` to npm, pushed the repo to
  GitHub (`sergiorebolledo/engineering-loop-standard`), added GitHub
  Actions CI (build/lint/test/doctor on Node 18/20/22).
- 2026-08-01: Initial repository scaffold — specification, schema,
  `docs/memory/`, CLI (`init`, `doctor`), adapters (claude, cursor, aider,
  codex/gemini), test suite, self-dogfooded `engineering-loop.json`.
