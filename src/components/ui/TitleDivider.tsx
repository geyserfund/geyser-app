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

import { dimensions } from '../../constants'

type Props = StackProps & {
  rightAction?: ReactNode
  badge?: string | number | null
  isFixed?: boolean
}

export const TitleDivider = ({
  children,
  rightAction,
  badge,
  isFixed,
  ...props
}: Props) => {
  const heightOffSet = `${dimensions.topNavBar.desktop.height}px`
  return (
    <>
      <VStack
        spacing={0}
        w="100%"
        pt={{ base: '10px', lg: 0 }}
        position={isFixed ? 'fixed' : 'relative'}
        top={isFixed ? heightOffSet : undefined}
        backgroundColor="neutral.0"
        zIndex={11}
        {...props}
      >
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
      {isFixed && <Box height={'20px'}></Box>}
    </>
  )
}
