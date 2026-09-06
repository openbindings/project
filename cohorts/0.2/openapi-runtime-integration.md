# OpenAPI runtime integration acceptance ledger

This ledger records the cross-repository stopping gate for the OpenAPI leg of
the OpenBindings 0.2 candidate. It is integration evidence, not semantic
authority. The OpenBindings Core specification and the four exact OpenAPI
binding specifications remain the only portable OpenBindings authorities.

## Accepted dependency direction

```text
four OpenAPI binding specifications
  -> standalone OpenAPI client/provider (TypeScript and Go)
  -> thin OpenBindings OpenAPI adapter
  -> generic OpenBindings prepared-provider SDK
  -> generic ob operation/binding surfaces
  -> protocol-neutral ob start workbench
```

The native clients contain no OpenBindings runtime dependency. The adapters
translate lifecycle, configuration, values, synthesis facts, and coverage; they
do not reimplement OpenAPI behavior. The prepared SDK and CLI invocation paths
select providers by exact advertised capability and treat binding identifiers
and binding keys as opaque strings. A legacy discovery grouping helper remains
a nonblocking follow-up, noted below; this is not a blanket claim that every
historical CLI helper has been migrated.

## Required invariants

1. Invocation and synthesis consume one native, detached, immutable analysis
   revision. No adapter-side declaration planner or OpenAPI executor remains.
2. A prepared provider indexes one immutable OBI revision. Exact realizations
   close lazily and are reused; disposal invalidates retained routes.
3. Self-contained, content-identical embedded JSON sources may reuse one
   executable native client. Remote and externally resolved documents are
   retrieved for each invocation. Changed content creates another revision. Advisory/no-fetch analysis cannot
   poison an executable cache, and every retained cache is bounded.
4. Operation validation stays strict. Human diagnostic evidence is bounded and
   process-local, names only phase and contract location, contains no rejected
   value or protocol/credential evidence, and never changes portable
   `InvocationError.data`.
5. Raw exploration is the published Binding Invoker contract with an exact
   opaque binding selector. It bypasses operation schemas and transforms by
   explicit user choice. Neither CLI nor browser introduces an OpenAPI-specific
   invocation surface.
6. Artifact retrieval and external-schema closure are owned by the native
   OpenAPI provider. Identical hash-locked multi-document cases run through the
   native Go client and both OpenBindings adapters, proving pointer-scoped
   transitive closure and no over-fetch.
7. Generic transitional operation-requirement APIs may remain deprecated for
   compatibility, but receive no new OpenAPI behavior and are not used by the
   accepted OpenAPI adapter/SDK/CLI route.
8. No Core or binding-specification change is implied by caching, diagnostics,
   UI exploration, or provider lifecycle. Any newly discovered semantic gap
   stops here and returns to its lowest owning authority.
9. When more than one complete security alternative survives, including an
   anonymous alternative beside a credentialed one, the native provider does
   not elect by declaration order. It exposes the binding-defined
   `configuration.security` choice, and both adapters preserve that requirement
   without interpreting the opaque binding selector.

## Evidence gate

The candidate stops unless, at one exact cohort of commits:

- the standalone OpenAPI release qualification passes in both languages;
- all portable OpenAPI processor and synthesis scenarios pass through the
  native and adapter surfaces;
- Go and TypeScript SDK conformance, correspondence, package, race, and public
  API checks pass;
- OB unit/integration tests and the local development build pass;
- Elements type, unit, browser, package, requirement-freshness, design, and
  `ob start` journey gates pass;
- project validation passes and this ledger records the exact feature commits; and
- independent cold reviews find no unresolved P0, P1, or P2 defect in semantic
  ownership, abstraction leakage, lifecycle/concurrency, diagnostics safety,
  raw-mode behavior, tests, or documentation.

This feature cohort is recorded here before promotion. The mutable `next.json`
is updated with development-line commits only after the corresponding merges.
Promotion to release preparation branches and an immutable numbered cohort is
a separate stopping-gate decision.

## Exploratory smoke evidence

The current local developer build inspected and synthesized the public PokeAPI
OpenAPI document without a rule violation. Its strict operation route then
reported a bounded output-contract diagnostic for the live service/document
drift at `held_items/*`, while the generic raw Binding Invoker route invoked the
same exact realization successfully and returned Pikachu (`id: 25`). This is a
deliberate split: operation invocation remains contract-strict, and raw
exploration remains explicit, protocol-neutral, and outside the portable error
payload.

## Frozen feature cohort — 2026-09-06

Every component below is on `feat/openapi-runtime-integration`; these are
reviewable development commits, not published releases or merged
development-line heads.

| Repository | Commit |
| --- | --- |
| spec | `62ad87e654405310f9d3bf3e0625da5c46aba8d1` |
| interfaces | `c814756e9143a7dd8b6782478c4cabf91bc3b66b` |
| openapi-client | `3914c0643923ad34e3446b7aeb564d5543067a5b` |
| openbindings-go | `57ce4d9484b5ce6ca989d40cfd6a26370a42becf` |
| openbindings-ts | `c91b47526286fcbe1bb21940702faa9384eff4b5` |
| ob | `16afe494673923230be48e8edfba870ed3065eeb` |
| elements | `729b75dbbcf3f6f6d204f6faf1aa30ef636aa2cd` |

The native client's authority lock still records the release-branch spec
commit plus explicit candidate errata. The three security-choice corpus
corrections are committed in the spec feature branch above. The native lock
can be repinned without errata when that spec change is promoted; this ledger
does not describe a feature commit as an already published authority.

## Repair and verification evidence

The cold-review repairs cover source authority and cache freshness, optional
Web Crypto hashing, server-choice round trips, strict security configuration
shapes, immutable Go provider state, bounded diagnostics with authored schema
locations, validation of custom composition-policy selections, exact opaque-ID
hook dispatch, canonical binding-operation associations, and workbench mode
reflection. Each behavioral repair has direct regression evidence.

- Go race tests: `invoke`, `sdk`, `formats/openapi`, and `formats/usage` pass.
- TypeScript: 3,206 tests pass; one existing suite remains skipped. Full lint,
  build, browser/Worker import checks, ten family correspondence checks, and
  clean-consumer verification for thirteen packed packages pass.
- OB: `GOWORK=off` build and focused race tests for `internal/app`, `cmd/ob`,
  and `internal/server` pass with the exact remote dependency pins. The built
  binary reports OpenBindings 0.2.0 and reproduces the PokeAPI evidence above.
- Elements: build/type checks, 181 unit tests, 16 browser tests, and 23
  `ob start` tests pass. Seven previously suspended acquisition-flow tests
  remain skipped; this is not evidence that those seven flows passed. All five
  separate journey tests pass.
- Project validation and its eleven tests pass. The development-line loop
  explicitly stops before release/cohort promotion.

## Candidate packaging versus publication

Go adapter manifests deliberately retain the future coordinated release
requirements (`openbindings-go v0.2.0`, `openapi-client/go v0.1.0`). Those tags
are not published yet, so a bare standalone checkout test is not a meaningful
published-package gate at this stage. The candidate verifier copies the source
manifests to temporary files, maps future requirements to exact pushed remote
pseudo-versions, disables workspaces, rejects local replacements, tidies the
temporary graph, and then runs readonly race tests and builds. Fixture-building
subprocesses inherit the same graph. It checks both temporary lock immutability
and unchanged checked-in manifests.

The standalone gate passed for both adapters with core
`v0.1.1-0.20260906114906-57ce4d9484b5` and native OpenAPI client
`v0.0.0-20260906104423-3914c0643923`, using the clean spec commit in the frozen
table. It used no workspace or filesystem dependency replacements. The final
Go delta also prevents replacement of a session's consumer, policy, or revision
after construction; alias-isolation and public-field regression tests pass.

Before tagging adapters, the required core and native-client tags must be
public, standalone manifest/sum tidying must be committed, and the existing
post-tag external-consumer gate must pass. Candidate acceptance does not waive
these release requirements.

## Nonblocking follow-ups

- Go prepared-realization identity metadata is still caller-settable, although
  executable behavior and provider lifetime are private. Harden the metadata
  surface separately if stronger read-only parity is desired.
- The legacy CLI `SpecFamily` helper still decomposes publisher identifiers for
  discovery/grouping. Replace it with exact-ID metadata and an opaque fallback;
  current built-in behavior is correct, but this helper should not generalize
  to arbitrary identifiers.
- The TypeScript implementation-parity guide has not caught up with the Go
  guide's prepared-composition rows and narrative.
- Workbench mode reflection has behavioral coverage but lacks a direct
  property-to-attribute assertion.
- Some Go/CLI comments still say "family" or `FormatName` where runtime code
  now uses an exact binding specification or `BindingSpec`.

These are P3 follow-ups, not authorization for another unbounded review loop.

## Final acceptance

The primary implementation review and both independent cold readers ACCEPT
this feature cohort. No unresolved P0, P1, or P2 defect remains in the bounded
review scope. Both cold readers locked the seven exact commits above and
confirmed clean component trees. No specification reopening is required for
the final runtime repairs. This is feature acceptance, not publication approval
or a claim that all possible defects have been eliminated.

The reviewers used different grading strictness; their grades are preserved
separately rather than averaged into a stronger claim.

### Cold implementation review

| Criterion | Grade |
| --- | --- |
| Public native Go/TypeScript API quality | A- |
| Exact behavioral parity | A- |
| Immutable analysis/projection; no adapter planning | A |
| Prepared-provider/exact-realization lifecycle | A |
| Cache bounds, concurrency, disposal, stale safety | A |
| Error/requirement mapping, including security | A |
| Bounded, non-leaking validation diagnostics | A- |
| Generic invocation routing with exact opaque IDs | A- |
| Machine-output stability versus human diagnostics | A |
| Elements raw mode and ob-start self-auth | A- |
| Packaging/browser/race/public-consumer gates | A- |
| Test discrimination | A- |
| Documentation | B+ |

### Cold authority review

| Criterion | Grade |
| --- | --- |
| Core 0.2 / four OpenAPI-spec authority fidelity | A |
| Client → adapter → SDK → CLI/UI dependency direction | A |
| Opaque identifier handling | B |
| Detached analysis, immutable revisions, lifecycle | B |
| Security/server choice semantics | A |
| Diagnostics, caching, raw-exploration boundaries | A |
| Go/TypeScript behavioral parity | B |
| Elements contract fidelity | A |
| Publisher documentation and acceptance evidence | B |

The authority reader's B grades reflect the P3 identity/legacy-helper/docs
follow-ups and the explicit pre-release package limit. Neither reviewer treats
these as a blocker for this bounded feature acceptance.

**Stopping gate:** all feature changes and this ledger are committed and pushed
on `feat/openapi-runtime-integration`. No release-preparation branch merge,
tagging, publication, deployment, `next.json` promotion, or new review cycle is
performed by this pass. Those remain distinct follow-up decisions.
