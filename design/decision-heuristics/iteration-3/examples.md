# Applying the design decision procedure

Companion to [draft 3](../../policies/decision-heuristics.md). These are
replays for checking the procedure, not new evaluator rulings. None edits the
evaluator. A recommendation can be sensible without being uniquely forced.

## Replay baseline

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
question 8, for comparison with the prior reviews.

| Question | Local disposition | Shared or unresolved part |
| --- | --- | --- |
| 1. Object result types | Recommend retaining carriage and construction types; defer a new normalization helper pending a concrete use. | No new class rule needed to retain existing carriage. |
| 2. Select shape | Recommend a single-key Select and a separately named SelectPath. | Deferred handles need a concrete use. |
| 3. Evaluation concurrency | Recommend one goroutine per Evaluation; reusable Expression remains shareable. | Recheck budgets, ownership and Close together before applying. |
| 4. Regex dialect | Recommend Go regexp as a bounded candidate; hold the conformance claim. | Existing divergence restrictions need resolution; compare any viable bounded alternative. |
| 5. Resolver implementations | Defer optional protobuf and struct adapters until a named integration needs them. | A core dependency is separately flagged. |
| 6. Class README | Hold a proposed rewrite for its owner. | The procedure cannot promote local choices into class doctrine. |
| 7. Close | Compare removal as part of question 3; do not delete as a correction. | Current Close has observable effects. |
| 8a. Rounding basis | Recommend decimal-digit rounding for comparison with the incumbent binary basis. | Verify the authority reading and permitted divergence before applying. |
| 8b. Mixed arithmetic | Hold a scoped refusal-versus-rounding recommendation. | Reaffirm the existing class rule's intended scope. |
| 8c. Numeric kinds | Compare representation-defined kinds as a member-model change. | Package jointly with 8b if its arithmetic consequences depend on that choice. |
| 9. Typed exit | Defer optional Canonical and struct decoding; preserve the existing float32 serialization promise. | A future consumer must identify the desired finite output model. |
| 10. Decimal decoding | Retain float64 at decode as the existing member contract. | Do not invent a class-wide requirement. |
| 11. Decoder stance | Recommend recording duplicate and surrogate refusals as decoder policy. | Ledger category consistency depends on the class clarification in 6. |
| 12. Absence | Retain value, presence, error as a revisable Go surface choice. | No class-wide requirement for identical host signatures. |

## Why the dispositions follow

**1. Carried and constructed objects.** The baseline promises that carriage
preserves Go type and identity, while constructed objects use an ordered
object type. That gives a concrete cost to compulsory normalization: it would
change an existing promise and traverse values that carriage does not copy.
The counterargument is equally concrete: callers handling both paths need a
type branch. Compare those caller tasks under rules 5 and 7 and proposal 14;
retaining the split is a recommendation, not a theorem. Rule 13 cannot decide:
the baseline already budgets traversals. A new Canonical helper is a separate
optional addition, subject to rule 11, just like the adapters in question 5.

**2. Single key versus path.** A variadic call with two strings can be read as
two fields or as a nested path. The original panel supplied that ambiguity.
Show a single-key call and an explicit path call; compare explanation and
misuse costs under rules 5 and 7. The alternative is keeping the variadic
method and improving its name or documentation. Misreading a documented path
is not a wrong result under correct use, so rule 8 cannot manufacture a
correctness verdict. The recommendation is inferred, and all call sites and
examples depend on it.

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
Recommend Go regexp, document the constructs it rejects, and hold that class
question with 6. Proposal 13 requires the actual limits and enforcement points
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
deciding a different boundary representation would require a concrete consumer
and its contract. Do not group this existing promise with an unbuilt helper
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
This remains a surface recommendation at inferred confidence, not an authority
answer. Portability concerns distinguish absence from null; they need not
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
presence explicit. Recommend undefined under rule 7, inferred because this
is a design application rather than an authority answer. Rule 11 does not
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
