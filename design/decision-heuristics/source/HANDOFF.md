# Handoff: JSONata evaluator API loop and the design decision procedure

Written 2026-09-19 for another AI system to continue from. Read this
whole file before touching anything. The container repo's `CLAUDE.md`
(`/Users/matt/Code/ob-pj/CLAUDE.md`) covers workspace mechanics; the
memory index at `/Users/matt/.claude/projects/-Users-matt-Code-ob-pj/memory/MEMORY.md`
covers how Matt works. Both are authoritative over this file.

## Standing constraints (from memory; do not violate)

- Never push, deploy, merge, tag, or open PRs without explicit approval
  in the current turn. Pushes of a loop branch were approved only for the
  loop described below; that approval has lapsed.
- No Claude attribution on commits or PR bodies.
- No em dashes in prose. Monospace only for code.
- Matt decides OpenBindings-specific design; implementation questions
  with an external oracle are decided directly with the oracle cited.
- Present rulings as full stories from zero, not terse option menus.
- LLM panels surface arguments, not verdicts; do not re-run a panel to
  confirm a verdict.
- Read a file before overwriting it. Never hand-edit OBI schemas.
- Matt's own prior rulings are revisable precedent; Core and the
  incorporated upstream authority are the only things that cannot be
  wrong. Shipped behavior is never authority.

## 1. What is landed and durable

**`openbindings/jsonata-evaluator` (public repo, `main`, squash-only).**
- `README.md`: the evaluator-class definition (nine membership rules,
  "documentation as authority, host as value model", the regex-engine
  framing). Matt approved it; every panel says it is the weakest artifact
  (see ruling 6 below). Frozen until Matt rules.
- `go/jsonata/jsonata.go`: the Go member's public API as a compilable
  stub (signatures and doc comments as they would ship, bodies
  `panic("unimplemented")`). Six loop iterations produced it. `gofmt` and
  `go vet` clean; `example_test.go` and `assert_test.go` beside it.
- `go/jsonata/DIVERGENCES.md`: the member's declared-divergence ledger,
  fifteen rows, each with an authority class (documentation,
  incorporated, interpretation, value model, engine); two rows pending
  (`$round` basis; regex dialect).
- `design/api-loop/`: `LOOP.md` (the loop charter), `RULINGS.md` (the
  twelve rulings with every panel's arguments, ~700 lines), `FINAL.md`
  (outcome, grade trajectory, the iteration-7 Apply bin that was never
  applied), `iteration-1..6/` (changelogs, grade tables, thirty verbatim
  panel reports).
- Landed via PR #13, squash `c908947`. Branch deleted. Issues #1 through
  #12 filed, one per ruling, numbered to match `RULINGS.md`.

**`openbindings/spec`**: PR #120 merged (squash `d7fba38`): §5.5 now says
the reference implementation is informative and conformance is to the
documentation, not to any implementation.

**`openbindings/project`**: PR #19 open, unmerged (catalogs
`jsonata-evaluator` with `integrationRef: main`, `cohortTier: extended`,
adds it to `cohorts/0.2/next.json`). `npm test` passed. Needs Matt's
merge. Untracked non-mine file in that checkout:
`cohorts/0.2/openapi-implementation-qualification-loop.md`; leave it.

**Container repo `ob-pj`**: `CLAUDE.md` lists `jsonata/` (reference only)
and `jsonata-evaluator/`. Committed on `main` (`2420c526`).

**Memory**: `project_jsonata_evaluator_class.md` updated with the loop's
outcome and the twelve issues. `feedback_spec_is_document_model.md`
records Matt's ruling that the spec never rules on implementation
behavior.

## 2. The API loop: what happened and where it stands

Six iterations, five cold-read lenses per iteration (Go idiom purist,
application integrator, PL/spec skeptic, JSONata practitioner, one
rotating: security, technical writer, JavaScript-member author,
performance engineer, security, technical writer). Medians (overall):
B-, B, B, B, B+, B, B-. Correctness floor never above B-; the loop
stopped on its cap. Every late deduction cited a ruling-queue item.

The twelve rulings (issues #1 to #12 on `jsonata-evaluator`), with the
recommendation on record:
1. Output object type (carried `map[string]any` vs constructed `*Object`): keep the split, add an opt-in uniform exit.
2. `Select` path shape: single key plus a separate `SelectPath`; `Field` handles deferred.
3. `Evaluation` concurrency: single-goroutine by rule.
4. Regex dialect (the blocking item, flagged by all thirty reviewers): Go `regexp` (RE2), declared, unsupported constructs refused at `Compile` and `$eval`. **Verified today: the pinned documentation's regex page (`website/versioned_docs/version-2.1.0/regex.md` at commit `5d1473277e0022d8580e00f891b12080eb3edd74`) names no dialect; it says only "the familiar slash delimiters found in many scripting languages", flags `i` and `m`, and describes the matcher-function contract.** So the authority is silent; Matt's day-one framing ("Go's regexp since the docs name none") stands. This was never applied to the stub.
5. Ship protobuf/struct Resolver implementations: defer until an SDK consumer exists; subpackages then.
6. The class README: rewrite so the value model is stated as the class's (a language-neutral document under `suite/`), with an authority precedence and a divergence rule that permits the ledger's own grounds. Eleven reviewers across four lenses reached this independently. Ground: Matt's.
7. Delete `Close`: conditional on 3.
8. Numeric model: 8a `$round` on decimal digits (recommendation revised to this); 8b refuse-vs-round-once on mixed integer/decimal arithmetic (**genuinely Matt's; he has not ruled**; recommendation round once with refusal reserved for the unrepresentable); 8c integrality boundary (three positions; latest recommendation: kinds by representation, a float64 is never an integer by value, comparison across kinds by value, substitutability within a kind only).
9. Typed exit (`Canonical`, `Decode`): `Canonical` deferred pending a consumer under the corrected procedure; `float32` renders as its float64 widening.
10. Decimal decode boundary: a decimal token becomes float64 at decode.
11. Decoder stance: duplicate-key and surrogate refusals are the decoder's declared stance, relabeled in the ledger.
12. Absence: keep `(value, present, err)`.

**None of the twelve resolutions has been applied to the stub.** The stub
on `main` is the iteration-6 state. Applying them, plus the eighteen-item
iteration-7 Apply bin in `FINAL.md`, plus a `suite/` value-model document,
is the next concrete step for the evaluator; Matt approved that plan in
principle ("Good. Do 1 and ...") but then redirected to the procedure
document below and has not re-approved pushing anything.

## 3. The design decision procedure: what it is and where it stands

Matt's ask: a set of heuristics that would have resolved the twelve
rulings autonomously, so future loops do not stall; then, "run a bounded
pass where a design panel grades that document first"; then, "apply the
same loop mechanism to the document ... until we get higher grades, and
end at about an average A."

The document lives only in the scratchpad (ephemeral; copy it out):
`/private/tmp/claude-501/-Users-matt-Code-ob-pj-openbindings/a31d23d1-5ea7-4ef2-a8ca-d806cc42f9a6/scratchpad/decision-heuristics.md`
(draft 2), with the loop's records under
`.../scratchpad/heuristics-loop/` (`LOOP.md`, `iteration-1/` with draft
1's five reports, grades, changes, and `draft-2-after.md`;
`iteration-2/panel/` with draft 2's five reports). Intended durable home:
`openbindings/project/policies/decision-heuristics.md`, with a memory
pointer. Matt said it must read as project design guidance, not as his
personal decision doc.

Draft 2's shape: Terms; step 0 classify the ground (a: Core or doctrine
binding more than one artifact; b: incorporated authority; c: local
doctrine; d: implementation surface); step 1 authority cascade with a
ladder for authorities that speak twice and a fenced "adopt the reference
where silent" step; step 2 the twelve ratified design rules as yes/no
tests plus proposed rule 13 (bounded cost under adversarial input), with
rule 8 split into 8a (loud, not quiet) and 8b (one outcome per input);
step 3 lexicographic precedence; step 4 record with `D-N` labels,
stickiness, instability, batch review; what escalates (hard stops vs
flags); eleven "precedents from the first loop" (P1 to P11); the twelve
worked examples re-run (ten decided, two flagged).

Grades: draft 1 overall C+, B-, C+, B-, C- (mean C+); draft 2 overall
B-, B-, C, B-, C+ (mean about B-). Gate: mean A- with no row below B, or
two clean panels, or six iterations.

**Iteration-2 findings, triaged but NOT yet applied (this is where work
stopped).** Convergent, apply-bin:
- Confidence labels contradict their definition in most rows; make it derivable: `inferred` if any deciding or neutralizing rule is proposed or a precedent, or the authority was unread, or it depends on a flagged item; `medium` if step 3 was applied; `high` otherwise; add `arbitrary` for coin tosses, sorted last.
- Rule 13 is proposed yet ranks second; a proposed rule decides only at `inferred`. Its test must exclude costs the artifact's existing limits already bound (example 1's rule-13 claim was false; three lenses). Its real use is example 4.
- Step 1.2's fence is self-contradictory ("a function's result" is a value question); redefine "value question" as a value-model question (kind, representation, conversion, rounding basis); record step 1.2 adoptions as `reference-adopted` ledger rows with the reference named at a commit; fence 1.2 to charters that name a reference.
- Step 0's tie-break flags every value-model question; replace with a split record: decide the instance in the artifact (c/d), file the class-text gap as a ground (a) flag with the decision as its recommendation; the loop never writes class text as a decision. Rows 4, 8a, 8c, 10 lose "pinned as a class algorithm" and gain "candidate class rule".
- Split "consumer" (rule 11: a caller at a commit, an issue not filed by the loop, or a named integration point) from "audience" (rules 5, 7, P3: the artifact's declared readership, named once in its header and used for every question). Then row 9's `Canonical` must be deferred like row 5's Resolvers, or the difference stated.
- Stickiness clause 2 (a new lens repeating a recorded counterargument reopens) generates churn; replace with a re-raise counter. Unstable items pin at the higher-confidence answer.
- Example 4 contradicts the "bound traded against fidelity" escalation bullet; now that the page is verified silent, rule 13 decides it at `inferred`, and the bullet becomes "rule 13 never overrides a step 1 answer; where it would, flag with the bounded option kept".
- The cross-repository bullet is always-on or never-on; replace with: flag when the decision adds or changes a shared conformance fixture's expected value, or conflicts with what another repository already does or has recorded; otherwise record the cross-repo dependency as precedent for the other loop.
- P5 as written keeps `Close` (its own borrow-window exemption); fix: "a window no code enforces and no resource backs is not a job"; row 7 cites P3's `sql.Rows.Close` releasing a resource the Evaluation does not hold.
- Row 3 cites 8a for a scheduling case that is 8b's text; fix the citation.
- Quoted laws, contracts, and audiences must exist at the commit the iteration began from (text the loop added under a `D-` label is loop precedent, not a law); a law must predate the question, not only the finding; define "silence" (quote the nearest passage; both options expressible in the authority's vocabulary; neither chosen).
- Batch review: silence is Keep for `high` rows only; flagged rows need an explicit Keep, Reverse, Rule, or ship-with-hole; Reverse is one word and the loop performs the edit in one closing iteration; Rule is one line and the loop drafts the general form; the table is the PR body; mid-loop reads allowed.
- Dependency record: every apply-bin edit that assumes a decision names its `D-` label; a Reverse or flip re-runs dependents before the next panel; grades citing a decided item with no new case count toward the blocked condition; labels stripped or moved to the ledger on landing.
- Define charter vocabulary (lens, panel, apply bin, decide bin, pinned, blocked) or remove it; fix "the rule cites" (no antecedent); say a schema is normative only where the authority's prose says so.
- Add flags: amending the procedure or a loop's own charter; adding a dependency to a core package. Define "contract" as behavior or signature, so fixing a wrong example in published docs is not a contract change. "Exceeding the charter's budget" instead of "spending money".
- The 8b/8c/P11 cycle: fold P11 into the 8b flag; 8c decides the instance at `inferred` with a candidate class rule.
- Add proposed rules the API reviewer showed the examples actually use: "pay for what you use" (ranks with 5), "prefer the reversible option" (a method for deferrals). Do not strike ratified rule 4; note "uniform unless meaningful" as a candidate for Matt.
- A loop over Core produces ruling packages, not decisions; say so.

Expect draft 3 to land around B to B+; the gate will take several more
iterations and the panels are expensive (about 100K tokens per reviewer,
five per iteration). Consider fewer lenses per iteration once the
convergent defects are gone, or a smaller model for the cold-applier
runs.

## 4. Open questions only Matt can answer

- Ruling 8b (refuse or round once). Everything numeric downstream (8c,
  P9, P11, the ledger's two pending rows) depends on it.
- Whether the class README rewrite (ruling 6) may proceed as a loop
  recommendation for him to sign.
- The precedence order in step 3 (he said "seems good", then asked for
  the panel pass; treat the order as provisional).
- Where the procedure document lands (my suggestion:
  `openbindings/project/policies/decision-heuristics.md`).
- Merge of `openbindings/project#19`.
- Two task chips pending from earlier: fix red CI on spec `release/0.2`
  (GraphQL synthesis fixture) and a Dependabot triage.

## 5. Facts verified this session (do not re-verify; cite)

- jsonata-js 2.1.1 (vendored at `openbindings/spec/conformance/operation-graph/runners/js/node_modules/jsonata/jsonata.js`): `$string(1234567890123456789)` is `"1234567890123456800"`; `$string(0.1+0.2)` is `"0.3"`; `$replace` reads `$0` as the whole match and `$12` with one group as group 1 followed by `2`; `$x ?? "d"` with `$x` null is null; `$round(11.5)` and `$round(12.5)` are both 12; range cap D2014 is 1e6; `$power` overflow is D3061; caller bindings shadow built-ins (child frame of the built-ins frame).
- Go `encoding/json` renders float64 with `JSON.stringify`'s notation thresholds (`1e6` as `1000000`, `1e21` as `1e+21`, `1e-7` as `1e-7`) but escapes U+2028/U+2029; `strconv`'s 'g' format does not match.
- `1758000000000000123 / 1000000` rounded once to float64 renders `1758000000000.0002`; `float64(9007199254740994) + 1` is `9007199254740996` (substitutivity across kinds fails under any rounding rule); Go `strings.ToUpper("straße")` is `"STRAßE"`.
- The pinned JSONata regex page names no dialect (fetched today; text quoted in section 2, item 4).

## 6. Where the ephemeral files are

Everything under
`/private/tmp/claude-501/-Users-matt-Code-ob-pj-openbindings/a31d23d1-5ea7-4ef2-a8ca-d806cc42f9a6/scratchpad/`
is session-scoped and will vanish. Copy `decision-heuristics.md`,
`heuristics-loop/`, and this file somewhere durable before doing
anything else (a branch on `openbindings/project` under `design/`, or
the container repo, both with Matt's say-so for any push).
