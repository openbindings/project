# Design tokens

This directory contains stable semantic interface colors and machine material,
plus candidate open interface-foundation references.

- [`color.json`](color.json) defines color roles and usage constraints.
- [`themes/openbindings.json`](themes/openbindings.json) supplies the official
  light/dark values plus Elements and terminal mappings.
- [`generated/openbindings-theme.css`](generated/openbindings-theme.css) is a
  checked adapter written by `npm run generate:theme`.
- [`machine-material.json`](machine-material.json) defines the closed
  machine-text palette, functional syntax roles, and renderer mappings.
- `generated/openbindings-machine-*` contains checked CSS and Shiki adapters
  written by `npm run generate:machine`.
- [`foundations.json`](foundations.json) separates required behavioral
  guardrails from open, advisory visual references.
- [`generated/openbindings-foundations.css`](generated/openbindings-foundations.css)
  exposes optional `--ob-foundation-reference-*` values and reduced-motion
  adaptation. It is written by `npm run generate:foundations`.

The token model must distinguish:

- official OpenBindings brand values;
- semantic roles consumed across official applications;
- the public, themeable `--ob-*` contract owned by Elements; and
- modality adapters such as terminal roles that cannot consume CSS directly.

Generated adapters may live here while a system slice is being proven, but
they must identify their sources and be checked for drift. Publishable CSS,
TypeScript, JSON, or Go packages belong under `packages/` only when consumers
need installed versioning. Consumer snapshots must never become competing
hand-edited sources.

Foundation reference tokens are intentionally not a closed scale or a public
component contract. Their names retain `reference` so vendoring the CSS does
not imply that using the values is required for OpenBindings conformance.
