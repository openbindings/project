# OpenAPI development-line landing — 2026-09-06

Status: **landing complete; exact core and Elements gates passed; not a verified cohort or release**.

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

## Confirmed development-line landings

| Repository | Actual squash commit | Evidence |
| --- | --- | --- |
| openapi-client | `414124b65855ac4c908e1a3967422dd1073f9c63` | PR #38: all four Go/TypeScript component checks passed. |
| spec | `63bba23885b5f8adc4d838f6547211c6b895d016` | PR #111: validation, authority checks, and all Go/TypeScript conformance lanes passed. |
| openbindings-go | `402b01538ee55064bd15ffb6afd538435b51d4b2` | PR #108: all nine component lanes passed against the landed native client and corrected corpus. |
| openbindings-ts | `83f58c006f132bfae1133df4fc5a97b108d0f3ff` | PR #107: complete component CI passed after the corrected corpus landed. |
| ob | `5ef56244afee7393e9451007bd7d7ef2d211d4b0` | PR #43: build, vet, race/conformance tests, and executable/cross-surface journeys passed against the landed SDK. |
| ob (selector-display asset follow-up) | `d10c0c02228d07d1ff81861015970c34a15c8669` | PR #44: all component checks passed. |
| elements | `eff9aa9634f294dd08f84dc2b32b60e4a832dcde` | PR #8: all component checks passed after the approved conflict resolution and test/build setup repairs. |
| ob (non-string guard asset) | `74dc6abe4543b881c47f4f765089097fec7c9964` | PR #45: all component checks passed. |
| elements (non-string guard) | `1bb8255108f218c690687efcf4fa8bc120576bac` | PR #9: all component checks passed, including workbench journeys. |

The merged trees are identical to their respective saved candidates (the final
Elements candidate is `282ce839782d5bcc6354310cc30991cbc021e083`; the final OB
asset candidate is `f6e5bd9bb276d56971b980acc6bfc506eccd907d`).
`next.json` records confirmed landings
only; its candidate status does not assert full extended validation or release
readiness.

## Exact core validation

[Project integration run 34060674537](https://github.com/openbindings/project/actions/runs/34060674537)
passed against project manifest commit
`92b25bb126a1045bacfa855bef75eaa7421900a2`: exact input resolution, all nine Go
lanes, TypeScript SDK and correspondence, OB CLI/runtime race and conformance
tests, executable/cross-surface journeys, and the aggregate result. Subsequent
ledger-only edits do not change that manifest or workflow.

Elements and website lanes were deliberately excluded from that initial run
and are not claimed as passing in that evidence. The approved Elements
resolution below supersedes the earlier landing blocker. Separate final-pin
validation is required after that landing; the initial core result does not
promote the candidate to a verified cohort.

The preceding run 34060584086 failed before any component testing because the
invocation supplied an abbreviated project commit and checkout treated it as
a ref name. Run 34060674537 corrected that input to the full SHA; no test,
workflow, or component implementation was changed to obtain the passing result.

## Subsequent exact validation

The first completed Elements landing (manifest
`a7b6c633843d29444515e0d182b32e6920a2825c`, Elements `eff9aa9`, OB `d10c0c0`)
passed [exact core integration 34065630445](https://github.com/openbindings/project/actions/runs/34065630445)
and [exact Elements integration 34065631914](https://github.com/openbindings/project/actions/runs/34065631914).
The dedicated Elements invocation supplied an override identical to its manifest
pin, selecting only that extended lane; it did not change the selected source.
Website validation and deployment were excluded. These results are evidence for
those exact revisions, not for subsequent renderer-guard commits.

### Final guarded candidate

Project manifest/workflow commit `212ad5e74ca905d5fb3c736ea3e3d67786ff7e12`
pins final Elements `1bb8255108f218c690687efcf4fa8bc120576bac` and OB
`74dc6abe4543b881c47f4f765089097fec7c9964`. It passed both closing gates:

- [Exact core integration 34066149928](https://github.com/openbindings/project/actions/runs/34066149928):
  all nine Go lanes, TypeScript SDK/correspondence/conformance, OB race and
  executable/cross-surface journeys, and aggregate result.
- [Exact Elements integration 34066150918](https://github.com/openbindings/project/actions/runs/34066150918):
  generated requirements, build/type checks, unit tests, package and import
  verification, browser composition, all embedded workbench journeys, and
  aggregate result. The Elements override again equals its manifest pin.

Subsequent evidence-only edits do not change the selected manifest or workflow.
This closes the Elements landing blocker and the bounded selector correction.
Website validation, broader supported-platform/distribution qualification, and
release promotion remain separate; no published specification or interface
contract was changed, and `next.json` remains a candidate.

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

After native-client landing, the Go SDK's only remaining failure was the three
old corpus expectations (`refusal` versus the corrected `context-required`).
The spec's consumer checks passed against the new native client, allowing the
corpus correction to land before rerunning the SDK. No check was waived and no
temporary dependency override was added.

## Elements decision boundary — resolved by the maintainer

Elements `main` contains selector-renaming commit
`1b455f33943fa3183218358addcf5f324068fdb0`, which is not an ancestor of the tested
candidate. The merge conflicts include `SourceInspection.targets[].selector`:
main permits absence; the candidate requires a string and treats empty string
as the whole-source display. This is not a purely textual conflict.

The maintainer approved retaining the published Source Inspector contract's
required string selector, distinguishing an empty string from a missing or
non-string field, and removing the generic "whole source" inference. This
corrects the Elements projection; it does not alter the Source Inspector
contract, Core, binding specifications, invocation, or context-storage rules.
Saved OBI bindings display an absent selector as "Selector omitted" without
claiming it is valid or assigning it a target. Existing typed Elements callers
that omit inspection selectors must supply the actual inspector output, not an
invented empty value. The known workbench caller already receives the required
field from the SDKs.

Resolution commit `975fd0210d2f960f25ccf97b8d95013a7f0632ce` preserves both main's
selector terminology cleanup and the candidate's diagnostics and invocation-mode
work. Follow-up `667a1a59234e8a3db93e225dd897553815281f61` repairs two objectively
observed qualification-harness defects:

- Clean Elements CI built the SDK facade before its workspace dependencies.
  The build now selects `@openbindings/sdk...` so its four dependencies build
  first. The project Elements lane uses the same corrected selection.
- The late-old-document test used a 700 ms timer that could expire before
  document replacement, allowing the old challenge to interrupt test setup.
  The fixture now proves a request is held and releases it only after replacement;
  its security assertions remain intact. Five repeated cases passed.

Local validation passed: build/type checks, 191 unit tests including required
selector and malformed-runtime-input cases, design assets, 12 packed packages,
browser/SSR imports, 16 browser composition cases, all 34 workbench journeys,
and OB race/conformance tests. No failed lane was suppressed.

The rebuilt embedded asset landed via [ob#44](https://github.com/openbindings/ob/pull/44)
at `d10c0c02228d07d1ff81861015970c34a15c8669` after component CI passed; its tree
matches asset candidate `8d259442df7f348a37915b9d1e8f01ce92a0ecf6`.

A final defensive review reproduced a non-string-selector exception before
diagnostic rendering: `{ "selector": { "toString": null } }` threw while
constructing the row key. A string guard fixes that coercion without changing
valid selectors. Three added object/array cases bring the unit suite to 194;
the failing regression passes after the guard, and all package/import checks,
16 browser cases, and 34 workbench journeys pass locally on that guarded source.
The corresponding embedded asset landed via
[ob#45](https://github.com/openbindings/ob/pull/45) at
`74dc6abe4543b881c47f4f765089097fec7c9964` after complete component CI passed.
The source guard landed via [elements#9](https://github.com/openbindings/elements/pull/9)
at `1bb8255108f218c690687efcf4fa8bc120576bac` after complete component CI passed.

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
