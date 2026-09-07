import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'jotai'
import { Outlet } from 'react-router'

import { client } from './config/apollo-client'
import { CacheBuster } from './config/CacheBuster.tsx'
import { Head } from './config/Head'
import { AuthProvider } from './context/auth.tsx'
import { FilterProvider } from './context/filter'
import { ServiceWorkerProvider } from './context/serviceWorkerUpdate.tsx'
import { ChakraThemeProvider } from './context/theme.tsx'
import { ReferralCapture } from './shared/components/ReferralCapture.tsx'

export const App = () => {
  return (
    <Provider>
      <ChakraProvider>
        <ChakraThemeProvider>
          <ServiceWorkerProvider>
            <CacheBuster>
              <ApolloProvider client={client}>
                <AuthProvider>
                  <FilterProvider>
                    <Head />
                    <ReferralCapture />
                    <Outlet />
                  </FilterProvider>
                </AuthProvider>
              </ApolloProvider>
            </CacheBuster>
          </ServiceWorkerProvider>
        </ChakraThemeProvider>
      </ChakraProvider>
    </Provider>
  )
}
