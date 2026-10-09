# Color-theme adoption and verification

Date: 2026-08-07
Status: verified

Theme revision 1 was accepted in
[design#4](https://github.com/openbindings/design/pull/4) at
`ed8a40919c65274b9b4c18e1b7700ccac409c126` and then returned to every
in-scope consumer. The official theme preserves Elements' neutral public
defaults and adapts to native terminal semantics rather than copying CSS into
the CLI.

## Adoption record

| Surface | Pull request | Merged commit | Durable conformance check | State |
| --- | --- | --- | --- | --- |
| Web | [web#15](https://github.com/openbindings/web/pull/15) | `246169da4f3993b74a190c057704e20de5d2d7ae` | Generated CSS provenance and local-role mapping in `npm test` | adopted |
| Public Elements | [elements#4](https://github.com/openbindings/elements/pull/4) | `eef4af8d35b6b57204233469525679b7e7b04a88` | Design revision, adapter seam, and neutral-default assertions in `pnpm test` | adopted |
| Workbench | [elements#4](https://github.com/openbindings/elements/pull/4) | `eef4af8d35b6b57204233469525679b7e7b04a88` | Canonical role and forced-colors assertions in `pnpm test` | adopted |
| OAuth | [ob#35](https://github.com/openbindings/ob/pull/35) | `9dbcffc92585f55f9472109afbb321b8987f46602` | Embedded theme revision and forced-colors assertions in `go test ./...` | adopted |
| Terminal CLI | [ob#35](https://github.com/openbindings/ob/pull/35) | `9dbcffc92585f55f9472109afbb321b8987f46602` | ANSI-role, `NO_COLOR`, JSON, and YAML assertions in `go test ./...` | adopted |

## Verification performed

- Design: theme generation and repository checks passed; automated contrast
  checks cover text, muted and faint text, inverse action text, status colors,
  and meaningful borders. The specimen was reviewed in light, dark, and forced
  colors.
- Web: type checks, lint, 42 unit tests, production build, and 10 browser tests
  passed locally and in hosted CI. The deployed build was reviewed in light,
  dark, and forced colors.
- Elements and Workbench: package checks, 179 tests, the design-assets check,
  and 20 Workbench browser tests passed locally; 7 browser tests were skipped
  by their declared conditions. The full Workbench was reviewed in light and
  dark, and its forced-colors role mapping is asserted.
- OAuth and `ob`: `go test ./...` passed locally. The authorization page was
  reviewed in dark mode and its forced-colors mapping is asserted. CLI tests
  prove that the five semantic ANSI roles retain textual meaning, `NO_COLOR`
  removes styling attributes, and serialized JSON/YAML contains no ANSI escape
  bytes.

## Machine-output boundary

Theme adoption does not authorize changes to serialized output. `ob --format
json`, `ob --format yaml`, output files, and other machine-readable streams are
unstyled byte contracts owned by `ob`. The next
[machine-material slice](../slices/machine-material.md) governs how official
UIs render JSON, YAML, and related source material without governing the bytes.

## Remote CI exception

Both hosted attempts for
[elements#4](https://github.com/openbindings/elements/actions/runs/31208849861/job/92968234352?pr=4)
reached the full Workbench suite and failed only the same pre-existing,
timing-sensitive reveal-flash assertion. The theme change does not touch that
navigation behavior. The full suite passed locally twice, and the focused test
passed five consecutive local runs. The exception is documented on the pull
request; package checks, 179 tests, and the theme conformance checks passed.

[`ob` CI](https://github.com/openbindings/ob/actions/runs/31208356185/job/92964886562?pr=35)
stopped before compiling the theme change because Go's public module proxy
served bytes for a historically moved `openbindings-go/formats/grpc@v0.1.0`
tag whose checksum differs from the repository's `go.sum`. The remote and
local tag references resolve to the same current commit, so repairing the
published module requires a new upstream version rather than bypassing Go's
integrity check. Local full-repository tests passed; this is a dependency
publishing issue, not a design or adoption exception.

## Conclusion

Every official browser surface now consumes revision 1 through its native
implementation, public Elements keeps its brand-neutral default, and the CLI
shares semantic roles without styling machine output. Theme revision 1 is
therefore stable and the slice is verified.
