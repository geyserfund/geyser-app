import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'

import { Body } from '@/shared/components/typography'

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
            <Body size="xs" dark key={item.label}>
              {item.label}:
            </Body>
          )
        })}
      </VStack>
      <VStack spacing="5px">
        {items.map((item) => {
          return (
            <Body size="xs" medium light key={item.label}>
              {item.value}
            </Body>
          )
        })}
      </VStack>
    </HStack>
  )
}
