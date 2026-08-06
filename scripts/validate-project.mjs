#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isNumberedCohortPath, loadProject } from "./project-lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function argument(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function checkImmutableCohorts(base) {
  const result = spawnSync("git", ["diff", "--no-renames", "--name-status", `${base}...HEAD`, "--", "cohorts/"], {
    cwd: root,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(`unable to compare cohort history with ${base}: ${result.stderr.trim()}`);
  }

  const violations = [];
  for (const line of result.stdout.split("\n")) {
    if (!line) continue;
    const [status, path] = line.split("\t");
    if (isNumberedCohortPath(path) && status !== "A") violations.push(line);
  }
  if (violations.length > 0) {
    throw new Error(`verified cohort manifests are immutable:\n${violations.join("\n")}`);
  }
}

try {
  const project = loadProject(root);
  const base = argument("--base");
  if (base) checkImmutableCohorts(base);
  console.log(
    `validated ${Object.keys(project.catalog.repositories).length} repositories and ${project.cohorts.size} cohort manifest(s)`,
  );
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
