# Engineering process review

Cold review of `procedure.md` and `examples.md` only. I did not consult prior reviews, grades, or the linked evaluator evidence. This assesses whether an authorized agent can finish a review loop and produce a coherent, reviewable result.

| Dimension | Grade |
| --- | --- |
| Decidability | B+ |
| Internal consistency | A- |
| Generality | A- |
| Escalation boundary | A- |
| Clarity and tone | B+ |
| Overall | B+ |

The procedure supports autonomous local progress well. Its remaining process weaknesses concern partial acceptance and correcting a procedural error without new substantive evidence. Neither requires redesigning the decision framework.

## Paths that work

- **Authorized work with unanswered review.** Step 5 explicitly permits unflagged provisional choices and their dependent edits at every confidence level. Pending review alone neither stops revision nor lowers the document grade. The complete lookup fixture demonstrates this path and distinguishes editing from landing. This prevents speculative confidence labels from becoming universal approval gates.
- **Actual authorization boundaries.** Step 4 checks existing authorization first and stops only the affected action. It distinguishes permission to edit a draft from ratification, publication, and changes to shared meaning. Existing broad authorization can cover acceptance and action; the procedure expressly prevents asking again. The stable CLI example correctly treats an example correction as preserving a contract.
- **Held work without a valid incumbent.** The procedure marks the review artifact incomplete or unsupported and blocks only claims or publication requiring that missing behavior. It does not require inventing a valid incumbent or a consumer-facing exception.
- **Changed decisions.** Decisions and edits carry dependencies; changed evidence triggers invalidation before another panel; mutually dependent decisions become a package. The concurrency/lifecycle and arithmetic examples use this distinction sensibly.
- **Stopping and grading.** The charter fixes the rubric, budget, and gate. Grades attach to unchanged snapshots; closing changes receive verification; material changes left at a cap are expressly unreviewed. A cap does not imply passing. Quality and design acceptance remain distinct, so a good document can finish with visible held recommendations.

## Missing or ambiguous paths

**1. Partial acceptance needs a dependency-closed landing rule.** Step 5, lines 325–330, permits individual acceptance and excludes pending rows from landing. It does not say what happens to an accepted row whose necessary parent remains pending. For example, D1 provisionally changes a return shape; D2 updates a separate consumer or example to require that shape. Both are legitimate provisional edits. A maintainer accepts D2 individually while leaving D1 pending. The stated row filter excludes D1 and admits D2, producing an inconsistent landed subset. Confidence propagation does not resolve this: the maintainer can individually accept an inferred child. The rerun rule principally addresses changed decisions before a panel, rather than assembling a partially accepted landing.

Minimal repair: “Before landing, include only accepted and authorized edits whose required decision and edit dependencies are also included or already satisfied by the landing baseline. Hold an accepted dependent whose prerequisite remains pending, or rebase and rerun it against the retained baseline.” Add one two-row partial-acceptance example. This is a completion-path defect, not a preference for more approvals.

**2. Reopening should expressly include demonstrated procedural mistakes on existing evidence.** Lines 332–345 protect stable decisions against repeated preferences. However, the enumerated reopen reasons omit a mistake in applying the comparison or confidence rules to evidence already recorded. A reviewer may repeat the same case because the loop incorrectly claimed dominance despite a recorded countercase, rather than because anything changed. The exception for a different input exposing a rationale error does not clearly cover this same-input situation. A literal runner could increment the objection count, preserve the first answer, and ultimately stop with the mistake held instead of correcting it.

Minimal repair: include “a demonstrated error in applying the procedure or recorded rationale, even when the underlying evidence is unchanged” among reopen reasons. Distinguish demonstrating the error from merely asserting that the chosen preference is wrong. This preserves the anti-churn rule.

**3. State the acceptance event for unflagged high rows.** “At acceptance” says these rows need no individual mark, while the ledger allows pending/accepted and the following sentence says silence ratifies nothing. A reasonable reading is that explicit acceptance of the deliverable covers its unflagged high rows. That is not stated, leaving operators to infer when those rows change status.

Minimal repair: say that explicit acceptance of a named deliverable or batch accepts its unflagged high rows without individual marks, while pending non-high or flagged rows still require the specified coverage. Existing broad authorization should continue to suffice. This is a small state-transition ambiguity, not a contradiction requiring another permission step.

## Policy preferences, separate from defects

The ledger asks for substantial evidence per choice, and the batch links that evidence rather than repeating it. That is workable for consequential design questions but could become expensive for many simple corrections. Allowing a group of corrections sharing one governing quotation and rationale to use a single ledger row would reduce burden while retaining affected-location links. I would prefer that allowance, but the current granularity is a policy cost, not a logical failure.

Similarly, the proposed priority ordering is a project policy choice. Its provisional status and confidence consequences are visible. I do not deduct merely because another engineering team might choose different priorities.

With the landing dependency rule and the existing-evidence error path added, the procedure would provide a substantially more reliable end-to-end process without weakening autonomous revision or increasing routine approval burden.
