#!/usr/bin/env node

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProject, readJson } from "./project-lib.mjs";
import { planWorkingLoop } from "./working-loop-lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

try {
  const project = loadProject(root);
  const loop = readJson(resolve(root, "working-loop.json"));
  const plan = planWorkingLoop(loop, project);

  console.log("Safe work before a human decision:");
  for (const [index, action] of plan.actions.entries()) console.log(`${index + 1}. ${action}`);

  if (plan.decisions.length > 0) {
    console.log("\nSTOP — human decision required:");
    for (const decision of plan.decisions) {
      console.log(`- ${decision.component}: ${decision.reason}`);
    }
  } else {
    console.log("\nSTOP after the listed work. Do not touch a default branch, publish, deploy, or promote a cohort.");
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
