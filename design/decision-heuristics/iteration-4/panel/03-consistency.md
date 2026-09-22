# Cold review: specification and consistency

Reviewed only the supplied draft-4 procedure and examples. No history, other panel, grades, or linked source audit was consulted. This checks agreement with the supplied premises, not the truth of the external evaluator history.

Snapshot SHA-256:

- procedure.md: `21b179e07a935ac171d4c31f067ebf5613d8da389086cac626652c3b35aa2926`
- examples.md: `ae0bfedb795d6a49a8050a12820e9dadaeebaa77ab47f58e2bbfbd76992a74ac`

| Dimension | Grade |
| --- | --- |
| Decidability | B+ |
| Internal consistency | A- |
| Generality | A- |
| Escalation boundary | A- |
| Clarity and tone | A- |
| Overall | B+ |

The procedure usually produces a usable local decision or a bounded hold. Its principal remaining weakness is that the exact comparison algorithm admits different readings when several criteria or candidates survive. These are specification ambiguities, not objections to the chosen policy order.

## Findings

### 1. The unit of elimination is ambiguous where a numbered level contains “then”

**Location:** procedure.md:208–224.

Elimination considers every supported case “at that level,” and opposing supported cases are neutral “at that level.” But numbered levels 2, 3, and 5 contain ordered components. The text does not explicitly say whether each component gets its own elimination pass.

**Breaking input:** Two admissible surface designs survive resource and correctness comparisons. A fits the audience's established idiom; B better respects the recorded layer responsibility. Both claims have concrete supported cases, neither violates a governing answer, and B is the incumbent. No later criterion separates them.

- Treat numbered level 3 as one comparison: neither dominates across rule 7 and rule 3; both survive, and the incumbent B wins.
- Treat “rule 7, then rule 3” as separate elimination passes: A eliminates B at rule 7, so A wins.

The second reading is probably intended, but the first follows the stated unit of dominance. It changes a completed decision rather than merely its explanation.

**Minimal repair:** Define an atomic comparison stage explicitly. Flatten the ordered components into stages and state that only rule 5 plus proposal 14 are deliberately combined. Run dominance removal after each atomic stage. Add this two-option case as a regression example.

### 2. The residual fallback needs an explicit survivor-set algorithm

**Location:** procedure.md:228–234.

The fallback switches from the earlier explicit survivor procedure to “prefer” and “tied.” Pairwise preference and successive filtering do not necessarily mean the same thing when containment is a partial order.

**Breaking input:** Three candidates remain tied on all design stages, with no incumbent. A exposes `{get}` and introduces two dependencies. B exposes `{get, set}` and introduces none. C exposes `{read}` and introduces one. All satisfy the authorized retrieval use, and the retained `get` operation behaves identically in A and B.

A beats B by containment. B beats C by dependency count because their surfaces are incomparable. C beats A by dependency count for the same reason. Thus a pairwise reading produces a cycle. A global filtering reading removes B first and then selects C. The intended result is recoverable, but only after selecting an unstated interpretation of the fallback.

A related edge case has incumbent I eliminated at an earlier stage while A and B remain tied. “Retain the incumbent” should explicitly exclude I; “acceptable” is broader than “surviving.”

**Minimal repair:** State that every fallback operates on the current survivor set. Retain the incumbent only if it survives; otherwise remove every strict surface superset of another survivor, then keep only candidates with the minimum dependency count, then select by a specified text ordering. This preserves the apparent policy and makes the result independent of pairwise traversal order.

### 3. Conflicting authority needs an explicit terminal state

**Location:** procedure.md:119–144; examples.md:264–269.

The procedure correctly says conflicting normative requirements require a recommendation. It then supplies only Answered, Silent, and Unread outcomes, and sends “all other open questions” through design tests. The parser example is more explicit: hold the affected acceptance decision.

**Breaking input:** One incorporated normative clause requires accepting input X; another requires rejecting X; both were read and neither has priority. This is neither silence nor an unread source, and there is no singular governing answer to apply. The conflict paragraph points toward escalation, but the state transition and hold are less explicit than in the example.

**Minimal repair:** Add a Conflicted outcome: quote both requirements, hold the affected decision, and prepare an owner recommendation; unaffected questions continue. The existing example then directly exercises a named branch. This is a small completeness gap, not evidence that the draft endorses choosing a convenient authority.

## Other audit results

The main dominance rule is substantially better specified than a vote among principles: it retains opposing supported cases, requires evidence for eliminations, and handles unknown applicability conservatively. I found no demonstrated cycle in that rule when every candidate is assessed on the same supported cases. The concerns above concern stage boundaries and the fallback.

Confidence is generally coherent. Proposed operational tests and material neutralizing premises prevent false high confidence; medium dependencies propagate; mutually dependent choices cannot bootstrap support; and high confidence can coexist with a held edit. Arbitrary naming provenance is distinguished from the correctness of an independently promised result. No additional definite confidence-propagation defect was established.

Scope and authority boundaries are strong: local contracts permit redesign while supplying correction baselines; Core does not automatically govern hosts; publication and unavailable reader contracts create holds; class proposals cannot authorize local nonconformance; acceptance and action authorization are separate. Strict treatment of precedent and core dependencies is a policy choice, not an inconsistency.

The complete TypeScript fixture agrees with the procedure under the intended staged reading: its stipulated caller evidence selects A, ordinary absence is not a correctness failure, essential retrieval passes the consumer gate, and the proposed idiom test makes confidence inferred. The CLI correction and informative-schema example agree on authority. The evaluator dispositions are explicitly recommendations or incomplete comparisons, so missing real caller comparisons do not masquerade as completed selections. The decoder-label recommendation should preferably state its held edit status beside its inferred confidence, but it does not claim that the dependent class question has been resolved.

The prose is careful and usable. A compact stage list and one three-candidate fallback example would improve reliability more than additional principle explanations.
