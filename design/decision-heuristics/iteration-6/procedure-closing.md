# Design decision procedure

Draft 6, closing revision, 2026-09-19. Proposed project guidance for reviewers and agents
improving specifications, interface contracts, and public APIs. This draft
does not amend Core, ratify its own proposals, or authorize publication.

The procedure lets a design loop resolve local questions, explain the
choice, and continue. Questions that require a maintainer's decision become
reviewable recommendations while independent work proceeds. Review grades
measure the document's usefulness; they do not decide product design.

## Set up the loop

A **loop** repeats review and revision of an **artifact**, such as a package
API or a specification. A **lens** is one review perspective; a **panel** is
the set of independent reviews of one unchanged draft. Its charter records:

- The artifact and baseline commit, scope of edits, and existing authority
  and ruling records. A snapshot hash identifies uncommitted input.
- Its audience, responsibilities, and supported use cases, quoted from
  existing text. For a new artifact, use the authorized task brief. Missing
  descriptions may be proposed, with assumptions recorded; the loop cannot
  turn its own descriptions into established constraints.
- Known readers of its observable boundaries, including other repositories,
  shared fixtures, and available integration points. Record the search scope
  and unavailable repositories; an unsearched boundary is unknown, not empty.
- Review lenses, rubric, iteration and resource budgets, and stopping rules.
  Use the same rubric across drafts. Stop at the charter's cap, at its quality
  gate, or when all remaining deductions concern held decisions and supply
  no new evidence. Report which condition ended the loop.
- Which actions are authorized, which require explicit approval, and where
  to keep the decision ledger and batch review.

Do not change the audience to favor an answer. An artifact with several
audiences names them and their boundaries at setup, then compares the effects
on each applicable audience. Do not invent a different audience per option.

The **apply bin** contains verifiable corrections: contradictory sentences,
wrong examples, unresolved terms, or behavior violating an existing promise.
The **decide bin** contains choices among acceptable designs. Agreement among
reviewers helps discover evidence; agreement on preference is not a verdict.
Both bins pass the authority and scope checks below before an edit is applied.

## Terms that affect decisions

**Authority** means Core within its subject and the upstream text actually
incorporated by the governing specification or artifact, on the stated terms.
Core defines the OpenBindings document model; it does not acquire authority
over an implementation merely because that implementation uses OpenBindings.
A schema, example, implementation, or cohort test has only the standing its
governing text gives it. Shipped behavior alone is never authority.

**Contract** means promised behavior or a public signature. Fixing an example
to match an unchanged contract is a correction, not a contract change.
An existing local contract supplies a correction target and a change-impact
baseline; it does not become semantic authority that forbids redesign.
**Published** means offered as stable for outside use: a release, immutable
interface version, stable documentation, or explicitly supported commit.
A mutable public working draft alone is not stable. Record evidence of its
status; uncertain publication status holds a potentially breaking change.

**Consumer** is evidence that an addition is needed: calling code at a commit,
an independently filed issue naming a use, or an authorized, named integration
point with a concrete first-use scenario. It need not already be implemented.
The audience tells us whom to design for; a consumer tells us why to build an
optional facility now. Reviewer sketches and issues filed by the loop are
arguments, not independent demand. Committing a synthetic caller, test, or
example does not turn it into a consumer: caller code must serve an
independently established use or an authorized integration, and the record
links that provenance. Code created solely to justify the proposed facility
does not qualify, even at a commit. The artifact's authorized first-use scenario
is sufficient for its essential operations; a new API need not have callers
before its first release. To call an operation essential, quote that scenario
and show which required outcome is impossible without the capability, after
considering existing operations and a smaller option. A preferred convenience
is not essential merely because the loop describes it that way; it can still
be justified through concrete consumer evidence and the ergonomics comparison.

A **case** identifies an input or caller task, the candidate options' observable
outcomes, and the evidence for judging them. For correctness, quote the
existing promise; for ergonomics, show both calling sequences and an applicable
idiom or actual caller. An unfamiliar preference is still discussable, but
cannot be relabeled a correctness defect.

**Precedent** is a previous decision with its scope and rationale. A maintainer
ruling needs a link to the recorded acceptance, not an inferred endorsement.
It remains revisable; apply it within its explicit scope. A new instance whose
coverage is uncertain requires reaffirmation: hold an edit that relies on the
ruling or could conflict with it until scope evidence or authorization resolves
that uncertainty. A choice independently justified and consistent with every
plausible reading may proceed, with that reasoning recorded. Text introduced by this loop
remains proposed precedent across iterations, even when it now appears in
the artifact. A claimed law must predate the question, not just the finding.

## 0. Identify what would change

Name the actual behavior and owning artifact before selecting a rule.

- Applying an existing authority is an interpretation question: go to step 1.
- Changing Core, a shared doctrine, or a shared conformance expectation is a
  recommendation for its owner. A loop over Core can correct text against
  established meaning, but produces ruling packages for changes of meaning.
- A convention confined to one artifact is a local doctrine question.
- A signature, host representation, error channel, or resource limit confined
  to one implementation is a surface question, even if written in its README.

Split mixed questions. A member can choose a local behavior where its current
governing contract permits discretion, while separately recommending a class
rule. Record the latter as a **candidate class rule**; do not edit shared text
or claim portability on its strength. If the existing class text forbids the
local choice, splitting the record does not make the choice permissible.
When ownership remains unknown, hold that part and state what evidence is
missing. Continue the parts whose ownership is established.

## 1. Find the governing answer

Read the incorporation clause, relevant passages, their cross-references, and
applicable examples at the pinned edition or commit. Quote the decisive short
passage and cite its location. First honor the authority's own precedence and
scope: an incorporated algorithm is binding where the text delegates to it.
Do not substitute a different host's numeric or value model inside a required
algorithm unless the governing text permits that substitution.

An informative example or reference behavior cannot override normative text.
A schema is normative only where its governing text gives it that status.
Conflicting normative passages or incorporated authorities with no stated
priority require a recommendation identifying the conflict. Do not settle
them by counting examples or selecting a convenient reference implementation.

Distinguish four outcomes:

1. **Answered.** Apply the answer within the authorized scope. If the proposed
   change crosses a boundary in step 4, record the answer but hold the edit.
2. **Silent.** Quote the nearest relevant passage and explain why neither
   option is selected. Absence from a list expressly defined as exhaustive is
   an answer, not silence. A question outside the text's vocabulary, such as
   a host API shape, is outside its scope; record that distinction.
3. **Unread.** Record the failed source lookup and the specific uncertainty.
   Draft a local recommendation at inferred confidence. Hold edits whose
   conformance depends on the unread source; unrelated edits may proceed.
4. **Conflicted.** Quote the incompatible requirements and why neither has
   priority. Hold the affected decision and prepare an owner recommendation;
   do not run this conflict through preference tests. Unaffected work continues.

Under silence, adopt an observable reference behavior only if the charter
names that reference and the case changes neither the value model (kinds,
representations, conversion or rounding basis), host API surface, nor resource
bounds. The charter must designate one reference or a priority for overlapping
scopes before the question arises. If named references disagree without that
designation, record both observations and continue through the design tests;
neither qualifies for automatic adoption. Record the probe, reference commit or immutable package identity, and
result in a **reference-adopted** ledger entry. This is an explicit local
completion, not a normative reading and not proof of conformance. An upstream
implementation bug that conflicts with the text is ineligible. If the probe
is unavailable, continue with a proposed choice at inferred confidence.

All other open questions proceed to the design tests. No design preference,
including a resource bound, overrides an answer from authority. If faithful
support cannot meet the required bound, recommend a declared refusal or a
restricted domain and hold the affected feature; do not call it conforming
unless the governing contract permits that restriction.

## 2. Compare concrete options

Include the incumbent, a viable alternative, and a smaller or deferred option
when one would meet the use case. Show the strongest known case for each.
Prefer an actual prior review's objection to an objection invented to be easy
to dismiss. Record the source. No fixed option count substitutes for checking
whether a third option removes the conflict.

The twelve headings below are the project's recorded design principles. The
tests, their ordering, and the operational distinctions in this draft are
proposals for applying them. They are not additional ratified doctrine.

| Principle | Test |
| --- | --- |
| 1. Two grounds of truth | Did step 1 identify the applicable Core or incorporated authority, without giving implementation behavior that standing? |
| 2. Support exactly what upstream supports | Within the declared supported domain, does behavior match upstream? Refuse unsupported cases only on grounds the governing contract permits. Do not add language features merely because upstream is silent. |
| 3. Every layer claims exactly its job | Against the recorded responsibility, does an option move work into the wrong layer or claim an effect it does not provide? A new helper within that job is not forbidden merely because it is new. |
| 4. Suspect uniformity that couples | What does sameness buy for a caller, and what dependency or conversion does it impose? Uniformity alone supplies no answer. |
| 5. DX is supreme inside the constraints | Among admissible designs, compare the correct common calling paths, their explanation, and their failure recovery for the declared audience. |
| 6. Zero config to start | Can the first supported use work with defaults? If no safe default exists, explicit input beats an invented value. |
| 7. Delegate to formed expectations | Which option fits an existing idiom for this kind of operation and audience? Choose analogues by structure before comparing names. Conflicting analogues are evidence on both sides. |
| 8. Predictable and loud | Does correct use produce the promised value or an explicit failure? Does the same admitted input and environment have the same observable outcome under equivalences the contract already promises? |
| 9. Substitutability is the payoff | Could independent implementations following the text disagree on a promised portable result? Write an input and both permitted outcomes; merely choosing different host types is not a failure. |
| 10. Rule the general form | State the scope and conditions of the choice so the next instance can be recognized without extending the decision silently. |
| 11. Challenge gaps before filling them | For an optional addition, identify its consumer and a demonstrated shortfall in existing operations: missing behavior, repeated implementation work, or concrete calling or recovery costs. Otherwise defer, stating what evidence would reopen it. |
| 12. Systems serve shipping | Does the proposed work advance an authorized use case, or make unrelated infrastructure a prerequisite? Remove unnecessary prerequisites. |

For rule 8, distinguish a wrong result under correct use from foreseeable
misuse. Ignoring a documented error or presence flag is misuse, evaluated for
ergonomic risk under rules 5 and 7. A new disclaimer does not erase an existing
guarantee. A narrower new contract must itself be compared as an option, with
its restrictions visible. In arithmetic, equivalent spellings and regrouping
are tested only where the established model promises equivalence. Floating
point associativity is not assumed. A proposed definition of numeric kinds
cannot be used to prove its own predictability.

Three additional proposals make recurring tradeoffs explicit:

- **13. Bound adversarial cost.** Name the resource, input, existing limits,
  enforcement points, and an admitted case that escapes them. A finite cap
  that stops work too late is not effective. Compare enforceable bounds in
  all viable options. Already bounded work belongs in the performance and
  ergonomics comparison; a linear conversion is not inherently unbounded.
- **14. Pay for what is used.** Compare compulsory work with an optional path
  for callers who need it. Include the branching and explanation cost of
  that optionality. This proposal ranks with rule 5, not above correctness.
- **15. Prefer a reversible deferral.** When deferring optional work, retain
  the smallest extension point the actual use requires. Do not build a
  speculative framework to preserve every conceivable future option.

Rules 4 and 10 shape the comparison. Rules 11 and 12 decide whether optional
work is needed before its design is optimized. They never defer an obligation
from step 1 or an essential authorized first-use scenario. Proposal 15 guides
that deferral. Required work with missing design evidence gets an explicit
assumption or a held recommendation, not a fictional consumer.

## 3. Resolve competing reasons

Discard options violating a governing answer. For the remaining options, the
trial order is lexicographic: a stronger applicable reason is not outvoted by
several weaker ones. Record applicable claims for every option at each level.
Remove an option only if another remaining option does at least as well on
every supported case at that level and better on at least one, with no
supported countercase. Continue with all survivors at the next level. Opposing
supported cases are neutral at that level; evidence need not be quantitatively
equal. A claim whose applicability is uncertain cannot eliminate an option:
record the assumption and keep both for comparison. Unknown admissibility is
held under step 4; uncertainty about merit can yield an inferred local choice.
This same comparison handles two or more options. Perform one elimination
pass after each of these stages, assessed over the same surviving set; do not
remove options sequentially within a pass:

1. Proposal 13: effective resource bounds.
2. Rule 8: predictable outcome.
3. Rule 8: visible failure.
4. Surface questions: rule 7. Local doctrine: rule 3.
5. Surface questions: rule 3. Local doctrine: rule 7.
6. Rule 9: agreement at the promised portable boundary.
7. Rule 5 and proposal 14 together: caller effort and compulsory work. This
   is the only deliberately combined stage.
8. Rule 6: the first use with defaults.

Do not choose a different rule name to hide the other side's stronger case.
If the ordering determines the answer, its provisional status remains in the
record. If several options survive all stages, apply these fallbacks to that
surviving set, in order. Retain the incumbent only if it survives. Otherwise
remove every strict surface superset of another survivor, requiring identical
behavior for every retained operation; incomparable surfaces remain. Then keep
only candidates with the fewest distinct direct runtime package or module
dependencies newly declared relative to the pinned baseline. Count dependency
identities in that ecosystem's manifest, not import sites or transitive
packages; development-only dependencies do not enter this mechanical fallback.
Resource or compatibility costs of any dependency belong in the earlier
substantive comparisons. Finally choose the complete
option text first in Unicode code-point order. Freeze those texts before
comparing them. Never reintroduce an option eliminated at an earlier stage or
fallback. Record an
**arbitrary** tie-break. This gives a reproducible default, not design merit.

## 4. Decide locally or hold a recommendation

First check authorization. Stop only the affected action when it exceeds the
charter's resources or requires authorization not already given, including a
push, merge, publication, deployment, or release. The procedure supplies no
authorization through silence. Independent authorized work continues.

Hold the edit and prepare a **flagged** recommendation when it:

- Changes Core meaning, shared doctrine, or a shared fixture's expectation.
- Changes a published contract without existing approval for that change.
- Conflicts with another repository's recorded behavior at a shared boundary.
  Search the readers named at setup and record what was checked. Merely being
  useful as precedent for a future implementation does not trigger this flag.
  If a relevant reader's contract cannot be inspected, hold edits whose
  compatibility depends on that missing evidence; do not assume no conflict.
- Trades conformance against a bound, or depends on unavailable authority.
- Extends or reverses a maintainer ruling without clear authorization, adds a
  dependency to a core package, or amends this procedure or the loop's charter.

Explicit authorization covering a flagged change permits the described edit,
but cannot make a source contradiction conforming. Record the authorization
and scope. A loop commissioned to revise this procedure may revise its draft;
it cannot ratify new rules or change its own review gate on that basis.

For a held item, retain the current behavior if it satisfies existing
requirements. If no valid behavior exists, mark the feature unsupported or
the document incomplete in the review artifact. Do not invent a consumer-facing
promise to fill a hole. Such a hole blocks a completeness claim or publication
that requires the missing behavior, not independent revision work.

## 5. Record, review, and revisit

Give each choice a stable decision label in the loop's decision ledger. A
temporary annotation or source-location link connects the artifact to the
record. Every edit that depends on a choice records that label, including
tests and examples. The ledger contains:

- Question, scope, edit status (applied, deferred, or held), review status
  (pending or accepted), chosen answer and adoptable alternative; strongest
  objection and its source. A proposed rule needs separate ratification;
  accepting one local choice does not ratify its general rule.
- Baseline, governing quotations, evidence, applicable and neutralized rules,
  deciding step, assumptions, and searched dependencies.
- Confidence, decision and edit dependencies, affected locations, review
  re-raises, and the evidence or authorization needed to reopen a held item.

For a compelled correction with no admissible alternative, record “none within
the governing constraints” and the decisive requirement. Do not invent a
choice that violates the contract merely to complete the ledger.

Derive confidence in this order:

1. **Inferred** if a deciding or neutralizing premise is proposed, a precedent,
   unread, an unresolved or unverified factual assumption, or relies on a held
   or inferred decision. Irrelevant uncertainty does not lower confidence.
   Reference adoption and
   a result that depends materially on this draft's new operational tests are
   inferred. Merely listing an unused proposal as background does not count.
2. **Arbitrary** for a residual tie among otherwise supported options. If its
   acceptability depends on an inferred premise, use inferred and note the tie.
   The mechanical fallback itself is exempt from the proposed-test trigger:
   it asserts no design merit. Proposed or uncertain premises used to admit
   options or neutralize substantive reasons are not exempt.
3. **Medium** when a material premise depends on a medium decision, or
   established competing principles require an ordering already
   accepted for the loop. Until this draft's order is accepted, using it is
   inferred under the first test.
4. **High** when a read authority or established principle decides directly
   with no such dependency. A correction exactly required by text can be high
   even when publication scope holds the edit. Status and confidence differ.

For a non-authority design choice to be high, cite recorded acceptance of the
principle's operational test for this class of question and show that it
decides without a proposed premise. Merely citing a ratified heading is not
enough. Accepted precedent is still precedent unless that acceptance expressly
adopts the general test; neither a restated label nor a new iteration upgrades it.

An arbitrary dependency does not make every dependent choice arbitrary. For
example, a naming tie cannot weaken a correction to an independently promised
error code. If the dependent conclusion relies on the arbitrary choice's
unproved design merit, classify that premise as inferred; if it merely follows
the selected spelling, record the arbitrary tie as inherited. Classify all
material premises before applying the confidence rules, not just the final
deciding rule.

Review one batch table, ordered held, inferred, medium, high, arbitrary, then
by dependent edits and repeat objections. Link the full records; when a PR is
authorized, use the table in its description. The maintainer can respond at
any iteration boundary. Available responses are **Keep**, **Reverse** to the
recorded alternative, **Rule** with a short intent the loop expands into a
general rule for confirmation, or **ship with hole** naming an accepted gap.
Reverse requires an admissible recorded alternative. Where none exists, a
request to change the governing requirement becomes a separately scoped
recommendation; it does not apply a known violation as the new answer.
An authorized, unflagged choice of any confidence may remain provisionally
applied in the working draft, with dependent edits, while review is pending.
It remains proposed precedent, never established authority. Pending review
does not lower the document's quality grade by itself or block further local
revision. A flagged item still holds the affected edit as step 4 requires.

Explicit acceptance of a named deliverable or batch changes its unflagged high
rows from pending to accepted without individual marks. Other rows
need acceptance individually or by explicit approval covering those rows;
otherwise their review status remains pending and they are excluded from
landing. Acceptance and action authorization are separate: silence ratifies
nothing and never authorizes landing. A broad instruction already covering
both acceptance and the action suffices; do not ask again.

Before landing, include only accepted, authorized edits whose required decision
and edit dependencies are also included or already satisfied by the landing
baseline. An accepted dependent stays out if a prerequisite remains pending;
alternatively rebase it onto the retained baseline and rerun its reasoning and
checks. Partial acceptance must yield a coherent artifact, not merely a set of
individually approved rows. This check adds no new approval requirement.

A repeated objection increments the re-raise count; it does not reopen the
choice. A new case must identify a prior premise, condition, or scope that it
newly challenges. A different input already covered by the recorded rationale
is a repeat unless it exposes an error in that rationale. Reopen on such a
case, corrected source reading, changed dependency, a demonstrated mistake in
applying the procedure or recorded rationale even on unchanged evidence, or
explicit maintainer direction. Merely asserting a different preference is not
a demonstrated mistake. Invalidate and rerun dependent
decisions and edits before the next panel. Mutually dependent choices form
one package; they cannot support each other as independent evidence.

Acceptance covers the recorded choice and scope, not every future revision
under its label. When reopening changes an accepted choice materially or
invalidates a premise of acceptance, reset it and materially affected dependent
acceptances to pending. Retain acceptance only where the recorded approval
explicitly covers the revision or the rerun demonstrates that the accepted
content and its acceptance premises remain unaffected. Preserve still-applicable
action authorization separately; do not request it again merely because the
choice was re-examined.

Do not freeze a choice disproved by new evidence. If a choice flips without
new evidence, retain the higher-confidence still-valid answer, first answer
on ties, mark it unstable, and hold it for review. An explicit maintainer
reversal controls over this stability default. Apply the reversal and its
dependents in a closing revision; unresolved new questions remain visible.

At completion, move temporary labels out of public usage prose into the
durable ledger, keep evidence and review records, and report residual gaps.
Attach every grade to the exact reviewed snapshot. Check affected contracts,
examples and dependencies after closing changes; obtain another panel only
within the charter. If a cap ends work after material unreviewed changes,
identify those changes and the final snapshot as unreviewed. A prior grade
does not transfer to the changed artifact, and reaching the cap is not passing
the quality gate.
Passing a document review does not prove the resulting APIs work. A later API
loop should exercise this guidance on real cases and record failures of the
procedure as well as failures of the API.

## Examples and provenance

The [worked examples](../design/decision-heuristics/EXAMPLES.md) exercise the
original evaluator questions and cases from other surfaces. They are replayed
recommendations, not applied changes to the evaluator. Their choices are
revisable under the procedure; they cannot supply authority for themselves.

The [loop record](../design/decision-heuristics/README.md) retains source drafts,
reviews, changes, and provenance of the twelve principle headings. In
particular, the detailed tests and precedence remain proposed until accepted.
