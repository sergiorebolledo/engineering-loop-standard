# Project

## What this is

A minimal Todo REST API (`GET/POST /todos`, `DELETE /todos/:id`), in-memory
storage only. It exists as a worked example of the
[Engineering Loop Standard](../../../../README.md) — real code, real
tests, and real `docs/memory/` content, not blank templates.

## Tech stack

Node.js >= 18, zero runtime dependencies (`node:http`, `node:crypto`).
Tests use the built-in `node:test` runner and global `fetch`. No build
step, no framework.

## Language policy

English for code, comments, docs, and commits — matches
`language_policy` in [engineering-loop.json](../../engineering-loop.json).

## Current status

Feature-complete for its scope (list/create/delete todos). See
[ROADMAP.md](ROADMAP.md) for what's intentionally out of scope and
[TASKS.md](TASKS.md) for day-to-day state.
