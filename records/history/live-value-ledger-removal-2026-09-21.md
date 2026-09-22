# Ruling: drop the live value ledger from the Go value migration

Ruled by Matt, 21 September 2026. Applies to `openbindings-go` branch
`codex/native-value-migration` before it lands, and to any TypeScript
counterpart that follows. Companion to
[context-challenge-replay-removal-2026-09-21.md](context-challenge-replay-removal-2026-09-21.md).

## Ground

Project doctrine, stated explicitly: the core SDK is not fit to any binding.
Operation Graph is a binding specification like every other, and the core
invocation runtime must not carry machinery whose only customer is one
binding's internal retention.

The published interfaces are silent on process-local resource policy, so this
is a project ruling rather than an interface reading. It overrules the branch's
own design documents, which are shipped-behavior grounds and carry no standing
against doctrine.

## What the branch built

The value migration gives each invocation two kinds of limit.

**Per value:** how large and how deep any single admitted value may be,
measured in deterministic work units. This bounds what one `Write`,
`EmitOutput`, typed construction, or export may cost.

**Live:** how many units the SDK may retain at once across everything it is
holding for that invocation. Every queued input, queued output, replay entry,
Operation Graph root, buffer, combine state, and in-flight copy takes a
reservation against a shared scope and releases it when done. Retries and
Graph descendants share the scope through context keys. When a reservation
does not fit, the scope decides whether to park the producer or fail it, using
a "drainable" classification: a reservation is drainable only if it sits in
the caller-facing output queue, because an independent application reader will
release it. If the request would fit after all drainable reservations release,
the producer waits; otherwise the invocation ends with `ERR_RUNTIME`.

## Why it is removed

1. **It protected retention that no longer exists.** The live ledger's
   customers were the retry replay log and Operation Graph's roots, buffers,
   and combine state. The replay log is removed by the companion ruling. Graph
   roots become bounded once the engine retains them only when an expression
   can observe `$input` and releases them when the lineage is dead. Buffer and
   combine retention is that binding's own concern, and its specification
   already instructs implementations to bound their queues. Nothing the core
   retains on its own account is unbounded.
2. **The remaining bound already exists without it.** The input queue holds
   one item. Each output queue holds four. No item exceeds the per-value limit.
   That is a deterministic ceiling on core retention that requires no
   reservations, no park-or-fail decision, and no shared scope.
3. **Its one judgment is wrong.** The drainable rule classifies reservations
   by which invocation created them rather than by whether an independent
   consumer exists. The queue between a binding and the operation invoker is
   drained by the invoker's own output loop, which terminates in the
   application reader, yet it is marked non-drainable. A binding emitting
   outputs above roughly a fifth of the live budget, still inside the
   per-value limit, receives `ERR_RUNTIME` instead of backpressure, and only
   when the application happens to be reading slowly at that instant. A limit
   whose firing depends on timing is not predictable.
4. **It is core machinery built for one binding.** The private scope package
   carries `ChildContext`, `RootContext`, `TakeScope`, and `SessionContext`,
   described in their own comments as opting "an SDK Graph descendant" into a
   shared budget. That is the core runtime shaped around Operation Graph's
   fan-out. Doctrine forbids it.
5. **It leaks an internal cost model into the public API.** `MaxLiveUnits` is
   a public knob whose unit is an SDK-private accounting measure that callers
   cannot map to bytes or to any behavior they can observe.

Decision-lens rules that decide this: 3 (every layer claims exactly its job),
4 (suspect uniformity that couples), 8 (predictable and loud), and 11
(challenge gaps before filling them).

## The ruling

1. **The live budget is removed.** `MaxLiveUnits` leaves `ValueLimits` and
   every public struct that carries it. The shared scope, reservations, the
   drainable classification, the park-or-fail loop, delivery reservations,
   terminal-data reservations, and the input and output capture permits are
   deleted. `ValueLimitError` keeps its per-value and depth kinds only.
2. **Per-value and depth limits stay.** `MaxValueUnits` and `MaxDepth` remain
   on `ValueLimits`, on the runtime, invoker, local provider, and per-call
   options, and on `BindingInvocationArgs`. Bounded codec encoding and bounded
   construction remain as the mechanism that enforces them.
3. **Snapshot ownership stays.** Public handoffs still capture a stable
   logical value; handlers, evaluator callbacks, and public readers still
   receive detached values; typed construction is still checked. The
   ownership contract in `INVOCATION_VALUES.md` is unchanged except for the
   removal of the live budget and its backpressure language.
4. **Queue capacities are the retention bound.** The existing fixed input and
   output queue capacities, together with the per-value limit, define how much
   the core may retain for one invocation. This is documented as the bound.
5. **Scope-sharing context keys are removed.** `ChildContext`, `RootContext`,
   `TakeScope`, and `SessionContext` are deleted with the scope. No core
   mechanism exists for a binding to enroll descendants in a shared budget.
6. **Operation Graph owns its own retention.** The engine retains roots only
   when a node expression references `$input`, and releases each root when no
   live event carries its index. Any budget for buffer and combine state is
   implemented inside the Graph module against its own specification. The
   branch test that asserts a pass-through graph terminates on retention is
   reversed to assert that a pass-through graph retains nothing.
7. **The rest of the branch is unaffected.** The private value package, the
   maintained codec's bounded entry points, the schema compiler move, the
   format modules' exact-number parsing, and the OpenAPI byte admission stand
   as reviewed.

## What comes out

Measured on the branch at `a93b6df`:

| Location | Lines | Disposition |
| --- | --- | --- |
| `internal/valueio/scope.go` | 351 | About 84 lines of packet, capture, view, and construct bridging stay; the rest is ledger and goes |
| `invoke/invocation.go`, `invoke/value_boundary.go`, `invoke/operation_invoker.go` | 73 lines touching permits, reservations, drainable, transfer, release | Go |
| `formats/operationgraph/values.go` | 181 | Charging and retention; replaced by a small root refcount |
| `formats/operationgraph/engine.go`, `state.go` | 51 lines of retain, charge, release | Go |
| `invoke/value_limits.go`, `sdk/runtime.go`, docs | `MaxLiveUnits` and its merge, resolve, and prose | Go |

Roughly 550 lines of mechanism leave the branch and a root refcount of a few
dozen lines enters the Graph module.

## Documentation to update

- `INVOCATION_VALUES.md`: remove the live budget row, the shared-budget
  language for retries and descendants, and the backpressure paragraph.
  State the queue-capacity bound.
- `VALUE_ARCHITECTURE_PLAN.md` and `VALUE_MIGRATION_PLAN.md`: the resource
  policy sections are superseded by this ruling; mark them as such rather
  than rewriting history.
- `VALUE_MIGRATION_QUALIFICATION.md`: the retention and Graph exhaustion
  qualification rows are retired; the per-value, ownership, and drain rows
  stand.
- `INVOCATION_DATA_FLOW.md`: contract 6 narrows to per-value and depth
  allowances; contract 7 loses its retry language.
- `openbindings-go/CHANGELOG.md` working draft: the **Changed** entry for the
  migration describes per-value limits and ownership only.

## Re-open condition

A demonstrated core retention path, not owned by a binding, that the fixed
queue capacities and the per-value limit fail to bound. None is known.
