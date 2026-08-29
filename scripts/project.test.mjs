import assert from "node:assert/strict";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  isNumberedCohortPath,
  loadProject,
  readJson,
  resolveSelection,
  validateCohort,
} from "./project-lib.mjs";
import { planWorkingLoop, validateWorkingLoop } from "./working-loop-lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const project = loadProject(root);
const cohort = project.cohorts.get("cohorts/0.2/next.json");
const workingLoop = readJson(resolve(root, "working-loop.json"));

test("the repository catalog and checked-in cohorts validate", () => {
  assert.equal(Object.keys(project.catalog.repositories).length, 9);
  assert.equal(cohort.status, "candidate");
});

test("cohort mode resolves immutable commits", () => {
  const selection = resolveSelection({ catalog: project.catalog, cohort });
  assert.equal(selection.mode, "cohort");
  assert.equal(selection.source, "all");
  assert.match(selection.refs.spec, /^[0-9a-f]{40}$/);
  assert.match(selection.refs.ob, /^[0-9a-f]{40}$/);
});

test("heads mode resolves declared development refs", () => {
  const selection = resolveSelection({ catalog: project.catalog, cohort, mode: "heads" });
  assert.equal(selection.refs.spec, "release/0.2");
  assert.equal(selection.refs.go, "release/0.2");
});

test("a component event overrides only that repository", () => {
  const sha = "a".repeat(40);
  const selection = resolveSelection({
    catalog: project.catalog,
    cohort,
    overrideRepository: "openbindings/ob",
    overrideSha: sha,
  });
  assert.equal(selection.source, "ob");
  assert.equal(selection.refs.ob, sha);
  assert.equal(selection.refs.spec, cohort.components.spec.commit);
});

test("an override must be a full commit SHA", () => {
  assert.throws(
    () =>
      resolveSelection({
        catalog: project.catalog,
        cohort,
        overrideRepository: "go",
        overrideSha: "main",
      }),
    /full lowercase commit SHA/,
  );
});

test("a cohort cannot select a branch", () => {
  const invalid = structuredClone(cohort);
  invalid.components.go.commit = "experiment/obi-first";
  assert.throws(
    () => validateCohort(invalid, project.catalog, "cohorts/0.2/next.json"),
    /full lowercase commit SHA/,
  );
});

test("only numbered cohort records are immutable", () => {
  assert.equal(isNumberedCohortPath("cohorts/0.2/0.2-r1.json"), true);
  assert.equal(isNumberedCohortPath("cohorts/0.2/next.json"), false);
  assert.equal(isNumberedCohortPath("README.md"), false);
});

test("the working loop follows the catalog's explicit integration refs", () => {
  const invalid = structuredClone(workingLoop);
  invalid.repositories.go.workingRef = "main";
  assert.throws(() => validateWorkingLoop(invalid, project), /must match repositories.json integrationRef/);
});

test("the working loop names every unresolved human decision", () => {
  validateWorkingLoop(workingLoop, project);
  const plan = planWorkingLoop(workingLoop, project);
  assert.deepEqual(
    plan.decisions.map((decision) => decision.component).sort(),
    [],
  );
  assert.equal(plan.actions.some((action) => action.includes("openbindings-go/pull/61")), false);
  assert.equal(plan.actions.some((action) => action.includes("openbindings-ts/pull/63")), false);
  assert.equal(plan.actions.some((action) => action.includes("openbindings/ob/pull/33")), false);
  assert.equal(plan.actions.some((action) => action.includes("interfaces/pull/26")), false);
  assert.equal(plan.actions.some((action) => action.includes("elements/pull/1")), false);
  assert.equal(plan.actions.some((action) => action.includes("spec/pull/29")), false);
  assert.equal(plan.actions.some((action) => action.includes("spec/pull/30")), false);
});

test("the working loop requires open caller triggers to follow development lines", () => {
  const invalid = structuredClone(workingLoop);
  invalid.repositories.spec.callerPullRequest.status = "open";
  delete invalid.repositories.spec.callerPullRequest.mergedCommit;
  invalid.repositories.spec.callerPullRequest.base = "release/0.2";
  invalid.repositories.spec.callerPullRequest.triggerRef = "main";
  assert.throws(() => validateWorkingLoop(invalid, project), /triggerRef must match workingRef/);
});

test("the working loop requires proof for a completed merge", () => {
  const invalid = structuredClone(workingLoop);
  delete invalid.repositories.spec.callerPullRequest.mergedCommit;
  assert.throws(() => validateWorkingLoop(invalid, project), /full lowercase commit SHA/);
});
