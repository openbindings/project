# Guidance panel, iteration 2: the cold applier

Cold read of draft 2, 2026-09-19.

## Grades

| Criterion | Grade | One-line justification |
| --- | --- | --- |
| Decidability | C+ | Every run reached an answer, but each needed at least one improvisation the text does not license: what "correct use" means under 8a, whether a schema is normative prose, whether rule 13 fires on linear cost, and where to find the "quoted audience" on an artifact that has none yet. |
| Internal consistency | C | The confidence definition is contradicted by four worked rows (2, 4, 7, 8c); step 1.2's eligibility list ("a function's result") is contradicted by its own exclusion ("a value") and by row 8a; rule 8a's text ("only by ignoring the contract") is contradicted by row 12's application; "consumer" has one definition and two uses. |
| Generality | B- | The step structure and the *evaluator classes* fencing carry over cleanly; rank 5 (rules 7 and 3) collapses on a fresh artifact because both demand quotes the artifact does not yet contain, and a loop over Core flags every question by construction. |
| Escalation boundary | B- | Stop versus flag is the right split and the (a)/published/cross-repo triggers are the right things; but the cross-repository test depends on a "depended on by" field the loop fills from what it happens to know, and the maintainer-ruling test names no place where those rulings live. |
| Clarity and tone | B | Reads as project guidance with a real Terms section; leans on charter vocabulary a cold reader lacks ("pinned", "blocked stopping condition", "apply-bin", "lens", "S code") and step 1.1's "the rule" has no antecedent. |
| Overall | B- | A real procedure with a correct shape and a defensible precedence; the wording defects are the kind that make an unattended loop take the example's reading in one iteration and the rule's reading in the next, which is the instability the document exists to prevent. |

## Three new questions, run through the procedure

### A. TypeScript member: `undefined` or throw for an absent result?

**Step 0.** The Terms define a surface question as one that "changes a signature, a return shape, an error channel"; this changes both. The text whose wording changes is the TS member's API doc, so ground (d) by "the ground whose text would change". Then the tie-break: "If the loop cannot state in one sentence, quoting the artifact, why a question is not ground (a), it is ground (a)." The TS artifact is a stub; there is nothing to quote. I improvised: I quoted the class README's line that the host "supplies representations and primitives" (P8) and called absence-reporting a representation. A stricter reader takes the sentence literally and files this as (a) on iteration 1, which flags it and leaves the stub without a stated behavior, violating P1. The escalation clause "changes what ... a member of the same class not yet written must do at an observable boundary" also bites: if I record "absence is out-of-band" as the reason, a future Python member inherits it. I improvised again: treated "observable boundary" as the portable value, not the host signature, so it does not escalate. The text does not say that.

**Step 1.** "Read every section the rule cites": no rule cites anything for a surface question, so nothing to read. The pinned language docs say a path with no match yields no result; silent on how a host surfaces it. Step 1.2 is fenced ("neither a value, a surface, nor a bound is implicated"); a surface is implicated, so jsonata-js's `undefined` is not adopted. Continue.

**Step 2.** P3 (ranks with rule 7) worked exactly as written: the element's structure is "a lookup with an absent case", the analogue is `Map.prototype.get`, written down before the answer, yielding `undefined`. Rule 7: the consumer is "authors" of transforms in the TS host; they expect `undefined` (jsonata-js, `Array.prototype.find`), and the law predates the finding. Rule 8a for `undefined`-return, demonstrable case: absent path, then `JSON.stringify([r])` renders `[null]` and `{r}` renders `{}`, a value the language itself would never produce (JSONata drops absence from arrays). Rule 8a for throw: the quiet path is `try { } catch { }`. Here the text and the worked example part company. Rule 8a's own sentence says "A failure the caller can reach only by ignoring the contract is rule 7's to weigh", and swallowing the catch is ignoring the contract, so throw has no 8a case and 8a decides for throw at rank 4, over rule 7 at rank 5. But row 12 counted `v, _, err` (ignoring `present`) as a quiet path "under correct use", making 8a neutral. By the row's reading, catch-and-swallow also counts, 8a is neutral, and rank 5 (ground (d): rule 7 first) decides for `undefined`.

**Answer reached.** Following the row: `undefined`, `medium`, deciding rule 7 with P3, strongest argument against the `[null]` rendering. Following the rule's text: throw (or a discriminated `{present, value}` object, if the loop thinks to enumerate a third option, which the text never tells it to do). Two readings of one rule, two answers. The document does not say which governs when a worked row and a rule's sentence disagree.

### B. Binding specification: accept an upstream artifact invalid under the authority's schema but common in the wild?

**Step 0.** Two grounds: (b) the authority's text and (c) the binding spec's own acceptance convention. "The ground whose text would change" is the binding spec, so (c). Then step 0(a): "any doctrine that governs more than one artifact of a kind (a convention shared by binding specifications)". An acceptance convention on one OpenAPI sibling would obviously be shared by its three siblings, which makes it (a). The tie-break asks me to quote *this artifact* to prove the convention is not shared, which no sentence in one artifact can establish. I improvised: (c) if the artifact already has an "accepted sources" section, (a) otherwise. That is a guess at authorial intent, not a test.

**Step 1.** Ran as (c) to see whether it decides. The ladder: "its normative prose; then its own examples; then an authority it incorporates; then the reference implementation". The question is phrased as "invalid under the schema". The ladder does not place a schema. For OAS 3.1 the JSON Schema is explicitly non-normative, so an artifact the schema rejects may be valid under normative prose, and the answer is "accept, and the schema is wrong" at `high`. For an authority whose schema is normative, rule 2 ("support exactly what upstream supports") closes it at step 1: refuse, `high`. Clean either way once the reader knows to ask "is the schema part of the normative prose". The text does not tell them to ask. If the authority is silent and a reference parser (swagger-parser) accepts the input, step 1.2 should apply, but "a value ... is implicated" (the result is a document instead of a refusal), so it does not, and I go to step 2 where rule 7 (consumers of the artifact expect their docs to work, a quoted audience) faces rule 3 (the spec's job is quoted as "a binding to a conforming OAS document", and leniency makes it claim an effect it does not name). Ground (c): rule 3 first, so refuse. Decidable, `medium`.

**Answer reached.** Refuse (or flag as (a) and recommend refuse). The right answer, reached by a default rather than a test at step 0, and by a question ("is the schema normative?") the text never poses.

### C. CLI: print integers above 2^53 as digits or as JSON strings?

**Step 0.** Ground (d): "a representation". Quoted from the CLI's usage doc: the machine lane emits JSON. Not (a) because Core defines the portable value and this changes only its rendering. Clean.

**Step 1.** RFC 8259 §6 is a non-normative note and §9 permits arbitrary precision; silent, as row 10 already established. No reference implementation for a CLI. Step 2.

**Step 2.** Rule 3, contract quoted ("emits the portable value as JSON"): the string option retypes the value (`{"id":9007199254740993}` becomes `{"id":"9007199254740993"}`, a different JSON value), a case for digits. Rule 7: audience quoted ("scripts and agents parsing stdout"); their expectations split (jq preserves, `JSON.parse` rounds), so unclaimed. Rule 8a for digits: a JavaScript consumer reads `...993` as `...992` with no error. But is that the CLI "returning a wrong value"? P10 answers that precisely ("a rendering the consumer would read as a different value fails rule 8a") and is fenced to *evaluator classes*, so I may not cite it for a CLI. Rule 8a for strings: a consumer reads a string where the contract promised a number, silently. I improvised "both have a case, neutral". Rule 8b: the string option renders `2^53` as digits and `2^53 + 1` as a string, two outcomes for one kind of value depending on magnitude. 8b's triggers are "spelling, grouping, or scheduling"; magnitude is not listed and the list reads as closed. I did not claim it. Rule 13: not a cost. Rule 9: both options are stated precisely; neutral.

**Step 3.** 8a neutral, 8b unclaimed, rank 5 for ground (d) is rule 7 then rule 3; rule 7 unclaimed; rule 3 decides: digits, `medium`.

**Escalation.** "A decision that changes what another repository, the other SDK ... must do at an observable boundary." The ob CLI is also `ob start`, which the TS SDK's remote invoker reads over JSON; digits above 2^53 oblige the TS SDK to use a digit-preserving parser. That is a cross-repository dependency, so this flags. I only know that from project context outside the document. A reader with "this document and nothing else" records "depended on by: none" and does not flag, because the text gives no procedure for discovering consumers before filling the field.

**Answer reached.** Digits, `medium`, and probably flagged; the text decides the design cleanly but the escalation test is executable only with context the document does not supply.

## Where I would stall

1. **Step 0 tie-break on a fresh artifact.** "quoting the artifact" cannot be satisfied on iteration 1 of a stub. Add: "On an artifact with no text yet, the loop's first decisions are the artifact's audience sentence and each layer's job sentence (ground (c)); every later question quotes those."

2. **Step 1.1, "the rule cites".** No antecedent. Add: "the artifact's own sentence that incorporates the authority (a binding specification's §2, a class README's authority line) names the sections; read those and any section they cross-reference. A schema an authority publishes is normative only where the authority's prose says so; otherwise it ranks below the prose and beside the examples."

3. **Step 1.2's eligibility.** "a function's result" is listed as eligible and "a value" as excluded; row 8a uses the exclusion on a function's result. I cannot apply this step. Add: "Value question here means one about the value model: a kind, a representation, a conversion, a rounding basis. The result of a function over already-modeled values is observable behavior and is adopted."

4. **Rule 8a, "correct use".** The rule's text and row 12 disagree on whether ignoring a return component is correct use. Add one sentence to 8a: "Ignoring a component of the return (a `present` flag, a caught error class) is ignoring the contract; it does not make a case. A quiet path exists only when the value is used as the contract says and is still wrong."

5. **Rule 13, "unbounded".** Row 1 applies it to a walk that is linear in the input, which every evaluation already is. Add: "Unbounded means not bounded by the stated limits (`Limits`, a budget, an input-size cap) or super-linear in the input; cost linear in the input is what every option pays and is rule 5's."

6. **Escalation, cross-repository.** The trigger reads the "depended on by" field the loop itself wrote. Add: "Before recording a ground (d) decision at a boundary another repository reads (a wire body, a CLI's machine lane, an exported constant), search the project catalog (`project/repositories.json`) for that boundary's readers and list what was searched in the record; an empty list after a named search is `none`."

7. **Maintainer rulings.** "Extending a maintainer ruling beyond the kind it was stated for" presumes I can find the rulings and their stated kinds. Add: "Maintainer rulings are the batch-table rows marked Rule, collected in `<path>`; each states its kind in one sentence. A ruling with no kind sentence is applied to its instance only."

8. **Charter vocabulary.** "pinned", "blocked stopping condition", "apply-bin", "lens", "S code" are undefined. Either define them in Terms or replace "A flagged item counts as pinned for a loop's blocked stopping condition" with the plain statement of what a flag does to the loop's grade.

## What I would change

1. **Reconcile the confidence rule with the worked rows, in the rule's favor.** Rows 2 (P4 decides), 4 (rule 13, proposed, decides), 7 (P5 decides), and 8c (P9 decides) are marked `high`, `high`, `medium`, `medium`; the definition says a proposed rule or precedent deciding yields `inferred`. Either the four rows change to `inferred`, or the definition changes to: "`high`: a ratified rule, or a step 1 text, decides with no opposing claim. `medium`: step 3 decides, or a precedent decides with a ratified rule cited as supporting. `inferred`: a proposed rule decides, no rule separates, or the authority was unread." Then row 4 (rule 13 alone) is `inferred` regardless, and the batch review reads it closely, which is right for a ReDoS-shaped decision made under an unratified rule.

2. **Fix step 1.2 so it can fire.** Replace "neither a value, a surface, nor a bound is implicated" with "neither the value model (a kind, representation, conversion, or rounding basis), a surface, nor a bound is implicated". Without this, 1.2 is dead text and every silence goes to step 2, which is the "design opportunity" the sentence after it forbids.

3. **Split "consumer" into the two things it is.** Terms: "**Audience.** The surface's declared readers, quoted from the surface (rule 7 names it; rule 5 optimizes for it). **Consumer.** A caller identified by a commit, an open issue, or a named SDK integration point (rule 11 requires one; P6 fires on one)." Row 1's "consumer: the package's callers, quoted" is an audience; row 5's "no consumer as defined" is the other word.

4. **State what the document does for a loop over Core.** Every question on `openbindings/spec` is ground (a) and flags. Add to "Why this exists": "This procedure decides ground (c) and (d) questions. A loop over Core or over a family convention produces ruling packages, not decisions; its value is the package quality, and its stopping condition is package count, not grade." Otherwise the first spec loop will report itself blocked on iteration 1.

5. **Repair the re-run clause.** "or when a lens that has not raised the record's counterargument raises it" reopens a decision on a preference, which the next sentence forbids and P2 forbids. Replace with: "or when a lens supplies a demonstrable case for the recorded counterargument that the record answered only as a preference."

## What I would keep

- **The stop/flag split** in "What escalates": two things stop the loop (money, publication), everything else records a package and keeps the current answer. This is the single most important sentence in the document and it is right.
- **P1 and the "artifact keeps its current answer" rule.** An unstated behavior is a silent divergence; the document never lets one exist.
- **The demonstrable-case bar** with "a law first stated in the finding is a preference". It is what turned rows 1, 8b, and 12 honest, and it is the mechanism that makes convergence detect facts (P2).
- **Lexicographic precedence with one deciding rule per side.** It is executable, the record is short, and "one higher rule beats any number of lower ones" stops the loop from counting votes.
- **The *evaluator classes* fence on P8 through P11.** It kept me from misapplying P10 to a CLI, which is exactly what a fence is for; the fix is to add a general form of P10 to rule 8a, not to loosen the fence.
- **Step 1's "quote; do not paraphrase" and `authority unread`.** Both are cheap, both close off reconstruction from memory, and both produce a record the batch reviewer can check in seconds.
- **The batch table sort** (confidence ascending, re-raises descending) and "Silence is Keep". This is the maintainer's whole interface and it is the right one.
