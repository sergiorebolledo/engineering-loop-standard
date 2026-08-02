# engineering-loop

CLI for the [Engineering Loop Standard](../../README.md): scaffolds
`engineering-loop.json`, persistent `docs/memory/`, and generated adapters
for Claude Code, Cursor, Aider, and Codex/Gemini.

## Usage

```bash
npx engineering-loop init
npx engineering-loop init --adapters claude,cursor --name my-app
npx engineering-loop doctor
```

## Commands

### `init`

| Flag | Description | Default |
|---|---|---|
| `-d, --dir <path>` | Target directory | current directory |
| `-n, --name <name>` | Project name written into `engineering-loop.json` | directory name |
| `-a, --adapters <list>` | Comma-separated adapter ids (`claude,cursor,aider,codex,gemini`) | `claude,cursor,aider,codex` |
| `-f, --force` | Overwrite existing files | `false` |

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
npm test         # vitest
npm run lint     # tsc --noEmit
```

See [../../docs/ADAPTERS.md](../../docs/ADAPTERS.md) to add a new adapter.
