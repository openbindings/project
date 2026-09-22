# Design decision procedure

> Draft 2, 2026-09-19, revised against a five-lens review of draft 1. Guidance
> for the design loops that iterate the project's specifications, interfaces,
> and public APIs. A loop that reaches a design question decides it by this
> procedure, records the ground, marks the decision revisable, and keeps
> going. The maintainer reviews decisions in a batch, not one at a time in the
> middle of a loop.

## Why this exists

The project runs design loops: an artifact is put in front of a fresh
cold-read panel, the objectively verifiable findings are applied, and the
loop repeats. The first such loop (the JSONata evaluator's Go member, six
iterations, thirty reviews) stalled on twelve questions it classified as
rulings for the maintainer. Reviewed afterward, most had an external oracle
or a single rule that decided them. Three defects in the loop's charter
caused the stall: questions were reserved by category rather than by test;
the design rules had no precedence, so a conflict between two of them
stopped the loop; and a question was allowed to sit pending, which every
reviewer said was worse than either answer.

A wrong decision under this procedure costs one edit plus the re-run of
every decision recorded as depending on it. A stall costs every iteration
after it. So the procedure decides, unless the decision would cross a
publication boundary or bind another repository; those are flagged, and
the artifact keeps its current answer.

## Terms

- **Ground.** What a question is about; see step 0.
- **Core.** The OpenBindings specification (`openbindings/spec`), the
  project's own normative text.
- **Incorporated authority.** A text the project or an artifact adopts by
  reference: an OAS edition, an RFC, the pinned JSONata documentation, and
  a text that documentation itself incorporates (ECMAScript for
  `JSON.stringify`). A reference *implementation* is not an authority; it
  is evidence, and it is named where it is used (for JSONata, jsonata-js
  at the commit the class pins).
- **The design rules.** The project's twelve design rules, ratified
  2026-08-20, restated as tests in step 2. Everything numbered above 12 in
  this document is proposed by a loop and not yet ratified.
- **Artifact.** The thing under iteration: a specification, an interface
  contract, a public API surface, a class document.
- **Surface question.** One whose answer changes a signature, a return
  shape, an error channel, or a rendered form.
- **Value question.** One whose answer changes which value results.
- **Bound question.** One whose answer changes the time, memory,
  recursion, or matching cost an input can impose. Always a step 2
  question; never adopted from a reference.
- **Consumer.** A caller in a project repository identified by a commit,
  an open issue on that repository, or a named SDK integration point, that
  would use the element on landing. A reviewer's request, a sketch in a
  review, and a measured cost are evidence for a rule, not consumers.
- **Published.** Reachable by a consumer outside the repository at a
  stable identifier: a tag, a version file in the interfaces repository, a
  page on openbindings.com, an npm or pkg.go.dev listing that a release
  produced. A public repository with a working module path is not by
  itself published; a working draft on `main` is not published unless a
  page renders it.
- **Demonstrable case.** A concrete input with its outcomes written out: a
  wrong example, a contradiction between two sentences, a law stated in
  the artifact or an authority *before* the finding and shown violated. A
  law first stated in the finding is a preference.
- **Loop precedent.** A decision recorded under this procedure. It is
  cited as evidence by later loops and re-decided freely. A **maintainer
  ruling** is one the maintainer has signed; extending it beyond the kind
  it was stated for is a re-affirmation.

## The procedure

**Step 0. Classify the ground.**

- (a) Core vocabulary or document rules, and any doctrine that governs
  more than one artifact of a kind (a convention shared by binding
  specifications; a class document that binds every member).
- (b) an incorporated authority's text.
- (c) doctrine local to one artifact (one binding specification's own
  conventions, one member's README).
- (d) an implementation surface: an API shape, a representation, a bound.

A question on two grounds is classified by the ground whose text would
change if the answer changed. If the loop cannot state in one sentence,
quoting the artifact, why a question is not ground (a), it is ground (a).
Ground (a) is flagged (see "What escalates"); (b) is answered by reading
the text; (c) and (d) are decided here.

**Step 1. The authority cascade.** Quote the text; do not paraphrase it.
If the text cannot be read (the pinned page is unavailable), the loop
does not reconstruct it from memory: it proceeds to step 2 at `inferred`
confidence with `authority unread` in the record.

1. Read every section the rule cites, including tables and examples. If
   the authority answers once, that is the answer. If it answers in two
   places that disagree, apply this order: its normative prose; then its
   own examples; then an authority it incorporates, read as an algorithm
   over the abstract value with the incorporating host's value model
   replaced by this artifact's; then the reference implementation's
   observable behavior. If two incorporated authorities disagree and the
   citing text ranks neither, the question is flagged.
2. If the authority is silent, a reference implementation exists, the
   question is about observable behavior (a function's result, an
   operator's meaning, a syntax accepted), and neither a value, a surface,
   nor a bound is implicated: adopt the reference's behavior and do not
   call it a divergence. Silence plus a working reference is not a design
   opportunity. Where no reference exists, this step does not apply; a
   working consumer of the authority is evidence for rule 7, not a
   reference.
3. Otherwise continue to step 2.

**Step 2. The design rules, as tests.** Each rule restated as a question
with a yes or no answer. A rule that does not apply is skipped, not
stretched. A rule claimed for an option must be claimed with a
demonstrable case; a rule claimed with such a case for *both* options is
neutral and enters no precedence.

| Rule | Test |
| --- | --- |
| 1, 2. Two grounds of truth; support exactly what upstream supports | Step 1 rules. A rule 1 citation in step 2 means step 1 should have closed the question; record step 1 instead. |
| 3. Every layer claims exactly its job | With the layer's job quoted from the layer's own contract (a package overview, a binding-specification section, a class rule): does one option make the layer do something its contract does not name, or claim an effect it does not have? A job the arguer describes rather than quotes does not count. |
| 4. Suspect uniformity that couples | Is the argument for an option "it makes X the same as Y"? That is not a reason by itself; ask what the sameness costs. A method; never decides. |
| 5. DX is supreme inside the constraints | Among options that pass the tests above, which has the shortest correct common path for the consumer named under rule 7? |
| 6. Zero configuration to start | Does the first call work with nothing configured, and is the unconfigured behavior the one that cannot corrupt a value? |
| 7. Delegate to formed expectations | Name the consumer first, from the surface's own declared audience, quoted (a Go package's "callers"; a binding specification's "consumers of the artifact"; a language's "authors"). What does that consumer already expect here? An argument that changes the consumer to change the answer is void. |
| 8a. Loud, not quiet | Under correct use of the surface's own contract, can this option return a wrong value without an error? A failure the caller can reach only by ignoring the contract is rule 7's to weigh. A result the value model defines as that domain's arithmetic (a rounded binary64 sum) is not a wrong value. |
| 8b. One outcome per input | Within one kind of value, can one input produce different outcomes depending on its spelling (`100` versus `100.0`), on grouping (`(a * b) * c` versus `a * (b * c)`), or on scheduling? Test both cases before adopting a numeric or ordering rule. |
| 9. Substitutability is the payoff | Would two independent implementations that both follow this option agree, given the option's text alone? |
| 10. Rule the general form | Is the answer stated for the case at hand or for every case of its kind? Restate it for the kind. A method. |
| 11. Challenge gaps before filling them | Is there a consumer (as defined above)? Without one the gap is recorded with what would count as a consumer, and not built. A method. |
| 12. Systems serve shipping | Does the option require work no consumer needs before anything ships? Defer it. A method. |
| 13. Bounded cost under adversarial input (proposed) | Is the cost an input can impose (time, memory, recursion, matching steps) bounded by a stated limit under this option? An option whose cost is unbounded loses to one whose cost is bounded, whatever the reference does. |

**Step 3. Precedence.** Applied only when two rules, each claimed with a
demonstrable case, give opposite answers on the same option. Precedence is
lexicographic: one higher rule beats any number of lower ones. Each side
names one deciding rule; every other rule cited is supporting.

1. Rules 1 and 2 (step 1). The authority text.
2. Rule 13. Bounded cost.
3. Rule 8b. One outcome per input.
4. Rule 8a. Loud, not quiet.
5. For a ground (d) question, rule 7 then rule 3; for a ground (c)
   question, rule 3 then rule 7.
6. Rule 9. Substitutability.
7. Rules 5 and 6, in that order.
8. Rules 4, 10, 11, and 12 are methods: they shape how an answer is
   stated and whether it is built now, and never break a tie.

When one rule is claimed for both sides with a demonstrable case each, it
is neutral; the next rule in the order decides. When no rule in the order
separates the options, the choice does not matter: pick the option with
the shorter text, record it at `inferred`, and continue.

**Step 4. Record and move on.** Every decision gets a label `D-N` that
appears in the loop's `DECISIONS.md` and in the artifact where the
decision is stated, so a later panel reads the decision and its ground
rather than re-arguing it. The record for each decision:

- `D-N`; the iteration decided; the iterations in which it was re-raised
  and by which lenses.
- The question, one line. The answer, one line. The option not taken,
  stated concretely enough to adopt verbatim.
- The ground: step and rule; for step 1 the quoted text. Confidence:
  `high` (a ratified rule, or a step-1 text, decides it outright),
  `medium` (the precedence in step 3 decides it), `inferred` (a proposed
  rule or precedent decides it, or the authority was unread).
- The strongest argument against, two lines.
- Depends on, and depended on by, as `D-` labels, across repositories
  where that applies.
- The artifact locations touched.

A decided item is re-run only when a panel supplies a demonstrable case
the record did not consider, or when a lens that has not raised the
record's counterargument raises it. A preference alone does not reopen a
decision. An item whose answer changes on re-run without a new
demonstrable case is **unstable**: it is pinned at its first answer,
marked `unstable`, flagged for the batch, and the loop continues.

The batch review is one table, sorted by confidence ascending and then by
re-raise count descending. The maintainer marks each row Keep, Reverse
(naming the option not taken), or Rule (the maintainer writes the general
form). Silence is Keep. A Reverse reopens the decisions listed as
depending on it. Only the `inferred` rows and the flagged items need
reading closely; the rest is a scan.

## What escalates

Two things stop a loop before it acts: spending money, and publishing,
tagging, deploying, or pushing to a shared branch outside the loop's own.

Everything else on this list is a **flag**: the loop records a ruling
package (both sides, its recommendation, the deciding rules it could not
apply), the artifact keeps its **current** answer marked with the `D-`
label, and the loop continues. A flagged ground (a) item adds no text to
the artifact that a consumer could rely on; it carries a marked hole and
the recommendation. A flagged item counts as pinned for a loop's blocked
stopping condition.

- A ground (a) question.
- A change to a published contract, as defined above. Before publication
  the procedure decides.
- A decision that changes what another repository, the other SDK, or a
  member of the same class not yet written must do at an observable
  boundary. The record's "depended on by" crosses a repository.
- A bound or security property traded against fidelity to an authority,
  stated with the property and the constructs refused.
- Extending a maintainer ruling beyond the kind it was stated for (rule
  10). Applying it to an instance of that kind is a citation and does not
  escalate.
- Two incorporated authorities disagreeing where the citing text ranks
  neither; a rule neutral on both sides with nothing below it separating
  the options is not a flag, it is a coin toss (step 3).

## Precedents from the first loop

Rules the first loop needed that the twelve did not state. They are loop
precedent (see Terms), cited by number as evidence, and ranked where the
rule they apply ranks. Those marked *evaluator classes* presuppose a
language with a class document, members, a value model, and a reference
implementation; they do not run on a binding specification or an
interface contract.

**P1. Pending is worse than either answer.** An unsettled item is a
silent divergence with an unknown value. Decide it, or flag it with the
current answer kept; never leave the artifact without a stated behavior.
(Method.)

**P2. Panel convergence detects facts, not taste.** Several lenses
agreeing on a demonstrable case is grounds to apply. Several lenses
agreeing on a preference is evidence for step 2 and never a verdict; a
preference that flips under re-framing is not a rule. (Method; with the
"law stated before the finding" rule in Terms.)

**P3. The standard-library analogue is named before the answer.** For a
surface question in a host with a standard library, the analogue for the
same situation is chosen by the element's structure (a compiled program
reused across inputs; a per-input handle; a lookup with an absent case)
and written down first. Two analogues that disagree decide nothing.
(Ranks with rule 7.)

**P4. The obvious reading of a call is its meaning.** A call whose shape
admits a plausible reading that differs from its meaning is renamed or
reshaped so it does not, or it does not compile. (Ranks with rule 8a. The
first loop's case: a variadic path parameter next to a plural `Fields`
method read as a list of fields.)

**P5. An element must have an observable job.** A method that releases
nothing and guards nothing, or an enumerator that exists to describe the
implementation's immaturity, claims a job it does not have. Delete it or
give it a job. A method whose job is to end something (a cancel function,
a borrow window) has one. (Ranks with rule 3.)

**P6. The project owns a decision every integrator would otherwise make
differently.** When a consumer exists and the same sixty lines with six
representation decisions appear in every integration, the project decides
once and ships it, in a subpackage so the core stays free of the
dependency. When no consumer exists, rule 11 defers it and the record
names what would count as one. (Ranks with rule 10 as a method; rule 11
decides the timing.)

**P7. Doctrine catches up with the practice the procedure endorses.** When
a doctrine document forbids most of the decisions recorded under it, the
doctrine is rewritten to state the grounds actually used, after each
recorded decision has been run through steps 0 to 4 and passed. An entry
that predates the procedure has not passed it. This is not "shipped
behavior governs"; it is the procedure governing and the doctrine catching
up. (Ground (a) when the doctrine binds more than one artifact.)

**P8. The value model is the class's, realized in the host's types.**
(*Evaluator classes.*) What a value is and how two combine is stated once
by the class and implemented by every member; the host supplies
representations and primitives. "The host decides" is never a ground.
(Ranks with rule 9.)

**P9. Kind-determinism for arithmetic.** (*Evaluator classes.*) A value's
arithmetic kind is its representation's kind: integer types are integers;
binary64 is binary64 whatever its value. The kind of a result is a
function of the kinds of its operands. Equality, ordering, and membership
across kinds are by mathematical value. Substitutivity is a law within a
kind and is not promised across kinds, as in every host with two numeric
kinds. Rule 8b's spelling and grouping tests are applied within a kind.
(Ranks with rule 8b.)

**P10. A boundary follows its named consumer only when the consumer reads
back the same value.** (*Evaluator classes.*) An encoder or decoder
renders as the consumer on the other side expects, provided a conforming
consumer reads back the value the language computed with; a rendering the
consumer would read as a different value fails rule 8a. (Ranks with rule
7.)

**P11. Refuse the unrepresentable.** (*Evaluator classes; pending the
maintainer's ruling on mixed arithmetic, worked example 8b.*) Refusal is
for what a domain cannot hold at all: overflow past a stated bound, a
non-finite result, division by zero, an exhausted budget. Whether an
inexact conversion between kinds is refused or rounded is the open
question.

## Worked examples: the first loop's twelve questions

Re-run under this draft. Where the draft changes the first draft's
answer or its reason, the row says so.

| # | Question | Answer | Deciding rule (one per side) | Strongest argument against | Confidence |
| --- | --- | --- | --- | --- | --- |
| 1 | Result object type: carried objects come back as the caller's `map[string]any`, constructed ones as an insertion-ordered `*Object`; unify? | Keep the split; add `Canonical` as the opt-in uniform exit. | For uniform: rule 7 (consumer: the package's callers, quoted; `encoding/json` returns one object type). For the split: rule 13 (a uniform result requires an O(result) conversion walk on every evaluation over carried data, a cost proportional to input that no limit bounds; the split costs a type switch). Rule 13 outranks rule 7. | Every consumer pays the two-arm switch; six panels called it the largest ergonomic cost. | medium (draft 1 cited rule 4, a method) |
| 2 | `Select(ctx, path ...string)` reads as several fields and means one nested path. | `Select(ctx, key)` for one field; `SelectPath(ctx, path)` for descent; compile-resolved handles deferred. | P4 with rule 8a's case (`Select(ctx, "id", "name")` returns absent with no error). Rule 11 defers handles: the allocation argument is a measured cost, not a consumer. | Variadic paths are idiomatic (`filepath.Join`); the fault was the name beside `Fields()`. | high |
| 3 | Is a per-input `Evaluation` safe for concurrent use? | Single-goroutine by rule; one `Evaluation` per goroutine. | Rule 8a: under correct use of the concurrent design, budget exhaustion becomes scheduling-dependent (a `CodeBudget` at a different point for the same input); the single-goroutine design's data race is reachable only by ignoring its contract, so it is not a rule 8a case. P3: the analogue by structure is a per-input handle (`sql.Rows`, `json.Decoder`), named before the answer. | A fan-out handler sharing one Evaluation is a real pattern; the integrator lens sketched it once. | high |
| 4 | Regular-expression dialect, pending for six panels. | The host's engine (Go's `regexp`), declared; constructs it does not support refused at compile time and at `$eval` with a stable code; a portable subset stated by the class. | Rule 13: a backtracking engine's cost under a hostile pattern is unbounded; step 1.2 is fenced for bound questions, so the reference's dialect is not adopted whatever the pinned page says. Fidelity-over-coverage applies to an instance of its stated kind (refuse what the engine cannot support faithfully), a citation. | Expressions written against the reference and its playground use lookaround and backreferences and will not port. | high |
| 5 | Ship Resolver implementations for protobuf and structs? | Defer; record that an SDK integration point naming a protobuf message type is what counts as a consumer; ship as subpackages when it exists. | Rule 11 (no consumer as defined; five panels of reviewer sketches are evidence, not consumers). P6 fires when one exists. | The sixty-line sketch with six guesses appears in every integration. | high (draft 1 cited P6 for a deferral) |
| 6 | The class README attributes to "the host" decisions the Go member made for the class. | **Flagged**: a class document binds every member, so it is ground (a). The loop drafts the rewrite as its recommendation (the value model as a language-neutral document; an authority precedence; a divergence rule naming the grounds the ledger uses; the closed-environment rule naming the Resolver door; selection unobservable in success; the portable core as a tested profile) and the README keeps its current text. | Ground (a) by the step 0 tie-break. | The rewrite is derivable from P7 and P8 and waiting costs every member started before it lands. | flagged |
| 7 | Keep or delete `Evaluation.Close`. | Delete it, given 3. | P5 with rule 3's quoted contract: after 3, `Close` releases nothing and guards nothing; "the input and env must not be modified while the Evaluation is in use" states the borrow. | The end of the sharing window is explicit with `Close` and implicit without it. | medium (depends on D-3) |
| 8a | `$round` on a decimal midpoint: the binary value or the decimal digits? | The shortest round-trip decimal digits the language itself renders; pinned as a class algorithm. | Step 1 ladder: prose says half to even; the examples are exactly representable and decide nothing; no incorporated authority; the reference rounds the decimal digits. A value question, so step 1.2 does not adopt it; at step 2, rule 7 (consumer: transform authors, quoted from the class README) expects decimal rounding, and rule 9 is satisfied by pinning either algorithm. | The binary value is never a tie, so half-to-even on it is a different function from rounding the printed digits. | medium (draft 1 cited rule 1; the authority is silent on the basis) |
| 8b | Mixed integer and decimal arithmetic: refuse an inexact conversion, or round once? | **Flagged**: rule 8a is claimed for both sides with a case each (refusal: an identifier loses digits silently on entering the decimal domain; rounding: three error classes for one product under grouping, though P9 makes that within-kind and neutral), and the standing README rule "refuses rather than approximates" is a maintainer ruling whose kind (integers and the unrepresentable, or every inexact operation) is exactly the question. The artifact keeps refusal; the recommendation is round once under P9, with refusal reserved for the unrepresentable (P11). | Re-affirmation of a maintainer ruling beyond its stated kind. | The reference language's own host refuses mixed `BigInt` and `Number` with a `TypeError`. | flagged |
| 8c | When is an integral float64 an integer? | Never by value: P9. Kinds are by representation; a float64 is binary64 whatever its value; comparison across kinds is by value; what a mixed operation does is 8b. `$string(1e21)` is `"1e+21"`; `1e23 + 1` is `1e23`. | P9 (every two-kind host); rule 8b within a kind. Draft 1's "substitutivity holds" under a cap was false: `float64(2^53 + 2) + 1` and the equal `int64 + 1` differ under any rounding rule. | `x / 100.0` and `x / 100` differ for a large `x` under refusal; under round-once they agree to the last unit. | medium (depends on D-8b) |
| 9 | A typed exit from results. | `Canonical` with a finite output model; the encoder renders a carried `float32` as its float64 widening; struct decoding and multi-select deferred. | Rule 7 (consumer: callers of `Canonical`, quoted; `encoding/json` promises what `Unmarshal` into `any` yields). P10 for `float32`: a JSON consumer reading `0.1` would compute with a different float64 than the language did, a rule 8a case. Rule 11 for the deferrals. | Every protobuf `float` field renders as `0.10000000149011612`. | medium (draft 1's 32-bit rendering reversed) |
| 10 | Does a decimal token keep its spelling or become a float64 at decode? | A float64 at decode. | Step 1: RFC 8259 §6 is a non-normative interoperability note and §9 permits arbitrary precision; the authority is silent on representation. At step 2, P8 (the class states that a decimal is binary64) and rule 7 (consumer: callers of `Unmarshal`; every JSON decoder does this). | A token float64 cannot reproduce loses digits it carried. | medium (draft 1 cited rule 1) |
| 11 | Are duplicate-key and surrogate-escape refusals in the decoder language divergences or the decoder's stance? | The decoder's stance, relabeled in the ledger; a binding needing last-wins uses the host's decoder. | Rule 3 with the decoder's own contract quoted ("decodes JSON text into admitted values"). | The rest of the service accepts the same body. | high |
| 12 | `(value, present, err)` or an `Undefined` sentinel value? | Keep the triple. | Rule 8a neutral (each option has a quiet path under correct use: `v, _, err` for the triple; a sentinel placed in a container for the sentinel). Rule 7 (consumer: Go callers; comma-ok, and no standard-library precedent for a sentinel `any`). | A sentinel fails loudly at `Marshal`; the triple's footgun is documented rather than removed. | high (draft 1's row contradicted the precedence) |

Ten decided, two flagged. Under draft 1 all twelve were "decided"; the
two flags are the honest cost of pinning rule 7's consumer and requiring
a demonstrable case for rule 8a.

## Applying this to loops

A loop's charter carries no "frozen pending ruling" list. A finding that
is not a demonstrable case and not an apply-bin item goes to a **decide**
bin: the loop runs steps 0 through 4, applies the result, states it in
the artifact with its `D-` label, and records it in `DECISIONS.md`. A
flag never stops the loop: the artifact keeps its current answer, marked,
and the package waits for the batch review.

A loop's stopping conditions do not gain a clause for instability; an
unstable item is pinned and flagged (step 4), and the loop's existing
blocked condition covers the case where pinned items cap its grades.
