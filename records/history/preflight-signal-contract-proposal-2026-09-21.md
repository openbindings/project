# Proposal under review (round 3): the preflight operation in its ideal state

Context. The Go SDK branch `feat/value-migration-rulings` (worktree
/Users/matt/Code/ob-pj/openbindings/openbindings-go-native-values) carries an
"optional preparation" contract: `PrepareOperation` / `PrepareBinding` /
`BindingPreparer` in Go, `prepareOperation` / `prepareBinding` in the
published interfaces (branch `codex/operation-preparation` of
/Users/matt/Code/ob-pj/openbindings/interfaces), and a 70-line PREPARATION.md.
The project owner ruled that this operation is a signal: it tells a binding
that an invocation may follow; the SDK has no authority over what a binding
does in response; the only invariant is that it never dispatches the
requested operation. The operation invoker calls it before an attempt to learn
known requirements for its context resolver. A live CONTEXT_REQUIRED is not
replayed; the caller owns any redo.

This document is the target state. Grade the document, not the branch.

## 1. One operation, one question

The operation asks one precisely defined question and delivers whatever
warning a binding wants from being asked: *given this source, selector and
supplied context, which context requirements does the binding already know
it would raise as a `CONTEXT_REQUIRED` challenge?* The operation invoker asks
before an attempt so its resolver can fill them. An application asks when a
call becomes likely. Asking is the signal; a binding that wants to get ready
does so while answering; `null` is a complete answer. The return value is the
binding's answer, defined by reference to the live challenge (3a, Result), so
"what does preflight compute" has one meaning across implementations.

## 2. Rename: preflight, one word for one operation

Ground. The published interface already called this operation preflight: the
`main` headings read `prepareBinding (preflight)` (binding-invoker/README.md:185)
and `prepareOperation (preflight)` (operation-invoker/README.md:89), the
interfaces README says "the `prepareBinding` preflight" (README.md:36), and
binding-invoker line 41 says "advisory pre-flight". The Go SDK already exposes
the operation as `Preflight()` on prepared routes and as `LocalPreflight`. The
rename makes the operation's name match the word the contract already uses
for it. A secondary, SDK-local benefit is that `Prepare*`/`Prepared*` in the
root package, `invoke` and `sdk` then denote only offline compilation of
documents into immutable snapshots. Two unrelated `Prepare`/`Preflight`
spellings remain by design and are noted for readers: the standalone
`asyncapi-client` names its options `PrepareOptions` (its own API, not the
SDK's), and the standalone `openapi-client` has `Client.Preflight`, a
lower-level, input-taking method with its own contract that the OpenAPI
adapter calls to answer.

Why this word. Across its uses (CORS, aviation, print, deployment) preflight
means a preliminary step before the main action, done to learn how the main
action will go, and never the main action itself. It implies neither the
presence nor the absence of network I/O. Rejected: ready (a guarantee), warm
(caching or connections), probe (network), check (verification and gating),
announce/notify (no return value).

### 2a. Rename table, Go SDK (non-test unless stated)

| Today | Proposed |
| --- | --- |
| `invoke.BindingPreparer` | `invoke.BindingPreflighter` |
| `OperationInvoker.PrepareOperation`, `.PrepareBinding` | `PreflightOperation`, `PreflightBinding` |
| `CompiledBindingInvoker.PrepareBinding`; implementers `localBindingInvoker`, `compiledLocalBinding` | `PreflightBinding` |
| `combinedInvoker.prepareBinding` | `preflightBinding` |
| `OperationMatch.Prepare` | `OperationMatch.Preflight` |
| `sdk.Runtime.PrepareOperation` | `sdk.Runtime.PreflightOperation` |
| `Invoker.PrepareBinding` in `formats/{asyncapi,connect,graphql,grpc,mcp,openapi,usage}`; `openapi.Adapter.PrepareBinding`; `openapi.invokerRuntime.prepareBinding` and `prepareNativeBinding`; every `var _ invoke.BindingPreparer` assertion | `PreflightBinding` / `preflightBinding` / `preflightNativeBinding` / `BindingPreflighter` |
| adapter doc comments still reading "side-effect-free preflight" (`asyncapi/invoker.go:208`, `usage/invoker.go:324`) | reworded to 3b's meaning |
| `PreparedRealization.Preflight`, `PreparedDependencyRoute.Preflight`, `compiledOperationBehavior.Preflight`, `LocalPreflight`, `WithLocalPreflight` | unchanged |
| test files `formats/*/prepare_binding_test.go`, `formats/openapi/preparation_test.go`, `invoke/preparation_test.go`, dir `qualification/operation-preparation`, README.md lines naming `PrepareOperation`/PREPARATION.md (395-407, 506, 615), SDK_RUNTIME.md, IMPLEMENTATION_PARITY.md | renamed / reworded |
| `formats/operationgraph` | has no preflight method; the combiner's default answers `nil, nil` (combiners.go:80-90). Its adapter README documents that, and its internal test word "preflight" for source loading is renamed to avoid a second meaning. |

Only working-draft CHANGELOG sections change. Seven format modules are
separate Go modules; each is edited and tested on its own.

### 2b. Interfaces

`prepareBinding` -> `preflightBinding`, `prepareOperation` ->
`preflightOperation`, in both JSON files, both READMEs, the interfaces README
and the interface-synthesizer README. Pre-launch, amended in place.

### 2c. ob CLI (wire-visible; decided here, reversible by the owner)

The OBI operation keys `openbindings.binding-invoker.prepareBinding` and
`openbindings.operation-invoker.prepareOperation` follow the interface through
`ob operation rename` on the root contract `ob.obi.json` (usage.kdl:354), then
hand edits to the two genbound inputs `internal/cmd/usage.kdl` (verbs
`ob binding prepare` / `ob operation prepare` -> `preflight`) and
`internal/server/openapi.yaml` (routes `/bindings/prepare` /
`/operations/prepare` -> `/preflight`, operationIds), then
`go generate ./internal/app`. Go handlers `app.PrepareBinding`,
`app.PrepareOperation`, `handleBindingPrepare`, `handleOperationPrepare`,
`boundgen.go:53-54`, the vendored `internal/app/requirements/binding-invoker.json`
(refreshed from the interfaces corpus) and `requirements_test.go:35` follow.
This is a wire change for `ob start` clients: the Elements workbench invokes
`openbindings.ob.prepareOperation` by key (`apps/ob-start-workbench/src/main.ts:3693`,
`ui-parity.json`) and the web docs list the routes; both repositories are
pinned as consumers of this change and updated when ob lands it.

### 2d. TypeScript and parity

Renaming the interface keys while the TS SDK still exports `prepareBinding`
breaks parity at the published boundary. Sequencing: the interfaces rename
lands with the Go change; the TS key rename plus its semantic alignment to 3a
is scheduled as one mechanical change before `release/0.2` integration and is
a gate for that integration. Until then the parity record marks the TS names
as pending the rename. No TS design iteration happens before the Go side
settles.

## 3. The contract, in full

### 3a. Interface text (signal contract; interface lens A, adversary B+ with the three partials applied)

The operation is a signal with one invariant. The contract says only what a
signal can promise. The `description` fields of both operations in
`binding-invoker/0.1.json` and `operation-invoker/0.1.json` carry this text
verbatim.

binding-invoker README, `preflightBinding` (greenfield minimum, 2026-09-21):

> `preflightBinding` tells a binding that an invocation of this selection may
> follow, and lets it report context requirements it can already identify
> from the source and the supplied context. The result is a
> `ContextRequiredDetails` in the same shape a `CONTEXT_REQUIRED` challenge
> carries, or `null`. It is advisory: it may omit requirements, `null` is
> always conformant, and the live challenge remains authoritative.
> Invocation never requires a prior preflight. Context supplied to preflight
> is supplied for that call alone. Preflight never dispatches the requested
> operation, consumes its input, emits its outputs, or spends an approval
> for it; the boundary of the requested operation is the governing binding
> specification's, and anything else a binding does in response is that
> specification's to require and otherwise the implementation's.
> Requirements are reported only as the result; an unsuccessful completion
> means the binding could not answer and carries no prediction.

`idempotent: true` on both operations.

operation-invoker README, `preflightOperation`:

> `preflightOperation` resolves the named operation or binding with
> invocation's selection rules and preflights the selected binding under the
> binding-invoker contract. A resolution failure completes with this
> interface's own resolution code and is not the binding's answer. Preflight
> does not pin a later selection.

`ERR_REFUSED` and `CONTEXT_REQUIRED` rows: "no observable effect of the
requested operation occurred" (the branch's existing narrowing, kept).

### 3b. Go doc comments, in full

Implementer-facing, `invoke/binding_invoker.go`:

```go
// BindingPreflighter is optional. PreflightBinding tells a binding that an
// invocation of args' selection may follow and asks which context
// requirements it already knows it would raise: the ContextRequiredDetails
// its own CONTEXT_REQUIRED challenge would carry for the same source,
// selector and args.Context, as far as it can determine before dispatch, or
// nil when it can determine none. It does the work its binding specification
// names as needed to answer, and no more; it never dispatches the requested
// operation, consumes its input, or spends an approval for it. An error means
// it could not answer (answer-work failed, or ctx was cancelled) and is never
// ERR_REFUSED or CONTEXT_REQUIRED. args.Context supplied here is not reused
// for any other call. Invocation must work without a prior PreflightBinding.
```

Caller-facing, on `OperationInvoker.PreflightOperation` (and `PreflightBinding`,
`sdk.Runtime.PreflightOperation`, `OperationMatch.Preflight`):

```go
// PreflightOperation resolves operation as Invoke would and asks the selected
// binding which context requirements it already knows it would raise. Supply
// context with WithContext. A non-nil result is what a live CONTEXT_REQUIRED
// would carry; nil means none known, not ready. An error means the binding
// could not answer; it is not a refusal and does not predict invocation.
// This call never consults ContextResolver. The result may be stale by the
// time it is used; discard it if the operation, binding or context changed.
```

### 3c. Application guidance (`PREFLIGHT.md`, replacing PREPARATION.md), in full

> # Preflighting an operation
>
> Call `PreflightOperation` when an operation becomes likely to be used, for
> example when its button appears, to learn which context is still missing
> before the user acts. Supply the context you would supply to `Invoke`.
>
> ```go
> details, err := invoker.PreflightOperation(screenCtx, iface, sig.Key(),
>     invoke.WithContext(given))
> ```
>
> A non-nil `details` is the same shape a live `CONTEXT_REQUIRED` carries.
> Resolve it the way your application resolves challenges (prompt, keychain,
> store), select the satisfied alternative with `MatchContextAlternative`,
> scope with `ScopeContext`, merge into the context you pass to `Invoke`. A
> nil result means the binding knows of nothing missing; it is not a promise
> that invocation will succeed. An error means the binding could not answer;
> it is not a refusal and does not predict invocation, so do not disable the
> control on it; invoke and let the outcome decide.
>
> Results can be stale. One can arrive after you cancelled `screenCtx`, or
> after the user changed the selection or context; discard it in those cases.
> Repeated or overlapping calls are valid; debounce as you would any query.
>
> Explicit preflight never consults your `ContextResolver`, never prompts, and
> never retries. Ordinary invocation preflights again before its attempt and
> does consult the resolver; an application that preflights on hover and then
> invokes on click therefore asks the binding twice, and the adapter reuses
> its answer-work between the two (see the adapter's README for what that
> work is and how it is reused).
>
> A live `CONTEXT_REQUIRED` during invocation ends that invocation with its
> details; the caller-owned redo loop is in the README's context section.

## 4. Where per-family statements live

Binding specifications carry only the denotational fact, in their own words,
using "fixed by declarations alone" versus "conditional on supplied values",
never "preflight", "preflightable", "load", "retain", "cache" or "no I/O".
Labels are used only where the specification already labels its paragraphs
(OpenAPI and GraphQL); the others are prose in the existing sections.

- OpenAPI: §12.1 already states the fact. Its phrase "a preflight can name
  them and their type" (3.0 line 668, 3.1 line 685, and siblings) is an
  existing crossing into interface vocabulary and is reworded to "such a
  requirement can be named by type before dispatch but not known to apply".
  No other change.
- AsyncAPI: §9.3 already requires a missing `message`/`server` choice and
  artifact-declared credential requirements to surface before dispatch when
  knowable. Add one sentence: which of those are fixed by declarations alone
  (server and artifact-declared credentials) and which are conditional on
  supplied values (a message choice that depends on the payload).
- gRPC, MCP, Connect, usage: no new specification text. The existing lines
  already state the fact: transport election before dispatch for a bare
  `host:port` (GRPC-P-02, §9.3); credentials surfaced for consumer resolution
  when unplaceable (gRPC §9.5, MCP line 80, Connect line 80, usage line 84);
  schema for a location-only gRPC source obtained live under the same
  resolved context (GRPC-P-01); `exec:` dereference authorization-gated
  (USAGE-P-02). The proposal's earlier "derivable from supplied context alone"
  sentences are withdrawn: that is a completion, not a fact.
- MCP: that revision 2025-11-25's authorization discovery (401 with
  protected-resource metadata) is outside the incorporated authority is
  already true by §2's enumeration. Making it an explicit exclusion with a
  revisit trigger is a separate MCP specification change with its own
  grounds, not part of this proposal.
- Operation Graph: the specification has already disclaimed standing over
  node bindings' requirements (line 289: binding selection and context
  resolution are performed by the processor). So "what a graph's preflight
  reports" is a processor completion, documented in the adapter README:
  today nil; a future completion could report the union over `operation`
  nodes, which the graph opens unconditionally at startup (line 457), while
  `each` nodes are event-conditioned and stay conditional. No graph
  specification change.

Adapter READMEs (`formats/<family>/README.md`) state the completion: what the
adapter does to answer, whether it retains anything and under what policy.
OpenAPI and AsyncAPI: retrieve and analyze the description; reuse under the
client's documented cache policy. Connect: parse embedded content and resolve
the method; no network. gRPC, MCP, usage: derive from supplied context; no
network, no session, no process. GraphQL: report configuration requirements;
no introspection. Operation Graph: nil. Each README also states that context
supplied to preflight is not retained.

Sequencing: the adapter README paragraphs and the two specification edits
(OpenAPI rewording, AsyncAPI sentence) land in the same change as the rename
and doc comments.

## 5. The operation invoker's automatic lane (unchanged in shape)

The invoker preflights before every attempt, whether or not a resolver is
configured. Reason: preflight collapses a knowable challenge into the clean
no-input-consumed case before anything is forwarded (operation_invoker.go:537-539);
without it the pump forwards caller writes before a live challenge, which
callers can observe. The round-2 idea of gating the lane on a configured resolver is withdrawn.

With a resolver, details go to the resolver, the merge happens, one attempt
starts. Without one, non-nil details end the invocation as CONTEXT_REQUIRED
before any input is consumed. A preflight error ends the invocation through
`wireError` (operation_invoker.go:832): an `InvocationError` passes through,
`ErrNoInvoker` maps to `ERR_BINDING_NOT_FOUND`, and everything else goes
through `AsInvocationError`, which maps `context.Canceled` and
`DeadlineExceeded` to `ERR_CANCELLED` (invocation.go:1136-1140) and unknown
errors to `ERR_RUNTIME`. This is SDK policy, documented as such.

Cost. The lane pays the adapter's answer-work on every invocation. Rule for
SDK-shipped adapters: answer-work done for a preflight is reused by the
invocation of the same arguments that follows it. OpenAPI today caches only
self-contained embedded content (`nativeSourceClientKey` returns "" for a
location-only source), so a location-only source is loaded twice per
invocation. Decision: the OpenAPI adapter reuses the analysis produced by a
preflight for an invocation with identical source identity, content digest,
selector and binding spec within the same invoker, for the lifetime of that
invocation, without introducing a location-keyed cache or a freshness policy
(those remain the 2026-07-20 ruling's territory and are not reopened here).
AsyncAPI already consults its warm cache first and loads only when cold.

## 6. Behavior changes, complete list, with the tests that flip

1. Adapters that swallowed answer-work failures return errors: AsyncAPI
   (options, cache, load, cancellation), Connect (selector, target,
   content parse, method resolution), gRPC (selector, target, transport),
   MCP (foreign spec, selector, endpoint). Tests that flip:
   `TestPrepareBinding_NonContextRefusalsReportNothing` in connect, grpc and
   mcp now assert the corresponding error; AsyncAPI gains a cancellation case.
   GraphQL already returns errors for malformed configuration and swallows
   selector/location failures; it is aligned the same way.
2. OpenAPI reuses preflight answer-work for the following invocation (5).
   `TestPreparationCancellationDoesNotCancelConcurrentInvocation` currently
   asserts three uncached loads for one cancelled preflight plus one
   invocation; its count changes to reflect reuse of the completed preflight
   only, and a new test asserts one load per preflight-then-invoke pair.
3. Nothing else. The lane keeps its shape, so `TestOpPreflightWithoutResolverSurfaces`
   and `TestPreparationFailureStopsOnlyCurrentCall` are unchanged. Names and
   docs change everywhere listed in 2.

Retained tests named in the doc: the OpenAPI adapter tests that a cancelled
preflight does not cancel a concurrent invocation and that one call's
credential does not satisfy another's (preparation_test.go:116-197);
`invoke/preflight_cancellation_test.go`; `invoke/preparation_test.go`'s
"explicit preflight never runs the resolver". One `invoke`-package test is
added against a mock preflighter asserting the lane never passes one call's
resolved context into a different call's preflight.
