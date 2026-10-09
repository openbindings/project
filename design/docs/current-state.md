# Current-state inventory

Date: 2026-08-07. This is a factual starting inventory, not an adopted style
guide.

This snapshot predates the first consumer migrations. Identity, theme,
interface-foundations, and machine-material revision 1 have since been adopted
by every applicable official surface. Use
[`design-loop.json`](../design-loop.json) for current slice and adoption state
and the evidence records for exact consumer commits.

## Official surfaces

| Surface | Current implementation source | Existing system |
| --- | --- | --- |
| openbindings.com | `openbindings/web/src/app.css` and Svelte components | Local monochrome tokens, Inter/JetBrains Mono, OS light/dark theme, bespoke documentation components |
| Public Elements | `openbindings/elements/packages/ui-core/src/styles.ts` | Public `--ob-*` component theme contract, neutral defaults, component parts and accessibility behavior |
| `ob start` workbench | `openbindings/elements/apps/ob-start-workbench/src/styles.css` | Separate application tokens mapped into Elements, explicit light/dark/system preference, dense workbench patterns |
| Authorization pages | `openbindings/ob/internal/cmd/oauth_html.go` | Embedded website-like palette, fonts, and a copied glyph |
| Terminal CLI | `openbindings/ob/internal/app/styles.go` plus command renderers | Semantic Lip Gloss roles alongside unstyled Cobra and command-specific output |
| Social and identity assets | Web, Elements, `ob`, and workspace design files | Repeated glyph and social-card derivatives without one asset master or usage guide |

The active Panjir repository currently contains service and authentication
code, not a shipping frontend. Its archived frontend is a reference, not an
official OpenBindings-branded surface. SDK example applications may be
deliberately re-themed to prove that OpenBindings UI packages are adoptable.

## Existing strengths to preserve

- A distinctive nested-binding glyph and restrained technical expression.
- Project design philosophy centered on independently natural surfaces.
- A domain lexicon with explicit authority.
- Elements theme variables, named parts, design gates, browser accessibility
  checks, and a real-product screenshot gallery.
- Website-level token centralization, reduced-motion handling, and accessible
  contrast intent.
- CLI human and machine lanes that are already conceptually distinct.

## Unresolved divergences

- Official surfaces use different neutral palettes, borders, radii, syntax
  colors, focus treatments, and semantic-state colors.
- Font delivery differs: Web and authorization pages request hosted fonts;
  the embedded offline workbench names Inter without shipping it.
- Elements has a neutral blue default accent while official applications are
  predominantly monochrome. This may be the correct separation between a
  themeable component default and an official skin, but it is not documented.
- Theme behavior differs between OS-only Web and the workbench's persisted
  three-state control.
- The glyph and its rendering variants are copied across repositories.
- CLI styling is applied unevenly across help, summaries, renderers, prompts,
  and errors.
- Voice and content rules are distributed across philosophy, lexicon, audits,
  and implementation history rather than published as one usable system.
- Web does not yet consume suitable pure Elements despite the Elements
  architecture supporting documentation-site adoption.

## First design work

The first design iteration should adjudicate the inventory rather than select
new paint. For every divergence, record whether it is:

- a shared decision to consolidate;
- a modality-specific adaptation to preserve;
- a neutral-component versus official-brand distinction; or
- accidental drift requiring migration.
