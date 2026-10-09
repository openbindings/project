# Design slice: status, feedback, and recovery

Status: inventory
Tracker key: `status-feedback`
Owner: OpenBindings maintainers

## Frame

- **User-perceivable concern:** official surfaces should communicate progress,
  success, warning, failure, availability, and recovery truthfully without
  relying on color or flattening unlike interaction models.
- **In-scope surfaces:** openbindings.com interactive examples, public
  Elements, the `ob start` Workbench, authorization pages, and human-facing
  CLI messages.
- **Out of scope:** normative status terminology, command exit-code contracts,
  machine-readable errors, notification infrastructure, and general color or
  typography foundations.
- **Contract boundary:** components and products own state machines and
  behavior. Design may define cross-surface message anatomy, semantic cues,
  progress principles, and modality adaptations.
- **Completion evidence:** pinned state inventories, recovery-path comparison,
  non-color cue rules, representative specimens, and verified consumer
  adoption.

## Starting questions

1. Which state names and message anatomy already recur across browser and
   terminal surfaces?
2. Where do loading, empty, unavailable, partial, success, warning, and error
   states currently overclaim or omit a recovery path?
3. Which feedback should be inline, attached to a control, announced, logged,
   or summarized in each modality?
4. Which existing differences are component behavior, product policy, or
   terminal adaptation rather than visual drift?

No status or recovery pattern is canonical yet. Existing consumer behavior
remains authoritative until exact evidence is recorded and reviewed.

