import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'jotai'
import { Outlet } from 'react-router-dom'

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
          <ApolloProvider client={client}>
            <Provider>
              <AuthProvider>
                <NavProvider>
                  <BtcProvider>
                    <Head />
                    <Outlet />
                  </BtcProvider>
                </NavProvider>
              </AuthProvider>
            </Provider>
          </ApolloProvider>
        </ServiceWorkerProvider>
      </ChakraThemeProvider>
    </ChakraProvider>
  )
}
