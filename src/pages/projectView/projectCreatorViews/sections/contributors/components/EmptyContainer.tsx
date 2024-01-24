import { HStack, Image, Text, VStack } from '@chakra-ui/react'

import { ProjectRewardsImageUrl } from '../../../../../../constants'

export const EmptyContainer = ({ text }: { text: string }) => {
  return (
    <HStack w="full" justifyContent={'center'}>
      <VStack spacing="20px">
        <Image
          maxHeight="350px"
          src={ProjectRewardsImageUrl}
          alt="Project Rewards"
        />
        <Text
          color="neutral.600"
          fontSize="48px"
          fontWeight="bold"
          textAlign="center"
        >
          {text}
        </Text>
      </VStack>
    </HStack>
  )
}
