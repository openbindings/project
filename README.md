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
[`openbindings/spec`](https://github.com/openbindings/spec). The
[reference SDK](https://github.com/openbindings/sdk), CLI, UI packages, shared
interfaces and website remain independently owned and independently versioned.
Project design sources live in [`design/`](design/) with separate nonnormative
authority.


See [the Rust transition record](cohorts/0.2/rust-transition.md) for source pins,
qualification limits, remaining dependency edges and release gates. Source landing
is separate from package publication, deployment and a verified project cohort.

## Semantic authority and cohort evidence

Repository membership and cohort verification do not create semantic
authority. For any OpenBindings source, the exact binding specification it
names governs its source and binding semantics. That specification decides
whether and on what terms another artifact, protocol, or model is
incorporated; no upstream authority applies automatically.

An implementation may complete behavior that its binding specification leaves
open, but that completion remains implementation-defined. A cohort may prove
that selected implementations work together with that local behavior; it must
not report the behavior as portable meaning of the binding-specification
identifier. The OpenBindings project's own brownfield candidates choose close
upstream deference and require the OBI-B-02 completeness floor before first
publication. Those are project quality and publication policies, not new
authority conferred by a cohort.

## Repository map

[`repositories.json`](repositories.json) is the machine-readable inventory of
repositories that can participate in a verified release cohort. It is not a
complete registry of every OpenBindings authority repository. The cohort
layers are:

| Repository | Role | Project-cohort status |
| --- | --- | --- |
| `openbindings/spec` | Normative core and binding specifications | Required |
| `openbindings/interfaces` | Nonnormative shared contracts and profiles | Required |
| `openbindings/sdk` | Canonical Rust SDK and TypeScript facade | Required Rust checks for candidates selecting it |
| `openbindings/openbindings-go` | Legacy Go SDK; transitional consumers | Required during migration |
| `openbindings/openbindings-ts` | Legacy independent TypeScript SDK; transitional consumers | Required during migration |
| `openbindings/jsonata` | Independently usable JSONata runtime family | Required for runtime-dependent candidates |
| `openbindings/openapi-client` | Standalone OpenAPI invocation client | Required |
| `openbindings/asyncapi-client` | Standalone AsyncAPI invocation client | Required |
| `openbindings/ob` | CLI and runtime | Required |
| `openbindings/elements` | Independently released UI packages | Extended verification |
| `openbindings/web` | Publication and teaching surface | Extended verification |

“Required” means required to certify a project cohort. It does not mean that a
user must install every component, or that any implementation has normative
standing. A third-party implementation can conform to OpenBindings without
appearing in a project cohort.

Runtime-dependent candidates select an exact `jsonata` source commit. Integration
fails closed if that input is missing, dirty or different from the selected SHA.
Runtime changes exercise the SDK/CLI consumers as well as the runtime itself.
Reviewed static findings remain source-bound: raw reports are retained, and any
unreviewed change or scanner failure blocks qualification. Passing this policy
does not mean that the raw reports contain zero findings. Source selection does
not publish a Go tag or npm package, and it does not add numerical rules to Core.

Project-wide authority repositories sit beside those cohort components:

| Repository | Authority | Project-cohort status |
| --- | --- | --- |
| [`project/design`](design/) | Official brand, visual identity, product experience, accessibility presentation, design tokens, and cross-surface adoption evidence | Not a cohort component |
| `openbindings/project` | Cross-repository integration policy, release cohorts, and coordination | Hosts cohort records; not a component |

Design decisions remain owned by the design authority in `design/`, even when they affect
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

## Historical validation modes

The retained integration workflow has two historical modes:

1. **Cohort mode** checks out the full commit SHA recorded for every
   component. Only this mode can produce release evidence.
2. **Heads mode** resolves the development branches in `repositories.json`.
   It is a moving-target drift detector and can never certify a release.

These commands preserve historical qualification; they are not the current
Rust release verifier. Existing legacy dependency failures remain documented
in the transition record. Automatic callers are being retired under the
2026-10-09 [component CI policy](policies/development-loop.md); the weekly
schedule is removed. The callable entry point remains only until existing
callers are removed. Do not add new callers or dispatch integrations.

## Ordinary work

- Release a local CLI, SDK, Elements, or website change from its own
  repository. Do not update this repository merely because a component
  released.
- Develop brand and product-experience decisions through the evidence,
  canonicalization, consumer-adoption, and verification loop in
  [`project/design`](design/). Update this
  repository only when the work also changes cross-repository integration or
  coordination policy.
- Use the component repository's CI for ordinary changes.
- Test an adopting consumer in its own dependency-update PR when a change
  affects it. Do not require an automatic whole-project sweep.
- Update `cohorts/0.2/next.json` when assembling the next verified cohort.
- Promote `next.json` to a numbered immutable cohort only after the complete
  cohort-mode workflow is green and a maintainer approves the promotion.

The change-impact and compatibility rules are in
[`policies/compatibility-policy.md`](policies/compatibility-policy.md).

The component development policy is in
[`policies/development-loop.md`](policies/development-loop.md). Its current
branch and pull-request routing is recorded in [`working-loop.json`](working-loop.json).
Run `npm run loop` to print current branch routing. Its `--historical` option
prints the superseded cohort plan for inspection, not execution.

The [design heuristics](policies/decision-heuristics.md) describe how we make
design decisions across the repositories.

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
