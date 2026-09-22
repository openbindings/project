# Cold-applier review

Read only `procedure.md` and `examples.md` in iteration 4. No other reports, grades, or history were consulted. These grades apply to these SHA-256 snapshots:

- Procedure: `21b179e07a935ac171d4c31f067ebf5613d8da389086cac626652c3b35aa2926`
- Examples: `ae0bfedb795d6a49a8050a12820e9dadaeebaa77ab47f58e2bbfbd76992a74ac`

| Criterion | Grade |
| --- | --- |
| Decidability | A- |
| Internal consistency | A- |
| Generality | A |
| Escalation boundary | A- |
| Clarity and tone | A- |
| Overall | A- |

The procedure produces usable dispositions for all three new fixtures below. Its strongest feature is separating an answer's confidence, permission to edit, and acceptance for landing. The remaining material ambiguity concerns uncertain precedent coverage, rather than ordinary competing design reasons.

## Fresh application 1: three diagnostic-delivery surfaces

**Stipulated evidence.** An authorized, unpublished Python validator supports at most 100 diagnostics per invocation. Its responsibility is validation and delivery of diagnostics. It has no shared readers or applicable ruling. Governing text specifies diagnostic contents but is outside the delivery-shape question. The charter authorizes local declarations and examples. No maintainer has accepted the new operational tests or this decision.

Freeze these complete alternatives:

- A, incumbent: `validate(doc, emit)` calls a supplied sink for each diagnostic.
- B: `validate(doc)` returns an iterator yielding every diagnostic.
- C: `validate(doc)` returns a completed diagnostic list.

The evidence packet contains three actual fixture callers: an event sink using `validate(doc, panel.emit)`; an iteration consumer using `for d in validate(doc): display(d)`; and a batch reporter using `report(sorted(validate(doc)))`. Each has a correct adaptation for every option. A requires accumulation for batch work; B requires iteration to drive an event sink; C delays incremental display until validation completes. All report the same diagnostics, use identical enforced resource ceilings, and signal malformed input explicitly. No first-result latency is promised. These facts and their competing caller costs are fixture evidence, not assertions about Python generally.

**Derivation.** This is a surface choice, not a shared rule. Step 1 leaves its shape open. Bounds and correct-use outcomes do not eliminate an option. Rule 7 has supported structural idioms on all three sides; none dominates across the supplied cases. Rule 3 finds all three within the stated responsibility. There is no portable delivery-shape promise under rule 9. Rule 5/proposal 14 retain the incremental-display versus batch-convenience countercases; rule 6 finds all first uses workable without configuration. No option dominates every supported case at any level. Step 3 therefore retains incumbent A.

**Exact disposition:** local explanatory edit **applied**, recording retention of A; review **pending**; confidence **inferred**, with a residual tie noted. The inferred result follows before the arbitrary test because neutralization and comparison materially use this draft's proposed tests. No signature change is needed. B is the recorded adoptable alternative; C remains in the comparison. Pending review does not prevent this local edit or its dependent example. It does exclude this non-high row from landing without acceptance.

**Improvisation:** none in the selection. Supplying complete limits, caller evidence, and publication facts is fixture setup, not permission to assume those facts in a real application.

## Fresh application 2: clear correction, unread compatibility evidence

**Stipulated evidence.** A stable checksum API promises, “Reject every record whose supplied digest differs from the computed digest.” Its binary-record path currently accepts a mismatch. The contract and incorporated digest algorithm are available and unambiguous. A named external repository reads this API; its relevant compatibility contract is inaccessible. The charter permits local fixes but supplies no approval to override a shared-boundary hold. A proposed test uses one binary record with a mismatching digest.

**Derivation.** Rejecting that record is an apply-bin correction required by the existing promise. It changes observed implementation behavior but does not redesign the promise. Nevertheless, step 4 independently requires a hold because the relevant reader's compatibility contract cannot be inspected and compatibility of the behavior change depends on it. Record the rejected lookup and the reader being checked. Package the correction, the affected consumer, and the alternative of retaining current behavior while the feature's contract violation remains disclosed.

**Exact disposition:** correction **held** and recommendation **flagged**; review **pending**; confidence **high** in the required rejection. The unavailable source is consumer evidence, not a premise needed to derive the governing answer. The procedure expressly allows a text-required correction to remain high while its edit is held. Mark the binary path incomplete in the review artifact, since current behavior does not meet its promise. Independent revisions continue. Reopening requires the missing compatibility evidence or explicit authorization covering this flagged change; neither can make accepting the mismatch conforming.

**Improvisation:** none. The correction's high confidence and compatibility uncertainty belong to different claims and are recorded separately.

## Fresh application 3: optional export with self-generated demand

**Stipulated evidence.** An unpublished local audit tool already fulfills its authorized first-use scenario by writing JSON records. Reviewers propose ZIP export and file an issue themselves. No independent caller, independently filed request, or authorized integration needs archives. Alternatives are retaining JSON output, adding ZIP export, and documenting how an existing caller could archive output externally. The proposal changes no existing obligation.

**Derivation.** Step 1 supplies no export obligation. Rule 11 applies before optimizing the proposed helper: the loop-created issue is an argument, not a consumer. Defer ZIP export. The strongest objection is repeated archival work in hypothetical callers, which lacks the consumer evidence needed here. Preserve the existing JSON output boundary; proposal 15 does not justify a new plugin framework.

**Exact disposition:** ZIP addition **deferred**; review **pending**; confidence **inferred**, because the operative consumer gate is a proposed operational test. Reopen when an authorized named integration or independent concrete use establishes the unmet need. No invention of archive ergonomics is required to decide deferral.

**Improvisation:** none.

## Concrete defects and minimal fixes

1. **Uncertain precedent coverage lacks an explicit edit disposition.** The terms section says uncertain coverage “requires reaffirmation.” Step 3 allows uncertain applicability to remain in an inferred local comparison; step 4 explicitly holds extensions or reversals of a maintainer ruling. A cold applier cannot cleanly tell whether independently reaching the same behavior for an ambiguously covered new instance may proceed while reaffirmation is pending. Add one sentence stating whether that coverage uncertainty always holds the edit, or holds only an edit whose admissibility depends on the ruling. This is a decision-state ambiguity, not a request for a different substantive policy.
2. **The case definition still assumes two options.** “The two options' observable outcomes” conflicts with the otherwise explicit multi-option procedure. Replace it with “the candidate options' observable outcomes.” This is small, but avoids making three-option records look noncompliant.

## Policy preferences, not defects

The alphabetical final tie-break is unattractive as a design rationale, but the draft labels it arbitrary and makes it reproducible. Likewise, a supported countercase can neutralize a higher-level comparison even without equal quantitative evidence. That is an explicit choice of decision method; disagreement with it is not an internal inconsistency. Neither preference affected the grades above.
