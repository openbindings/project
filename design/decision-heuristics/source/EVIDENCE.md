# Source evidence for the worked examples

Read-only audit, 2026-09-19. This report supplies evidence and limitations,
not rulings on the open API choices.

## Baseline and provenance

The evaluator checkout is clean at
`c908947d3188c05ed9b3819c5aae7e8e107940bb`, titled “API loop: the Go
member's public surface after six cold-read panels.” Every evaluator file
and line reference below is to that commit. `go/jsonata/jsonata.go:19-20`
says: “Status: design. Every function in this package is a signature and a
doc comment; none is implemented.” Thus the evidence establishes written
contracts, not tested runtime behavior or measured implementation costs.

`design/api-loop/FINAL.md:85-87` says the iteration-7 findings were recorded
but “none is applied.” Its lines 130-133 say “the stub keeps its current
answer on every ruled item until a ruling lands.” `RULINGS.md` records
reviewer arguments and changing recommendations, not evidence that those
recommendations were applied. `source/HANDOFF.md` attests later discussion,
including the corrected numeric recommendation and deferral of
`Canonical`; those claims have that handoff's provenance, not baseline
implementation provenance. The original maintainer conversation was not
independently inspected.

## Carriage and the object split

`README.md:61-63`: “Carriage is exact. A value an expression only selects,
copies, or rearranges arrives unchanged: same numeric value, same string
content, same bytes.”

The stronger identity contract belongs to the Go member.
`go/jsonata/jsonata.go:96-101`: “it is returned as the same Go value, same
type, same identity” and “$ over a map[string]any input returns that map,
while { "a": $.a } returns a new *Object.” Lines 49-54 admit other typed
maps too; a two-arm `map[string]any`/`*Object` switch does not exhaust all
admitted object representations. `Member` explicitly also supports
`map[string]T` at lines 608-611.

The cost claim must distinguish unnecessary traversal from unbounded cost.
Lines 426-428 say a carried value counts as one node regardless of size,
its bytes are not charged on carriage, and visiting it is charged.
Lines 444-450 charge `MaxWork` for “each byte or value it visits, including
carried and caller-supplied values”; lines 433-436 bound traversal depth.
`Materialize`'s walk has its own bounded budget at lines 523-530, and
`Clone` is bounded at lines 535-540. Therefore draft 2 example 1's
“conversion walk ... that no limit bounds” contradicts the baseline.
An obligatory normalization pass could add work, allocation, refusal
points, and loss of identity; none of those facts establishes an
unbounded-cost distinction or measured cost.

## Output and decoder contracts

`go/jsonata/jsonata.go:490-497`: “Unmarshal decodes JSON text into admitted
values” with integer tokens as `int64` or `*big.Int`, fraction/exponent
tokens as `float64`, objects as `*Object` in member order, and arrays as
`[]any`. It expressly refuses duplicate names, invalid UTF-8, and unpaired
surrogate escapes. This is a decoder contract, not evidence of what
JSONata's language authority requires.

`Materialize` does not promise a finite normalized type set: lines 527-529
say a foreign-free value is returned “by identity” and other admitted
containers retain their kind. `Clone` converts containers but carries
numbers (535-540). There is no `Canonical` declaration. The finite model
and `Canonical` appear as proposals in `RULINGS.md:403-417`.

`go/jsonata/jsonata.go:504-515` specifies the serialization boundary,
including `json.Number` “as its token” and `float32` “as its float64
widening (so a carried float32(0.1) is 0.10000000149011612).” Widening also
appears in the value model at line 149. Thus the widening behavior is
already baseline text, while a new typed exit is not. A blanket
encode/decode identity law would need to account for these distinct
carriage, observation, and rendering contracts.

For the standard-library comparison, the installed Go 1.24.1 sources at
`/opt/homebrew/Cellar/go/1.24.1/libexec/src/encoding/json/decode.go:50-58`
promise a finite type set specifically when decoding into an interface:
`bool`, `float64`, `string`, `[]any`, `map[string]any`, and `nil`.
`encoding/json/stream.go:35-36` states: “UseNumber causes the Decoder to
unmarshal a number into an interface value as a [Number] instead of as a
float64.” The evaluator itself recommends `UseNumber` at lines 42-47.
Draft 2's “every JSON decoder does this” is consequently false. Restrict
the analogy to the documented default interface decode.

## Concurrency and Close

`go/jsonata/jsonata.go:690-699` promises an `Evaluation` safe for concurrent
use, shared memoization and one budget. It explicitly says: “Under
concurrent selections the budget may be exhausted at a different point
than under the same selections made in sequence.” This supports a
scheduling-sensitive failure argument, not a demonstrated wrong-value
argument. `Expression` is separately immutable and concurrent-safe
(470-474).

`Close` has observable baseline jobs (729-737): “It blocks until every
Select and Complete in flight has returned”; subsequent calls return
`CodeClosed`; the input and environment may be modified again. It also
ends sharing with the evaluation, while returned values can still alias
input and bindings. “An Evaluation that is never closed is reclaimed by
the garbage collector” and close makes release prompt.

Lines 295-297 say the engine starts no goroutines and holds no
process-wide state. They do not say it retains no per-evaluation memory.
The stub has no implementation to audit for external resources. Deleting
concurrency would remove the need for the in-flight barrier, but does not
by itself erase the documented `CodeClosed` transition or prove that
prompt memo release has no job. “Guards nothing” is not a baseline fact.
Whether those remaining jobs warrant a method is a design question.

For the analogy, Go 1.24.1
`/opt/homebrew/Cellar/go/1.24.1/libexec/src/database/sql/sql.go:3431-3470`
documents `Rows.Close` preventing further enumeration and implements
`rs.rowsi.Close()`, optional cancellation and statement closing, and
`rs.releaseConn(err)`. This is concrete resource release absent from the
evaluator's stated contract; it is not a verdict about the latter's API.

## Numeric model and refusal

`README.md:73-75` says: “It refuses rather than approximates. Overflow,
non-finite results, exhausted budgets, and unrepresentable values are
failures, never silently rounded, saturated, or coerced.” That quotation
does not itself settle the scope of “unrepresentable.”

The Go baseline is more specific. Lines 137-145 say observing operations
are functions of value, “never of the representation,” and decimal tokens
denote the nearest float64. Lines 165-173 say an integral float64 takes
part in arithmetic as its integer, including `1e23 + 1` yielding
`99999999999999991611393`. Lines 181-191 distinguish two policies: inexact
integer-to-decimal operand conversion fails with `CodeInexact`, while
nonintegral integer division rounds its exact quotient once to float64.
Consequently “the artifact keeps refusal” means this specific mixed
policy, not refusal of every rounding operation.

Lines 204-218 give the current binary `$round` basis and integer digit
rendering: `$round(2.675, 2)` is `2.67`, and `$string(1e21)` is
`"1000000000000000000000"`. The proposed representation-based kind rule,
decimal `$round`, and `$string(1e21) = "1e+21"` would change the baseline.
They cannot be cited as pre-existing laws. `RULINGS.md:606-612`'s claim
that its proposed cap preserves substitutivity is superseded by the
specific contradiction attested in `HANDOFF.md`; it must not be reused as
verified evidence. No attested numeric or regex probe was repeated.

## Additional provenance limits

The README does mention “Authors” in its portable-core discussion
(95-102), but no inspected baseline text declares the worked examples'
exact quoted audiences. In particular “callers of Canonical” cannot be a
baseline contract for a nonexistent method. Declare an audience as a loop
assumption or cite actual text with its limited scope.

The regex documentation silence and upstream numeric probes remain
handoff attestations with the pins recorded there. No fresh internet
verification was performed. No shipped implementation, consumer inventory,
ratification record, or universal host-language claim was audited.
