import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'

import { Body2 } from '../../../../../../components/typography'

type ListItem = {
  label: string
  value: React.ReactNode
}

type AccordionListItemProps = {
  items: ListItem[]
}

export const AccordionListItem = ({ items }: AccordionListItemProps) => {
  return (
    <HStack w={{ base: 'full', lg: 'auto' }} justifyContent="space-between" spacing="10px">
      <VStack alignItems="flex-start" spacing="5px">
        {items.map((item) => {
          return (
            <Body2 color="neutral.700" key={item.label}>
              {item.label}:
            </Body2>
          )
        })}
      </VStack>
      <VStack spacing="5px">
        {items.map((item) => {
          return (
            <Body2 semiBold color="neutral.900" key={item.label}>
              {item.value}
            </Body2>
          )
        })}
      </VStack>
    </HStack>
  )
}
