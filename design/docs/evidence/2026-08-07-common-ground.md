# Current common ground

Date: 2026-08-07
Status: evidence for the first design slices; not yet a stable style guide

This audit records the strongest recurring choices across current official
surfaces. The cited files were unchanged from the recorded commits at the time
of inspection.

## Sources

| Surface | Repository commit | Source |
| --- | --- | --- |
| openbindings.com | `openbindings/web@108cecba3652440bbee70c4c88de05ebead0bc54` | `src/app.css`, `static/favicon.svg` |
| Public Elements | `openbindings/elements@5a738c72ee28948a6390565d178abd90a75d6ee6` | `packages/ui-core/src/styles.ts` |
| `ob start` workbench | `openbindings/elements@5a738c72ee28948a6390565d178abd90a75d6ee6` | `apps/ob-start-workbench/src/styles.css`, `public/assets/favicon.svg` |
| Authorization pages | `openbindings/ob@adfdc1ce48be7b2576c947b6033cf278901c56ea` | `internal/cmd/oauth_html.go`, `internal/cmd/oauth_assets/openbindings-glyph.svg` |
| Terminal CLI | `openbindings/ob@adfdc1ce48be7b2576c947b6033cf278901c56ea` | `internal/app/styles.go` |

## Strong commonalities

### Identity

Web, the workbench, and authorization pages use the same five-path nested
binding glyph geometry. Web and workbench carry identical theme-aware favicon
files. Authorization embeds the same geometry with `currentColor`, which is a
strong candidate for the canonical portable master.

The current gap is provenance and usage, not identity selection: there is no
single master, sizing rule, clear-space rule, or generated-variant process.

### Visual character

The official browser surfaces consistently use a restrained, technical,
predominantly monochrome expression:

- white or near-black page backgrounds;
- black or light-neutral primary text;
- gray secondary text, fills, borders, and raised surfaces;
- the strongest neutral as the main action color; and
- color reserved primarily for syntax and semantic status.

This is an official-brand pattern, not necessarily the right neutral default
for independently embedded Elements.

### Semantic roles

The browser surfaces independently converge on the same functional roles even
where names and exact values differ:

- background, surface, raised or strong surface;
- primary, muted, and faint or tertiary text;
- default and strong borders;
- active or accent plus contrast text;
- success, warning, and danger;
- body and monospace type;
- code surface and syntax roles;
- radius, focus treatment, shadow, spacing, and fast motion.

Elements already exposes many of these through public `--ob-*` variables. The
workbench demonstrates the intended adapter seam by mapping its application
tokens into that public contract.

### Typography and machine material

Official browser surfaces prefer Inter with system sans-serif fallbacks. Web
and authorization explicitly prefer JetBrains Mono for machine material;
Elements uses a system-oriented monospace stack so embedded components remain
self-contained.

Across the surfaces, code, identifiers, client IDs, structured data, and
syntax tokens are treated as a distinct material rather than ordinary prose.

### Theme, focus, and motion

All browser surfaces account for light and dark presentation. Web and
authorization follow the operating-system preference; the workbench supports
light, dark, and system selection. This is shared theme capability with
different product controls.

Web, Elements, and the workbench use `:focus-visible` rather than persistent
pointer-focus decoration. Web and the workbench explicitly reduce motion for
the operating-system preference, while Web, Elements, and the workbench all
converge around a fast transition near 120 milliseconds.

### Semantic status across media

Workbench and CLI both distinguish success, warning, and error or danger.
Their literal palettes should not be unified: terminal colors depend on
capabilities and `NO_COLOR`, while browser colors must satisfy contrast in
their rendered context. The shared system belongs at the semantic-role and
message-anatomy level.

## Differences requiring adjudication

| Difference | Initial classification hypothesis | Question for the slice |
| --- | --- | --- |
| Elements defaults to a blue accent while official apps are monochrome | Neutral default versus official expression | Should Design ship an official theme mapping without changing Elements defaults? |
| Web and authorization use rounded cards; the dense workbench maps Elements radius to zero | Modality adaptation | Which radii are brand foundations, and which are density-specific? |
| Theme control is OS-only in Web and authorization but explicit in the workbench | Product adaptation | What theme behavior is required versus optional? |
| Syntax palettes share roles but not exact values | Shared foundation with possible drift | Which roles and contrast constraints should be canonical? |
| Font loading differs and the workbench does not ship Inter | Capability and delivery difference | Is Inter a preference, a required asset, or an optional official enhancement? |
| Focus rings use different widths and color mixes | Likely drift plus context adaptation | Which behavior is invariant, and which geometry may vary? |
| The CLI applies semantic styling unevenly | Accidental drift candidate | Which human-output moments must use shared roles without touching machine output? |

These are hypotheses, not decisions. Each must pass through the development
loop before migration.

## Initial slice order

1. **Identity and canonical assets** — strong agreement, low API risk, and an
   immediate copied-asset problem.
2. **Color roles and official theme** — establish semantic roles and the
   neutral-default/official-theme boundary.
3. **Typography, density, shape, focus, and motion** — separate shared
   foundations from surface adaptations.
4. **Machine material and syntax** — consolidate code surfaces and semantic
   token roles.
5. **Status, feedback, and recovery** — align semantic state and message
   anatomy across browser and terminal media.
6. **Voice and UI content** — inventory representative flows, then codify tone,
   labels, capitalization, errors, empty states, and destructive moments.
