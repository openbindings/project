# Independent API design review

Reviewed only the fixed `procedure.md` and `examples.md`, without other panel reviews or earlier drafts. Lens: whether an API designer can obtain a defensible, usable decision from these instructions, including before an API has callers.

| Criterion | Grade |
| --- | --- |
| Decidability | B- |
| Internal consistency | B |
| Generality | B+ |
| Escalation boundary | B+ |
| Clarity and tone | B+ |
| Overall | B |

The procedure provides useful safeguards against mistaken API reasoning: observable lifecycle effects count even without external resources; documented misuse is separated from incorrect results; existing bounds cannot be ignored to favor a preferred engine; and an authorized first-use scenario can justify essential greenfield operations. The distinction between local host signatures and portable semantics is particularly valuable. The main weakness is that the worked recommendations often stop before the comparison that would justify choosing them. I cannot establish that their answers were reverse-engineered, but the supplied traces do not rule that out.

## Verifiable defects and minimal corrections

### 1. Several “worked” recommendations have not performed the required comparison

**Locations:** Procedure, “Terms that affect decisions,” case definition (lines 69–73), steps 2–3; examples, “Why the dispositions follow,” questions 2, 3 and 7, 4, and 8a.

Step 2 requires viable options and the strongest known case for each; step 3 requires identifying the highest distinguishing reason. Question 2 instead instructs a future reader to “Show a single-key call and an explicit path call.” It supplies neither sequence nor a deciding comparison with the explicitly acknowledged alternative of improving the variadic method's name. The table nevertheless recommends two methods. A renamed path method and the two-method design can both remove the stated ambiguity; the example does not establish which remaining difference decides between them.

The concurrency/lifecycle case recommends one goroutine per Evaluation while saying its complete ownership and end-of-sharing contract still must be defined. That incomplete alternative cannot yet be compared with the incumbent's specified Close behavior. The regex case recommends Go regexp while requiring, but not supplying, the limits and enforcement points needed to compare viable bounded alternatives. Rounding recommends a changed basis without showing the input, two results, or a fully stated alternative algorithm.

These are good review prompts, but they are not completed decision demonstrations. “Inferred” honestly qualifies their confidence; it does not supply the missing comparison.

**Minimal correction:** Until those comparisons exist, label the affected table entries “candidate to compare; selection unresolved.” Then fully work at least one contested surface choice: concrete signatures/calls, applicable countercases, neutralized reasons, deciding step, and dependencies. The current preferred candidates can remain candidates; no opposite preference must win.

### 2. Step 3 leaves two consequential parts of selection ambiguous

**Location:** Procedure, “3. Resolve competing reasons,” lines 202–220.

The opening requires an “equally evidenced countercase” to neutralize a claim, but the subsequent instruction neutralizes all “opposing supported claims.” Those are different thresholds. For an API serving two named audiences, one option may have direct caller evidence for an applicable idiom while another has a plausible established analogue for the other audience. Both are supported; readers can disagree about whether the evidence is equal and therefore whether to stop at rule 7 or descend to ergonomics. The text provides no instruction for recording that unresolved evidence comparison.

The procedure also requests a possible third option but describes resolution as claims for “both sides.” It does not say how to select among three options when a high-level reason eliminates one but ties the other two. For example, two effectively bounded regex engines and one engine with an ineffective limit should leave a two-engine comparison under lower rules; the algorithm should state that narrowing explicitly rather than rely on the reviewer to invent it.

**Minimal correction:** Use one neutralization condition consistently and state how uncertainty about it is recorded. Add a short instruction to narrow the viable option set at each level and continue with all tied survivors; define the disposition if supported comparisons cannot produce an unambiguous surviving set. This need not change the proposed priority order.

### 3. The batch rule does not clearly define the life of an applied inferred decision

**Locations:** Procedure, “4. Decide locally or hold a recommendation,” and “5. Record, review, and revisit,” especially lines 258 and 286–288.

Step 4 permits an authorized unflagged local edit. Step 5 says only unflagged high rows may “keep their local answer” without an individual response, while other unmarked rows remain “pending.” The ledger's status choices are applied, deferred, or held; pending is not mapped to any of them.

For the new TypeScript lookup example, an authorized local implementation can use the inferred undefined-returning choice. At the next unanswered batch, it is unclear whether that implementation remains applied provisionally, must be held, or must lose its chosen contract before dependent work continues. This matters particularly in greenfield work, where essential design choices commonly remain inferred.

**Minimal correction:** State separately whether a decision is provisionally applied and whether its review is pending. Specify exactly what an unanswered batch prevents. Preserve the existing approval policy; this is a request for an explicit state transition, not permission to land unanswered decisions.

### 4. The float32 example extends the consumer gate beyond its stated scope

**Locations:** Procedure, consumer definition and rule 11; examples, “9. Typed exit and float32,” lines 132–139.

Rule 11 gates an optional addition. Question 9 correctly applies it to Canonical, but then says choosing a different representation for the existing Marshal boundary “would require a concrete consumer and its contract.” Revising an existing representation is not necessarily an optional addition. The procedure otherwise admits ergonomic evidence from an applicable idiom, and question 8a proposes changing an existing rounding contract on that basis without identifying a new consumer.

**Minimal correction:** Require a compared contract alternative and concrete caller case for changing Marshal, plus the relevant publication or ruling authorization. Reserve independent-demand language for adding the optional helper. This keeps retaining float32 widening available without silently creating a stronger rule for one existing API decision.

## Preference versus defect

I do not deduct for choosing undefined, retaining a Go presence result, preferring Go regexp as a candidate, or proposing single-owner Evaluation objects. Each can be good under a suitable contract. Nor do I require ergonomics to outrank every proposed principle. The deductions concern reproducibility, missing completed comparisons, and inconsistent procedural requirements—not the preferred API shapes themselves.
