# Design slice: identity and canonical assets

Status: verified
Tracker key: `identity`

## Frame

- **User-perceivable concern:** OpenBindings should present one recognizable
  glyph whose geometry and rendering are reliable across official surfaces.
- **In scope:** glyph geometry, canonical vector source, monochrome rendering,
  favicon and embedded variants, sizing and accessibility guidance, and a
  generation or synchronization mechanism.
- **Out of scope:** redesigning the glyph, creating a wordmark, selecting a
  broad color palette, social-card composition, and product-specific header
  layout.
- **Constraints:** browser favicons must adapt to light and dark contexts;
  inline and masked uses must accept host color; `ob` must be able to embed an
  offline artifact without a runtime package dependency.
- **Completion evidence:** one canonical source in Design, documented variants
  generated from it, consumer migrations in Web, workbench, and OAuth, and a
  check that prevents geometry drift.

## Exact evidence

| Surface | Repository commit | Source paths | Locally clean? |
| --- | --- | --- | --- |
| Web | `openbindings/web@108cecba3652440bbee70c4c88de05ebead0bc54` | `static/favicon.svg` | Yes |
| Workbench | `openbindings/elements@5a738c72ee28948a6390565d178abd90a75d6ee6` | `apps/ob-start-workbench/public/assets/favicon.svg` | Yes |
| OAuth | `openbindings/ob@adfdc1ce48be7b2576c947b6033cf278901c56ea` | `internal/cmd/oauth_assets/openbindings-glyph.svg` | Yes |

The complete initial audit is in
[the common-ground evidence](../evidence/2026-08-07-common-ground.md).
The supported-size render is recorded in
[the identity rendering evidence](../evidence/2026-08-07-identity-rendering.md).

## Semantic comparison

| Intent | Current expressions | Classification hypothesis | Reason |
| --- | --- | --- | --- |
| Recognizable geometry | The same five nested paths and view box appear in all three sources | Shared foundation | Geometry is identical despite wrapper differences |
| Inherit surrounding color | OAuth paths use `currentColor`; workbench masks the favicon with text color | Shared foundation | Both express the glyph as a monochrome shape controlled by context |
| Standalone favicon theme | Web and workbench use identical embedded light/dark CSS | Modality adaptation | A favicon has no host element from which to inherit color |
| Copied vector files | Three repositories maintain two wrapper variants around the same geometry | Accidental drift risk | There is no source provenance or synchronization check |
| Accessible meaning | Header uses are decorative beside visible brand text; favicon has document-level identity | Modality adaptation | Alternative text depends on context, not the SVG alone |

These classifications are accepted in
[Decision 0002](../decisions/0002-canonical-glyph.md).

## Resolved questions

1. The canonical source is the existing `currentColor` nested-outline SVG; a
   theme-aware favicon and inline artifact are generated from it.
2. Generated variants are committed to Design and copied exactly into
   consumers with provenance. A package is deferred until multiple asset
   families or other cross-language needs justify it.
3. Ordinary interface use has a 24 CSS-pixel minimum height. The generated
   favicon is the explicit 16-pixel exception.
4. Standalone placements use clear space equal to one quarter of the rendered
   width; compact chrome and favicons use their container padding.
5. The SVG carries no intrinsic accessible name; each consumer supplies the
   correct contextual semantics.

## Canonical outputs

| Output | Intended Design path | Maturity |
| --- | --- | --- |
| Portable monochrome master | `assets/openbindings-glyph.svg` | stable |
| Inline generated variant | `assets/generated/openbindings-glyph.svg` | stable |
| Theme-aware favicon | `assets/generated/favicon.svg` | stable |
| Geometry and variant check | `scripts/generate-assets.mjs` | stable |
| Identity usage guidance | `brand/identity.md` | stable |

## Consumer adoption

| Consumer | Expected mapping | Evidence | State |
| --- | --- | --- | --- |
| Web | Verify the exact generated favicon in the normal test command | [web#13](https://github.com/openbindings/web/pull/13), `caf933752e1353a4760476b44c64bd959961aa90` | adopted |
| Elements | No official identity in neutral public components | Identity is outside the component contract | out_of_scope |
| Workbench | Verify the exact generated favicon and keep its semantic-color mask | [elements#2](https://github.com/openbindings/elements/pull/2), `9bf6cf24e5abb5064db89b7524115a4b058f2ae5` | adopted |
| OAuth | Embed and verify the portable monochrome variant during the Go build | [ob#34](https://github.com/openbindings/ob/pull/34), `d2dab66b4752f06c0618b87675c4b55a5bad4f5c` | adopted |
| CLI | No glyph in ordinary terminal output | Graphical identity is outside this medium | out_of_scope |

## Verification

Web, workbench, and OAuth now carry exact revision 1 artifacts and durable
checksum checks. Local consumer suites passed, and the light/dark specimen was
reviewed from 16 through 96 CSS pixels. The complete adoption record, including
independently diagnosed remote CI exceptions, is in
[the identity adoption evidence](../evidence/2026-08-07-identity-adoption.md).

Final verification date: 2026-08-07.
