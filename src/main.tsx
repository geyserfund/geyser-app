import { ColorModeScript } from '@chakra-ui/react'
import * as Sentry from '@sentry/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import { GlobalStyles } from './config'

Sentry.init({
  dsn: 'https://2355dca8304c4e32b35bf421d3cf4d87@o4504351883984896.ingest.sentry.io/4505088829292544',
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="light" />
    <GlobalStyles />
    <App />
  </React.StrictMode>,
)
