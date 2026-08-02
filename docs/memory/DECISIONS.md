# Decisions

Architecture Decision Records. Newest first.

---

## ADR-004: Codex and Gemini share one `AGENTS.md` adapter

**Date:** 2026-08-01
**Status:** Accepted

Both tools read plain-Markdown instructions from an `AGENTS.md` file at the
project root and neither has a distinguishing native format the way Cursor's
`.cursorrules` does. Rather than generate two near-identical files, one
adapter (`id: "codex"`) writes `AGENTS.md` and is documented as covering
both. A `gemini` id is reserved in the schema enum for the day Gemini's
tooling diverges enough to need its own file.

## ADR-003: Adapters are pure functions, not template files on disk

**Date:** 2026-08-01
**Status:** Accepted

Considered: Handlebars/EJS template files under `templates/adapters/*`.
Chosen instead: TypeScript functions (`config => string`) per adapter.

**Why:** Adapter output needs conditional logic (e.g., omit the commands
section if `commands` is empty) that string templates make awkward, and a
pure function is trivially unit-tested without a template engine dependency
or file I/O in tests.

## ADR-002: JSON Schema draft 2020-12, validated with ajv

**Date:** 2026-08-01
**Status:** Accepted

Chosen over a hand-rolled validator so the schema stays authoritative and
external tools (editors, CI) can validate `engineering-loop.json` without
depending on this CLI at all — the schema is a plain, standalone JSON file.

## ADR-001: CLI written in TypeScript, packaged for `npx`

**Date:** 2026-08-01
**Status:** Accepted

The standard's own quick-start example (`npx engineering-loop init`) implies
an npm-distributed Node CLI. TypeScript was chosen over plain JS for the
adapter interface's type safety, and over Python/Go so the tool matches the
runtime most of the target audience (JS/TS-heavy teams adopting Cursor/Aider)
already has installed.
