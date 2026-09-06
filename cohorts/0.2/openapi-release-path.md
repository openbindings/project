# OpenAPI development-line landing — 2026-09-06

Status: **landing in progress; not a verified cohort or release**.

The maintainer requested that the accumulated, tested OpenAPI work enter the
actual 0.2 development path before further iteration. The qualification
branches are now backed up in their owning upstream repositories and have
pull requests against the catalog's declared integration refs. No existing
unrelated pull request is included or superseded by this landing record.

## Routing and saved candidates

| Repository | Declared integration ref | Saved candidate SHA | Landing PR |
| --- | --- | --- | --- |
| spec | `release/0.2` | `62ad87e654405310f9d3bf3e0625da5c46aba8d1` | [spec#111](https://github.com/openbindings/spec/pull/111) |
| openapi-client | `main` | `d609eb58199e2c80ae92d668e2506be9f8c34169` | [openapi-client#38](https://github.com/openbindings/openapi-client/pull/38) |
| openbindings-go | `release/0.2` | `40fa9d86a959167067762c0b83237bb19b0fff2f` | [openbindings-go#108](https://github.com/openbindings/openbindings-go/pull/108) |
| openbindings-ts | `release/0.2` | `c30785f606779b3359033f773e13d3b4a1c44d6d` | [openbindings-ts#107](https://github.com/openbindings/openbindings-ts/pull/107) |
| ob | `release/0.2` | `230b8aa83400c8c2f26042fe13532ff399e5b30f` | [ob#43](https://github.com/openbindings/ob/pull/43) |
| elements | `main` | `148265c431d4aed41e79b4834d9bc6204e79f12d` | [elements#8](https://github.com/openbindings/elements/pull/8) |

The five implementation PRs preserve accumulated runtime integration,
cold-user repairs, and qualification work, not just the final small fix.
The spec PR carries only the already-tested security-choice corpus correction;
it changes no binding or Core prose. Interfaces remains at
`c814756e9143a7dd8b6782478c4cabf91bc3b66b`; the tested AsyncAPI build dependency
remains `54678886c38cfc2a94bb06f4499004600a74473c`. Web is outside this landing.

`repositories.json` and `working-loop.json` remain the authority for routing.
No new branch policy, caller policy, or release coordinator is introduced.
The standalone clients currently have no coordination caller; the existing
working-loop validator does not admit fix PR records for that state, so this
landing ledger records the complete set without changing that policy.

## Safe landing sequence

1. Pass native-client component checks and squash-merge its PR to `main`.
2. Re-run dependent SDK/spec checks against the new upstream client; land each
   on `release/0.2` only when its component checks pass. The corpus correction
   and its consumer expectations must agree; do not suppress a failing lane.
3. After the Go SDK is landed, rerun OB checks against that SDK and land OB.
4. Resolve the Elements selector-API conflict only after the maintainer's
   decision, preserve both streams of intended changes, rebuild embedded OB
   assets, and rerun package/browser checks against the resulting source.
5. Record actual post-squash development-line SHAs in `next.json`, preserving
   its `candidate` status, component versions, and releaseState values. Do not
   substitute the pre-squash branch SHAs for actual line-head commits.
6. Run exact-cohort validation, including the affected extended Elements lane.
   Record remaining website/platform/distribution limits separately.

The first Go adapter CI attempt used the old client `main` and failed because
`ErrorPresent` did not exist there. The first OB CI attempt used the old Go SDK
and failed on the missing diagnostics, recognition, and runtime-support APIs.
Those are concrete dependency-order failures; rerun them after upstream landing,
not by weakening checks or declaring the old graph compatible.

## Elements decision boundary

Elements `main` contains selector-renaming commit
`1b455f33943fa3183218358addcf5f324068fdb0`, which is not an ancestor of the tested
candidate. The merge conflicts include `SourceInspection.targets[].selector`:
main permits absence; the candidate requires a string and treats empty string
as the whole-source display. This is not a purely textual conflict.

The landing is paused at that conflict pending the maintainer's choice. No
branch was reset, no conflict side was silently selected, and no shared
integration ref was changed. The original tested Elements candidate remains
available at the saved upstream branch and SHA above.

## Evidence and honest qualification scope

The candidate passed complete native qualification, 896 processor scenarios,
Go native/core SDK/adapter/OB race suites, 3,330 TS SDK tests, installed local
tarball consumers, and all 34 workbench tests. Seven previously suspended
workbench cases now execute. The approved additive Go `ErrorPresent` repair
preserves absent versus JSON-null failure data across all four OAS editions;
the native Swagger 2.0 metadata/replay projection was corrected too.

Two cold readers found concrete issues during qualification. Bounded closure
accepted the numeric, response-bound/cancellation, retry, TypeScript failure
data, SDK quickstart, and UI repairs. The subsequent Go presence repair passed
its new four-edition native/adapter cases and affected full suites. Historical
cold-review acceptance is not represented as review of later commits.

This is stronger implementation evidence, not a full release-readiness claim.
Remaining final qualification includes exact final-revision review, explicit
legacy-workspace/clean-process checks, supported-platform runtime evidence,
bounded live corroboration on the final candidate, and real remote/published
consumer resolution. Local replacement and tarball installation are not remote
distribution proof. No tags, package publication, website deployment, numbered
cohort, or verified status are authorized by this landing.

The preceding integration and repair records remain available in
[openapi-runtime-integration.md](openapi-runtime-integration.md) and
[openapi-cold-user-repair.md](openapi-cold-user-repair.md). Their snapshots and
limitations are historical and are not silently overwritten by newer grades.
