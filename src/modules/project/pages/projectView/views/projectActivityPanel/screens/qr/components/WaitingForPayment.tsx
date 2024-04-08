import { WarningIcon } from '@chakra-ui/icons'
import { Box, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import Loader from '../../../../../../../../../components/ui/Loader'

export const WaitingForPayment = () => {
  const { t } = useTranslation()
  return (
    <Box marginBottom={4} fontSize={'10px'}>
      <HStack spacing={5}>
        <Loader size="md" />
        <Text color={'neutral.900'} fontWeight={400}>
          {t('Waiting for payment')}
        </Text>
        <WarningIcon />
      </HStack>
    </Box>
  )
}
