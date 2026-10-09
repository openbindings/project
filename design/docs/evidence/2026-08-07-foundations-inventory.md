# Interface-foundations inventory

Date: 2026-08-07  
Slice: `foundations`

This evidence compares implementation sources at pinned consumer commits. It
records existing common ground before any consumer migration and classifies
differences without assuming that sameness is the goal.

## Pinned sources

| Surface | Repository commit | Primary evidence |
| --- | --- | --- |
| openbindings.com | `openbindings/web@99394f1c65d9f404be6a48c58f1ff5b6e95c8422` | `src/app.css`, `src/app.html` |
| Public Elements | `openbindings/elements@3bc88f43d1fefa74381cfdb817d013bf8e6b2468` | `packages/ui-core/src/styles.ts`, component modules |
| `ob start` Workbench | `openbindings/elements@3bc88f43d1fefa74381cfdb817d013bf8e6b2468` | `apps/ob-start-workbench/src/styles.css` |
| Authorization pages | `openbindings/ob@9dbcffc92585f55f9472109afbb321b8987f4660` | `internal/cmd/oauth_html.go` |
| Terminal CLI | `openbindings/ob@9dbcffc92585f55f9472109afbb321b8987f4660` | `internal/app/styles.go` and command renderers |

## Exact comparison

| Concern | Web | Elements | Workbench | OAuth | CLI | Classification |
| --- | --- | --- | --- | --- | --- | --- |
| Sans stack | Hosted Inter, then `system-ui` | Inter, UI/system fallback; no download | Inter, UI/system fallbacks; no download | Hosted Inter, then `system-ui` | Terminal-owned | Shared reference with delivery and modality adaptations |
| Mono stack | Hosted JetBrains Mono, then `ui-monospace` | Platform monospace stack | Inherited component stack | `ui-monospace`, JetBrains Mono fallback | Terminal-owned | Shared reference, not a font requirement |
| Type hierarchy | Editorial: roughly 0.65–4rem, broad heading contrast | Neutral component base 0.875rem/1.45, compact labels | Operational: roughly 0.68–1.2rem | Compact security flow: 0.8125–1.125rem | Character-cell/native metrics | Intentional expression profiles |
| Rhythm | Controls around 0.3–0.85rem; content 1–1.5rem; sections 2–4rem | Public base space 0.75rem plus component-derived values | Dense 0.35–0.65rem controls and compact panels | Compact card and action spacing | Indentation and blank lines | Open recognition anchors, not a closed scale |
| Shape | Local 2/4/8/12px anchors plus pills/circles | Public 0.5rem base with derived radii | Embedded Elements mapped to 0; app chrome 0.3–0.7rem plus pills | 8/12px | Not applicable | Related anchors with functional exceptions |
| Focus | 1px outline, 1px offset | 3px mixed-color ring | 3px ring, 2px offset | 2px outline, 2px offset | Native selection/emphasis where interactive | Shared visible-focus outcome; geometry stays local |
| Motion | 120/150ms; global reduced-motion collapse | 120ms public default; no base reduced-motion rule | 120ms; reduced-motion collapse | 120ms; no reduced-motion rule | Not applicable | Shared reference tempo; two behavioral gaps |
| Pointer targets | Common controls exceed 24px | Split controls use 2.1rem targets | Common controls use 2.1rem minimum | Action padding yields targets above 24px | Not applicable | Shared accessibility guardrail |

## Decisions from the evidence

1. **Requirements stay behavioral.** Visible focus, target access, adaptable
   text, and reduced-motion support apply across official human-facing
   interfaces. Exact styling does not.
2. **Typography is not identity geometry.** Inter and JetBrains Mono are useful
   reference stacks because browser surfaces already converge on them. Neither
   is a required dependency, and neither defines a wordmark.
3. **Visual values remain an open vocabulary.** Existing 4/8/16/32/64px
   rhythm and 2/4/8/12px radius patterns become optional anchors. Values
   between and outside them remain valid.
4. **Density is a profile decision.** Web's editorial hierarchy, Workbench's
   compact square content planes, Elements' neutral host contract, OAuth's
   short security flow, and terminal-native layout should remain distinct.
5. **Only clear gaps migrate automatically.** Standalone public Elements and
   OAuth currently lack reduced-motion handling. Reference-token adoption may
   remove duplicated values where it causes no visual change, but is not
   required elsewhere.

## Accessibility basis

The required outcomes align with WCAG 2.2 guidance for visible focus, focus not
being obscured, minimum target size, and adaptable text. The project treats the
more prescriptive focus-appearance geometry as a useful reference rather than
turning an AAA technique into a project-wide visual template. Reduced-motion
support follows the `prefers-reduced-motion` CSS technique and still requires
surface-level judgment about what motion is essential.

## Proposal test

The proposal succeeds only if all of these examples can conform at once:

- three different type treatments can accompany the same glyph;
- Web can remain editorial and Workbench can remain dense;
- public Elements can keep neutral, host-owned defaults;
- the CLI can keep terminal-native typography and spacing; and
- a consumer can decline every optional reference value while still meeting
  the behavioral guardrails.

