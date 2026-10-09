import { access, mkdir, readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const sourcePath = new URL("tokens/foundations.json", root);
const generatedDirectory = new URL("tokens/generated/", root);
const outputPath = new URL("openbindings-foundations.css", generatedDirectory);
const source = JSON.parse(await readFile(sourcePath, "utf8"));

if (source.format !== "openbindings.foundations@1") {
  throw new Error("foundations must use openbindings.foundations@1");
}
if (source.maturity !== "stable") {
  throw new Error("foundations revision 1 must remain stable after consumer proof");
}

const requirements = source.policy?.requirements ?? {};
const references = source.policy?.references ?? {};
const requiredRequirements = [
  "visibleFocus",
  "targetAccess",
  "reducedMotion",
  "adaptableText",
];

for (const name of requiredRequirements) {
  if (requirements[name]?.level !== "required" || !requirements[name]?.rule) {
    throw new Error(`${name} must remain an explicit foundation requirement`);
  }
}

for (const [name, reference] of Object.entries(references)) {
  if (reference.binding !== "advisory" || reference.closed !== false) {
    throw new Error(`${name} must remain an open advisory reference`);
  }
}

if (
  source.identityComposition?.canonicalWordmark !== false ||
  source.identityComposition?.canonicalLockup !== false
) {
  throw new Error("foundations must not define a canonical wordmark or lockup");
}

const lengthPattern = /^\d+(?:\.\d+)?px$/;
const durationPattern = /^\d+(?:\.\d+)?ms$/;
for (const [name, value] of Object.entries(references.rhythm.anchors)) {
  if (!lengthPattern.test(value)) throw new Error(`rhythm.${name} must be a pixel length`);
}
for (const [name, value] of Object.entries(references.shape.radii)) {
  if (!lengthPattern.test(value)) throw new Error(`shape.${name} must be a pixel length`);
}
for (const name of ["width", "offset"]) {
  if (!lengthPattern.test(references.focus[name])) {
    throw new Error(`focus.${name} must be a pixel length`);
  }
}
for (const [name, value] of Object.entries(references.motion)) {
  if (name === "binding" || name === "closed" || name === "rule") continue;
  if (!durationPattern.test(value)) throw new Error(`motion.${name} must be a duration`);
}

const rhythm = references.rhythm.anchors;
const radii = references.shape.radii;
const motion = references.motion;
const output = `/* Generated from tokens/foundations.json.
   Foundations revision ${source.revision}; maturity: ${source.maturity}.
   These --reference-* conventions are optional starting points, not conformance requirements.
   Do not edit by hand. */

:root {
  --ob-foundation-reference-font-sans: ${references.typography.sans};
  --ob-foundation-reference-font-mono: ${references.typography.mono};
  --ob-foundation-reference-space-compact: ${rhythm.compact};
  --ob-foundation-reference-space-control: ${rhythm.control};
  --ob-foundation-reference-space-content: ${rhythm.content};
  --ob-foundation-reference-space-section: ${rhythm.section};
  --ob-foundation-reference-space-expansive: ${rhythm.expansive};
  --ob-foundation-reference-radius-xs: ${radii.xs};
  --ob-foundation-reference-radius-sm: ${radii.sm};
  --ob-foundation-reference-radius-md: ${radii.md};
  --ob-foundation-reference-radius-lg: ${radii.lg};
  --ob-foundation-reference-focus-width: ${references.focus.width};
  --ob-foundation-reference-focus-offset: ${references.focus.offset};
  --ob-foundation-reference-duration-fast: ${motion.fast};
  --ob-foundation-reference-duration-interface: ${motion.interface};
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --ob-foundation-reference-duration-fast: ${motion.reduced};
    --ob-foundation-reference-duration-interface: ${motion.reduced};
  }
}
`;

if (process.argv.includes("--check")) {
  await access(outputPath);
  const actual = await readFile(outputPath, "utf8");
  if (actual !== output) {
    throw new Error(`${outputPath.pathname} is stale; run npm run generate`);
  }
  console.log("foundations check: required guardrails and open references current");
} else {
  await mkdir(generatedDirectory, { recursive: true });
  await writeFile(outputPath, output);
  console.log("generated optional OpenBindings foundation references");
}
