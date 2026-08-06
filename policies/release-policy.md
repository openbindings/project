# Release and cohort policy

## Component releases

Every component repository remains trunk-and-tags and independently versioned.
Its own release workflow is the authority for building and publishing its
artifacts. The website remains an independently deployed publication surface.

This repository never publishes component artifacts and never requires an
unrelated component to release.

Examples:

- an `ob` bug fix can release without a specification or SDK release;
- a TypeScript-only fix can publish without a Go release;
- an editorial specification patch can publish without republishing either
  SDK;
- the website can deploy without a cohort revision.

## Candidate construction

`cohorts/<line>/next.json` is the candidate work area. Every component entry
contains a full commit SHA. Human-readable tags and versions may accompany the
SHA but never replace it.

Candidate validation is two-phase:

1. Resolve the manifest and prove that every commit exists.
2. Run the repositories' conformance, correspondence, packaging, integration,
   and journey gates against that exact checkout layout.

Moving branch heads may be used for development reconciliation, but never for
candidate evidence.

## Promotion

To promote a candidate:

1. Run the complete integration workflow in cohort mode.
2. Review the selected commits and generated evidence.
3. Confirm that each version or artifact named as released actually resolves
   to the recorded commit.
4. Copy `next.json` to the next numbered cohort, such as `0.2-r1.json`.
5. Change the copied manifest's status to `verified` and attach the workflow
   run URL and completion time.
6. Merge through a pull request with the required project checks green.
7. Optionally create an annotated `cohort-<id>` tag in this repository.

Numbered cohort manifests are append-only. Corrections produce a later cohort
revision; they do not rewrite the historical record. `next.json` remains
mutable and begins the following candidate.

Promotion is a human decision. Green automation proves the recorded checks;
it does not decide whether the project should recommend the combination.

## Scheduling and events

Relevant component pushes and releases should invoke project integration for
fast attribution. A weekly heads-mode run reconciles the entire development
graph and catches missed events or environment drift. Scheduled validation
never promotes a cohort and never publishes a release.

During a concentrated prerelease program the schedule may temporarily be
nightly. Once the specification and default branches are stable, weekly is the
normal cadence.
