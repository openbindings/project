> Historical record preserved before retained-value development. Its candidate, limits, and status describe that earlier run. Current landing status is in [the baseline record](../../cohorts/0.2/pre-retained-value-baseline.md).

# Bounded OpenAPI implementation qualification loop

Design date: 2026-09-06. Status: **decision-gated repair completed; final qualification pending**.

Execution record: `ob-pj/audit/openapi-qualification-2026-09-06/qualification.md`.
Local repairs and independent closure are recorded there; the complete final
acceptance gate has not passed. The user subsequently approved Go's additive
failure-presence API repair. Its implementation and verification are recorded in
`ob-pj/audit/openapi-qualification-2026-09-06/go-failure-presence.md`.

## 1. Objective and stopping point

Qualify one exact OpenAPI implementation candidate, from independently usable
Go/TypeScript native clients through the OpenBindings adapters and SDKs to OB
and its embedded workbench. Establish that supported behavior works outside the
development workspace, failure and recovery are safe, and a cold consumer can
use the documented surfaces. Repair only demonstrated in-scope defects.

This is one qualification loop, not a new architecture program. It ends with
an evidence-backed decision and a reviewable set of local commits. It does not
merge, push, tag, publish, deploy, install globally, promote a numbered cohort,
or alter the project's mutable release candidate manifest.

Two decisions must be reported separately:

1. **Implementation candidate qualification:** correctness, integration,
   safety, consumer usability, and candidate package construction.
2. **Distribution qualification:** exact candidates resolve outside local
   source replacements; subsequently, the actual published versions resolve
   to the accepted code. Unpublished tags are not an implementation defect.

A green source or local-replacement test is never reported as green remote
installation. Missing remote access or unpublished commits must remain visible.

## 2. Fixed scope and permitted changes

In scope: OpenAPI native clients/providers, OpenAPI adapters, generic SDK code
actually traversed by this integration, OB composition/authoring/invocation,
embedded workbench, package manifests, relevant documentation, and tests.

Fixed authorities: Core 0.2.0, the four exact OAS binding specifications,
published Invoker/Synthesizer contracts, portable frames and error payloads,
Document Store and context-storage contracts, and opaque identifier semantics.
Strict operation validation and deliberate exact-binding raw invocation stay
distinct. Native clients remain usable without an OpenBindings runtime.

Permitted repairs include incorrect implementation behavior, missing regression
coverage, package exports/dependency wiring, stale generated assets, misleading
documentation, and test harness mistakes. Each must have a concrete failing
case and a lowest owning layer. New authority helpers or API changes are not
automatically acceptable merely because a snapshot can be regenerated.

Out of scope: new protocols, generalized registries, new SDK abstractions,
credential-store redesign, performance programs, broad API redesign, a new
release coordinator, and unrelated P3 cleanup. Existing unrelated changes are
preserved. Cross-family tests detect regressions; they do not authorize a
parallel repair campaign for another protocol.

Stop for a ruling if a fix requires a normative change, public contract/API
redesign, credential trust-policy expansion, new persistent data behavior,
dependency-ownership change, or altered strict/raw semantics. Record the
smallest counterexample and alternatives; do not improvise around the boundary.

## 3. Station A — freeze and inspect the candidate

Start from the repair ledger, not whichever branches happen to be newest:

| Component | Initial candidate commit |
| --- | --- |
| spec, unchanged authority input | `62ad87e654405310f9d3bf3e0625da5c46aba8d1` |
| interfaces, unchanged contract input | `c814756e9143a7dd8b6782478c4cabf91bc3b66b` |
| openapi-client | `76618c75fe3dea6002b9b5f7597e9cf2414d5760` |
| openbindings-go | `74534a19755438ee895e5e1763dcdea47fc4df48` |
| openbindings-ts | `2fbc3011cff7c9ea4236770269f9d22286d1cf1c` |
| elements | `c7eff9a64b798fd64fa2bc88675206c0eddfd2ce` |
| ob | `c271f9f17c2cd7a574c38ff14562b93b2b32271a` |
| project, evidence baseline | `a99ee83ff4902abca2f68a85040346243815288a` |

Execution requirements:

- Resolve these SHAs and preserve any subsequent user work. Create isolated
  candidate checkouts; use `codex/openapi-qualification` for repair branches
  where available, without overwriting an existing branch of that name.
- Record all additional dependencies actually selected, including non-OpenAPI
  providers needed to build OB. Keep them fixed; do not silently substitute
  the current project-wide `next.json`, which describes a different cohort.
- Record toolchain versions, OS/architecture, package manager lockfiles, corpus
  hashes, dependency graph, and generated-asset hashes. Check remote commit
  availability read-only; never invent pseudo-versions from an abbreviated SHA.
- Compare the native authority lock and the adapter corpus with the selected
  spec commit. Inventory differences and their existing authority before
  testing; do not silently repin, overlay, or edit normative scenarios.
- A workspace's permission to resolve local dependencies is useful for source
  tests, but must be explicit and separate from distribution evidence.

Output: one local qualification record containing the exact revision set,
required-check inventory, initial availability limits, and evidence locations.
No new project-wide graph or release-manifest schema is needed.

## 4. Station B — account for existing coverage

Review the seven tests marked `OPEN_FLOW_SUSPENDED` individually. Their marker
refers to the retired Open UI, not an approved exclusion from current behavior.

| Suspended intent | Required disposition |
| --- | --- |
| Raw API acquisition and invocation | Map to the new acquisition journey and prove equivalence |
| Focused target-authentication fields | Map to the new challenge tests; retain preflight assertions where promised |
| Local/target credential separation | Map to receipt-based isolation tests, including unrelated targets |
| Malformed acquisition leaves current document intact | Restore against current acquisition controls unless a passing equivalent exists |
| Multi-binding choice and operation graph | Preserve the currently authorized explicit/preference semantics; do not revive stale expectations |
| Form-input invocation | Restore or identify a passing equivalent through the supported UI |
| Failed resolution is recoverable | Restore or identify equivalent recovery assertions |

Each row gets its old test identifier, current replacement/assertions, and one
of PASS, REPAIR REQUIRED, or OUTSIDE CLAIM WITH RATIONALE. A relevant supported
flow cannot be waived merely to achieve green. Old superseded tests may be
retired only after replacement coverage is demonstrated and recorded.

Apply the same rule to the skipped TypeScript SDK file and all corpus-dependent
skips. Set `OB_CORPUS_REQUIRED=1`, `OB_SPEC_CORPUS`, and the applicable
`OB_INTERFACES_CORPUS` to the frozen checkouts. Verify discovered scenario IDs
and counts against the actual authority inventory; a zero-test or silently
skipped suite is not a pass. Earlier counts are a cross-check, not a reason to
ignore new or missing inventory.

## 5. Station C — mechanical and consumer qualification

Reuse the checked-in gates. Invoke publishing-free build/test paths only, and
inspect scripts before execution for mutation, dependency fallback, or skips.

| Layer | Required evidence |
| --- | --- |
| Native client | `pnpm qualify:release`; authority/corpus; full Go race suite; TS tests/lint/build; API snapshot and dependency boundaries; browser packaging; installed ESM/CommonJS/types |
| Go adapter and SDK | Required processor/synthesis/interface corpora, shared numeric vectors, full relevant module race tests and vet, prepared-provider lifecycle/identity regressions, existing candidate-consumer verifier |
| TS adapter and SDK | Required corpora; `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm conformance`, `pnpm correspondence`, `pnpm pack:verify`; browser/Worker imports; installed adapter/SDK smoke |
| OB | Full race-enabled tests, build, frozen dependency graph, CLI help/examples, exact embedded asset provenance, installer smoke directed only into disposable output/bin paths |
| Elements | Unit/type/build, public-element browser tests, `test:ob-start`, `test:journeys`, packed packages, browser/SSR imports, existing applicable requirement/design checks |
| Coordination | Project tests, evidence consistency, source/lockfile integrity; no candidate promotion |

The native repository's current Go clean-consumer test disables workspaces but
still replaces the module with a local directory. Keep that useful API test;
explicitly classify it as local-source consumer evidence, not remote resolution.

For the independent consumer lane:

- TS: pack the selected candidate artifacts; install them into empty projects
  without workspace links. Test the native package independently, then the
  adapters/SDK combination, ESM and CommonJS where advertised, declarations,
  browser/Worker entry points where supported, and exact package contents.
- Go: use exact remotely available candidate revisions, `GOWORK=off`, readonly
  dependency graphs, isolated caches, and no filesystem replacements. The
  existing `openbindings-go/scripts/verify-openapi-candidate.sh` maps future
  requirements to exact remote pseudo-versions in temporary manifests. Extend
  its evidence to the standalone client and actual OB consumer as needed;
  retain the checked-in future release requirements until separately authorized.
- Assert actual selected versions/revisions, not merely process exit zero.
  Child builds must inherit the same graph. Reject accidental resolution of an
  older release or a source tree outside the frozen candidate.
- If candidate commits are not remotely available, finish independent local
  work and mark remote verification NOT RUN / AUTHORIZATION REQUIRED. Do not
  push implicitly, manufacture release tags, invent a registry, or classify
  another local replacement as remote qualification.

The initial candidate lane can pack future-version TS artifacts locally without
publishing them. Published-version install verification is a separate final
distribution condition and cannot be completed before those versions exist.

Runtime/platform claims follow the checked-in support declarations. OB currently
builds Linux and macOS amd64/arm64 and Windows amd64. Build the advertised targets
without publication; cross-compilation is not a runtime test. Obtain existing
supported CI/runtime evidence where available and explicitly mark unavailable
platform runs rather than claiming the current Mac proves all environments.

## 6. Station D — bounded real-world and adversarial journeys

Use one deterministic fixture set as the mandatory oracle and a small public
smoke set as corroboration. Reuse the cold-user runners and test helpers.

### Mandatory deterministic cases

1. All four editions: acquire, recognize, synthesize, validate, select operation,
   and strictly invoke ordinary strings, integers, decimals, and booleans through
   the applicable layers. Assert actual HTTP destination, serialization, result,
   and absence of dispatch on pre-dispatch refusal. Compare common Go/TS cases.
2. Source identity: embedded content plus base; relative server and transitive
   references; equal/changed outputLocation; source revision changes; missing
   external resources; conflicting/ambiguous format claims; non-artifact HTTP
   services remain detectable. Avoid reparsing OAS in the generic host.
3. Context: missing requirements, explicit alternatives and enum choices,
   multiple challenges, same-scope durable retries, changed scopes, one-shot
   consumption, finite retry/no-progress behavior, concurrent sessions,
   document/binding/mode changes, stale challenges, and backend-token separation.
4. Strict/raw: bad input refuses before dispatch; output mismatch reports the
   safe phase/path; raw requires a deliberate mode and exact binding; merely
   selecting raw does not dispatch. No automatic replay after output failure,
   since the original operation may already have had effects.
5. Diagnostics: authentication, value/credential redaction, bounded retention,
   expiry, duplicate identifiers, single-read behavior, stale/concurrent
   attribution, and unavailable diagnostics leaving portable outcomes intact.
6. Native operational safety: verify existing regressions for redirects,
   credential confinement, malformed headers, reference retrieval restrictions,
   cancellation, output limits/backpressure, terminal outcomes and cleanup.
   Exercise representative cases through the adapter/host, not every corpus
   scenario through every UI combination. Use local side-effect counters for
   retry tests; do not mutate public services.

Tests must name the guarantee and a failing counterexample. Add missing checks
where needed; do not duplicate passing coverage to inflate counts.

### Clean-start and upgrade

Use fresh browser contexts and disposable sentinel credentials. Use the
existing Go context-directory seam for isolated in-process tests; separately
exercise the actual CLI in an available isolated OS/container environment with
fresh normal configuration. Do not inspect, rewrite, or clear the user's real
configuration; do not repurpose HOME or introduce a new public configuration
switch solely to make the test convenient. If no suitable process environment
is available, record the missing binary-level clean-start proof.

Seed a legacy workspace fixture containing a sentinel credential. Verify
restoration retains the document but does not replay or prefill unscoped
authority; a new save contains null context; reload and another target remain
safe. Explain that old browser storage and backups are not securely erased.

Default within this loop: document safe non-replay and existing manual cleanup
options, if verified. Do not add automatic deletion or a new persistent-store
migration without approval. If sensitive residue requires a new remediation
mechanism for the promised upgrade posture, raise that explicit decision.

### Public corroboration

- PokeAPI: import through CLI and `ob start`; strict numeric pagination;
  deliberately observed output drift with safe diagnostics; explicit raw call.
- Open-Meteo: synthesize; explicit public server selection; numeric parameters.
- Petstore: synthesis/base preservation. Service health is not our pass oracle.
- Invalid httpbin and a missing URL: actual document/retrieval failures remain
  visible and are not repaired or bypassed silently.

Public traffic is GET-only and bounded. Record URL, time, retrieved hashes,
generated OBI, assertions, exit status and sanitized outputs. Pin deterministic
fixtures independently. An upstream outage may make the live result
INCONCLUSIVE, but is not an implementation failure if the controlled equivalent
passes. It never licenses loosening validation or claiming live success.

## 7. Station E — independent cold reviews

After the mechanical candidate is stable, run two independent read-only agents
alongside the primary agent's final cross-layer review. No delegation is started
by this design document itself; reviewers are part of executing the loop.

- Reader A: authority alignment, boundaries, Go/TS parity, context/credential
  safety, redirects, diagnostics, immutability and lifecycle.
- Reader B: installed-consumer experience, package contents/dependencies,
  cold CLI/workbench workflows, test-gap accounting, upgrade behavior, and
  documentation accuracy.
- Primary: reconcile findings, reproduce them, assign the lowest owner, and
  audit the complete evidence/revision match. Only the primary integrates fixes.

Give each reader the exact SHAs, authorities, supported claims, commands,
isolated evidence directory, and rubric. Do not provide prior acceptance grades,
desired verdicts, or the implementing agent's reassuring narrative. Let them
inspect implementation and execute bounded local checks. They must not mutate
product code, contact public mutation endpoints, or broaden the scope.

Each report requires: reviewed scope and exclusions; independent commands;
finding location, reproduction, expected behavior and authority; severity;
suggested owning layer; and ACCEPT / REVISE / INSUFFICIENT EVIDENCE.

Grade authority fidelity, architectural separation, parity, security/isolation,
lifecycle/resource behavior, package portability, DX/recovery, and evidence/docs.
Use A through F or NOT ASSESSED with reasons. Grades summarize evidence; neither
an average nor a desired letter grade overrides a material defect or missing
mandatory check. Independence here means fresh agents, not a claim of separate
model families or an independent human audit.

## 8. Repair cycle and evidence invalidation

For each finding: reproduce -> classify -> assign lowest owner -> add a
discriminating regression -> make the smallest repair -> run focused checks ->
run affected downstream checks -> obtain reviewer closure.

Classification:

- P0/P1: critical/high-impact safety, integrity, or supported-behavior failure.
- P2: reproducible material correctness, supported usability or packaging defect.
- P3: nonblocking cleanup with no unsupported correctness/security claim.
- Evidence gap: NOT RUN or INCONCLUSIVE, never disguised as a low-severity bug.
- Normative/design decision: NEEDS DECISION; no unilateral workaround.

Every finding stays in one ledger until resolved, explicitly deferred as P3,
or shown not to be a defect with evidence. Reviewer disagreement is resolved by
reproduction and authority, not votes or averaging. Unresolved material
disagreement prevents acceptance.

Batch independent fixes. Maximum three repair batches after the initial
qualification/review pass; after that, stop with unresolved findings and a
proposed next decision. This is a cost boundary, not permission to accept a
failing candidate. Do not repeatedly restart whole cold reviews after tiny edits.

Evidence follows the dependency chain: native changes invalidate affected
adapter/SDK/host evidence; adapter changes invalidate its SDK/host consumers;
SDK changes invalidate affected CLI/workbench behavior; workbench changes
require rebuilding OB's embedded assets and retesting that binary. Package or
lockfile changes invalidate clean-consumer evidence. Normative changes stop
the loop. Documentation-only changes require claims/example review.

After the last repair, freeze new commits, rebuild the deliverables and run one
final complete mandatory gate on that revision set. Readers review the final
delta and retain their acceptance only for those exact bytes. No post-review
product edits are smuggled into the accepted revision set.

## 9. Final acceptance and deliverables

**Implementation candidate PASS** requires all mandatory local correctness,
integration, candidate-package, security and cold-workflow checks green; no
unexplained relevant skip; no unresolved P0/P1/P2; both reviews accept; and all
evidence matches the final revisions and artifact hashes. Report any missing
supported-platform or isolated-process check as a qualification limit, not a
completed claim. Full implementation qualification cannot be claimed while a
mandatory claimed-environment check remains unverified.

**Distribution candidate PASS** additionally requires actual exact remote
revision consumption without filesystem replacements. Actual published-tag
verification is a later promotion condition; it cannot be represented as green
before publication.

Allowed final states: QUALIFIED FOR THE RECORDED SCOPE; IMPLEMENTATION PASSED /
DISTRIBUTION PENDING; REVISE with concrete defects; or INCOMPLETE / NEEDS DECISION
with the precise missing evidence or authority. Neither pending remote access
nor exhausting the three-batch limit produces an overall release-ready claim.

Deliver only a compact qualification report, exact revision/artifact manifest,
check and skip-disposition matrix, findings and reviewer reports, sanitized
logs/reproduction commands, and local repair commits where needed. Reuse the
existing project/audit structure. No permanent orchestration service or new
multi-repository development graph is needed.

The handoff separates proven behavior, remaining limitations, optional P3 work,
and release-preparation actions. Merging to declared preparation branches,
pushing candidate commits, updating release manifests, and publishing remain
separate explicit authorizations. No settled specification is reopened merely
because a qualification script or package graph fails.
