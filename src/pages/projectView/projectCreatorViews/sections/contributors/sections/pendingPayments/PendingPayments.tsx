import { Box, VStack } from '@chakra-ui/react'

import { Body1 } from '../../../../../../../components/typography'
import { standardPadding } from '../../../../../../../styles'
import { PendingPaymentsList } from './PendingPaymentsList'

export const PendingPayments = () => {
  return (
    <VStack alignItems="flex-start">
      <Box
        mx={standardPadding}
        px={standardPadding}
        py="10px"
        bgColor="primary.50"
        border="2px solid"
        borderRadius={'8px'}
        borderColor="primary.400"
      >
        <Body1 semiBold>
          {
            'Review purchases with short payments. Contact the purchaser to resolve this and Accept the purchase. This issue is due to the purchaser sending an amount that is lower than what is in the invoice. This may happen due to a fault in the wallet or user error.'
          }
        </Body1>
      </Box>
      <PendingPaymentsList />
    </VStack>
  )
}
