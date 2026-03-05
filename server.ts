/* eslint-disable @typescript-eslint/no-var-requires */
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express'

const cors = require('cors')
const express = require('express')
const fs = require('fs')
const path = require('path')
const { pathToFileURL } = require('url')

type SsrRenderResult =
  | {
      kind: 'redirect'
      status: number
      location: string
    }
  | {
      kind: 'render'
      status: number
      html: string
      headHtml: string
      apolloState: Record<string, unknown>
    }

type SsrRenderApp = (options: {
  request: Request
  headers?: Record<string, string>
  fetchImplementation?: typeof fetch
}) => Promise<SsrRenderResult>

type HtmlCacheEntry = {
  expiresAt: number
  status: number
  html: string
}

type GraphqlCacheEntry = {
  expiresAt: number
  status: number
  statusText: string
  headers: Array<[string, string]>
  body: string
}

const PORT = Number(process.env.PORT || 3000)
const SSR_ENABLED = process.env.SSR_ENABLED === 'true'

const HTML_CACHE_TTL_MS = 60_000
const GRAPHQL_CACHE_TTL_MS = 20_000
const HTML_CACHE_MAX_ENTRIES = 250
const GRAPHQL_CACHE_MAX_ENTRIES = 500

const resolveClientDistDir = () => {
  const newDist = path.resolve(__dirname, 'dist/client')
  if (fs.existsSync(newDist)) return newDist
  return path.resolve(__dirname, 'dist')
}

const clientDistDir = resolveClientDistDir()
const serverEntryPath = path.resolve(__dirname, 'dist/server/entry-server.js')
const indexHtmlPath = path.resolve(clientDistDir, 'index.html')
const indexTemplate = fs.readFileSync(indexHtmlPath, 'utf8')

const htmlCache = new Map<string, HtmlCacheEntry>()
const graphqlCache = new Map<string, GraphqlCacheEntry>()

let renderServerAppPromise: Promise<SsrRenderApp> | null = null

const app = express()

const CSR_ONLY_PATTERNS = [
  /^\/project\/[^/]+\/funding(?:\/|$)/,
  /^\/project\/[^/]+\/dashboard(?:\/|$)/,
  /^\/project\/[^/]+\/posts\/(?:create|edit)(?:\/|$)/,
  /^\/project\/[^/]+\/rewards\/(?:create|edit)(?:\/|$)/,
  /^\/project\/[^/]+\/story(?:\/|$)/,
  /^\/refund(?:\/|$)/,
  /^\/launch(?:\/|$)/,
  /^\/start(?:\/|$)/,
  /^\/rules(?:\/|$)/,
  /^\/logout(?:\/|$)/,
  /^\/auth(?:\/|$)/,
  /^\/failed-authentication(?:\/|$)/,
  /^\/my-projects(?:\/|$)/,
  /^\/activity\/followed(?:\/|$)/,
  /^\/user\/[^/]+\/settings(?:\/|$)/,
  /^\/hero\/[^/]+\/settings(?:\/|$)/,
  /^\/widget\/(?:contribution)(?:\/|$)/,
]

const hasAuthHeaders = (headers: Record<string, string | string[] | undefined>) =>
  Boolean(headers.cookie || headers.authorization)

const isSSRRoute = (pathname: string) => !CSR_ONLY_PATTERNS.some((pattern) => pattern.test(pathname))

const isHtmlRequest = (request: ExpressRequest) => {
  if (request.method !== 'GET') return false
  const acceptHeader = request.headers.accept || ''
  return acceptHeader.includes('text/html') || acceptHeader.includes('*/*')
}

const dropExpiredCacheEntries = <T extends { expiresAt: number }>(cache: Map<string, T>) => {
  const now = Date.now()
  cache.forEach((entry, key) => {
    if (entry.expiresAt <= now) {
      cache.delete(key)
    }
  })
}

const trimOldestCacheEntries = <T>(cache: Map<string, T>, maxEntries: number) => {
  while (cache.size > maxEntries) {
    const firstKey = cache.keys().next().value
    if (firstKey === undefined) break
    cache.delete(firstKey)
  }
}

const getOrigin = (request: ExpressRequest) => {
  const forwardedProtoHeader = request.headers['x-forwarded-proto']
  const forwardedProto = Array.isArray(forwardedProtoHeader) ? forwardedProtoHeader[0] : forwardedProtoHeader
  const protocol = forwardedProto || request.protocol
  return `${protocol}://${request.get('host')}`
}

const toWebRequest = (request: ExpressRequest) => {
  const headers = new Headers()

  for (const [key, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item)
      continue
    }

    if (typeof value === 'string') headers.set(key, value)
  }

  const requestUrl = new URL(request.originalUrl || request.url, getOrigin(request)).toString()
  return new Request(requestUrl, {
    method: 'GET',
    headers,
  })
}

const buildApolloRequestHeaders = (request: ExpressRequest): Record<string, string> => {
  const includeHeader = (name: string) => {
    const value = request.headers[name]
    if (!value) return ''
    if (Array.isArray(value)) return value.join(', ')
    return value
  }

  const headers = {
    host: includeHeader('host'),
    'user-agent': includeHeader('user-agent'),
    'accept-language': includeHeader('accept-language'),
    'x-forwarded-proto': includeHeader('x-forwarded-proto'),
    'x-forwarded-host': includeHeader('x-forwarded-host'),
    'x-forwarded-for': includeHeader('x-forwarded-for'),
  }

  return Object.fromEntries(Object.entries(headers).filter(([, value]) => Boolean(value)))
}

const serializeForInlineScript = (value: unknown) =>
  JSON.stringify(value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

const HEAD_INJECTION_MARKER = '<!--app-head-->'

const injectSsrMarkup = (
  template: string,
  appHtml: string,
  apolloState: Record<string, unknown>,
  headHtml: string,
) => {
  const apolloStateScript = `<script>window.__APOLLO_STATE__=${serializeForInlineScript(apolloState)};</script>`
  const withAppHtml = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>\n    ${apolloStateScript}`)

  if (withAppHtml.includes(HEAD_INJECTION_MARKER)) {
    return withAppHtml.replace(HEAD_INJECTION_MARKER, headHtml)
  }

  return withAppHtml.replace('</head>', `${headHtml}\n</head>`)
}

const createGraphqlCachingFetch = ({ allowCache }: { allowCache: boolean }): typeof fetch => {
  const defaultFetch = globalThis.fetch.bind(globalThis)

  return async (input, init) => {
    if (!allowCache) {
      return defaultFetch(input, init)
    }

    const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase()
    const requestUrl = typeof input === 'string' || input instanceof URL ? input.toString() : input.url

    const isGraphqlPostRequest = method === 'POST' && requestUrl.includes('/graphql')
    if (!isGraphqlPostRequest) {
      return defaultFetch(input, init)
    }

    const requestHeaders = new Headers(input instanceof Request ? input.headers : undefined)
    if (init?.headers) {
      const runtimeHeaders = new Headers(init.headers)
      runtimeHeaders.forEach((value, key) => requestHeaders.set(key, value))
    }

    if (requestHeaders.has('authorization') || requestHeaders.has('cookie')) {
      return defaultFetch(input, init)
    }

    const body = typeof init?.body === 'string' ? init.body : ''
    if (!body) {
      return defaultFetch(input, init)
    }

    dropExpiredCacheEntries(graphqlCache)
    const language = requestHeaders.get('accept-language') || ''
    const cacheKey = `${requestUrl}:${language}:${body}`
    const cachedEntry = graphqlCache.get(cacheKey)
    if (cachedEntry && cachedEntry.expiresAt > Date.now()) {
      return new Response(cachedEntry.body, {
        status: cachedEntry.status,
        statusText: cachedEntry.statusText,
        headers: cachedEntry.headers,
      })
    }

    const response = await defaultFetch(input, init)
    if (!response.ok) {
      return response
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return response
    }

    const responseBody = await response.clone().text()
    graphqlCache.set(cacheKey, {
      expiresAt: Date.now() + GRAPHQL_CACHE_TTL_MS,
      status: response.status,
      statusText: response.statusText,
      headers: Array.from(response.headers.entries()),
      body: responseBody,
    })
    trimOldestCacheEntries(graphqlCache, GRAPHQL_CACHE_MAX_ENTRIES)

    return response
  }
}

const loadRenderServerApp = async () => {
  if (!renderServerAppPromise) {
    renderServerAppPromise = import(pathToFileURL(serverEntryPath).href).then((module) => {
      if (typeof module.renderServerApp !== 'function') {
        throw new Error(`renderServerApp was not found in ${serverEntryPath}`)
      }

      return module.renderServerApp as SsrRenderApp
    })
  }

  try {
    return await renderServerAppPromise
  } catch (error) {
    renderServerAppPromise = null
    throw error
  }
}

const setNoStoreHeaders = (response: ExpressResponse) => {
  response.setHeader('cache-control', 'private, no-cache, no-store, must-revalidate, max-age=0')
  response.setHeader('pragma', 'no-cache')
  response.setHeader('expires', '0')
}

const sendSpaShell = (response: ExpressResponse, statusCode = 200) => {
  response.status(statusCode)
  response.setHeader('content-type', 'text/html; charset=utf-8')
  response.send(indexTemplate)
}

app.use(
  cors({
    credentials: true,
  }),
)

app.use(
  express.static(clientDistDir, {
    index: false,
    setHeaders(response, filePath) {
      if (filePath.endsWith('sw.js') || filePath.endsWith('meta.json')) {
        setNoStoreHeaders(response)
      }
    },
  }),
)

app.get('*', async (request, response) => {
  if (!isHtmlRequest(request)) {
    response.status(404).end()
    return
  }

  if (!SSR_ENABLED || !isSSRRoute(request.path)) {
    sendSpaShell(response)
    return
  }

  const requestCanUseCache = !hasAuthHeaders(request.headers)
  const htmlCacheKey = request.originalUrl || request.url

  if (requestCanUseCache) {
    dropExpiredCacheEntries(htmlCache)
    const cachedEntry = htmlCache.get(htmlCacheKey)
    if (cachedEntry && cachedEntry.expiresAt > Date.now()) {
      response.status(cachedEntry.status)
      response.setHeader('content-type', 'text/html; charset=utf-8')
      response.send(cachedEntry.html)
      return
    }
  }

  try {
    const renderServerApp = await loadRenderServerApp()
    const ssrResult = await renderServerApp({
      request: toWebRequest(request),
      headers: buildApolloRequestHeaders(request),
      fetchImplementation: createGraphqlCachingFetch({ allowCache: requestCanUseCache }),
    })

    if (ssrResult.kind === 'redirect') {
      response.redirect(ssrResult.status, ssrResult.location)
      return
    }

    const html = injectSsrMarkup(indexTemplate, ssrResult.html, ssrResult.apolloState, ssrResult.headHtml)
    response.status(ssrResult.status)
    response.setHeader('content-type', 'text/html; charset=utf-8')
    response.send(html)

    if (requestCanUseCache && ssrResult.status === 200) {
      htmlCache.set(htmlCacheKey, {
        expiresAt: Date.now() + HTML_CACHE_TTL_MS,
        status: ssrResult.status,
        html,
      })
      trimOldestCacheEntries(htmlCache, HTML_CACHE_MAX_ENTRIES)
    }
  } catch (error) {
    console.error('SSR request failed, falling back to SPA shell.', error)
    sendSpaShell(response)
  }
})

console.log(`ENV VAR CHECK:\n\tPORT: ${PORT}\n\tSSR_ENABLED: ${SSR_ENABLED}`)

app.listen(PORT, () => {
  console.log(`Geyser app listening on port ${PORT}`)
})
