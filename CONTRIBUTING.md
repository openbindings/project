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
