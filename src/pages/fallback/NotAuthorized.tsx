import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiErrorAlt } from 'react-icons/bi'

import { CommonFeedbackMessage } from './CommonFeedbackMessage'

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
      <Text fontSize="20px">{t('You do not have permission to access this page.')}</Text>
      <CommonFeedbackMessage />
    </VStack>
  )
}

export default NotAuthorized
