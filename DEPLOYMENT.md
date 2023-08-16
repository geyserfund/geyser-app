# Geyser App Frontend 🌊

The Geyser Front-End


## Production Push guidelines


### PR to Production
1. We create a PR to production from staging branch.

### Translations
We push the latest translation to staging branch, via poEditor console.
1. Geyser Project -> Integrations -> Github
2. Select languages to update -> Export to Github -> Confirm

### Update app version and changelog.md
1. We update the app version in package.json as per Semenatic Versioning 2.0.0
2. Hit `yarn changelog` to generate changeset commit messages list to changelog.md.
3. run `git tag v0.0.0` to the version corresponding to the version in package.json


### MERGE!!!
