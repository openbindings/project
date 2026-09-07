# OpenAPI generation/reporting cleanup landing — 2026-09-07

Status: **component landings complete; candidate refresh; not a release or verified cohort**.

Routing follows `repositories.json` and `working-loop.json`, not a new branch
convention. The accepted cleanup has been squash-merged after component CI:

| Repository | Integration ref | Actual squash commit | PR and component checks |
| --- | --- | --- | --- |
| spec | `release/0.2` | `ba070485d8ae6d79e25a4b31969898ab2adf5c02` | [spec#112](https://github.com/openbindings/spec/pull/112); all ten checks passed, including authority validation and Go/TypeScript conformance. |
| interfaces | `main` | `5060990be0a1e146ed6b6f6f2018825186d8168c` | [interfaces#31](https://github.com/openbindings/interfaces/pull/31); CI validation passed. |

The original spec cleanup commit `5c441ec` was replayed onto the actual
`release/0.2` head as `c00eaa301364871dc9763c3c35fa6d401c81e796` before review.
Interfaces was reviewed at `5970c6ebdcb8ea711c91b97752b80787ac045165`.
The cohort pins use the actual squash commits, not these feature commits.

## Scope and preserved behavior

The four OAS-family documents distinguish required generation soundness from
the generator's choice of operation shape and coverage. They no longer
mandate universal flat generation, exhaustive generation reports, or a public
diagnostic presentation. The Core completeness floor, faithful value
correspondence, required transforms where representations differ, and
applicable loss/verification reporting duties remain intact. Synthesis
reference-strategy evidence is labeled as such; portable requirements are not
silently expanded by one generator's fixtures. The Synthesizer README now
makes that same distinction without changing its interface contract.

This is an approved prepublication relaxation of generation/reporting duties,
not a claim that every edit is editorial. It changes no Core prose or schema,
numeric rule, wire behavior, runtime implementation, authority pin, or
publication inventory. Numeric preservation, rounding, overflow, underflow,
transform admission and evaluator semantics remain undecided follow-up work.

Local evidence for the accepted cleanup included 23 generated-document
structural checks, eight exact JSONata correspondence checks, and 25 negative
checks. The 896 OAS processor scenarios, ten OAS fidelity scenarios, and the
expected outcomes of all 154 OAS synthesis scenarios were preserved. The
landing branch additionally passed the repository's binding-spec verification.
Component CI results are linked above; local witnesses are not presented as
new SDK/runtime implementation tests.

## Candidate and qualification

Only the spec and interfaces commits in `next.json` change from Project main
`ccf78a1414cc4e9f8bf2c1e620c1b98a84dd50c8`. All other component pins,
versions, release states, integration refs, and the `candidate` status remain
unchanged. This preserves the accumulated implementation work recorded in
[openapi-release-path.md](openapi-release-path.md).

## Exact-cohort evidence

[Project integration 34157766484](https://github.com/openbindings/project/actions/runs/34157766484)
ran at Project workflow/manifest commit
`ad352a9b89cd26fa0de230ca165fdcc96b9184ad`, in cohort mode with no component
overrides and `include_extended=true`. Exact input resolution, all nine Go
lanes, TypeScript SDK/correspondence, OB CLI/runtime and executable journeys,
and Elements extended integration passed. Subsequent ledger-only edits do not
change the selected manifest or workflow.

The **overall run failed**, because the website lane could not check out
`openbindings/web`: the central workflow reported `Repository not found`
before any website installation, projection, build or test. Read-only checks
confirmed the repository is private and the unchanged pinned commit
`2c0236404e308c3d732e04c4bf3a9999e558fbb0` exists. This is not a website test
result, nor evidence that the cleanup caused a rendering failure.

Per `policies/development-loop.md`, website validation must use its own caller
context or exact local checkouts, without making the repository public or
introducing a cross-repository secret. The existing private-repository
`project-integration.yml` caller can run the same non-deploying website lane
after this candidate refresh reaches Project main. Its result will be linked
in the [candidate landing PR](https://github.com/openbindings/project/pull/9).
At this ledger revision website qualification remains outstanding; the other
lanes above are actual passing results, not a claim of a fully green workflow.

No release tags, package publication, deployment, numbered cohort, or
promotion to `verified` is part of this landing.
