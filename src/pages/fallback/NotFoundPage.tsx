import { Button, Link, Text, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { BiErrorAlt } from 'react-icons/bi'
import { useMatch } from 'react-router-dom'

import { Head } from '../../config'
import { getPath, GeyserFeedbackFromUrl } from '../../constants'
import { useServiceWorkerUpdate } from '../../context'

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
        backgroundColor="neutral.100"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing="10px"
      >
        <BiErrorAlt fontSize="80px" />
        <Text fontSize="20px">{t('Oops!')}</Text>
        <Text fontSize="20px">
          {t('This page was not found, please try again.')}
        </Text>
        <Button onClick={handleActionButton}>{t('Refresh')}</Button>
        <Text fontSize="20px">
          <Trans
            i18nKey={
              'If the problem persists let us know via. <1>telegram</1> or this <1>feedback form.</1>'
            }
          >
            {'If the problem persists let us know via. '}
            <Link href="https://t.me/+EZ5otIPhVcxhMmFk" target="_blank">
              telegram
            </Link>
            {' or this '}
            <Link href={GeyserFeedbackFromUrl} isExternal>
              {'feedback form.'}
            </Link>
          </Trans>
        </Text>
      </VStack>
    </>
  )
}

export default NotFoundPage
