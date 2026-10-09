# Verbal-identity inventory

Date: 2026-08-08
Status: exact evidence supporting verbal identity revision 1

This inventory reads committed source at the recorded revisions and current
public GitHub metadata. It distinguishes an official tagline from explanatory,
scenario-specific, normative, and historical language.

## Sources

| Surface | Revision | Source | Observed phrase |
| --- | --- | --- | --- |
| Web metadata and social card | `openbindings/web@5471f3e` | `src/routes/+layout.svelte`, `static/og.svg` | “One interface · limitless bindings” |
| Spec repository introduction | `openbindings/spec@dae2bb2` | `README.md` | “One interface · limitless bindings” plus an explanatory sentence |
| Human-facing CLI help and product description | `openbindings/ob@9b6f1fa` | `internal/cmd/root.go`, `internal/app/ob.obi.json` | “openbindings: one interface · limitless bindings” and “Portable interfaces, flexible bindings – the ob command-line tool” |
| Go SDK introduction | `openbindings/openbindings-go@440892b` | `README.md` | “one interface, limitless bindings” |
| TypeScript SDK introductions | `openbindings/openbindings-ts@6810546` | `README.md`, `packages/sdk/README.md` | “one interface, limitless bindings” |
| GitHub organization | Live metadata observed 2026-08-08 | Organization profile | “portable interfaces · flexible access” |
| Spec repository description | Live metadata observed 2026-08-08 | GitHub repository metadata | “The OpenBindings specification — one interface, limitless bindings” |

All recorded source paths were clean in isolated worktrees based on the named
revisions. Web and Spec use Wave 0 branches because those branches also repair
the identity assets surrounding the affected copy.

## Semantic comparison

| Content job | Current expressions | Classification | Result |
| --- | --- | --- | --- |
| Official short positioning phrase | “one interface · limitless bindings,” “one interface, limitless bindings,” and “portable interfaces · flexible access” | Accidental drift | Consolidate on one exact tagline |
| Plain-language explanation | “An open standard for describing what a service does separately from how you access it” and longer README explanations | Shared foundation with contextual grammar | Publish a preferred standalone descriptor; permit faithful contextual expansion |
| Product description | “Portable interfaces, flexible bindings – the ob command-line tool” | Surface-owned expression with tagline-like ambiguity | Replace with a concrete description of the CLI's job rather than another slogan |
| Scenario headline | “One interface. Six protocols. Same operations.” and similar teaching headlines | Product-owned expression | Preserve; these communicate concrete local content |
| Definitions of interface and binding | Specification and implementation documentation | External authority | Preserve; route semantic changes to Spec |
| Historical and released wording | Git history, evidence records, immutable snapshots | Historical record | Do not rewrite |

## Constraints and findings

- The project has no canonical wordmark or lockup. Standardizing words must not
  accidentally standardize typography or composition.
- Periods are more portable than a decorative middle dot across terminals,
  metadata, plain text, and assistive technology.
- A short claim must describe openness without implying installed support in
  every implementation.
- Repository introductions need more explanation than a tagline alone; the
  descriptor and locally owned follow-on prose serve that job.
- The official tagline need not appear on every user-facing surface.
