import { readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";

export const CATALOG_FORMAT = "openbindings.repository-catalog@1";
export const COHORT_FORMAT = "openbindings.release-cohort@1";
export const REQUIRED_COMPONENTS = ["spec", "interfaces", "go", "typescript", "ob"];

const SHA_PATTERN = /^[0-9a-f]{40}$/;
const SPECIFICATION_LINE_PATTERN = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/;
const SEMVER_PATTERN =
  /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const REPOSITORY_PATTERN = /^openbindings\/[a-z0-9][a-z0-9-]*$/;
const NUMBERED_COHORT_PATTERN = /^(\d+\.\d+)-r([1-9][0-9]*)\.json$/;

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

export function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`${path}: ${error.message}`, { cause: error });
  }
}

export function validateCatalog(catalog, label = "repositories.json") {
  invariant(catalog && typeof catalog === "object", `${label}: expected an object`);
  invariant(catalog.format === CATALOG_FORMAT, `${label}: unsupported format`);
  invariant(
    catalog.repositories && typeof catalog.repositories === "object" && !Array.isArray(catalog.repositories),
    `${label}: repositories must be an object`,
  );

  const seenRepositories = new Set();
  for (const [key, entry] of Object.entries(catalog.repositories)) {
    invariant(/^[a-z][a-z0-9-]*$/.test(key), `${label}: invalid component key ${key}`);
    invariant(entry && typeof entry === "object", `${label}: ${key} must be an object`);
    invariant(
      REPOSITORY_PATTERN.test(entry.repository ?? ""),
      `${label}: ${key}.repository must name an openbindings repository`,
    );
    invariant(
      !seenRepositories.has(entry.repository),
      `${label}: repository ${entry.repository} is listed more than once`,
    );
    seenRepositories.add(entry.repository);
    invariant(typeof entry.role === "string" && entry.role.length > 0, `${label}: ${key}.role is required`);
    invariant(
      entry.cohortTier === "required" || entry.cohortTier === "extended",
      `${label}: ${key}.cohortTier must be required or extended`,
    );
    invariant(
      typeof entry.defaultBranch === "string" && entry.defaultBranch.length > 0,
      `${label}: ${key}.defaultBranch is required`,
    );
    invariant(
      typeof entry.integrationRef === "string" && entry.integrationRef.length > 0,
      `${label}: ${key}.integrationRef is required`,
    );
    invariant(
      typeof entry.releaseMechanism === "string" && entry.releaseMechanism.length > 0,
      `${label}: ${key}.releaseMechanism is required`,
    );
  }

  for (const key of REQUIRED_COMPONENTS) {
    invariant(catalog.repositories[key], `${label}: required component ${key} is missing`);
    invariant(
      catalog.repositories[key].cohortTier === "required",
      `${label}: ${key} must have required cohort tier`,
    );
  }

  return catalog;
}

export function validateCohort(cohort, catalog, label) {
  invariant(cohort && typeof cohort === "object", `${label}: expected an object`);
  invariant(cohort.format === COHORT_FORMAT, `${label}: unsupported format`);
  invariant(typeof cohort.id === "string" && cohort.id.length > 0, `${label}: id is required`);
  invariant(
    SPECIFICATION_LINE_PATTERN.test(cohort.specificationLine ?? ""),
    `${label}: specificationLine must be major.minor`,
  );
  invariant(
    cohort.status === "candidate" || cohort.status === "verified",
    `${label}: status must be candidate or verified`,
  );
  invariant(
    cohort.components && typeof cohort.components === "object" && !Array.isArray(cohort.components),
    `${label}: components must be an object`,
  );

  for (const key of REQUIRED_COMPONENTS) {
    invariant(cohort.components[key], `${label}: required component ${key} is missing`);
  }

  const seenRepositories = new Set();
  for (const [key, component] of Object.entries(cohort.components)) {
    const catalogEntry = catalog.repositories[key];
    invariant(catalogEntry, `${label}: unknown component ${key}`);
    invariant(component && typeof component === "object", `${label}: ${key} must be an object`);
    invariant(
      component.repository === catalogEntry.repository,
      `${label}: ${key}.repository must be ${catalogEntry.repository}`,
    );
    invariant(
      !seenRepositories.has(component.repository),
      `${label}: repository ${component.repository} is selected more than once`,
    );
    seenRepositories.add(component.repository);
    invariant(
      SHA_PATTERN.test(component.commit ?? ""),
      `${label}: ${key}.commit must be a full lowercase commit SHA`,
    );
    invariant(!("ref" in component), `${label}: ${key} must pin commit, not ref`);
    invariant(!("branch" in component), `${label}: ${key} must pin commit, not branch`);
    if (component.version !== undefined) {
      invariant(
        SEMVER_PATTERN.test(component.version),
        `${label}: ${key}.version must be exact SemVer without a v prefix`,
      );
    }
    invariant(
      typeof component.releaseState === "string" && component.releaseState.length > 0,
      `${label}: ${key}.releaseState is required`,
    );
  }

  const filename = basename(label);
  const numbered = NUMBERED_COHORT_PATTERN.exec(filename);
  if (filename === "next.json") {
    invariant(cohort.status === "candidate", `${label}: next.json must remain a candidate`);
    invariant(
      cohort.id === `openbindings-${cohort.specificationLine}-next`,
      `${label}: candidate id must match its specification line`,
    );
  } else if (numbered) {
    invariant(numbered[1] === cohort.specificationLine, `${label}: filename and specification line differ`);
    invariant(cohort.status === "verified", `${label}: numbered cohorts must be verified`);
    invariant(cohort.id === `openbindings-${filename.slice(0, -5)}`, `${label}: id must match filename`);
    invariant(cohort.evidence && typeof cohort.evidence === "object", `${label}: verified cohort needs evidence`);
    invariant(
      /^https:\/\/github\.com\/openbindings\/project\/actions\/runs\/[1-9][0-9]*$/.test(
        cohort.evidence.workflowRun ?? "",
      ),
      `${label}: evidence.workflowRun must be a project Actions run URL`,
    );
    invariant(
      !Number.isNaN(Date.parse(cohort.evidence.completedAt ?? "invalid")),
      `${label}: evidence.completedAt must be a timestamp`,
    );
  } else {
    throw new Error(`${label}: cohort files must be next.json or <line>-r<number>.json`);
  }

  return cohort;
}

function cohortFiles(root) {
  const cohortRoot = join(root, "cohorts");
  const files = [];
  for (const entry of readdirSync(cohortRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const directory = join(cohortRoot, entry.name);
    for (const file of readdirSync(directory, { withFileTypes: true })) {
      if (file.isFile() && file.name.endsWith(".json")) files.push(join(directory, file.name));
    }
  }
  return files.sort();
}

export function loadProject(root) {
  const absoluteRoot = resolve(root);
  const catalogPath = join(absoluteRoot, "repositories.json");
  const catalog = validateCatalog(readJson(catalogPath), relative(absoluteRoot, catalogPath));
  const cohorts = new Map();
  for (const path of cohortFiles(absoluteRoot)) {
    const label = relative(absoluteRoot, path);
    const cohort = validateCohort(readJson(path), catalog, label);
    cohorts.set(label, cohort);
  }
  invariant(cohorts.size > 0, "no cohort manifests found");
  return { root: absoluteRoot, catalog, cohorts };
}

export function resolveSelection({ catalog, cohort, mode = "cohort", overrideRepository, overrideSha }) {
  invariant(mode === "cohort" || mode === "heads", `unsupported resolution mode ${mode}`);
  const refs = {};
  for (const [key, entry] of Object.entries(catalog.repositories)) {
    if (mode === "cohort") {
      const component = cohort.components[key];
      if (component) refs[key] = component.commit;
    } else {
      refs[key] = entry.integrationRef;
    }
  }

  let source = "all";
  if (overrideRepository || overrideSha) {
    invariant(overrideRepository && overrideSha, "repository and SHA overrides must be supplied together");
    invariant(SHA_PATTERN.test(overrideSha), "override SHA must be a full lowercase commit SHA");
    const match = Object.entries(catalog.repositories).find(
      ([key, entry]) => key === overrideRepository || entry.repository === overrideRepository,
    );
    invariant(match, `override repository ${overrideRepository} is not in repositories.json`);
    source = match[0];
    refs[source] = overrideSha;
  }

  for (const key of REQUIRED_COMPONENTS) invariant(refs[key], `resolved selection is missing ${key}`);
  return { mode, source, refs };
}

export function isNumberedCohortPath(path) {
  const normalized = path.replaceAll("\\", "/");
  const parts = normalized.split("/");
  if (parts.length !== 3 || parts[0] !== "cohorts") return false;
  return SPECIFICATION_LINE_PATTERN.test(parts[1]) && NUMBERED_COHORT_PATTERN.test(parts[2]);
}
