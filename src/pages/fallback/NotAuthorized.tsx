import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiErrorAlt } from 'react-icons/bi'

import { Head } from '../../config'
import { CommonFeedbackMessage } from './CommonFeedbackMessage'

export const NotAuthorized = () => {
  const { t } = useTranslation()
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
        spacing="10px"
      >
        <BiErrorAlt fontSize="80px" />
        <Text variant="h2" textAlign="center">
          {t('Oops!')} {t('You do not have permission to access this page.')}
        </Text>
        <CommonFeedbackMessage />
      </VStack>
    </>
  )
}

export default NotAuthorized
