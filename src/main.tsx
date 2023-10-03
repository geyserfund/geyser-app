import './config/i18next'

import { ColorModeScript } from '@chakra-ui/react'
import * as Sentry from '@sentry/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createRoutesFromChildren,
  matchRoutes,
  RouterProvider,
  useLocation,
  useNavigationType,
} from 'react-router-dom'

import { GlobalStyles, router } from './config'
import { __production__ } from './constants'

const SENTRY_DSN =
  'https://2355dca8304c4e32b35bf421d3cf4d87@o4504351883984896.ingest.sentry.io/4505088829292544'

if (__production__) {
  Sentry.init({
    release: `geyser-app@${import.meta.env.PACKAGE_VERSION}`,
    dsn: SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing({
        // Browser tracing integration creates a new transaction for each page load and navigation event, and creates a child span for every XMLHttpRequest or fetch request that occurs while those transactions are open.
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        ),
      }),
      new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="system" type="localStorage" />
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
