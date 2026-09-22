# Guidance panel: specification and consistency skeptic

Cold read of the decision-procedure draft, 2026-09-19.

## Grades

| Criterion | Grade | One-line justification |
| --- | --- | --- |
| Decidability | C | Step 0's categories overlap, step 1's "language does" versus "values or surface" split has no test, and rule 7 and rule 8 each contain two sub-tests that can point opposite ways, so two cold readers reach different answers on at least four of the twelve examples. |
| Internal consistency | C- | Example 12 contradicts the step 3 order it cites; example 4 contradicts step 1.2 and escalation bullet 4; example 5 contradicts heuristic 22, which it cites as deciding; heuristic 21 restates step 1.2 with a different condition. |
| Generality | C- | Step 1.2 assumes a reference implementation exists (true for JSONata, false for OpenAPI, AsyncAPI, gRPC, usage); the vocabulary (class, member, ledger, suite/, the reference) is jsonata-evaluator's and undefined here. |
| Escalation boundary | C | Bullet 4 as written escalates half of all binding-spec decisions and is violated by example 4; no bullet catches a security-property tradeoff or a rule-8-versus-rule-8 value call (8b), which the loop itself flagged as the maintainer's. |
| Clarity and tone | B- | Sentences are clean and the tests are well phrased, but the document reads as one loop's post-mortem, "the strongest argument against" is mandated in step 4 and absent from every worked example, and a reader from openapi-client cannot parse "the class decided, and here is the text". |
| Overall | C+ | The skeleton (classify, cascade, tests, precedence, record) is right and the precedence order is a real improvement; the procedure is not yet total or deterministic, and three of the twelve resolutions do not follow from the rules cited for them. |

## Totality, determinism, consistency

**Totality: fails.** Three inputs reach no output.

1. Authority silent, question about what the artifact does, no reference implementation. Step 1.2 says "adopt the reference implementation's behavior". For an OAS 3.1 question (say, whether `additionalProperties: false` on a `parameters`-level schema is honored for cookie parameters) there is no reference implementation. Step 1.2 has no else-branch, and step 1.3 does not apply because the question is neither values nor surface. The procedure halts with no answer and no escalation bullet fires.
2. Authority answers in two places that disagree. Step 1.1 has only "yes" and "silent". The pinned JSONata documentation's normative sentence for `$string` names `JSON.stringify` while the reference renders at fifteen significant digits; the documentation's prose for `$round` says ties-to-even while every example is a decimal literal. The RULINGS item 6g wrote the missing ladder (prose, then examples, then an authority incorporated by reference with the value model substituted, then the value model, then the reference). This document dropped it.
3. Two incorporated authorities disagree. Example 10 cites RFC 8259 for the decode boundary; example 8c cites `JSON.stringify` (ECMAScript) for the same number domain. Both are "rule 1". Nothing orders RFC against ECMAScript when they speak differently about the same value (RFC 8259 §9 permits arbitrary precision; ECMAScript does not).

**Determinism: fails.** Five inputs reach two answers depending on the reader.

1. Regex dialect. Reader A classifies it as "what the language does" and lands in step 1.2: adopt the reference's dialect, JavaScript's, and do not call it a divergence. Reader B classifies it as "surface" and lands in the lens, where rule 8 is stretched into "linear-time is predictable" and Go's `regexp` wins. The document takes B's answer (example 4) without saying why it is a surface question. No test separates 1.2 from 1.3.
2. Result object type. Rule 7 asks what "a user of this kind of surface" expects. The surface's consumer is a Go caller (expects one result type; `encoding/json` never returns two). Example 1 instead applies rule 7 to "a JSONata author". Both are formed expectations of the surface; the document does not say which consumer rule 7 names when a boundary has two.
3. `Undefined` sentinel versus triple. Rule 8 has two prongs: loud over quiet, and one outcome per input. The sentinel is loud at `Marshal` and quiet when it leaks into a container; the triple is quiet under `v, _, err`. Rule 8 answers both ways and nothing orders its prongs.
4. Heuristic 21's oracle. "The host's standard library's shape for the same situation" requires choosing the analogous stdlib type. `regexp.Regexp` and `text/template` are concurrent-safe compiled programs; `sql.Rows` and `json.Decoder` are single-goroutine per-input handles. Deciding which is "the same situation" is the whole of example 3; the heuristic does not decide it, rule 3 does.
5. "Consumer" (rules 11, 12; heuristic 22; examples 2, 5, 9). Five consecutive panels of an integrator asking for a shipped protobuf Resolver with an eighty-line sketch is a consumer to one reader and "a reviewer's wish" to another. Example 5 shows the document itself cannot decide: it cites heuristic 22 (ship it) and resolves as rule 11 (defer).

**Consistency: fails.** Concrete contradictions:

- Example 12 says "rule 8 argued for the sentinel and loses at precedence 3." Step 3 puts rule 8 at position 2 and rule 3 at position 3. Under the document's own order rule 8 wins and the sentinel is adopted. Either rule 8 is a wash (both options fail it) and rule 3 decides alone, in which case confidence is "high", not "medium", and precedence was never invoked; or the order is wrong. The text as written contradicts the table it sits above.
- Example 4's second branch: "If it names JavaScript syntax: the same engine, with the unsupported constructs declared as refusals under the standing fidelity-over-coverage ruling." That is extending a prior maintainer ruling to a new instance, which escalation bullet 4 names as a stop. The example says "Decided either way."
- Example 4's first branch: documentation silent, the question is what `$match` does with a pattern; step 1.2 says adopt the reference. The example adopts the host engine instead. Step 1.2 has no exception, and step 3's precedence orders lens rules among themselves, not against step 1.2.
- Step 3.7 says rules 4, 10, 11, 12 "never break a tie by themselves." Examples 2, 5, and 9 list rule 11 or 12 as a deciding step, and in example 5 rule 12 decides the whole question ("when the first SDK consumer needs one").
- Step 0: "(b) is answered by reading the text." Step 1.2 and 1.3 exist precisely because a (b) question can find the text silent. And "Only (a) escalates by default" is contradicted by escalation bullets 2 through 5, none of which is ground (a).
- Rule 1 in step 2 is unreachable. Step 1.1 exits when the authority answers. Step 2 is reached only when it is silent, at which point the rule 1 test ("is one option what the authority text says?") is always no. Yet examples 8a, 8c, and 10 cite rule 1 inside step 2 with "high" confidence. What they actually cite are paraphrases ("RFC 8259's interoperability promise is doubles"; "`JSON.stringify` speaks for binary64"), which step 1 forbids: "Quote the text; do not paraphrase it."

## Rule-by-rule audit

- **13 (pending is worse).** Genuinely new, but procedural: it says *that* the loop must decide, never *what*. Citing it as a deciding step (example 4) is a category error. Overlaps rule 8 in spirit.
- **14 (value model is the class's).** Genuinely new as a layering assignment; it is rule 3 applied to the class/member boundary plus rule 9. Correct and load-bearing. "Class" and "member" are undefined in this document.
- **15 (boundary follows its consumer).** Overlaps rule 7 (it says so) and rule 3. Its new content, "a value may render differently inside the language and at the boundary", is fine but there is no test for what counts as a boundary: `$string` is inside the language and faces a JSON consumer. Example 9's float32 rendering is actually decided by heuristic 21 (`encoding/json` precedent), not by any JSON consumer's expectation, since JSON has no float32.
- **16 (one rule per domain).** Redundant with rule 8's second prong; it says so ("fails rule 8"). Its real content is a test procedure (grouping and spelling cases), which is a method. And it does not decide 8b: "domain" per heuristic 17 makes integers and binary64 two domains, and 8b is the cross-domain case, where "one rule per domain" gives no answer.
- **17 (refuse the unrepresentable, round the inexact).** Genuinely new as a value rule. Its last sentence ("refusing an inexact conversion while permitting an inexact quotient is two policies") asserts the conclusion of 8b; the iteration-6 counter-position held they are one policy each with different objects (operand versus result). It also contradicts rule 8's first prong: `$$.id + 0.5` silently losing digits is the quiet failure rule 8 (position 2) rejects.
- **18 (obvious reading is the meaning).** Redundant with rule 8 prong 1 and rule 7. The one new clause, "or not compile", is a real preference for type-level rejection and worth keeping. "Obvious" is reader-relative and undefined.
- **19 (observable job).** Redundant with rule 3 (it says so). As a general rule it is false: `context.CancelFunc`'s only effect is to make later calls fail, and that is its job. The heuristic needs "releases nothing and guards nothing", which is what example 7 actually relies on.
- **20 (convergence detects facts).** Genuinely new and the most important process rule here. Under-defined at "a law violated": once heuristic 16 declares "one rule per domain" a law, any policy violating it becomes a demonstrable case, panel convergence becomes a verdict, and 20 has been defeated by 16. That is how 8b was decided.
- **21 (stdlib decides shape; reference decides silence).** First sentence: redundant with rule 7, whose own text already names "a Go standard-library user". Second sentence: redundant with step 1.2 but with a different condition ("no value is implicated" versus "not about values or the surface"). Two statements of one rule with two conditions is a nondeterminism generator.
- **22 (project owns what every integrator would decide differently).** Overlaps rule 10 and rule 3 (it cites both). Contradicts rule 11 and rule 12 whenever the "consumer" is a reviewer rather than a caller. Step 3.7 says none of 10, 11, 12 breaks a tie, so 22 versus 11 is unordered. Example 5 resolves it by fiat.
- **23 (doctrine matches endorsed practice).** Genuinely new. Its proviso ("provided each ledger entry passed the procedure") is never satisfied by the case that motivated it: the ledger predates the procedure. Either drop the proviso or state that the loop re-runs each ledger row through steps 0 to 4 before rewriting the doctrine. It also does not say what happens when ledger rows contradict each other.

## The precedence audit

Unordered pairs that can conflict:

- **Step 1.2 versus rule 8 (and rule 3).** "Adopt the reference" versus "reject what fails quietly or unboundedly". Example 4 needs this ordering and the document does not give it; step 3 orders lens rules only.
- **Rule 8 prong 1 versus rule 8 prong 2.** Loud-over-quiet versus one-outcome-per-input. Examples 8b and 12 are decided inside this gap.
- **Rule 7 (consumer A) versus rule 7 (consumer B).** Example 1: Go caller versus JSONata author. Heuristic 15 gestures at it but supplies no classification.
- **Heuristic 22 versus rule 11.** Ship-once versus defer-without-consumer. Example 5.
- **Rule 9 versus rule 12.** Pin a class-wide profile now (example 6, "the portable core becomes a tested profile") versus defer until something ships. RULINGS shows this flipped from "defer until consumer" to "required before a second member"; the document records the outcome as "medium" without saying which rule won.
- **Rule 3 versus rule 3.** Example 7: "Close ends the borrow window" is a job (security reviewer) versus "Close releases nothing" (idiom). Rule 3 argues both ways; the tie-break is the conditional on example 3, which should be stated as the deciding step.

Orderings that contradict a worked example:

- Rule 8 at position 2 above rule 3 at position 3 contradicts example 12's "loses at precedence 3".
- Step 3.7 ("never break a tie by themselves") contradicts examples 2, 5, and 9, where rule 11 or 12 is the only cited rule for the deferral.

Cycles: none found in the stated order. The gaps are the problem, not cycles.

## The twelve resolutions, checked

1. **Object split.** Does not follow. Rule 4 is a method (step 3.7) and is cited as a deciding value. Rule 7 is applied to the JSONata author when the surface's consumer is a Go caller whose formed expectation (one result type) runs the other way; that is a rule 7 versus rule 7 conflict the precedence does not resolve, which by bullet 3 is an escalation, not "high". Separately, step 1.2 is skipped: the documentation is silent on key order and the reference hoists integer-like keys before insertion order (RULINGS 6f, 6k), so an insertion-ordered `*Object` diverges from the reference on a language-does question. The resolution is at best incomplete.
2. **`Select` path.** Follows from heuristic 18 for the split into `Select` and `SelectPath`. The deferral of compile-resolved handles rests on rule 11's "no consumer"; the performance case in RULINGS was concrete and measured. Whether a measured cost is a "consumer" is undefined. Follows conditionally on that definition.
3. **`Evaluation` concurrency.** Follows. Rule 8's scheduling prong (budget exhaustion becomes scheduling-dependent) is the actual decider and is applied correctly. Heuristic 21 does not decide it (the analogue choice is the question); rule 3 does. Cite rule 8 and rule 3, drop 21.
4. **Regex dialect.** Does not follow. Heuristic 13 decides nothing. Rule 8 is stretched (linear-time is a bound property, not loudness or per-input determinism; step 2 forbids stretching). The silent branch contradicts step 1.2; the JavaScript-syntax branch contradicts escalation bullet 4. The ground that actually decides it is a security property no rule in the lens states. Undecided by the document as written; correctly decided only if a bounds/security test is added and ordered against step 1.2.
5. **Resolver implementations.** Does not follow. Heuristic 22 says ship it; the resolution defers, which is rule 11 winning. Rule 12 ("work nobody has asked for") is cited for the timing when five panels asked. Undecided between 22 and 11; the document splits the difference.
6. **Class README.** Follows in outline from heuristics 14 and 23 plus rules 3, 8, 9, but it bundles six sub-decisions (6a through 6m in RULINGS) with distinct grounds into one row, heuristic 23's proviso fails for the pre-procedure ledger, and "medium" names no conflict that precedence resolved. Decided, poorly recorded.
7. **`Close`.** Follows conditionally on example 3. The deciding step is "example 3 removes the sharing window, so heuristic 19's 'releases nothing' condition is met"; the row should say so. "Medium" names no precedence conflict; if the security reviewer's blocking argument was the counter, that is rule 8 versus rule 3 and rule 8 should have won unless it does not apply, which should be stated.
8a. **`$round` basis.** Decided, but not by rule 1. RULINGS records the documentation as silent on the basis (only non-tie examples; ties-to-even is the tie rule, not the operand). "The documentation's examples are decimal" is a guess wearing the authority's name, the exact thing the rule 1 test rejects. The actual decider is step 1.2 (silent, language-does, the reference shifts the decimal string, and the iteration-5 argument that `$string` and `$round` must agree is heuristic 16's spelling test). "High" is right for the wrong reason; the row should cite step 1.2 and rule 9.
8b. **Refuse or round once.** Undecided by the rules. Heuristics 16 and 17 were written to produce this answer; rule 8 argues both ways (quiet digit loss versus three outcomes for one product); RULINGS itself said "unless Matt holds that the identifier-digit-loss case must refuse". This is a rule 8 versus rule 8 conflict and meets bullet 3. It should be a ruling package with the artifact holding round-once meanwhile, which is what the document's own "Applying this to loops" section prescribes.
8c. **Integrality boundary.** Follows conditionally on 8b, but the cited rule 1 is misapplied: `JSON.stringify` is incorporated for `$string` rendering, not for integrality classification, and the text says nothing about float64 above 2^53. The only discriminator against "decode by mathematical value" (which also honors substitutivity and README rule 4) is rule 7, again with two consumers (the JSON consumer who wrote `1e23` versus the author who wrote `9007199254740993.0`). Medium at best.
9. **Typed exit.** Mostly follows. `Canonical` on the `encoding/json` precedent is heuristic 21 and rule 5; the float32 rendering is heuristic 21 (JSON has no float32, so no JSON consumer has a formed expectation about it); heuristic 15 is the wrong citation. Deferrals rest on rule 11 and the undefined "consumer".
10. **Decimal decode.** Decided, but not by rule 1. RFC 8259 §6 is a non-normative interoperability note and §9 explicitly permits arbitrary precision; "the interoperability promise is doubles" is a paraphrase step 1 forbids. The actual deciders are heuristic 14 (the class states the value model: a decimal is a float64) and heuristic 21 (`encoding/json`). It also collides with README rule 4 (exact carriage), which is doctrine (c), so heuristic 23 is implicated and should be cited.
11. **Decoder stance.** Follows from rule 3. Rule 8 is decorative.
12. **Absence triple.** Decided by rule 3 and rule 7, but the row's stated reasoning contradicts step 3 (see above). Rewrite as: rule 8 does not discriminate (each option has a quiet failure), so rule 3 and rule 7 decide; confidence high.

## Definitions and the escalation list

Under-defined terms, with the case that exposes each:

- **"what the language does" versus "values or the surface"** (step 1.2 and 1.3). No test. Regex dialect, `$round` basis, and `$keys` order are each classifiable both ways, and the two classifications reach different steps and different answers.
- **"the reference implementation."** Assumed to exist. OpenAPI, AsyncAPI, gRPC, and usage have none; step 1.2 is a hole for every non-JSONata artifact.
- **"the surface."** Never defined. Is `$string`'s output format a surface? Is an error code? Example 11 treats decoder policy as a surface stance; example 4 treats a language function's pattern syntax as a surface. Heuristic 15's "boundary" has the same gap.
- **"the value model."** Heuristic 14 defines it by list, adequately. But "class" and "member" are jsonata-evaluator terms; a reader from openapi-client will read "class" as a type.
- **"demonstrable fact" versus "preference."** Defined by three examples. "A law violated" is exposed by heuristic 16: any heuristic that declares a law converts panel agreement on a preference into a fact.
- **"published."** Defined as a tag or a published interface version. Exposed by the spec working draft on `main`, which is rendered on openbindings.com and read by third parties but untagged: the definition says a loop may change it (it cannot, but only because ground (a) catches it). Exposed harder by `openbindings-go` on `release/0.2`, consumed by `ob` across repositories: an API break there is "unpublished" and lens-decided, yet it breaks a sibling the project cohort tracks.
- **"consumer"** (rules 11, 12, heuristic 22, examples 2, 5, 9). Undefined; the single most decision-bearing undefined word in the document.
- **"portability posture"** (escalation bullet 1). Undefined. Example 8c, the 2^53 boundary, decides what OpenBindings authors can rely on across members; that is a portability posture under any plain reading, so 8c should have escalated, or the term means something narrower that is not stated.
- **"flips under the procedure in two consecutive iterations"** (final paragraph). Ambiguous between one flip observed across two iterations (A then B) and two flips (A, B, A). Under the first reading, any revision on new evidence stops the loop, which contradicts "every decision is revisable precedent."
- **"the strongest argument against."** Required by step 4, absent from all twelve rows.

Escalation gaps (meets no bullet, should escalate):

- A security or bound property traded against fidelity (example 4's ReDoS question). No lens rule names security; the loop's security reviewer called it "the ReDoS decision" and it is decided here by a stretched rule 8.
- A value call between the two prongs of rule 8 (example 8b). Meets bullet 3 only if the reader notices that a single rule can conflict with itself; the bullet says "both rules".
- A decision that binds a not-yet-written member of the same class (8a pinning a class algorithm; example 6's language-neutral value model). Nothing is "published", but a second implementer inherits it. This is the class's analogue of ground (a).
- Adopting a new dependency into a project package (example 5's `access/proto`). Not money, not publication, but a supply-chain and licensing decision the lens has no test for.
- A loop reversing a prior loop's recorded decision. The document says the maintainer can reverse; it does not say whether a later loop can, and bullet 4 only covers maintainer rulings.

Escalation over-reach (meets a bullet, should not):

- Bullet 4, "extending a prior maintainer ruling to a new instance." Fidelity-over-coverage is a standing ruling; every binding-spec decision that refuses an unsupported construct extends it. Read literally, half of all binding-spec decisions escalate. The document's own example 4 violates it, which shows the author did not mean it literally.
- Bullet 2 for the interfaces repository, whose version files are append-only: adding a new version file is not "a change to a published contract", but a cold reader cannot tell.
- Bullet 5, "anything that spends money": CI minutes on a pushed branch spend money. Trivial, but the bullet does not exclude it.

## What I would change

1. **Give step 1 an authority ladder and an else-branch.** Replace 1.1 through 1.3 with:
   > 1. Read every section the rule cites. If the authority answers once, that is the answer. If it answers in two places that disagree, apply this order: normative prose; then the authority's own examples; then an authority it incorporates by reference, read as an algorithm over the abstract value with the incorporating host's value model replaced by this member's; then the class value model; then the reference's observable behavior. If two incorporated authorities disagree and the cited section names neither, stop under bullet 3.
   > 2. If the authority is silent and the question is about the artifact's observable behavior (a function's result, an operator's meaning, a syntax accepted), and a reference implementation exists, and the behavior is neither a bound nor a security property: adopt the reference's behavior and do not call it a divergence. A bound or security property (time, memory, recursion, pattern-matching complexity) is always a step 2 question.
   > 3. Otherwise continue to step 2.

2. **Split rule 8 and place step 1.2 in the order.** In step 2, replace the rule 8 row with two rows: "8a. Loud over quiet: can this option fail without an error?" and "8b. One outcome per input: can one mathematical input produce different outcomes depending on spelling, grouping, or scheduling?" In step 3, replace item 2 with "2. Rule 8b, then rule 8a. Determinism beats loudness; a loud failure that varies with grouping is still two policies." Add "1a. Step 1.2's adoption of the reference sits between rules 1 and 2 and rule 8: a bound or security property overrides it; nothing else does." Rewrite example 12's deciding steps as "Rule 8a does not discriminate (each option has a quiet path); rule 3 and rule 7 decide. high."

3. **Define "consumer" and order heuristic 22 against rule 11.** Add to the definitions: "A consumer is a caller in a project repository, identified by a commit, an open issue on that repository, or a named SDK integration point, that would use the feature on landing. A reviewer's request, a sketch in a review, and a measured cost are evidence, not consumers." Then rewrite heuristic 22's last sentence: "When such a consumer exists, this heuristic overrides rule 11's deferral; when none exists, rule 11 defers it and the record names what would count as one." Re-resolve example 5 accordingly and stop citing 22 for a deferral.

4. **Narrow escalation bullet 4 and add the two missing bullets.** Bullet 4 becomes: "Extending a prior maintainer ruling to an instance its stated general form (rule 10) does not already cover." Add: "A tradeoff between a bound or security property and fidelity to an authority, stated with the property and the constructs refused." Add: "A decision that binds a member of the class not yet written (a class-level algorithm, a value-model law, a portable profile), before that member's author has been consulted." Delete "a portability posture" from bullet 1 or define it.

5. **Make the record match step 4 and cite the step that actually decided.** Add a "Strongest argument against" column to the worked-example table. Recite: example 1 as a rule 7 versus rule 7 escalation with the split held meanwhile; example 4 under the new bounds rule; example 8a and 10 under step 1.2 and heuristic 14 rather than rule 1; example 8b as a bullet 3 package with round-once held; example 9's float32 under heuristic 21. Strike rule 1 from any row below step 1, since a rule 1 citation in step 2 means step 1 should have closed the question, and add one sentence under step 2: "Rule 1 is a step 1 rule; citing it here means the authority answered and the loop should record step 1, not step 2."
