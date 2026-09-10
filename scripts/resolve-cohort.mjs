#!/usr/bin/env node

import { appendFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProject, resolveSelection } from "./project-lib.mjs";
import { integrationPlan } from "./integration-plan.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function argument(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

try {
  const project = loadProject(root);
  const cohortArgument = argument("--cohort", "cohorts/0.2/next.json");
  const cohortPath = resolve(root, cohortArgument);
  const cohortKey = relative(root, cohortPath);
  const cohort = project.cohorts.get(cohortKey);
  if (!cohort) throw new Error(`${cohortArgument} is not a validated cohort manifest`);

  const selection = resolveSelection({
    catalog: project.catalog,
    cohort,
    mode: argument("--mode", "cohort"),
    overrideRepository: argument("--override-repository"),
    overrideSha: argument("--override-sha"),
  });

  const outputPath = argument("--github-output");
  if (outputPath) {
    const lines = [`mode=${selection.mode}`, `source=${selection.source}`];
    const extended = argument("--include-extended", "false") === "true";
    const plan = integrationPlan(selection, extended);
    lines.push(`lanes=${JSON.stringify(plan)}`);
    for (const [lane, enabled] of Object.entries(plan)) lines.push(`run_${lane}=${enabled}`);
    lines.push(`jsonata_runtime_repository=${selection.refs['jsonata-runtime'] ? project.catalog.repositories['jsonata-runtime'].repository : ''}`);
    // Hyphenated component keys (openapi-client) sanitize to underscores so
    // workflow expressions can use dot syntax (openapi_client_ref).
    for (const [key, ref] of Object.entries(selection.refs)) lines.push(`${key.replace(/-/g, "_")}_ref=${ref}`);
    lines.push(`selection=${JSON.stringify(selection)}`);
    appendFileSync(outputPath, `${lines.join("\n")}\n`);
  } else {
    console.log(JSON.stringify(selection, null, 2));
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
