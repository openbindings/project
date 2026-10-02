# Foundation audit repairs (2026-10-02)

Four findings from the core foundation audit were repaired on the selected
integration branches: supplied schema root identity, the interpretation of
reported conformance conclusions, adjacent draft interface alignment, and
operation-name preparation scaling. The mutable candidate records the actual
post-squash commits. Component versions and release states are unchanged.

The conformance clarification preserves optional positive reporting. Complete
supplied evidence determines the meaning of any reported conclusion; withholding
a positive report does not make that evidence incomplete. The SDK already
computed this conclusion correctly; both corpus adapters now enforce it.

The interface migration covers all eight current documents and their current
fixtures. Kind-owned content retains the distinction between absence and null.
Interface-owned synthesis authoring vocabulary remains distinct from core
fields. Generic transforms and operation-level idempotency are no longer
presented as core mechanics. Behavioral promises remain in the contracts.

Go hosted CI passes vet and race tests in the root and optional evaluator
modules. All eight migrated interfaces conform under the Go core, all 45 value
contracts compile, and 227 embedded current fixture documents conform. Interface
CI passes. The exact pinned reference runner reports 395 cases: 385 PASS, eight
declared OMITTED, two ADVISORY, and no failures or reconciliation problems.
The comparator retains an empty failure list and unchanged omission signatures.

The audit's future-major support-line finding remains open at the user's
request. Current `0.2.x` behavior is unaffected. Supporting a specification
line is distinct from an SDK package version: core specifies major.minor lines
after 1.0 too, while Go's future-major path still assumes major-wide support.

The existing GraphQL and TypeScript binding-conformance failures remain visible
under their recorded baseline disposition. The earlier whole-candidate run is
still not evidence of a verified integration: private runtime checkouts and
legacy format-module expectations require separate work. TypeScript parity
with the rebuilt core is pending. No tag, publication, deployment or verified
cohort promotion is included in this repair.

## Landing identities

| Change | Pull request | Squash commit |
| --- | --- | --- |
| Conclusion clarification | [spec #136](https://github.com/openbindings/spec/pull/136) | `04a84131295dc8c305b4f048d2e129f84fb023de` |
| Draft interface alignment | [interfaces #37](https://github.com/openbindings/interfaces/pull/37) | `d5ec1e29e9a50fc4d8e74a414c633c0da9e544d1` |
| Go root identity, conclusion adapter and preparation | [Go #139](https://github.com/openbindings/openbindings-go/pull/139) | `3b215fee9d09c88eb7c29d91c26c68f75ed0a904` |
| Pinned reference runner | [spec #137](https://github.com/openbindings/spec/pull/137) | `df5572ce9f87945ae4ecdb40b43afb08f144f3a0` |

The Go core applies the text of spec `04a84131295dc8c305b4f048d2e129f84fb023de`,
whose SHA256 is `afaa04552f5330db6baa13deeb0516d8df0698ae57be26301e2f4bdd341dc1b5`.
The structural schema is unchanged. The final runner pin names the landed Go
commit above and retains the same eight omission signatures.

Hosted evidence: [Go CI](https://github.com/openbindings/openbindings-go/actions/runs/37046219207),
[interfaces CI](https://github.com/openbindings/interfaces/actions/runs/37045302492),
[spec clarification CI](https://github.com/openbindings/spec/actions/runs/37045132726),
and [runner CI](https://github.com/openbindings/spec/actions/runs/37046734713).
Both spec runs preserve exactly the baseline's 131 GraphQL failure headings
and 74 occurrences of the TypeScript introspection-error signature.
