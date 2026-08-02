# Tasks

## Active

- None — see [ROADMAP.md](ROADMAP.md) v1.2.0 for what's next
  (`engineering-loop.org` docs site + SchemaStore registration).

## Backlog

See [ROADMAP.md](ROADMAP.md) for v1.2.0 and later.

## Done (recent)

- 2026-08-02: Shipped v1.1.0 — `engineering-loop sync` (managed-block
  merge, ADR-008) and a Windsurf adapter, both requested by the
  maintainer. Caught and fixed a real idempotency bug before publishing
  (ADR-009: `sync` was duplicating a trailing newline on every run).
  Regenerated `examples/todo-api` for the new format using `sync` itself
  — the workflow the feature exists for. Published
  `engineering-loop@1.1.0` to npm, verified live via `npx`.
- 2026-08-02: Published `engineering-loop@1.0.2` (the `doctor`
  path-traversal fix, ADR-007) to npm, verified live via `npx`.
- 2026-08-02: Security review (maintainer-requested, OWASP-informed):
  full secret scan of the working tree and entire git history (clean, 0
  hits), reviewed `packages/cli/src` for injection/traversal/eval risk
  (none — no `child_process`/`eval` anywhere in the codebase), hardened
  `doctor` against a path-traversal read via a crafted `memory.directory`
  / `required_files` (ADR-007), and added a 1 MB request-body cap to
  `examples/todo-api` (OWASP API4:2023, was unbounded). Removed the
  repo-root `CLAUDE.md` — sent the wrong signal for an agent-agnostic
  standard — and fixed the dangling references it left behind. Reworked
  the README with Mermaid diagrams instead of ASCII art.
- 2026-08-02: Fixed CI break caused by the vitest 4 bump (ADR-006) — Node 18
  can't run vitest 4 (`util.styleText` needs Node >= 20). Split CI into a
  `test` job (Node 20/22/24) and a `runtime-compat` job that packs and
  installs the real tarball on Node 18/20/22 to prove the published CLI's
  `engines: ">=18"` claim empirically, without needing vitest at all.
  Corrected a stale claim in `docs/memory/PROJECT.md` that the CLI was
  built with `tsup` (it's `tsc`) while in there.
- 2026-08-02: Cleared all 4 `npm audit` findings (esbuild dev-server
  vulnerability, transitive via vite/vite-node) by bumping vitest
  1.6 -> 4.1.10 in `packages/cli`. Dev-dependency only — no change to the
  published package, no new npm publish needed. All 22 tests, build, and
  lint pass unmodified on vitest 4.
- 2026-08-02: Published `engineering-loop@1.0.1` to npm and verified via a
  real `npx engineering-loop@1.0.1 init` that the `$schema` fix reached
  end users.
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
