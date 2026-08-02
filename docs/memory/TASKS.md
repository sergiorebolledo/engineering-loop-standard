# Tasks

## Active

- None — see [ROADMAP.md](ROADMAP.md) v1.1.0 for what's next
  (CONTRIBUTING/CODE_OF_CONDUCT/SECURITY, `examples/`, `engineering-loop sync`).

## Backlog

See [ROADMAP.md](ROADMAP.md) for v1.1.0 and later.

## Done (recent)

- 2026-08-02: Fixed broken `$schema` reference (ADR-005) — was a relative
  path that never resolved in generated projects, now points at a tagged
  raw GitHub URL. Bumped CLI to 1.0.1.
- 2026-08-02: Published `engineering-loop@1.0.0` to npm, pushed the repo to
  GitHub (`sergiorebolledo/engineering-loop-standard`), added GitHub
  Actions CI (build/lint/test/doctor on Node 18/20/22).
- 2026-08-01: Initial repository scaffold — specification, schema,
  `docs/memory/`, CLI (`init`, `doctor`), adapters (claude, cursor, aider,
  codex/gemini), test suite, self-dogfooded `engineering-loop.json`.
