import { HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { ComponentType, useMemo } from 'react'
import { PiBookOpen, PiChartLine, PiShieldCheck, PiTarget } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { getFundamentals } from '../utils/startPageContent.ts'

type FundamentalIcon = ComponentType<{ size?: string | number }>

/** Intro fundamentals section that frames the page in simple terms. */
export const FundamentalsSection = () => {
  const iconBackground = 'primary1.9'
  const primaryContentColor = 'utils.blackContrast'

  const cards = useMemo(
    () =>
      getFundamentals(t).map((item, index) => {
        const icon: FundamentalIcon =
          index === 0 ? PiTarget : index === 1 ? PiBookOpen : index === 2 ? PiShieldCheck : PiChartLine

        return {
          ...item,
          icon,
        }
      }),
    [],
  )

  return (
    <StartPageSectionShell id="fundamentals">
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('A great fundraiser is simpler than you think')}</H2>
        <Body size="lg" maxWidth="760px" muted>
          {t('Most successful launches are built on a few basics done clearly and consistently.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={5}>
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
