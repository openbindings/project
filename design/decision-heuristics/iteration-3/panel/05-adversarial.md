# Independent review: adversarial reader

Reviewed only the fixed `procedure.md` and `examples.md` snapshots. This reviews whether the process resists manipulation, not whether the evaluator recommendations are preferable.

| Dimension | Grade |
| --- | --- |
| Decidability | B |
| Internal consistency | B |
| Generality | B+ |
| Escalation boundary | B- |
| Clarity and tone | A- |
| Overall | B |

The draft closes substantial avenues for rationalization: a loop cannot manufacture authority from its edits, convert misuse into a correctness defect, or declare a resource restriction conforming over contrary authority. The remaining openings largely concern classifications that determine whether work proceeds or requires a response.

## 1. Pending batch review has no defined effect on an applied local choice

**Sections:** Procedure introduction; step 4; step 5, batch responses and ledger status.

**Input:** An authorized loop must finish a new, unpublished lookup API. It chooses between two admissible surfaces using the proposed tests, so the decision is inferred. There is no step-4 flag and no maintainer response before the next iteration.

**Conflicting outcomes:** An agent can keep implementing and reviewing the choice because step 4 permits local action and independent work continues. Another can stop all dependent work because “Only unflagged high rows may keep their local answer without an individual response.” Neither knows whether a previously applied inferred edit must be reverted, can remain provisionally applied, or must be excluded from the next panel. “Pending for that batch” is not one of the ledger's applied/deferred/held statuses. An agent inclined to stall can make every ordinary design decision require an answer without identifying an authorization boundary.

**Minimal repair:** Separate provisional draft application, acceptance of a decision, and authorization to land. State the transition for an unflagged inferred decision with no response: whether its edits remain, whether dependent work and another panel may proceed, and what remains pending at completion. This is a missing operational rule, not a preference for more autonomy.

## 2. Unknown readers are recorded but do not acquire a decision consequence

**Sections:** Set up the loop, known readers; step 4, shared-boundary conflict; step 5, confidence.

**Input:** A mutable working interface has a named reader in an unavailable repository. A proposed correction changes observable behavior to match an existing requirement. Publication status and ownership are known; the reader's expectation is unknown.

**Conflicting outcomes:** One agent treats the unavailable reader as a compatibility uncertainty requiring a held recommendation. Another records its failed search and proceeds: step 4 flags a conflict with another repository's *recorded* behavior, and no conflicting behavior could be obtained. A directly required correction can still be high confidence. Thus the statement that an unsearched boundary is “unknown, not empty” need not affect the edit or review gate. An evasive agent can acknowledge missing evidence while benefiting from its absence.

**Minimal repair:** Explicitly specify the treatment of unavailable or incompletely searched known readers. It need not hold every unknown repository: define when compatibility evidence is necessary, when an authorized assumption permits proceeding, and where that assumption affects status or confidence. Distinguish confidence in the required behavior from confidence that changing it does not cross a shared boundary.

## 3. Calling an addition essential bypasses the demand test

**Sections:** Terms, Consumer; step 2, rule 11 and the paragraph exempting essential first-use work.

**Input:** A brief authorizes evaluating an expression and returning its result. Existing carriage operations already accomplish that. An agent favors a new normalization helper but has no independent consumer for it.

**Conflicting outcomes:** The examples classify Canonical as optional and defer it. A motivated agent can instead describe normalization as essential to making the first result usable, cite the authorized scenario as sufficient demand, and avoid the optional-work requirement to explain why existing operations do not meet the use. The prohibition on fabricated consumers helps only after the optional/essential classification has been settled; there is no stated burden for that classification.

**Minimal repair:** For an asserted essential operation, cite the authorized scenario and show what required outcome becomes impossible without it, considering existing operations and the smaller option. Convenience improvements may still justify additions, but must take the consumer route. This closes demand laundering without requiring pre-release callers.

## 4. “New concrete case” can recycle an already answered objection

**Sections:** Terms, Case; step 5, reopening and dependent edits.

**Input:** A ledger has resolved an objection covering ordinary absent keys. A reviewer repeats the same objection with a different absent key, showing the same two outcomes and supplying no change to the reasoning.

**Conflicting outcomes:** One agent increments the re-raise count because the objection is substantively repeated. Another calls the changed input a “new concrete case,” reopens the choice, and invalidates its dependent edits before the next panel. The definition of case and the reopening rule do not require novelty relative to the recorded rationale. An agent can consume the iteration budget by changing irrelevant input details while complying with the literal reopening trigger.

**Minimal repair:** Require the record to identify which prior premise, condition, or scope is newly challenged. A case already covered by the recorded reasoning counts as a repeat unless it exposes an error in that reasoning. The existing budget cap limits the damage but does not resolve the classification.

## 5. Direct-principle confidence offers a route around the review gate

**Sections:** Step 2, established headings versus proposed tests; step 5, confidence tests 1 and 4; examples, New TypeScript lookup API.

**Input:** The new TypeScript lookup has no incumbent and excludes stored undefined. The agent favors returning undefined and cites an established lookup idiom plus the established principle “Delegate to formed expectations.”

**Conflicting outcomes:** The example calls this inferred “because this is a design application rather than an authority answer.” Step 5 permits high confidence when an established principle decides directly, provided the result does not materially depend on a proposed premise or operational test. An agent can describe the same inference as direct application of the old heading, omit the proposed test from its deciding premises, and claim high confidence. That changes whether the answer can remain without an individual response.

**Minimal repair:** State whether a non-authority design application can be high while this draft is provisional. If it can, require evidence that the principle's application to this class of question was already accepted, and explain why the TypeScript case differs. Merely changing the reasoning's label should not change confidence. The conflict is about the permitted confidence classification, not the recommended TypeScript return type.

These are actionable ambiguities or missing obligations. I would not count disagreements with the lexicographic order, the particular replay recommendations, or the prose style as defects without an additional concrete failure.
