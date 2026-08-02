# Decisions

Architecture Decision Records. Newest first.

---

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
