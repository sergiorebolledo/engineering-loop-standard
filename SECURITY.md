# Security Policy

## Supported versions

| Package | Version | Supported |
|---|---|---|
| `engineering-loop` (npm) | 1.x | Yes |

This project is pre-1.0-ecosystem-maturity; only the latest published
`1.x` version receives fixes. There is no LTS branch yet.

## What counts as a security issue here

`engineering-loop` is a local CLI that reads/writes files in a project
directory and validates JSON against a local schema — it doesn't run a
server, doesn't execute remote code, and doesn't handle secrets. Relevant
report categories:

- Path traversal or unsafe file writes in `init`/`doctor` (e.g. a crafted
  `--dir`, `--name`, or `engineering-loop.json` causing writes outside the
  target directory).
- A malicious `engineering-loop.json` causing arbitrary code execution
  during schema validation (e.g. via `ajv` schema compilation).
- Supply-chain issues in the published npm package (unexpected files in
  the tarball, dependency confusion).

Bugs that just produce incorrect output (a wrong adapter file, a failed
validation that should have passed) are regular bugs — file those as a
normal [GitHub issue](https://github.com/sergiorebolledo/engineering-loop-standard/issues),
not a security report.

## Reporting a vulnerability

Please don't open a public issue for a suspected vulnerability. Use
[GitHub's private vulnerability reporting](https://github.com/sergiorebolledo/engineering-loop-standard/security/advisories/new)
for this repository (Security tab → "Report a vulnerability"). If that
isn't available, contact the maintainer directly through their GitHub
profile (`sergiorebolledo`) rather than filing a public issue.

Include what you'd include in any report: affected version, a minimal
reproduction, and the impact you believe it has. There's no formal SLA
given the project's current size, but reports are reviewed as they come
in and a fix or mitigation is prioritized over new feature work.
