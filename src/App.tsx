import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'jotai'
import { BrowserRouter } from 'react-router-dom'

import { AppLayout } from './AppLayout'
import { client } from './config'
import { Head } from './config/Head'
import {
  AuthProvider,
  ChakraThemeProvider,
  NavProvider,
  ServiceWorkerProvider,
} from './context'
import { BtcProvider } from './context/btc'

export const App = () => {
  return (
    <ChakraProvider>
      <ChakraThemeProvider>
        <ServiceWorkerProvider>
          <BrowserRouter>
            <ApolloProvider client={client}>
              <Provider>
                <AuthProvider>
                  <NavProvider>
                    <BtcProvider>
                      <Head />
                      <AppLayout />
                    </BtcProvider>
                  </NavProvider>
                </AuthProvider>
              </Provider>
            </ApolloProvider>
          </BrowserRouter>
        </ServiceWorkerProvider>
      </ChakraThemeProvider>
    </ChakraProvider>
  )
}
