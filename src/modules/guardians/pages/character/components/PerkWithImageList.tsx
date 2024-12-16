import { Box, HStack, Image, VStack } from '@chakra-ui/react'

import { Body, H2 } from '@/shared/components/typography'

export const PerkWithImageList = ({ title, items }: { title: string; items?: { name: string; url: string }[] }) => {
  if (!items?.length) return null

  return (
    <VStack w="full" alignItems="flex-start">
      <H2 size={{ base: '32px', lg: '32px' }} dark bold>
        {title}
      </H2>
      <HStack w="full" alignItems="stretch" justifyContent="flex-start">
        {items.map((item) => {
          return (
            <VStack key={item.name} padding={2} maxHeight={{ base: '', lg: '140px' }}>
              <Box flex={1} height="0">
                <Image height="100%" width="auto" objectFit="contain" src={item.url} />
              </Box>
              <Body fontWeight={600}>{item.name}</Body>
            </VStack>
          )
        })}
      </HStack>
    </VStack>
  )
}
