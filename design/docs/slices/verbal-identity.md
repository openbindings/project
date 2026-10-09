# Design slice: canonical verbal identity

Status: migration
Tracker key: `verbal-identity`
Owner: OpenBindings maintainers

## Frame

- **User-perceivable concern:** official OpenBindings surfaces should use one
  recognizable tagline without turning it into a mandatory lockup or generic
  headline.
- **In scope:** the canonical tagline, a preferred explanatory descriptor,
  exact-use rules, claim boundaries, and applicable official metadata,
  repository introductions, social imagery, and human-facing CLI help.
- **Out of scope:** normative definitions, UI microcopy, general voice and
  tone, typography, fixed brand composition, scenario headlines, machine
  output, historical records, and immutable releases.
- **Upstream authorities:** Spec owns the meanings of “interface” and
  “binding”; each consumer owns its publication or product implementation.
- **Completion evidence:** accepted canonical strings in Design, exact-use
  guidance, consumer-local checks where practical, and verified adoption or a
  documented out-of-scope classification for each official surface.

## Exact evidence

The pinned source inventory, observed phrases, and difference classifications
are in [the verbal-identity inventory](../evidence/2026-08-08-verbal-identity-inventory.md).

## Accepted model

- “One interface. Any binding.” is the exact official tagline when used.
- “Describe what a service does separately from how you access it.” is the
  preferred standalone explanation and may be integrated or expanded in
  context.
- Neither string is mandatory on every surface.
- Typography, layout, line breaking, and glyph relationships remain open.
- Scenario-specific headlines remain surface-owned.
- “Any binding” expresses extensibility, not universal installed support.

These rules are accepted in
[Decision 0003](../decisions/0003-canonical-tagline.md).

## Canonical outputs

| Output | Design path | Maturity |
| --- | --- | --- |
| Exact canonical strings | `brand/verbal-identity.json` | candidate |
| Usage and composition guidance | `brand/verbal-identity.md` | candidate |
| Decision boundary | `docs/decisions/0003-canonical-tagline.md` | accepted |

## Consumer adoption

| Consumer | Mapping | Pull request or commit | Checks | State |
| --- | --- | --- | --- | --- |
| Web | Metadata, social-card text, and alternative text | [web#19](https://github.com/openbindings/web/pull/19), `a0ff68d` | 43 local tests and exact source assertions pass; regenerated card reviewed; hosted CI awaits retarget from its Wave 0 base to `main` | migrating |
| Spec | README introduction and repository description | [spec#32](https://github.com/openbindings/spec/pull/32), `ccf18c9` | README assertion passes locally; hosted CI awaits retarget from its Wave 0 base to `main` | migrating |
| CLI | Human-facing root help plus a concrete, nonslogan product description | [ob#37](https://github.com/openbindings/ob/pull/37), `1d89a92` | App/cmd suites pass locally; hosted CI stops before build on the pre-existing published-module checksum mismatch | migrating |
| Go SDK | README introduction | [openbindings-go#62](https://github.com/openbindings/openbindings-go/pull/62), `40223e3` | All ten hosted module jobs pass | migrating |
| TypeScript SDK | Root and SDK README introductions | [openbindings-ts#64](https://github.com/openbindings/openbindings-ts/pull/64), `e2a72cb` | Build, all 335 local tests, and hosted CI pass | migrating |
| Elements and Workbench | No project tagline currently presented | No migration required | Scope review | out_of_scope |
| OAuth | No project tagline currently presented | No migration required | Scope review | out_of_scope |

GitHub organization and repository descriptions are public metadata consumers;
their adoption will be recorded alongside the owning surface after the
canonical Design change lands.

## Exceptions and follow-ups

- Product headlines, scenario copy, and longer teaching explanations remain
  intentionally local.
- Broader voice, tone, capitalization, and UI-content patterns remain queued in
  the separate `voice-content` slice.
- Final verification date: pending consumer adoption.
