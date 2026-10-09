# Component development and CI

Approved by Matt on 2026-10-09. Ordinary development is qualified by each
repository's own CI. Automatic project-wide cohort integration, weekly
reconciliation and ongoing legacy Go/TypeScript export symmetry are retired.
This supersedes the former development-line loop's caller-installation and
automatic candidate-cohort steps.

## Ordinary development

1. Read `repositories.json` for the declared integration ref. Use a clean
   isolated branch; preserve other local work.
2. Run the component's build/type checks, existing formatting/lint checks,
   ordinary tests and supported-host/package checks. Dependencies and authority
   inputs use compatible fixed revisions, not moving sibling branches.
3. Open a PR to that integration ref. Require its applicable component checks;
   squash-merge and verify the resulting commit. Passing an upstream library
   does not qualify a consumer that has not adopted it.
4. A consumer dependency-update PR runs that consumer's real integration tests.
   Do not install a project-integration caller or update the candidate cohort
   merely because a component changed.

Each maintained repository exposes an ordinary `ci` result. A single job can
provide it directly; a multi-job result must reject failed, cancelled or
unexpectedly skipped mandatory jobs. Keep the existing useful native/browser
coverage. OpenAPI's separate legacy checks remain required while those
implementations remain transitional dependencies.

Workflow changes are verified before replacing required-check names. Preserve
branch history protections and actual behavioral tests. An obsolete obligation
can be removed under this policy; a still-applicable failure cannot be skipped
to obtain green. Missing required fixtures/dependencies are failures.

Publishing, signing, tags, package releases, live deployment and repository
visibility remain separate decisions under existing release policies. This
policy neither adds release automation nor changes integration branches.

## Historical project qualification

`working-loop.json`, existing cohort manifests, replay scripts and their tests
retain historical evidence. Numbered cohort records remain immutable. The
ordinary `npm run loop` command reports current branch routing; use its explicit
`--historical` option only to inspect the former plan.

During CI cutover, `integration.yml` remains callable until its seven component
callers have been removed. Thereafter it is a manual historical replay only.
It is not the current Rust release verifier. Known legacy JSONata access and
removed Go module-path failures remain unresolved by this policy; real consumers
must still resolve their own dependencies or report a failing check.

If a maintainer deliberately assembles a new cohort, select exact post-merge
SHAs and collect fresh evidence for its entire stated scope. Never mark a
candidate verified, promote a numbered cohort or infer release readiness from
ordinary component CI. A new automatic coordinator requires a concrete need
and a separate design decision.
