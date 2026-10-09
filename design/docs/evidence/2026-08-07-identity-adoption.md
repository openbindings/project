# Identity adoption and verification

Date: 2026-08-07
Status: verified

Identity revision 1 was accepted in
[design#2](https://github.com/openbindings/design/pull/2) at
`cb7ea5bf63bfc7d84991077b4ddc168f2b36c1f5` and then returned to each in-scope
consumer. All consumer changes were squash-merged to `main`.

## Adoption record

| Surface | Pull request | Merged commit | Durable conformance check | State |
| --- | --- | --- | --- | --- |
| Web | [web#13](https://github.com/openbindings/web/pull/13) | `caf933752e1353a4760476b44c64bd959961aa90` | SHA-256 check in `npm test` | adopted |
| Public Elements | — | — | The neutral component library does not display official identity | out_of_scope |
| Workbench | [elements#2](https://github.com/openbindings/elements/pull/2) | `9bf6cf24e5abb5064db89b7524115a4b058f2ae5` | SHA-256 check in `pnpm test` | adopted |
| OAuth | [ob#34](https://github.com/openbindings/ob/pull/34) | `d2dab66b4752f06c0618b87675c4b55a5bad4f5c` | Go test over the embedded asset | adopted |
| Terminal CLI | — | — | A graphical glyph does not belong in ordinary terminal output | out_of_scope |

The Web and workbench favicons exactly match
`assets/generated/favicon.svg` at SHA-256
`e8b62b7d733177ef392de94efc945453905201ea37c65eb1466314ce67760e74`.
The OAuth copy exactly matches `assets/generated/openbindings-glyph.svg` at
SHA-256
`4b0f63a75b7e8f7805739b6a01706e8bc5f6b0ce86dfde4423c4c69551f5ec1e`.

## Verification performed

- Web: `npm test` passed 42 tests plus the asset check; focused Prettier and
  ESLint checks and `git diff --check` passed.
- Workbench and Elements: `pnpm test` passed 15 files and 179 tests plus the
  asset check; `git diff --check` passed.
- OAuth and `ob`: `go test ./...` and `git diff --check` passed.
- Design: generation was reproducible, repository checks passed, and the
  specimen was reviewed in light and dark contexts at 16, 20, 24, 32, 48, and
  96 CSS pixels. Exact rendered dimensions are in
  [the rendering record](2026-08-07-identity-rendering.md).

## Remote CI exceptions

The consumer pull-request checks failed before exercising the identity changes:

- [Web CI](https://github.com/openbindings/web/actions/runs/31199298764/job/92935139502?pr=13)
  attempted `npm ci` for an SDK checkout without a compatible lockfile.
- [Elements CI](https://github.com/openbindings/elements/actions/runs/31199319645/job/92935205834?pr=2)
  checked out the TypeScript SDK `main`, which does not export the
  `OperationImplementation` API consumed by Elements `main`.
- [`ob` CI](https://github.com/openbindings/ob/actions/runs/31199334822/job/92935255640?pr=34)
  rejected a previously published `openbindings-go/formats/asyncapi` module
  because its downloaded checksum no longer matched `go.sum`.

These are repository integration and dependency-integrity issues, not design
exceptions. The identity changes were locally verified in each consumer and
merged because the exact generated artifacts and conformance checks were
independent of those failures.

## Conclusion

Every applicable official surface now uses identity revision 1, every copied
artifact names its provenance, and ordinary tests reject future drift. The
identity guidance is therefore stable and the slice is verified.
