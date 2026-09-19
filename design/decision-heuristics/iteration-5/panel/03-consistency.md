# Independent consistency review

Scope: only `procedure.md` and `examples.md`, draft 5. Historical claims in the evaluator replay are treated as stated inputs, not independently verified facts.

| Criterion | Grade |
| --- | --- |
| Decidability | B+ |
| Internal consistency | B+ |
| Generality | A- |
| Escalation boundary | A |
| Clarity and tone | A- |
| Overall | B+ |

The procedure is usable and mostly coherent. It separates conformance from preference, permits provisional local progress, and makes authorization independent of confidence. Its main remaining defects concern the exact interpretation of the final fallback and the confidence assigned to it. These are localized repairs, not grounds to replace the selection method.

## 1. Dependency counting does not determine one fallback result

`procedure.md`, step 3, chooses candidates with the “fewest new dependencies,” without defining the counted unit or whether transitive dependencies count.

**Breaking input:** An unpublished non-core package has no incumbent. A and B survive every stage; their surfaces are incomparable. Against the same dependency-free baseline, A adds one direct package P, which brings three additional transitive packages. B adds two direct packages Q and R with no transitive additions. Counting direct dependencies selects A, while counting all newly required packages selects B. Both readings satisfy the stated fallback. Freezing the complete option texts does not resolve this, since the dependency stage selects before the text stage.

**Minimal repair:** Define the counting convention and baseline, for example distinct direct runtime package dependencies newly introduced relative to the pinned baseline. If transitive or development dependencies matter, specify that instead or require the charter to pin the convention before comparison. This is an operational ambiguity, not a preference for fewer transitive dependencies.

## 2. Proposed fallback versus arbitrary confidence needs an explicit boundary

Step 5 first assigns inferred confidence to a result that depends materially on the draft's new operational tests. Step 3 calls its fallback an arbitrary tie-break. The three-survivor example says its result is arbitrary when the premises are established, otherwise inferred when a proposed comparison premise matters.

**Breaking input:** Use that exact example: A has get and two dependencies; B has identical get plus set and zero; C has read and one. Accept all stipulated evidence and all earlier-stage neutrality, but do not ratify this draft's fallback. C is selected solely because the new surface-containment fallback runs before dependency minimization. Under step 5's first test, the result materially depends on a proposed operational test and is inferred. Under the example's established-premises branch and step 3's instruction, it is arbitrary. Established factual premises do not themselves establish the proposed chooser.

**Minimal repair:** State whether the mechanical fallback is exempt from the proposed-test confidence rule. If it is exempt, assign arbitrary when admissibility and earlier-stage neutrality have no inferred material premise, while retaining inferred when they do. If it is not exempt, mark this fixture inferred until the fallback is accepted, and explicitly state that additional condition for its arbitrary branch. This would make both the example and confidence propagation mechanically checkable.

## 3. The ledger requires an alternative even when none is admissible

Step 5 requires a chosen answer and an “adoptable alternative” without an exception for a compelled correction. Yet step 1 and the CLI example correctly allow authority to determine a single answer.

**Breaking input:** A charter authorizes correcting only one required exit-code table cell. The stable contract fixes the value at 4; the cell says 0. The only admissible value is 4, and deleting the row or redesigning the contract is outside scope. The correction is straightforward, but there is no adoptable alternative to enter or select through Reverse.

**Minimal repair:** Permit “none within the governing constraints,” with the decisive reason. Make Reverse available only when the record actually contains an admissible alternative; a request to change the governing contract becomes a separately scoped recommendation. This is a small record-totality defect, not a reason to compare alternatives to settled authority.

## Checks that pass

The simultaneous elimination pass and prohibition on reintroducing eliminated options give repeatable results for fixed, consistently evaluated cases. Opposing supported cases remain neutral, and uncertain merit cannot eliminate an option. The no-valid-behavior and unavailable-authority paths terminate in a held, explicitly incomplete result rather than requiring a fabricated design.

Scope and escalation are well controlled: unknown ownership, uncertain ruling coverage, unread authority, shared boundaries and published contracts have identifiable holds. Explicit authorization can release an edit without converting a contradiction into conformance. Provisional application does not ratify a general rule.

Dependency acceptance is particularly clear. The partial-batch example agrees exactly with the landing rule: accepting D-example cannot smuggle in pending D-shape. Confidence propagates through material deciding and neutralizing premises; the arbitrary-dependency discussion correctly distinguishes following a selected spelling from asserting its design merit.

Apart from finding 2, the examples agree with the procedure. Fixture A selects undefined at rule 7 using its stipulated caller idiom, not by declaring the other correct-use paths wrong. The demanded convenience passes the demand gate despite not being essential. The evaluator cases explicitly identify unresolved comparisons, and baseline readings are not promoted into new design conclusions.

The priority order, willingness to neutralize unequal opposing evidence, and final Unicode tie-break are policy choices. They may deserve field testing, but they are not internal contradictions. General mathematical extensions such as infinitely many candidates are outside this practical review and are not deductions.
