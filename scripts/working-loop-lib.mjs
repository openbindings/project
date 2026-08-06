export const WORKING_LOOP_FORMAT = "openbindings.working-branch-loop@1";

const LINE_PATTERN = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/;
const PULL_REQUEST_PATTERN =
  /^https:\/\/github\.com\/(openbindings\/[a-z0-9][a-z0-9-]*)\/pull\/([1-9][0-9]*)$/;

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function validatePullRequest(pullRequest, repository, label) {
  invariant(pullRequest && typeof pullRequest === "object", `${label}: expected an object`);
  const match = PULL_REQUEST_PATTERN.exec(pullRequest.url ?? "");
  invariant(match, `${label}.url must be an OpenBindings pull request URL`);
  invariant(match[1] === repository, `${label}.url must belong to ${repository}`);
  invariant(
    typeof pullRequest.base === "string" && pullRequest.base.length > 0,
    `${label}.base is required`,
  );
}

export function validateWorkingLoop(loop, project, label = "working-loop.json") {
  invariant(loop && typeof loop === "object", `${label}: expected an object`);
  invariant(loop.format === WORKING_LOOP_FORMAT, `${label}: unsupported format`);
  invariant(LINE_PATTERN.test(loop.specificationLine ?? ""), `${label}: invalid specificationLine`);
  invariant(
    typeof loop.candidate === "string" && project.cohorts.has(loop.candidate),
    `${label}: candidate must name a checked-in cohort manifest`,
  );
  const candidate = project.cohorts.get(loop.candidate);
  invariant(candidate.status === "candidate", `${label}: candidate must not be verified`);
  invariant(
    candidate.specificationLine === loop.specificationLine,
    `${label}: candidate and specificationLine differ`,
  );
  invariant(loop.mergeMethod === "squash", `${label}: working-branch changes use squash merge`);
  invariant(
    loop.repositories && typeof loop.repositories === "object" && !Array.isArray(loop.repositories),
    `${label}: repositories must be an object`,
  );

  const catalogKeys = Object.keys(project.catalog.repositories).sort();
  const loopKeys = Object.keys(loop.repositories).sort();
  invariant(
    JSON.stringify(loopKeys) === JSON.stringify(catalogKeys),
    `${label}: repositories must exactly match repositories.json`,
  );

  const seenPullRequests = new Set();
  for (const key of catalogKeys) {
    const catalogEntry = project.catalog.repositories[key];
    const entry = loop.repositories[key];
    invariant(entry && typeof entry === "object", `${label}: ${key} must be an object`);
    if (entry.workingRef === null) {
      invariant(
        typeof entry.decisionRequired === "string" && entry.decisionRequired.length > 0,
        `${label}: ${key} needs decisionRequired while workingRef is null`,
      );
    } else {
      invariant(
        typeof entry.workingRef === "string" && entry.workingRef.length > 0,
        `${label}: ${key}.workingRef must be a branch or null`,
      );
      invariant(
        entry.workingRef !== catalogEntry.defaultBranch,
        `${label}: ${key}.workingRef must not be the default branch`,
      );
      invariant(
        entry.decisionRequired === undefined,
        `${label}: ${key}.decisionRequired must be removed after selecting workingRef`,
      );
    }

    validatePullRequest(entry.callerPullRequest, catalogEntry.repository, `${label}: ${key}.callerPullRequest`);
    invariant(
      !seenPullRequests.has(entry.callerPullRequest.url),
      `${label}: pull request ${entry.callerPullRequest.url} is listed more than once`,
    );
    seenPullRequests.add(entry.callerPullRequest.url);
    invariant(Array.isArray(entry.fixPullRequests), `${label}: ${key}.fixPullRequests must be an array`);
    for (const [index, pullRequest] of entry.fixPullRequests.entries()) {
      validatePullRequest(pullRequest, catalogEntry.repository, `${label}: ${key}.fixPullRequests[${index}]`);
      invariant(
        !seenPullRequests.has(pullRequest.url),
        `${label}: pull request ${pullRequest.url} is listed more than once`,
      );
      seenPullRequests.add(pullRequest.url);
    }
  }
  return loop;
}

export function planWorkingLoop(loop, project) {
  validateWorkingLoop(loop, project);
  const decisions = [];
  const actions = [];

  for (const [key, entry] of Object.entries(loop.repositories)) {
    if (entry.workingRef === null) {
      decisions.push({ component: key, reason: entry.decisionRequired });
      continue;
    }
    for (const pullRequest of entry.fixPullRequests) {
      if (pullRequest.base !== entry.workingRef) {
        actions.push(`retarget ${pullRequest.url} from ${pullRequest.base} to ${entry.workingRef}`);
      }
      actions.push(`squash-merge ${pullRequest.url} into ${entry.workingRef} after its required checks pass`);
    }
  }

  for (const [key, entry] of Object.entries(loop.repositories)) {
    if (entry.workingRef === null) continue;
    const pullRequest = entry.callerPullRequest;
    if (pullRequest.base !== entry.workingRef) {
      actions.push(`retarget ${pullRequest.url} from ${pullRequest.base} to ${entry.workingRef}`);
    }
    actions.push(`squash-merge ${pullRequest.url} into ${entry.workingRef} after its required checks pass`);
  }

  actions.push(`replace changed component SHAs in ${loop.candidate} with the resulting working-branch heads`);
  actions.push("run project validation, then the core exact-cohort workflow");
  actions.push("run Elements and website extended validation without deploying either component");
  actions.push("repair only mechanically proven failures, then return to the SHA-update step");
  actions.push("apply non-semantic repository protection that does not select required reviews or checks");

  return { actions, decisions };
}
