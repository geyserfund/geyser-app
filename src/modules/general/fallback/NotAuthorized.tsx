import { Button, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { Head } from '@/config/Head'
import { H2 } from '@/shared/components/typography'

import { useServiceWorkerUpdate } from '../../../context'
import { NotAuthorizedImageUrl } from '../../../shared/constants/platform/url'
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
        <Image width={308} height={175} src={NotAuthorizedImageUrl} alt={'Not authorized image'} />

        <H2 size="2xl" bold textAlign="center">
          {t('Oops!')} {t('You do not have permission to access this page.')}
        </H2>
        <Button variant="solid" colorScheme="primary1" width={'400px'} onClick={handleActionButton}>
          {t('Go back')}
        </Button>
        <CommonFeedbackMessage />
      </VStack>
    </>
  )
}

export default NotAuthorized
