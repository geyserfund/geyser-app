import { Box, HStack, Text, Tooltip } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { AiFillQuestionCircle } from 'react-icons/ai'

import Loader from '../../../../../../../../../components/ui/Loader'

export const WaitingForPayment = () => {
  const { t } = useTranslation()
  return (
    <Box fontSize={'10px'}>
      <HStack spacing={5}>
        <Loader size="md" />
        <Text color={'neutral.900'} fontWeight={400}>
          {t('Waiting for payment')}
        </Text>
        <Tooltip label={t('Scan and pay invoice with Bitcoin.')} placement="top" hasArrow>
          <Box>
            <AiFillQuestionCircle fontSize="20px" />
          </Box>
        </Tooltip>
      </HStack>
    </Box>
  )
}
