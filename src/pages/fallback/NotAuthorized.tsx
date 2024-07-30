import { Button, Image, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Head } from '@/config/Head'

import { useServiceWorkerUpdate } from '../../context'
import { NotAuthorizedImageUrl } from '../../shared/constants/platform/url'
import { CommonFeedbackMessage } from './CommonFeedbackMessage'

export const NotAuthorized = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { updateServiceWorker } = useServiceWorkerUpdate()

  const handleActionButton = () => {
    updateServiceWorker()

    if (window.history.length > 1) {
      window.history.back()
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <Head title="Not authorized" />
      <VStack
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing="20px"
      >
        <Image width={308} height={175} src={NotAuthorizedImageUrl} />
        <Text variant="h2" textAlign="center">
          {t('Oops!')} {t('You do not have permission to access this page.')}
        </Text>
        <Button variant="primary" width={'400px'} onClick={handleActionButton}>
          <Text variant="body1">{t('Go back')}</Text>
        </Button>
        <CommonFeedbackMessage />
      </VStack>
    </>
  )
}

export default NotAuthorized
