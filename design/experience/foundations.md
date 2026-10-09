# OpenBindings interface foundations

Maturity: **stable**
Foundations revision: **1**

OpenBindings surfaces should feel related without becoming replicas. These
foundations separate the few cross-surface requirements from a deliberately
open set of visual references. The requirements protect access and behavior;
the references make familiar choices easy while leaving each surface room to
develop its own expression.

The machine-readable source is
[`tokens/foundations.json`](../tokens/foundations.json). The generated
[`openbindings-foundations.css`](../tokens/generated/openbindings-foundations.css)
contains optional `--ob-foundation-reference-*` custom properties. The word
`reference` is part of each name so copying the file cannot turn a convention
into a conformance test.

## What is required

Official human-facing interfaces must meet these behavioral guardrails:

- Every keyboard-operable interaction has a visible focus indicator that is
  not fully obscured. Its width, offset, shape, and implementation belong to
  the surface.
- Pointer targets meet or are spaced to meet the WCAG 2.2 target-size minimum,
  including its documented exceptions. A dense interface need not make every
  control large when spacing or an exception provides equivalent access.
- Nonessential motion triggered by interaction is removed or reduced when the
  user requests reduced motion. Information never depends on animation.
- Type and layout remain usable with browser zoom and user text-spacing
  overrides.

These are outcome requirements, not a mandate for one CSS declaration. The
reference 2px focus outline, for example, is a useful starting point; a clear
1px outline, a three-pixel component ring, native focus styling, or a
terminal-native selection treatment can satisfy the actual requirement when
it remains perceivable in context.

## What is only a reference

| Concern | Familiar starting point | Latitude intentionally preserved |
| --- | --- | --- |
| Sans typography | Inter with UI and system fallbacks | No font download is required; hierarchies, weights, tracking, and display faces are surface-owned. |
| Machine typography | JetBrains Mono with platform monospace fallbacks | Renderers and terminals may use their native mono face and metrics. |
| Rhythm | 4, 8, 16, 32, and 64px recognition anchors | Intermediate, denser, fluid, and content-derived values are valid; this is not a closed scale. |
| Shape | 2, 4, 8, and 12px familiar corner anchors | Zero radius, intermediate radii, pills, and circles remain valid when they fit the function. |
| Focus | 2px width with 2px offset | Exact geometry is not conformance. Visibility and lack of obstruction are. |
| Motion | 120ms fast and 150ms interface tempos | A surface owns easing, animated properties, and whether motion adds anything. |

Do not calculate visual “compliance” by counting reference values. A surface
can use none of the optional CSS and still conform to the foundations. A
surface that uses every reference but loses keyboard focus or ignores reduced
motion does not conform.

## Expression profiles

Profiles describe useful centers of gravity, not themes or presets.

### Editorial

Reading and teaching surfaces can use expressive display typography, larger
hierarchy changes, generous section rhythm, and mixed card shapes. The Web
site is the current example. Repeating a component application's compact type
scale would make this expression less effective, not more unified.

### Application

Operational surfaces can use compact type, tighter rhythm, stronger grouping,
and square or low-radius regions. The `ob start` Workbench deliberately maps
embedded Elements to zero-radius content planes while retaining shape in its
application chrome. That is a valid density adaptation.

### Embedded

Public Elements are neutral, host-controlled building blocks. Their public
tokens and fallback fonts belong to Elements. An official host may map Design
references into them, but Design must not make the neutral defaults look like
an OpenBindings-branded application.

### Terminal

The terminal owns typeface, font size, line height, and character-cell
geometry. Human-facing CLI structure uses indentation, blank lines, concise
labels, and native emphasis. Browser spacing tokens, radii, and motion have no
terminal adaptation and should not be simulated with text decoration.

## Identity composition

There is no canonical OpenBindings wordmark and no fixed glyph-and-name
lockup. The glyph can sit beside the correctly spelled name **OpenBindings** in
any legible typography, weight, spacing, and arrangement appropriate to the
surface. A serif editorial title, a compact UI label, and a monospace technical
signature can all be valid compositions.

The typography beside the glyph is not a derived identity asset. Do not trace
it, export it as a new wordmark, or use one specimen arrangement as a required
template. The stable glyph geometry and its usage rules remain the identity
constant.

## Adoption

A consumer adoption should be small and explain its boundary:

1. record the Design foundations revision;
2. adopt reference values only where they already express the surface well;
3. close behavioral gaps such as missing reduced-motion handling;
4. name intentional profile adaptations rather than normalizing them away;
5. verify keyboard focus, target access, zoom/text spacing, and reduced motion
   in the consumer's native environment; and
6. record evidence without treating screenshots as pixel baselines.

The cross-surface inventory is in
[`docs/evidence/2026-08-07-foundations-inventory.md`](../docs/evidence/2026-08-07-foundations-inventory.md).
