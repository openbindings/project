# Major.minor specification support (2026-10-02)

The foundation audit's F3 finding is resolved: the Go SDK's support declaration
parser and version decision now retain both major and minor for all release
lines, including after 1.0. Its corpus declaration checks and the independent
spec reference runner use the same definition from core §8.1.

This is alignment with the existing specification, not a specification change.
The shipped support declaration remains `0.2.x`, prereleases still require
explicit support, and the applied text remains spec
`04a84131295dc8c305b4f048d2e129f84fb023de`. No new line is declared supported.
The normative text and structural schema are unchanged.

Regression coverage includes future 1.0, 1.10 and 10.2 declarations, adjacent
minor refusals in both directions, patch and build-metadata handling, explicit
prerelease gates, large version identifiers and malformed declarations.
Temporary Go source overlays also exercised actual initialization and public
version/corpus decisions under those three declarations; each passed.
Core and optional-evaluator vet and race/short suites pass with required
corpus checks, as do the independent runner's controls.

The mutable candidate remains a candidate, with component versions and release
states unchanged. Existing GraphQL/TypeScript binding failures and the
whole-project input/legacy-module failures retain their recorded disposition;
this correction does not qualify the full project for promotion.

## Landing evidence

| Component | Pull request | Squash commit |
| --- | --- | --- |
| Go SDK, release/0.2 | [Go #140](https://github.com/openbindings/openbindings-go/pull/140) | `dd80c142374bae4a5b5b06521ec956f85480332b` |
| Runner and pin, release/0.2 | [spec #138](https://github.com/openbindings/spec/pull/138) | `d70a07f8b34273251ec6723bc83f6ccdfc30beca` |

[Go hosted CI](https://github.com/openbindings/openbindings-go/actions/runs/37062785652)
passed. [Spec hosted CI](https://github.com/openbindings/spec/actions/runs/37063396591)
passed Validate, Authority and the pinned core runner, plus the six other Go
binding jobs. The GraphQL and TypeScript exceptions match the recorded
baseline exactly: 131 GraphQL failure headings and 74 occurrences of the
TypeScript introspection-error signature. The strict runner reports 385 PASS,
eight declared OMITTED and two ADVISORY results, with no failures or
reconciliation problems; the empty failure list and omission signatures are
unchanged.
