# Delegate Manager prerequisites — 2026-09-17

Status: **native and Go SDK prerequisite repairs landed; Delegate Manager
migration remains unmerged; candidate refresh, not a release or verified cohort**.

| Component | Integration ref | Actual squash commit | Evidence |
| --- | --- | --- | --- |
| asyncapi-client | `main` | `7326ce4e18c12e1dcb36c3587fbe0f7fe52ec749` | [PR #4](https://github.com/openbindings/asyncapi-client/pull/4); [full native qualification](https://github.com/openbindings/asyncapi-client/actions/runs/35257657088) passed. |
| Go SDK | `release/0.2` | `48ba4edd35677d75a6b105153fa07ff470da12a9` | [PR #112](https://github.com/openbindings/openbindings-go/pull/112); [all nine CI lanes](https://github.com/openbindings/openbindings-go/actions/runs/35257657964) passed after the native prerequisite landed. |

The native Go client preserves JSON numbers in payloads instead of decoding them
through float64, and rejects trailing JSON values. The Go AsyncAPI adapter
preserves those values at the SDK boundary. Declining frame hooks now continue
through the configured request/response fallback, while explicitly handled null
stays distinct from declining. These repairs do not claim TypeScript numeric
parity or full Delegate Manager migration qualification.

The native repair was replayed onto current main `29b909c`, including the prior
full-live qualification plumbing. Fresh local native and adapter race tests,
the root Go SDK race suite, and native/adapter vet passed. Local service-gated
broker tests are not counted as live evidence; the linked native CI ran the
unchanged full qualification suite. The SDK's first AsyncAPI CI attempt failed
against the old native main; it passed when rerun after PR #4 merged. No check
was weakened or suppressed.

Only the Go SDK and native AsyncAPI component SHAs change in `next.json`, from
Project main `374f06993d6db3885fcd49feddc21afeea76a5d1`. All other component pins,
versions, release states, integration refs, and `candidate` status are preserved.
The native repository still has no coordination caller recorded; PR #4 is a
component repair, not a caller installation, and is therefore recorded here
rather than misclassified as a caller in `working-loop.json`.

## Migration hold

[OB #48](https://github.com/openbindings/ob/pull/48) targets `release/0.2` and
[interfaces #33](https://github.com/openbindings/interfaces/pull/33) targets
`main`. Both are draft preservation/review PRs, not landed migration artifacts.
The combined candidate must finish the public role-based management commands,
HTTP endpoints, configuration conversion and explicit source-authoring
controls, then pass remaining Go/TypeScript integration and final qualification.
OB must also replace its private prerequisite module pins with qualified,
publicly resolvable inputs. Its CI no longer depends on the private developer
installer; that mechanical repair does not qualify the whole candidate.

Neither draft is selected by this candidate manifest. Passing the shared
interface's standalone checks is not sufficient to merge an incomplete public
consumer boundary. The old interface and OB pins remain until the combined
migration qualifies.

## Exact-cohort qualification

The updated selection still needs the exact-cohort integration run, including
extended validation. Component green checks above are not a substitute for that
run. The central workflow cannot check out a private website with its ordinary
token; if that restriction persists, website validation must use its own caller
context or an exact local checkout without deploying or changing visibility.

No tag, package publication, deployment, local CLI installation, real registry
conversion, numbered cohort, or promotion to `verified` is authorized here.
