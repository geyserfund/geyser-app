import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface BadgeListProps {
  title: string
}

const BadgeList = ({ children }: PropsWithChildren<BadgeListProps>) => {
  return (
    <VStack pt={3}>
      <Box width="100%" borderBottom="2px solid neutral.200" textAlign="center">
        <Text variant="h3">Contribution amounts</Text>
      </Box>
      <HStack flexWrap="wrap">{children}</HStack>
    </VStack>
  )
}

export default BadgeList
