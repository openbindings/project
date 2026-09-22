# Guidance panel: the cold applier

Cold read of the decision-procedure draft, 2026-09-19. Ran three new questions through the procedure exactly as written.

## Grades

| Criterion | Grade | One-line justification |
| --- | --- | --- |
| Decidability | C+ | Steps 0 and 1 have undecidable boundaries (does an authority written in its host's vocabulary "answer" a surface question; language vs surface; where heuristics 13 to 23 rank), so two of my three questions needed improvisation to get past step 1. |
| Internal consistency | C | Worked example 12 says rule 8 "loses at precedence 3" to rule 3, but step 3 puts rule 8 above rule 3; the confidence legend defines "inferred" as heuristic-decided, yet eight rows decided by heuristics are labeled high or medium. |
| Generality | C- | Step 1.2 and heuristics 14, 15, 16, 17, 21 presuppose a language with a class, members, a value function, and a reference implementation; a binding-specification question hits "adopt the reference implementation's behavior" with no referent. |
| Escalation boundary | B- | The list is short and mostly right, but "portability posture" is undefined, "re-affirmation" means two different things in step 4 and the escalation list, and "escalates by default" never says what overrides the default. |
| Clarity and tone | B- | Reads as project guidance, not taste; but "ground", "class", "member", "ledger", "apply-bin", "ruling package", "stub", "Core", and "the lens" are used before or without definition, and the twelve rules are cited by date with no location. |
| Overall | C+ | The skeleton (classify, cascade, test, rank, record) is right and worth defending; the draft is not yet executable cold because the boundaries between its steps are where the real questions land. |

## Three new questions, run through the procedure

### (a) Should a TypeScript SDK's JSONata evaluator return `undefined` or throw for an absent result?

**Step 0.** Not Core vocabulary. Not doctrine. The pinned JSONata documentation is an incorporated authority (b), and the API shape is a surface (d). The text assumes exactly one ground; this question sits on two. I improvised: (d), because the answer changes the surface and not the language. First improvisation.

**Step 1.1.** The pinned documentation describes a non-matching path as yielding `undefined`. That is the JavaScript host's word for the language's absence concept. Does that "answer" whether a TS surface returns `undefined`? The document gives no test for distinguishing "the authority speaks about the surface" from "the authority uses its host's vocabulary for a language concept." Heuristic 14 is the nearest text but it is about values, and worked example 12 established that absence "is not a value". I stalled here. I improvised: the authority stated the concept, not the surface, so the question continues. Second improvisation. For the TypeScript member specifically, the authority *is* written in the member's host language, so this stall will recur on nearly every TS surface question.

**Step 1.2.** The reference (`jsonata-js`) returns `undefined`. Is "what `evaluate()` yields for absence" language behavior or surface? The text does not say; I called it surface and continued. Third improvisation. A different cold reader would call it language behavior, take 1.2, and answer `undefined` with no step 2 at all. Two readers, two answers, both by the text.

**Step 2.** Options: bare `undefined`; throw; a tagged result or an `absent` symbol.
- Rules 1, 2: `undefined` is the word the text uses. Leans `undefined`, subject to the step 1.1 problem.
- Rule 3: throwing puts a normal outcome on the error channel. Rejects throw.
- Rule 7: `Map.get`, `Array.find`, optional chaining: `undefined`. Match it.
- Rule 8: worked example 12 establishes that a sentinel that "can leak into a container" is "the quieter failure." `undefined` inside an array becomes `null` under `JSON.stringify` and vanishes from an object. So by the document's own precedent, rule 8 rejects bare `undefined`. Throw and tagged pass.
- Rule 9: all options agree across implementations. Skipped.
- Heuristic 18: `const v = expr.evaluate(input)` reads as "the value, possibly none"; passes `undefined`. A `catch` reads as "an error happened"; rejects throw.
- Heuristic 21: every JS standard-library lookup returns `undefined`. Decides `undefined`. But heuristic 21 has no position in step 3, so I cannot say what it beats. Fourth improvisation.

**Step 3.** Rule 8 (against `undefined`) sits at 2; rule 7 (for `undefined`) at 5. Rule 8 wins. Rule 3 at 3 removes throw. Answer by the text as written: **a tagged result or an `absent` symbol, not `undefined`.**

Now the contradiction. Worked example 12 says "rule 8 argued for the sentinel and loses at precedence 3." Under step 3 as printed, rule 8 is precedence 2 and cannot lose to rule 3. Either the precedence list is wrong, or the example's deciding-step column is wrong, or "loses at precedence 3" means something the text does not explain.

**Answer reached:** tagged result, presence out of band. **Do I believe it?** No. It is un-idiomatic in TypeScript and the reference returns `undefined`. The answer is driven by rule 8's test having no bound: "can this option fail quietly" counts failures caused by a caller placing the result in a container, which is caller-side misuse under any surface. Under that reading rule 8 rejects every idiomatic host representation of absence in every language, and because rule 8 outranks rule 7, the precedence systematically eliminates idiom. That asymmetry is a defect in the test, not in TS.

**Silent points:** whether a class-level decision made for one member binds a second; whether the twelve worked examples are maintainer rulings (filed as issues awaiting one) or loop precedent. If they are maintainer rulings, this question escalates under "extending a prior maintainer ruling to a new instance," and the TS loop stalls on all twelve.

### (b) Should a binding specification accept an upstream artifact that is invalid under its own authority's schema but common in the wild?

(Concrete case: an OpenAPI 3.0 document with `nullable: true` on a schema with no `type`.)

**Step 0.** (b) an OAS edition is the incorporated authority; (c) a binding-specification convention is project doctrine. Two grounds again. I chose (c). Improvised once.

**Step 1.1.** The OAS 3.0.3 text defines what a valid document is and says nothing about what a consumer does with an invalid one. Also, for OAS the published JSON Schema is explicitly non-normative and the prose governs; the document does not tell a cold reader that schema and prose can disagree and which wins. Partial answer: the artifact is invalid. Silent on acceptance.

**Step 1.2.** There is no reference implementation of OpenAPI. The step has no referent. I skipped it. This is the clearest generality failure in the document.

**Step 2.** Options: refuse the whole source; accept silently; accept under a named configuration point per deviation.
- Rules 1, 2: accepting an invalid document and calling it OpenAPI is a guess wearing OpenAPI's name. Refuse.
- Rule 3: the binding specification's job is to bind what the authority defines. Refuse.
- Rule 5: accept. Rule 6: refusal is safe. Rule 7: an OpenAPI user's tooling is lenient; accept. Rule 8: silent acceptance fails quietly; refuse. Rule 9: refusal agrees across implementations; refuse (or specify the leniency). Rule 10: state for the kind. Rule 11: the gap has consumers; real.

**Step 3.** Rules 1 and 2 at position 1 beat rule 7 at 5 and rule 5 at 6. Clean.

**Answer reached (for the kind):** an artifact invalid under the pinned authority is refused as a whole; leniency for a named deviation is a configuration point the binding specification defines explicitly, and each named deviation is its own decision. Confidence high. This matches worked example 11's shape.

**Silent points:** the escalation list's "a portability posture" could plausibly catch this, and the term is undefined.

### (c) Should a CLI print integers above 2^53 as digits or as JSON strings?

**Step 0.** (d) a representation on a surface, with RFC 8259 as a (b) authority to read.

**Step 1.1.** RFC 8259 §6 permits any digit string as a number and says interoperability is achieved when implementations expect no more precision than binary64. It does not say to use strings. I treated it as silent on the surface question. Improvised once.

**Step 2.** Options: digits always; strings above 2^53; strings for all integers.
- Rules 1, 2: a JSON number is what the value is. Digits.
- Rule 3: converting a number to a string is value adaptation, not the surface's job. Digits.
- Rule 7: "a JSON consumer." Which one? `jq` 1.7 preserves big integers; JavaScript `JSON.parse` rounds silently; `protojson` quotes int64. Rule 7 is split by consumer.
- Rule 8, clause one ("fail quietly"): digits round silently in a JS consumer. Strings. Rule 8, clause two ("different outcomes for one input depending on spelling"): a type that flips from number to string at a magnitude is one field with two JSON types for adjacent values. Digits. Rule 8 votes both ways on the same option and the text has no rule for a split test.
- Heuristic 15: same split as rule 7.
- Heuristic 16: the spelling case: `9007199254740992` prints as a number, `9007199254740993` as a string. Two policies for one kind. Digits. Best executable test in the document; this decided it.
- Heuristic 17: JSON can hold any integer as digits; nothing to refuse. Digits.
- Heuristic 21: Go's `encoding/json` prints int64 as digits and offers `,string` as opt-in. Digits.

**Step 3.** Rule 8 is at position 2 but split against itself; I had to decide that a split test does not vote. Improvised twice. Heuristics 16, 17, and 21 all say digits but have no rank. Rule 7 is split.

**Answer reached:** digits, always; the door for a JavaScript consumer is a binding transform or a consumer-side option, not the CLI changing the JSON type. Confidence: by the legend it is "inferred," since heuristic 16 decided it.

## Where I would stall

1. **Step 1.1, an authority written in its host's vocabulary.** Add after "If yes, that is the answer": *"The authority answers a surface question only when it names the surface's own construct. When it uses its host language's word for a language concept (`undefined`, `NaN`, `Object`), it has stated the concept, not the surface; the question continues, and rule 7 reads that word as the JavaScript host's representation, not a requirement on this host."*
2. **Step 1.2, "the reference implementation."** Add: *"Where the authority has no reference implementation, 1.2 does not apply; a working consumer of the authority is evidence for rule 7, not a reference."*
3. **Step 1.2, language versus surface.** Add: *"A question is about the surface when the answer changes a signature, a return shape, an error channel, or a rendered form, and about the language when it changes which value results. 'What the language does' never decides a surface question."*
4. **Step 2, heuristics 13 through 23 have no rank.** Add to step 3: *"A heuristic ranks where the rule it applies ranks (18 and 19 with rule 8 and rule 3; 15 and 21 with rule 7; 16 and 17 with rule 8; 22 with rule 10; 14 and 23 with rule 9). Heuristics 13 and 20 are methods and rank at 7."*
5. **Step 3, a split test.** Add: *"A rule whose clauses disagree on one option does not vote; record it as split and proceed to the next rule in order."*
6. **Rule 8's test has no bound.** Add to the rule 8 row: *"under correct use of the surface's own contract; a failure the caller can only reach by ignoring the contract is rule 7's to weigh, not rule 8's."*
7. **Step 0, a question on two grounds.** Add: *"A question that sits on two grounds is classified by the ground whose text would change if the answer changed."*
8. **"Portability posture" is undefined.** Add: *"A portability posture is a claim about what every conforming implementation must yield for one document or value. The SDK parity rule and cross-member agreement are postures; one surface's rendering of its own result is not."*
9. **"Re-affirmation" means two things.** Add to step 4: *"A decision recorded under this procedure is loop precedent: a later loop re-runs the procedure on the new instance and cites the earlier decision as evidence; that does not escalate. Only a ruling the maintainer has signed escalates on extension. The twelve worked examples are loop precedent until the batch review signs them."*
10. **"Only (a) escalates by default."** Add: *"by default: the 'What still escalates' list below is the only override."*

## What I would change

1. **Resolve the step 3 / worked example 12 contradiction, and bound rule 8.** Rewrite example 12's deciding column so rule 8 argues *against* the sentinel (container leakage is the quieter failure) and rule 3 concurs, and add the bound in item 6. Wording for example 12: *"Rule 8 (a sentinel leaks into a container and turns absent into null, the quieter failure); rule 3 (the result domain holds values only); rule 7 (comma-ok)."* Confidence then becomes high.
2. **Rank the heuristics** with the sentence in item 4 above.
3. **Scope the evaluator-shaped rules honestly, and generalize step 1.2.** Either retitle the section *"Heuristics for evaluator classes"* or rewrite step 1.2 as: *"If the authority is silent and the question is about behavior the authority's own reference or dominant consumer already exhibits, and no value or surface is implicated, adopt that behavior and do not call it a divergence."*
4. **Apply the confidence legend or change it.** Redefine: *"high: a ratified rule or a heuristic that restates one decides it outright; medium: step 3 precedence decides it; inferred: a heuristic that no ratified rule covers decides it."*
5. **Define the terms a cold reader lacks, in one paragraph at the top:** ground, Core, class and member, ledger, apply bin and decide bin, ruling package, stub, "the lens" (with location), portability posture.

## What I would keep

- The four grounds of step 0 and "only (a) escalates."
- "Quote the text; do not paraphrase it" and "Silence plus a working reference is not a design opportunity."
- Restating each rule as a yes/no test, with "a rule that does not apply is skipped, not stretched." This is what made question (b) decide cleanly in one pass.
- The existence of a precedence and the honest note that it is the part most worth challenging.
- Heuristic 16's grouping and spelling tests. The single most executable sentence in the document; it would have decided the Go loop's 8b in one panel instead of four.
- Heuristics 13, 18, 19, and 20.
- Step 4's record shape and "a ruling package never stops the loop."
- The "flips in two consecutive iterations" stopping clause.
