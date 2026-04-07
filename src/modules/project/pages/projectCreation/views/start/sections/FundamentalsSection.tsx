import { HStack, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { ComponentType, useMemo } from 'react'
import { PiChartLine, PiHandshake, PiLightbulb } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { getFundamentals } from '../utils/startPageContent.ts'

type FundamentalIcon = ComponentType<{ size?: string | number }>

/** Intro fundamentals section that frames the page in simple terms. */
export const FundamentalsSection = () => {
  const cardBorderColor = useColorModeValue('neutral1.4', 'neutral1.5')
  const iconBackground = 'primaryAlpha.2'
  const iconBorder = 'primaryAlpha.5'
  const iconColor = useColorModeValue('primary1.11', 'primary1.8')

  const cards = useMemo(
    () =>
      getFundamentals(t).map((item, index) => {
        const icon: FundamentalIcon = index === 0 ? PiLightbulb : index === 1 ? PiChartLine : PiHandshake

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
        <Body size="lg" maxWidth="760px" light>
          {t('Most successful launches are built on a few basics done clearly and consistently.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 5 }}>
        {cards.map((card) => (
          <PlaybookCard key={card.title} height="100%" borderColor={cardBorderColor}>
            <VStack alignItems="flex-start" spacing={{ base: 3, md: 4 }}>
              <HStack
                width="58px"
                height="58px"
                borderRadius="14px"
                justifyContent="center"
                alignItems="center"
                backgroundColor={iconBackground}
                borderWidth="1px"
                borderColor={iconBorder}
              >
                <Icon as={card.icon} boxSize={7} color={iconColor} />
              </HStack>
              <VStack alignItems="flex-start" spacing={1}>
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
