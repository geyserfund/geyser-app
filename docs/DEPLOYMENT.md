# Geyser App Frontend 🌊

The Geyser Front-End

## Production Push guidelines

### PR to Production

1. We create a PR to production from staging branch.

### Update app version and changelog.md

1. Update app version:
    Run `yarn version [ minor | major | patch ]` to enter the new app version
2. Update `CHANGELOG.md` file for minor and major releases:
    Run `yarn changelog` to update automatically based on commit history from last release version.
3. For patch releases:
    Skip the changelog update unless it is explicitly needed for the release.

### MERGE!!!
