# Guidance panel: engineering process lead

Cold read of the decision-procedure draft, 2026-09-19.

## Grades

| Criterion | Grade | One-line justification |
| --- | --- | --- |
| Decidability | B- | Steps 0 through 3 get a cold reader to one answer on a design question; the process boundary does not: two readers will disagree on whether an escalation stops the loop and on what "flips in two consecutive iterations" means. |
| Internal consistency | C+ | "A loop stops and asks the maintainer only for these" versus "a ruling package never stops the loop"; "re-affirmation" escalates in one section and is a loop-made act in another; example 4 extends a standing maintainer ruling without escalating; example 6 decides an artifact the charter puts out of scope; example 12 claims precedence decided a rule-8-versus-rule-8 conflict that the precedence cannot order. |
| Generality | B- | Steps 0 through 4, heuristics 13 and 20, and the confidence tiers generalize to any loop; heuristics 14 through 19 and 21 through 23 are JSONata-and-Go precedents wearing rule numbers, and nothing addresses two loops (Go member, TS member) consuming each other's decisions. |
| Escalation boundary | C+ | Stops too often (any single unstable item halts the whole loop; every generalization of a maintainer ruling halts it) and, read one way, never stops on ground (a), where the maintainer's veto is most likely. |
| Clarity and tone | B+ | Reads as project guidance and defines "ground" well; "apply bin", "ruling package", and "class" arrive undefined, and "re-affirmation" carries two meanings. |
| Overall | B- | The decision procedure is sound and worth adopting; the process wrapper around it (stop rules, record format, batch review, reversal) is where the next loop will stall or ship something vetoed, and that wrapper is the document's stated purpose. |

## Does the loop keep moving

**The decide bin.** It removes the stall it was written to remove: no more frozen list, no more "pending". The stall it creates is churn. LOOP.md is explicit that panels never see prior panels, the changelog, or the ruling queue. So a decided item is re-raised by the next fresh panel with the same preference, and the document gives the agent no license to say "decided, D-3, not re-run." Heuristic 20 says agreement on a preference is "evidence for step 2", which reads as an instruction to re-run step 2 every time the preference recurs. Worse, the flip clause can only fire if the procedure is re-run, so the document implicitly requires re-running every re-raised decision every iteration. Twelve decisions, four more iterations, five lenses: that is dozens of re-runs by an LLM whose output on a medium-confidence item is not deterministic. Expected failure mode: an item flips on iteration 4 for no new reason, and the loop stops.

Two fixes, both missing. First, stickiness: a decided item is re-run only when a panel supplies a *fact* the record did not consider (a demonstrable case, an authority quote), or when the exact counterargument already in the record is raised by a lens that has not raised it before (LOOP.md's own re-triage rule). Preference alone does not reopen. Second, the artifact carries the ground: a decision is not applied until the artifact states, where the panel will read it, what was decided and on what rule (the stub's "the switch is now documented" line is the model). A panel arguing against a choice whose reason it cannot see will re-raise forever; a panel that reads "single-goroutine by rule; `sql.Rows` precedent; one Evaluation per goroutine" mostly stops.

**The flip clause.** Underdefined and mis-targeted. Underdefined: is "flips in two consecutive iterations" one reversal (A in iteration 2, B in 3) or two (A, B, A across 2, 3, 4)? The prompt I was given reads it as "flips twice"; the text reads as one flip observed across two iterations. Neither reading distinguishes a flip on the same facts (the procedure is non-deterministic on this item, a genuine escalation) from a flip because a panel produced a new demonstrable case (the procedure working as designed). Mis-targeted: the remedy is to stop the whole loop. That is heuristic 13's forbidden state, "pending", imposed on every other item because one is unstable. The proportionate remedy is to pin the unstable item at its first-decided answer, mark it `unstable`, flag it for the batch, and continue; the loop already has a Blocked condition for the case where pinned items cap the grade floor.

**The batch review.** Right cadence for this loop (six iterations ran in one day; the batch is a day old at most) and wrong in two places. One: the document contradicts itself on whether escalations stop. If they do not stop, the loop proceeds with "the procedure's answer" on a ground (a) question, meaning it applies new Core vocabulary autonomously and the maintainer sees it after five iterations built on it. The correct fallback for a flagged item is the artifact's *current* answer, not the procedure's; that is what LOOP.md's frozen list did right. Two: no dependency record. The document's own table shows the problem: decision 7 (delete `Close`) is stated as following from decision 3 (single-goroutine); 8c is built on 8b being uniform; 9's `Canonical` is the exit that makes 1's split tolerable. Reverse 3 in the batch and 7 is silently wrong; the record gives the maintainer no way to see that without re-reading the stub.

## The cost of being wrong

The document weighs the two costs with one sentence, heuristic 13, and it weighs them correctly for the loop it came from: the artifact is a stub on one branch, a wrong decision is a surgical edit, and the stall cost is measurable. FINAL.md is the evidence: six iterations, roughly 2.5M tokens, correctness never above B-, because twelve questions sat frozen. Against that, a wrong autonomous decision on a stub costs one edit plus a re-run of whatever depended on it.

What it does not weigh is that reversal cost grows inside the loop. A decision made in iteration 2 and built on through 6 costs more to reverse than the same decision made in iteration 6, and the marginal panel tokens spent reviewing an artifact whose basis will be reversed are sunk. The document also never states the cost model in a form the agent can apply, so the agent cannot tell when a decision is cheap enough to make alone and when to notify. Proposed wording for the end of "Why this exists":

> A wrong decision costs one edit plus the re-run of every decision recorded as depending on it. A stall costs every iteration after it. Decide, unless the decision's reversal would cross a publication boundary or would invalidate a decision another loop has already consumed; those are flagged and the artifact keeps its current answer.

The `inferred` confidence tier is where wrong-decision risk concentrates, and the document should say that this tier, not the whole batch, is what the maintainer reads closely.

## The audit trail and the batch review

The record as specified (option, deciding step and rule, strongest counterargument) is enough to *understand* a decision and not enough to *reverse* one six iterations later or to *review twelve* quickly. The current `RULINGS.md` is 688 lines for twelve items, roughly 57 lines each; that is the two-hour session. The fifteen-minute session needs a fixed one-line row per decision and a bounded detail block underneath, with these fields:

- `D-N`, a label that greps in `DECISIONS.md` and in the artifact where the decision is stated (an ID that appears nowhere else is not traceable).
- Iteration decided; iterations in which it was re-raised and by which lenses (the pressure signal: a decision no panel re-raised after application is a ten-second Keep).
- Question, one line. Answer, one line. **The option not taken, stated concretely enough to adopt verbatim**, so a reversal is the word "take B" and not a design session.
- Ground: step and rule; for step 1, the quoted text. Confidence tier.
- Strongest counterargument, two lines, cap enforced.
- Depends on / depended on by, as `D-` numbers.
- Artifact locations touched (exported symbols, section headings), because each iteration is one commit mixing decisions with apply-bin changes, so "one revert" is false for a single decision.

The session then looks like: open one table sorted by confidence ascending, then re-raise count descending. Mark each row Keep, Reverse, or Rule. Silence is Keep, since the decisions are already applied. Reverse names the option not taken; the loop (or a single targeted iteration) reopens the `depended on by` list. Rule means the maintainer wants to write the general form; that is the only row that costs real time. With the example twelve, five rows are medium or inferred (6, 7, 8b, 8c, 12); those are the session. The rest is a scan.

## The escalation list from the process seat

**Split into hard stops and flags.** Spending money, publishing, deploying, and tagging are preconditions requiring approval before the action; nothing else on the list is. Everything else should flag, continue, and keep the artifact's *current* answer. The document currently says both "stops" and "never stops" and must pick; my pick is above.

**Remove, or narrow, the re-affirmation clause.** "Extending a prior maintainer ruling to a new instance" will fire on nearly every iteration, because rule 10 means maintainer rulings are stated for a kind and every kind has instances. The document's own example 4 extends the standing fidelity-over-coverage ruling to regex without escalating, which is the right behavior and contradicts the list. Reword: extending a ruling to an instance of the kind it was stated for is a citation; extending it beyond that kind, or where the kind is unclear, is decided at `inferred` confidence and flagged.

**Reword the unresolved-precedence clause.** Step 3 totally orders the value rules, so two different rules never tie. The real case is one rule arguing both sides (example 12: rule 8 for the sentinel because a forgotten `present` check is quiet, rule 8 for the triple because a leaked sentinel is quieter). Give that case a tiebreak instead of a stop: the quieter of the two failures loses, and if that cannot be shown, the general form (rule 10) decides at `inferred` confidence with a flag.

**Add: a decision another loop has consumed.** The Go and TS members must agree at the observable boundary. A value-model decision the Go loop makes and the TS loop cites cannot be reversed in one batch without fanning out. Flag it at decision time (the record's `depended on by` field crosses a repository), and let the batch review show the fan-out.

**Add: authority text not obtainable.** Step 1 requires a quote. If the pinned documentation page cannot be read (example 4's whole resolution hinges on reading the regex page), the loop must not paraphrase from memory; it decides by step 2 at `inferred` confidence with `authority unread` in the record. Without this, the agent will guess and label it step 1, which is the one class of wrong decision the batch review cannot catch by reading the record.

**Reconcile the out-of-scope clause with example 6.** LOOP.md puts the class README out of iteration; the worked table decides its rewrite at medium confidence. Either the new regime brings the README into scope (say so) or example 6 is a flag, not a decision.

## What I would change

1. **Resolve stop versus continue.** Replace the opening of "What still escalates" and the last sentence of "Applying this to loops" with: "Two things stop a loop before it acts: spending money, and publishing, tagging, or deploying. Everything else on this list is a *flag*: the loop records a ruling package, the artifact keeps its current answer (never the procedure's answer), and the loop continues. A flagged item counts as pinned for the Blocked stopping condition."

2. **Redefine the flip clause and make decisions sticky.** "A decided item is re-run only when a panel supplies a fact the record did not consider, or when a lens that has not raised the record's counterargument raises it. An item is *unstable* when the procedure, on the same facts, returns a different option than the previous iteration's. An unstable item is pinned at its first answer, marked `unstable`, and flagged; the loop continues. A decision is applied only once the artifact states it, and its `D-` label, where a panel will read it."

3. **Specify the record.** Add the field list above to step 4 verbatim, with the two-line cap on the counterargument, and add: "The batch is one table, sorted by confidence ascending then re-raise count descending. The maintainer marks Keep, Reverse (naming the option not taken), or Rule. Silence is Keep. A Reverse reopens the decisions listed as depending on it." Retire `RULINGS.md` as a separate long-form record; `DECISIONS.md` holds flagged items too, with a `flagged` marker.

4. **Fix "re-affirmation".** Delete "extending it to a new instance is a re-affirmation, not a citation" from step 4, and rewrite the escalation item as in the section above, so the word has one meaning and example 4 stops contradicting the list.

5. **Separate procedure from precedent.** Keep 13 and 20 in "The procedure". Move 14 through 19 and 21 through 23 under a heading "Precedents from the first loop", each marked with the loop and decision that produced it, revisable, and cited by number rather than treated as rules a loop on the OpenAPI binding specification must run. Add the cost sentence from "The cost of being wrong" to "Why this exists".

## What I would keep

- Heuristic 13, "pending is worse than either answer", and the deletion of the frozen list. This is the fix that matters; FINAL.md is the proof it was needed.
- Step 0's classification by ground rather than by category, with only (a) escalating by default. It is the right cut and it is decidable.
- "Quote the text; do not paraphrase it", and "silence plus a working reference is not a design opportunity". Both are cheap and both prevent the most common bad decision an agent makes.
- The precedence being written down and labeled the part most worth challenging. An honest, explicit order beats an implicit one, and flagging it invites the review it needs.
- Heuristic 20, panels detect facts, not taste. It is the guard that keeps five persuasive reviewers from steering the loop; keep the wording.
- The three confidence tiers. They are the right axis for sorting the batch; the document just needs to say so.
- The worked table's shape. It is already most of the review table the maintainer needs; the changes above add columns, they do not replace it.
