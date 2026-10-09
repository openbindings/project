# Rust canonical source transition

The maintained SDK source is [openbindings/sdk](https://github.com/openbindings/sdk):
one Rust workspace with optional companions and a TypeScript facade over its Wasm
engine. The [OpenAPI client](https://github.com/openbindings/openapi-client) stays
an independent engine. A future OpenAPI binding adapter may depend on both; the
OpenAPI engine does not depend on OpenBindings.

The normative specification remains independent. SDK core owns document semantics
and explicit evaluation/resource contracts. HTTP discovery and the default
evaluator are optional. Invocation, inspection, synthesis and binding adapters
remain separate optional capabilities as they are implemented. Panjir and `ob`
are consumers with their own SDK/application/CLI boundaries.

## Landed sources

| Source | Canonical main commit | Import review |
| --- | --- | --- |
| SDK | `7a5016d66db150b976fdfd4800f02d4e94f9cf84` | [sdk#1](https://github.com/openbindings/sdk/pull/1) |
| OpenAPI | `0ed7cfca730aa66dcbf04239bca4fc4992f6b119` | [openapi-client#67](https://github.com/openbindings/openapi-client/pull/67) |

Both imports passed Linux, macOS and Windows native CI. SDK Chromium/WebKit and
OpenAPI Chromium/local-workerd probes ran successfully. Fresh local Cargo/npm
archives passed external consumers; these are unpublished artifacts. Original
candidate histories, fixture/evidence packets and pre-transition repositories
have restore-tested private backups. OpenAPI also retains `legacy/pre-rust`.

SDK qualification applies specification commit
`2f7d754dc2da374058cd517064c17e50f7d95d99`; the coordinator verifies its frozen
inputs against that exact source. The candidate's existing `spec` pin is older.
That pin and unrelated Go/TS/CLI/UI/web pins have deliberately not been refreshed
without their affected qualification. A new specification override cannot pass
by replaying an older frozen SDK corpus.

The candidate adds the SDK and updates only the OpenAPI source pin. Component
qualification metadata selects the new Rust lanes. Historical cohorts without
that metadata remain historical. SDK events run Rust and the facade; OpenAPI
events run its Rust foundation and retained legacy consumer lanes. Missing,
skipped, cancelled or failed selected Rust results fail the integration result.
An old successful cohort is not evidence for Rust, and this candidate has not
been promoted to a numbered verified cohort.

Coordinator execution on the landed source pins:

- [SDK and facade run](https://github.com/openbindings/project/actions/runs/37954249819): passed, including applied-spec input comparison, native qualification and both browsers.
- [OpenAPI run](https://github.com/openbindings/project/actions/runs/37954255599): Rust native/package/Chromium/workerd lane passed; overall integration failed. Existing legacy lanes cannot fetch the catalogued JSONata repository, and the Go matrix names `formats/*/go.mod` paths missing from its existing pinned SDK source. These source and catalog mismatches predate the Rust pins. They are retained as blockers to whole-project qualification, not hidden by removing legacy lanes or promoting this candidate.

## Scope and remaining dependency edges

| Active consumer or path | Transition work still required |
| --- | --- |
| `ob` CLI | Replace Go SDK/client/JSONata dependencies; qualify actual commands and runtime jobs. |
| Panjir | Plan its Rust SDK/application and thin CLI; qualify cloud and browser hosts separately. |
| Elements and embedded workbench | Replace the independent TypeScript SDK once required invocation/synthesis/adapter workflows exist. |
| Spec runners and project integration | Replace active Go build/test runners with independently qualified Rust runners before retiring legacy lanes. |
| AsyncAPI and JSONata | Decide supported consumer capabilities, engine/access strategy and a tested no-Go path; cleanup cannot retire features implicitly. |
| Website and package consumers | Align source examples and guidance; publish and deploy only after separate qualification/authorization. |

OpenAPI currently supports exact JSON/OpenAPI 3.1, local protocol references,
preparation and finite JSON/raw invocation through supplied transports. Swagger 2,
other OpenAPI editions, acquisition, production transports, streaming and a
supported TypeScript package remain separate work. Its qualification bridge is
not a product API. Five existing product Clippy style/complexity findings and one
runner style finding remain explicit debt; its CI rejects new warnings.

The Rust-backed `@openbindings/sdk` archive is not the current registry release
and does not yet replace every old TypeScript export. The legacy repositories
are transitional dependencies, not the maintained reference-engine direction.
Their tags, releases, compatibility source and integration lanes remain available.

Before legacy archival, every active dependency must have a tested replacement
or an explicit product retirement decision. Before stabilization, supported APIs
must complete semantic, ergonomic, diagnostic, security, resource, portability,
performance and packaging qualification. Foundation landing is neither full
feature parity nor completed migration.

## Rollback

Revert source/catalog changes through reviewed PRs and restore prior candidate
pins when necessary. Keep repository identities and preservation refs; do not
force-push main or rewrite historical cohorts/tags. No registry release or website
deployment was part of these imports.
