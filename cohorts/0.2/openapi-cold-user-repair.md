# OpenAPI cold-user repair — 2026-09-06

Status: **bounded implementation-repair gate PASS**. This is local development
evidence, not release qualification, promotion, or a new normative ruling.
The prior cold-user audit's known integration failures are repaired. The wider
release gate, including independent review and clean-consumer qualification,
is not claimed by this pass.

## Scope and authority

Core 0.2.0, all four OpenAPI binding specifications, published Invoker contracts,
portable frames/error data, Document Store contracts, and opaque identifiers
are unchanged. No protocol-specific command or input-envelope shape was added.
No global installation, context-store edit, public mutation, tag, publication,
merge, or push was performed. The five implementation repositories and this
ledger are isolated on `codex/openapi-cold-user-repair`.

The narrow host policy selected here is explicit decimal scalar conversion.
It is installed by OB's composition root, not silently made a binding or native
client default. Both adapters expose it as an opt-in helper. The browser's
credential memory policy is private host behavior, not a change to the
published context-storage contract.

## Repairs and owning layers

| Finding | Resolution | Evidence |
| --- | --- | --- |
| Credentials from target A reached unrelated target B | Attempt-owned context; fresh challenge and explicit Apply; exact opaque scope/requirement matching; bounded RAM; no legacy document-wide replay | Real browser receipts verify no cross-target or backend-token leakage; same-document operation isolation; delayed old-document challenge test |
| Numeric/boolean parameters refused on ordinary calls | OB explicitly selects the shared decimal policy; defaults elsewhere remain unchanged | Matching Go/TS vectors; strict synthesized calls across 2.0, 3.0, 3.1, 3.2; live PokeAPI and Open-Meteo |
| Embedded source lost its server/reference base | Preserve provider source identity and analyzed content; honor explicit outputLocation, including an unchanged URL | Four-edition fixture invokes the expected route with embedded content and retained location; Petstore synthesis retains its source location |
| Strict browser failures lacked useful recovery | Authenticated value-free local validation diagnostics; explicit strict/raw mode; raw requires an exact binding selection | Real WebSocket diagnostics tests and browser output-drift/raw-recovery journeys |
| Detection hid invalid-document and retrieval failures | Native recognition is separate from validation; adapter maps exact sibling; CLI preserves useful errors | Invalid httpbin 2.0 reports required path-parameter declaration; missing source reports 404; unknown edition regression |
| Server selection was an unexplained free-text field | Generic schema-enum choice control with typed values; context scope no longer mislabeled API destination | Browser chooses the second server and verifies its receipt |
| Generic refusal/execution errors were unhelpful | Safe protocol-neutral guidance without native error or credential leakage | Existing error tests; manual review of human-only changes |

Review also caught and corrected three implementation regressions within this
loop: document replacement left a surviving tab's Run control stuck; Go rejected
programmatic Swagger 2.0 safe integer floats that TypeScript accepted; eager
artifact recognition could suppress other provider claims or block non-artifact
HTTP services. Dedicated regressions now cover these cases.

Go's integer correction does not relax lexical Draft-04 rules: `json.Number`
spellings `2.0` and `2e0` still refuse. Programmatic safe integral floats match
the TypeScript client's behavior. The authoritative processor corpus remains
green. Neither host can recover a numeric lexeme after a caller has already
discarded it; this pass does not claim otherwise.

## Context and diagnostic safety details

Durable fields may only prefill a fresh exactly matching challenge. Explicit
Apply creates context for that selected invocation attempt. Non-durable values
are consumed by the attempt and not remembered. Retained retry-chain values
do not cross opaque scope changes; retries are bounded to four. Document
replacement/revision, removal of the owning session, and explicit clearing
invalidate relevant state. The local OB session credential remains separate.

New workspace saves write null context; old unscoped records are ignored on
restore. This intentionally trades automatic credential restoration for scoped
authorization. It is **not secure deletion** of previously stored records.

The workbench-only diagnostic endpoint requires existing server authentication.
It stores at most 128 collectors with eight records each, expires entries after
two minutes, refuses duplicate IDs, is single-read and no-store, and discards
empty completed collectors. Only validation phase, sanitized instance pointer,
and keyword are returned. Portable error frames remain code-only. Stale or
ambiguously associated browser diagnostics are dropped rather than attributed
to another invocation. Strict failures never trigger automatic raw dispatch.

## Verification performed

- Native Go: full race-enabled suite passes, including recognition and numeric
  representation tests. Native TypeScript: 2,274 tests passed in the full run;
  opt-in corpus cases were separately required below.
- Authoritative processor corpus: all 896 scenarios pass through both native
  language clients. Authority verification passes at the existing lock
  `ee5291ee5a5a23f7068d8c1d256792274a21167f` (218 processor rules, 76 synthesis
  rules, 154 synthesis scenarios). This pass did not repin the authority.
- Native API snapshot, TypeScript lint/build and architectural boundary checks
  pass. The reviewed Go provider API addition is representation recognition.
- Go adapter: race-enabled suite passes with the spec corpus required. Core Go
  SDK full race-enabled suite passes. Full TypeScript SDK suite: 3,207 passed,
  one pre-existing skipped test file; adapter build passes.
- Shared decimal-vector files are byte-identical, SHA-256
  `765d5be9f2839fa29e0a20f026cfff80aadc583ef90a684389be9f613bb79dc1`.
- OB: full suite and full race-enabled suite pass. Four-edition strict
  synthesis/invocation, provider-detection boundaries, and authenticated
  diagnostic-channel tests pass.
- Elements: 184 unit tests pass, design assets pass, workbench typecheck and
  production build pass. Full local `ob start` browser suite: 27 passed,
  seven pre-existing skips; no failing test was skipped to obtain green.
- Project coordination: 11 tests and manifest validation pass.

The final browser bundle is checked into OB with its matching Elements source.
Public checks use a disposable executable built from the local dependency
workspace, not a newly installed or independently published package set.

## Public cold-workflow replay

The real CLI retrieved and synthesized PokeAPI, Open-Meteo forecast, and Swagger
Petstore, and all three generated OBIs validate. Read-only invocations show:

- PokeAPI `pokemon_list` with `limit:2, offset:2` succeeds strictly.
- First-page `previous:null` remains an output-contract failure; detail output
  also has genuine schema drift. Diagnostics name bounded output paths and
  explain deliberate raw recovery. Raw Pokémon detail succeeds.
- Open-Meteo raw binding invocation succeeds with numeric `forecast_days:1`
  and an explicit public server choice. Strict operation server-choice behavior
  is separately covered by the controlled browser fixture.
- The invalid httpbin document is not silently repaired, and a missing remote
  document reports its retrieval failure. Neither counts as a product failure.

A fresh browser against the actual `ob start` executable also imports live
PokeAPI, succeeds with strict numeric pagination, displays first-page
output-drift diagnostics, and succeeds after an explicit exact-binding raw
selection. No browser invocation implementation was patched to enable this.

## Exact local implementation commits

| Repository | Commit |
| --- | --- |
| spec — unchanged | `62ad87e654405310f9d3bf3e0625da5c46aba8d1` |
| interfaces — unchanged | `c814756e9143a7dd8b6782478c4cabf91bc3b66b` |
| openapi-client | `76618c75fe3dea6002b9b5f7597e9cf2414d5760` |
| openbindings-go | `74534a19755438ee895e5e1763dcdea47fc4df48` |
| openbindings-ts | `2fbc3011cff7c9ea4236770269f9d22286d1cf1c` |
| elements | `c7eff9a64b798fd64fa2bc88675206c0eddfd2ce` |
| ob | `c271f9f17c2cd7a574c38ff14562b93b2b32271a` |

No candidate manifest or development-line head was promoted. The parent
workspace's unrelated changes were preserved.

## Remaining limits and stopping decision

No known reproducible P0/P1/P2 from the bounded cold-user gap list remains open.
Stop the repair loop here; do not broaden it into a contract redesign.

This was the implementing agent's adversarial self-review and cold-workflow
replay, **not an independent reviewer or human usability study**. Seven older
browser skips remain outside this pass. Public tests did not establish healthy
Petstore invocation or live Swagger 2.0/3.2 service coverage; deterministic
fixtures cover those editions. Public sources can change, and their fetched
provenance is evidence of retrieval, not a guarantee that successive upstream
requests returned identical revisions.

Global CLI configuration was not inspected or cleared. Browser contexts were
fresh; authentication-isolation claims rely on disposable local fixtures and
their receipts. Existing persistent credential residue, broader release/package
qualification, independent review, and promotion are not claimed complete.

Local audit evidence and reproducible public runners are in the workspace's
`audit/openapi-cold-user-2026-09-06/` directory. The original negative audit is
retained unchanged; `repair-evidence.tar.gz` records the repair replay, excluding
the disposable binary. The private temporary run directory is
`/private/tmp/ob-cold-repair.34ZO13`.
