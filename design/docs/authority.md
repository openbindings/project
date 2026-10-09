# Authority and ownership

OpenBindings Design is an integrating design authority, not an authority over
every concept that appears in a user interface. Repository location does not
erase the project's existing layer boundaries.

| Subject | Authority | Design's relationship |
| --- | --- | --- |
| Normative concepts, names, and document rules | `openbindings/spec` | Uses the canonical vocabulary; never redefines it |
| Shared nonnormative contracts | `openbindings/interfaces` | Presents them faithfully; never changes their contract |
| Brand identity and official visual expression | `openbindings/project/design` | Owns |
| Cross-surface voice and product UI content | `openbindings/project/design` | Owns principles and patterns |
| Component properties, events, parts, and theme API | `openbindings/elements` | Supplies shared foundations; Elements owns its API |
| Website teaching, editorial structure, and deployment | `openbindings/web` | Supplies brand and experience guidance; Web owns the publication |
| CLI commands, flags, output contracts, and runtime behavior | `openbindings/ob` | Supplies voice and semantic presentation roles; `ob` owns terminal-native expression |
| Verified cohorts and cross-repository integration | `openbindings/project` | Project records and verifies adoption; Design versions independently |

## Rules for cross-layer language

1. Domain vocabulary flows from its domain authority into Design, never the
   other direction. Design may propose a terminology change to the owner but
   may not silently establish one through UI copy.
2. Design owns how official surfaces speak: voice, tone, capitalization,
   message anatomy, action-label patterns, and situational register.
3. Each product owns the final native expression. A CLI message, documentation
   paragraph, and dialog may differ while following one voice and vocabulary.
4. Machine-readable output is a contract, not brand copy. Design guidance
   applies only where a human presentation lane exists.
5. Official brand guidance does not constrain third-party OpenBindings
   implementations or Elements adopters.

## Change routing

A design change that requires consumer implementation lands first here, then in
each owning consumer repository. `openbindings/project` may coordinate and
verify those commits, but no project cohort or lockstep release is required.
