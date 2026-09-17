# Standalone value package landing — 2026-09-17

Status: **reviewed packages and tooling landed; mutable candidate, not a release
or verified cohort**.

| Component | Integration ref | Actual squash commit | Evidence |
| --- | --- | --- | --- |
| JSON and JSON Schema | TypeScript `release/0.2` | `c53ef707ca1170c705775532fd30a8d7e87e3e5e` | [TypeScript PR #110](https://github.com/openbindings/openbindings-ts/pull/110); [repository CI](https://github.com/openbindings/openbindings-ts/actions/runs/35258965799) passed. |
| JavaScript JSONata | `main` | `c5f8ef028d97ce88a8c56547a07e20311def0359` | [JSONata PR #3](https://github.com/openbindings/jsonata/pull/3); [all eight qualification jobs](https://github.com/openbindings/jsonata/actions/runs/35258674969) passed. |
| Qualification tooling | Project `main` | `374f06993d6db3885fcd49feddc21afeea76a5d1` | [Project PR #13](https://github.com/openbindings/project/pull/13); Project validation and all 57 tests passed. |

The selected scope is the standalone TypeScript JSON and JSON Schema packages,
JavaScript JSONata, and supporting qualification and coordination tooling. The
broader retained-value SDK/invoker, binding adapters, Go implementation, CLI,
Elements, and website work remains preserved on its existing branches. It is
not included in these package landings. Go sources in the JSONata repository
are unchanged.

The JSON and JSON Schema package sources and JSONata runtime/declarations match
the reviewed `codex/value-api-dx-polish-20260917T1732Z` checkpoint. Scope-specific
landing changes adjust build order, installed-package checks, Node test
conditions, test module identity, and documentation. JSONata's large golden
output fixtures use a bounded ten-second Mocha watchdog after CI demonstrated
runner contention at the default two-second watchdog. Golden output assertions,
evaluator limits, and dedicated resource-limit checks are unchanged.

Local validation additionally passed all 7,061 corpus-enabled TypeScript tests,
full build and lint, packed checks for all 15 packages, release guards, spec
conformance, and all ten Go/TypeScript correspondence families. All 51 checked
runtime artifacts are byte-identical to the earlier standalone qualification.
These results establish package and affected-consumer evidence, not complete
application-stack or cohort certification.

Only the JSONata and TypeScript SHAs change in `next.json` for this landing.
Other component pins, versions, release states, integration refs, and `candidate`
status remain unchanged. The integration workflow now builds the selected
standalone JSON dependency before JSONata, and supplies the exact selected
TypeScript checkout in the runtime qualification matrix. No dependency is
substituted with a moving head.

No tag, package publication, deployment, numbered cohort, or promotion to
`verified` is part of this landing. The package APIs are on their integration
branches; this record does not claim they are published to package registries.
