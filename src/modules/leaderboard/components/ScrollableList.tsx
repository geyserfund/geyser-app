import { StackProps, VStack } from '@chakra-ui/react'
import React from 'react'

interface ScrollableListProps<T> extends StackProps {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}

export function ScrollableList<T>({ data, renderItem, ...props }: ScrollableListProps<T>) {
  return (
    <VStack width="full" spacing={2} maxHeight="600px" overflowY="auto" {...props}>
      {data.map((item, index) => renderItem(item, index))}
    </VStack>
  )
}
