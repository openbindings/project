# Design-system development loop

This loop turns the strongest existing OpenBindings product decisions into an
explicit system, then returns those decisions to each product through native
implementations. It is a reverse-and-return loop, not a visual rewrite and not
a release train.

The mutable state lives in [`design-loop.json`](../design-loop.json). Run
`npm test` to validate it. One design **slice** is the unit of work: a bounded
cross-surface concern such as identity, color roles, syntax presentation,
status feedback, or voice.

## Operating principles

1. **Evidence before invention.** Begin with shipped source, rendered behavior,
   screenshots, and copy. A new decision must say why existing practice is not
   enough.
2. **Unify roles before values.** Establish concepts such as `text.muted` or
   `status.danger` before choosing whether every modality can use the same
   literal color or representation.
3. **Family resemblance, not forced sameness.** Web, embedded components,
   dense applications, authorization pages, and terminals have different
   constraints. Consistency means shared intent and recognizable expression.
4. **Separate the official theme from neutral products.** Elements owns a
   generally useful, themeable component contract. Design owns the official
   OpenBindings theme that maps into that contract.
5. **Respect upstream authority.** Design uses vocabulary from Spec and
   Interfaces; it does not redefine it. Elements, Web, and `ob` retain their
   behavioral and implementation authority. For binding semantics, the exact
   binding specification decides which artifact or protocol authorities it
   incorporates; Design does not infer that relationship from an artifact's
   shape.
6. **Accessibility is an invariant.** Contrast, focus visibility, reduced
   motion, keyboard behavior, readable copy, terminal capability, and
   `NO_COLOR` handling are acceptance criteria rather than a later polish pass.
7. **Adoption proves the system.** A decision is not stable merely because it
   reads well here. It becomes stable after representative consumers implement
   and verify it.

## Difference classifications

Every observed difference receives one classification before consolidation:

| Classification | Meaning | Result |
| --- | --- | --- |
| Shared foundation | The same semantic decision should govern official surfaces | Canonical guidance or token in Design |
| Official expression | OpenBindings-specific styling layered over a neutral capability | Official theme or asset in Design |
| Neutral default | A reusable package needs a brand-independent fallback | Preserve in the product; document the mapping seam |
| Modality adaptation | The same intent requires a different native expression | Preserve with a named adaptation rule |
| Accidental drift | No product or modality reason justifies the difference | Migrate consumers to the canonical decision |
| External authority | The decision belongs to Spec, Interfaces, a product API, or another owner | Route it to that owner; reference the outcome |

This classification is the central design review. A majority value is evidence,
not an automatic winner.

## Slice state machine

```text
queued → inventory → proposal → canonical → migration → verified
                    ↘ revise ↗          ↘ exception ↗
```

- `queued`: scoped enough to name, but not being worked.
- `inventory`: exact evidence and consumer constraints are being collected.
- `proposal`: the shared rule, adaptations, and acceptance criteria are under
  review.
- `canonical`: the decision and source artifacts are accepted in Design.
- `migration`: consumer repositories are adopting the decision.
- `verified`: every in-scope consumer has adopted it or records an approved,
  tested exception.

Only one slice is active by default. Another may be researched concurrently
when it does not depend on or pre-empt the active decision.

Consumer adoption uses `not_started`, `observed`, `migrating`, `adopted`, or
`exception`. Use `out_of_scope` when the slice genuinely does not apply to a
surface; this is different from exempting an applicable surface.

## The loop

### 1. Frame the slice

Name one user-perceivable concern and its consumers. State what is out of
scope, which upstream authorities constrain it, and what evidence would prove
completion. Avoid slices as broad as “visual design” or “voice.”

Create a slice record from [the template](templates/design-slice.md) and move
the tracker from `queued` to `inventory`.

### 2. Capture exact evidence

For every affected surface:

- record repository, commit SHA, source paths, and whether those paths differ
  locally from the commit;
- capture rendered examples at representative sizes, themes, and states when
  visual behavior matters;
- capture human-facing copy examples when language matters;
- name accessibility, platform, embedding, and compatibility constraints; and
- map local names and values to semantic roles without normalizing them yet.

Generated build output is not source evidence. Archived or example surfaces
must be labeled as such.

### 3. Compare and classify

Build a cross-surface comparison around intent, not file syntax. Classify each
difference using the table above. Record common ground, unresolved conflicts,
and the smallest viable shared layer.

Stop here when consolidation would silently change normative vocabulary, a
public component API, CLI machine output, security behavior, or another
owner's contract.

### 4. Propose the canonical decision

The proposal defines:

- semantic roles and plain-language rules;
- official values or assets, when values genuinely can be shared;
- required modality adaptations and neutral defaults;
- accessibility and fallback behavior;
- compatibility and migration impact; and
- examples of correct and incorrect use.

Use maturity labels:

- **draft** for incomplete exploration;
- **candidate** for a complete decision awaiting consumer proof; and
- **stable** only after the slice reaches `verified`.

Material public-token changes or ownership decisions receive a decision record
under `docs/decisions/`.

### 5. Publish the source of truth

Merge accepted guidance and canonical inputs into Design before consumer
migrations merge. Depending on the slice, the source of truth may be:

- prose in `brand/` or `experience/`;
- canonical vector or raster inputs in `assets/`;
- semantic data in `tokens/`; or
- generated and versioned adapters in `packages/`.

Do not create parallel hand-maintained copies. Generated artifacts identify
their source and generator. A documentation site may render these sources but
must not become a second authority.

### 6. Return the system to consumers

Open separate consumer changes from the canonical decision. Each change:

- maps the shared role into the product's native API or medium;
- removes superseded local constants or copied assets where practical;
- preserves documented neutral defaults and modality adaptations;
- adds the cheapest durable conformance check; and
- links back to the Design decision and slice.

Consumer repositories release independently. Design adoption does not require
a project cohort or lockstep release.

### 7. Verify the family

Run consumer-local tests first, then compare the surfaces together. Evidence is
proportional to the slice and can include:

- token or generated-file checks;
- asset checksums and SVG structure checks;
- light, dark, forced-color, and reduced-motion rendering;
- focus, keyboard, contrast, zoom, and responsive checks;
- terminal color-capability and `NO_COLOR` snapshots;
- copy fixtures for success, warning, error, empty, loading, destructive, and
  recovery moments; and
- representative cross-surface screenshots.

Update the adoption states and record consumer commits or pull requests. A
consumer may be marked `exception` only with the reason and its verification.

### 8. Close and learn

Mark the slice `verified` when all in-scope consumers are `adopted` or
`exception`, the canonical material is labeled stable, and the evidence is
reproducible. Record follow-up slices instead of expanding the current one
indefinitely.

## Pull-request choreography

1. Design evidence and proposal may evolve together on a Design branch.
2. Consumer proof-of-concept branches may start while the proposal is open,
   but they must identify the decision as candidate.
3. Merge the canonical Design decision first.
4. Merge consumer changes independently after their local checks pass.
5. Close the slice with a final Design change recording adoption evidence and
   any exceptions.

## Definition of done

A slice is complete only when:

- exact evidence and difference classifications are recorded;
- one canonical source exists in the correct Design directory;
- consumer mappings are explicit and do not create competing authorities;
- every in-scope surface is adopted or has an approved exception;
- accessibility and modality checks pass; and
- the tracker contains durable commit, pull-request, or release evidence.

## Stop conditions

Request the owning maintainer's decision before the loop would:

- change normative meaning or canonical domain terminology;
- break a public Elements theme or component API;
- change CLI commands, exit behavior, or machine-readable output;
- weaken accessibility, security, privacy, or credential behavior;
- adopt an asset without clear ownership and licensing;
- publish a new package, deploy a site, tag a release, or declare a breaking
  compatibility policy; or
- force a modality to imitate another when its native conventions conflict.
