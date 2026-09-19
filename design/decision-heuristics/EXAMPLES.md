# Applying the design decision procedure

Companion to [draft 6, closing revision](../../policies/decision-heuristics.md). These are
replays for checking the procedure, not new evaluator rulings. None edits the
evaluator. A recommendation can be sensible without being uniquely forced.

## One complete local decision

This is a stipulated new-API fixture, not an assertion about a released
package. Its input record, Fixture A, contains an authorized brief for a local
in-memory table: “Find a stored string or null by key; absence is ordinary
and must be distinguishable from null.” Stored values exclude undefined.
The audience is TypeScript callers. A supplied caller sample uses Map.get
and tests undefined for absence; no caller sample uses a tagged lookup or an
exception for this task. The fixture declares an unpublished surface, no
shared reader, no applicable ruling, and authority governing only storage
encoding, not the return shape. These supplied facts may not be assumed in
a real loop without the equivalent evidence.

The three complete alternatives are: return string, null or undefined;
return a union of {found: false} and {found: true, value: string | null};
or return string or null and throw NotFound when absent. Each lookup is
bounded by the same existing key-length and table limits. None changes
stored values or allocates an unbounded result. Here are the correct caller
paths, where show accepts a stored value and missing handles ordinary absence:

```typescript
// A: undefined for absence
const value = lookup(key);
if (value === undefined) missing(); else show(value);

// B: tagged result
const result = lookup(key);
if (!result.found) missing(); else show(result.value);

// C: throw on absence
let value: string | null;
try { value = lookup(key); }
catch (error) {
  if (error instanceof NotFound) missing(); else throw error;
  return;
}
show(value);
```

The caller paths distinguish absence from a stored null under every option.
Rule 8 finds no incorrect result under correct use. The tagged result's
explicitness and the exception's visible absence are their strongest
counterarguments; neither supplies a competing established idiom in this
fixture. At rule 7, A matches the supplied caller idiom; B and C require a new
one. A therefore survives alone. Rule 5 supports its short path but is not
needed to select it. The essential lookup passes rule 11 because no existing
operation can perform the brief's required retrieval; rule 11 does not select
its return representation. No step-4 boundary is crossed.

The decision record is complete enough to copy as a format:

| Field | Fixture record |
| --- | --- |
| Label and baseline | D-lookup, Fixture A as stipulated above; a real record substitutes its commit and evidence links. |
| Question and scope | How does the unpublished local lookup report ordinary absence? |
| Answer and alternative | Provisionally choose A, undefined for absence; the adoptable alternative is B, the complete tagged union above. C was considered and eliminated at rule 7. |
| Evidence and deciding step | Storage authority is outside this question's scope. Fixture A supplies the brief, audience, caller idiom, limits and reader inventory. Step 3 selects A at rule 7 after no distinction on bounds or correct-use outcomes. |
| Strongest objection | B makes presence explicit in the return shape; its caller path shows that benefit. This is a fixture comparison, not an independently sourced product preference. |
| Confidence | Inferred: the choice materially uses the proposed operational test for rule 7. No authority requires undefined. |
| Edit and review status | Applied provisionally in the fixture; review pending. Dependent local edits can proceed. No landing action is authorized. |
| Dependencies and locations | The stored-value exclusion and caller sample in Fixture A; lookup declaration, its usage example, absence and stored-null checks. A real ledger links each edited location. |
| Reopen condition | Admit stored undefined, supply a materially conflicting caller task, correct a fixture fact, or receive explicit direction. Changing only the sample key is a repeat. |

The batch row is: D-lookup; inferred; applied/pending; A; alternative B;
the three dependent artifact locations; response pending. An unanswered batch
leaves the local draft intact. A Reverse selects B and reruns those dependents.
Approval to land the named batch can cover acceptance and action together.

## Two short selection checks

These fixtures isolate the ordering rules; their options have already passed
authority, scope, and consumer checks, and the supplied cases are accepted as
evidence only within the fixture.

**One stage at a time.** A and B are admissible local surface designs. A fits
the supplied caller idiom better; B better fits an independently recorded layer
responsibility. Neither is a correctness violation. Bounds, predictability and
visible failure do not separate them, and no countercase opposes A's idiom
advantage. Surface stage 4, rule 7, selects A before stage 5 can consider B's
layer advantage. B does not re-enter as the incumbent. For a local-doctrine
question the two stages reverse, so the same stipulated cases select B. This
illustrates the proposed order's consequence, not a proof it is always the
best project policy.

**Three survivors in the fallback.** A, B and C remain tied after every design
stage, with no incumbent. A exposes get and adds two dependencies; B exposes
the identical get plus set and adds none; C exposes read and adds one. All
operations have justified uses in this fixture. Surface containment removes B
as a strict superset of A. A and C are incomparable, so both remain until the
dependency fallback selects C. B's zero dependencies cannot revive it. The
record is arbitrary if the premises are established; if it materially depends
on a proposed comparison premise, it is inferred with the residual tie noted.

If a separate residual tie has one candidate adding one direct runtime package
with three transitives and another adding two direct runtime packages with
none, the defined dependency fallback picks the first: one direct dependency
versus two. Both counts are against the pinned manifest baseline. A concrete
cost of the transitives would be evaluated earlier, not silently change the
fallback's counting convention.

## A demanded convenience

Fixture B supplies a concrete integration issue written independently of the
loop. Its caller retrieves a page through an existing public API and repeats
the same six-step error-recovery sequence in eight places. The issue shows the
sequences and the observed inconsistent recovery behavior. It requests a
helper implementing exactly that recovery policy. The API is unpublished;
the charter authorizes local helper design and includes this integration.
No new governing requirement, dependency, or shared-boundary change is needed.

Here is one caller's current recovery sequence, inside an async function.
The fixture defines readPage as a read with no side effects, isRetryable as
the agreed transient-error classifier, and waitBackoff as bounded and
cancellable. The proposed helper promises exactly the same policy, including
at most two read attempts and propagation of the final error.

```typescript
// Before: repeated at each caller
try {
  return await api.readPage(cursor, { signal });
} catch (error) {
  if (!isRetryable(error) || signal.aborted) throw error;
  await waitBackoff(signal);
  return await api.readPage(cursor, { signal });
}

// After: the same policy, shared by callers who choose it
return await readPageWithRetry(cursor, { signal });
```

In both paths, first-attempt success returns that page after one call. A
nonretryable failure returns the original error without retry. A retryable
failure while active waits once and attempts once more; its page or error
reaches the caller unchanged. Cancellation during the wait rejects the wait
and prevents the second attempt. The helper must preserve all four traces;
hiding exhaustion or changing cancellation would invalidate this comparison.

Compare preserving the existing operations, adding the narrowly scoped helper,
and introducing a general recovery framework. The helper is optional: current
operations can perform the task. It nevertheless passes rule 11 because the
independent caller demonstrates repeated implementation and recovery costs.
The framework's extra features have no consumer and are deferred. Stipulate
that existing bounds, correct-use results, applicable idioms and layer duties
are the same for the helper and the existing path. At the combined rule-5 and
proposal-14 stage, the helper removes the repeated recovery work for callers
who opt in and adds no work to callers using the old path. With no supported
countercase in this fixture, choose it provisionally, inferred and pending.
Its body, recovery examples and behavior checks depend on the recorded policy.

The strongest objection is the new public element and possible maintenance
cost. It is recorded, but this fixture supplies no concrete opposing caller
outcome at the deciding stage. A real loop must supply the issue and sequences
and can reach another answer with a supported countercase. The “impossible
without it” test governs
essential capability, not whether a demanded convenience may be built.

## Partial batch acceptance

D-shape provisionally changes a return type; D-example changes an example to
use that type. Both are inferred and pending. If only D-example is accepted,
neither change can land: the example's required shape is absent from the
landing baseline. Keep the existing type and example together, or rework the
accepted example against the existing type and rerun it. Approval of D-example
does not imply approval of D-shape. If explicit acceptance covers both and the
landing action is authorized, the pair may land after its affected checks.

If a later dependency change invalidates the accepted D-shape, reopening marks
the materially changed shape and example pending again. Their old acceptance
does not cover the changed return type. An unrelated accepted spelling fix can
retain acceptance when its rerun shows that neither its content nor premises
changed. Still-applicable permission to perform the eventual landing is kept
separate from acceptance of the changed design.

## Evaluator case studies and evidence gaps

The first API loop left a compilable, unimplemented Go API at evaluator commit
c908947d3188c05ed9b3819c5aae7e8e107940bb. Its class README, public declarations,
divergence ledger, and original ruling arguments are the inputs. The
[evidence audit](source/EVIDENCE.md) records exact source locations and short
quotations. The class and member have different ownership: changing the Go
surface need not change membership rules. The replay's audience is Go callers
evaluating JSONata over Go values, including callers supplying expressions.
This audience is a replay assumption, not a newly ratified class sentence.

All design recommendations here are inferred unless explicitly identified as
an existing-contract reading. The detailed tests and their order are proposed.
The table retains the original question numbers, including the three parts of
question 8, for comparison with the prior reviews. Entries marked unresolved
are incomplete decision packages: they identify the missing comparison and
retain the incumbent. They are not examples of a completed selection. This
document-improvement loop has no remit to settle those API choices.

| Question | Local disposition | Shared or unresolved part |
| --- | --- | --- |
| 1. Object result types | Retain the incumbent while comparing carriage with compulsory normalization; selection unresolved. | No new class rule needed merely to retain existing carriage. |
| 2. Select shape | Compare a single-key Select plus SelectPath with renaming the existing variadic method; selection unresolved. | Deferred handles need a concrete use. |
| 3. Evaluation concurrency | Compare one goroutine per Evaluation with the incumbent concurrent design; selection unresolved. | Define and compare budgets, ownership and Close together. |
| 4. Regex dialect | Go regexp is a candidate to compare, not a selected engine; hold the conformance claim. | Existing divergence restrictions need resolution; compare any viable bounded alternative. |
| 5. Resolver implementations | Defer optional protobuf and struct adapters until a named integration needs them. | A core dependency is separately flagged. |
| 6. Class README | Hold a proposed rewrite for its owner. | The procedure cannot promote local choices into class doctrine. |
| 7. Close | Compare removal as part of question 3; do not delete as a correction. | Current Close has observable effects. |
| 8a. Rounding basis | Compare a fully specified decimal-digit algorithm with the incumbent binary basis; selection unresolved. | Verify the authority reading and permitted divergence before applying. |
| 8b. Mixed arithmetic | Hold a scoped refusal-versus-rounding recommendation. | Reaffirm the existing class rule's intended scope. |
| 8c. Numeric kinds | Compare representation-defined kinds as a member-model change. | Package jointly with 8b if its arithmetic consequences depend on that choice. |
| 9. Typed exit | Defer optional Canonical and struct decoding; preserve the existing float32 serialization promise. | A future consumer must identify the desired finite output model. |
| 10. Decimal decoding | Retain float64 at decode as the existing member contract. | Do not invent a class-wide requirement. |
| 11. Decoder stance | Recommend recording duplicate and surrogate refusals as decoder policy. | Ledger category consistency depends on the class clarification in 6. |
| 12. Absence | Retain the incumbent triple while comparing it with a sentinel; selection unresolved. | No class-wide requirement for identical host signatures. |

## Why the dispositions follow

**1. Carried and constructed objects.** The baseline promises that carriage
preserves Go type and identity, while constructed objects use an ordered
object type. That gives a concrete cost to compulsory normalization: it would
change an existing promise and traverse values that carriage does not copy.
The counterargument is equally concrete: callers handling both paths need a
type branch. Compare those caller tasks under rules 5 and 7 and proposal 14;
the design selection remains unresolved until that comparison exists. The
incumbent stays in the replay meanwhile. Rule 13 cannot decide:
the baseline already budgets traversals. A new Canonical helper is a separate
optional addition, subject to rule 11, just like the adapters in question 5.

**2. Single key versus path.** A variadic call with two strings can be read as
two fields or as a nested path. The original panel supplied that ambiguity.
Show a single-key call and an explicit path call; compare explanation and
misuse costs under rules 5 and 7. The alternative is keeping the variadic
method and improving its name or documentation. Misreading a documented path
is not a wrong result under correct use, so rule 8 cannot manufacture a
correctness verdict. Selection is unresolved until that comparison is supplied;
all call sites and examples would depend on the resulting decision.

**3 and 7. Concurrency and lifecycle.** The baseline explicitly permits
concurrent Select and Complete calls. Close waits for them, ends sharing, and
makes subsequent calls fail with CodeClosed. Those are observable effects,
even if the implementation owns no external resource. Thus “Close guards
nothing” is false as a baseline statement. The proposed single-goroutine
design removes a coordination need and may justify a simpler lifecycle, but
it must define when sharing ends, what use after that point means, and how
misuse is reported. The counterargument is straightforward: keeping Close
gives callers a named endpoint and a checked closed state. Compare complete
ownership contracts under rules 3, 5, 7 and 8; do not apply the two decisions
independently. Scheduling-dependent budget consumption is a case to evaluate,
not proof that every concurrent contract is invalid: the contract may permit
ordering variation or a different budget design may remove it.

**4. Regex.** The handoff attests that the pinned regex page names delimiters,
flags and a matcher contract without naming a dialect. That removes one
purported authority argument for JavaScript syntax. It does not settle engine
choice or the class's allowed-divergence rule. The current README restricts
departures from reference fixtures to a value-representation ground, which
does not plainly cover refusing a regex construct for resource reasons.
Treat Go regexp as a candidate, document the constructs it rejects, and hold
that class question with 6. Proposal 13 requires the limits and enforcement points
of each candidate. A backtracking implementation with an effective step limit
cannot be dismissed as unbounded merely because it backtracks. A constant
charge before an uninterruptible operation is not an effective step limit.
Any portable subset belongs in a separately approved shared rule.

**5. Resolver adapters.** The baseline provides an extension point; proposed
protobuf and struct implementations have reviewer sketches but no independent
consumer identified in this replay. Rule 11 defers them and records a reopen
condition: an authorized SDK integration naming the input type and the use
the existing Resolver interface cannot conveniently serve. Such an integration
can count before implementation. The strongest objection is repeated adapter
code and representation choices in callers. If that evidence appears, compare
a subpackage against a core dependency; do not automatically defer the needed
work again.

**6. Class wording.** The current class text attributes value choices to the
host and tightly limits divergences. The loop's local proposals need a clearer
statement of which choices belong to a member and which are shared. That is
a recommendation for the class owner, including alternatives and affected
fixtures. It is not a correction compelled by the mere presence of those
choices in an API stub. The README remains the governing class text until an
authorized revision changes it.

**8a. Rounding basis.** The baseline explicitly rounds the binary value and
shows a decimal-looking midpoint for which the reference differs. The handoff
reports that the pinned documentation requires half-to-even but does not
settle the rounding basis; an applying loop needs that passage and a saved
probe. Matching what expression authors see in rendered decimal digits is an
expectations argument under rule 7, with the existing binary-value contract
as the counterargument. Neither is proved by calling the other a wrong value.
Record a candidate member change and any class-text dependency. Do not silently
replace a normative algorithm's value model or label the proposed algorithm
as already shared.

**8b and 8c. Mixed arithmetic and kinds.** The class says “refuses rather than
approximates”; the member rejects some inexact mixed conversions but already
permits rounded integer division. The actual choice is the scope of refusal,
not “all rounding” versus “none.” The incumbent also treats integral float64
values as integers for arithmetic, whatever their representation. Changing to
representation-defined kinds changes that explicit law. Compare complete
models using the same input values and operations, including precision loss,
comparison, formatting and overflow; do not use the proposed kind definition
to neutralize a predictability objection to itself. Hold the class-scope
interpretation. A representation-based model is a candidate member rule, not
proof that all hosts or all class members must follow it. If these choices
depend on one another, record one package rather than a circular chain of
decisions. The known numeric counterexamples in the handoff remain evidence;
this replay does not add an associativity promise for floating point.

**9. Typed exit and float32.** Canonical is an optional new method without an
identified consumer in this replay, so it is deferred on the same grounds as
the adapters. Its putative callers cannot be used to manufacture demand for
it. Separately, the existing Marshal comment promises float32's float64
widening. Preserving that behavior is a high-confidence baseline reading;
deciding a different boundary representation requires a concrete caller case,
a compared alternative contract, and applicable change authorization. This
is a revision of existing behavior, not rule 11's optional-addition gate.
Do not group this existing promise with an unbuilt helper
as though they had one confidence level.

**10. Decimal decode.** The existing member explicitly decodes fraction or
exponent tokens to float64. Keeping it is a high-confidence reading of its
current contract, not a new design conclusion. A decimal-preserving alternative
is possible and would need a different stated model. “Every JSON decoder does
this” is not evidence; even the baseline names Go's UseNumber alternative.
Retaining the member's behavior does not write class text or resolve 8b.

**11. Decoder policy.** The language consumes host values; Unmarshal is an
optional text boundary with explicit refusals. Relabeling the refusals can
clarify that distinction without changing decoder behavior. The strongest
objection is disagreement with a service's other decoder. A caller can choose
another decoder only within the admitted value contract. The proposed ledger
classification depends on the class's grounds for divergence, so mark it
inferred and link the held class recommendation. A documentation label cannot
grant a conformance exception.

**12. Absence.** Compare a caller checking presence and error with a caller
testing a sentinel. Ignoring a documented presence component or sentinel test
is foreseeable misuse on either side, not correct use proving rule 8 neutral
or decisive. The Go lookup idiom and the incumbent surface support retaining
the triple under rule 7, while the sentinel can compose more easily as a value.
Without the concrete caller comparison, selection remains unresolved; retaining
the incumbent meanwhile is not a rule-7 verdict. Portability concerns
distinguish absence from null; they need not
dictate identical Go and TypeScript signatures.

## Three cases outside the evaluator

These fixtures stipulate their contracts so a reader can apply the procedure
without guessing project history. They are examples, not assertions about a
particular released component.

**CLI documentation correction.** A stable CLI contract says a missing record
returns exit code 4. One example says 0. Correcting the example changes no
promised behavior: apply-bin correction, step 1, high confidence. The fact that
the page is published does not make this a contract change. Deployment still
requires whatever authorization the charter specifies.

**New TypeScript lookup API.** An authorized brief calls for an in-memory
lookup where absence is ordinary. It names TypeScript application authors as
the audience and a first-use scenario that must distinguish absence from a
stored null; admitted values exclude undefined. Compare returning undefined
with a tagged result and throwing. Both non-throwing forms can preserve the
distinction. Existing lookup idioms support undefined; tagged results make
presence explicit. Recommend undefined under rule 7, inferred because it
materially uses this draft's proposed operational interpretation of rule 7.
Rule 11 does not
defer the lookup: it is essential to the authorized first-use scenario. If
undefined later becomes an admitted stored value, that is a new case that
reopens the choice and its examples.

**Binding parser versus an informative schema.** A binding incorporates a
format whose normative text permits a case, while its explicitly informative
schema rejects it. Follow the text at high confidence, recording the schema
disagreement. If the governing text instead makes the schema normative and
the two requirements contradict, hold the affected acceptance decision and
package the conflict. Neither observed parser behavior nor a panel majority
can choose the governing meaning. A new implementation convenience outside
the authority's domain goes through the local design tests, with no claim
that the binding specification requires it.
