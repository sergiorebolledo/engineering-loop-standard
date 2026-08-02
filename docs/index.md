---
title: Home
layout: home
nav_order: 1
permalink: /
---

# Engineering Loop Standard

An open, agent-agnostic specification for disciplined, AI-assisted software
engineering. AI coding tools change every few months; the methodology that
makes them produce trustworthy code does not.

`engineering-loop.json` is a small, versioned config. A CLI generates each
tool's native rules file from it — `CLAUDE.md` (Claude Code), `.cursorrules`
(Cursor), `CONVENTIONS.md` (Aider), `AGENTS.md` (Codex/Gemini),
`.windsurfrules` (Windsurf). Write the spec once, generate an adapter for
every tool.

```bash
npx engineering-loop init
```

[Read the specification](SPECIFICATION.md){: .btn .btn-primary }
[View on GitHub](https://github.com/sergiorebolledo/engineering-loop-standard){: .btn }

## The manifesto

Full text and rationale in [MANIFESTO.md](https://github.com/sergiorebolledo/engineering-loop-standard/blob/main/MANIFESTO.md)
on GitHub. Six principles govern every adapter this project generates:

1. **Understand before acting.**
2. **Research before building.**
3. **Plan before execution.**
4. **Verify before completing.**
5. **Document as you go.**
6. **Leave the codebase better than you found it.**

## Where to go next

- **[Specification](SPECIFICATION.md)** — the full standard: the config
  schema, the 10-phase engineering loop, the persistent-memory convention,
  and how adapters work.
- **[Writing an Adapter](ADAPTERS.md)** — the interface a new AI-tool
  adapter must implement, for contributing support beyond the five tools
  covered today.
- **[engineering-loop.schema.json](https://raw.githubusercontent.com/sergiorebolledo/engineering-loop-standard/v1.0.0/engineering-loop.schema.json)**
  — the formal JSON Schema (draft 2020-12), pinned to the current spec tag.

Want to see it applied to a real, working project instead of a bare
scaffold? See the
[todo-api example](https://github.com/sergiorebolledo/engineering-loop-standard/tree/main/examples/todo-api).
