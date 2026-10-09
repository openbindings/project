# Design slice: machine material and syntax

Status: verified
Tracker key: `machine-material`
Owner: OpenBindings maintainers

## Frame

- **User-perceivable concern:** JSON, YAML, source excerpts, schemas, command
  examples, and other machine-authored material should remain readable and
  recognizable across official surfaces without making serialized output
  decorative or unsafe for automation.
- **In-scope surfaces:** Web documentation and examples, public Elements code
  views and editors, the `ob start` Workbench document and output panes, and
  human-facing CLI excerpts that contain identifiers or machine material.
- **Contract boundary:** `ob --format json|yaml`, output files, and other
  machine-readable streams preserve their exact serialization and never
  receive ANSI styling. This slice may govern how a UI renders those bytes,
  not the bytes themselves.
- **Out of scope:** OBI semantics, serialization rules, editor behavior,
  command behavior, typography outside machine material, and general status
  colors.
- **Completion evidence:** a semantic syntax-role model, official browser
  values for light/dark/forced-colors, an explicit neutral Elements mapping,
  representative JSON and YAML specimens, and consumer checks proving that
  raw CLI output remains unstyled.

## Current evidence

| Surface | Source paths | Current expression |
| --- | --- | --- |
| Web | `src/lib/markdown/render-spec-markdown.ts`, `src/lib/components/SpecDocument.svelte`, `src/routes/+page.svelte` | GitHub light/dark Shiki themes plus a bespoke monochrome homepage example |
| Public Elements | `packages/ui-core/src/styles.ts`, `packages/json-editor/src/index.ts`, `packages/json-editor/src/highlight.ts` | Public `--ob-editor-token-*` roles shared by editable and static code views |
| Workbench | `apps/ob-start-workbench/src/styles.css` | App-owned JSON/YAML palette mapped into the Elements syntax contract |
| Terminal CLI | `internal/app/output.go`, `internal/app/styles.go` | Serialized JSON/YAML bypass human-output styles; semantic text renderers use ANSI roles |
| OAuth | `internal/cmd/oauth_html.go` | Monospace identifiers without syntax coloring |

The initial comparison is recorded in
[the common-ground evidence](../evidence/2026-08-07-common-ground.md), with the
machine-output boundary reinforced by the completed
[color-theme slice](color-theme.md).

Exact values, Shiki scopes, Lezer tags, and difference classifications are in
[the machine-material inventory](../evidence/2026-08-07-machine-material-inventory.md).

## Accepted model

Revision 1 follows the public prior-art pattern of a closed palette, a compact
functional role layer, and native renderer adapters:

1. Official renderers draw from `plain`, four chromatic distinction slots,
   `muted`, and `invalid` on one machine `surface`.
2. The default roles are `name`, `string`, `number`, `keyword`, `punctuation`,
   `comment`, and `invalid`. They are broad intent, not a universal grammar.
3. A renderer maps its native scopes into those roles and may collapse
   distinctions. It may not introduce an unreviewed color or redefine actual
   invalidity merely for variety.
4. Editable and read-only code share role meaning even when CodeMirror,
   Lezer, Shiki, or hand-authored markup supplies the classification.
5. Elements retains its neutral public defaults. The official adapter maps
   the stable palette into the existing `--ob-editor-token-*` API.
6. Plain and forced-colors fallbacks remain readable without chromatic
   distinctions. Invalid material also carries a diagnostic, marker, or
   decoration.

The complete rules are in
[the machine-material guidance](../../experience/machine-material.md). The
shared JSON and YAML inputs are under [`specimens/fixtures/`](../../specimens/fixtures/).

## Stable outputs

| Output | Design path | Maturity |
| --- | --- | --- |
| Palette, roles, and adapter data | `tokens/machine-material.json` | stable |
| Official CSS and Elements adapter | `tokens/generated/openbindings-machine-material.css` | stable |
| Shiki light and dark themes | `tokens/generated/openbindings-machine-{light,dark}.json` | stable |
| Cross-renderer guidance | `experience/machine-material.md` | stable |
| Shared JSON/YAML specimen | `specimens/machine-material.html` | stable |

## Consumer adoption

| Consumer | Mapping | Pull request or commit | State |
| --- | --- | --- | --- |
| Web | Canonical Shiki themes plus homepage subset adapter | [web#16](https://github.com/openbindings/web/pull/16), `99394f1c65d9f404be6a48c58f1ff5b6e95c8422` | adopted |
| Elements | Neutral defaults plus documented renderer adapter and invalid cue | [elements#5](https://github.com/openbindings/elements/pull/5), `3bc88f43d1fefa74381cfdb817d013bf8e6b2468` | adopted |
| Workbench | Revision 1 roles mapped through the Elements public API | [elements#5](https://github.com/openbindings/elements/pull/5), `3bc88f43d1fefa74381cfdb817d013bf8e6b2468` | adopted |
| OAuth | No syntax or serialized machine-material renderer | — | out_of_scope |
| CLI | Preserve exact JSON/YAML bytes with no ANSI output | [ob#35](https://github.com/openbindings/ob/pull/35), `9dbcffc92585f55f9472109afbb321b8987f46602` | adopted |

## Exceptions and follow-ups

- Typography, code-surface spacing, focus geometry, and general selection
  behavior remain with foundations or their owning component.
- Language-specific adapters may extend scope coverage without expanding the
  palette. A new palette slot requires cross-surface evidence.
- The full verification record is in
  [the machine-material adoption evidence](../evidence/2026-08-07-machine-material-adoption.md).
- Final verification date: 2026-08-07.
