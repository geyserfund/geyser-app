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
  if (!Number.isFinite(statusCode) || statusCode >= 500) {
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

app.use(
  cors({
    credentials: true,
  }),
)

app.use(
  prerender
    .set('prerenderToken', process.env.PRERENDER_TOKEN)
    .set('prerenderServiceUrl', process.env.PRERENDER_SERVICE_URL)
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
