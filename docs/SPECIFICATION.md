# Engineering Loop Standard — Specification v1.0.0

Status: Draft. Versioned independently of the `engineering-loop` CLI package.

## 1. Scope

This document specifies the Engineering Loop Standard (ELS): a
provider-agnostic contract between a software repository and any AI coding
agent operating on it. An agent that follows this specification is expected
to:

1. Read `engineering-loop.json` at the project root before acting.
2. Treat the manifesto in [MANIFESTO.md](../MANIFESTO.md) as binding.
3. Execute the 10-phase loop (§3) for any non-trivial change.
4. Read and write the persistent memory files described in §4.
5. Respect the `language_policy` declared in the config (§2.5).

ELS does not specify a model, a vendor, or a runtime. It specifies files and
their meaning, so that any tool — present or future — can implement an
adapter (§5) for it.

## 2. The configuration file

`engineering-loop.json` is the single source of truth. Its shape is defined
formally by [engineering-loop.schema.json](../engineering-loop.schema.json)
(JSON Schema draft 2020-12). Key sections:

### 2.1 `project`
Identity and architecture style. Free text; used to seed adapter templates
and `docs/memory/PROJECT.md`.

### 2.2 `memory`
Points at the persistent memory directory (default `docs/memory`) and lists
the files that must exist inside it. An agent MUST refuse to skip Phase 1
(Context Retrieval) if a required memory file is missing, and MUST offer to
create it instead of proceeding silently.

### 2.3 `pipeline`
Ordered phase names run before (`pre_code`) and after (`post_code`) an
implementation step. These map onto the 10-phase loop in §3 but may be
narrowed for small repos (e.g. a script-only repo may drop `refactor`).

### 2.4 `commands`
Shell commands an agent runs during Phase 6 (Test) and Phase 7 (Heal/Fix).
An agent MUST use the commands declared here instead of guessing a test
runner when the field is present.

### 2.5 `language_policy`
ISO 639-1 codes per artifact category (`code`, `comments`, `docs`,
`commits`). The default for every category is `en`. An agent MUST write
artifacts in the declared language even when the conversation with the human
author happens in a different language.

### 2.6 `agents`
Behavioral limits. `max_repair_iterations` bounds Phase 7 retry loops —
an agent that has not reached a passing state after this many attempts MUST
stop and summarize the blocker instead of continuing indefinitely.

### 2.7 `adapters`
Which adapters `engineering-loop init` / `engineering-loop sync` should
generate. See §5.

## 3. The 10-phase loop

```
[1 CONTEXT] -> [2 RESEARCH] -> [3 PLAN] -> [4 RISKS] -> [5 IMPLEMENT]
                                                              |
[10 SUMMARY] <- [9 DOCUMENT] <- [8 REFACTOR] <- [7 HEAL/FIX] <- [6 TEST]
```

| Phase | Name | Exit condition |
|---|---|---|
| 1 | Context Retrieval | `engineering-loop.json` and all required memory files have been read |
| 2 | Repository Research | Existing patterns/utilities relevant to the task have been searched for |
| 3 | Implementation Plan | An explicit, file-level plan exists |
| 4 | Risk & Impact Assessment | Breaking changes and rollback options are stated |
| 5 | Implementation | Code changes match the plan |
| 6 | Automated Testing & Verification | `commands.test` / `commands.lint` have been run |
| 7 | Self-Healing & Bug Fixing | Failures are fixed and re-verified, bounded by `agents.max_repair_iterations` |
| 8 | Refactoring | Readability/DRY pass with no behavior change |
| 9 | Memory & Documentation Update | `docs/memory/*` and `CHANGELOG.md` reflect the change |
| 10 | Task Summary | A concise summary of what changed and what remains is produced |

An agent MAY collapse phases for trivial changes (a one-line typo fix does
not need a written risk assessment) but MUST NOT skip Phase 6 (Test) or
Phase 9 (Document) for any change that touches tracked source files.

## 4. Persistent memory

The memory directory (default `docs/memory/`) holds six files. Each has a
single responsibility so that an agent — or a new contributor — can find
current-state information without re-reading the full git history.

| File | Answers |
|---|---|
| `PROJECT.md` | What is this, who is it for, what stack does it use? |
| `ARCHITECTURE.md` | How is it structured, what are the major components and data flows? |
| `ROADMAP.md` | What's planned, in what order? |
| `TASKS.md` | What's actively being worked on right now? |
| `DECISIONS.md` | Why was X chosen over Y? (ADR log) |
| `KNOWLEDGE.md` | What non-obvious domain facts or lessons has the team learned? |

Phase 9 of every loop MUST update whichever of these files the change makes
stale. A memory file that no longer matches the code is a bug, tracked the
same way a failing test is.

## 5. Adapters

An adapter translates `engineering-loop.json` + the manifesto into a given
tool's native configuration format. ELS defines the mapping; it does not
require any specific tool.

| Tool | Generated file(s) |
|---|---|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursorrules` |
| Aider | `CONVENTIONS.md` |
| Codex / Gemini | `AGENTS.md` |
| Windsurf | `.windsurfrules` |

All adapters MUST express the same six manifesto principles and the same
10-phase loop; they differ only in file location and native formatting
conventions of the target tool. See [ADAPTERS.md](ADAPTERS.md) for the
implementation interface and how to contribute a new adapter.

### 5.1 Re-syncing adapters after a config change

Adapter output is wrapped in a managed block
(`<!-- engineering-loop:managed:start/end -->`). `engineering-loop sync`
re-renders only that block from the current `engineering-loop.json`,
leaving anything outside it — notes a developer appended, for instance —
untouched. If a file has no managed block at all (hand-authored, or
generated by a pre-1.1.0 tool), `sync` MUST NOT modify it; that file is
indistinguishable from one a human fully wrote by hand, so silently
overwriting it would be a data-loss bug, not a feature.

## 6. Versioning

ELS follows semver. A change to `engineering-loop.schema.json` that removes
a field, changes a field's type, or changes required-ness is a MAJOR change.
Adding an optional field is MINOR. Wording clarifications in this document
are PATCH. Every version change is recorded in
[CHANGELOG.md](../CHANGELOG.md) and, for the "why," in
[docs/memory/DECISIONS.md](memory/DECISIONS.md).
