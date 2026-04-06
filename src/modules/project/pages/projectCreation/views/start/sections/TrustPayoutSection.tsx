import { HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { ComponentType, useMemo } from 'react'
import { PiCheckCircle, PiNotePencil, PiShieldCheck } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { getTrustPayoutCards } from '../utils/startPageContent.ts'

type TrustIcon = ComponentType<{ size?: string | number }>

/** Trust setup section to keep key launch readiness signals in one place. */
export const TrustPayoutSection = () => {
  const iconBackground = 'primary1.9'
  const primaryContentColor = 'utils.blackContrast'

  const cards = useMemo(
    () =>
      getTrustPayoutCards(t).map((item, index) => {
        const icon: TrustIcon = index === 0 ? PiNotePencil : index === 1 ? PiShieldCheck : PiCheckCircle

        return {
          ...item,
          icon,
        }
      }),
    [],
  )

  return (
    <StartPageSectionShell id="trust-payout" sectionBg={useColorModeValue('neutral1.1', 'neutral1.2')}>
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Set up trust before launch')}</H2>
        <Body size="lg" maxWidth="820px" muted>
          {t('A complete page and clear trust signals make it easier for supporters to commit.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        {cards.map((card) => (
          <PlaybookCard key={card.title} height="100%">
            <VStack alignItems="flex-start" spacing={4}>
              <HStack
                width="44px"
                height="44px"
                borderRadius="12px"
                justifyContent="center"
                alignItems="center"
                backgroundColor={iconBackground}
                color={primaryContentColor}
              >
                <card.icon size={22} />
              </HStack>

              <VStack alignItems="flex-start" spacing={1}>
                <H3 size="md" bold>
                  {card.title}
                </H3>
                <Body size="sm" muted>
                  {card.description}
                </Body>
              </VStack>
            </VStack>
          </PlaybookCard>
        ))}
      </SimpleGrid>
    </StartPageSectionShell>
  )
}
