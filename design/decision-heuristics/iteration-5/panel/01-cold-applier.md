# Cold applier review

Read only `procedure.md` and `examples.md` from iteration 5. Reviewed SHA-256 snapshots: procedure `a5bbba1bc2cb823f3943bfa88261c558c4849a4ea49012d133ce9e5fe224591b`; examples `450b2d5fdf374cd24aacb8dc7377b20d3bced695baa2e9e3cbc025d58936dcb6`.

| Criterion | Grade |
| --- | --- |
| Decidability | B+ |
| Internal consistency | A- |
| Generality | A- |
| Escalation boundary | A |
| Clarity and tone | A- |
| Overall | A- |

The procedure supplies a usable answer for multi-option selection and separates a definite authority reading from permission to edit. Its main remaining operational gap is the status transition when new evidence reopens an already accepted decision. I can choose a safe disposition, but must add an assumption about acceptance scope.

## 1. Three options with opposing cases

**Stipulated input.** An unpublished local export API serves interactive and batch callers. Local draft edits are authorized; landing is not. Authority does not govern the host surface; all readers were inspected, with no shared-boundary conflict or ruling. The essential export operation has three fully specified candidate protocols: incumbent A, callback B, and iterator C. No smaller option meets the brief. Supplied caller traces establish the following relative outcomes, including setup, recovery, branching, and compulsory work:

| Candidate | Interactive caller | Batch caller |
| --- | --- | --- |
| A | Four caller actions | Two caller actions |
| B | Two caller actions | Three caller actions |
| C | Three caller actions | Two caller actions |

These are actual fixture traces, not a general claim that counting actions measures DX. The fixture explicitly establishes that all other costs at stage 7 are equal, that stages 1–6 supply no distinction, and that B and C both provide suitable defaults at stage 8. B and C have incomparable surfaces and no new dependencies. Frozen complete option texts begin respectively with `Callback` and `Iterator`.

**Application.** In the single stage-7 elimination pass, C dominates A: it improves the interactive case without worsening the batch case. B and C each have a supported countercase to the other. A is eliminated despite being the incumbent. Neither survivor is eliminated at stage 8, surface containment, or dependency count. Unicode order selects B. The strongest objection is C's simpler batch caller path; the procedure preserves it as a neutralized countercase rather than pretending B dominates.

**Record D-export:** B chosen; C adoptable alternative; **applied provisionally / pending / inferred**, with the residual arbitrary tie recorded. Inferred takes precedence because elimination and neutralization materially use the proposed operational comparison. Dependent examples and checks may be drafted; nothing may land.

**Assumptions invented beyond the stipulation:** none. All behavioral comparisons and evidence completeness are fixture facts, not asserted product facts. The multi-option machinery produces a reproducible answer without sequential elimination or incumbent resurrection.

## 2. Governing correction blocked by compatibility

**Stipulated input.** A stable serializer incorporates Wire 3 §7: “Encoders MUST emit UTC timestamps with a Z suffix.” All incorporated passages and precedence rules have been read. The released serializer and its stable local contract emit `+00:00`. Another repository's inspected consumer explicitly requires that suffix. The charter authorizes local review and harmless documentation corrections, but neither a published-contract change nor a coordinated migration. There is no valid output satisfying both suffix requirements. An unrelated example misspells an existing field name.

**Application.** Step 1 answers the conformance question directly: emit `Z`. Shipped behavior and the local contract cannot override Wire 3. Step 4 independently holds the edit because it changes a published contract and conflicts with a known reader. Keep the executable baseline while identifying the conformance hole in the review artifact; make no completeness or conformance claim. Prepare a migration recommendation for the relevant owners. Correct the unrelated field spelling against its unchanged declaration.

**Records:** D-suffix is **held / pending / high**, with `Z` as the required conforming behavior. Retaining `+00:00` is a migration baseline, not a conforming alternative. D-spelling is **applied / pending / high**. Neither is authorized to land. The suffix hold reopens upon authorization covering the affected contracts and migration; approval cannot retroactively make `+00:00` conforming.

**Assumptions invented:** none. This case successfully distinguishes confidence, review, edit, and action status.

## 3. Reopening a previously accepted design

**Stipulated input.** D-scan originally chose two passes over a replayable iterator. Its named revision and dependent example were explicitly accepted, with landing authorized. Before landing, an authorized dependency update makes the iterator single-use. A supplied second-pass trace now fails. An alternative materializes a bounded snapshot and satisfies the unchanged use case and resource contract. The new implementation, example, and checks were not included in the earlier acceptance.

**Application.** The changed dependency reopens D-scan. Invalidate and rerun its dependent example and checks. The original answer is disproved, so the stability default cannot retain it. Apply the bounded snapshot provisionally after comparison; the proposed operational tests make the new choice inferred.

**My resulting status:** revised D-scan and its revised dependents are **applied provisionally / pending / inferred**. Previous acceptance remains historical; the revised package cannot land until its content is accepted, although the action authorization may still cover eventual landing.

**Invented assumption:** acceptance is scoped to the accepted decision content and evidence, and materially changed content resets review status. This is sensible but not expressly stated by the reopening instructions.

## Concrete defect and minimal fix

Step 5 says to invalidate and rerun dependent decisions and edits, but never says what happens to their existing `accepted` review statuses. In case 3, one reader could retain `accepted` after rerunning checks and pass the landing filter; another would reset it to `pending`. Both can cite individual sentences in step 5.

Add: “When reopening materially changes an accepted choice or invalidates a premise of its acceptance, reset that choice and affected dependent acceptances to pending. Retain acceptance only where the recorded approval explicitly covers the revised content or the acceptance is independently unaffected. Preserve still-applicable action authorization separately.”

## Preferences, not defects

The Unicode fallback is editorially sensitive, but the document candidly labels it arbitrary and freezes the input text. I would prefer shorter decision templates and fewer explanatory repetitions. Neither preference prevents application or justifies a correctness deduction.
