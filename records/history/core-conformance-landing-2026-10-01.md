# Core conformance landing (2026-10-01)

The Core API, clarified working-draft text, clause-scoped tool corpus, and
pinned reference runner are integrated on the Go and spec `release/0.2`
branches. The mutable [0.2 candidate](../../cohorts/0.2/next.json) now selects
those actual post-squash commits. All other component pins, versions, and
release states are retained; the cohort remains a candidate.

| Change | Pull request | Squash commit |
| --- | --- | --- |
| Go applied-text CI pin | [PR 136](https://github.com/openbindings/openbindings-go/pull/136) | `d34caae82de6a3f6993e2586b68aa84b73250ddc` |
| Go Core API | [PR 137](https://github.com/openbindings/openbindings-go/pull/137) | `9a0ed1e31033d516de7c8735a9bd00dc85056cc0` |
| Core text and corpus | [PR 134](https://github.com/openbindings/spec/pull/134) | `cbc17a6f6fdb9eeeb38dd0fa184df258cedaece0` |
| Go text adoption | [PR 138](https://github.com/openbindings/openbindings-go/pull/138) | `57e12e050c63b1a08791aa77f86ff9fedc3d5b15` |
| Pinned Go reference runner | [PR 135](https://github.com/openbindings/spec/pull/135) | `6420093d4b88c326b6b061521961eb661354b91e` |

The Go reports apply spec text `cbc17a6f6fdb9eeeb38dd0fa184df258cedaece0`. The final spec
runner pins Go `57e12e050c63b1a08791aa77f86ff9fedc3d5b15`. The text SHA256 is
`958461372e761311a12e3f33bab112876032ffa14d776f39be31f83bebfe0198`,
and the schema remains byte-identical to the Go embedded schema.

[Go hosted CI](https://github.com/openbindings/openbindings-go/actions/runs/36939250332)
passed for all three changes. [Spec Validate and Authority](https://github.com/openbindings/spec/actions/runs/36939793698)
passed, and the enabled core runner passed: 395 cases, 385 PASS, 8 declared
OMITTED, 2 ADVISORY, and no FAIL, SHORTFALL, UNVERIFIED, or reconciliation
problems. The runner comparator retains an empty failure list and the
same eight declared omission signatures.

The pre-existing GraphQL and TypeScript binding-conformance failures remain
visible in spec CI. Their failure names and signatures were compared with
[the pre-landing baseline](https://github.com/openbindings/spec/actions/runs/36766657458)
and retained as recorded landing exceptions. No check was suppressed.
The project integration workflow also fails to fetch its existing
`openbindings/jsonata` input (`Repository not found`); this pin was retained.
Component conformance does not qualify the whole candidate for promotion.
No release tag, package publication, deployment, or verified cohort is
part of this landing.
