# Decision 0003: Canonical tagline and explanatory descriptor

Date: 2026-08-08
Status: accepted

## Context

Official OpenBindings surfaces currently use several short positioning
phrases. Web, Spec, the CLI, and both reference SDKs use variants of “one
interface, limitless bindings,” with commas or middle dots and inconsistent
capitalization. The GitHub organization uses “portable interfaces · flexible
access.” Product-specific headlines also begin with “One interface” but serve
a different teaching or demonstration purpose.

The glyph deliberately has no wordmark or fixed lockup. That visual freedom
does not require the project's official tagline to drift between surfaces.

## Decision

Adopt “One interface. Any binding.” as the canonical OpenBindings tagline and
“Describe what a service does separately from how you access it.” as the
preferred explanatory descriptor.

The tagline is optional, but exact when a surface invokes it as official
verbal identity. The decision fixes no typography, placement, line breaking,
or relationship among the glyph, name, and tagline. Contextual headlines and
longer explanations remain surface-owned and may be more specific.

“Any binding” expresses architectural openness. It is not a representation
that every product supports every binding. Normative terminology remains
owned by `openbindings/spec`.

## Consequences

- Current official tagline variants migrate to one recognizable phrase.
- A small machine-readable file prevents transcription and punctuation drift.
- Surfaces are free to omit the tagline and to compose it using appropriate
  local typography.
- The descriptor can fit naturally into documentation, metadata, or onboarding
  without creating alternate official taglines.
- Scenario copy, historical material, and normative prose are not rewritten
  merely because they contain similar words.
