# Decision 0001: Independent design repository

Date: 2026-08-07
Status: accepted

## Context

OpenBindings has separately versioned repositories for the specification,
shared interfaces, SDKs, CLI/runtime, UI packages, website, and project
coordination. Brand, visual foundations, UI content, and experience principles
affect several of those repositories but fit none of their existing
authorities cleanly.

Housing the system in Elements would make a web-component repository appear to
own CLI and editorial language. Housing it in Project would broaden a
coordination repository into a catch-all for substantive cross-cutting
domains. A directory inside Project could preserve some internal cohesion, but
would still mix different release, dependency, contributor, and issue
lifecycles.

## Decision

Create `openbindings/design` as the independent, nonnormative authority for the
official OpenBindings brand and product-experience system.

Elements, Web, and `ob` retain implementation authority. Project coordination
may inventory Design and verify adoption, but Design releases independently and
does not participate in required specification cohorts.

## Consequences

- The design system gains a discoverable charter, history, issue space, and
  release lifecycle.
- Shared tokens and assets can be distributed without making Elements the
  authority for every surface.
- Cross-surface changes require coordinated consumer updates, which is an
  intentional cost of independent repository ownership.
- The repository must resist becoming a replacement authority for normative
  vocabulary, component behavior, site editorial decisions, or CLI contracts.
- A future public package can use the stable name `@openbindings/design`
  regardless of repository layout.
