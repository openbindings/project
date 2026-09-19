# Guidance panel: senior API design reviewer

Cold read of the decision-procedure draft, 2026-09-19.

## Grades

| Criterion | Grade | One-line justification |
| --- | --- | --- |
| Decidability | C+ | Steps 0 and 1 are decidable from the text; step 2 is decidable only where the rule has a concrete test, and rules 3 and 7 do not (either can be pointed at either option by choosing the layer or the user), and 8b/8c admit two readings of "round once" that give different arithmetic. |
| Internal consistency | C | Rule 4 is a method that "never breaks a tie" (step 3.7) and is cited as a deciding rule in #1; step 1.2 as written yields the JavaScript regex dialect that #4 rejects; heuristic 15 licenses the one-input-two-renderings outcome rule 8 forbids; rule 8 is invoked in 8b against the louder option; 8c's substitutivity claim is false under heuristic 17's reading. |
| Generality | B- | Rules 1 through 12 and heuristics 16, 19, 22 travel; 18 is Go-variadic-specific as worded, 15 is unsafe without a constraint, and the document has no principle about bounded cost, naming, errors as API, or evolution, which the next loop (a TS member, an ob surface) will hit immediately. |
| Escalation boundary | B | Stops for Core vocabulary, published contracts, and unresolved precedence, which is right; misses a decision that asserts an algebraic law without a test (8c), and a "high" confidence reached by stacking three rules on one side of a question every panel called the largest cost (#1). |
| Clarity and tone | B | Crisp restatement of rules as yes/no tests is excellent; "loud", "the surface", "class", "member", "ledger", "stub", and "substitutivity" are used without definition, and the worked table omits the "strongest argument against" that step 4 makes mandatory. |
| Overall | B- | A good procedure with a precedence that is roughly right at the top and wrong in the middle, three worked examples that reach the right answer for the wrong reason, and one (8c) that is wrong on the arithmetic. |

## The twelve resolutions, judged

| # | Procedure's answer | My answer | Agree? | Why |
| --- | --- | --- | --- | --- |
| 1 | Keep the map/`*Object` split; add `Canonical` (high) | One result type unless a measured consumer needs carriage by identity; at minimum "medium" and escalated | Disagree | Rule 4 (a method) is cited as deciding; rule 7 is pointed at the JSONata author when the consumer of a Go result type is the Go caller, and every Go caller's expectation (`encoding/json` never returns two object types) says uniform; rule 11 honestly applied defers the unmeasured allocation argument; six panels named this the largest ergonomic cost and the procedure still labels it "high". |
| 2 | `Select(ctx, key)` plus `SelectPath(ctx, path)` | Same | Agree | Right shape; but variadic paths are idiomatic (`filepath.Join`), so the fault was `Select` sitting next to `Fields()` (plural, keys), not variadics as such; rule 7 decides this, not heuristic 18 as worded. |
| 3 | Single-goroutine `Evaluation` | Same | Agree | Per-input stdlib handles (`sql.Rows`, `json.Decoder`, `bufio.Reader`) and a reproducible budget; the right reasons in the right order. |
| 4 | Go `regexp`, declared, refusals at `Compile` and `$eval` with a stable code | Same | Agree on outcome | Step 1.2 says silence about "what the language does" adopts the reference, which is a backtracking JavaScript engine; the resolution overrides its own step 1 with "the class's stated framing", and the real ground (bounded cost under hostile patterns) is not in the lens at all. |
| 5 | Ship Resolver implementations as subpackages when a consumer appears | Same | Agree | Heuristic 22 is the principle; the subpackage placement is the stdlib pattern (`net/http/httputil`); timing by rule 12 is right. |
| 6 | Rewrite the README; the class owns the value model | Same | Agree | Right; but the document leaves heuristics 14 and 21 in open conflict on member order (class value model versus reference silence), which is exactly the README's 6k. |
| 7 | Delete `Close` | Same | Agree | Conditional on #3; with no shared computation there is no resource and no borrow window to end. |
| 8a | `$round` on the shortest round-trip decimal digits, pinned as a class algorithm | Same | Agree | The winning argument is "the number the package shows and the number it rounds must agree"; rule 1 does not decide it (the RULINGS record the documentation as silent on inexact ties), so "high" is overstated. |
| 8b | Round once; delete the refusal code | Same | Agree | Right; but note the louder option lost, so rule 8 at slot 2 did not decide it. Heuristic 17 decided it against rule 8's first clause, using rule 8's second clause. |
| 8c | Integral float64 is an integer at or below 2^53; above, a decimal combined under 8b, "substitutivity holds" | Kind-determinism: float64 is binary64 whatever its value; substitutivity is promised within a kind, not across | Disagree | Under heuristic 17's reading (binary64 rounds), `float64(9007199254740994) + 1` is `...996` while the equal `int64` gives `...995`, the exact violation the PL skeptic proved in iteration 5; under the other reading (exact, round only non-integral results) `1e23 + 1` is still a 23-digit exact integer, so the cap changes nothing it was introduced to change. The resolution is indeterminate and neither reading satisfies its own justification. |
| 9 | `Canonical` on the `encoding/json` precedent; a carried `float32` renders at 32-bit shortest digits | `Canonical` yes; `float32` widened and rendered at 64-bit digits, or not admitted | Partly | `encoding/json` renders `float32` at 32 bits because the target type is known; a JSON consumer reading `0.1` gets a different float64 than the language computed with, so the language and the wire disagree on the value, which rule 8 forbids and heuristic 15 wrongly licenses. |
| 10 | Decimal token becomes float64 at decode | Same | Agree | RFC 8259 §6 read correctly; this is what step 1 is for. |
| 11 | Duplicate-key and surrogate refusals are the decoder's stance | Same | Agree | Rule 3 applied to an actual layer with its own contract, which is the only way rule 3 should be applied. |
| 12 | Keep `(value, present, err)` | Same | Agree | Right; the reason is rule 7 (comma-ok, and no stdlib precedent for a sentinel `any`), routed through rule 3 because rule 7 sits too low to win at precedence. |

Right answer, wrong reason: #2, #4, #8a, and #12 share one pattern. The real ground is either rule 7 (host idiom: `filepath.Join`, comma-ok) or a principle the lens does not contain (bounded cost; what-is-shown-is-what-is-rounded), and in each case the writer reached for a higher-ranked rule (3, 8, or 1) to make the answer come out at a rank that "decides outright". That is what a precedence that under-ranks formed expectations does: it does not change the answers, it changes the stated reasons, and the stated reasons are what the next loop will cite. #1 is the case where the same pattern may have produced the wrong answer, because the rule that would have argued the other way (5, ergonomics of the common path) sits at slot 6 and the rule that decided it (4) is not supposed to decide anything.

## The precedence as a design philosophy

Where it produces good APIs:

- **Authority text first** is correct and is the reason #10 is right: the RFC's interoperability promise settles decimal decode, and a reviewer who has not read RFC 8259 §6 has no standing to argue. Same for #8a's decision to pin a class algorithm rather than let each host's rounding leak through.
- **Loud over familiar at an input boundary** is correct and produced the single best decision in the API: `Unmarshal` keeps `9007199254740993` exact where `encoding/json` silently rounds. That is exactly the case where familiar is wrong and loud (or exact) is right. #11 is the same rule applied to duplicate keys.
- **Layer's job, when the layer has a written contract**, is correct: #11 (decoder versus language) and #5 (subpackage so the core stays dependency-free) are the pattern the Go standard library follows.

Where it produces worse APIs than a different order:

- **Rule 8 above rule 7, with rule 8 unsplit.** Rule 8 is two rules wearing one number: (a) no silent wrong result, and (b) one input, one outcome. (a) belongs at slot 2. (b) is an algebraic-law rule and belongs with rule 9. As written, the "louder" option always looks like the rule-8 option, so 8b (refuse an inexact conversion) should have won at slot 2, and the document had to invoke 8(b) against 8(a) to get round-once. A loop that does not know the two clauses fight will refuse everywhere: refusing `0.1 + 0.2` is louder than rounding it. Concretely, the refuse-mixed-arithmetic policy the loop rejected is JavaScript BigInt's actual behavior (a `TypeError` on `1n + 0.5`), so "loud over familiar" had the reference language's own host on its side and still lost, which tells you the precedence is not what decided it.
- **Rule 3 above rule 7 for surface questions.** Rule 3 is the most malleable rule in the lens: any option can be described as "a layer doing something it is not for" by choosing the layer. In #1 the evaluator "does not convert its input"; in #12 "the result domain holds values only"; both are descriptions chosen after the answer. A Go proposal reviewer's first question after "is it needed" is "is this how Go does it", and for a ground-(d) question (an API shape) that is the right first question. Reversing 3 and 7 for ground (d) would have decided #12 honestly and forced #1 to argue on its real merits (measured cost of conversion versus every caller's two-arm switch).
- **Rule 5 at slot 6, "shortest correct common path".** Ergonomics of the common path is the thing every caller pays on every call; a performance benefit to identity carriage is paid to the caller who measured it. Rule 11 says a wish with no consumer is deferred; no consumer has measured the allocation-per-object cost. Applied honestly, rule 11 defers the performance argument and rule 5 decides #1 for uniformity, at which point `Canonical` is the normal path rather than the opt-in patch. The precedence buries the majority's cost at the bottom.
- **The missing rule that should sit at slot 2 with 8(a): bounded, predictable cost under adversarial input.** The whole `Limits` design, the work charging, the depth bound, and #4 are built on it, and the lens never names it. #4 had to call linear-time matching "the loud, predictable choice", which it is not; it is the bounded choice. A project that evaluates untrusted expressions over caller structures by reference needs this as a first-class value, not as a reading of rule 8.

## The heuristics as principles

Real principles that generalize:

- **14 (the value model is the class's).** The right split between semantics (specification) and representation (implementation). This is the single most important sentence for the second member.
- **16 (one rule per domain, tested against grouping and spelling).** The best heuristic in the document. Generalize it: every semantic rule is tested against its algebraic laws before adoption, and the tests are written down.
- **19 (an element must have an observable job).** Bloch's "when in doubt, leave it out"; the Go review board's "what is the smallest API". Real, and correctly stated.
- **22 (own the decision every integrator would make differently).** Real, and the best-argued: the sixty-line Resolver with six guesses is the canonical evidence pattern for it.
- **17 (refuse the unrepresentable, round the inexact).** Real, but it is a consequence of choosing binary64 as the decimal domain, and it contradicts the reference host's own BigInt behavior; say so, so the next loop does not re-litigate it via rule 7.

One case in principle's clothing:

- **18 (obvious reading, "or not compile").** The general principle is least astonishment applied to signatures: a call's shape must not admit a plausible reading that differs from its meaning. As worded it condemns variadics, and `filepath.Join`, `path.Join`, `append` all read fine. The `Select` fault was the name next to `Fields()`.
- **15 (a boundary follows its consumer).** Half a principle, half a license. It is true that an encoder renders for the JSON consumer; it is not true that "a value may render differently inside the language and at the boundary, and both are correct". Both are correct only when a conforming consumer reads back the same value the language computed with. Without that clause 15 is a rule-8 failure with a nicer name, and #9's `float32` line is the first casualty.
- **21 (stdlib decides shape; reference decides silence).** Two principles glued. The first is rule 7 restated for host APIs. The second makes reference accidents normative (integer-like key hoisting is a JavaScript artifact) and conflicts with 14 on member order; the document does not say which wins.
- **13, 20, 23.** Process rules, not design principles. Correct as process; they do not belong in a list "numbered to continue the lens".

Real principles missing, which a strong API guide contains:

1. **Bounded cost under adversarial input.** See above.
2. **Kind-determinism for arithmetic.** The kind of a result is a function of the kinds of the operands, and each kind's arithmetic is its own. Every host with two numeric kinds (Python, Go, Rust, JavaScript with BigInt) obeys this and none promises cross-kind substitutivity. The numeric rulings 8a/8b/8c are three symptoms of not having stated it.
3. **A named consumer and a written call site before an element ships.** The most productive API-review technique there is; rule 11 gestures at it.
4. **One obvious path.** The package has `Eval`, `EvalMarshal`, `EvalJSON`, `Prepare`/`Select`/`Complete`, `Materialize`, `Clone`, and now `Canonical`: seven exits. A rule that asks "which one is the path a newcomer takes, and does every other exist for a written reason" is absent.
5. **Errors are part of the contract.** A closed, classified, stable code set; every refusal names its code; the class owns the table. #4 needed "a stable code" and had nowhere to cite.
6. **Naming.** Nothing in the document says where names come from (the domain's own terms, then the host's idiom; no invented vocabulary). "Invoker not executor" and "synthesize not create" exist as project rulings and are not here.
7. **Design for evolution.** The code uses `_ struct{}` in every exported struct for a reason the document never states: an exported name is a permanent commitment after publication, so pre-publication decisions should record what they would forbid later.

## What I would change

1. **Split rule 8 and add the cost rule.** Replace step 3, item 2 with: "2. Rule 8a. An option that can return a value the authority or the class value model calls a different value, without an error, loses to one that returns an error. A rounded binary64 result is not a different value; it is that domain's arithmetic. Rule 8c (new). An option whose cost under adversarial input is not bounded by a stated limit loses to one whose cost is. Rule 8b (one input, one outcome; tested against the grouping and spelling cases of heuristic 16) ranks with rule 9 at item 4."

2. **Give rule 3 a test and make the precedence ground-dependent.** Add to the rule-3 row: "Rule 3 decides only when the layer and its job are quoted from the layer's own contract (a package doc, a binding-specification section, a README rule). An option is not 'a layer doing another's job' because a reviewer can describe it so." Add to step 3: "For a ground-(d) question, rule 7 ranks above rule 3; for a ground-(c) question, rule 3 ranks above rule 7."

3. **Constrain heuristic 15 and reverse #9's `float32` line.** Replace the last sentence of 15 with: "A value may render differently inside the language and at the boundary only when a conforming consumer of the boundary reads back the value the language computed with; a rendering the consumer would read as a different value is a rule-8a failure." Then #9: "the encoder renders a carried `float32` as its float64 widening, as `$string` does."

4. **Replace #8c with a stated law.** "A value's arithmetic kind is its representation's kind: integer types and `*big.Int` are integers; `float64` is binary64 whatever its value. Integer with integer is exact, `/` yielding binary64 when the quotient is not integral. Any operation with a binary64 operand is binary64, rounded as IEEE 754 rounds. Equality, ordering, and membership across kinds are by mathematical value. Substitutivity is a law within a kind and is not promised across kinds, as in every host with two numeric kinds." Mark it "medium", record the counterargument (`x / 100.0` is no longer `x / 100`), and add to the escalation list: "A decision that asserts an algebraic law (substitutivity, associativity, round-trip) without a test that exercises the boundary case."

5. **Add the missing principles as rules 24 through 27 and require the counterargument column.** "24. Every exported element has a named consumer and a written call site before it ships. 25. There is one obvious path for the common case; every other entry point records the consumer that needed it. 26. Error codes are a closed, classified, class-owned set; every refusal names its code. 27. Names come from the domain's own vocabulary, then the host's idiom; no invented terms." And add a "Strongest argument against" column to the worked-example table; step 4 requires it and the table is what the maintainer will actually read.

## What I would keep

- **Step 0's ground classification and step 1's cascade**, especially "quote the text; do not paraphrase it" and "silence plus a working reference is not a design opportunity". That last sentence will save more loop time than anything else in the document, once it carries the 14-versus-21 carve-out.
- **The rules restated as yes/no tests.** This is the right form for guidance that has to be applied cold, and rules 1, 2, 6, 9, 11, and 12 are genuinely decidable as written.
- **Rule 4 as a method, not a value.** "It makes X the same as Y" is not a reason, and saying so in a table is worth defending. It just has to be honored in #1.
- **Heuristics 14, 16, 19, and 22**, verbatim.
- **The escalation list's core**: Core vocabulary, published contracts, unresolved precedence, and re-affirmation of a prior ruling. "Before publication, the lens decides" is the correct boundary for a greenfield project.
- **The decide bin, the flip-twice stop clause, and "extending it to a new instance is a re-affirmation, not a citation."** These three make the batch-review model safe.
- **Resolutions #3, #5, #7, #8b, #10, #11, and #12**, and the outcomes of #2, #4, and #8a with their reasons corrected.
