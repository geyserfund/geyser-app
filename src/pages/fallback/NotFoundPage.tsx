import { Button, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useMatch } from 'react-router-dom'

import { Head } from '@/config/Head'
import { H2 } from '@/shared/components/typography'

import { useServiceWorkerUpdate } from '../../context'
import { getPath } from '../../shared/constants'
import { NotFoundPageImageUrl } from '../../shared/constants/platform/url'
import { CommonFeedbackMessage } from './CommonFeedbackMessage'

export const NotFoundPage = () => {
  const { t } = useTranslation()
  const isNotFoundRoute = useMatch(getPath('notFound'))
  const { updateServiceWorker } = useServiceWorkerUpdate()

  const handleActionButton = () => {
    updateServiceWorker()
    if (isNotFoundRoute) {
      window.history.back()
    } else {
      window.location.reload()
    }
  }

  return (
    <>
      <Head title="Not Found" />
      <VStack
        width="100%"
        height="100%"
        padding="40px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing="20px"
      >
        <Image width={308} height={278} src={NotFoundPageImageUrl} />
        <H2 size="2xl" bold textAlign="center">
          {t('Oops, looks like this page got lost in space')}
        </H2>
        <Button variant="solid" colorScheme="primary1" width={'400px'} onClick={handleActionButton}>
          {t('Refresh Page')}
        </Button>
        <CommonFeedbackMessage
          prefix={t(
            'Please try refreshing this page or try Clearing Site Data (Inspect -> Application -> Clear Site Data).',
          )}
        />
      </VStack>
    </>
  )
}

export default NotFoundPage
