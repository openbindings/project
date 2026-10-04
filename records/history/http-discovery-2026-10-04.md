# Go HTTP discovery companion (2026-10-04)

The optional `github.com/openbindings/openbindings-go/httpdiscovery` module
implements the client and server contracts of HTTP Discovery companion v0.1.0.
Its authority is `http-discovery.md` at spec commit
`04a84131295dc8c305b4f048d2e129f84fb023de` (SHA-256
`e33492b180dc36b35bc86d39c9ed1f2f59fbfff7272dff2b7bf16a4edaeae91d`).
The website's source copy has identical bytes. Publication of the website is
not required for this implementation.

The client obtains a document from an origin's well-known path, preserves core
validation reports and error categories, and distinguishes HTTP absence,
gated discovery, and version refusal. Transport and redirect policy come from
the application HTTP client; bounded response reads and context cancellation
are explicit. The server helper validates an immutable document snapshot at
construction and uses the application's authentication and CORS policies.

Core document semantics, core APIs, and the applied core specification revision
are unchanged. The new module adds no invocation, synthesis, dependency
resolution, or referenced-resource acquisition. Its TypeScript alignment is
recorded as pending; this is not a cross-SDK parity claim.

## Landing and validation

- [Go PR #141](https://github.com/openbindings/openbindings-go/pull/141) landed
  on `release/0.2` at `17aef37e5630d91a3e98762bb84e69069dbac1de`.
- The merged tree matches tested PR head
  `1ab7509b8f051855eabaef41b15434d26d9953fb` exactly.
- [Hosted Go CI](https://github.com/openbindings/openbindings-go/actions/runs/37214513139)
  passed, including the new module's vet, race tests, and companion authority
  hash check, alongside all existing core and evaluator checks.
- Local `go vet ./...` and `go test -race -short ./...` passed in the root,
  `schemaeval`, and `httpdiscovery` modules with `OB_SPEC_CORPUS` supplied and
  `OB_CORPUS_REQUIRED=1`.
- The new module's external-package suite covers all eight companion rules,
  HTTP/HTTPS redirects, authentication middleware, resource bounds including
  decompression, cancellation, response closure, exact document preservation,
  and concurrent client/handler use under the race detector.

The mutable candidate records the actual Go squash commit. Component versions
and release states are unchanged; no tag, package publication, website
deployment, or verified-cohort promotion is part of this change. The existing
whole-project input/legacy-module failures and unrelated GraphQL/TypeScript
binding failures retain their recorded disposition. This addition does not
establish that the wider project is ready for release.
