import { Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'

import { type MicroLendingTrustPillar } from '../../utils/mainPageContent.ts'

type MicroLendingTrustPillarsSectionProps = {
  pillars: readonly MicroLendingTrustPillar[]
  sectionPrimaryTextColor: string
  sectionSecondaryTextColor: string
}

/** Three-column trust strip aligned with Impact Funds pillar layout. */
export function MicroLendingTrustPillarsSection({
  pillars,
  sectionPrimaryTextColor,
  sectionSecondaryTextColor,
}: MicroLendingTrustPillarsSectionProps): JSX.Element {
  const iconColor = useColorModeValue('neutral1.12', 'white')

  return (
    <VStack align="stretch" spacing={4} py={{ base: 6, md: 10 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 12 }} rowGap={{ base: 10, md: 8 }}>
        {pillars.map((pillar) => (
          <VStack
            key={pillar.title}
            align="center"
            textAlign="center"
            spacing={5}
            maxW={{ base: 'full', md: '320px' }}
            mx="auto"
          >
            <Icon as={pillar.icon} boxSize={{ base: 8, md: 10 }} color={iconColor} flexShrink={0} aria-hidden />
            <H3 bold color={sectionPrimaryTextColor}>
              {pillar.title}
            </H3>
            <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
              {pillar.description}
            </Body>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
