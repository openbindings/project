# Cold-applier review of draft 3

Read only the fixed `procedure.md` and `examples.md` snapshots in this iteration. The three cases below are new, stipulated fixtures, not assertions about existing OpenBindings components. Their quoted promises and search results are fixture inputs. I did not consult earlier reviews or grades.

| Criterion | Grade |
| --- | --- |
| Decidability | B+ |
| Internal consistency | A- |
| Generality | A- |
| Escalation boundary | A- |
| Clarity and tone | A- |
| Overall | A- |

## Case 1: Fixing prohibited retries would disagree with a shared test

**Inputs.** A released HTTP binding incorporates a pinned transport contract: “Do not retry a write after an ambiguous disconnect.” The binding repeats that promise. Its implementation nevertheless retries such writes, and a named sibling repository's shared integration test records the retry. The charter authorizes implementation corrections on a local branch, but not changes to shared expectations. The search covers all named readers and finds that test.

**Options and observable case.** A write reaches the server, but its response is lost. Retrying can execute it twice; returning the promised ambiguous-outcome error sends it once. An opt-in retry flag would also need a changed contract and cannot excuse the current violation. The strongest objection to removing retries is that the shared integration currently depends on them.

**Application.** Step 0 separates the member correction from the shared expectation. Step 1 is answered by the quoted prohibition; the retrying implementation and test do not become authority. Steps 2–3 cannot trade that answer against successful recovery or compatibility. Step 4 nevertheless holds the correction because it conflicts with recorded behavior at a shared boundary. It also holds the shared-test change. Since the incumbent violates the existing requirement, the review artifact must mark the affected feature unsupported or incomplete, rather than endorse the incumbent while waiting. Step 5 records both dependent edits in one flagged package.

**Outcome:** recommend removing the retry and aligning the test; **held**, with approval needed for the described shared-boundary change. **Confidence: high** in the governing answer, independent of the hold. No improvisation was necessary. The restriction on local corrections is conservative but explicit, not a contradiction.

## Case 2: A new paginated API has a clear local design winner

**Inputs.** An unpublished Rust API has an authorized first-use brief: “Read at most one page at a time; callers may stop before the end.” Its incorporation clause governs wire encoding only. The established audience is application developers composing filters over rows. Existing project guidance for this audience says, “Expose pull iteration for caller-controlled traversal.” The charter authorizes API draft changes; all named readers have been checked, and there are no shared expectations or existing rulings on this API. There is no incumbent.

**Options and observable case.** A caller needs the first two matching rows. A pull iterator permits `rows.filter(matches).take(2)`; a callback visitor requires keeping a match count and returning a stop signal. Both are bounded to one page, allow early stopping, and explicitly return transport failures. Collecting the entire result is a smaller-looking call but violates the brief for a sufficiently large result. The visitor's strongest objection is its simpler implementation, recorded as the fixture's prior review objection.

**Application.** Step 1 records the interface question as outside the incorporated wire contract's scope. Step 2 rejects full collection against the first-use obligation and admits both streaming designs. Rule 11 cannot defer essential traversal. In step 3, bounds and correct-use predictability do not distinguish the remaining options; the recorded structural idiom makes rule 7 favor the iterator before implementation convenience. Step 4 finds no flag or missing authorization.

**Outcome:** select the iterator as the local draft answer. **Confidence: inferred**, because the result materially uses the draft's operational tests and ordering. At step 5 it becomes an unmarked, pending batch row if the maintainer does not respond.

**Ambiguity encountered:** the procedure permits the local edit in step 4, but says only unflagged high rows may “keep their local answer” without an individual response. It does not say whether the inferred iterator may remain in the next draft, whether its dependent examples may be written, or whether it must be reverted at the iteration boundary. I can confidently report the candidate and pending review status, but cannot uniquely determine the artifact state from those sentences alone. Treating “pending” as permitting explicitly provisional draft edits is an interpretation, not a stated transition.

## Case 3: A real consumer requests an unnecessary atomic helper

**Inputs.** A stable key-value API already promises atomic `CompareAndSwap(key, absent, value)`. An independent integration issue requests `InsertIfMissing` to implement concurrent message deduplication. Its complete first-use scenario is to let exactly one worker create a marker and return whether creation succeeded. Existing CAS already does precisely that. The charter permits investigation and local documentation corrections, but contains no approval for public contract changes. No other consumer requirement, such as reduced caller branching, is stated.

**Options and observable case.** Two workers race on an absent marker. Both the proposed helper and existing CAS yield one success and one failed comparison. A separate read followed by write can admit both workers and fails the consumer's requirement. The helper's strongest objection to deferral is its clearer name; the integration demonstrates demand for deduplication, but does not demonstrate a missing capability.

**Application.** Step 1 identifies the unchanged CAS promise. Step 2 excludes read-then-write and applies rule 11 before optimizing the helper's design. The named consumer passes the demand requirement, but the existing-operation requirement fails: CAS meets the stated use. Defer the addition and preserve the existing extension point under proposal 15. There is no reason to design a speculative transaction framework. Step 4 would flag the addition as a published-contract change if pursued; deferral requires no such edit. Step 5 records the choice and the reopen condition: a concrete use that CAS does not meet, or explicit maintainer direction.

**Outcome:** **deferred**, with no new public edit; **confidence: inferred** because the operational necessity test drives the recommendation. Its batch row remains pending without a response, but the existing CAS contract remains valid. No fictional consumer or publication permission was needed. This case usefully distinguishes having a consumer from needing the proposed facility.

## Actionable finding

**One missing state transition, not a demonstrated policy contradiction.** Case 2 exposes the distinction between permission to edit a local draft and acceptance of its answer. Step 4 and the opening purpose support local progress; step 5's “keep their local answer” can instead be read as requiring individual acceptance before that progress survives a batch.

**Minimal fix:** explicitly define pending batch status. For example: “An authorized, unflagged inferred, medium, or arbitrary choice may remain in the working draft with its dependent edits while individual review is pending; this does not establish precedent, count as acceptance, or authorize landing.” If the intended policy is to hold such edits instead, state that transition and the treatment of already-applied dependents. Also say whether pending rows affect the charter's completion gate or only its acceptance/publication claim.

**Strongest contrary argument:** “independent local work can continue” and “silence ratifies nothing” may already imply provisional drafts. That is a reasonable reading, and the examples consistently call their design outcomes recommendations. Neither, however, specifies whether work dependent on the pending answer is included in “independent” work. A cold applier should not need to choose that meaning.

I found no objective contradiction in the governing-answer, shared-boundary, or optional-demand paths exercised here. Requiring approval for every shared-boundary conflict, including a clear correction, is a design choice rather than an error. The remaining grade deductions reflect the unresolved draft-state transition, not a preference for a different product-design hierarchy.
