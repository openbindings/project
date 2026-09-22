# Adversarial cold review

Reviewed only `procedure.md` and `examples.md` in iteration 4.

| Dimension | Grade |
| --- | --- |
| Decidability | A- |
| Internal consistency | A- |
| Generality | A |
| Escalation boundary | A |
| Clarity and tone | A- |
| Overall | A- |

The procedure withstands the main adversarial attacks. It makes a preferred choice possible without letting preference masquerade as authority, and it keeps provisional editing separate from acceptance and landing. I found one narrow confidence-classification gap, rather than a demonstrated route around the approval boundary.

## Actual defect: uncertain factual premises lack a mandatory confidence treatment

**Sections:** procedure §3, “Resolve competing reasons,” and §5, “Derive confidence.”

**Concrete input:** An authorized unpublished API has two admissible options, A and B. The loop has recorded acceptance of the applicable operational tests and ordering, so their draft status is not itself an inferred premise. A known caller supplies an expectations argument for A. An objection supplies a potentially applicable expectations argument for B, but whether that caller belongs to the declared audience is unresolved. The reviewer correctly preserves both options at that level and records the uncertainty. A then wins the lower ergonomics comparison on the supported caller sequences. There is no authority conflict, unknown compatibility, or other step-4 hold.

**Competing permitted readings:** One reviewer marks the result **inferred**, because neutralizing the expectations dispute while proceeding depends materially on an unresolved factual assumption. Another treats that uncertainty as neither a proposed design premise, precedent, unread authority, nor an inferred decision: those are the explicit triggers in confidence rule 1. They mark the choice **high**, citing the accepted ergonomics test as directly decisive; alternatively, they mark it medium if they regard the accepted ordering as material. Section 3 says merit uncertainty “can yield” an inferred choice, rather than requiring that classification.

The second reading is the confidence-inflation opportunity. A diligent reader may understand “proposed” to include an unverified factual assumption, but the surrounding discussion repeatedly uses that word for proposed tests, rules, and decisions. The procedure should not depend on that broader interpretation.

**Minimal repair:** Add “unresolved, unverified, or assumed factual premise” to confidence rule 1 when it materially decides or neutralizes a comparison. Clarify that merely recording an irrelevant uncertainty does not lower confidence. This preserves the ability to proceed locally while making the reported confidence reproducible.

## Attacks that do not establish defects

**Invent demand by drafting the desired helper first.** Input: an agent wants a Canonical method and supplies its own adapter sketches, invented callers, and a loop-filed issue. The desired outcome is immediate addition; the supported outcome is deferral. “Consumer,” rule 11, and the typed-exit example explicitly exclude those sources as independent demand. Calling the helper essential also fails unless the authorized first-use outcome is impossible through existing operations or a smaller capability. An authorized integration can legitimately change the outcome; that is evidence arriving, not a loophole.

**Turn an existing promise into optional work and delete it.** Input: an existing method promises float32 widening, and the agent bundles it with an unbuilt normalization facility. Desired outcome: defer the entire bundle for lack of demand. Supported outcome: preserve the current promise or compare an explicit contract revision with its applicable authorization. Examples 9 and 10 make the distinction unusually clear. A preference for making every existing contract immutable would be a different policy.

**Promote the previous iteration into authority.** Input: a draft introduced a new numeric-kind definition, then uses that definition to dismiss the next panel’s predictability objection and claim high confidence. The definitions of precedent, rule-8 discussion, confidence dependencies, and the numeric examples jointly block this. Proposed precedent stays proposed, and a proposed model cannot prove its own predictability. A maintainer’s acceptance of one local decision does not silently ratify its general test.

**Hide a shared change inside a local README edit.** Input: an implementation chooses a bounded regex engine, then edits its class’s allowed-divergence rule as a “documentation correction.” The desired outcome is a local conformance claim; the supported outcome is a candidate local choice plus a held class recommendation. Steps 0, 1, and 4 classify by changed behavior and ownership, not file type. An unavailable reader or governing source cannot be interpreted as permission.

**Reopen a settled preference by changing the example input.** Input: a previously compared lookup choice is challenged again with a different key and the same presence/null argument. Desired outcome: another selection round; supported outcome: increment the re-raise count. Admitting stored undefined is materially different and correctly reopens the choice. Section 5 asks for the prior premise or scope newly challenged, which is a practical defense against cosmetic novelty.

## Policy choices, not defects

The countercase rule deliberately permits a supported opposing case to neutralize a higher-level comparison without quantitative weighting. That can disappoint a reviewer who thinks one cost dwarfs another, but the text explicitly chooses this policy; it is not an undisclosed weighting loophole.

An agent can influence the alphabetical residual tie-break by wording its options. However, the options must already be acceptable, their text must be frozen, and the result must be recorded as arbitrary. Replacing this with externally assigned identifiers could improve resistance to presentation games, but would not fix a substantive authority or confidence defect: the current rule openly claims reproducibility, not design merit.

Pending local decisions can remain applied in a draft. This is intentional and useful. The named-batch acceptance requirement and separate action authorization prevent that provisional state from becoming silent permission to land.

