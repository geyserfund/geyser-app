# SEO Metadata Standard

## Purpose

Define a single metadata contract for public pages so SSR output is crawler-safe and consistent across modules.

## Scope

Applies to all public routes that should produce SEO/social metadata.

Does not apply to private/funding/refund flows that are intentionally CSR-first.

## Required Tags (Baseline)

Every public page should provide, directly or via fallback:

- `<title>`
- `meta[name="description"]`
- `meta[property="og:title"]`
- `meta[property="og:description"]`
- `meta[property="og:image"]`
- `meta[property="og:url"]`
- `meta[property="og:type"]`
- `meta[name="twitter:card"]`
- `meta[name="twitter:site"]`
- `link[rel="canonical"]`

## Recommended Tags (Enhanced)

- `meta[name="twitter:title"]`
- `meta[name="twitter:description"]`
- `meta[name="twitter:image"]`
- `meta[property="og:image:alt"]`
- JSON-LD `<script type="application/ld+json">` for entity pages (project/post/reward/grant).

## Descriptor Pattern

Use a shared descriptor instead of hand-crafting tags in many components.

Example fields:

- `title`
- `description`
- `image`
- `url` (canonical)
- `type` (`website`, `article`, etc.)
- `imageAlt?`
- `jsonLd?`

## Ownership Pattern

Metadata source-of-truth should follow module ownership:

- Project metadata builders: project module tools.
- Discovery metadata builders: discovery module tools.
- Grants metadata builders: grants module tools.

Pages compose:

1. module data
2. module metadata builder
3. shared `SeoHead` renderer

## Fallback Rules

Fallback chains must be deterministic.

Example:

1. Route/entity-specific values
2. Module defaults
3. Global defaults from `shared/constants/platform/metaTags.ts`

## SSR Requirements

- Head tags must be emitted in server HTML for public SSR routes.
- SSR pipeline must serialize/inject head tags in server HTML for crawlers.
- Request-scoped head context (`react-helmet-async`) is the preferred hardening target.
- Final HTML cache payload must include injected head output.
- Metadata/url helpers used during SSR must not rely on unguarded browser globals; use SSR-safe origin helpers.

## Validation Checklist

For each SEO-relevant route:

1. View-source contains expected `<title>`, OG, Twitter, canonical tags.
2. JSON-LD script present where applicable.
3. Discord preview resolves correct title/image/description.
4. No regression in hydration or route behavior.

## Documentation Rule

When metadata architecture changes:

1. Update this file.
2. Update `docs/PLAN_SSR_SEO_HEAD_ARCHITECTURE.md`.
3. Include a concise change summary in PR/implementation notes.
