/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const handler = require('serve-handler')
const prerender = require('prerender-node')
const cors = require('cors')

console.log(
  `ENV VAR CHECK:\n\tPORT: ${process.env.PORT}\nPRERENDER_TOKEN: not null -> ${Boolean(process.env.PRERENDER_TOKEN)}`,
)

const PORT = process.env.PORT || 3000
const app = express()
const SITE_ORIGIN = 'https://geyser.fund'
const DEFAULT_META_IMAGE = 'https://storage.googleapis.com/geyser-projects-media/app/seo/Geyser_main.png'

const linkPreviewCrawlerUserAgentPatterns = [
  /facebookexternalhit/i,
  /facebot/i,
  /facebookcatalog/i,
  /meta-externalagent/i,
  /meta-externalfetcher/i,
]

const staticLegalRouteMetadata = {
  '/legal/privacy': {
    title: 'Privacy Policy | Geyser',
    description: "Read Geyser's Privacy Policy and how information is collected and used.",
    url: `${SITE_ORIGIN}/legal/privacy`,
  },
  '/legal/terms': {
    title: 'Terms and Conditions | Geyser',
    description: "Read Geyser's Terms and Conditions and platform rules.",
    url: `${SITE_ORIGIN}/legal/terms`,
  },
}

const escapeHtml = (value = '') => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const normalizeStaticRoutePathname = (requestUrl = '/') => {
  const pathname = getPrerenderPathname(requestUrl).toLowerCase()

  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

const isLinkPreviewCrawler = (request) => {
  const userAgent = request?.headers?.['user-agent'] || ''

  return linkPreviewCrawlerUserAgentPatterns.some((pattern) => pattern.test(String(userAgent)))
}

const getStaticLegalRouteMetadata = (requestUrl = '/') => {
  return staticLegalRouteMetadata[normalizeStaticRoutePathname(requestUrl)]
}

const buildStaticMetadataHtml = ({ title, description, url }) => {
  const safeTitle = escapeHtml(title)
  const safeDescription = escapeHtml(description)
  const safeUrl = escapeHtml(url)
  const safeImage = escapeHtml(DEFAULT_META_IMAGE)

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
    <link rel="canonical" href="${safeUrl}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Geyser" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:image:secure_url" content="${safeImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="geyserfund" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${safeImage}" />
  </head>
  <body>
    <main>
      <h1>${safeTitle}</h1>
      <p>${safeDescription}</p>
    </main>
  </body>
</html>`
}

const isHtmlContentType = (headers = {}) => {
  const contentType = headers['content-type'] || headers['Content-Type'] || ''
  if (!contentType) return true
  return /(text\/html|application\/xhtml\+xml)/i.test(String(contentType))
}

const hasRenderableBody = (body) => {
  if (Buffer.isBuffer(body)) return body.length > 0
  if (typeof body === 'string') return body.trim().length > 0
  return false
}

const getPrerenderFallbackReason = (err, prerenderedResponse) => {
  if (err) return 'transport-error'
  if (!prerenderedResponse) return 'missing-response'

  const statusCode = Number(prerenderedResponse.statusCode || 0)
  if (!Number.isFinite(statusCode) || statusCode >= 400) {
    return `upstream-status-${statusCode || 'invalid'}`
  }

  if (!isHtmlContentType(prerenderedResponse.headers)) {
    return 'non-html-content'
  }

  if (!hasRenderableBody(prerenderedResponse.body)) {
    return 'empty-body'
  }

  return null
}

const prerenderBlockedRoutePatterns = [
  // Internal API and system routes
  /^\/(?:api|auth|graphql|cache|healthz)(?:\/|$)/i,
  // Project creation/launch flow (requires auth)
  /^\/launch(?:\/|$)/i,
  // User and hero profile settings pages (requires auth)
  /^\/user\/[^/]+\/settings(?:\/|$)/i,
  /^\/hero\/[^/]+\/settings(?:\/|$)/i,
  // Project creator-only sub-routes under /project/:name/
  /^\/project\/[^/]+\/dashboard(?:\/|$)/i,
  /^\/project\/[^/]+\/(?:story|posts\/(?:create|edit)|rewards\/(?:create|edit))(?:\/|$)/i,
]

const prerenderBlockedExactPaths = new Set(['/meta.json', '/sw.js', '/manifest.json', '/favicon.ico'])

const prerenderBlockedAssetExtensionPattern =
  /\.(?:json|xml|txt|js|css|map|ico|png|jpe?g|gif|webp|svg|woff2?|ttf|otf|eot|pdf|zip|gz|mp4|webm|wasm)$/i

const getPrerenderPathname = (requestUrl = '/') => {
  try {
    return new URL(requestUrl, 'http://localhost').pathname || '/'
  } catch (_error) {
    return '/'
  }
}

const getPrerenderRouteDecision = (requestUrl = '/') => {
  const pathname = getPrerenderPathname(requestUrl)
  const normalizedPathname = pathname.toLowerCase()

  if (prerenderBlockedExactPaths.has(normalizedPathname)) {
    return { allow: false, reason: 'non-indexable-route', pathname }
  }

  if (prerenderBlockedAssetExtensionPattern.test(pathname)) {
    return { allow: false, reason: 'non-html-route', pathname }
  }

  if (prerenderBlockedRoutePatterns.some((pattern) => pattern.test(pathname))) {
    return { allow: false, reason: 'private-route', pathname }
  }

  return { allow: true, reason: 'public-indexable-route', pathname }
}

app.use(
  cors({
    credentials: true,
  }),
)

app.use((request, response, next) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return next()
  }

  if (!isLinkPreviewCrawler(request)) {
    return next()
  }

  const metadata = getStaticLegalRouteMetadata(request.url)
  if (!metadata) {
    return next()
  }

  response.setHeader('Content-Type', 'text/html; charset=utf-8')
  response.setHeader('Cache-Control', 'public, max-age=300')

  return response.status(200).send(buildStaticMetadataHtml(metadata))
})

app.use(
  prerender
    .set('prerenderToken', process.env.PRERENDER_TOKEN)
    .set('prerenderServiceUrl', process.env.PRERENDER_SERVICE_URL)
    .set('beforeRender', (req, done) => {
      const routeDecision = getPrerenderRouteDecision(req?.url || '/')
      if (routeDecision.allow) return done()

      console.info('Prerender route bypass', {
        reason: routeDecision.reason,
        path: routeDecision.pathname,
        url: req?.url,
      })

      return done(null, { status: 204, body: '' })
    })
    .set('afterRender', (err, req, prerenderedResponse) => {
      const fallbackReason = getPrerenderFallbackReason(err, prerenderedResponse)
      if (!fallbackReason) return

      if (err) {
        console.error('Prerender Error', err)
      } else {
        console.warn('Prerender fallback', {
          reason: fallbackReason,
          statusCode: prerenderedResponse?.statusCode,
          url: req?.url,
        })
      }

      return { cancelRender: true }
    }),
)

app.use((request, response) => {
  return handler(request, response, {
    public: './dist',
    rewrites: [{ source: '*', destination: '/index.html' }],
    headers: [
      {
        source: '{sw.js, meta.json}',
        headers: [
          {
            key: 'cache-control',
            value: 'private, no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'pragma',
            value: 'no-cache',
          },
          {
            key: 'expires',
            value: '0',
          },
        ],
      },
    ],
  })
})

app.listen(PORT, () => {
  console.log(`Geyser app listening on port ${PORT}`)
})
