# Machine-material adoption and verification

Date: 2026-08-07
Status: verified

Machine-material revision 1 was accepted in
[design#6](https://github.com/openbindings/design/pull/6) at
`dc46aff65c637fb2604409edf82995a13bfeef66` and returned to every in-scope
renderer. Public Elements keeps its neutral defaults; official products apply
the Design palette through renderer-specific adapters.

## Adoption record

| Surface | Pull request | Merged commit | Durable conformance check | State |
| --- | --- | --- | --- | --- |
| Web | [web#16](https://github.com/openbindings/web/pull/16) | `99394f1c65d9f404be6a48c58f1ff5b6e95c8422` | Design provenance, Shiki theme identity, and JSON/YAML role assertions in `npm test` | adopted |
| Public Elements | [elements#5](https://github.com/openbindings/elements/pull/5) | `3bc88f43d1fefa74381cfdb817d013bf8e6b2468` | Neutral-default, adapter-boundary, and invalid-cue assertions in `pnpm test` | adopted |
| Workbench | [elements#5](https://github.com/openbindings/elements/pull/5) | `3bc88f43d1fefa74381cfdb817d013bf8e6b2468` | Exact light/dark role values and forced-colors fallback in the browser suite | adopted |
| OAuth | — | — | No syntax or serialized machine-material renderer | out_of_scope |
| Terminal CLI | [ob#35](https://github.com/openbindings/ob/pull/35) | `9dbcffc92585f55f9472109afbb321b8987f46602` | JSON/YAML and `NO_COLOR` tests prove serialized output contains no ANSI styling | adopted |

## Verification performed

- Design: all repository checks passed, including generated-artifact drift,
  role coverage, and foreground contrast. The shared JSON/YAML specimen was
  reviewed in light and dark modes, and generated Shiki themes were exercised
  against the real JSON and YAML grammars.
- Web: 43 unit tests, lint, type checks, a production build, and 10 browser
  tests passed. The real homepage machine-text surface was reviewed in dark
  mode; its computed surface, plain, and name roles matched revision 1.
- Elements and Workbench: 179 unit tests and all package builds/type checks
  passed. The complete Workbench browser run finished with 21 passing and 7
  intentionally skipped tests. The source editor was reviewed in light and
  dark modes, and the suite asserts forced-colors behavior.
- CLI: the already-adopted output boundary remains the correct implementation.
  Machine-readable JSON/YAML receives no palette, ANSI sequence, or other
  presentation markup.

## Approved adaptations

- Web's hand-authored homepage example uses only `plain`, `name`, and the
  machine surface. A renderer may use a documented subset of the closed
  palette.
- Elements' public fallback values remain product-neutral. The Workbench
  supplies the official Design mapping through the existing public token API.
- Shiki and Lezer retain their native scope/tag taxonomies. Their adapters map
  those vocabularies into the shared functional roles; Design does not own a
  universal programming-language grammar.

## Existing repository conditions

Web's repository-wide formatting check identifies seven pre-existing,
untouched files. The changed files were formatted and all behavioral, lint,
type, build, and browser checks passed. Seven Workbench browser tests remain
skipped by the existing `OPEN_FLOW_SUSPENDED` condition; the full set of
enabled tests passed.

## Conclusion

Every in-scope human-facing renderer now draws from the same closed palette
through its native adapter, invalid material has a non-color cue, public
Elements remains independently themeable, and raw CLI serialization remains
untouched. Machine-material revision 1 is stable and the slice is verified.
