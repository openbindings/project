# Cold applier review

Read only `procedure.md` and `examples.md`. Reviewed SHA-256 snapshots:

- Procedure: `e1fded247094abe999ac58ef07857945102a1a57b22c82627f6c96fe6fe60e60`
- Examples: `c8d5095929edd6b8250b0ff7ba5a9dc8886bac98cd4400b6f68d50f43bc31c5d`

| Criterion | Grade |
| --- | --- |
| Decidability | A |
| Internal consistency | A |
| Generality | A- |
| Escalation boundary | A |
| Clarity and tone | A- |
| Overall | A- |

## 1. Disputed local CLI default

**Stipulated record.** An unpublished local job CLI has the authorized first use: “Display each queued job's identifier and state.” Its upstream storage contract governs stored identifiers, not display format. The charter authorizes local format decisions; its reader search finds only two recorded in-repository callers. There is no ruling, shared fixture, new dependency, or portable default-format promise. Both candidates retain existing explicit `--format=table` and `--format=json` options. A, the incumbent, defaults to table; B defaults to JSON.

The operator's recorded sequence is `jobs ls`, reading aligned columns; under B it becomes `jobs ls --format=table`. The script's recorded sequence is `jobs ls --format=json | extract_ids`; under B it becomes `jobs ls | extract_ids`. Prior reviewer O argues for A using the operator sequence; reviewer S argues for B using the script. These are genuine opposing caller cases, not votes. Both implementations enforce the same existing 256-job and field-length limits, return the same fields, and report store errors identically. They have the same layer responsibilities. Both defaults accomplish the quoted first use. Removing listing or its default would not meet that use; no smaller candidate resolves the conflict.

**Application.** This is a surface choice outside the authority's scope. Neither bounds nor rule 8 separates the candidates. The supplied caller idioms oppose each other at stage 4; neither dominates. Layer responsibility and portable agreement add no discriminator. Stage 7 again has opposing caller costs; stage 8 leaves both. The surviving incumbent A wins the fallback.

**Record.** D-cli: **applied/pending**, retaining the current default; no behavior patch is needed. Confidence is **inferred**, because neutralizing the competing idiom and effort claims materially uses proposed operational tests; record the residual arbitrary fallback. No local scope is blocked. Landing remains outside this charter. Repeating “JSON is preferable” increments the objection count without reopening; a newly demonstrated parsing failure would be assessed against the prior premises.

**Improvisation:** none in selection or status. The stipulated evidence supplies comparative judgments that a real loop would have to obtain.

## 2. Accepted size decision disproved by a new payload

**Stipulated record.** A member incorporates a pinned transfer rule: “Accept bodies up to and including 16 MiB; reject larger bodies.” A linked maintainer acceptance nevertheless selected an 8 MiB cutoff, relying on a now-disproved claim that every admitted body was at most 8 MiB. Its cutoff, error example, and boundary tests are accepted. An independent integration now supplies an admitted 9 MiB body that is rejected. The correction charter permits ordinary fixes but expressly excludes reversing maintainer rulings. Existing permission to land accepted corrections remains in force.

**Application.** The 9 MiB body challenges a named premise, so reopening is mandatory, not a preference re-raise. Re-reading the quoted requirement establishes that the accepted cutoff was already wrong. The required correction is the 16 MiB boundary, including rejection at 16 MiB plus one byte. There is no admissible alternative to that acceptance behavior within the governing constraints. Acceptance did not make the 8 MiB decision authority.

**Record.** D-size and its materially affected example/tests reset to **pending**. The proposed correction is **held/high**: the read rule decides directly, but reversing the recorded ruling lacks authorization. High confidence does not bypass that boundary. The old implementation cannot be presented as satisfying the transfer rule; mark the feature incomplete in the review artifact and block the corresponding completeness claim. Independent corrections proceed. Preserve the still-applicable landing permission separately; it does not accept the replacement design or authorize this ruling reversal.

**Improvisation:** none. “Do not freeze a choice disproved by new evidence” requires reopening and an honest gap record; it does not cancel step 4's edit hold.

## 3. Compelled wire correction breaks a known reader

**Stipulated record.** A stable framing contract incorporates: “The two-byte length is unsigned, most significant byte first.” The sender instead emits little-endian lengths. At payload length 258 it emits `02 01`; the required bytes are `01 02`. A searched peer repository demonstrably decodes little-endian, so it currently obtains 258 and would obtain 513 after the sender correction. The charter authorizes implementation corrections but no change affecting this shared boundary. No normative text endorses the peer's behavior.

**Application and record.** D-wire is an apply-bin correction, with **held/pending** status and **high** confidence. Its admissible answer is big-endian; the ledger records “none within the governing constraints” as the alternative. Shipped agreement cannot override the incorporated contract, but the known reader conflict independently triggers step 4. Prepare the owner recommendation with the sender and peer evidence. The sender fix and dependent integration expectations remain blocked; unrelated local work proceeds. Record the framing feature's incompleteness instead of inventing a promise that little-endian is conforming.

**Improvisation:** none. The necessary coordinated remedy is an owner decision, not a preference comparison that the loop can win.

## Findings

I found no demonstrated procedural defect in these applications. The rules separate selection, confidence, review acceptance, and action authorization without requiring an invented exception. In particular, an incumbent can win a disputed local choice while remaining pending, and a compelled correction can be high confidence while held.

Optional coverage: a worked accepted-but-invalid ruling like case 2 would make the interaction between reopening and escalation easier to learn. A compact execution checklist could reduce repeated reading. These are presentation improvements, not correctness repairs or requirements for passing. The existing caution about exercising actual API loops remains appropriate; three stipulated cases cannot establish universal applicability.
