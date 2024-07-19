import { HStack, Image, Text, VStack } from '@chakra-ui/react'

export const EmptyContainer = ({ image, text }: { image: string; text: string }) => {
  return (
    <HStack w="full" justifyContent={'center'}>
      <VStack spacing="20px">
        <Image maxHeight="350px" src={image} alt="Project Rewards" />
        <Text color="neutral.600" fontSize="24px" fontWeight="bold" textAlign="center">
          {text}
        </Text>
      </VStack>
    </HStack>
  )
}
