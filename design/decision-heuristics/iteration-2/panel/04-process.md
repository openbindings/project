# Guidance panel, iteration 2: engineering process lead

Cold read of draft 2, 2026-09-19.

## Grades

| Criterion | Grade | One-line justification |
| --- | --- | --- |
| Decidability | B- | Steps 1 to 3 reach one answer; step 0's "cannot state why it is not ground (a)" tie-break and the confidence rule are the two places a cold reader lands in a different bin than the author did, and the author's own table shows it. |
| Internal consistency | C | Rule 13 is "proposed, not ratified" yet ranks second in precedence and decides row 4 at `high`; the bound-versus-fidelity escalation bullet describes row 4 exactly and row 4 is not flagged; about half the confidence labels in the table violate the confidence definition; step 1.2 makes a reference implementation decisive while Terms says it is only evidence. |
| Generality | B- | The ground split, the consumer definition, and the record format travel; step 1.2 does not (on an OB spec loop the "reference implementation" is ob, and the procedure would launder shipped behavior into spec text at `high`); the cross-repository flag would catch most observable-boundary decisions in any SDK loop. |
| Escalation boundary | C+ | The two hard stops are right; the ground (a) tie-break and the cross-repo bullet stop too often; nothing guards the loop ranking its own proposed rules or a decided-but-deducted item burning the loop to its cap. |
| Clarity and tone | B | Reads as project guidance with terms defined; the stickiness sentence ("a lens that has not raised the record's counterargument raises it") is the one clause a newcomer will parse two ways, and it is the clause that governs churn. |
| Overall | B- | It removes the stall it was written to remove. It moves the risk onto two artifacts, the confidence column and the dependency record, and underspecifies both, then misapplies the first in its own worked examples. Fixable in one revision. |

## Does the loop keep moving

**The decide bin.** Yes, it keeps the loop moving on the twelve. The regex question, which consumed thirty reviews, is closed by rule 13 in one step, and that alone justifies the document. Two places move the stall rather than remove it:

1. *Step 0's tie-break defaults to escalation.* "If the loop cannot state in one sentence, quoting the artifact, why a question is not ground (a), it is ground (a)." In an evaluator class, P8 says the value model is the class's and binds every member. So every value question (8a, 8c, 10) is ground (a) by the document's own definition, and only row 6 is flagged. The author decided 8a, 8c, and 10 at the member level because that is the right thing to do; the text does not permit it. A loop applying the text honestly will flag most value questions, keep the current answer, and hit Blocked. The fix is to split the two records the situation actually produces: the loop *decides the instance* for the artifact under iteration (ground (c) or (d)) and *files the doctrine gap* as a ground (a) flag with the decision as its recommendation. One question, two records, no stall.

2. *A decided item that panels keep deducting for has no exit.* Sticky decisions cannot be reopened by preference (correct). But the Blocked stopping condition, as `LOOP.md` states it and as this document leaves it, fires only when short grades cite *flagged* items. A `D-` item that five fresh panels deduct for without a new demonstrable case keeps the grade floor below A- forever, and the loop runs to its cap. That is exactly the trajectory in `FINAL.md` (B floor for six rounds). Add: grades falling short that cite a decided item with no new case count toward Blocked, and the item's re-raise count is what the batch sees.

**Stickiness.** The first clause (re-run on a demonstrable case the record did not consider) is right. The second clause reopens a decision whenever a lens that has not previously raised the *recorded* counterargument raises it. With fresh cold panels and a rotating fifth seat, the same counterargument will arrive from a new lens in most rounds; the triple (row 12) was attacked by one lens three times and would under this rule be re-run up to four times. Nothing new enters; the loop re-derives the same answer or flips without a case and gets marked unstable. That is churn the document manufactures. P2 already says convergence on a preference is evidence, never a verdict; this clause contradicts it. Replace with: a repeat of a recorded counterargument increments the re-raise count and appends the lens; it does not re-run.

**Instability.** Coherent as far as it goes: a flip on re-run without a new case pins. Two gaps. "Pinned at its first answer" is arbitrary; if the first answer was `inferred` and the re-run reached `high`, the first answer is the worse one. Pin at the higher-confidence answer, first on ties. And mid-loop dependency propagation is stated in "Why this exists" (cost is "the re-run of every decision recorded as depending on it") but not in step 4; nothing says whether dependents are re-run in the same iteration when a re-run legitimately flips a decision. Say it: a flip re-runs its dependents before the next panel.

**Batch review.** The design is right (one table, three verbs, silence is Keep) and the failure modes are in the details:

- "Silence is Keep" on a *flagged* item leaves a marked hole in the artifact indefinitely. Flags cannot be kept by silence; they need an explicit answer or an explicit "ship with the hole."
- A Reverse "reopens the decisions listed as depending on it," but the loop has ended. Who runs them? The document hides the cost of reversal inside a passive voice. State it: a Reverse triggers one closing iteration (no panel, or one panel) that re-runs dependents and reports.
- No timing. When must the batch be reviewed relative to landing? If landing proceeds on silence, the veto window closes silently. The natural answer is already in the project: landing is a PR the maintainer merges, so the batch table *is the PR description*. Say that, and the review happens where the maintainer is already sitting.
- "Not one at a time in the middle of a loop" is right for the maintainer's attention, but the document should not forbid a mid-loop *read* of the batch. The loop's time is cheap; the maintainer's is not. Decouple them: the loop never waits, the maintainer may inject a Reverse at any iteration boundary, and the loop applies it at the next iteration's start. That is the flywheel shape the project already uses.

## The cost of being wrong

The document weighs it in one sentence: a wrong decision costs one edit plus the re-run of its dependents; a stall costs every iteration after it. The direction is right and I would defend it. The weighing is wrong in three places.

First, "one edit" is only true if the dependency record is complete, and the record only tracks `D-` labels. The bigger dependents are Apply-bin edits written *under* a decision: after D-3 (single goroutine), every ownership, aliasing, and post-error sentence in the stub was phrased for that design. None of those carries a `D-` label, so none is "depended on by" D-3, and a Reverse of D-3 six iterations later reopens text the record does not name. The dependency record is the load-bearing artifact of the whole procedure and the document treats it as one bullet. It must say: every Apply-bin edit that assumes a decided item names the `D-` label it assumes, at the time it is applied. That is cheap for the agent and it is what makes "one edit" true.

Second, the cost of a wrong decision compounds through panels, not just through edits. Six rounds of findings and grades were produced against the wrong answer; reversing it invalidates the evidence that everything downstream converged. The document should say this plainly and draw the consequence: an `inferred` decision with dependents is worth surfacing to the maintainer *before* five more panels build on it, not after. A one-line mid-loop notice (not a stop) costs nothing.

Third, the stall cost is overstated in the abstract and understated in the particular. The first loop did not stop; it ran six rounds and made real progress on bounds and errors. What it lost was thirty reviews re-raising four questions, a grade floor pinned at B, and a maintainer who now has to read six iterations of the same argument. That last item is the real cost, because the maintainer's time is the scarce resource, and the document should name it: the point of deciding is to hand the maintainer twelve one-line rows instead of six rounds of prose.

## The audit trail and the batch review

What the record must contain, beyond what step 4 lists:

- The commit on the loop branch where the decision was applied, and where each dependent was applied. `LOOP.md` already makes the branch the audit trail; the record must point into it.
- The artifact sentence as written, verbatim, with the label. The maintainer must never have to open the artifact to review a row. Locations by stable anchor (symbol, section heading), never line number.
- Blast radius: count of dependents, and whether any crosses a repository.
- For a flag: the current (safe) answer explicitly named as such, and the recommendation.
- "How to reverse": the option not taken is already required "concretely enough to adopt verbatim," which is the single best sentence in the document. Add the dependents that would need re-running, by label.

What the session looks like today: the maintainer opens `DECISIONS.md`, reads a table whose deciding-rule cells run to sixty words (row 1), sorts mentally by a confidence column that is mislabeled on roughly half the rows, and for any row he might reverse, opens the stub to find what was written. Two hours.

What makes it fifteen minutes:

1. Fix the confidence labels so the sort key is honest. By the document's own definition (`inferred` = a proposed rule or a precedent decides it), rows 1, 2, 4, and 7 are `inferred`, and row 12 (precedence decided after 8a went neutral) is `medium`, not `high`. As labeled, the "only read `inferred` closely" instruction would have the maintainer skim exactly the rows that need him.
2. Sort by flagged, then `inferred`, then `medium`, then `high`, with dependents count descending as the second key. Re-raise count measures panel taste; dependents measure reversal cost, and reversal cost is what he is deciding.
3. Give coin tosses their own confidence (`arbitrary`) that sorts *last*. As written, step 3's "pick the shorter text, record at `inferred`" puts every decision that "does not matter" at the top of the close-reading pile.
4. `high` rows collapse to one line: label, question, answer, ground. Nothing else.
5. Reverse is one word from the maintainer; the loop does the edit. Rule is one line from the maintainer; the loop writes the general form and returns it for a one-word confirm. As written, "Rule (the maintainer writes the general form)" puts the expensive action on the scarce seat.
6. The table is the PR description.

## The escalation list from the process seat

**Keep.** Spending beyond the charter's budget, and publishing, tagging, deploying, or pushing outside the loop's branch. Reword "spending money" to "exceeding the charter's stated budget"; a loop already spends three million tokens, and the budget is what makes the stop decidable.

**Narrow: a ground (a) question.** As argued above, the tie-break over-escalates. Reword: "A question whose answer would change ground (a) text is flagged for that text. The loop still decides the instance for the artifact under iteration on ground (c) or (d), records both, and names the decision as the flag's recommendation."

**Narrow: cross-repository.** "Changes what another repository, the other SDK, or a member not yet written must do" catches every observable-boundary decision in a Go SDK loop, because TS must match. The flag should fire only when the decision *conflicts* with what the other side already does or has recorded. Where the other side has no answer, the loop decides and records a cross-repository "depended on by," which the other side's loop reads as precedent. Binds versus informs.

**Resolve the contradiction: bound versus fidelity.** The bullet says a bound traded against fidelity to an authority is flagged; row 4 is exactly that and is decided at `high`. Pick one. From this seat: decide, do not flag. The safe answer (refuse constructs) is one edit to reverse, and this question was the loop's single largest cost. If the maintainer wants a flag here, the bullet should say the loop decides the safe side and flags the *extension* of the refusal to the class.

**Add: ranking a proposed rule.** A loop may propose rule 14; nothing stops it from slotting rule 14 above 8a and deciding by it. Rule 13 already sits at precedence 2 unratified. Add: "A proposed rule decides at `inferred` and ranks below every ratified rule until the maintainer ratifies its position. Placing it is a batch row." Note the honest consequence: row 1 flips (rule 7 beats an unranked rule 13) until the maintainer ratifies the placement, which is one row and the right row for him to see.

**Add: the loop's own charter and rubric.** A loop must not rewrite its stopping conditions, its triage test, its panel rubric, or this procedure. P7 lets doctrine catch up with practice, and it is ground (a), but the self-modification case deserves its own line because it is the one an unattended process is most likely to rationalize.

**Fence: step 1.2.** Not an escalation bullet, but the same seat: step 1.2 must apply only where the artifact's charter names a reference implementation as such (evaluator classes). In an OB spec or binding-spec loop, the "reference implementation" is ob, and "adopt the reference's behavior and do not call it a divergence" is "shipped behavior governs" with a step-1 label and `high` confidence. The project's standing doctrine is that implementation is never authority.

**Keep, with one sentence added: extending a maintainer ruling.** Whether an application is an instance or an extension is itself the question (8b shows it). Add: "When the loop cannot tell instance from extension, it applies the ruling as an instance for the artifact, keeps the current answer where they differ, and flags the extension."

## What I would change

1. **Make the dependency record complete.** In step 4, after "Depends on, and depended on by": "Every Apply-bin edit that assumes a decided item names that item's label when it is applied. A `D-` item's 'depended on by' is the union of the decisions and the edits that name it. A Reverse in the batch, or a flip on re-run, re-runs every entry in that list before the next panel." Without this, "one edit" is false and the whole cost argument rests on air.

2. **Fix the confidence rule and its application, and add `arbitrary`.** Under Confidence: "`high`: a ratified rule or a step-1 text decides it outright. `medium`: step 3 precedence among ratified rules decides it. `inferred`: a proposed rule or a loop precedent is the deciding rule, or the authority was unread. `arbitrary`: no rule separated the options (step 3, last paragraph); sorts after `high`." Then relabel rows 1, 2, 4, 7 as `inferred` and row 12 as `medium`, and say in the row why. The batch's sort key must be honest or the batch is theater.

3. **Replace the second stickiness clause.** "A decided item is re-run only when a panel supplies a demonstrable case the record did not consider. A repeat of a recorded counterargument, from any lens, increments the item's re-raise count and appends the lens; it does not re-run. An item whose answer changes on a re-run is pinned at the higher-confidence answer, first on ties, marked `unstable`, and flagged."

4. **Split the ground (a) record and fix Blocked.** In step 0: "A question whose answer would change ground (a) text is flagged for that text; the loop still decides the instance for the artifact under iteration on ground (c) or (d) and records both, with the decision as the flag's recommendation." In "Applying this to loops": "A grade that falls short citing a decided item with no new demonstrable case counts toward the loop's blocked condition, as a flagged item does."

5. **Make the batch the PR description, with the verbs on the loop.** "The batch table is the body of the landing pull request, sorted flagged, `inferred`, `medium`, `high`, `arbitrary`, then by dependents descending. Silence is Keep for decided rows; a flagged row needs an explicit Keep, Reverse, Rule, or Ship-with-hole. Reverse is one word; the loop performs the edit and the dependent re-runs in one closing iteration. Rule is one line; the loop writes the general form and returns it for confirmation. The maintainer may read the table at any iteration boundary; a Reverse injected mid-loop is applied at the next iteration's start and the loop never waits for one."

## What I would keep

- **The cost asymmetry as a stated premise.** "A wrong decision costs one edit; a stall costs every iteration after it" is the right first sentence for a procedure like this, and it should survive every revision. Fix its truth conditions (change 1); do not soften it.
- **"The option not taken, stated concretely enough to adopt verbatim."** This is what makes Reverse a one-word verb. Defend it against anyone who calls it busywork.
- **Flags keep the current answer and the loop continues.** The single change that converts a ruling queue from a stall into a to-do list. P1 (pending is worse than either answer) is the correct doctrine behind it.
- **The `D-` label in the artifact during the loop.** Fresh panels see the decision and its ground and stop re-deriving it; that is the only mechanism that lets cold panels converge. Add to the landing gate that labels are stripped or moved to the ledger on landing, so loop bookkeeping does not ship in a package doc comment.
- **The consumer and published definitions.** Both are tight, both are testable, and the consumer definition ("a reviewer's request, a sketch in a review, and a measured cost are evidence for a rule, not consumers") is what stops rule 11 from being argued by volume. Row 5's deferral is the proof.
- **The fencing of P8 to P11 as evaluator-class precedents.** The document is derived from one loop and says so; fencing the evaluator-specific rules is what keeps it honest about generality. Apply the same fence to step 1.2 and the fence is complete.
- **The three-verb batch with silence as Keep on decided rows.** Right shape, wrong details (flags, timing, who does the work); the shape should not change.
