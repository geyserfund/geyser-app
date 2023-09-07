import { Button, HStack, VStack } from '@chakra-ui/react'
import { captureException } from '@sentry/react'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useRegisterSW } from 'virtual:pwa-register/react'

import { Body1 } from '../components/typography'
import { __production__ } from '../constants'
import { lightModeColors } from '../styles'

const defaultContext: ServiceWorkerUpdateProps = {
  needRefresh: false,
  setNeedRefresh() {},
  updateServiceWorker: () =>
    new Promise((resolve) => {
      resolve()
    }),
  canInstall: false,
  handlePrompt() {},
}

export type ServiceWorkerUpdateProps = {
  needRefresh: boolean
  setNeedRefresh: Dispatch<SetStateAction<boolean>>
  updateServiceWorker: (reloadPage?: boolean | undefined) => Promise<void>
  canInstall: boolean
  handlePrompt: () => void
}

export const ServiceWorkerUpdate =
  createContext<ServiceWorkerUpdateProps>(defaultContext)

const REFETCH_SW_INTERVAL_MS = __production__ ? 5 * 60 * 1000 : 10 * 1000

let defferedPrompt: any

export const ServiceWorkerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { t } = useTranslation()
  const [refresh, setRefresh] = useState(false)
  const [canInstall, setCanInstall] = useState(false)
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (r) {
        setInterval(async () => {
          if (!(!r.installing && navigator)) return

          if ('connection' in navigator && !navigator.onLine) return

          const resp = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
              cache: 'no-store',
              'cache-control': 'no-cache',
            },
          }).catch((error) => console.log('error', error))
          if (resp?.status === 200) await r.update()
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
    setRefresh(needRefresh)
  }, [needRefresh])

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      defferedPrompt = e
      setCanInstall(true)
    })
  }, [])

  const handleConfirm = () => {
    updateServiceWorker(true)
    setNeedRefresh(false)
    setRefresh(false)
    window?.location?.reload()
  }

  const handlePrompt = () => {
    defferedPrompt?.prompt()
    defferedPrompt = null
  }

  return (
    <ServiceWorkerUpdate.Provider
      value={{
        needRefresh: refresh,
        setNeedRefresh,
        updateServiceWorker,
        canInstall,
        handlePrompt,
      }}
    >
      {children}
      {refresh && (
        <HStack
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 10,
            padding: '10px',
            borderRadius: '8px',
            border: '2px solid',
            backgroundColor: 'white',
            borderColor: lightModeColors.neutral[400],
          }}
        >
          <VStack alignItems="start" justifyContent="center" spacing={0}>
            <Body1 color={lightModeColors.neutral[700]} bold>
              {t("There's a new version of Geyser!")}
            </Body1>
            <Body1 color={lightModeColors.neutral[700]}>
              {t('Restart the app to load the new version')}
            </Body1>
          </VStack>
          <HStack>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setNeedRefresh(false)}
              color={lightModeColors.neutral[700]}
            >
              {t('Not now')}
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleConfirm}
              color={lightModeColors.neutral[700]}
            >
              {t('Restart app')}
            </Button>
          </HStack>
        </HStack>
      )}
    </ServiceWorkerUpdate.Provider>
  )
}

export const useServiceWorkerUpdate = (): ServiceWorkerUpdateProps =>
  useContext(ServiceWorkerUpdate)
