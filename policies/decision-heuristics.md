# Design heuristics

These heuristics guide design decisions across the OpenBindings repositories.
Use them to explain a choice and its tradeoffs, not to replace judgment.

## 1. Two grounds of truth

Start with Core and the upstream authority actually incorporated by the
relevant specification, each within its own scope. Read the applicable text
and cite what answers the question. Our earlier decisions are revisable
precedent. Shipped behavior, reference implementations, examples, and tests
do not become authority merely because they exist. Distinguish silence from
a source we have not read.

## 2. Support exactly what upstream supports

Implement the declared supported domain faithfully. Coverage does not justify
changing semantics. State unsupported cases explicitly, within the restrictions
the governing contract permits. Where documentation leaves a choice open,
reference behavior is useful evidence; it does not automatically import
another implementation's types, value model, or resource assumptions.

## 3. Every layer claims exactly its job

Put a responsibility in the layer that owns it. A shared specification defines
shared meaning; a host API exposes it naturally. Each interface should make
sense on its own. A local choice does not silently become a shared rule.
Judge an element by its observable job, not its implementation size.

## 4. Suspect uniformity that couples

Sameness helps when it removes distinctions callers should not need to
understand. It hurts when it couples independent layers or forces unnecessary
conversion and dependencies. Explain what uniformity buys and what it costs;
resemblance alone is not a reason to impose it.

## 5. DX is supreme inside the constraints

Among designs that meet their obligations, prefer the easiest to use correctly.
Compare actual caller code, including errors and recovery. Consider the common
path, explanation burden, and repeated integration work. Avoid making every
caller pay for a facility only some need, but count the complexity of optional
paths too.

## 6. Zero configuration to start

Make the first useful operation work with sensible defaults. Configuration
should express a real choice. Where no safe or faithful default exists,
require the necessary input instead of silently inventing it.

## 7. Delegate to formed expectations

Name the audience and task before choosing the idiom. Choose analogues because
they do the same kind of job, not because they have convenient names. When
familiar patterns conflict, compare their effects on actual callers rather
than claiming one is universally idiomatic.

## 8. Predictable and loud

Correct use should produce the promised result or an explicit failure. Avoid
silent loss, coercion, and fallback that changes meaning. Judge correctness
against the stated model. Make foreseeable misuse harder where practical.
Bound costs that hostile inputs can impose, and distinguish missing bounds
from ordinary performance tradeoffs under effective limits.

## 9. Substitutability is the payoff

Independent implementations should agree at the boundary promised to be
portable. State enough for two implementers to reach the same observable
result. Shared meaning need not require identical host types, signatures,
or internal machinery.

## 10. Rule the general form

Explain why the choice fits this class of problem, including its conditions
and limits. A useful decision helps resolve the next comparable case.
Do not generalize beyond the evidence or assume superficially similar
questions have the same answer.

## 11. Challenge gaps before filling them

Identify the use that needs an addition and what existing operations lack.
A concrete intended use can justify a first version before callers exist.
Repeated boilerplate, error-prone adaptation, and recovery work can justify
conveniences. An example invented solely to demonstrate a feature does not
prove demand. Defer speculative additions until the need becomes concrete.

## 12. Systems serve shipping

Build what advances the intended use. Avoid making general infrastructure a
prerequisite for a problem that can be solved directly. Prefer a small,
reversible choice when evidence does not justify a larger commitment.
Extension points should serve recognizable needs.

## When the heuristics point in different directions

Separate requirements from preferences. Authority and existing obligations
constrain the choice; a preference does not erase them. A local contract can
be redesigned, but describe that as a change to a promise.

Compare concrete alternatives against the same users and tasks. State the
strongest objection to the preferred answer and weigh the consequences,
including severity and frequency. Do not settle a tradeoff by counting
principles or treating every counterexample as equally important.

Say what determines the answer, what remains an assumption, and what would
change your mind. Resolve implementation questions against a relevant external
authority where one exists. Changes to shared meaning or project design
commitments need the relevant owner's judgment.

When acceptable options remain close, make a reasonable, reversible choice
and proceed. Revisit it when requirements, evidence, or reasoning change;
repetition of a preference alone is not a new reason.
