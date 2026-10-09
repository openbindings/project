# Contributing

OpenBindings Design is a cross-surface authority. A change should name the
class of decisions it governs and the consumers it is expected to affect.

Before proposing a change:

1. Identify whether the subject is brand, product experience, domain
   vocabulary, component behavior, editorial content, or implementation.
2. Route changes outside this repository's authority to the owning repository.
3. Inventory every official surface affected by a shared change.
4. Preserve modality: terminal, editorial, workbench, and embeddable-component
   experiences should be related, not artificially identical.
5. Add mechanical evidence for checkable rules whenever practical.

Shared changes should belong to a slice in [`design-loop.json`](design-loop.json)
and follow [`docs/development-loop.md`](docs/development-loop.md). Start from
[`docs/templates/design-slice.md`](docs/templates/design-slice.md); record exact
source commits during inventory and consumer adoption evidence before marking a
decision stable.

Run:

```sh
npm test
```

Brand and token changes should include migration notes and visual evidence from
affected consumers. Voice and content changes should include representative
examples for success, warning, error, empty, loading, and destructive moments
where applicable.

Until the first design release, proposals may refine the repository structure.
After publication, public tokens and assets follow the compatibility policy
documented with their package.
