import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, useLocation } from 'react-router-dom'

import { AppLayout } from './AppLayout'
import { client, theme } from './config'
import { Head } from './config/Head'
import { AuthProvider, DynamicColorMode, NavProvider } from './context'
import { BtcProvider } from './context/btc'

const DebugRouter = ({ children }: { children: any }) => {
  const location = useLocation()
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(
        location.state,
      )} Key: ${location.key}`,
    )
  }

  return children
}

export const App = () => (
  <ChakraProvider theme={theme}>
    <DynamicColorMode>
      <BrowserRouter>
        <DebugRouter>
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
        </DebugRouter>
      </BrowserRouter>
    </DynamicColorMode>
  </ChakraProvider>
)
