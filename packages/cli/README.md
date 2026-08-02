# engineering-loop

CLI for the [Engineering Loop Standard](../../README.md): scaffolds
`engineering-loop.json`, persistent `docs/memory/`, and generated adapters
for Claude Code, Cursor, Aider, Codex/Gemini, and Windsurf.

## Usage

```bash
npx engineering-loop init
npx engineering-loop init --adapters claude,cursor --name my-app
npx engineering-loop sync
npx engineering-loop doctor
```

## Commands

### `init`

| Flag | Description | Default |
|---|---|---|
| `-d, --dir <path>` | Target directory | current directory |
| `-n, --name <name>` | Project name written into `engineering-loop.json` | directory name |
| `-a, --adapters <list>` | Comma-separated adapter ids (`claude,cursor,aider,codex,gemini,windsurf`) | `claude,cursor,aider,codex,windsurf` |
| `-f, --force` | Overwrite existing files | `false` |
| `--obsidian` | Also write a minimal `.obsidian/` config into the memory directory | `false` |

`docs/memory/` is already valid [Obsidian](https://obsidian.md/) vault
content as-is — plain Markdown, standard `[text](file.md)` links, no
wikilink syntax required. `--obsidian` just drops in `app.json` (forces
new links Obsidian creates to stay in that same relative-Markdown style,
instead of switching to `[[wikilinks]]`) and a `graph.json` with each
memory file color-coded, so the graph view is legible on first open. No
community plugins, no `workspace.json` — just enough to open the folder
and get a useful graph, nothing that assumes you use Obsidian daily.

### `sync`

Re-renders adapter files from the current `engineering-loop.json` without
clobbering hand-edited content. Each generated file wraps its content in a
`<!-- engineering-loop:managed:start/end -->` block; `sync` replaces only
what's inside that block, leaving anything outside it (notes you appended,
for instance) exactly as you left it. A file with no managed block at all —
hand-authored, or produced by a pre-1.1.0 version of this CLI — is skipped
entirely rather than risk overwriting content that isn't actually managed.

| Flag | Description | Default |
|---|---|---|
| `-d, --dir <path>` | Project directory | current directory |
| `-a, --adapters <list>` | Comma-separated adapters to sync | the config's own `adapters` list |

```bash
npx engineering-loop sync
✔ Created AGENTS.md
✔ Updated CLAUDE.md
= Unchanged .cursorrules
– Skipped CONVENTIONS.md (no managed block found ...)
```

### `doctor`

| Flag | Description | Default |
|---|---|---|
| `-d, --dir <path>` | Project directory to validate | current directory |

Exits non-zero if `engineering-loop.json` is missing, invalid against
[the schema](../../engineering-loop.schema.json), or a required memory file
is missing.

## Development

```bash
npm install
npm run build   # compiles src/ -> dist/, syncs the schema first
npm test         # vitest (needs Node >= 20; see ADR-006)
npm run lint     # tsc --noEmit
```

See [../../docs/ADAPTERS.md](../../docs/ADAPTERS.md) to add a new adapter —
including the managed-block requirement `sync` depends on.
