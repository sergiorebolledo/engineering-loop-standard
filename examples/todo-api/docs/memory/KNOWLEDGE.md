# Knowledge

Domain insights and lessons that aren't obvious from reading the code.

- **Editing `engineering-loop.json` by hand now updates the generated
  adapters via `engineering-loop sync`.** This used to require hand-editing
  four files (or `init --force`, which also wiped this project's
  hand-written `docs/memory/` content back to blank templates — happened
  for real while regenerating this example for 5 adapters, restored from
  git). `sync` re-renders only the `<!-- engineering-loop:managed:... -->`
  block each adapter file wraps its content in, leaving anything appended
  outside it — and every other file `sync` doesn't touch — alone. This
  project's 5 adapter files were regenerated with `init --force` once (to
  pick up the new managed-block format and the Windsurf adapter), then
  `engineering-loop.json` was hand-tuned (description, dropped the
  `build` command) and reconciled with `engineering-loop sync` instead of
  another destructive `init --force`.
