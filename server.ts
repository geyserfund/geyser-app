/* eslint-disable @typescript-eslint/no-var-requires */
import type { NextFunction, Request, Response } from 'express'

const express = require('express')
const handler = require('serve-handler')
const prerender = require('prerender-node')
const cors = require('cors')

console.log(
  `ENV VAR CHECK:\n\tPORT: ${process.env.PORT}\nPRERENDER_TOKEN: not null -> ${Boolean(process.env.PRERENDER_TOKEN)}`,
)

const PORT = process.env.PORT || 3000
const app = express()

const prerenderBlockedPathPatterns = [
  /^\/logout\/?$/,
  /^\/launch(?:\/.*)?$/,
  /^\/project\/[^/]+\/dashboard(?:\/.*)?$/,
  /^\/project\/[^/]+\/funding(?:\/.*)?$/,
  /^\/project\/[^/]+\/story\/?$/,
  /^\/project\/[^/]+\/(posts|rewards)\/(create|edit)(?:\/[^/]+)?\/?$/,
  /^\/project\/[^/]+\/entry(?:\/.*)?$/,
  /^\/(user|hero)\/[^/]+\/settings(?:\/.*)?$/,
  /^\/refund(?:\/.*)?$/,
]

const shouldSkipPrerenderPath = (url = '') => {
  const pathname = url.split('?')[0] || '/'
  return prerenderBlockedPathPatterns.some((pattern) => pattern.test(pathname))
}

app.use(
  cors({
    credentials: true,
  }),
)

const prerenderMiddleware = prerender
  .set('prerenderToken', process.env.PRERENDER_TOKEN)
  .set('afterRender', (err: unknown) => {
    // If the request to prerender server fails, just return the normal static files.
    if (err) {
      console.error('Prerender Error', err)
      return { cancelRender: true }
    }
  })

app.use((request: Request, response: Response, next: NextFunction) => {
  if (shouldSkipPrerenderPath(request.url)) {
    return next()
  }

  return prerenderMiddleware(request, response, next)
})

app.use((request: Request, response: Response) => {
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
