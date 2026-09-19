# Engineering-process cold review

Reviewed only `procedure.md` and `examples.md` in iteration 6. No history, source audit, other reviews, or grades were consulted.

| Dimension | Grade |
| --- | --- |
| Decidability | A- |
| Internal consistency | A |
| Generality | A |
| Escalation boundary | A |
| Clarity and tone | A- |
| Overall | A- |

The process is usable for autonomous revision and controlled landing. It distinguishes edit permission, design acceptance, and landing authorization; neither a favorable grade nor silence substitutes for any of them. I found no concrete operational defect in the requested process cases. The remaining deductions concern how quickly a reader can reconstruct the workflow, rather than a demonstrated unsafe or blocked outcome.

## Process tests

**Autonomous editing: passes.** Consider an unpublished local API whose return shape is inferred and still pending review. Step 5 expressly permits the authorized, unflagged choice and its dependent examples to remain provisionally applied. The loop therefore need not stop at every non-authority choice. Conversely, an unread governing source or unknown shared reader holds the affected edit through steps 1 and 4. The complete lookup fixture demonstrates the permitted case without promoting its choice into authority.

**Batch acceptance: passes, with a wording refinement below.** A high correction and an inferred redesign can have different acceptance states in the same batch. General deliverable acceptance supplies the stated default for unflagged high rows; other rows require explicit coverage. Existing broad authorization can cover acceptance and landing together, so the mechanism does not mandate redundant approval requests. A Reverse cannot install an inadmissible alternative, and Rule requires confirmation of the expanded general rule.

**Dependency-closed landing: passes.** Attempted counterexample: accept an example using a new return type while leaving the type decision pending. The landing rule excludes the example because its prerequisite is neither included nor satisfied by the landing baseline. The partial-batch fixture makes this consequence explicit. Reworking the example against the retained type requires rerunning its reasoning and checks; the subsequent acceptance-scope rule prevents material new content from silently inheriting old approval. Cyclic design choices become one package rather than fictitious independent support.

**Reopening and acceptance reuse: passes.** Attempted counterexample: keep an accepted label while replacing the accepted return type after a dependency changes. Acceptance attaches to content, scope, and premises; materially affected approvals return to pending. An unrelated spelling correction can retain acceptance after a rerun establishes that its content and premises remain unaffected. Action authorization is preserved separately. A demonstrated procedural mistake can reopen a choice even without new evidence; the stability rule retains only a still-valid answer, so it need not preserve the disproved choice.

**Final snapshot and stop behavior: passes.** Attempted counterexample: obtain a passing panel, accept a late reversal, and advertise the resulting artifact under the old grade. Grades attach to exact reviewed snapshots and explicitly do not transfer after changes. Closing changes require affected checks; a cap prevents another panel from being manufactured outside the charter and requires disclosure of a materially changed, unreviewed final snapshot. The setup also allows stopping when only held decisions remain without new evidence, while preserving their gaps. A quality grade does not assert API implementation correctness.

**Generality and escalation: passes.** The same process accommodates documentation corrections, first-release API choices, optional convenience additions, shared contracts, and conflicting incorporated authority. Published-contract changes and shared meaning have explicit boundaries. An authorized revision of this procedure can change its draft without ratifying its rules or changing its review gate.

## Optional refinements

1. Add two concrete acceptance utterances beside the batch rule: one accepting a deliverable without explicitly accepting its inferred choices, and one approving every decision row in a named batch. The current distinction is workable, but “approval covering those rows” requires interpretation beside “acceptance of a named … batch.” Examples would make the intended default easier to apply without adding an approval gate.
2. Provide a compact completion-record example containing the stop reason, final snapshot, reviewed snapshot, grade, material closing changes, and outstanding acceptance states. The requirements already exist; one example would reduce the effort needed to assemble them.

Neither refinement is required to repair a demonstrated process failure.
