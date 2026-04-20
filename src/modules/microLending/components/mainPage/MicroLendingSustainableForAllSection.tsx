import { Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'

import { type MicroLendingTrustPillar } from '../../utils/mainPageContent.ts'
import { MicroLendingSectionHeading } from './MicroLendingSectionHeading.tsx'

type MicroLendingSustainableForAllSectionProps = {
  parties: readonly MicroLendingTrustPillar[]
  sectionPrimaryTextColor: string
  sectionSecondaryTextColor: string
}

/** “Sustainable for all”: three parties plus a footnote for the lenders’ 100%* principal line. */
export function MicroLendingSustainableForAllSection({
  parties,
  sectionPrimaryTextColor,
  sectionSecondaryTextColor,
}: MicroLendingSustainableForAllSectionProps): JSX.Element {
  const iconColor = useColorModeValue('neutral1.12', 'white')

  return (
    <VStack align="stretch" spacing={6}>
      <MicroLendingSectionHeading>{t('Sustainable for all')}</MicroLendingSectionHeading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 12 }} rowGap={{ base: 10, md: 8 }}>
        {parties.map((party) => (
          <VStack
            key={party.title}
            align="center"
            textAlign="center"
            spacing={5}
            maxW={{ base: 'full', md: '320px' }}
            mx="auto"
          >
            <Icon as={party.icon} boxSize={{ base: 8, md: 10 }} color={iconColor} flexShrink={0} aria-hidden />
            <H3 bold color={sectionPrimaryTextColor}>
              {party.title}
            </H3>
            <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.65}>
              {party.description}
            </Body>
          </VStack>
        ))}
      </SimpleGrid>
      <Body
        as="p"
        size="xs"
        color={sectionSecondaryTextColor}
        lineHeight={1.65}
        textAlign="left"
        pt={2}
        maxW="56rem"
        mx={{ base: 0, md: 'auto' }}
      >
        {'* '}
        {t(
          'Community leaders do their best to keep borrowers accountable, but there is always a risk a loan is not repaid in full.',
        )}
      </Body>
    </VStack>
  )
}
