# Interface-foundations adoption and verification

Date: 2026-08-07  
Status: verified

Foundations revision 1 was accepted in
[design#8](https://github.com/openbindings/design/pull/8) at
`3ef2505f441a667b941fe5879533317a8b43db74` and returned to every official
human-facing surface. Adoption proves a behavioral boundary and a shared
vocabulary; it does not require visual sameness or use of every reference.

## Adoption record

| Surface | Pull request | Merged commit | Durable proof | State |
| --- | --- | --- | --- | --- |
| Web | [web#17](https://github.com/openbindings/web/pull/17) | `152ee02936921805672e0d731855bf53543df21c` | Vendored provenance and optional-reference assertions in `npm test`; existing focus and reduced-motion rules retained | adopted |
| Public Elements | [elements#6](https://github.com/openbindings/elements/pull/6) | `e4b8f98dc25911016c1c8774c2c7028bc14f3e6c` | Neutral-token boundary assertions and a real-browser reduced-motion regression test | adopted |
| Workbench | [elements#6](https://github.com/openbindings/elements/pull/6) | `e4b8f98dc25911016c1c8774c2c7028bc14f3e6c` | Provenance names the application profile; the complete Workbench browser suite preserves dense and zero-radius adaptations | adopted |
| OAuth | [ob#36](https://github.com/openbindings/ob/pull/36) | `9b6f1fa5b01813c62c1de4f0431203195ccf0ea5` | Go tests pin the Design revision and require the reduced-motion media rule | adopted |
| Terminal CLI | [ob#36](https://github.com/openbindings/ob/pull/36) | `9b6f1fa5b01813c62c1de4f0431203195ccf0ea5` | Revision assertion plus existing ANSI/`NO_COLOR` tests preserve the terminal-native profile | adopted |

## Verification performed

- Design: `npm test` and `npm run loop` passed. The generated adapter is
  checked for drift and rejects closed visual reference families or a
  canonical wordmark/lockup. The specimen was reviewed in system, light, and
  dark themes and renders three different glyph-and-name compositions as
  equally valid.
- Web: 43 unit tests, type checks, lint, and 10 browser end-to-end tests passed.
  The changed files passed their formatting check. The real home page was
  reviewed in the in-app browser after mapping its already-matching type,
  radius, and tempo aliases to optional references.
- Elements: 179 unit tests, all package builds and type checks, 16 component
  browser tests, and the Workbench browser suite passed. The browser contract
  directly emulates `prefers-reduced-motion: reduce` and observes the private
  duration collapse to `0.01ms`. The neutral example was visually reviewed.
- OAuth and CLI: `go test ./...` passed with localhost access. The rendered
  OAuth consent page was reviewed in the in-app browser; its compact
  composition and layout did not change.

## Preserved expression

- There is no canonical wordmark or fixed lockup. Web, Workbench, OAuth, and
  future surfaces may pair the canonical glyph with different live
  typography and composition.
- Web keeps its editorial hierarchy, section rhythm, and compact 1px focus
  treatment. It uses reference values only where its local values already
  matched.
- Public Elements keeps neutral, host-controlled typography, spacing, radius,
  focus, and ordinary motion tokens. Reduced-motion behavior applies inside a
  standalone Element because it is an access requirement, not branding.
- Workbench keeps compact typography, local chrome radii, and zero-radius
  embedded content planes.
- OAuth keeps a compact security-flow composition. It references familiar
  radii and tempo without importing a runtime CSS dependency into the Go
  binary.
- The CLI keeps terminal-owned fonts, character metrics, whitespace, and ANSI
  semantics. Browser foundation values have no terminal mapping.

## Existing verification conditions

The hosted Elements check passed package builds, type checks, unit tests, and
the plain-browser suite, then failed the existing Workbench navigation test
while waiting for a transient `.ob-reveal-flash` marker. One unchanged rerun
reproduced the same CI-only timeout. The complete Workbench suite passed
locally, and the failing test passed three additional consecutive local
repetitions. The foundation change affects private transition duration only
when `prefers-reduced-motion: reduce` is active; this test uses the default
media preference and the marker's 1.2-second JavaScript lifetime is unchanged.
The timing assumption belongs to the Workbench test and should be hardened in
its own behavior-focused change, not by coupling it to foundation styling.

The GitHub Actions run attached to ob#36 stopped during dependency download
because the published checksum for
`openbindings-go/formats/connect@v0.1.0` differed from the repository's
existing `go.sum` entry. It did not reach the changed code. The complete local
Go suite passed against the already-resolved dependency set. This external
module-auth condition predates and is independent of the foundations change;
it should be repaired in the owning dependency/release workflow rather than
by weakening checksum verification in this slice.

## Conclusion

Every official surface now names the same foundation boundary. Behavioral
requirements are verified in their native environments; optional visual
references remain optional; neutral components and modality-specific profiles
remain intact. Foundations revision 1 is stable.
