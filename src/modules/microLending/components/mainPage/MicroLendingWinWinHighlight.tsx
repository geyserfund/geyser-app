import { Box, Flex, Image, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/index.ts'

import { MICRO_LENDING_HIGHLIGHT_IMAGE_PATH } from '../../utils/constants.ts'

/** Full-bleed Berlin photo with scrim, overlaid headline, and caption between trust pillars and “Why Geyser?”. */
export function MicroLendingWinWinHighlight(): JSX.Element {
  const overlayBg = useColorModeValue('blackAlpha.700', 'blackAlpha.800')

  const bandMinH = { base: '320px', md: '360px', lg: '380px' } as const

  return (
    <Box position="relative" w="100vw" maxW="100vw" ml="calc(50% - 50vw)" overflow="hidden" minH={bandMinH}>
      <Image
        src={MICRO_LENDING_HIGHLIGHT_IMAGE_PATH}
        alt={t('Bitcoin Berlin community center facade')}
        position="absolute"
        inset={0}
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition={{ base: 'center 50%', md: 'center 25%' }}
      />
      <Box position="absolute" inset={0} bg={overlayBg} pointerEvents="none" />

      <Flex
        position="relative"
        zIndex={1}
        direction="column"
        justify="center"
        align="center"
        minH={bandMinH}
        w="100%"
        maxW={`${dimensions.maxWidth + 24 * 2}px`}
        mx="auto"
        px={standardPadding}
        py={{ base: 6, md: 7 }}
      >
        <VStack spacing={{ base: 3, md: 4 }} align="stretch" w="full" maxW={{ lg: '48rem' }}>
          <H2
            size={{ base: '2xl', md: '3xl', lg: '4xl' }}
            bold
            color="white"
            lineHeight={1.2}
            textAlign="center"
            w="full"
          >
            {t('Built on top of the Bitcoin Trust network')}
          </H2>
          <Body
            thin
            size={{ base: 'lg', md: 'xl' }}
            color="white"
            lineHeight={{ base: 1.55, md: 1.6 }}
            textAlign="center"
            w="full"
            letterSpacing="0.01em"
          >
            {t('We use Circular Economy Hubs as the trusted bridge between the Bitcoin community local realities.')}
          </Body>
        </VStack>
      </Flex>
    </Box>
  )
}
