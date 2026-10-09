import { readFile } from "node:fs/promises";

const loop = JSON.parse(
  await readFile(new URL("../design-loop.json", import.meta.url), "utf8"),
);
const slice = loop.slices[loop.activeSlice];

const nextByStatus = {
  inventory: "Complete exact evidence, semantic comparison, and difference classifications.",
  proposal: "Review the shared rule, adaptations, accessibility criteria, and migration impact.",
  canonical: "Open consumer migrations against the accepted Design source of truth.",
  migration: "Finish consumer checks and record adoption or approved exceptions.",
};

console.log(`Active design slice: ${slice.title} (${loop.activeSlice})`);
console.log(`Status: ${slice.status}`);
console.log(`Record: ${slice.record}`);
console.log("Consumer state:");
for (const [consumer, state] of Object.entries(slice.adoption)) {
  console.log(`  ${consumer.padEnd(12)} ${state}`);
}
console.log(`Next: ${nextByStatus[slice.status] ?? "Select the next queued slice."}`);
