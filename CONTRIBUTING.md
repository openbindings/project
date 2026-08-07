# Contributing

Changes use the OpenBindings trunk-and-tags workflow: branch from `main`, open
a pull request, and squash-merge after required checks pass.

Before opening a pull request:

```bash
npm test
```

## Candidate updates

- Update only `cohorts/<line>/next.json` while assembling a candidate.
- Use full commit SHAs that are reachable from the named upstream repository.
- Do not use branch names or abbreviated SHAs in a cohort.
- Explain which component changed and why the affected integration lanes are
  sufficient.

## Verified cohorts

Numbered cohort records are append-only. Never edit, rename, or remove an
existing `<line>-rN.json`. Promotion requires a green complete cohort-mode run
and maintainer approval as described in
[`policies/release-policy.md`](policies/release-policy.md).

## Policy changes

This repository has authority over project coordination only. Changes here may
not redefine the specification, shared interfaces, implementation conformance,
or component release processes. Make those changes in the repository that owns
the corresponding authority, then update coordination here if necessary.

## Ownership and escalation

Route a change to the repository that owns its subject:

| Subject | Owning repository |
| --- | --- |
| Normative language, schemas, and conformance rules | `openbindings/spec` |
| Shared interface contracts and profiles | `openbindings/interfaces` |
| Go implementation behavior and packages | `openbindings/openbindings-go` |
| TypeScript implementation behavior and packages | `openbindings/openbindings-ts` |
| CLI and local runtime behavior | `openbindings/ob` |
| UI packages | `openbindings/elements` |
| Website content, projection, and deployment | `openbindings/web` |
| Cross-repository cohorts and integration workflows | `openbindings/project` |

For a change spanning multiple owners, open or link the component issues and
use an `openbindings/project` issue to coordinate the order and exact commits.
The project repository records the decision but does not acquire the component
repository's authority.

Escalate an ambiguous ownership, compatibility, release-promotion, or
governance decision to the project maintainer, Matthew Clevenger
([`@clevengermatt`](https://github.com/clevengermatt)), before changing policy
or merging across an authority boundary. Report sensitive matters through the
private channel in [`SECURITY.md`](SECURITY.md), not a public issue.
