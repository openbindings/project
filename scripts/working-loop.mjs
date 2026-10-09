#!/usr/bin/env node

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProject, readJson } from "./project-lib.mjs";
import { planWorkingLoop, validateWorkingLoop } from "./working-loop-lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

try {
  const project = loadProject(root);
  const loop = readJson(resolve(root, "working-loop.json"));
  validateWorkingLoop(loop, project);
  if (!process.argv.slice(2).includes("--historical")) {
    console.log("Component development uses repository-owned CI (policies/development-loop.md).");
    for (const entry of Object.values(project.catalog.repositories)) {
      console.log(`${entry.repository}: ${entry.integrationRef}`);
    }
    console.log("Historical caller/cohort plans are available with --historical; do not install automatic callers.");
    process.exit(0);
  }
  const plan = planWorkingLoop(loop, project);

  console.log("HISTORICAL plan — superseded by policies/development-loop.md; not current work instructions:");
  for (const [index, action] of plan.actions.entries()) console.log(`${index + 1}. ${action}`);

  if (plan.decisions.length > 0) {
    console.log("\nSTOP — human decision required:");
    for (const decision of plan.decisions) {
      console.log(`- ${decision.component}: ${decision.reason}`);
    }
  } else {
    console.log("\nSTOP after the listed work. Do not change an integration ref, publish, deploy, or promote a cohort.");
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
