/// <reference lib="webworker" />
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

// let allowlist: RegExp[] | undefined
// in dev mode, we disable precaching to avoid caching issues
// if (import.meta.env.DEV) allowlist = [/^\/$/]

// to allow work offline
// registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist }))

self.skipWaiting()
clientsClaim()

// Google Fonts caching
registerRoute(
  /^https:\/\/fonts\.googleapis\.com\/.*/i,
  new CacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
)
// Handle redirects properly
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.redirected) {
            // Create a new response to avoid the redirect
            return new Response(response.body, {
              status: 200,
              statusText: 'OK',
              headers: response.headers,
            })
          }

          return response
        })
        .catch(async () => {
          const cache = await caches.open('navigation-cache')
          const cachedResponse = await cache.match('index.html')
          return cachedResponse || new Response('Not found', { status: 404 })
        }),
    )
  }
})
