# Official OpenBindings color theme

Maturity: **stable**
Theme revision: **1**

OpenBindings products use a restrained, technical, predominantly monochrome
theme. Hierarchy comes from a small neutral surface ladder; the strongest
neutral carries primary action emphasis; chromatic color is reserved for
semantic status and machine material.

The machine-readable sources are [`tokens/color.json`](../tokens/color.json)
and
[`tokens/themes/openbindings.json`](../tokens/themes/openbindings.json).
[`tokens/generated/openbindings-theme.css`](../tokens/generated/openbindings-theme.css)
is generated from those sources and includes the official Elements mapping.

## What is shared

- Browser surfaces share the semantic roles and official light/dark values.
- Official applications map those roles into their local implementation
  vocabulary rather than creating another palette.
- Reusable Elements keep their neutral defaults. An official application sets
  the generated `--ob-*` adapter values on an ancestor.
- Terminal output shares semantic meaning but uses terminal-native ANSI roles.
- Theme controls remain product decisions. A control, when offered, uses the
  three states `system`, `light`, and `dark`.

Exact sameness is not required where the medium changes. The recognition test
is the same hierarchy, action emphasis, semantic meaning, and accessibility
behavior—not identical CSS in every repository.

## Role rules

| Role group | Use | Do not use |
| --- | --- | --- |
| Background and surface | Page canvas and the default content plane | Alternating panels merely for decoration |
| Strong surface | Selected, raised, or grouped regions needing a neutral step | The only signal for selection, error, or availability |
| Text, muted, faint | Primary, secondary, and lowest readable emphasis | Opacity that drops text below the role's contrast |
| Border | Decorative or redundant separation | Identifying a control or state by itself |
| Border strong | Meaningful control and state boundaries | General page rules where the visual weight would dominate |
| Accent and inverse | Primary filled actions and decisive selection | Decorative brand color, body links, or routine chrome |
| Success, warning, danger | Outcomes with an icon, label, or message | Color-only status dots or unlabeled state changes |

`textFaint` is deliberately darker in the light theme than the current
`#999999` practice. “Faint” means low emphasis, not optional readability.
`borderStrong` is deliberately much stronger than existing decorative borders
because it is reserved for boundaries whose presence communicates meaning.

## Elements boundary

Elements owns the public `--ob-*` contract and its neutral blue-accented
fallback. Design does not change that default. The generated official adapter
maps theme roles into the existing contract:

- component background, surfaces, text, and status inherit official values;
- the single public Elements border token maps to `borderStrong`, because an
  embedded control boundary may carry meaning; and
- syntax, focus geometry, radius, type, spacing, and shadows remain outside
  this adapter until their owning slices decide them.

This mapping can be vendored with its Design revision recorded. Stable means
the official values passed consumer proof; it does not publish a package or
promise a public token compatibility policy for revision 1.

## Theme selection

- All official browser surfaces support both light and dark values.
- Following the operating system is the baseline and is sufficient for short,
  security-sensitive pages such as authorization.
- Dense, persistent applications may expose a selector. It must include
  system, light, and dark; the selected state must have an accessible name;
  and system changes must continue to apply while system is selected.
- Components inherit the host theme. They do not persist a competing choice.
- A product may persist a user's explicit preference locally, but theme
  preference must not become required account data.

## Forced colors and higher contrast

The generated CSS maps roles to system colors under
`forced-colors: active`. Consumers must:

- allow the user agent to override authored colors;
- never apply `forced-color-adjust: none` to ordinary controls, status, or
  content;
- retain text, icons, shape, or native control affordances for every state;
- use `Highlight`/`HighlightText` for selection and focus input; and
- treat subtle borders as absent when system colors collapse them.

The stable theme raises faint text and meaningful border contrast in its
ordinary schemes. A future `prefers-contrast` treatment may strengthen more
roles, but must not wait on a separate palette to make essential UI legible.

## Terminal adaptation

Human-facing CLI output maps `key`, `muted`, `success`, `warning`, and `danger`
to the terminal's ANSI palette. Headers use weight without requiring a color.
Color is always redundant with words, signs, or structure.

When `NO_COLOR` is present, emit no styling escape sequences. Do not erase
labels or other meaning when styles disappear. JSON, YAML, and other
machine-readable output are never themed by this system; their byte-level
contracts belong to the CLI and the `machine-material` slice.

## Verification

The generator rejects a theme revision when:

- primary text is below `7:1` on the background;
- muted or faint text, inverse action text, or semantic status is below
  `4.5:1` in its required contexts; or
- `borderStrong` is below `3:1` on the background.

Consumer adoption requires light, dark, forced-colors, and `NO_COLOR` evidence
appropriate to that surface. The adoption record is in
[`docs/evidence/2026-08-07-color-theme-adoption.md`](../docs/evidence/2026-08-07-color-theme-adoption.md).
