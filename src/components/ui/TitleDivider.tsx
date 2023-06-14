import { Divider, HStack, StackProps, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = StackProps & {
  rightAction: ReactNode
}

export const TitleDivider = ({ children, rightAction, ...props }: Props) => {
  return (
    <VStack spacing={0} {...props}>
      <HStack justifyContent="start" w="100%">
        <Text variant="h3" flexGrow={1} textAlign="left">
          {children}
        </Text>
        {rightAction}
      </HStack>
      <Divider />
    </VStack>
  )
}
