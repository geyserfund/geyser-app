import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'jotai'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

import { CacheBuster } from './config/CacheBuster.tsx'
import { Head } from './config/Head'
import { configMatomo } from './config/matomo'
import { AuthProvider, ChakraThemeProvider, ServiceWorkerProvider } from './context'
import { FilterProvider } from './context/filter'
import { ReferralCapture } from './shared/components/ReferralCapture.tsx'

export const App = () => {
  const isBrowser = typeof window !== 'undefined'

  useEffect(() => {
    configMatomo()
  }, [])

  const appContent = (
    <AuthProvider>
      <FilterProvider>
        <Head />
        {isBrowser && <ReferralCapture />}
        <Outlet />
      </FilterProvider>
    </AuthProvider>
  )

  const withCacheBuster = isBrowser ? <CacheBuster>{appContent}</CacheBuster> : appContent
  const withServiceWorker = isBrowser ? (
    <ServiceWorkerProvider>{withCacheBuster}</ServiceWorkerProvider>
  ) : (
    withCacheBuster
  )

  return (
    <Provider>
      <ChakraProvider>
        <ChakraThemeProvider>{withServiceWorker}</ChakraThemeProvider>
      </ChakraProvider>
    </Provider>
  )
}
