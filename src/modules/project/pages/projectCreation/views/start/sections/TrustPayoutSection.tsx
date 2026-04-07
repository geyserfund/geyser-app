import { HStack, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { ComponentType, useMemo } from 'react'
import { PiNotePencil, PiShieldCheck, PiUsersThree } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { getTrustPayoutCards } from '../utils/startPageContent.ts'

type TrustIcon = ComponentType<{ size?: string | number }>

/** Trust setup section to keep key launch readiness signals in one place. */
export const TrustPayoutSection = () => {
  const sectionBg = useColorModeValue('neutral1.1', 'neutral1.2')
  const cardBorderColor = useColorModeValue('neutral1.4', 'neutral1.5')
  const iconBackground = 'primary1Alpha.2'
  const iconBorder = 'primary1Alpha.5'
  const iconColor = useColorModeValue('primary1.11', 'primary1.8')

  const cards = useMemo(
    () =>
      getTrustPayoutCards(t).map((item, index) => {
        const icon: TrustIcon = index === 0 ? PiUsersThree : index === 1 ? PiNotePencil : PiShieldCheck

        return {
          ...item,
          icon,
        }
      }),
    [],
  )

  return (
    <StartPageSectionShell id="trust-payout" sectionBg={sectionBg}>
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Set up trust before launch')}</H2>
        <Body size="lg" maxWidth="820px" light>
          {t('Trust is built before day one. These signals help supporters back your project with confidence.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }}>
        {cards.map((card) => (
          <PlaybookCard key={card.title} height="100%" borderColor={cardBorderColor}>
            <VStack alignItems="flex-start" spacing={{ base: 4, md: 5 }} height="100%">
              <HStack
                width="56px"
                height="56px"
                borderRadius="14px"
                justifyContent="center"
                alignItems="center"
                backgroundColor={iconBackground}
                borderWidth="1px"
                borderColor={iconBorder}
              >
                <Icon as={card.icon} boxSize={7} color={iconColor} />
              </HStack>

              <VStack alignItems="flex-start" spacing={2}>
                <H3 size="md" bold>
                  {card.title}
                </H3>
                <Body size="sm" light>
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
