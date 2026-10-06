import { HStack, Image, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography/Body.tsx'

export const EmptyContainer = ({ image, text }: { image: string; text: string }) => {
  return (
    <HStack w="full" justifyContent={'center'}>
      <VStack spacing="20px">
        <Image maxHeight="350px" src={image} alt="Project Products" />
        <Body fontSize="24px" bold color="neutral1.11" textAlign="center">
          {text}
        </Body>
      </VStack>
    </HStack>
  )
}
