import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { AppLayout } from './AppLayout'
import { client, theme } from './config'
import { Head } from './config/Head'
import { AuthProvider, DynamicColorMode, NavProvider } from './context'
import { BtcProvider } from './context/btc'

export const App = () => (
  <ChakraProvider theme={theme}>
    <DynamicColorMode>
      <BrowserRouter>
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
      </BrowserRouter>
    </DynamicColorMode>
  </ChakraProvider>
)
