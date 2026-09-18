# Accepted divergences

Deliberate asymmetries across the project's components that are settled
rulings rather than defects. Each entry records the divergence, the reason it
was accepted, and where applicable the condition that would re-open it.

Entries here are not re-litigated without new evidence. The ledger exists
because most of these read as inconsistencies to anyone encountering them
cold: a reviewer, a contributor, or an automated audit will otherwise propose
"fixing" a decision that was made on purpose. Normalizing one of these
silently is a regression.

Add an entry when a cross-component asymmetry is ruled acceptable. Remove one
only when the divergence itself is removed, or when its stated re-open
condition is met and the decision is actually revisited.

## Naming and surface vocabulary

### Go SDK format module paths

The Go SDK's `formats/*` module paths keep their original name rather than
following the `bindingSpec` vocabulary rename. Import-path stability wins:
these are implementation organization, not concept surface.

### ob retains `--format` for output rendering

`ob` keeps a `--format` flag for output rendering. This is a CLI-native
concern. The binding-specification vocabulary applies to the binding concept,
not to how a command renders its results.

### Operation Graph is a binding specification, not a second normative layer

Ruled by Matt, 2026-08-13. Earlier diagrams drew Operation Graph as a second
normative specification beside the core. That elevation was wrong and is
retired.

Operation Graph is normative within its own identifier exactly as every family
is. It is distinctive only in that it defines its own artifact and lives inside
an OBI. Core §6 permits any binding specification both choices, and both are
available to third parties at equal standing. No OBI ever needs it.

Surfaces must not imply it is integral: the web navigation folds it into the
binding-specifications group, and the authority-layering page states the
ruling. Watch for re-elevation in future documentation.

### Incomplete families do not remain as quasi-supported surfaces

The former Workers RPC draft and its implementations were removed rather than
retained. Nothing of it survives beyond changelog history: there is no binding
specification and no SDK package. That is the ruling, and it holds.

GraphQL is the live illustration of the same principle, and its status is
easy to overstate. **`openbindings.graphql@1` is not published.** The
specification's own §1 on `release/0.2` reads "unreleased first-revision
candidate ... the identifier has not been published and this candidate remains
mutable." Both SDKs nonetheless carry implementations (Go
`formats/graphql`, TypeScript `packages/graphql`), so implementation presence
is not evidence of publication here.

A substantially expanded revision exists on `spec` branch
`feat/graphql-binding-family` (23,658 words against 1,415 on `release/0.2`,
restructured into twelve sections adding subscriptions and security
considerations). It is not landed. Do not describe this family as published
until the identifier is minted under OBI-B-01.

## Implementation idiom

### Classification and HTTP-error helper surfaces

The two SDKs expose this surface differently, by idiom. Go keeps
`categoryForCode`, `codeCategory`, `codeEffectsDefault`, and `httpErrorEffects`
package-private and exports a single bundling `HTTPError()` constructor, plus
`HTTPStatus` and `HTTPResponseBody` accessors. TypeScript exports the
primitives (`categoryForCode`, `defaultEffectsForCode`, `CODE_CATEGORY`,
`httpErrorEffects`) that its per-package invokers compose.

Behavior is identical and test-pinned in both. The split follows the same
consumption pattern as Go format modules versus TypeScript separate packages.
Convergence is optional (Run 2, sdk-F1).

### ob delegate registry preference axis

`ob`'s delegate registry carries a per-(operation, bindingSpec) preference axis
beyond the delegate-manager contract's per-operation index. This is ob's own
documented extension, not a gap in the contract.

## Engines and evaluation

### JSONata engines

The project maintains its own JSONata implementation at
`github.com/openbindings/jsonata` (Go and JavaScript, with a shared
implementation contract and test corpus). Adoption is **partial**, so the
engine in use differs by module. Verified 2026-09-18:

| Module | Engine |
| --- | --- |
| `ob`, `openbindings-go` core | `github.com/openbindings/jsonata/go` |
| `openbindings-go/formats/{openapi,operationgraph,usage}` | `recolabs/gnata` v0.2.2 |
| `ob/internal/graphjsonata` | vendors `recolabs/gnata` v0.2.2 |
| TypeScript packages (core, operationgraph, openapi) | `jsonata` (jsonata-js) 2.1.1 |

The earlier state, in which `ob` used `recolabs/gnata` directly after adopting
it over the `blues/jsonata-go` 1.5 port, no longer describes the core. That
adoption did resolve the original parse-refusal limitation: a 2.1-only
expression is not falsely refused.

`ob`'s vendored copy is deliberate and scoped. Its `SOURCE.json` states the
purpose: a private, unchanged Graph runtime, explicitly not the official
fidelity evaluator and not an independent product.

**This is a migration in flight, not a settled ruling.** The remaining Go
submodules and the TypeScript packages have not moved, and whether they should
is an open question for Matt rather than a divergence anyone should treat as
decided.

### The differential-conformance corpus lags the core

The transform differential-conformance corpus at
`spec/conformance/transforms` remains the cross-SDK parity gate, and
`known-divergence/catalog.json` still records 11 cases across 4 root causes
(`$filter` singleton, `$match` shape, wildcard nesting, RE2 regex), none
reachable by a shipped OpenBindings transform.

That catalog names `expectedEngine: jsonata-js@2.1.1` and
`actualEngine: gnata@0.2.2`. Since the Go core has moved to
`openbindings/jsonata/go`, the catalog describes an engine the core no longer
uses. Re-measure against the current engine before relying on those 11 cases
as the Go-side residual.

### JSONata differential-conformance gate placement

The gate homes by design (sdk-review A5, 2026-07-19). The evaluation-lane gate
lives in `ob` (the only Go surface that evaluates) and in the TypeScript SDK.
The Go SDK carries a compile-lane slice only: `Compile` over the `agree/`
corpus, the exact parse surface `validate.go` ships for OBI-D-18.

A Go-SDK evaluation gate would test a configuration the SDK deliberately does
not ship. This placement is unaffected by the engine migration.

## Behavior

### Embedded content is normalized JSON

`ob` embeds content as normalized JSON (parse, then marshal) rather than
pristine bytes. This preserves written-document byte-stability and staleness
semantics. Revisit only as a deliberate design conversation, not as a
correctness fix.

### Invoker document caches have no eviction

Invoker document caches are location-keyed with no eviction. Ratified by Matt,
2026-07-20, after a four-lens panel re-examination of sdk-review Ruling 4. The
panel record is retained in the container repository's git history.

Invoker lifetime is the flush, and scope-per-invoker-instance is the tenancy
boundary. `PrepareBinding`'s side-effect-free preflight contract depends on
warm-cache entry persistence, so eviction would be a correctness change rather
than a memory optimization.

Re-open when a named long-lived deployment demonstrates measured unbounded
distinct-location growth within one invoker's lifetime (registry-crawling
agents against a weeks-old `ob start`, or a multi-tenant hub), or when a stale
cached document causes a misinvocation that a fresh parse would have avoided.

The priced fix preserves the preflight contract: an injectable bounded cache,
or an explicit invalidate and lifecycle seam. Never a silent TTL refetch, and
never a baked eviction policy.

The companion Ruling 4 null, response caps fixed with no override, was reversed
the same day. A core-threaded consumer bound is decided and queued; its named
exclusions land in this ledger when the knob ships.

### Comparison detail strings

Detail strings follow the deciding-keyword prefix rule: direction-aware, naming
the keyword that rejects the flowing value. Both engines use ECMAScript and JCS
number rendering.

### Tolerated parse leniences

Logged rather than fixed:

- `TrimSpace` on refs in the grpc, connect, mcp, and asyncapi parse paths.
- grpc and connect split refs on the last `/`.
