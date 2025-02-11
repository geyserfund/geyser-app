import { captureException } from '@sentry/react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

import { __production__ } from '../shared/constants'

const defaultContext: ServiceWorkerUpdateProps = {
  updateServiceWorker: () =>
    new Promise((resolve) => {
      resolve()
    }),
  canInstall: false,
  handlePrompt() {},
}

export type ServiceWorkerUpdateProps = {
  updateServiceWorker: (reloadPage?: boolean | undefined) => Promise<void>
  canInstall: boolean
  handlePrompt: () => void
}

const ServiceWorkerUpdate = createContext<ServiceWorkerUpdateProps>(defaultContext)

const REFETCH_SW_INTERVAL_MS = __production__ ? 5 * 60 * 1000 : 5 * 60 * 1000

let defferedPrompt: any

export const ServiceWorkerProvider = ({ children }: { children: React.ReactNode }) => {
  const [canInstall, setCanInstall] = useState(false)

  const { updateServiceWorker } = useRegisterSW({
    immediate: true,
    onRegisteredSW(swUrl, r) {
      if (r) {
        const refetch = async () => {
          const resp = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
              cache: 'no-store',
              'cache-control': 'no-cache',
              'X-Custom-No-Cache': 'true',
            },
          }).catch((error) => console.log('error', error))

          if (resp?.status === 200) await r.update()
        }

        setInterval(async () => {
          if (!(!r.installing && navigator)) return

          if ('connection' in navigator && !navigator.onLine) return

          refetch()
        }, REFETCH_SW_INTERVAL_MS)
      }
    },
    onRegisterError(error: any) {
      captureException(error, {
        tags: { 'Service Worker Registration Error': 'true' },
      })
    },
  })

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      defferedPrompt = e
      setCanInstall(true)
    })
  }, [])

  const handlePrompt = () => {
    defferedPrompt?.prompt()
    defferedPrompt = null
  }

  return (
    <ServiceWorkerUpdate.Provider
      value={{
        updateServiceWorker,
        canInstall,
        handlePrompt,
      }}
    >
      {children}
    </ServiceWorkerUpdate.Provider>
  )
}

export const useServiceWorkerUpdate = (): ServiceWorkerUpdateProps => useContext(ServiceWorkerUpdate)
