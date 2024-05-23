import './config/i18next'

import { ColorModeScript } from '@chakra-ui/react'
import * as Sentry from '@sentry/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  RouterProvider,
  useLocation,
  useNavigationType,
} from 'react-router-dom'

import { GlobalStyles, routes } from './config'
import { __production__, __staging__ } from './constants'

const SENTRY_DSN = 'https://2355dca8304c4e32b35bf421d3cf4d87@o4504351883984896.ingest.sentry.io/4505088829292544'

let createRouter = createBrowserRouter

if (__production__ || __staging__) {
  Sentry.init({
    release: `geyser-app@${import.meta.env.PACKAGE_VERSION}`,
    dsn: SENTRY_DSN,
    environment: import.meta.env.VITE_APP_ENV,
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    tracesSampleRate: 1.0,
  })
  createRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter)
}

const router = createRouter(routes)

// Needed for the nodejs modules that is used by the dependencies that are used for generating keypairs
if (typeof window !== 'undefined') {
  const { Buffer } = await import('buffer/')
  ;(window as any).Buffer = Buffer
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="system" type="localStorage" />
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
