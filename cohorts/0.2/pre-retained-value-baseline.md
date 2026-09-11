# Existing-work baseline before retained-value development

Status: existing-work component baseline complete. Retained-value implementation
starts from this record after it lands.
This is a recovery and integration record, not a 0.2 release, a verified cohort,
or approval of unfinished binding specifications.

The maintainer requested that existing work be landed or explicitly preserved
before the retained-value development loop. OpenAPI is the first binding family
to be considered completed. AsyncAPI remains deferred for the maintainer to
return to; gRPC specification work remains preserved and unaccepted.

## What is recorded

[The work ledger](../../records/pre-retained-value-work-ledger-2026-09-10.json) records actual integration heads, preserved
unfinished branches, the disposition of empty pull requests, and historical
OpenAPI proposals. `next.json` is the mutable candidate selection; versions,
release states, repository visibility, and integration refs retain their values.
The separate ledger records native-client merges because working-loop.json only
accepts fix entries for components with a recorded integration caller.

Before the AsyncAPI deferral was clarified, client PR3 and Go SDK live-test PR111
had merged. These are retained as existing history. They do not complete or
accept the AsyncAPI specification, and the candidate keeps its previous AsyncAPI
client dependency. No additional AsyncAPI completion is a prerequisite here.

The main landing includes the existing OpenAPI corpus/client/SDK work, repairs
for Swagger schema placement and scalar output projection, CLI source/HTTP
correspondence fixes, existing website teaching work, and the workbench's exact
binding identifier import correction. Scope is limited to demonstrated defects
and preserving a recoverable starting point.

## Validation

CLI PR47 is merged at `5bf9d92fc43586ff2fe4cc2fb3948c4031e4f490`.
Its [final five-platform run](https://github.com/openbindings/ob/actions/runs/34558941370)
and [build/race/conformance CI](https://github.com/openbindings/ob/actions/runs/34558941347)
passed. All 36 workbench tests and five journeys passed with zero skips or retries.
First invocation measured 398 ms against the unchanged 400 ms gate; navigation
measured 704 ms against 1,500 ms. These are individual qualification observations,
not a statistical performance guarantee. The earlier 561 ms failure remains
historical evidence; it was followed by a measured native parsing correction.

Public artifact acquisition, workbench import/exploration, and selected PokeAPI,
Open-Meteo and Petstore requests succeeded. Strict PokeAPI validation correctly
refused schema-incompatible nulls; explicit raw access succeeded. Negative
non-artifact and missing-source inputs were rejected. These observations do not
replace normative corpus qualification or fill historical sealed-evidence gaps.

The final website source built locally, passed 145 unit tests and all 27 production
browser tests with zero retries. No deployment occurred.

The [exact core candidate](https://github.com/openbindings/project/actions/runs/34559654148)
and [Elements extended integration](https://github.com/openbindings/project/actions/runs/34559655530)
passed using Project input commit `70be4336d621fc47781270e7822fc1708298b7fe`.
The ledger preserves the complete tested manifest under `qualifiedSelection`,
including the intentionally retained AsyncAPI dependency, so future edits to
`next.json` do not erase this recovery point. Only this prose and the ledger
were completed after qualification; the manifest and execution code are unchanged.
This is permission to begin the already authorized development loop, not a
0.2 release or a statement that its new architecture is implemented.

## Recovery procedure

Start retained-value implementation in isolated branches from the final exact
candidate. Keep existing source and preservation branches reachable. To recover,
create fresh checkouts at the recorded component commits; do not reset a shared
integration ref or overwrite a maintainer's working tree. If later architecture
changes have already merged, revert only their commits in dependency order,
retaining the earlier landing commits listed here.

The originating workspace also has verified Git bundles and hashed archives of
all initially dirty worktrees. Those are local preservation artifacts and are
not published with this record. Never extract them over an active checkout.
