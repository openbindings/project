# Independent consistency review

Reviewed only `procedure.md` and `examples.md` from iteration 6. No other reviews, grades, or source records were consulted.

| Dimension | Grade |
| --- | --- |
| Decidability | A- |
| Internal consistency | A |
| Generality | A- |
| Escalation boundary | A |
| Clarity and tone | A- |
| Overall | A- |

The procedure is coherent and operational for the illustrated cases. It distinguishes a compelled correction from a redesign, uncertainty about admissibility from uncertainty about merit, and acceptance of a choice from permission to land it. I found one bounded selection gap, rather than a contradiction between the main stages.

## Actual defect: overlapping reference adoption has no selection rule

Step 1 permits adopting observable behavior under silence when the charter names the reference and the adoption changes neither the value model, surface, nor resource bounds. It does not require one designated reference for each scope or say what happens when eligible named references disagree.

**Concrete counterexample.** A query-parser charter names two pinned, nonnormative reference implementations for compatibility investigation. Neither has priority. The governing grammar specifies rejection of malformed expressions but is silent on which diagnostic to report when an expression contains two independent syntax errors. Both references reject the same expression with the same public error shape and effective resource bounds, but R1 reports the leftmost error and R2 reports a missing closing delimiter. Their diagnostic choice changes none of the shortcut's excluded properties.

**Conflicting permitted outputs.** One loop adopts R1's diagnostic and records a reference-adopted, inferred decision; another adopts R2's diagnostic with the same status. Both satisfy the stated conditions on the same charter and evidence. The disagreement does not reach step 3 because both results qualify for reference adoption. These references are not normative authorities, so the normative-conflict rule does not resolve the case.

**Minimum repair.** Require the charter to designate one reference or an explicit reference priority for each overlapping scope. If eligible named references disagree without that priority, route the question through the design tests and record both observations. This preserves the shortcut without treating an implementation as authority.

## Checks that passed

- **Stages and fallback:** The simultaneous elimination pass prevents iteration order from changing a stage's survivors. Opposing supported cases preserve both options. The fallback retains only survivors, applies surface containment before direct dependency count, and defines the final text ordering. The three-survivor example correctly removes B before comparing A and C; B cannot return because it has fewer dependencies.
- **Authority and scope:** Incorporation, normative conflicts, unread sources, uncertain ruling scope, shared readers, and published contracts have explicit handling. A local contract supplies a correction target without forbidding an authorized redesign. Reference adoption remains local and inferred. Unknown ownership or compatibility holds the affected action while independent work continues.
- **Confidence:** Inferred premises take precedence over the residual-tie classification. The mechanical fallback's exemption is expressly limited; uncertain admission and neutralization premises still count. High confidence requires either a direct established answer or acceptance of the applicable operational test. No illustrated preference acquires high confidence merely by repeating a principle heading.
- **Acceptance and reopening:** Provisional edits may remain pending, but landing requires accepted and authorized dependencies. Reopening resets materially affected acceptance while preserving still-applicable action authorization. Demonstrated procedural mistakes can reopen unchanged evidence, so the repetition rule does not entrench an acknowledged error. The stability default protects only still-valid answers and yields to an explicit reversal.
- **Examples:** The lookup fixture supplies the specific caller evidence that its selection uses; the convenience fixture separates essential capability from justified optional work. Partial acceptance agrees with the dependency rule. The evaluator cases explicitly leave missing comparisons unresolved rather than pretending retention is a completed preference verdict. CLI correction and informative-schema examples agree with the authority boundary.

## Preferences and extra coverage, not defects

The text is careful but dense. A compact decision-flow reference would reduce navigation between status, confidence, and acceptance without changing the rules. Additional fixtures for overlapping references, an accepted operational test producing medium confidence, and a held high-confidence correction would improve coverage. Their absence alone is not a deduction.
