# Architecture

## Overview

The repository has two layers: a **specification** layer (plain files, no
build step) and a **tooling** layer (the CLI package that reads and acts on
the spec).

```
engineering-loop.json          <- config instance (this repo dogfoods itself)
engineering-loop.schema.json   <- formal schema, no runtime dependency
MANIFESTO.md                   <- the six principles, standalone
docs/SPECIFICATION.md          <- full spec text, versioned
docs/ADAPTERS.md               <- adapter interface contract
docs/memory/                   <- this directory; persistent project memory
packages/cli/                  <- `engineering-loop` npm package (TypeScript)
  src/
    index.ts                   <- CLI entry (commander)
    commands/init.ts           <- scaffolds config + memory + adapters
    commands/doctor.ts         <- validates an existing project against the schema
    adapters/*.ts               <- pure config -> string renderers, one per tool
    schema.ts                  <- runtime validation (ajv) against the JSON Schema
  templates/memory/*.md        <- blank memory templates copied by `init`
```

## Data flow

1. `engineering-loop init` reads no external input beyond CLI flags; it
   writes `engineering-loop.json` from a default config object
   (`src/defaultConfig.ts`), copies `templates/memory/*.md` into the target
   project's memory directory, then calls each selected adapter's `render()`
   with the config and writes the result to `adapter.outputPath`.
2. `engineering-loop doctor` reads an existing `engineering-loop.json`,
   validates it against `engineering-loop.schema.json` with `ajv`, checks
   that every file in `memory.required_files` exists on disk, and reports
   pass/fail per check.
3. Adapters are pure functions (`EngineeringLoopConfig -> string`) with no
   side effects, so they're unit-tested without touching the filesystem;
   only the `commands/*` layer performs I/O.

## Design decisions

See [DECISIONS.md](DECISIONS.md) for the "why" behind TypeScript + commander,
the adapter interface shape, and the choice to keep the spec dependency-free
(plain Markdown + JSON Schema, no custom parser).
