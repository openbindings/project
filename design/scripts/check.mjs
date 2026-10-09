import { access, readFile } from "node:fs/promises";

const required = [
  "README.md",
  "CONTRIBUTING.md",
  "LICENSE",
  "docs/authority.md",
  "docs/current-state.md",
  "docs/development-loop.md",
  "docs/evidence/2026-08-07-common-ground.md",
  "docs/evidence/2026-08-07-color-theme-inventory.md",
  "docs/evidence/2026-08-07-color-theme-adoption.md",
  "docs/evidence/2026-08-07-identity-adoption.md",
  "docs/evidence/2026-08-07-identity-rendering.md",
  "docs/evidence/2026-08-07-machine-material-inventory.md",
  "docs/evidence/2026-08-07-machine-material-adoption.md",
  "docs/evidence/2026-08-07-foundations-inventory.md",
  "docs/evidence/2026-08-07-foundations-adoption.md",
  "docs/evidence/2026-08-08-verbal-identity-inventory.md",
  "docs/decisions/0001-independent-repository.md",
  "docs/decisions/0002-canonical-glyph.md",
  "docs/decisions/0003-canonical-tagline.md",
  "docs/slices/color-theme.md",
  "docs/slices/foundations.md",
  "docs/slices/status-feedback.md",
  "docs/slices/identity.md",
  "docs/slices/machine-material.md",
  "docs/slices/verbal-identity.md",
  "docs/templates/design-slice.md",
  "design-loop.json",
  "assets/README.md",
  "assets/manifest.json",
  "assets/openbindings-glyph.svg",
  "assets/generated/favicon.svg",
  "assets/generated/openbindings-glyph.svg",
  "brand/README.md",
  "brand/identity.md",
  "brand/theme.md",
  "brand/verbal-identity.json",
  "brand/verbal-identity.md",
  "experience/README.md",
  "experience/foundations.md",
  "experience/machine-material.md",
  "tokens/README.md",
  "tokens/color.json",
  "tokens/machine-material.json",
  "tokens/foundations.json",
  "tokens/themes/openbindings.json",
  "tokens/generated/openbindings-theme.css",
  "tokens/generated/openbindings-machine-material.css",
  "tokens/generated/openbindings-machine-light.json",
  "tokens/generated/openbindings-machine-dark.json",
  "tokens/generated/openbindings-foundations.css",
  "packages/README.md",
  "scripts/design-loop.mjs",
  "scripts/generate-assets.mjs",
  "scripts/generate-theme.mjs",
  "scripts/generate-foundations.mjs",
  "scripts/generate-machine-material.mjs",
  "specimens/color-theme.html",
  "specimens/identity.html",
  "specimens/foundations.html",
  "specimens/machine-material.html",
  "specimens/fixtures/machine-material.json",
  "specimens/fixtures/machine-material.yaml",
];

await Promise.all(required.map(path => access(new URL(`../${path}`, import.meta.url))));

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

if (packageJson.name !== "@openbindings/design-workspace") {
  throw new Error("workspace package name must remain @openbindings/design-workspace");
}
if (packageJson.private !== true) {
  throw new Error("the repository root must remain private; publish packages/ entries instead");
}

const designLoop = JSON.parse(
  await readFile(new URL("../design-loop.json", import.meta.url), "utf8"),
);
const verbalIdentity = JSON.parse(
  await readFile(new URL("../brand/verbal-identity.json", import.meta.url), "utf8"),
);
const verbalIdentityGuide = await readFile(
  new URL("../brand/verbal-identity.md", import.meta.url),
  "utf8",
);
const verbalIdentityGuideNormalized = verbalIdentityGuide.replace(/\s+/g, " ");
const sliceStates = new Set([
  "queued",
  "inventory",
  "proposal",
  "canonical",
  "migration",
  "verified",
]);
const adoptionStates = new Set([
  "not_started",
  "observed",
  "migrating",
  "adopted",
  "exception",
  "out_of_scope",
]);
const consumers = Object.keys(designLoop.consumers ?? {});

if (designLoop.format !== "openbindings.design-loop@1") {
  throw new Error("design-loop.json must use openbindings.design-loop@1");
}
if (consumers.length === 0) {
  throw new Error("design-loop.json must declare at least one consumer");
}

if (
  verbalIdentity.format !== "openbindings.verbal-identity@1" ||
  verbalIdentity.revision !== 1 ||
  verbalIdentity.tagline !== "One interface. Any binding." ||
  verbalIdentity.descriptor !==
    "Describe what a service does separately from how you access it."
) {
  throw new Error("verbal identity revision 1 must preserve the canonical strings");
}

for (const fragment of [
  "The tagline is optional.",
  "does not create a wordmark or a fixed glyph-and-name lockup",
  "It does not promise that every implementation has installed, supports, or can reach every binding.",
  "Scenario or campaign headline",
]) {
  if (!verbalIdentityGuideNormalized.includes(fragment)) {
    throw new Error(`verbal identity guidance is missing its open-use boundary: ${fragment}`);
  }
}
if (!designLoop.slices?.[designLoop.activeSlice]) {
  throw new Error("design-loop.json activeSlice must name a declared slice");
}

for (const [key, slice] of Object.entries(designLoop.slices)) {
  if (!sliceStates.has(slice.status)) {
    throw new Error(`${key}: invalid slice status ${slice.status}`);
  }
  if (slice.status !== "queued" && !slice.record) {
    throw new Error(`${key}: active work must link a slice record`);
  }
  if (slice.record) {
    await access(new URL(`../${slice.record}`, import.meta.url));
  }
  if (slice.status === "verified" && (slice.canonical?.length ?? 0) === 0) {
    throw new Error(`${key}: verified slice must retain canonical outputs`);
  }
  for (const evidencePath of slice.evidence ?? []) {
    await access(new URL(`../${evidencePath}`, import.meta.url));
  }
  for (const canonicalPath of slice.canonical ?? []) {
    await access(new URL(`../${canonicalPath}`, import.meta.url));
  }
  for (const consumer of consumers) {
    const state = slice.adoption?.[consumer];
    if (!adoptionStates.has(state)) {
      throw new Error(`${key}: invalid adoption state for ${consumer}: ${state}`);
    }
  }
}

const activeStatus = designLoop.slices[designLoop.activeSlice].status;
if (activeStatus === "queued" || activeStatus === "verified") {
  throw new Error("activeSlice must name work between inventory and migration");
}

console.log(`design check: ${required.length} foundational files present`);
