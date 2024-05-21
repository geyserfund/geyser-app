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

1. Update app version:
    Run `yarn version` to enter the new app version
2. Update `CHANGELOG.md` file:
    Run `Yarn changelog` to update automatically based on commit history from last release version.

### MERGE!!!
