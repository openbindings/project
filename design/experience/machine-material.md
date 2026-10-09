# Machine material and syntax

Maturity: **stable**
Machine-material revision: **1**

Machine material is JSON, YAML, source, schemas, identifiers, commands, and
other computer-authored content rendered for a person. The official system is
a restricted palette plus a small functional role layer, not a universal
grammar for every language.

The canonical source is
[`tokens/machine-material.json`](../tokens/machine-material.json). Generated
CSS and Shiki adapters live in [`tokens/generated/`](../tokens/generated/).

## Three layers

1. The **palette** is the closed set of colors available to official
   machine-text renderers: `plain`, `primary`, `secondary`, `tertiary`,
   `quaternary`, `muted`, and `invalid`, plus the material `surface`.
2. **Functional roles** describe broad intent: `name`, `string`, `number`,
   `keyword`, `punctuation`, `comment`, and `invalid`. They give the default
   official mapping into the palette.
3. **Renderer adapters** map Shiki scopes, Lezer tags, hand-authored examples,
   or another engine into the functional roles. That mapping belongs beside
   the renderer and may collapse roles when the language or presentation does
   not need every distinction.

Renderers may not introduce an unreviewed syntax color, use `invalid` for
visual variety, or make essential meaning depend on hue. An unusual mapping is
an explicit adapter decision, not an invisible reinterpretation of the
palette.

## Mapping guidance

| Functional role | Common interpretations | May collapse to |
| --- | --- | --- |
| `plain` | Unclassified tokens and the no-highlighting fallback | — |
| `name` | JSON keys, YAML keys, properties, declared entities, functions | `plain` in deliberately minimal examples |
| `string` | Quoted strings and string-like YAML scalars | `plain` or another literal distinction |
| `number` | Numeric literals | `string` when the renderer only distinguishes names from values |
| `keyword` | Booleans, nulls, language keywords, tags, built-ins | `number` or another literal distinction |
| `punctuation` | Brackets, separators, operators | `plain` when muting would obscure structure |
| `comment` | Comments and documentation annotations | `punctuation` or `plain` |
| `invalid` | Actually invalid or unresolved source | Never; it also requires a non-color cue |

The official JSON/YAML mapping uses `name` for keys, preserves separate
string, number, and keyword distinctions, and mutes punctuation and comments.
Other languages map their native scopes according to the same emphasis
hierarchy rather than reproducing JSON categories mechanically.

## Surfaces and behavior

- A code surface uses the machine `surface`, ordinary theme borders, and the
  machine `plain` fallback. Typography, radius, spacing, selection, focus, and
  scrolling remain owned by their respective UI or foundation decisions.
- Read-only and editable presentations use the same role meanings. Editing
  engines may add selection, caret, matching, diagnostic, and reveal behavior
  without adding syntax colors.
- Public Elements keeps its neutral defaults and public
  `--ob-editor-token-*` contract. The generated official adapter supplies the
  OpenBindings palette to that contract.
- Shiki consumes the generated light and dark themes. TextMate grammar scopes
  remain owned by their language packages; Design owns only their official
  visual mapping.
- Hand-authored examples may use a subset of roles. A two-color example is
  conformant when both colors come from the palette and its mapping is clear.

## Accessibility and fallbacks

- Every authored foreground role meets at least `4.5:1` against the machine
  surface; `plain` meets `7:1`.
- Punctuation and comments remain readable text. “Muted” means subordinate,
  not optional.
- Invalid source uses a textual diagnostic, gutter marker, underline, or other
  non-color signal in addition to the invalid color.
- In forced-colors mode, authored chromatic distinctions collapse to system
  colors. The content, grammar, labels, and invalid cues remain intelligible.
- When highlighting is unavailable, render exact plain text with the `plain`
  role. Never withhold or alter content because a tokenizer failed.

## Serialization boundary

`ob --format json`, `ob --format yaml`, redirected output, output files, and
other machine-readable streams are byte contracts. They receive no ANSI
styling or presentation markup. This system governs a UI rendering of those
bytes, never the bytes themselves.

## Prior-art model

This architecture follows the durable pattern used by language-agnostic
highlighters and design-token systems: limited common scopes, many-to-one
theme mappings, and adapters between engine vocabularies. It intentionally
does not copy another project's color values or full language taxonomy.
