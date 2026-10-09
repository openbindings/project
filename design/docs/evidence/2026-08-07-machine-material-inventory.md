# Machine-material inventory

Date: 2026-08-07
Status: accepted for candidate revision 1

This inventory compares identical JSON/YAML concepts across the official Web,
Elements, Workbench, and CLI surfaces before consolidation. The source paths
were clean at the recorded commits.

## Exact sources

| Surface | Repository commit | Source paths |
| --- | --- | --- |
| Web Shiki | `openbindings/web@246169da4f3993b74a190c057704e20de5d2d7ae` | `src/lib/markdown/render-spec-markdown.ts`, `src/lib/components/SpecDocument.svelte`, `src/routes/cli/+page.svelte` |
| Web interactive example | `openbindings/web@246169da4f3993b74a190c057704e20de5d2d7ae` | `src/routes/+page.svelte` |
| Public Elements | `openbindings/elements@eef4af8d35b6b57204233469525679b7e7b04a88` | `packages/ui-core/src/styles.ts`, `packages/json-editor/src/index.ts`, `packages/json-editor/src/highlight.ts` |
| Workbench | `openbindings/elements@eef4af8d35b6b57204233469525679b7e7b04a88` | `apps/ob-start-workbench/src/styles.css` |
| CLI | `openbindings/ob@9dbcffc92585f55f9472109afbb321b8987f4660` | `internal/app/output.go`, `internal/app/output_test.go`, `internal/app/styles.go` |

## Existing palettes

| Expression | Light | Dark | Notes |
| --- | --- | --- | --- |
| Web Shiki default | default `#24292e`; JSON property/number/built-in `#005cc5`; string `#032f62`; YAML key `#22863a`; comment `#6a737d` | default `#e1e4e8`; JSON property/number/built-in `#79b8ff`; string `#9ecbff`; YAML key `#85e89d`; comment `#6a737d` | `github-light` and `github-dark`; JSON collapses several categories that YAML distinguishes |
| Web interactive example | theme primary and secondary neutrals | theme primary and secondary neutrals | Hand-authored tree distinguishes keys and active lines, not literal types |
| Elements neutral default | key `#1a4fd6`; string `#0b7a52`; number `#9a5300`; keyword `#8b21c9`; punctuation/comment muted; invalid danger | key `#8fb4ff`; string `#6bd6a4`; number `#f0b45f`; keyword `#d3a2ff`; punctuation/comment muted; invalid danger | Public `--ob-editor-token-*` contract shared by editable and static views |
| Workbench official app | key `#2456c4`; string `#0d7050`; number `#94510a`; keyword `#7c2fb8`; code surface `#f7f7f5` | key `#8fb4ff`; string `#6bd6a4`; number `#f0b45f`; keyword `#d3a2ff`; code surface `#101010` | App values already map into the Elements contract |
| CLI machine output | no presentation bytes | no presentation bytes | JSON/YAML serializers bypass human ANSI roles |

Shiki scope inspection used the loaded grammars in Web. JSON keys expose
`support.type.property-name.json`; YAML keys expose `entity.name.tag.yaml`;
strings use `string`; numbers use `constant.numeric`; booleans/null use
`constant.language`; punctuation and comments use their corresponding common
TextMate scope families.

Lezer already exposes the matching compact set: `propertyName`, `string`,
`number`, `bool`/`null`/`keyword`, punctuation/separator/bracket, `comment`, and
`invalid`. No Elements API expansion is needed for revision 1.

## Difference classification

| Difference | Classification | Decision |
| --- | --- | --- |
| One small chromatic set recurs for names, strings, numbers, and controls | Shared foundation | Define a closed palette with four chromatic slots, plain, muted, invalid, and surface |
| Workbench values are the only reviewed official application expression | Official expression | Use them as candidate values after contrast verification |
| Elements uses nearby but independent defaults | Neutral default | Preserve them; publish an official adapter over the public tokens |
| Shiki and Lezer expose different taxonomies | Modality adaptation | Generate a Shiki scope theme and an Elements token adapter from the same source |
| Web currently imports GitHub themes while Workbench uses local values | Accidental drift | Replace the official Web mapping with generated OpenBindings Shiki themes |
| The homepage tree intentionally uses fewer distinctions | Modality adaptation | Map its keys and plain material into the palette without forcing a full tokenizer |
| CLI JSON/YAML has no syntax presentation | External authority | Preserve exact bytes and the existing no-ANSI test |

## Accepted model

Candidate revision 1 uses three layers: closed palette, broad functional roles,
and renderer adapters. Implementations may collapse distinctions but official
renderers may not introduce colors outside the palette or redefine invalidity.
The shared fixtures under `specimens/fixtures/` are the migration and visual
comparison inputs.
