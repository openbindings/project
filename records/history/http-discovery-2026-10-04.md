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

The [Go-triggered integration run](https://github.com/openbindings/openbindings-go/actions/runs/37214821672)
resolved its inputs successfully and failed with exactly the same error-signature
multiset as the [previous Go integration run](https://github.com/openbindings/openbindings-go/actions/runs/37063212805):
33 JSONata repository-not-found messages, 11 corresponding Git exit-128 messages,
eight missing runtime-output artifacts, one missing `go.mod` for each of the
eight removed legacy format modules, and the failing integration aggregate.
No check was suppressed or weakened.

[Post-merge Go CI](https://github.com/openbindings/openbindings-go/actions/runs/37214820979)
also passed at the actual squash commit.

The [full exact-candidate run, including extended lanes](https://github.com/openbindings/project/actions/runs/37215022805)
resolved the candidate from project revision
`6db07e8e3e6553dd63a18ddb428fa28ec4217a00`; the final coordination record retains
that same component selection. It remains unverified: the shared jobs cannot
fetch the JSONata repository, the website job cannot fetch the website
repository, and the Go format jobs name the same eight absent legacy modules.
The additional Elements lane stops at the same JSONata input failure. Error
logs contain 36 JSONata and three website repository-not-found messages,
13 corresponding Git exit-128 messages, eight missing runtime-output artifacts,
eight missing legacy module files, and the failing aggregate. No component was
deployed or published.
