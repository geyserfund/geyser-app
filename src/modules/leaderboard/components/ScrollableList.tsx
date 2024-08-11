import { StackProps, VStack } from '@chakra-ui/react'
import React from 'react'

interface ScrollableListProps<T> extends StackProps {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}

export function ScrollableList<T>({ data, renderItem, ...props }: ScrollableListProps<T>) {
  return (
    <VStack
      width="full"
      spacing={2}
      maxHeight="600px"
      overflowY="auto"
      overflowX="hidden"
      sx={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'neutralAlpha.3',
          borderRadius: 'full',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'neutralAlpha.8',
          borderRadius: 'full',
          '&:hover': {
            background: 'neutralAlpha.9',
          },
        },
      }}
      {...props}
    >
      {data.map((item, index) => renderItem(item, index))}
    </VStack>
  )
}
