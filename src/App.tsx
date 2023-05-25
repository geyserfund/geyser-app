import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { AppLayout } from './AppLayout'
import { client } from './config'
import { Head } from './config/Head'
import { AuthProvider, ChakraThemeProvider, NavProvider } from './context'
import { BtcProvider } from './context/btc'

export const App = () => (
  <ChakraProvider>
    <ChakraThemeProvider>
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
    </ChakraThemeProvider>
  </ChakraProvider>
)
