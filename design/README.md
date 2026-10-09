# OpenBindings Design

OpenBindings Design is the nonnormative, project-wide authority for the
official OpenBindings brand and product experience. It exists so the website,
Elements, the `ob` terminal experience, the embedded workbench, authorization
pages, and project assets can feel like parts of one system without forcing
those surfaces into one implementation.

**Status: active in [project/design](https://github.com/openbindings/project/tree/main/design).** The design authority and ownership model are established,
and the identity, official color theme, interface foundations, and
machine-material systems are stable and adopted. A canonical tagline and
explanatory descriptor are accepted and migrating through official surfaces.
Broader brand guidance and public packages are still being reviewed through
focused design slices. Existing consumer files remain authoritative until an
explicit migration lands.

This work is tooling and product guidance. It is not part of the OpenBindings
specification and creates no conformance requirement for third-party
implementations.

## Authority

This repository owns:

- the official OpenBindings visual identity and canonical brand assets;
- brand voice and cross-surface product-content guidance;
- product-experience and accessibility presentation principles;
- foundation, semantic, syntax, and motion tokens for official surfaces;
- the official theme packages and generated design artifacts;
- design-specific validation, reference fixtures, and migration guidance.

It does not own:

- normative terminology or document semantics (`openbindings/spec`);
- published interface contracts (`openbindings/interfaces`);
- component APIs and behavior (`openbindings/elements`);
- website information architecture, teaching, or deployment
  (`openbindings/web`);
- CLI commands, machine output, or runtime behavior (`openbindings/ob`);
- cross-repository cohorts and integration policy (`openbindings/project`).

The detailed routing rules are in [docs/authority.md](docs/authority.md).

## Repository structure

```text
assets/       canonical glyphs, icons, and generated-asset inputs
brand/        identity, voice, typography, and brand-expression guidance
experience/   interaction, UI content, accessibility, and modality guidance
tokens/       machine-readable foundation and semantic design decisions
packages/     distributable artifacts, including the future @openbindings/design
specimens/    durable browser previews for visual review
docs/         authority, current-state inventory, decisions, and migrations
scripts/      repository validation and generation tooling
```

## Consumers

Official consumers adopt this system without surrendering their native
authority:

- Elements maps shared decisions into its public `--ob-*` component contract.
- Web applies the official theme to its Svelte publication and teaching
  surfaces.
- `ob start` applies the theme to its workbench and authorization pages.
- The terminal CLI adapts semantic roles to terminal capabilities and respects
  `NO_COLOR`; it does not attempt to reproduce CSS.

Third-party Elements consumers are not required to use the OpenBindings theme.
Themeability remains a product feature, not a brand exception.

## Development loop

Design work uses a reverse-and-return loop:

1. inventory evidence from the official surfaces;
2. identify shared roles and intentional differences;
3. ratify one small design slice in this repository;
4. publish its guidance, assets, or machine-readable artifacts here;
5. migrate each consumer through its own repository; and
6. record verification and any approved modality exceptions here.

The full state machine is in [docs/development-loop.md](docs/development-loop.md).
[design-loop.json](design-loop.json) records the current slice and adoption
state, and the initial evidence is in
[docs/evidence/2026-08-07-common-ground.md](docs/evidence/2026-08-07-common-ground.md).
The completed slices are [identity and canonical assets](docs/slices/identity.md),
[color roles and the official theme](docs/slices/color-theme.md),
[interface foundations](docs/slices/foundations.md), and
[machine material and syntax](docs/slices/machine-material.md). The active
slice is [canonical verbal identity](docs/slices/verbal-identity.md); the
partially inventoried [status, feedback, and recovery](docs/slices/status-feedback.md)
slice remains paused behind it.

This design directory remains canonical even if openbindings.com later renders
this material as a browsable design-system site. Presentation may be delegated;
authority is not.

## Development

The repository currently has no runtime dependencies:

```sh
npm test
npm run loop
npm run generate
```

`npm run generate` refreshes committed identity, theme, machine-material, and
foundation adapters from their canonical sources. `npm test` rejects stale
generated files, inaccessible color combinations, and accidental conversion
of open visual references into closed requirements.

Changes use trunk plus tags. Work lands through PRs to the project repository’s `main`; future published design
artifacts will version independently from the specification, SDKs, Elements,
Web, `ob`, and project cohorts.

## Source consolidation

See [the consolidation decision](docs/decisions/0004-project-consolidation.md) and [original file manifest](IMPORT.json). Run commands here, or use `npm --prefix design test` from the project root. The existing `decision-heuristics/` project research remains intact.
