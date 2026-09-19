# Adversarial cold review

Reviewed only `procedure.md` and `examples.md` from iteration 5. No earlier drafts, reports, or history were consulted.

Snapshot SHA-256:

- Procedure: `a5bbba1bc2cb823f3943bfa88261c558c4849a4ea49012d133ce9e5fe224591b`
- Examples: `450b2d5fdf374cd24aacb8dc7377b20d3bced695baa2e9e3cbc025d58936dcb6`

| Dimension | Grade |
| --- | --- |
| Decidability | A- |
| Internal consistency | A |
| Generality | A |
| Escalation boundary | A |
| Clarity and tone | A- |
| Overall | A- |

The procedure withstands the main authority, scope, demand, and approval attacks. I found one narrow reproducibility defect in the final fallback, rather than a route to override authority or publish an unaccepted decision.

## Demonstrated defect

**“Fewest new dependencies” has two ordinary, outcome-changing meanings.** Step 3, lines 243–245, does not specify direct dependencies versus the full dependency closure.

**Breaking input:** Two admissible designs have no incumbent, survive every comparison stage, and expose incomparable surfaces. Their behavior, bounds, caller costs, and applicable idioms are stipulated equal. A adds one direct package, X, which brings two previously absent transitive packages. B adds two direct packages, Y and Z, with no transitive packages. Both dependency graphs are pinned and inspected; neither option changes a core package. The question therefore reaches the dependency fallback without a scope hold or earlier discriminator.

**Competing allowed outcomes:** Counting additions to the direct dependency list gives A one dependency and B two, selecting A. Counting new packages in the dependency closure gives A three and B two, selecting B. Both are natural readings of the stated instruction. Freezing option text does not resolve this because the differing eliminations occur before the Unicode fallback. Classifying the result as arbitrary also does not supply the missing counting rule.

**Minimal correction:** Define the fallback's counting unit and baseline, for example: “Count newly introduced direct runtime package dependencies against the pinned baseline.” A different explicit metric would also fix the defect. Transitive costs can remain evidence in the earlier substantive comparisons. Add the above two-graph case to the fallback fixture.

This is a small specification gap, but it defeats the expressly promised reproducible default on a routine input.

## Attacks that did not break the procedure

- **Authority laundering:** A reference implementation accepts an input forbidden by normative text. Reference adoption is expressly unavailable; repeated examples and panel agreement cannot cure the contradiction. Conflicting normative sources instead require an owner recommendation.
- **Scope laundering:** Recast a class-wide arithmetic change as a local representation choice. Step 0 requires splitting actual effects, preserves existing class constraints, and step 4 holds the shared change. Unknown ruling coverage and unread reader contracts also prevent the convenient assumption of permission.
- **Confidence inflation:** Copy a prior inferred choice into the next draft, cite it as established wording, and request high confidence. Proposed precedent and material decision dependencies keep the conclusion inferred. Accepting one local result does not ratify its general test.
- **Manufactured demand:** File the loop's own issue for an optional adapter, or label convenience essential. Neither creates independent demand. Conversely, the repeated-recovery fixture permits a genuinely demanded convenience without falsely requiring impossibility through existing operations.
- **Fallback resurrection:** Give an eliminated surface superset fewer dependencies. The surviving-set rule and three-option example prevent its return. Simultaneous elimination also removes iteration-order dependence within a stage.
- **Partial acceptance:** Accept an example while its changed return type remains pending. The landing dependency check and worked example exclude the incoherent pair; approval of the dependent does not approve its prerequisite.
- **Reopening suppression:** Supply a concrete mistake in applying the existing comparison on unchanged evidence. Step 5 expressly permits reopening. An already-covered input or a renamed preference does not obtain the same treatment.

## Coverage suggestions, not additional defects

Add a worked reopening case that distinguishes “still-valid” from merely admissible: the original selection used the wrong stage order, and corrected reasoning eliminates it without new factual evidence. The current text permits the correction; an example would make its interaction with the stability default easier to execute consistently.

I did not count disagreement with the proposed principle order, or strategic wording before an explicitly arbitrary textual tie-break, as defects. Those are policy preferences and process risks, respectively, unless a concrete violation of the stated procedure is demonstrated.
