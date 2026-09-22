# Independent review: specification and consistency

Reviewed only the supplied `procedure.md` and `examples.md` snapshots. Line references below refer to those snapshots.

| Dimension | Grade |
| --- | --- |
| Decidability | B+ |
| Internal consistency | B+ |
| Generality | A- |
| Escalation boundary | B+ |
| Clarity and tone | A- |
| Overall | B+ |

The procedure handles authority, scope and circular justification well. It distinguishes incorporated requirements from reference behavior, local member choices from shared rules, and confidence from publication permission. The refusal to let a new numeric model prove its own predictability is especially useful. The remaining defects concern reproducible execution and what an example's recommendation actually demonstrates.

## 1. A pending review has no clear effect on an already applied local choice

**Location:** procedure lines 217–227, 258, 280–288.

**Breaking case:** A loop is authorized to revise an unpublished local API. An inferred naming choice crosses none of step 4's flagged boundaries. The loop chooses it, updates examples, and records it as applied. At the iteration boundary, the maintainer supplies no individual response. Step 5 says only unflagged high rows may “keep their local answer” without a response; other rows remain pending, while independent local work can continue. One implementation of this procedure leaves the provisional API and its examples in the next panel. Another must revert or hold them because the answer cannot be kept. “Pending” is also absent from the enumerated statuses.

**Minimal fix:** Distinguish edit status from review disposition. State explicitly whether an authorized, unflagged inferred choice may remain provisionally applied and supply dependent draft edits while its review disposition is pending. Reserve a separate term for acceptance or ratification. If pending instead means dependent edits must stop, state that transition and what happens to edits already made.

This is a state-transition ambiguity, not a request to relax approval requirements.

## 2. The residual tie-break does not yet give the promised reproducible default

**Location:** procedure lines 217–220.

**Breaking case:** A new API has no incumbent and all substantive reasons are neutral. Option A exposes one method with four required parameters; option B exposes two methods with one required parameter each. Neither adds dependencies. Counting declarations makes A's public surface smaller; counting required caller inputs makes B's smaller. The procedure provides no comparison measure or instruction for incomparable surfaces, so two readers can stop before the alphabetical fallback and select opposite defaults.

**Minimal fix:** Define the surface measure for this tie-break, or say to use “smaller public surface” only when one option is strictly contained in the other; treat incomparable surfaces as tied and continue to dependencies and the final fallback. Pin the option texts before applying the alphabetical rule.

This concerns the claimed determinacy of the fallback, not a preference for either API or for a different substantive ordering.

## 3. Some replay recommendations precede the comparison needed to derive them

**Location:** examples lines 26–27 and 52–73; procedure lines 146–150 and 202–220.

**Breaking case:** For concurrency, the table recommends one goroutine per Evaluation. The explanation identifies a valid incumbent with concurrent calls and observable Close behavior, then says the replacement still must define when sharing ends and how subsequent use behaves. It instructs the reader to compare complete ownership contracts but supplies neither the complete replacement nor a distinguishing reason. A reader following steps 2–3 cannot yet establish that alternative's viability, much less derive its selection. For Select, the text likewise asks for calling sequences and comparison against renaming/documenting the variadic method, but does not show which reason wins that comparison.

**Minimal fix:** Either change these dispositions to “candidate to compare; recommendation pending the stated evidence,” or add the compact comparison that actually selects them: complete relevant behavior, strongest countercase, highest distinguishing reason, and confidence dependency. One complete worked decision would help establish how the shorter replays should be interpreted.

This does not establish that single-goroutine ownership or separate SelectPath is bad policy. It establishes that these entries currently illustrate proposed directions rather than execution of the advertised decision procedure. Their explicit replay/hold qualifications prevent this from becoming an authorization defect.

## 4. The TypeScript example gives an overbroad reason for inferred confidence

**Location:** examples lines 183–185; procedure lines 267–278.

**Breaking case:** The example says confidence is inferred because the result is a design application rather than an authority answer. Step 5 also allows high confidence when an established principle decides directly, and medium when established principles require an accepted order. In a later loop where the applicable tests have been accepted, copying the example's confidence rationale would still force every such design decision to inferred, contradicting those branches. For this draft the inferred label itself is appropriate.

**Minimal fix:** Replace the explanation with “inferred because this recommendation materially depends on the draft's proposed operational interpretation of rule 7.” This names the actual dependency rather than presenting a design-versus-authority distinction absent from the confidence algorithm.

## Other audited boundaries

- Reference adoption is explicitly local and inferred, excludes value-model/API/resource changes, and cannot override normative text. I found no case in these examples that improperly uses it as authority.
- The numeric examples preserve the distinction between an existing contract reading and a proposed replacement. Shared scope and mutually dependent arithmetic choices remain held or packaged; they do not certify themselves.
- Normative conflict has an explicit hold example even though it is not one of step 1's three named outcomes. That omission is a small organizational rough edge, not a missing substantive instruction.
- I do not count the chosen lexicographic policy, conservative treatment of precedent, or requirement for independent optional demand as consistency defects merely because another project might choose differently.
