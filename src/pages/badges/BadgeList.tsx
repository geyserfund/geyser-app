import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface BadgeListProps {
  title: string
}

const BadgeList = ({ children, title }: PropsWithChildren<BadgeListProps>) => {
  return (
    <VStack pt={6}>
      <Box
        width="100%"
        borderBottom="2px solid neutral.200"
        textAlign="center"
        pb={2}
      >
        <Text variant="h3">{title}</Text>
      </Box>
      <HStack flexWrap="wrap">{children}</HStack>
    </VStack>
  )
}

export default BadgeList
