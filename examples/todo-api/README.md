# todo-api — Engineering Loop Standard worked example

A minimal, zero-dependency Todo REST API that has adopted the
[Engineering Loop Standard](../../README.md). This isn't a toy config with
no code behind it — it's a small but real, tested service, so you can see
what an ELS-compliant project actually looks like in practice, not just
what the generator scaffolds.

## What's here

```
src/server.js           createTodoStore() + createApp(store) — the whole API
src/index.js             entry point, starts listening on $PORT (default 3000)
test/server.test.js      7 tests, node:test + global fetch, no dependencies
engineering-loop.json    this project's ELS config (hand-tuned after `init`)
docs/memory/             real PROJECT/ARCHITECTURE/ROADMAP/TASKS/DECISIONS/KNOWLEDGE
CLAUDE.md, .cursorrules,
CONVENTIONS.md, AGENTS.md  generated adapters (see docs/ADAPTERS.md upstream)
```

## Run it

```bash
npm test    # node --test test/server.test.js
npm start    # listens on http://localhost:3000
npm run lint # node --check on both source files
```

No `npm install` needed — there are no dependencies.

## API

| Method | Path | Body | Response |
|---|---|---|---|
| `GET` | `/todos` | — | `200`, `[]` or list of todos |
| `POST` | `/todos` | `{"title": "..."}` | `201` + created todo, or `400` if title is missing/blank |
| `DELETE` | `/todos/:id` | — | `204` on success, `404` if unknown |

## How this was built

1. Wrote `src/server.js`/`src/index.js` and `test/server.test.js` first —
   the actual working code.
2. Ran `engineering-loop init` from the repo root to scaffold
   `engineering-loop.json`, `docs/memory/`, and the four adapters.
3. Hand-tuned `engineering-loop.json` (added a description, removed the
   default `build` command — this project has no build step) and the
   memory files with content specific to this project, not the blank
   templates `init` leaves behind.
4. Ran `npm run doctor` (via the CLI's own `dist/index.js doctor`) to
   confirm the result still conforms to the schema.

See [docs/memory/KNOWLEDGE.md](docs/memory/KNOWLEDGE.md) for a rough edge
this surfaced in the standard itself.
