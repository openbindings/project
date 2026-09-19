# Independent API design review

Read only `procedure.md` and `examples.md` from iteration 4. This review assesses the supplied arguments, not the underlying evaluator or its source audit.

| Dimension | Grade |
| --- | --- |
| Decidability | A- |
| Internal consistency | A- |
| Generality | B+ |
| Escalation boundary | A |
| Clarity and tone | B+ |
| Overall | A- |

Following this would usually produce defensible practical API choices and much better records of why they were made. It explicitly permits useful local decisions, distinguishes correcting an existing promise from redesigning it, and prevents provisional text from becoming its own authority. I found no blocking contradiction in the complete lookup fixture. The remaining weaknesses are a small ambiguity in the demand gate and uneven completion of the evaluator recommendations. The proposed ranking also makes a consequential design tradeoff that deserves practical testing rather than another abstract proof.

## Concrete defects and missing derivations

**1. The optional-addition gate needs one clarification about ergonomics.** The consumer definition explicitly permits a preferred convenience to be justified by concrete demand and an ergonomics comparison (`procedure.md`, lines 62–73). Rule 11 asks why existing operations “do not meet that use” (line 174). Read functionally, that phrase can reject the very convenience the earlier paragraph permits: a named integration can already implement a Resolver, but repeated adaptation or error-prone representation work may justify a provided adapter. The adapter example uses the more permissive and useful phrase “cannot conveniently serve” (`examples.md`, lines 159–167).

This is an interpretive ambiguity, not a demonstrated requirement to reject every helper. The earlier definition provides the right answer, but the compact gate is the part an implementing reviewer is likely to apply repeatedly.

**Minimal fix:** Say that an optional addition must address a demonstrated shortfall for its consumer, including concrete calling, recovery, or repeated implementation costs. Reserve the strict “required outcome is impossible” test for declaring an operation essential. Keep the independent-demand requirement intact.

**2. Two evaluator recommendations do not yet show the comparison required to reproduce them.** Object carriage is recommended for retention, but its rationale says to compare caller tasks rather than showing them (`examples.md`, lines 113–121). Absence recommends retaining the triple after saying to compare presence/error checks with a sentinel (`examples.md`, lines 230–237). Neither supplies the paired calling sequences required by the procedure's definition of an ergonomic case, nor enough tier-by-tier evidence to tell whether retention comes from rule 7 or the incumbent tie-break. By comparison, Select is explicitly unresolved until its missing comparison is supplied (lines 123–130).

The opening caveat correctly says that a recommendation need not be uniquely forced. That does not substitute for showing how an advertised procedural recommendation was reached. Inferred confidence marks premise quality; it does not itself complete a missing comparison.

**Minimal fix:** Mark these two selections incomplete pending their named caller comparisons, retaining the incumbent meanwhile, or add the paired caller paths and state the actual deciding step. No new evaluator ruling is needed. Their existing observations remain useful evidence either way.

## Worked fixture and actionable outcomes

The complete TypeScript lookup fixture is sound on its stipulated facts. It fixes the audience, first-use requirement, stored-value domain, relevant caller idiom, ownership, and publication status before selecting a representation. All three alternatives preserve absence versus stored null. Equal effective bounds leave the resource tier neutral. Ordinary absence is a documented lookup outcome, so an exception is not automatically more correct or preferable merely because it is conspicuous. The supplied Map-style caller supports A at rule 7, and the fixture supplies no competing established idiom. A's shorter path is corroboration, not a retroactively promoted correctness claim.

Calling this inferred is appropriate. It is a demonstration of the proposed procedure on controlled evidence, not evidence that every TypeScript lookup should return undefined. The stored-undefined reopening condition is especially useful: it identifies the premise that makes the representation work.

The decision's applied/pending status, concrete alternative, affected locations, and Reverse behavior give a maintainer an actionable result. The CLI correction similarly distinguishes a high-confidence contract reading from permission to deploy. Existing-surface cases correctly retain compatibility questions: Close has observable behavior, a numeric-kind change cannot validate itself, and a documentation label cannot create a conformance exception.

## Judgment calls, not contradictions

**The ranking favors familiarity strongly.** A supported idiom can eliminate an alternative before common-path effort, compulsory work, or recovery costs are considered at the DX tier. Conversely, one supported countercase can neutralize that tier even when the competing cases differ greatly in prevalence or impact. Both outcomes follow the explicit algorithm; neither is a hidden logical defect. I would test this on a real API where a familiar operation imposes substantial repeated work before accepting the ranking generally. If that outcome is intentional, include one such example so “DX is supreme inside the constraints” does not invite a different expectation of the procedure.

**The complete fixture is deliberately easy.** It proves a new API can reach an executable provisional choice without preexisting callers. It does not yet demonstrate resolution of competing real caller idioms, a demanded convenience, or a redesign of a published surface. Adding one complete demanded-helper case would test the demand clarification and broaden confidence more than adding another authority-versus-example case. This is a coverage recommendation, not a reason to invent demand in the evaluator replays.

The escalation boundary is particularly strong: explicit authorization can cover an edit without changing what conforms; unknown relevant readers hold only compatibility-dependent work; acceptance, publication, and general-rule ratification remain distinct. The document is usable now as proposed guidance, with the two small repairs above. Its density and repeated qualifications make it less convenient as a daily checklist, but removing those distinctions would sacrifice useful precision.
