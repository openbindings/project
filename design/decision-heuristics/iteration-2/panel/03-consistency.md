# Guidance panel, iteration 2: specification and consistency skeptic

Cold read of draft 2, 2026-09-19.

## Grades

| Criterion | Grade | One-line justification |
| --- | --- | --- |
| Decidability | C- | Step 0's tie-break, the demonstrable-case filter on rule 7, the "shorter text" coin toss, and the confidence labels each admit two readings; a cold reader reproduces the twelve rows only by already knowing the answers. |
| Internal consistency | D+ | Step 0 classifies four "decided" rows as ground (a); P5's own exemption reverses example 7; step 1.1 and the Terms entry for bound questions give example 4 two answers; the confidence column disagrees with its definition in seven rows. |
| Generality | C | Five of eleven precedents and all fourteen rows are the Go JSONata member; rank 5 splits on (c)/(d) which no binding-specification question can settle; rule 13 and 8b are phrased for regexes and numbers. |
| Escalation boundary | C | Ground (a) plus the "class member not yet written" bullet flag every class value-model question, which the examples then decide anyway; nothing gates amending the procedure itself (rule 13 sits at rank 2 unratified). |
| Clarity and tone | B- | Well-written and unhedged, but "lens", "panel", "apply-bin", "pinned" (four senses), "class", "member", "host", "kind" (two senses), and "ground" (three senses) are load-bearing and undefined. |
| Overall | C | The skeleton (classify, cascade, tests, precedence, record, batch) is right; the body contradicts it often enough that a loop following the text would not produce this table. |

## Totality, determinism, consistency

**Totality: holds, with one dead path.** Every input eventually reaches "decide", "flag", "read the text", or "coin toss". The dead path: step 1.2's conditions ("a function's result, an operator's meaning, a syntax accepted" AND "neither a value, a surface, nor a bound is implicated") are contradictory. A function's result *is* a value question by the Terms definition ("one whose answer changes which value results"). Example 8a says so explicitly ("A value question, so step 1.2 does not adopt it"). So step 1.2 fires only for "a syntax accepted", and even that changes which value results. The step exists to say "silence plus a working reference is not a design opportunity" and then excludes nearly every case it could apply to.

**Determinism: fails.** Concrete inputs on which two readers reach different outputs:

1. *Which ground?* Step 0 says "classified by the ground whose text would change." For example 3 (one `Evaluation` per goroutine), the text that changes is one doc comment that is both the API contract (d) and the member's local convention (c). Rank 5 of the precedence then orders rule 7 and rule 3 differently depending on which the reader picked. Note also that ground (b)'s text never changes when an answer changes (the project cannot edit an RFC), so the tie-break can never select (b); a question on (a)+(b) is always (a) and flagged even when the authority answers it outright.
2. *Is "encoding/json returns one object type" a demonstrable case?* By the Terms definition (a concrete input with its outcomes written out; a wrong example; a pre-stated law shown violated), no. Example 1 and example 12 both claim rule 7 on exactly this kind of evidence. Read strictly, rule 7 and rule 5 can never be claimed and rank 5 and rank 7 are unreachable; read loosely, the filter filters nothing.
3. *"Pick the option with the shorter text."* Shorter answer sentence, shorter artifact diff, or shorter doc comment? Three readers, three answers.
4. *"A maintainer ruling is one the maintainer has signed."* Signed where? Example 8b treats the class README's "refuses rather than approximates" as a maintainer ruling without showing a signature; a second reader treats it as loop text and decides 8b at step 3 (see consistency, below).
5. *Instance or extension?* Example 4 calls fidelity-over-coverage "an instance of its stated kind" without quoting the kind. That ruling was stated for binding-specification coverage of upstream features; a regex engine is arguably a different kind. The escalation bullet turns on this and the text gives no test.

**Consistency: fails.** The breaking inputs, each of which is a row in the document's own table:

1. *Ground (a) versus examples 4, 8a, 8c, 10.* Example 6 is flagged because "a class document binds every member, so it is ground (a)." Example 4 states "a portable subset stated by the class"; 8a is "pinned as a class algorithm"; 8c is decided by P9, which is a class value-model rule; 10 is decided by "P8 (the class states that a decimal is binary64)". Each answer's text lands in the class document. By the tie-break they are all ground (a) and all flag. They are also all caught by the escalation bullet "changes what ... a member of the same class not yet written must do at an observable boundary." The document decides them at `high` and `medium`.
2. *Step 1.1 versus the Terms entry for bound questions.* Terms: a bound question is "Always a step 2 question; never adopted from a reference." Step 1.1: "If the authority answers once, that is the answer," with no fence. Precedence rank 1 (authority text) is above rank 2 (rule 13). Example 4 writes "whatever the pinned page says", which is only licensed if the page is a *reference*, and RULINGS records that two reviewers believe the pinned page names JavaScript syntax and asks that it be verified before ruling. The row never quotes the page, violating step 1's "Quote the text; do not paraphrase it." If the page names the dialect, rank 1 beats rank 13 and the answer flips; or escalation bullet 4 ("a bound ... traded against fidelity to an authority") fires and it flags. The text supports three outcomes for one input.
3. *P5 versus example 7.* P5's last sentence: "A method whose job is to end something (a cancel function, a borrow window) has one." The Go doc states the borrow: "Values returned by an Evaluation's Select or Complete are shared with the Evaluation until Close." Example 7 cites P5 to delete `Close`. P5 as written decides the opposite.
4. *Rule 11 in example 5 versus example 9.* Example 5 defers Resolver implementations because "five panels of reviewer sketches are evidence, not consumers." Example 9 ships `Canonical` on the same evidence (RULINGS: "three reviewers want", "the integrator asks again"). The Terms definition of consumer excludes both. One of the two rows is wrong under the text.
5. *Step 4 re-run trigger versus "a preference alone does not reopen."* Clause two of the re-run rule ("when a lens that has not raised the record's counterargument raises it") reopens on a *repeated* argument from a new lens, with no new demonstrable case. If the recorded counterargument was a preference, that is a preference reopening a decision. P2 also forbids it.
6. *Dependency cycle.* 8c is "medium (depends on D-8b)"; 8b's flag row uses P9 (which is 8c's answer) to neutralize its 8b case; P11 is "pending ... worked example 8b." Under the batch rule "a Reverse reopens the decisions listed as depending on it," reversing either reopens the other forever.

## Rule-by-rule audit

- **Rules 1, 2.** Redundant with step 1 by their own row. Rule 2's "exactly" (no *more* than upstream) has no test anywhere: "should the Go member add `$foo` the documentation never defines" reaches step 2 with no rule to catch it. Gap.
- **Rule 3.** Genuine, but under-determined for additions: any new element (example 9's `Canonical`) is "something its contract does not name" until the contract is edited, so rule 3 as a test forbids all additions or none. Overlaps P5, P8.
- **Rule 4.** Method, never decides; overlaps rule 7's "what does the sameness cost" and rule 3. Harmless.
- **Rule 5.** Subordinate to rule 7 (it borrows rule 7's consumer). Cannot be claimed with a demonstrable case as defined, so rank 7 is unreachable for it.
- **Rule 6.** Genuinely new. The second half of its test ("the one that cannot corrupt a value") is an 8a restatement.
- **Rule 7.** Genuine and load-bearing, but uses "consumer" in a different sense from Terms (audience class versus concrete caller). Overlaps P3, P4, P10, and rule 5.
- **8a.** Genuine. Its carve-out ("a failure the caller can reach only by ignoring the contract is rule 7's to weigh") contradicts P4, which ranks *with* 8a and is precisely about misreadings of a contract. Example 2 claims "rule 8a's case" for a call the contract says is a path, which 8a's own text hands to rule 7.
- **8b.** Genuine. Overlaps 8a on scheduling-dependence (example 3 cites 8a for a scheduling-dependent budget error, which is 8b's text verbatim: "depending on ... scheduling"). The two are ordered, so the answer survives; the citation is wrong.
- **9.** Nearly always satisfied by both sides ("rule 9 is satisfied by pinning either algorithm", 8a). Dead at rank 6. P8 ranks with it but is a classification rule, not a substitutability test.
- **10.** Method. Redundant with escalation bullet 5 and the batch "Rule" outcome. "Kind" undefined.
- **11.** Labelled a method that "never breaks a tie," but its test *is* a decision (build or not) and example 5's deciding-rule column cites it as deciding. Overlaps 12 and P6. Mis-classified.
- **12.** Redundant with 11 (no consumer, defer). Method.
- **13 (proposed).** Genuine. Redundant with Terms "bound question" and escalation bullet 4, and the three disagree on what happens when an authority speaks. Placed at rank 2 above ten ratified rules while unratified; the confidence definition then makes everything it decides `inferred`, which examples 1 and 4 ignore.
- **P1.** Redundant with "What escalates" paragraph 2 and the unstable rule in step 4. Contradicts the ground-(a) "marked hole" rule for a question with no current answer.
- **P2.** Redundant with Terms (demonstrable case, "a law first stated in the finding is a preference") and step 4 ("a preference alone does not reopen").
- **P3.** A method for rule 7 in a host with a standard library; genuine, but "two analogues that disagree decide nothing" is already the neutral rule. Note that example 3 names `sql.Rows` as the analogue and `sql.Rows` has `Close`; P3 therefore argues *for* `Close` in example 7 and the row does not address it.
- **P4.** Overlaps 8a and 7; contradicts 8a's carve-out (above).
- **P5.** Overlaps rule 3; self-defeating in its only application (above).
- **P6.** Overlaps 11, 12, and 10; genuinely adds "in a subpackage." Its rank line says both "ranks with rule 10 as a method" and "rule 11 decides the timing", so it decides nothing itself.
- **P7.** Not a rule; a process instruction plus an escalation ("Ground (a) when..."). Overlaps the memory doctrine "implementation is never authority" and says so. No rank.
- **P8.** Its operative sentence ("'the host decides' is never a ground") is a step-0 classification rule, not a rule-9 test. Overlaps rule 3.
- **P9.** Genuinely new and substantive: it *is* the answer to 8c and a class value-model rule (ground (a)). Stating it as a precedent lets 8c be "decided" by citing itself.
- **P10.** Ranks with 7, but its content and its only use (example 9) are 8a ("fails rule 8a"). Rank is wrong; at rank 5 it ties with the protojson-consumer argument and decides nothing.
- **P11.** Not a precedent: "the open question." No rank, no test. Fold into 8b's flag.

## The precedence audit

**Unordered pairs that can conflict:**

- Rule 13 versus rules 1/2 when the *authority* (not the reference) speaks on a bound. Rank 1 beats rank 2; Terms says bound questions never leave step 2; escalation bullet 4 says flag. Three orderings, none stated as winning.
- P5 (with 3) versus P3 (with 7) on a (d) question: rank 5 says 7 then 3, so P3 wins. Example 7 lets P5 win without naming P3.
- P10 (stated with 7) versus rule 7: same rank; example 9 resolves by promoting P10 to 8a.
- P4 (with 8a) versus 8a's own carve-out (which routes contract-misuse to rule 7). A precedent ranked with 8a for the class of case 8a says is rule 7's.
- Rule 11 (method, "never breaks a tie") versus any ranked rule: example 5 has rule 11 deciding alone, example 2 has rule 11 deferring handles against a rule-7 argument. Whether a "method" can decide when no ranked rule is claimed is unstated.
- A precedent versus the ratified rule it "ranks with", when they disagree (P4 versus 8a above; P8's "the host decides is never a ground" versus rule 7's "name the consumer from the surface's declared audience", where the surface *is* the host).
- P7, P11: no rank at all.
- Confidence when both "step 3 decided it" (`medium`) and "a proposed rule decided it" (`inferred`) hold. Example 1 picks `medium`; the definitions do not say.

**Orderings that contradict a worked example:** rank 5 (7 before 3 on ground (d)) contradicts example 7 (see above). Rank 1 above rank 2 contradicts example 4 if the pinned page names the dialect, which the row never checked. Rank 8 (methods never break a tie) contradicts example 5's deciding-rule column.

## The twelve resolutions, checked

| # | Follows from cited rules? | What actually decides it |
| --- | --- | --- |
| 1 | No. Rule 13's test is "bounded by a stated limit"; an O(result) walk over carried data is bounded by `Limits.MaxBytes` and is the same order as evaluation itself. Rule 13 does not fire. | Undecided under the text. The real argument for the split is carriage by identity, which is a class commitment (rule 3 with the quoted "carried" contract, or P8), and the row does not cite it. Confidence must be `inferred` (rule 13 is proposed) if 13 is kept. |
| 2 | Partly. P4 decides the rename; "rule 8a's case" is excluded by 8a's own carve-out (misreading the contract is rule 7's). Rule 11 deferring handles is fine. | P4 alone (so `inferred`, not `high`), with rule 7/P3 supporting. |
| 3 | Answer follows; citation wrong. "Budget exhaustion becomes scheduling-dependent" is 8b's test verbatim. | 8b (rank 3), with P3 supporting. `high` is right. |
| 4 | No. Never quotes the pinned page; asserts "whatever the pinned page says", which rank 1 forbids; the answer's "portable subset stated by the class" is ground (a); escalation bullet 4 fires on its face. | Either: page silent, rule 13 decides at `inferred`; or page names JavaScript syntax, flag under bullet 4 with the bounded answer kept. `high` is unavailable on any reading. |
| 5 | Yes, if rule 11 is allowed to decide (the text says it is a method that never does). | Rule 11; the text needs to say methods decide when unopposed. |
| 6 | Yes. | Ground (a). Correct flag. |
| 7 | No. P5 exempts "a borrow window" and the Go doc states one; P3's analogue from example 3 (`sql.Rows`) has `Close`; on a (d) question rank 5 puts 7/P3 above 3/P5. | Undecided; as written the precedence keeps `Close`. To delete it, either strike P5's exemption or show the borrow window has no enforcement (which is the idiom reviewer's argument, and is a rule 3 "claims an effect it does not have" case; that would need to be the cited case). |
| 8a | No. The 1.1 ladder is for *disagreeing* passages, not silence; rule 7's "transform authors expect decimal rounding" is not a demonstrable case; the strongest actual argument (the value `$string` shows and the value `$round` judges disagree) is an 8a/8b case and is uncited; "pinned as a class algorithm" is ground (a). | Flag (ground (a)), or decide in the member only, citing the `$string`/`$round` disagreement under 8b (one input, two observed values). `medium` is not derivable either way. |
| 8b | Flag follows if the README rule is a signed maintainer ruling, which is asserted not shown. If it is not, 8b (rank 3) beats 8a (rank 4) outright for round-once, and the row's "P9 makes that within-kind and neutral" is wrong: under P9 every operand in the three-outcome product is float64-kind, so the test is within-kind and fires. | Flag on ground (a) regardless (class rule). The stated reason should be ground (a), not maintainer-ruling extension. |
| 8c | No. P9 is a precedent (`inferred`) that is also this row's own answer stated one section earlier, and a class value-model rule (ground (a)). "depends on D-8b" is backwards; 8b's flag cites P9. | Flag with 8b as one package, or decide in the member text only and label `inferred`. |
| 9 | No. Rule 7's consumer is "callers of `Canonical`", an element that does not exist; rule 11 as applied in example 5 defers it (reviewer requests are not consumers). P10's rank (7) does not beat the protojson consumer; the row promotes it to 8a. | Undecided; consistent application of rule 11 defers `Canonical` with a stated consumer test, or example 5 must say why Resolvers differ. |
| 10 | Answer plausible; ground wrong. If the class already states "a decimal is binary64", cite the class and the row is a citation, not a decision. If it does not (RULINGS says the README attributes this to the host), P8 is stating new class text: ground (a). | Rule 7 alone in the member (`high`), with the class-text claim removed; or flag. |
| 11 | Answer follows; the quoted contract does not decide it. "Decodes JSON text into admitted values" says nothing about duplicates; both options leave the decoder's behavior identical. What decides the *label* is the definition of divergence (departure from the reference's observable behavior; the reference never decodes text), which is example 6's flagged rewrite. | Rule 3 is fine as the ground if the row adds "depends on D-6". |
| 12 | Yes on substance. Confidence wrong: 8a neutral, next rule in order decides, is step 3 by definition, so `medium`. P3 ("no standard-library precedent for a sentinel `any`") is the actual rule 7 evidence and should be cited. | Rule 7 via step 3; `medium`. |

The count line "Ten decided, two flagged" is true only if 8a, 8b, 8c are one question; the table then decides two-thirds of a flagged question.

## Definitions and the escalation list

**Under-defined terms, with the exposing case:**

- **Ground.** Three senses: step 0's classification, rule 1's "two grounds of truth", and step 4's "the ground: step and rule" (justification). "A rule 1 citation ... record step 1 instead" and "records the ground" read differently depending on sense.
- **Consumer.** Terms defines the rule-11 sense (a caller at a commit, issue, or integration point). Rule 7 uses an audience-class sense ("a Go package's 'callers'"). Example 9 conflates them: `Canonical` has a rule-7 consumer and no rule-11 consumer.
- **Kind.** P9's arithmetic kind and rule 10/bullet 5's "the kind it was stated for". Example 4 turns on the second sense and gives no test for instance versus extension.
- **Maintainer ruling / signed.** No location named. Example 8b's flag depends on the README being one.
- **Class, member, host, value model, reference.** Presupposed by P8 through P11 and by every row; a reader arriving from a binding-specification loop has none of them.
- **Pinned.** The pinned documentation (a commit), a pinned unstable answer, a flagged item "counts as pinned", "the class pins" an algorithm. Four meanings.
- **Lens, panel, apply-bin, decide bin, blocked stopping condition.** Charter vocabulary used as if defined.
- **Contract** in "a change to a published contract". Text or behavior? See over-reach below.
- **Demonstrable case** for rules 5 and 7. No form of DX or expectation evidence fits the definition.
- **Security property** (bullet 4). Undefined; no test for when a decision is one.

**Escalation gaps (meets no bullet, plainly should flag):**

- *Amending the procedure.* A loop proposes rule 14 and places it at rank 1. Nothing gates it; rule 13 already sits at rank 2 unratified.
- *Adding a dependency to a core package.* P6 says "in a subpackage so the core stays free of the dependency" as a preference; a loop that adds protobuf to the core package meets no bullet.
- *Changing a shared conformance fixture.* Fixtures under `suite/` bind every member; ground (a) catches it only if the reader recognizes a fixture as "doctrine", which Terms does not say.
- *A new ground-(a) question with no current answer.* The flag rule says "marked hole"; P1 says never leave the artifact without a stated behavior. Example 4 in the first loop was exactly this state. The text gives both instructions.

**Escalation over-reach (meets a bullet, plainly should not flag):**

- *Correcting a wrong example in a published SDK doc comment.* It is "a change to a published contract" by any reading that treats text as contract, so it flags; it is the one thing the loop most obviously should just do.
- *Every class value-model decision made in a member.* Bullet 1 (ground (a) via the "doctrine governing more than one artifact" clause) and bullet 3 ("a member ... not yet written") together catch 4, 8a, 8c, 10, and probably 11. The document's own examples show it does not intend this; the text says it.
- *Any decision the loop cannot disprove is ground (a).* The burden-of-proof default in step 0 sends every hard question to the batch, which is the stall the document exists to prevent.

## What I would change

1. **Replace the step 0 tie-break with an explicit member/class rule.** Wording: "A question is ground (a) when the loop would state its answer in a document that binds more than one artifact. A question the loop can answer in the artifact's own text alone is (c) or (d), even when the answer is a candidate for a class rule; the record then carries `candidate class rule` and the batch decides whether to promote it. The loop never writes class text as a decision; it writes it as a recommendation." Then strike "pinned as a class algorithm" and "stated by the class" from rows 4, 8a, 8c, 10, and delete the "quote the artifact in one sentence or it is (a)" default.

2. **Fence step 1.1 and reconcile it with bullet 4 and rule 13.** Add to step 1.1: "If the authority's answer implicates a bound, the loop does not adopt it: it keeps the bounded option, flags under 'a bound traded against fidelity', and quotes the passage." Then row 4 must quote the pinned regular-expression page; if the page is silent, rule 13 decides at `inferred`; if it names a dialect, the row is flagged with the bounded answer kept. Delete "whatever the pinned page says."

3. **Make confidence derivable and re-label the table.** Wording: "`inferred` if any deciding or neutralizing rule is proposed or a precedent, or the authority was unread. Otherwise `medium` if step 3 was applied. Otherwise `high`." Under that rule: 1 inferred, 2 inferred, 3 high (cite 8b, not 8a), 4 inferred or flagged, 5 high, 7 inferred, 8a inferred or flagged, 8c inferred or flagged, 9 inferred, 10 high (if the class claim is dropped) or flagged, 11 high with `depends on D-6`, 12 medium.

4. **Fix P5 or reverse example 7, and address P3.** Either strike P5's borrow-window exemption and replace it with "A method whose job is to end something has one only if something the caller can observe ends: a cancel function stops work; a window no code enforces and no resource backs is not a job," and add to row 7 "P3's `sql.Rows.Close` analogue is a resource release; the Evaluation holds none," or keep P5 as written and reverse row 7 to keep `Close`. As written the precedence keeps it.

5. **Split "consumer" and make rule 11 a deciding rule applied uniformly.** Terms: "**Consumer** (rule 11): a caller in a project repository identified by a commit, an open issue, or a named SDK integration point. **Audience** (rules 5, 7): the surface's own declared readership, quoted." Step 3 rank 8: "Rules 4, 10, and 12 are methods. Rule 11 decides build-or-defer when no ranked rule is claimed against it." Then either defer `Canonical` in row 9 with the consumer test written, or state in row 5 what distinguishes a Resolver from `Canonical`. Break the 8b/8c cycle at the same time: 8b and 8c are one flag package, and P11 is folded into it rather than listed as a precedent.
