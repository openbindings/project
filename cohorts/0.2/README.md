# OpenBindings 0.2 cohorts

`next.json` is the mutable candidate for the next verified OpenBindings 0.2
cohort. Numbered files such as `0.2-r1.json` are immutable verification
records.

The initial candidate pins commits reachable from the repositories' current
remote integration refs when project coordination was introduced. It does not
include unpublished local commits. Several repositories still use explicitly
named prerelease integration branches; `repositories.json` records those
temporary development refs. A verified cohort always records commits rather
than branch names.
