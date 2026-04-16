import { Box, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/index.ts'

import { microLendingWhyGeyserPoints } from '../../utils/mainPageContent.ts'

/** “Why Geyser?” in a full-bleed neutral band with a centered heading and three-column icon grid. */
export function MicroLendingWhyGeyserSection({
  sectionPrimaryTextColor,
  sectionSecondaryTextColor,
}: {
  sectionPrimaryTextColor: string
  sectionSecondaryTextColor: string
}): JSX.Element {
  const bandBg = useColorModeValue('neutral1.2', 'neutral1.4')
  const iconColor = useColorModeValue('primary1.10', 'primary1.9')

  return (
    <Box
      id="micro-loans-why-geyser"
      scrollMarginTop={{ base: '72px', md: '88px' }}
      w="100vw"
      maxW="100vw"
      ml="calc(50% - 50vw)"
      bg={bandBg}
      py={{ base: '2.4rem', md: '3rem' }}
    >
      <Box w="100%" maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto" px={standardPadding}>
        <VStack align="stretch" spacing={{ base: 8, md: 10 }} textAlign="center">
          <H2 size="2xl" bold>
            {t('Why Geyser?')}
          </H2>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 12 }} rowGap={{ base: 10, md: 8 }}>
            {microLendingWhyGeyserPoints.map((point) => (
              <VStack
                key={point.title}
                align="center"
                textAlign="center"
                spacing={5}
                maxW={{ base: 'full', md: '320px' }}
                mx="auto"
              >
                <Icon as={point.icon} boxSize={{ base: 8, md: 10 }} color={iconColor} flexShrink={0} aria-hidden />
                <H3 bold color={sectionPrimaryTextColor}>
                  {point.title}
                </H3>
                <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
                  {point.description}
                </Body>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  )
}
