import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'jotai'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { client } from './config/apollo-client'
import { CacheBuster } from './config/CacheBuster.tsx'
import { Head } from './config/Head'
import { configMatomo } from './config/matomo'
import { AuthProvider, ChakraThemeProvider, ServiceWorkerProvider } from './context'
import { BtcProvider } from './context/btc'
import { FilterProvider } from './context/filter'
import { useInitiateSpeedWalletParams } from './shared/hooks/useInitiateSpeedWalletParams.tsx'

export const App = () => {
  useInitiateSpeedWalletParams()

  useEffect(() => {
    configMatomo()
  }, [])

  return (
    <Provider>
      <ChakraProvider>
        <ChakraThemeProvider>
          <ServiceWorkerProvider>
            <CacheBuster>
              <ApolloProvider client={client}>
                <AuthProvider>
                  <BtcProvider>
                    <FilterProvider>
                      <Head />
                      <Outlet />
                    </FilterProvider>
                  </BtcProvider>
                </AuthProvider>
              </ApolloProvider>
            </CacheBuster>
          </ServiceWorkerProvider>
        </ChakraThemeProvider>
      </ChakraProvider>
    </Provider>
  )
}
