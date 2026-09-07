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

Exact-cohort integration evidence will be recorded below after the candidate
is checked with the existing workflow, including the extended Elements and
website build/test lanes. Those lanes do not deploy the website. Until that
evidence is recorded, this ledger claims component CI only.

No release tags, package publication, deployment, numbered cohort, or
promotion to `verified` is part of this landing.
