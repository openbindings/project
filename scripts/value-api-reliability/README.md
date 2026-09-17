# Value API reliability verification

`evidence.mjs` records bounded commands and collects immutable assertion reports.
`run.mjs <configuration.json>` runs one command; its JSON configuration supplies
the run root, frozen selection, argument array, working directory and lane.
`reports` lists structured files the command writes. Their hashes are bound to
that command at exit. The collector never manufactures assertions from logs.

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
