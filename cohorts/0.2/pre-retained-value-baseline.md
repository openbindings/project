# Existing-work baseline before retained-value development

Status: landing in progress. The retained-value implementation has not started.
This is a recovery and integration record, not a 0.2 release, a verified cohort,
or approval of unfinished binding specifications.

The maintainer requested that existing work be landed or explicitly preserved
before the retained-value development loop. OpenAPI is the first binding family
to be considered completed. AsyncAPI remains deferred for the maintainer to
return to; gRPC specification work remains preserved and unaccepted.

## What is recorded

[the work ledger](../../records/pre-retained-value-work-ledger-2026-09-10.json) records actual integration heads, preserved
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

## Validation still to complete

The CLI candidate uses merged SDK and native-client revisions, exact merged
Elements tests, and rebuilt embedded assets. Its final five-platform run must
pass, including all 36 workbench tests, five journeys, the unchanged 400 ms
first-invocation gate, and bounded public-artifact corroboration. The earlier
561 ms browser result remains a failure until new evidence supersedes it.

After CLI landing, record its actual squash SHA, resolve the full candidate,
and run exact core and extended validation. Keep website validation separate
from deployment. A passing component check or local timing measurement alone
does not establish whole-stack readiness.

Historical heldout/acquisition evidence gaps in earlier OpenAPI reports remain
historical gaps. A later run must not be presented as a previously sealed corpus.

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
