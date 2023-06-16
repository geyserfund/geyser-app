import {
  Badge,
  Box,
  Divider,
  HStack,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = StackProps & {
  rightAction?: ReactNode
  badge?: string | number | null
}

export const TitleDivider = ({
  children,
  rightAction,
  badge,
  ...props
}: Props) => {
  return (
    <VStack spacing={0} w="100%" {...props}>
      <HStack justifyContent="start" w="100%" pb={1}>
        <Text variant="h3" textAlign="left">
          {children}
        </Text>
        {badge && (
          <Badge borderRadius="4px" px={2} fontSize="15px">
            {badge}
          </Badge>
        )}
        <Box flexGrow={1} />
        {rightAction}
      </HStack>
      <Divider />
    </VStack>
  )
}
