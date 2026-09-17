# Value API reliability verification

`evidence.mjs` records bounded commands and collects immutable assertion reports.
`run.mjs <configuration.json>` runs one command; its JSON configuration supplies
the run root, frozen selection, argument array, working directory and lane.
`reports` lists structured files the command writes. Their hashes are bound to
that command at exit. Fresh collection rechecks every declared report, including
raw suite and coverage reports underlying derived observations. Missing, changed
or duplicate declared reports reject. The collector never manufactures assertions
from logs.

Commands run in owned POSIX process groups. Deadline and log-overflow termination
include wrapper descendants; normal wrapper exit also ends remaining group work.
Output draining and group cleanup are bounded, and cleanup failures reject
qualification. This is for controlled commands on POSIX hosts, not a sandbox for
programs that deliberately escape their process group.

An observation report has format `value-reliability.observations@1`, the command
ID and selection digest provided in `VALUE_RELIABILITY_COMMAND_ID` and
`VALUE_RELIABILITY_SELECTION`, its lane, an executed/skipped/failed summary,
and observations with assertion ID, status, actual check count and evidence
kind. Every report must be a recorded command output. Every required assertion
and lane comes from the acceptance manifest and frozen resource inventory.

The ordinary Project test command discovers `../value-api-reliability.test.mjs`.
It tests valid completion and invalid evidence, independently of the packages.
Run directories and private package cohorts are supplied by the caller; this
tooling changes no integration reference and promotes no verified cohort.

`pack.mjs <worktree-root> <new-staging-directory> <version-stamp>` packs the three
clean, committed sources. It records every shipped file and dependency-version
substitution. `prepare-consumer.mjs <config>` extracts the shipped README examples,
adds independently specified expectations, and builds the browser consumer.
Fixtures in `fixtures/` accept JSON configuration with explicit paths; they never
choose a checkout, acquire a dependency, publish, or rewrite an existing report.
The `node`, `browser`, `types`, `resource`, `negative`, `artifact`, and `regression`
fixtures separate runtime assertions from inspection and command-outcome proofs.
The resource fixture requires the JSONata owner's capped supervisor and executes
each resource assertion in a fresh child. Browser executables and actual versions
are supplied and checked explicitly. Negative controls use preserved archives and
one narrowly disabled private checkpoint, without altering candidate sources.

Freeze sources, archives, lockfiles, tools and fixture inputs before qualification.
A selection's `externalInputs` are absolute source/tool/consumer file paths and
SHA-256 values, rechecked by collection; its `files` are immutable files within
the run root. Keep generated reports outside those input sets. Commands declare
all report paths in advance. Do not create PASS observations from suite totals;
`regression.mjs` validates the actual structured suite results and separately
recorded command outcomes. Assertions identify their exact acceptance ID and lane.

Closure has two intrinsically terminal propositions: that this fresh collection
accepts the complete selection, and that every required observation is present.
With `close: true`, `collect` derives `CLOSE-01.1` and `CLOSE-01.3` only after
validating every other obligation; it refuses externally supplied PASS records
for these two. The returned certificate contains these observations. The CLI
`collect.mjs <config> <new-output-relative-path>` writes the certificate and its
process identity; its enclosing recorded command binds the certificate hash and
actual successful exit. Collection never rewrites raw observations. First run
the ordinary closing checks, collect, then run `close.mjs` with that collection
configuration to corrupt disposable copies of the complete evidence, select its
new closing report, and collect once more in a fresh process. Earlier attempts
remain intact; the selected command/report lists make supersession explicit.
