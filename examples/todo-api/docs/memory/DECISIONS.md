# Decisions

Architecture Decision Records. Newest first.

---

## ADR-003: Cap request body size at 1 MB

**Date:** 2026-08-02
**Status:** Accepted

Found during a security review: `readJsonBody` buffered an unbounded
request body in memory before parsing — a trivial memory-exhaustion DoS
(OWASP API4:2023, Unrestricted Resource Consumption) if this pattern got
copied into a real service. Added a 1 MB cap; `POST /todos` now returns
`413` past it. First attempt destroyed the socket on overflow
(`req.destroy()`), which reset the connection before the 413 could be
written — fixed by pausing the stream and letting the handler respond
normally instead.

## ADR-002: Zero runtime dependencies

**Date:** 2026-08-02
**Status:** Accepted

Considered Express for familiarity. Chose plain `node:http` instead: this
project's job is to be a readable example of the Engineering Loop Standard,
not a production API. A framework would add a `node_modules` tree and
version-drift risk to something meant to stay copy-pasteable years from
now. `node:http` plus three routes is small enough to read end to end.

## ADR-001: `createApp(store)` takes an injectable store

**Date:** 2026-08-02
**Status:** Accepted

Considered a module-level singleton `Map` (simpler call sites). Chose
dependency injection instead: tests need a fresh, empty store per test
case to stay isolated and parallel-safe, and a singleton would force
tests to either share state or manually reset it between runs.
