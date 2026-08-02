# Contributing to the Engineering Loop Standard

Thanks for considering a contribution. This repository has two things you
can contribute to, and they have different bars for change:

- **The specification** (`MANIFESTO.md`, `docs/SPECIFICATION.md`,
  `engineering-loop.schema.json`) — the actual standard. Changes here affect
  every project that adopts it, so they're reviewed more carefully and
  follow the versioning rules in §6 of
  [docs/SPECIFICATION.md](docs/SPECIFICATION.md).
- **The CLI** (`packages/cli`) — the reference implementation. Bug fixes,
  new adapters, and CLI ergonomics improvements are welcome with a normal
  PR review.

## Ground rules

- All code, comments, commit messages, and documentation are **English
  only** — this project targets a global, English-speaking developer
  audience regardless of what language you write your PR description or
  issue in.
- Be respectful and constructive in issues, PRs, and reviews. Disagreement
  on technical direction is normal and welcome; personal attacks aren't.
  Full expectations in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
- Every non-trivial PR should follow the same loop this project asks agents
  to follow (see [MANIFESTO.md](MANIFESTO.md) /
  [docs/SPECIFICATION.md](docs/SPECIFICATION.md)): understand the existing
  code, plan the change, implement it, verify it, and update
  `docs/memory/` if the change makes something there stale.

## Development setup

```bash
git clone https://github.com/sergiorebolledo/engineering-loop-standard.git
cd engineering-loop-standard
npm install
npm run build   # compiles packages/cli, syncs the schema copy
npm test         # vitest, run from the repo root
npm run lint     # tsc --noEmit
npm run doctor   # validates this repo against its own standard
```

All four of those (`build`, `test`, `lint`, `doctor`) are what CI runs on
every push and PR — run them locally before opening a PR.

**Node version:** the published `engineering-loop` CLI supports Node >= 18
(see `engines` in `packages/cli/package.json`), but running this repo's own
test suite requires Node >= 20 — vitest 4 depends on `util.styleText`,
which Node 18 doesn't have. See ADR-006 in
[docs/memory/DECISIONS.md](docs/memory/DECISIONS.md).

## Proposing a change to the specification

1. Open an issue first if the change affects the schema's required fields,
   the memory-file convention, or the manifesto — these are the parts other
   projects depend on directly.
2. If accepted, update `engineering-loop.schema.json` and
   `docs/SPECIFICATION.md` together; they must stay in sync.
3. Classify the version bump per §6 of the spec: removing/retyping a field
   or changing required-ness is **major**, adding an optional field is
   **minor**, wording clarifications are **patch**.
4. Record the "why" as a new entry at the top of
   [docs/memory/DECISIONS.md](docs/memory/DECISIONS.md).
5. Update [CHANGELOG.md](CHANGELOG.md).

## Adding a new adapter

See [docs/ADAPTERS.md](docs/ADAPTERS.md) for the full interface. In short:
add `packages/cli/src/adapters/<tool>.ts` exporting an `Adapter` (pure
`config -> string`, no filesystem access), register it in
`packages/cli/src/adapters/index.ts`, and add fixture assertions to
`packages/cli/test/adapters.test.ts`. No filesystem mocking needed —
adapters are pure functions by design.

## Fixing a CLI bug

Standard flow: reproduce with a failing test in `packages/cli/test/`, fix
the source under `packages/cli/src/`, confirm `npm test` and `npm run lint`
pass, then open a PR. If the bug affects behavior already published to npm,
note the version bump (patch) in your PR description.

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org/), in English:

```
feat(cli): add --dry-run flag to init
fix(schema): reject empty memory.required_files arrays
docs(adapters): document the Windsurf adapter interface
```

## Pull requests

- Keep PRs scoped to one change — a schema change and an unrelated CLI
  refactor should be two PRs.
- Include what you tested (`npm test` output, or manual `engineering-loop
  init`/`doctor` runs) in the PR description.
- CI (`.github/workflows/ci.yml`) must pass before merge.

## Reporting a bug or requesting a feature

Open a [GitHub issue](https://github.com/sergiorebolledo/engineering-loop-standard/issues).
For the CLI, include your OS, Node version, and the exact command you ran.
For the spec, include the `engineering-loop.json` that triggered the issue.

Found a security issue instead? Don't open a public issue — see
[SECURITY.md](SECURITY.md).
