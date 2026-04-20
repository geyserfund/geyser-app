# Release Prep Skill

## Purpose

Use this skill when preparing a `geyser-app` release for production so versioning, changelog handling, tagging, and PR creation follow the team workflow.

## When To Use

Apply this skill for any task that:
- bumps the app version
- prepares a release commit
- creates or pushes a release tag
- opens the `staging` to `production` PR

## Required Inputs

- `AGENTS.md`
- `docs/DEPLOYMENT.md`

## Release-Type Rules

Choose the workflow based on the requested release type.

- Patch release:
  Skip `yarn changelog`.
  Do not update `CHANGELOG.md` unless the user explicitly asks for it.
- Minor release:
  Run `yarn changelog` after the version bump.
- Major release:
  Run `yarn changelog` after the version bump.

## Standard Workflow

1. Inspect `git status --short` before making release changes and note unrelated local edits.
2. Confirm the release type from the user request or task context.
3. Run the appropriate version command: `yarn version patch`, `yarn version minor`, or `yarn version major`.
4. If the selected release type requires it, run `yarn changelog`.
5. Review the version bump diff before staging or committing anything.
6. Determine the new version from `package.json` or command output.
7. Create the release commit if needed, using conventional-commit format.
8. Create the annotated tag for the exact release commit: `git tag -a vX.Y.Z <release-commit-sha> -m "Release vX.Y.Z"`.
9. Push the branch if needed, then push the release tag.
10. Create the PR from `staging` to `production`.

## Safety Checks

- Do not revert unrelated local changes while preparing the release.
- Do not amend an existing commit unless the user explicitly asks.
- If the current branch is not `staging`, do not assume a production PR is correct without checking intent.
- If a tag for the target version already exists locally or remotely, stop and clarify instead of replacing it.
- If `yarn version` or `yarn changelog` modifies unexpected files, inspect the diff before continuing.

## Output Expectations

Report:
- the release type used
- the new version
- whether changelog updates were intentionally skipped
- the tag that was created and pushed
- whether the `staging` to `production` PR was prepared or opened
