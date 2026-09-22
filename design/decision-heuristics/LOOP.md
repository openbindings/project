# The decision-procedure loop

Iterates `decision-heuristics.md` (the project's design decision procedure)
the way the API loop iterated the Go member's stub: five cold reads per
iteration, the objectively positive findings applied, repeat.

Lenses, fixed: the cold applier (runs three new questions through the
procedure exactly as written), the senior API design reviewer, the
specification and consistency skeptic, the engineering process lead, the
adversarial reader. Same rubric every time: decidability, internal
consistency, generality, escalation boundary, clarity and tone, overall.

Apply bin: a contradiction between two sentences; a term a cold reader
cannot resolve; a step that halts with no output on a stated input; a
worked example that does not follow from its cited rule; a gap two or more
lenses converge on; a factual error. Everything else is recorded as
rejected with a reason or as a question for the maintainer.

Stopping: the mean of the five overall grades is A- or better with no
individual row below B, or two consecutive panels produce no apply-bin
findings, or six iterations.

Records: `iteration-N/panel/` (five reports verbatim), `iteration-N/CHANGES.md`,
`iteration-N/grades.md`, and the draft after the iteration.
