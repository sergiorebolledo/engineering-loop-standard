# Project

## What this is

Engineering Loop Standard (ELS) is an open, agent-agnostic specification for
disciplined, AI-assisted software engineering. It defines:

- `engineering-loop.json` — a versioned config any tool can parse.
- A `docs/memory/` convention for persistent project memory (this directory).
- A manifesto and a 10-phase execution loop that any coding agent can follow.
- A CLI (`engineering-loop`, in `packages/cli`) that scaffolds all of the
  above into a project and generates adapters for specific tools.

## Who it is for

Developers and teams who use more than one AI coding agent (or expect to
switch tools over time) and want their engineering discipline — not just
their prompts — to survive that switch. Secondary audience: tool authors who
want to make their agent ELS-compliant by shipping an adapter.

## Tech stack

- Specification: Markdown + JSON Schema (draft 2020-12), no runtime
  dependency.
- CLI: TypeScript, built with `tsc`, tested with `vitest` 4, distributed as
  the `engineering-loop` npm package. The published CLI runs on
  Node.js >= 18 (see `engines` in `packages/cli/package.json`); running
  this repo's own test suite needs Node >= 20, since vitest 4 requires it
  (see ADR-006).
- No database, no backend service — this is a spec + a local CLI.

## Language policy

All code, comments, docs, commit messages, and CLI output are English only,
per `language_policy` in [engineering-loop.json](../../engineering-loop.json)
and [MANIFESTO.md](../../MANIFESTO.md). This applies even when the
maintainer communicates with an agent in another language.

## Current status

Draft v1.0.0 of the specification, initial CLI implementation
(`init`, `doctor`) with adapters for Claude Code, Cursor, Aider, and
Codex/Gemini. See [ROADMAP.md](ROADMAP.md) for what's next and
[TASKS.md](TASKS.md) for active work.
