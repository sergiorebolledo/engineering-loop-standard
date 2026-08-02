# Knowledge

Domain insights and lessons that aren't obvious from reading the code.

- **The value here is the spec, not the CLI.** The CLI is a convenience
  scaffolder; the actual standard is `engineering-loop.schema.json` +
  `docs/SPECIFICATION.md`. A project can be ELS-compliant by hand-authoring
  those files without ever running the CLI. Don't let CLI implementation
  details leak into the spec's required behavior.

- **Adapters must stay lossless with respect to the manifesto.** Every
  adapter's rendered output should let a reader reconstruct the six
  manifesto principles without following a link. This is what makes an
  ELS-compliant repo behave consistently no matter which tool a contributor
  has installed.

- **Prior art was checked before starting.** Repository-level rule files,
  loop-based agent runners, and agent-loop tutorials already exist in the
  ecosystem, but none combine a formal provider-independent schema +
  persistent memory convention + multi-tool generated adapters in one
  versioned standard. That combination is this project's differentiator —
  keep it, don't dilute it into "yet another prompt collection."
