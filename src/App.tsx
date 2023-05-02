import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { withSentryReactRouterV6Routing } from '@sentry/react'
import { BrowserRouter, Routes } from 'react-router-dom'

import { AppLayout } from './AppLayout'
import { client, theme } from './config'
import { Head } from './config/Head'
import { AuthProvider, NavProvider } from './context'
import { BtcProvider } from './context/btc'

const SentryRoutes = withSentryReactRouterV6Routing(Routes)

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <SentryRoutes>
        <ApolloProvider client={client}>
          <AuthProvider>
            <NavProvider>
              <BtcProvider>
                <Head />
                <AppLayout />
              </BtcProvider>
            </NavProvider>
          </AuthProvider>
        </ApolloProvider>
      </SentryRoutes>
    </BrowserRouter>
  </ChakraProvider>
)
