# OpenBindings identity

Status: stable
Identity revision: 1

## The glyph

The OpenBindings glyph is five overlapping rounded binding outlines. Its
recognition comes from the nested geometry and the interference pattern
created by the outlines, not from a fixed brand color.

The canonical vector is
[`assets/openbindings-glyph.svg`](../assets/openbindings-glyph.svg). It uses
`currentColor` and contains no intrinsic accessible name, theme, or product
context. Generated variants and their intended consumers are recorded in
[`assets/manifest.json`](../assets/manifest.json).

The repository's [identity specimen](../specimens/identity.html) renders the
canonical source at the supported interface and favicon sizes on light and
dark surfaces.

## Use

- Render the glyph in one color. Use the surrounding surface's primary text
  color unless a semantic context requires another accessible color.
- Preserve its aspect ratio, view box, five paths, and 30-unit stroke width.
- Do not fill, rotate, crop, redraw, separate, or independently recolor the
  nested outlines.
- Use at least 24 CSS pixels of height in ordinary interface chrome. The
  generated favicon is the named exception and may render down to 16 pixels.
- Give a standalone brand placement clear space of at least one quarter of the
  glyph's rendered width. Compact application chrome and favicons may use their
  container's established padding instead.

## Compositional freedom

OpenBindings has no canonical wordmark and no fixed glyph-and-name lockup. The
glyph may sit beside the correctly spelled name “OpenBindings” in any legible
typography, weight, spacing, case treatment, or arrangement appropriate to the
surface. Conventional baseline alignment and balanced optical spacing are
useful craft choices, not identity requirements.

Typography accompanying the glyph remains live surface expression. Do not
trace a particular treatment into an asset, designate one specimen as the
required lockup, or reject a composition merely because it uses a different
typeface. The canonical glyph—not the adjacent typography—is the stable
identity asset.

## Accessibility

The SVG deliberately carries no `role`, `title`, or `aria-label` because the
correct semantics depend on its use:

- When visible “OpenBindings” text appears beside it, treat the glyph as
  decorative with `aria-hidden="true"` or an empty image alternative.
- When it is the only brand identifier in an interactive control, give the
  control—not the path geometry—the accessible name “OpenBindings.”
- A favicon receives its identity from the document title and does not need an
  embedded accessible name.

## Variants and distribution

Run `npm run generate` after changing the canonical source. The generated
inline and favicon variants are committed so non-JavaScript and offline
consumers can copy exact bytes. Their provenance header identifies the source
and identity revision.

Until a released design package proves useful across languages, consumers pin
the revision in their adoption record and commit the appropriate generated
variant. This keeps Web, an offline Go binary, and static workbench assets
equally reliable without introducing a runtime network or package dependency.
