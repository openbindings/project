# OpenBindings project coordination

This repository owns the OpenBindings project's cross-repository integration
policy and records exact combinations that the project has verified together.
It does **not** contain normative specification text, publish component
packages, or require the component repositories to release in lockstep.

The distinction is deliberate:

- a component release says that one repository has published a new artifact;
- a compatibility declaration says which OpenBindings specification line that
  artifact implements;
- a project cohort says that one exact collection of commits passed the
  project-wide verification suite.

The normative specification remains in
[`openbindings/spec`](https://github.com/openbindings/spec). Reference SDKs,
the CLI, UI packages, shared interfaces, the website, and the project-wide
design system remain independently owned and independently versioned in their
own repositories.

## Repository map

[`repositories.json`](repositories.json) is the machine-readable inventory of
repositories that can participate in a verified release cohort. It is not a
complete registry of every OpenBindings authority repository. The cohort
layers are:

| Repository | Role | Project-cohort status |
| --- | --- | --- |
| `openbindings/spec` | Normative core and binding specifications | Required |
| `openbindings/interfaces` | Nonnormative shared contracts and profiles | Required |
| `openbindings/openbindings-go` | Go reference implementation | Required |
| `openbindings/openbindings-ts` | TypeScript reference implementation | Required |
| `openbindings/ob` | CLI and runtime | Required |
| `openbindings/elements` | Independently released UI packages | Extended verification |
| `openbindings/web` | Publication and teaching surface | Extended verification |

“Required” means required to certify a project cohort. It does not mean that a
user must install every component, or that any implementation has normative
standing. A third-party implementation can conform to OpenBindings without
appearing in a project cohort.

Project-wide authority repositories sit beside those cohort components:

| Repository | Authority | Project-cohort status |
| --- | --- | --- |
| [`openbindings/design`](https://github.com/openbindings/design) | Official brand, visual identity, product experience, accessibility presentation, design tokens, and cross-surface adoption evidence | Not a cohort component |
| `openbindings/project` | Cross-repository integration policy, release cohorts, and coordination | Hosts cohort records; not a component |

Design decisions remain owned by `openbindings/design`, even when they affect
Web, Elements, workbench, OAuth, or CLI presentation. This repository may
coordinate the order and exact consumer commits, but it does not acquire Design
authority or make Design release-coupled to a specification cohort.

## Cohorts

`cohorts/<specification-line>/next.json` is the mutable candidate used while a
cohort is being assembled. A verified cohort is copied to an immutable file
named `<line>-r<number>.json`, for example `cohorts/0.2/0.2-r1.json`.

The cohort revision is independent of every component version:

```text
OpenBindings cohort 0.2-r3
  specification       0.2.1
  Go SDK               0.4.2
  TypeScript SDK       0.5.0
  ob CLI               0.8.4
```

A later CLI release does not require a new cohort. A new cohort is recorded
only when the project chooses to update its recommended, verified combination.
See [`policies/release-policy.md`](policies/release-policy.md).

## Validation modes

The integration workflow has two modes:

1. **Cohort mode** checks out the full commit SHA recorded for every
   component. Only this mode can produce release evidence.
2. **Heads mode** resolves the development branches in `repositories.json`.
   It is a moving-target drift detector and can never certify a release.

Both modes run the required cohort lanes by default. Elements and the website
are extended verification lanes and are enabled explicitly with the workflow's
`include_extended` input. A push from either extended repository still checks
its own lane without enabling all extended work for every core change.

Component repositories can call the reusable workflow on a push or release and
override their own commit while leaving the other components pinned to the
candidate cohort. The scheduled workflow runs heads mode weekly as a safety net
for missed events and environmental drift. It never publishes anything.

After this repository exists on GitHub, a relevant component can add this job
to its push workflow without a cross-repository token:

```yaml
project-integration:
  if: github.event_name == 'push'
  uses: openbindings/project/.github/workflows/integration.yml@main
  with:
    source_repository: ${{ github.repository }}
    source_sha: ${{ github.sha }}
```

The reusable workflow selects only the affected downstream lanes. Add these
callers after the project repository and its `main` workflow exist; adding them
before that would make otherwise healthy component CI depend on a nonexistent
remote. `repository_dispatch` is also accepted for installations that already
have a GitHub App or appropriately scoped token, but it is not required.

## Ordinary work

- Release a local CLI, SDK, Elements, or website change from its own
  repository. Do not update this repository merely because a component
  released.
- Develop brand and product-experience decisions through the evidence,
  canonicalization, consumer-adoption, and verification loop in
  [`openbindings/design`](https://github.com/openbindings/design). Update this
  repository only when the work also changes cross-repository integration or
  coordination policy.
- Use the component repository's CI for ordinary changes.
- Trigger project integration when a change can affect another repository or
  the component is a candidate for the recommended cohort.
- Update `cohorts/0.2/next.json` when assembling the next verified cohort.
- Promote `next.json` to a numbered immutable cohort only after the complete
  cohort-mode workflow is green and a maintainer approves the promotion.

The change-impact and compatibility rules are in
[`policies/compatibility-policy.md`](policies/compatibility-policy.md).

The pre-release, working-branch-only agent loop is in
[`policies/development-loop.md`](policies/development-loop.md). Its current
branch and pull-request routing is recorded in [`working-loop.json`](working-loop.json).
Run `npm run loop` to print safe actions and the next human-decision boundary.

## Local checks

The repository has no runtime dependencies:

```bash
npm test
```

To inspect the exact refs selected by a cohort:

```bash
node scripts/resolve-cohort.mjs --cohort cohorts/0.2/next.json
```

No command in this repository tags, publishes, deploys, or modifies a
component repository.
