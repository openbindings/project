# Independent engineering-process review

Reviewed only `procedure.md` and `examples.md` from iteration 5. This review evaluates the operational lifecycle, not whether the proposed design priorities are the best product policy.

| Dimension | Grade |
| --- | --- |
| Decidability | A- |
| Internal consistency | A |
| Generality | A |
| Escalation boundary | A |
| Clarity and tone | A- |
| Overall | A- |

The procedure supplies a workable end-to-end loop. Its most useful distinction is between a provisionally edited working draft and an accepted, authorized landing artifact. That distinction permits autonomous progress without silently converting a local experiment, a favorable panel grade, or unanswered review into approval. I found no definite lifecycle defect that requires repair before the procedure can be exercised.

## Lifecycle audit

**Autonomous editing.** A permitted local decision can be inferred or arbitrary and still be applied, together with its dependent examples and tests, while review remains pending. Step 4 holds only the affected edit when authority, compatibility, ownership, or action authorization is missing. The complete lookup fixture demonstrates this path concretely. The guidance does not require a maintainer response between ordinary local revisions, and the apply bin does not bypass authorization checks.

**Batch responses and acceptance.** Keep, Reverse, Rule, and ship with hole give a maintainer usable responses without requiring discussion of every principle. The named-deliverable shortcut accepts unflagged high-confidence rows; acceptance of other rows must actually cover them. A broad instruction can cover both acceptance and the landing action, so the procedure avoids demanding redundant permission. Conversely, a grade and silence cannot accomplish either. Rule produces a proposal for confirmation rather than immediately manufacturing a general law. The examples preserve these distinctions.

**Dependencies and partial acceptance.** The pre-landing dependency check is substantive, not merely administrative. Accepting D-example while D-shape remains pending cannot land a broken example. The operator must retain the coherent baseline pair or adapt and recheck the example against the retained type. The separate treatment of mutually dependent decisions as one package also prevents circular justification. Dependencies include assumptions, tests, examples, and decision premises, not just source files.

**Reopening.** The rules admit new cases, corrected readings, changed dependencies, and demonstrated reasoning mistakes even with unchanged evidence. Consequently, the repeat-objection rule cannot protect an error merely because someone previously mentioned the same input. Invalidation and rerunning dependents before the next panel prevents a reopened parent decision from leaving old conclusions silently attached. The stability rule applies only to still-valid answers and yields to an explicit maintainer reversal; it does not require retaining a disproved answer.

**Closing revisions and final validity.** Consider a passing snapshot whose maintainer then reverses the lookup choice. The reversal requires a closing revision and rerunning its dependents. Its earlier grade remains attached to the earlier snapshot. Contracts, examples, and dependencies must be checked after the closing changes, and another panel is allowed only within the charter. If the cap prevents review of material closing changes, the final snapshot must be identified as unreviewed. This supports an honest completion report without pretending that checks substitute for a panel or that a prior grade transfers.

**Stops and holes.** The charter establishes the gate, caps, and authority before editing. A hold does not stop unrelated revision; a cap does stop the loop without implying success. Exhausted discussion of held items supplies a separate, reportable stop condition. A missing valid behavior is marked as an incomplete document or unsupported feature in the review artifact and blocks any completeness or publication claim that requires it. “Ship with hole” therefore cannot manufacture conformance or erase an existing external requirement.

## Preferences and clarification opportunities, not demonstrated defects

1. **Acceptance identity could be more explicit.** Stable decision labels are useful, but a small statement tying acceptance to the recorded answer, scope, and dependency state would make implementation easier. For example, reopening D-example should not leave an approval badge that appears to approve materially rewritten text. The existing invalidation requirement, scoped authorization, and requirement to include only accepted edits already support the correct result; I do not count the absence of a database-style transition rule as a proven loophole.

2. **A compact completion checklist would reduce navigation.** The operator currently assembles the final obligations from setup, step 4, and several paragraphs of step 5. A short checklist could collect the stop reason, final snapshot, applicable panel snapshot, accepted landing subset, affected checks, and residual holes. All those obligations already exist; this would improve usability rather than add governance.

3. **Another lifecycle fixture would help readers.** The lookup and partial-acceptance examples are strong. A short example combining a maintainer reversal, a reopened dependency, and a cap-limited closing revision would demonstrate the remaining transitions in one place. Its absence is an evidence-coverage preference, not an internal inconsistency.

The main practical uncertainty is operating cost: gathering the evidence and maintaining the ledger may be expensive for small choices. That deserves measurement in a real API loop, as the closing paragraph proposes. It does not presently justify weakening the authority, dependency, or acceptance boundaries.
