# Architecture

## Overview

Single file, single process. `src/server.js` exports `createTodoStore()`
(an in-memory `Map`-backed store) and `createApp(store)` (an
`http.Server` wired to three routes). `src/index.js` is the only piece
that actually listens on a port — everything else is importable and
testable without binding a socket at import time.

```
src/index.js  -> createApp() -> listen(PORT)
src/server.js -> createTodoStore()  (state)
              -> createApp(store)   (routing + handlers)
```

## Data flow

1. Request comes in -> `createApp`'s request handler matches
   method + `url.pathname`.
2. `POST /todos` reads and JSON-parses the body before touching the store,
   so a malformed body never reaches `store.add`.
3. Store mutations are synchronous (it's a `Map`) — no race conditions to
   reason about at this scale.
4. Every response is `application/json`, including errors.

## Design decisions

`createApp` takes an optional `store` argument specifically so tests can
inject a fresh, isolated store per test instead of sharing global state —
see [DECISIONS.md](DECISIONS.md).
