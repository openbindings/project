# Development-line loop

This loop prepares and proves the mutable candidate cohort on each repository's
declared integration ref. Released components normally use a `release/<line>`
branch; an unreleased component may deliberately integrate on `main` until its
first release. It is not a release procedure. The current development lines
and pull requests are recorded in [`working-loop.json`](../working-loop.json);
`npm run loop` validates that record and prints the safe work plus unresolved
human decisions.

Each recorded pull request has an explicit `open` or `merged` status. A merged
entry records the resulting squash commit, and each caller records the branch
filter it installs. This makes the loop restartable: completed merges are not
proposed again. An open caller cannot be treated as ready if its trigger differs
from the selected integration ref. Merged callers retain their historical base
and trigger as evidence even after the repository adopts a new canonical ref.

## Hard invariants

An agent running this loop must not:

- push, merge, or retarget work outside a component's declared integration ref;
- change an integration ref or caller branch filter without a maintainer ruling;
- tag, version, publish, attest, deploy, or finalize a release changelog;
- create a numbered cohort, mark a cohort verified, or describe a candidate as
  recommended;
- make a normative, public-API, compatibility, dependency-ownership, security,
  or governance-policy choice without a maintainer ruling;
- weaken, skip, delete, or silently quarantine a failing check to obtain green.

`cohorts/<line>/next.json` stays mutable and has status `candidate` throughout.
A green run is evidence only; it is not a release signal.

## The loop

Run the following state machine until it reaches a stop condition.

### 1. Preflight and isolate

1. Run `npm test` and `npm run loop` in `openbindings/project`.
2. Fetch remote state read-only and verify every recorded pull request still
   exists, has the recorded base, and contains only its stated scope.
3. Work in clean, isolated worktrees. Never reuse or clean a maintainer's dirty
   worktree.
4. Record the current development-line heads so every mutation is attributable
   and recoverable.

If a component has no declared integration ref, continue all independent work
and stop before retargeting or merging that component's pull request. Branch
selection is a human decision. The catalog may explicitly select `main` for an
unreleased component; that is a decision, not an implicit fallback.

### 2. Land already-proven fixes on development lines

Process `fixPullRequests` before coordination callers:

1. Retarget the pull request to its recorded `workingRef` if necessary.
2. Require the component's existing checks to pass.
3. Confirm that the diff still matches the mechanically proven defect and does
   not introduce a stop-condition change.
4. Squash-merge into the declared integration ref.
5. Record the resulting line-head SHA; never assume it equals the pull
   request commit after a squash.

### 3. Install coordination callers on development lines

For each component with a declared `workingRef`:

1. Retarget its open caller pull request to that integration ref if necessary.
2. Verify that the workflow calls
   `openbindings/project/.github/workflows/integration.yml@main`, passes the
   source repository and full source SHA, and contains no publishing step.
3. Squash-merge after required component checks pass.
4. Confirm that the merge touched only the declared integration ref.

### 4. Refresh the mutable candidate

Replace each changed component SHA in `next.json` with the actual post-merge
development-line head. Keep component versions and `releaseState` unchanged
unless a maintainer separately rules otherwise. Run `npm test` and resolve the
manifest to confirm that every selection is a full SHA.

### 5. Validate exact commits

Run in increasing cost order:

1. project schema and resolver tests;
2. affected component and correspondence lanes;
3. the required core cohort in exact-SHA mode;
4. Elements extended validation;
5. website build and test validation with deployment disabled.

The website may remain private. Validate it from its own caller context or
locally against the exact cohort; do not make it public or introduce a
cross-repository secret merely to make the central manual run green.

For an objective failure, reproduce it against the exact selection, add or
identify a check that proves the contract, make the smallest correction on a
branch from the affected working ref, run the component and downstream lanes,
open a pull request, and return to step 2. Examples that may proceed without a
new ruling are workflow syntax, generated-file drift, compiler/linter errors,
and an implementation race that violates an already documented and tested
guarantee.

### 6. Apply non-semantic governance hardening

Safe work includes protecting the new project default branch from deletion and
force-pushes, confirming least-privilege workflow permissions, and documenting
owners and escalation paths. Do not choose required review counts, make the
cross-project workflow merge-blocking, change repository visibility, or add a
cross-repository secret without a maintainer decision.

### 7. Report and stop

Stop after all mechanically actionable work is complete. Report:

- development lines and their final SHAs;
- merged pull requests and validation evidence;
- remaining extended-lane limitations;
- every unresolved decision, with the smallest set of concrete options.

Do not continue into an undeclared branch convergence, release preparation,
publication, deployment, or cohort promotion.

## Immediate stop conditions

Stop and request a decision when any next action would:

- select or create a component's shared integration ref;
- resolve a merge conflict whose alternatives change behavior;
- change normative meaning, public API, compatibility, security posture, or
  dependency ownership;
- accept or suppress nondeterminism rather than prove its cause;
- select required checks, review counts, repository visibility, or secret
  distribution;
- change which branch is the declared integration ref;
- tag, publish, deploy, or promote a numbered cohort.
