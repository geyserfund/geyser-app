import { Box, Divider, HStack, Image, VStack } from '@chakra-ui/react'

import { Body, H2 } from '@/shared/components/typography'

export const PerkWithImageList = ({
  title,
  items,
  extraText,
  onClick,
}: {
  title: string
  items?: { name: string; url: string }[]
  extraText?: string
  onClick?: Function
}) => {
  if (!items?.length) return null

  return (
    <>
      <VStack w="full" alignItems="flex-start">
        <H2 size={{ base: '32px', lg: '32px' }} dark bold>
          {title}
        </H2>
        <HStack w="full" alignItems="stretch" justifyContent="flex-start" flexWrap="wrap">
          {items.map((item) => {
            return (
              <VStack
                key={item.name}
                padding={2}
                onClick={() => onClick?.(item)}
                _hover={{ cursor: 'pointer' }}
                maxWidth="172px"
              >
                <Box flex={1} height={{ base: '124px', lg: '124px' }} maxHeight={{ base: '124px', lg: '124px' }}>
                  <Image height="100%" width="auto" objectFit="contain" src={item.url} />
                </Box>
                <Body size="lg" bold w="full" textAlign="center">
                  {item.name}
                </Body>
              </VStack>
            )
          })}
        </HStack>
        <Body color="guardians.KING.text" fontStyle="italic" bold>
          {extraText}
        </Body>
      </VStack>
      <Divider borderColor={'neutral1.6'} />
    </>
  )
}
