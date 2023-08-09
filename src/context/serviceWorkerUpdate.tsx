import { Button, HStack } from '@chakra-ui/react'
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

import { Modal } from '../components/layouts'
import { Body1 } from '../components/typography'

const defaultContext: ServiceWorkerUpdateProps = {
  needRefresh: false,
  setNeedRefresh() {},
  updateServiceWorker: () =>
    new Promise((resolve) => {
      resolve()
    }),
}

export type ServiceWorkerUpdateProps = {
  needRefresh: boolean
  setNeedRefresh: Dispatch<SetStateAction<boolean>>
  updateServiceWorker: (reloadPage?: boolean | undefined) => Promise<void>
}

export const ServiceWorkerUpdate =
  createContext<ServiceWorkerUpdateProps>(defaultContext)

const InternalMS = 60 * 15 * 1000

export const ServiceWorkerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { t } = useTranslation()
  const [refresh, setRefresh] = useState(false)
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
          console.log('SW registration', resp)

          if (resp?.status === 200) await r.update()
        }, InternalMS)
      }
    },
    onRegisterError(error: any) {
      console.log('SW registration error', error)
    },
  })

  useEffect(() => {
    setRefresh(needRefresh)
  }, [needRefresh])

  const handleConfirm = () => {
    updateServiceWorker(true)
    window?.location?.reload()
    setNeedRefresh(false)
  }

  return (
    <ServiceWorkerUpdate.Provider
      value={{
        needRefresh,
        setNeedRefresh,
        updateServiceWorker,
      }}
    >
      {children}

      <Modal
        isOpen={refresh}
        onClose={() => setNeedRefresh(false)}
        title={t('Update available')}
      >
        <Body1>
          {t('There is a newer version of the app available')}{' '}
          {t('Would you like to reload the page to get the latest update?')}
        </Body1>
        <HStack w="full" justifyContent="flex-end" marginTop="20px">
          <Button variant="secondary" onClick={() => setNeedRefresh(false)}>
            {t('No')}
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            {t('Yes')}
          </Button>
        </HStack>
      </Modal>
    </ServiceWorkerUpdate.Provider>
  )
}

export const useServiceWorkerUpdate = (): ServiceWorkerUpdateProps =>
  useContext(ServiceWorkerUpdate)
