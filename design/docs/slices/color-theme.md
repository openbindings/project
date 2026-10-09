# Design slice: color roles and official theme

Status: verified
Tracker key: `color-theme`
Owner: OpenBindings maintainers

## Frame

- **User-perceivable concern:** official OpenBindings surfaces should share a
  recognizable light and dark color system while reusable Elements remain
  neutrally themeable and the terminal remains native to its capabilities.
- **In-scope surfaces:** openbindings.com, public Elements, the `ob start`
  workbench, authorization pages, and human-facing terminal output.
- **Out of scope:** typography, spacing, radius, focus geometry, syntax token
  colors, machine-readable CLI output, and changing public component behavior.
- **Upstream authorities and public contracts:** Elements owns the public
  `--ob-*` theme API; `ob` owns terminal behavior and `NO_COLOR`; Web and `ob`
  own their product implementations. This slice may map into those contracts
  but may not redefine them silently.
- **Completion evidence:** semantic color roles and an official light/dark
  theme in Design, contrast and forced-color evidence, an explicit neutral
  Elements mapping, native terminal adaptations, and verified adoption by each
  applicable consumer.

## Exact evidence

| Surface | Repository commit | Source paths | Locally clean? | Rendered evidence |
| --- | --- | --- | --- | --- |
| Web | `openbindings/web@caf933752e1353a4760476b44c64bd959961aa90` | `src/app.css` | Yes at initial audit | Common-ground inventory |
| Public Elements | `openbindings/elements@9bf6cf24e5abb5064db89b7524115a4b058f2ae5` | `packages/ui-core/src/styles.ts` | Yes at initial audit | Common-ground inventory |
| Workbench | `openbindings/elements@9bf6cf24e5abb5064db89b7524115a4b058f2ae5` | `apps/ob-start-workbench/src/styles.css` | Yes at initial audit | Common-ground inventory |
| OAuth | `openbindings/ob@d2dab66b4752f06c0618b87675c4b55a5bad4f5c` | `internal/cmd/oauth_html.go` | Yes at initial audit | Common-ground inventory |
| Terminal CLI | `openbindings/ob@d2dab66b4752f06c0618b87675c4b55a5bad4f5c` | `internal/app/styles.go` | Yes at initial audit | Common-ground inventory |

The source comparison begins with
[the common-ground evidence](../evidence/2026-08-07-common-ground.md). Exact
values, theme behavior, and contrast findings are in
[the color-theme inventory](../evidence/2026-08-07-color-theme-inventory.md).
The generated cross-surface rendering is
[`specimens/color-theme.html`](../../specimens/color-theme.html).

## Semantic comparison

| Intent or role | Current expressions | Classification hypothesis | Reason |
| --- | --- | --- | --- |
| Page and component hierarchy | Background, surface, raised surface, and border roles recur across browser surfaces | Shared foundation | The hierarchy is common even when literals differ |
| Official action emphasis | Web, workbench, and OAuth favor the strongest neutral | Official expression | This produces the restrained monochrome character of official products |
| Reusable component accent | Elements defaults to blue | Neutral default | Third-party consumers need an independent, legible default |
| Light and dark presentation | Every browser surface supports both; only workbench exposes a selector | Shared capability with modality adaptation | Theme values can align without forcing one control model |
| Success, warning, and danger | Browser palettes and terminal styles use different literals | Modality adaptation | Shared meaning must survive native contrast and terminal capability limits |
| Syntax colors | Similar roles use differing values | Deferred to `machine-material` | Syntax needs its own contrast and semantic review |

These classifications were accepted for revision 1 and confirmed through
consumer adoption.

## Resolved questions

1. Semantic hierarchy, readable emphasis, action contrast, and status meaning
   are shared. Elements' public tokens remain the component contract; the
   official values are an adapter over it.
2. Official browser surfaces use the shared values unless a documented native
   capability requires adaptation. Decorative neutral separation may vary,
   but text and meaningful-boundary contrast may not.
3. Forced-colors must use system colors, retain non-color state cues, and avoid
   `forced-color-adjust: none` on ordinary UI. Faint text and meaningful
   boundaries meet their contrast requirements in ordinary themes.
4. Terminal roles map to ANSI meaning; `NO_COLOR` emits no styling escapes and
   leaves all textual meaning intact. Machine output is untouched.
5. The source ships as checked JSON plus generated CSS in Design. Stable
   revision 1 is an official-theme decision, not a package or public token
   compatibility promise.

## Stable outputs

| Output | Intended Design path | Maturity |
| --- | --- | --- |
| Semantic color role model | `tokens/color.json` | stable |
| Official light and dark values | `tokens/themes/openbindings.json` | stable |
| Generated CSS and Elements adapter | `tokens/generated/openbindings-theme.css` | stable |
| Theme and modality guidance | `brand/theme.md` | stable |
| Cross-surface color specimen | `specimens/color-theme.html` | stable |

## Consumer adoption

| Consumer | Mapping | Pull request or commit | Checks | State |
| --- | --- | --- | --- | --- |
| Web | Map official theme roles into local CSS | [web#15](https://github.com/openbindings/web/pull/15), `246169da4f3993b74a190c057704e20de5d2d7ae` | Local and hosted checks; light, dark, and forced-colors review | adopted |
| Elements | Preserve neutral defaults and document the official adapter seam | [elements#4](https://github.com/openbindings/elements/pull/4), `eef4af8d35b6b57204233469525679b7e7b04a88` | 179 package tests, design check, neutral-boundary check | adopted |
| Workbench | Map application tokens into the Elements contract | [elements#4](https://github.com/openbindings/elements/pull/4), `eef4af8d35b6b57204233469525679b7e7b04a88` | 20 browser tests passed, 7 skipped; light and dark review | adopted |
| OAuth | Map official roles into embedded page CSS | [ob#35](https://github.com/openbindings/ob/pull/35), `9dbcffc92585f55f9472109afbb321b8987f46602` | Go tests; dark and forced-colors review | adopted |
| CLI | Map semantic roles to native terminal styles and no-color fallbacks | [ob#35](https://github.com/openbindings/ob/pull/35), `9dbcffc92585f55f9472109afbb321b8987f46602` | ANSI role, `NO_COLOR`, JSON, and YAML tests | adopted |

The complete verification and remote-CI record is in
[the color-theme adoption evidence](../evidence/2026-08-07-color-theme-adoption.md).

## Exceptions and follow-ups

- Approved exceptions: Elements' neutral fallback palette is preserved by
  design; it is not an adoption exception. Official hosts apply the adapter.
- Follow-up slices: machine-material owns syntax palettes; foundations owns
  focus geometry and typography.
- Final verification date: 2026-08-07.
