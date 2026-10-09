# Color and theme inventory

Date: 2026-08-07
Status: exact evidence supporting the candidate official theme

This inventory reads committed source at the recorded revisions. It separates
the official OpenBindings expression from the neutral Elements defaults and
from terminal-native color behavior.

## Sources

| Surface | Revision | Source |
| --- | --- | --- |
| Web | `openbindings/web@caf933752e1353a4760476b44c64bd959961aa90` | `src/app.css` |
| Public Elements | `openbindings/elements@9bf6cf24e5abb5064db89b7524115a4b058f2ae5` | `packages/ui-core/src/styles.ts` |
| Workbench | `openbindings/elements@9bf6cf24e5abb5064db89b7524115a4b058f2ae5` | `apps/ob-start-workbench/src/styles.css` |
| OAuth | `openbindings/ob@d2dab66b4752f06c0618b87675c4b55a5bad4f5c` | `internal/cmd/oauth_html.go` |
| Terminal CLI | `openbindings/ob@d2dab66b4752f06c0618b87675c4b55a5bad4f5c` | `internal/app/styles.go` |

## Official browser values

| Role | Web light / dark | Workbench light / dark | OAuth light / dark | Finding |
| --- | --- | --- | --- | --- |
| Background | `#fff` / `#0a0a0a` | `#fff` / `#0a0a0a` | `#fafafa` / `#0a0a0a` | Shared foundation; light OAuth canvas is a local separation device |
| Surface | `#fff` / `#0a0a0a` | `#fff` / `#0a0a0a` | `#fff` / `#0a0a0a` | Shared foundation |
| Strong surface or fill | `#f0f0f0` / `#171717` | `#f4f4f4` / `#171717` | `#f0f0f0` / `#171717` | Shared foundation with minor light drift |
| Primary text | `#000` / `#e5e5e5` | `#000` / `#f3f3ed` | `#000` / `#e5e5e5` | Shared foundation; workbench dark text is a warmer high-emphasis adaptation |
| Muted text | `#666` / `#a3a3a3` | `#666` / `#aaa9a1` | `#666` / `#a3a3a3` | Shared foundation with minor dark drift |
| Faint text | `#999` / `#8a8a8a` | `#999` / `#85857d` | `#999` / `#8a8a8a` | Shared role, but the light value is an accessibility defect for small text |
| Subtle border | `#f0f0f0` / `#171717` | `#ededed` / `#1d1d1d` | `#f0f0f0` / `#262626` | Shared decorative role with surface-specific drift |
| Strong border | Not distinguished | `#d8d8d8` / `#343434` | Not distinguished | Needed as a separate accessibility role; current values do not reach 3:1 |
| Primary action | `#000` / `#e5e5e5` | `#111` / `#f1f1ec` | `#000` / `#e5e5e5` | Official expression: strongest neutral with inverse text |
| Success | Not centralized | `#17734b` / `#73d5a6` | Not used | Candidate official semantic palette |
| Warning | Not centralized | `#976800` / `#efc562` | Not used | Candidate official semantic palette |
| Danger | Not centralized | `#b83b32` / `#ff9187` | `#dc2626` / `#f87171` | Shared role; workbench pair has better family alignment with the complete status set |

## Neutral Elements values

Elements deliberately ships a generally useful fallback rather than the
official product expression:

| Role | Neutral default |
| --- | --- |
| Background / surface / strong surface | `#fff` / `#f7f7f5` / `#efefec` |
| Text / muted text / border | `#171714` / `#686862` / `#d9d9d3` |
| Accent / contrast | `#305cff` / `#fff` |
| Success / danger | `#18794e` / `#b42318` |

This blue accent is a **neutral default**, not drift. Official applications
should map the official theme through the existing public `--ob-*` contract.
The contract remains owned by Elements.

## Contrast findings

Ratios below use sRGB relative luminance and the normal WCAG contrast formula.

| Pair | Current or candidate ratio | Decision |
| --- | ---: | --- |
| Light primary text on background | `21.00:1` | Preserve |
| Light muted text on background | `5.74:1` | Preserve |
| Current light faint `#999` on white | `2.85:1` | Replace with candidate `#737373` (`4.74:1`) |
| Current light strong border `#d8d8d8` on white | `1.43:1` | Keep only as decorative; use candidate `#8a8a8a` (`3.45:1`) when the boundary carries meaning |
| Current dark strong border `#343434` on `#0a0a0a` | `1.59:1` | Keep only as decorative; use candidate `#737373` (`4.18:1`) when the boundary carries meaning |
| Light success / warning / danger on white | `5.85:1` / `4.89:1` / `5.66:1` | Adopt |
| Dark success / warning / danger on `#0a0a0a` | `11.12:1` / `12.10:1` / `9.10:1` | Adopt |
| Light inverse action text | `18.88:1` | Adopt |
| Dark inverse action text | `15.72:1` | Adopt |

Subtle surfaces and borders may remain below 3:1 only when they are decorative
or redundant. Controls, selected states, and other meaningful boundaries must
use `borderStrong` or another independent cue.

## Theme behavior and capability evidence

- Web and OAuth follow `prefers-color-scheme`; neither offers a local control.
- Workbench offers persisted light, dark, and system modes.
- Elements follows the host's custom properties. Its syntax defaults follow
  the operating system only so a standalone element remains legible.
- No audited browser surface currently has an explicit `forced-colors` or
  `prefers-contrast` adaptation. This is a cross-surface gap, not a behavior to
  preserve.
- The CLI uses ANSI 6 for keys, 8 for muted material, 2 for success/additions,
  3 for warnings, and 1 for errors/removals. `NO_COLOR` returns unstyled
  Lip Gloss values for every role.

## Difference classifications

| Difference | Classification | Result |
| --- | --- | --- |
| Predominantly monochrome official products versus blue Elements accent | Official expression / neutral default | Publish an official adapter; preserve Elements defaults |
| Small literal neutral differences | Accidental drift unless required by hierarchy | Consolidate around the candidate theme |
| Workbench theme selector versus OS-only pages | Modality and product adaptation | Share values; allow different controls |
| Browser hex values versus ANSI terminal colors | Modality adaptation | Share meaning, not literals |
| Missing forced-colors rules | Accidental accessibility gap | Add a system-color adapter and do not disable user overrides |
| Syntax palettes | Deferred | Route to `machine-material` |
