# Compatibility policy

## Separate claims

OpenBindings makes three different kinds of claims. They must not be collapsed
into one version number or one release event.

### Specification compatibility

Each implementation owns and publishes the specification versions it accepts
and the narrower range it has tested. The Go and TypeScript SDKs expose this in
their public version APIs; `ob describe` reports the CLI's effective range.

An implementation version is independent of the specification version. A
release of Go, TypeScript, or `ob` does not imply a specification release, and
a specification release does not imply that an implementation must be
republished.

### Component compatibility

Package manifests own real runtime and build dependencies. For example, `ob`
owns its dependency on the Go SDK, and Elements owns its dependency on the
TypeScript SDK. This repository does not replace package-manager dependency
resolution.

### Verified cohort

A cohort records that exact commits passed the project integration suite. It
is evidence about one tested combination, not a claim that it is the only
compatible combination. Cohorts use full commit SHAs and never branches.

## Change impact

Use these categories in pull requests and release notes:

| Impact | Meaning | Project action |
| --- | --- | --- |
| `local` | Only the component's own behavior or presentation changes | Component CI only |
| `editorial` | Meaning and required behavior are unchanged | Component CI; downstream review only if wording is normative |
| `compatible` | Observable behavior is added or changed without invalidating supported consumers | Run affected integration lanes |
| `cohort` | Compatibility declarations or cross-repository behavior may change | Run the complete candidate-cohort suite |

“Prose-only” does not automatically mean editorial. Normative prose can change
implementation requirements even when no schema changes. When impact cannot be
settled mechanically, validation stops for a maintainer ruling.

## Supported combinations

Passing cohort validation establishes:

- the recorded specification and shared-contract corpora were present;
- both reference SDKs passed those corpora;
- Go and TypeScript correspondence passed;
- `ob` passed its build, race, conformance, and executable journey gates;
- extended components passed the checks selected by the cohort workflow.

It does not establish:

- normative status for a reference implementation;
- compatibility for untested versions or third-party implementations;
- indefinite support for the cohort;
- that every project component must be installed together.

Support duration and maintained specification lines are explicit project
decisions. Until a support policy is published, a cohort is a reproducible test
record rather than an LTS promise.
