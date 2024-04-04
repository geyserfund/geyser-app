import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body2 } from '../../../../../../../../../components/typography'
import { OrderItemFragment } from '../../../../../../../../../types'

interface OrderItemsProps {
  orderItems?: OrderItemFragment[]
  noLabel?: boolean
}

export const OrderItems = ({ orderItems, noLabel }: OrderItemsProps) => {
  if (!orderItems || orderItems.length === 0) return null

  return (
    <HStack w={{ base: 'full', lg: 'auto' }} alignItems="flex-start" justifyContent="space-between" spacing="10px">
      {!noLabel && <Body2 color="neutral.700">{t('Items')}:</Body2>}
      <VStack spacing="5px" alignItems="flex-start">
        {orderItems.map((orderItem) => {
          return (
            <HStack key={orderItem.item.id}>
              <Body2 semiBold color="neutral.900">
                {orderItem.quantity}x
              </Body2>
              <Body2 semiBold color="neutral.900">
                {orderItem.item.name}
              </Body2>
            </HStack>
          )
        })}
      </VStack>
    </HStack>
  )
}
