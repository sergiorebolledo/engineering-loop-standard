# CLAUDE.md - Agentic Engineering Loop Guidelines

Welcome to **Engineering Loop** (or *Agentic Engineering Framework*). This file defines the core system instructions, operational loop, and coding standards for Claude Code working within this repository.

---

## 🎯 Core Philosophy & Principles

Always adhere to the **Agentic Engineering Manifesto**:

1. **Understand before acting.** Never write code without full contextual knowledge.
2. **Research before building.** Search the repository for existing patterns, utilities, and dependencies before creating new ones.
3. **Plan before execution.** Draft clear, step-by-step implementation plans and assess risks before changing files.
4. **Verify before completing.** Run tests, linters, and type checks. An unverified change is an incomplete change.
5. **Document as you go.** System memory and documentation must always reflect current reality.
6. **Leave the codebase better than you found it.** Maintain continuous refactoring and clean code principles.

---

## 🌐 Language Policy (Strict Rule)

> **IMPORTANT:**
> - **All code, inline comments, docstrings, documentation (`.md` files), commit messages, pull requests, and technical logs MUST BE IN ENGLISH.**
> - Even when interacting with the prompt author in Spanish, every single artifact, code file, comment, test, and documentation written to disk must strictly use **English**.

---

## 🔄 The Engineering Loop (Execution Phases)

When assigned any task (feature, bugfix, refactoring, or infrastructure), you MUST systematically execute the following 10-phase loop. **Do not skip phases.**

```
   [ 1. CONTEXT ]  ──►  [ 2. RESEARCH ]  ──►  [ 3. PLAN ]  ──►  [ 4. RISKS ]
                                                                      │
   [ 8. REFACTOR ] ◄──  [ 7. HEAL/FIX ] ◄──  [ 6. TEST ]  ◄──  [ 5. IMPLEMENT ]
         │
         ▼
   [ 9. DOCUMENT ] ──►  [ 10. SUMMARY ]
```

### Phase 1: Context Retrieval
- Read project configuration files: `engineering-loop.json`, `package.json`, or environment files.
- Inspect persistent memory files in `docs/memory/` (`PROJECT.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `TASKS.md`).

### Phase 2: Repository Research
- Search existing files for reusable functions, UI components, shared schemas, or established conventions.
- Verify dependency matrices to avoid adding redundant packages.

### Phase 3: Implementation Plan
- Formulate an explicit, step-by-step action plan.
- Identify exact files to be created, updated, or removed.

### Phase 4: Risk & Impact Assessment
- Highlight breaking changes, performance bottlenecks, or security concerns.
- State fallback plans if tests fail.

### Phase 5: Implementation
- Write clean, modular, and idiomatic code based *only* on the approved plan.
- Include concise, descriptive English comments explaining *why* non-obvious logic exists.

### Phase 6: Automated Testing & Verification
- Execute project test suites (e.g., `npm test`, `pytest`, `cargo test`).
- Execute linters and formatting commands (e.g., `npm run lint`, `flake8`, `eslint`).

### Phase 7: Self-Healing & Bug Fixing Loop
- If any test or linting check fails, analyze the stack trace and fix the issue.
- Re-run tests automatically until **100% pass rate** is achieved.

### Phase 8: Refactoring
- Optimize for readability, maintainability, and DRY (Don't Repeat Yourself) principles without altering external behavior.

### Phase 9: Memory & Documentation Update
- Update `CHANGELOG.md` following [Conventional Commits](https://www.conventionalcommits.org/).
- Update relevant architecture or task tracking files under `docs/memory/`.

### Phase 10: Task Summary
- Output a clear summary of modifications, test results, and next steps for the maintainer.

---

## 📁 Repository Memory Architecture

Keep the following memory structure synced at all times:

```text
.
├── engineering-loop.json   # Machine-readable framework configuration
├── CLAUDE.md              # Claude Code execution instructions (this file)
├── docs/
│   ├── memory/
│   │   ├── PROJECT.md      # Core vision, tech stack, and objectives
│   │   ├── ARCHITECTURE.md # System architecture, diagrams, and design patterns
│   │   ├── ROADMAP.md      # Milestones, epics, and planned features
│   │   ├── TASKS.md        # Current task backlog and execution status
│   │   ├── DECISIONS.md    # Architecture Decision Records (ADRs)
│   │   └── KNOWLEDGE.md    # Domain insights and lessons learned
│   └── ...
└── prompts/               # Reusable agent prompts and role definitions
```

---

## 🛠️ Code & Engineering Standards

### 1. Code Quality
- **Naming Conventions:** Self-descriptive, English identifiers (`camelCase` for variables/functions, `PascalCase` for types/classes, `SNAKE_CASE` for constants).
- **Function Design:** Functions must be small, single-purpose, and pure where feasible.
- **Error Handling:** Always handle edge cases gracefully with explicit error messages in English.

### 2. Comments & Documentation Style
- **JSDoc / Docstrings:** Write complete API specifications for public methods and exported modules.
- **Inline Comments:** Focus on intent and business logic rather than stating what the code visibly does.

```typescript
// Good: Explains intent in English
// Calculate retry delay with exponential backoff and jitter to avoid thundering herd problem
const delay = Math.min(MAX_DELAY, BASE_DELAY * Math.pow(2, attempt)) + Math.random() * 1000;

// Bad: States the obvious
// Multiply base delay by power of 2
```

### 3. Git & Commits
- Use English Conventional Commits format:
  - `feat(core): add configuration parser for engineering-loop.json`
  - `fix(cli): resolve path resolution bug on Windows`
  - `docs(memory): update architecture diagram for multi-agent flow`

---

## ⚡ Quick Command Reference

When working in this project, use these default scripts (adapt according to `engineering-loop.json`):

- **Run Tests:** `npm test` / `pytest`
- **Run Linter:** `npm run lint` / `ruff check .`
- **Build:** `npm run build`
- **Format Code:** `npm run format` / `black .`
