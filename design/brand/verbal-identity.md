# OpenBindings verbal identity

Status: candidate
Verbal identity revision: 1

The exact canonical strings are published in
[`verbal-identity.json`](verbal-identity.json). This guide explains when they
are—and are not—the right content for a surface.

## Canonical tagline

> One interface. Any binding.

Use that wording, capitalization, and punctuation when presenting the official
OpenBindings tagline. The two short sentences work in browser, terminal,
plain-text, metadata, and screen-reader contexts without a decorative
separator.

The tagline is optional. A surface does not need to display it merely because
it presents OpenBindings, and a useful product headline should not be replaced
with the tagline when the headline communicates more specific information.

“Any binding” describes the architecture's open extensibility. It does not
promise that every implementation has installed, supports, or can reach every
binding.

## Explanatory descriptor

The preferred plain-language explanation is:

> Describe what a service does separately from how you access it.

Use the exact sentence when a short standalone descriptor is useful. A
repository introduction, teaching page, or search description may integrate
or expand the idea to fit its grammar and audience. Those contextual
explanations are product copy, not alternative taglines.

The descriptor explains the project's positioning; it does not redefine the
normative meanings of “interface” or “binding.” Those meanings remain owned by
the OpenBindings specification.

## Composition remains open

This verbal decision does not create a wordmark or a fixed glyph-and-name
lockup. It does not prescribe a typeface, weight, size, line break, alignment,
placement, or proximity to the OpenBindings glyph or name.

A surface may set the tagline on one or two lines and use typography suited to
its medium. When the text is presented as the official tagline, keep its words,
sentence case, and periods intact. Do not substitute a middle dot or rewrite
the claim to suit a particular layout.

## Distinguish the jobs

| Content | Job | Rule |
| --- | --- | --- |
| “One interface. Any binding.” | Recognizable project tagline | Exact when used; optional everywhere |
| “Describe what a service does separately from how you access it.” | Short explanation | Preferred baseline; may be integrated or expanded contextually |
| “One interface. Six protocols. Same operations.” | Scenario or campaign headline | Surface-owned; do not normalize into the tagline |
| Normative definitions of interface and binding | Specification language | Owned by `openbindings/spec` |

Legacy phrases such as “one interface · limitless bindings” and “portable
interfaces · flexible access” are not alternate official taglines. Do not
rewrite historical records, quotations, release snapshots, or examples that
are explicitly documenting those earlier forms.

## Examples

Correct:

- OpenBindings
  
  One interface. Any binding.
- A social card that places the glyph, the name, and the exact tagline in a
  layout and typography appropriate to the image.
- A CLI command with no tagline because the available space should explain the
  next action instead.
- A tutorial headline that names the particular task or protocols it teaches.

Incorrect:

- Treating the tagline as a required glyph-and-name lockup.
- Replacing the periods with “·”, “/”, or another visual separator.
- Using “Any binding” as a compatibility or installed-capability guarantee.
- Rejecting a legible composition because it does not use a preferred
  typeface, arrangement, or line break.
