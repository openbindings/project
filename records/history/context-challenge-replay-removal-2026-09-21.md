# Ruling: remove live CONTEXT_REQUIRED replay from both SDKs

Ruled by Matt, 21 September 2026. Applies to `openbindings-go` and
`openbindings-ts` together, and to `ob` as their first consumer. This is a
behavior change at the operation-invoker boundary and lands under the pre-1.0
minor-version rule in each repository's CHANGELOG.

## Ground

The published interfaces, not shipped behavior.

The operation-invoker interface states that a `CONTEXT_REQUIRED` error from a
binding invocation "propagates unchanged, so a caller can resolve the
challenge and start a new operation attempt," and that the contract "does not
prescribe where resolution runs." The binding-invoker interface says a runtime
"may" resolve and retry. Neither requires the operation invoker to redo an
attempt on the caller's behalf. The transparent redo both SDKs ship today is an
SDK convenience layered on top of that contract, and it is evaluated here as
such.

## What the SDKs do today

Both operation invokers resolve context in two lanes.

Before the first attempt, the invoker asks the binding for its known
requirements through `prepareBinding`, consults the application's context
resolver, and starts attempt one with the merged context. Nothing has been
forwarded to a binding yet, so nothing is retained.

During an attempt, a binding may end with `CONTEXT_REQUIRED`. The invoker
consults the resolver again and starts a second attempt, invisibly to the
caller. To do that it must resupply the inputs it already forwarded into the
failed attempt, so it records every post-transform input from the first write
until the binding produces its first output, then replays that prefix into
attempt two. The window closes at the first output because the contract only
guarantees no side effect before output.

## Why the live lane is removed

1. **It retains an unbounded stream to hide one decision.** For a
   client-streaming binding that stays silent, the replay log holds the whole
   stream in memory. The value migration branch made this visible by charging
   it against a budget, at which point the stream fails with a resource error
   instead of growing silently. Neither outcome is acceptable. The retention
   exists only to make the redo invisible.
2. **It makes the SDK decide idempotency it cannot verify.** The redo rests on
   the binding's claim that nothing happened before the challenge. The
   interface itself limits that claim to cases where the binding "can still
   guarantee" the boundary. The SDK has no way to check it. If a binding is
   wrong once, the caller gets a duplicated side effect it never asked for and
   cannot see.
3. **It creates two rules for one concept.** A challenge is either resolved
   before the call or ends the call, except when a hidden second attempt
   happens, and whether it happens depends on whether an output has appeared
   yet. A user of the surface cannot predict this from their code.
4. **It matches no formed expectation.** Native clients converge on one
   pattern: credentials come from a callback consulted before the request,
   a failure is an ordinary error with a recognizable code, and the redo
   belongs to the caller. gRPC per-RPC credentials plus `Unauthenticated`,
   net/http plus a 401, the oauth2 transport refreshing before the request and
   never retrying on failure. The one mainstream client that retries
   transparently, the AWS SDK, requires a seekable body so it re-reads the
   source rather than buffering it. The transparent replay corresponds to
   nothing a developer of these surfaces expects.
5. **Its value is concentrated in an omission.** Every built-in binding raises
   its live challenge before it reads any input. The lane matters today only
   because Connect, gRPC, MCP, and usage return nothing from `prepareBinding`
   even though their requirements are static, so their resolver flow has no
   preflight to run in. The fix for that is to implement preflight, which the
   interface designed for exactly this, not to keep the replay.

Decision-lens rules that decide this: 3 (every layer claims exactly its job),
8 (predictable and loud), 7 (delegate to formed expectations), and 11
(challenge gaps before filling them). Rule 5 does not favor the replay; the
convenience it provides is bought through the constraints, not inside them.

## The ruling

1. **Preflight resolution stays.** The operation invoker continues to call
   `prepareBinding`, consult the configured context resolver, and start
   attempt one with the merged context. This lane retains nothing and is the
   path through which the resolver serves ordinary calls.
2. **A live `CONTEXT_REQUIRED` ends the invocation.** When a binding ends an
   attempt with `CONTEXT_REQUIRED`, the operation invocation terminates with
   that error and its `ContextRequiredDetails` intact, regardless of whether
   any input was forwarded or any output was produced. The invoker does not
   consult the resolver for a live challenge and does not start a second
   attempt.
3. **The replay machinery is deleted.** Both SDKs remove the replay log, the
   retry window, the replay snapshot, the pump swap across attempts, and the
   pending-transform-input carried between attempts. The attempt loop in
   `runCompiled` and its TypeScript counterpart collapse to a single attempt.
4. **No cardinality-shaped helper is added.** A unary retry helper would
   declare cardinality at the call site, which the standing no-wrappers ruling
   forbids, and a cardinality-agnostic version reduces to the caller's own
   loop with an extra object inside it. The caller writes the loop. The
   `Single` terminal remains the one blessed terminal.
5. **Built-in bindings implement preflight.** Connect, gRPC, MCP, and usage
   answer `prepareBinding` with their statically knowable requirements so
   their resolver flow moves to the preflight lane. OpenAPI, AsyncAPI, and
   GraphQL already do.
6. **ob owns its own redo.** The CLI keeps its resolver for preflight. Where
   it wants to retry on the user's behalf after a live challenge, its invoke
   path adds a bounded loop around the operation client and reports the
   retry. That is the one place a "retrying with credentials" message comes
   from, and the one place the safe-to-redo judgment is made by code that can
   know the answer.

## What the developer writes

```go
for attempt := 0; attempt < 2; attempt++ {
    call := invoke.Invoke(ctx, opInv, iface, sig, invoke.WithContext(given))
    if err := call.Write(ctx, input); err != nil {
        return err
    }
    out, err := invoke.Single(ctx, call.Outputs())
    if err == nil {
        return use(out)
    }
    details := invoke.ContextRequiredFrom(invoke.AsInvocationError(err))
    if details == nil || attempt == 1 {
        return err
    }
    resolved, rerr := resolve(ctx, details)
    if rerr != nil {
        return rerr
    }
    given = merge(given, invoke.ScopeContext(resolved, details))
}
```

For a streaming call the caller re-runs its producer, so replay means
re-reading the source. A caller whose source cannot be re-read discovers that
by reading their own code rather than by hitting a memory ceiling.

## What changes for callers

- A live `CONTEXT_REQUIRED` that the SDK used to absorb now surfaces as the
  invocation's terminal error. Callers that relied on the invisible redo add
  the loop above.
- A successful `Write` is accepted into exactly one attempt. It is never
  replayed.
- The context resolver's contract is unchanged in signature and in scope: a
  challenge is a scope, not a hint. Its only remaining call site in the SDK
  is preflight.
- `StoreContextResolver` and `storeContextResolver` are unaffected.

## Documentation to update

- `openbindings-go/README.md` and `openbindings-ts/README.md`: the sentence
  claiming the invoker "re-drives the binding" becomes a description of
  preflight resolution plus the caller-owned loop.
- The `OperationInvoker` doc comment in both SDKs: the
  "CONTEXT_REQUIRED negotiation" bullet is rewritten to state rule 2.
- Each SDK CHANGELOG working draft: a **Changed** entry under the pre-1.0
  minor-version rule.
- `ob` CHANGELOG: a **Changed** entry if the CLI adds its loop.
- The interfaces repository needs no change. Its text already describes this
  model.

## Relationship to the value migration

This ruling removes one of the three findings blocking
`openbindings-go` branch `codex/native-value-migration`: the replay log was
the retry-window retention that the live budget turned into a hard terminal.
It does not decide the Operation Graph root retention or the drainable-queue
accounting, which remain open on that branch.

## Re-open condition

New evidence that a class of bindings cannot state requirements before the
first input in principle, rather than by omission, and that callers of those
bindings cannot reasonably own the redo. Implementing preflight in the four
bindings named above is expected to remove the only known instances.
