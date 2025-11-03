import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography'

import { OrderItemFragment } from '../../../../../types'

interface OrderItemsProps {
  orderItems?: OrderItemFragment[]
  noLabel?: boolean
}

export const OrderItems = ({ orderItems, noLabel }: OrderItemsProps) => {
  if (!orderItems || orderItems.length === 0) return null

  return (
    <HStack w={{ base: 'full', lg: 'auto' }} alignItems="flex-start" justifyContent="space-between" spacing="10px">
      {!noLabel && (
        <Body size="xs" bold dark>
          {t('Items')}:
        </Body>
      )}
      <VStack spacing="5px" alignItems="flex-start">
        {orderItems.map((orderItem) => {
          return (
            <HStack key={orderItem.item.id}>
              <Body size="xs" medium dark>
                {orderItem.quantity}x
              </Body>
              <Body size="xs" medium light>
                {orderItem.item.name}
              </Body>
            </HStack>
          )
        })}
      </VStack>
    </HStack>
  )
}
