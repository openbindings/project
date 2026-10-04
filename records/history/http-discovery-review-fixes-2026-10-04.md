# HTTP discovery review fixes (2026-10-04)

Two findings from the adversarial review of Go commit
`17aef37e5630d91a3e98762bb84e69069dbac1de` are addressed by
[Go PR #142](https://github.com/openbindings/openbindings-go/pull/142), landed on
`release/0.2` at `14da31ff1fb69eb793d521e707e43dfb5404eb59`.

- HD-1: invalid fixed CORS values are rejected at handler construction. This
  includes every ASCII control, whitespace, origin lists, credentials, paths,
  queries, fragments, malformed IP literals and ports, non-ASCII hosts, and
  non-origin host punctuation accepted by Go's URL parser. Empty, wildcard,
  single ASCII origin and explicit `null` remain supported. Syntax checking
  leaves authorization policy with the caller; the value is emitted verbatim,
  so the caller supplies the browser's serialized origin.
- HD-2: short non-200 HTTP/1 bodies are discarded up to 2 KiB with a 100 ms
  cleanup budget. The request has its own cancellation context; the parent
  context and application HTTP client are not modified. Known larger bodies
  and HTTP/2 bodies close directly. Read failures and cancellation during
  cleanup preserve the observed HTTP status and metadata. Custom transports
  must honor request cancellation during body reads, as net/http does. The
  implementation does not leave a background body-draining goroutine.

The new regressions failed before the production changes. After the fixes,
20 sequential 401, 404 or 503 responses share one HTTP/1 connection for both
fixed-length and chunked short bodies. Tests also cover byte limits, read
failures, stalled and trickling responses, caller cancellation, client timeout,
response closure, and accepted CORS values on real HTTP responses. Local vet
and race tests passed with the required companion authority check, including
five repeated runs before the final host-punctuation cases and a full module
run afterward. Replaying the original review probes confirmed the two fixes
and retained all twelve core-alignment outcomes.

[Full Go CI](https://github.com/openbindings/openbindings-go/actions/runs/37221297751)
passed at final PR head `dbc005867e3fafcd15906a56691b58092ef0b9d4`, including core,
schemaeval and httpdiscovery vet/race checks with the required specification
corpus. The landed tree matches that tested tree exactly.

The change adds no public API names or dependencies and changes no core source,
document semantics, specification authority, or companion rule classification.
The candidate records the actual Go squash commit. Component versions and
release states are unchanged; no tag, publication, deployment or verified
cohort promotion is part of this change.
