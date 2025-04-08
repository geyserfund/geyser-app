import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider, useAtom } from 'jotai'
import { useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'

import { client } from './config/apollo-client'
import { CacheBuster } from './config/CacheBuster.tsx'
import { Head } from './config/Head'
import { configMatomo } from './config/matomo'
import { AuthProvider, ChakraThemeProvider, ServiceWorkerProvider } from './context'
import { BtcProvider } from './context/btc'
import { FilterProvider } from './context/filter'
import { referringHeroIdAtom } from './shared/state/referralAtom.ts'

/** Component to handle capturing the referring hero ID from URL */
const ReferralCapture = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [referringHeroId, setReferringHeroId] = useAtom(referringHeroIdAtom)

  useEffect(() => {
    const heroIdFromUrl = searchParams.get('hero')

    // Capture First logic: Only set if a heroId is in URL and we haven't captured one yet.
    if (heroIdFromUrl && referringHeroId === null) {
      setReferringHeroId(heroIdFromUrl)
      // Optional: Remove the param from URL - consider if needed globally
      setSearchParams(
        (prev) => {
          prev.delete('hero')
          return prev
        },
        { replace: true },
      )
    }
    // Add referringHeroId to dependency array to re-run if it changes (e.g., manually cleared)
    // Add setReferringHeroId to satisfy exhaustive-deps rule.
  }, [searchParams, referringHeroId, setReferringHeroId, setSearchParams])

  // This component doesn't render anything itself
  return null
}

export const App = () => {
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
                      <ReferralCapture />
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
