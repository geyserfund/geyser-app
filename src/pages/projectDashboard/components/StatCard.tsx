import { StackProps, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const StatCard = ({
  children,
  title,
  ...props
}: PropsWithChildren<StackProps & { title: string }>) => {
  return (
    <VStack flexGrow={1} spacing={0} {...props} p={{ base: 2, lg: 0 }}>
      <VStack
        w="100%"
        flexGrow={1}
        px={8}
        py={3}
        borderRadius="12px"
        bg="primary.100"
      >
        <Text variant="h2" color="brand.neutral900">
          {children}
        </Text>
        <Text color="neutral.600" variant="body">
          {title}
        </Text>
      </VStack>
    </VStack>
  )
}
