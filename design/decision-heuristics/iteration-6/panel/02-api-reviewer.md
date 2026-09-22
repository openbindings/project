# Independent API design review

Reviewed only `procedure.md` and `examples.md` from iteration 6. No historical reports or source audit were consulted.

| Dimension | Grade |
| --- | --- |
| Decidability | A- |
| Internal consistency | A |
| Generality | A- |
| Escalation boundary | A |
| Clarity and tone | A- |
| Overall | A- |

The procedure is usable for both a new API and a revision of an existing API. I found no established blocking defect in its decision mechanics or authorization boundaries. The remaining limitations concern the completeness of one teaching example and empirical confidence in the chosen comparison policy.

## Practical strengths

**New APIs can start without manufactured demand.** The authorized first-use scenario supplies demand for essential operations, while the required outcome, existing operations, and smaller alternative constrain claims of essentiality. This is substantially better than requiring nonexistent callers before the first release. The TypeScript lookup fixture demonstrates the distinction between needing retrieval and selecting its return shape.

**Convenience remains a legitimate API benefit.** Rule 11 admits repeated implementation, calling, and recovery costs; it does not equate “possible with existing primitives” with “unnecessary.” Fixture B explicitly distinguishes a useful helper from an unjustified framework. An authorized integration may qualify before implementation. These provisions prevent the demand gate from systematically favoring inconvenient minimal APIs.

**Existing promises are evidence without becoming permanent architecture.** Carriage, concurrency, Close, float32 serialization, and decoding receive separate treatment as current contracts and possible redesigns. In particular, removing Close requires comparing a complete ownership model. That is a practical safeguard against declarations being simplified while their observable lifecycle disappears.

**The escalation boundary is well drawn.** Local host signatures are separated from shared meaning; publication, unavailable reader contracts, uncertain ruling scope, and conformance compromises hold the affected edit. Partial acceptance cannot land a dependent example without its return shape. An authorized working draft can still advance while a recommendation waits.

**Rationalization is constrained at several independent points.** Fixed audiences, independent consumer evidence, complete alternatives, strongest objections, explicit uncertainty, proposed-precedent status, and dependent reruns make a preferred answer harder to disguise as correctness. A procedure-application mistake can reopen a choice even without new evidence, which is an important escape from an incorrectly stabilized decision.

## Concrete improvement

**Fixture B is less executable than Fixture A.** The demanded-convenience example says an independent issue supplies six-step recovery sequences at eight call sites, but neither the sequence nor the resulting helper call appears in the example. Consequently, a reader cannot inspect the central ergonomics comparison using the document alone. This is a minor teaching-example completeness defect, not evidence that its stipulated conclusion is wrong.

For example, a helper could save five lines while concealing retry exhaustion or forcing an unsuitable recovery policy. The current fixture excludes such a countercase by stipulation; showing a short before/after caller and its failure outcome would demonstrate how a real reviewer establishes that exclusion. Minimal correction: include one representative original recovery sequence, the helper call, and the corresponding success and failure outcomes. There is no need to implement a full package.

## Policy choices and validation still needed

The lexicographic order, neutrality of opposing supported cases regardless of their relative weight, incumbent preference, and mechanical fallbacks are explicit policy choices. They may produce debatable products—for example, an established idiom can defeat a larger caller-effort advantage—but the text accurately discloses that consequence. I would not count disagreement with those priorities as internal inconsistency.

The largest practical uncertainty is the effort required to produce complete records and comparisons for ordinary API work. The complete lookup ledger shows how to do it, but the evaluator replay intentionally leaves several consequential selections unresolved. Those unresolved rows are honest evidence gaps, not failed decisions presented as successes. Still, they do not demonstrate that a real loop can finish a lifecycle or numeric-model redesign within a reasonable budget.

A useful empirical trial would complete one existing API redesign and one demanded optional helper, recording which evidence actually changed the answer and how much review work the ledger required. Passing this document review should not substitute for that trial; the procedure already says so.
