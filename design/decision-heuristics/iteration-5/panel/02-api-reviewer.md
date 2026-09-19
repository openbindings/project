# Independent API design review

Reviewed only `procedure.md` and `examples.md`, draft 5. The source audit, original API, history, and other reviews were not inspected; assertions about those artifacts are therefore assessed as the examples' stated inputs.

| Dimension | Grade |
| --- | --- |
| Decidability | A- |
| Internal consistency | A |
| Generality | A- |
| Escalation boundary | A |
| Clarity and tone | A- |
| Overall | A- |

This is usable guidance for a real API design loop. Its strongest feature is the separation of an existing promise, evidence for a better design, authority to make the change, and authority to land it. It provides a way to keep designing without quietly turning a provisional preference into a project law. I found no concrete contradiction that makes its stated decision mechanism fail. The remaining concerns are limitations in demonstrated coverage and policy tradeoffs, identified separately below.

## Demand and design quality

The consumer definition and rule 11 are appropriately selective without making a new API impossible to start. The authorized first-use scenario supplies demand for essential capability; the “impossible without” test applies to that essential classification, not to every useful helper. Independent caller evidence can justify convenience through repeated work and recovery costs. The demanded-helper fixture correctly exercises that distinction, and the adapter discussion supplies a usable reopening condition rather than a permanent prohibition.

For existing APIs, the distinction between a baseline promise and immutable authority is equally valuable. A return contract can be redesigned, but cannot be described as already wrong merely because another form seems cleaner. Published status, other readers, and ruling scope then determine whether that redesign can be applied. The examples handle Close, float32 serialization, and decimal decoding consistently with this distinction.

The protections against rationalized answers are substantive: fix the audience, expose both caller paths, distinguish correct use from misuse, compare complete numeric and lifecycle models, and prevent a proposed rule from proving itself. Retaining the strongest sourced objection and reopening demonstrated mistakes on unchanged evidence also avoid a common failure in iterative reviews: treating repetition as validation.

## Completed derivations

The lookup fixture is a genuine completed selection under its stated facts. All three options preserve the required absence/null distinction; the supplied idiom differentiates them at the surface rule-7 stage; the demand gate does not pretend to select a representation. Its ledger makes the resulting edits, uncertainty, and reopening condition concrete. The staged-order and three-survivor checks accurately exercise the stated elimination and fallback order. Partial batch acceptance correctly protects the landing baseline from an accepted example whose required return type remains pending.

The helper fixture also follows the procedure, but provides less independently inspectable evidence: it says an issue contains six-step recovery sequences rather than displaying them. That is acceptable as a stipulated fixture, not equivalent to demonstrating a real convenience decision. The evaluator replay expressly marks its missing comparisons and unresolved winners. That honesty is a strength; those entries must not be counted as completed evidence that this procedure selects good existing-API redesigns.

## Coverage limitation, not a contradictory rule

The main remaining validation gap is a completed existing-API comparison with supported cases on both sides of an early stage. The completed lookup fixture has one idiom and no opposing idiom; the short ordering fixture likewise stipulates an uncontested advantage. Neither exercises the central neutralization rule in a realistic contested design.

**Stress case:** one established caller idiom supports a sentinel return, another supports a presence tuple; later caller-recovery evidence favors one; the incumbent supports the other. A complete application should show the early stage retaining both, the later stage resolving or failing to resolve the choice, and exactly when the incumbent fallback applies. This is not a demonstrated breaking case—the procedure appears to specify the answer—but it is the smallest useful next validation. Add one bounded fixture with actual caller sequences, stage survivors, confidence, and dependent edits. A fresh historical replay is unnecessary.

## Policy tradeoffs, not defects

First, any supported countercase neutralizes an advantage at that stage regardless of prevalence or magnitude (`procedure.md`, step 3). A rare valid idiom can therefore prevent the common idiom from deciding, allowing a later reason to select the result. That is a coherent conservative dominance rule, not a contradiction. It should be accepted with that consequence visible; allowing weighted frequency would be a different policy.

Second, ongoing maintenance cost has no explicit ranking stage when it does not affect a charter limit, dependency count, caller outcome, or layer responsibility. The helper example candidly records this limitation. An optional helper with modest caller savings and substantial future maintenance could still win under these tests. If maintainers want that cost to veto or outweigh convenience, the minimal extension is an explicit charter constraint or a defined comparison rule with evidence requirements. Smuggling the objection into “wrong layer” would undermine this draft's strongest discipline.

The document is lengthy but purposeful. A compact operational worksheet would improve repeat use; it should summarize the existing tests without creating another normative layer. The procedure is ready for an actual API loop, with its own closing warning respected: passing this document review does not establish that its resulting APIs work.
