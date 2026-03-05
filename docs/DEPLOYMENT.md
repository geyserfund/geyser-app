# Geyser App Frontend 🌊

The Geyser Front-End

## Production Push guidelines

### PR to Production

1. We create a PR to production from staging branch.

### Update app version and changelog.md

1. Update app version:
    Run `yarn version [ minor | major | patch ]` to enter the new app version
2. Update `CHANGELOG.md` file:
    Run `Yarn changelog` to update automatically based on commit history from last release version.

### MERGE!!!

## SSR Deployment Checklist

Use this checklist for any SSR/SEO-related release:

1. Confirm Cloud Build trigger substitutions include `_SSR_ENABLED` for the target environment.
2. Confirm Cloud Run deploy step still passes `SSR_ENABLED=${_SSR_ENABLED}`.
3. Validate one public project URL with `view-source` after deploy:
   - `<title>`
   - `meta[name="description"]`
   - OG/Twitter tags
   - canonical URL
4. Validate one CSR-only route (funding/refund) still behaves client-side.
