# The Agentic Engineering Manifesto

AI coding tools change fast. Software engineering discipline does not.

The **Engineering Loop Standard** exists because prompts are tied to one model
and one interface, while a methodology can outlive all of them. This manifesto
is the six principles every agent adapter, template, and tool in this project
is built to enforce.

---

1. **Understand before acting.**
   No code is written without full contextual knowledge of the system it
   touches.

2. **Research before building.**
   Existing patterns, utilities, and dependencies are searched for before new
   ones are created.

3. **Plan before execution.**
   Every non-trivial change starts as an explicit, step-by-step plan with its
   risks stated up front.

4. **Verify before completing.**
   Tests, linters, and type checks are run. An unverified change is an
   incomplete change.

5. **Document as you go.**
   Project memory is updated in the same loop as the code, never as an
   afterthought.

6. **Leave the codebase better than you found it.**
   Continuous refactoring and cleanup are part of every change, not a
   separate task.

---

## Why a manifesto and not just a prompt

A prompt tells one model what to do on one day. A manifesto is a contract
between a developer and any agent working in their repository — Claude Code,
Cursor, Aider, Codex, Gemini, or whatever comes next. Adapters translate the
same six principles into each tool's native configuration format; the
principles themselves never change per tool.

See [README.md](README.md) for the full specification, the
`engineering-loop.json` schema, and the CLI that scaffolds this into any
project.
