import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'jotai'

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
    <Provider>
      <ChakraProvider>
        <ChakraThemeProvider>
          <ServiceWorkerProvider>
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
          </ServiceWorkerProvider>
        </ChakraThemeProvider>
      </ChakraProvider>
    </Provider>
  )
}
