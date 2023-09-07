import { Link, Text, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { BiErrorAlt } from 'react-icons/bi'

import { GeyserFeedbackFromUrl } from '../../constants'

export const NotAuthorized = () => {
  const { t } = useTranslation()
  return (
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
        {t('You do not have permission to access this page.')}
      </Text>
      <Text fontSize="20px">
        <Trans
          i18nKey={
            'If the problem persists let us know via. <1>telegram</1> or this <2>feedback form.</2>'
          }
        >
          {'If the problem persists let us know via. '}
          <Link href="https://t.me/+EZ5otIPhVcxhMmFk" target="_blank">
            telegram
          </Link>
          {' or this '}
          <Link href={GeyserFeedbackFromUrl} isExternal>
            feedback form.
          </Link>
        </Trans>
      </Text>
    </VStack>
  )
}

export default NotAuthorized
