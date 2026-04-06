import { Button, HStack, Link as ChakraLink, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiArrowUpRight, PiCheckCircle, PiInfinity, PiTarget } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { GuideUrl } from '@/shared/constants/index.ts'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'

/** Fundraiser type section for choosing between open and goal-based launch models. */
export const FundraiserTypeSection = () => {
  const badgeBackground = 'primary1.9'
  const iconBackground = 'primary1.9'
  const primaryContentColor = 'utils.blackContrast'

  const openPoints = useMemo(
    () => [
      t('Good for ongoing work and evolving roadmaps'),
      t('Funds arrive as supporters contribute'),
      t('Great when there is no hard minimum to begin'),
    ],
    [],
  )

  const allOrNothingPoints = useMemo(
    () => [
      t('Good for projects with a fixed minimum budget'),
      t('Creates urgency around a clear target'),
      t('Supporters are charged only when the goal is reached'),
    ],
    [],
  )

  const renderPoint = (point: string) => (
    <HStack key={point} alignItems="flex-start" spacing={2}>
      <PiCheckCircle size={16} style={{ marginTop: 2 }} />
      <Body size="sm">{point}</Body>
    </HStack>
  )

  return (
    <StartPageSectionShell id="fundraiser-type">
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Choose the fundraising style that fits your project')}</H2>
        <Body size="lg" maxWidth="820px" muted>
          {t('Pick the model that matches how your project gets delivered.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
        <PlaybookCard height="100%">
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
              <PiInfinity size={22} />
            </HStack>
            <VStack alignItems="flex-start" spacing={1}>
              <H3 bold>{t('Open Fundraiser')}</H3>
              <VStack
                borderRadius="999px"
                backgroundColor={badgeBackground}
                paddingX={3}
                paddingY={1}
                color={primaryContentColor}
              >
                <Body size="xs" bold color={primaryContentColor}>
                  {t('Flexible model')}
                </Body>
              </VStack>
            </VStack>
            <VStack alignItems="flex-start" spacing={2}>
              {openPoints.map(renderPoint)}
            </VStack>
          </VStack>
        </PlaybookCard>

        <PlaybookCard height="100%">
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
              <PiTarget size={22} />
            </HStack>
            <VStack alignItems="flex-start" spacing={1}>
              <H3 bold>{t('All-or-Nothing Campaign')}</H3>
              <VStack
                borderRadius="999px"
                backgroundColor={badgeBackground}
                paddingX={3}
                paddingY={1}
                color={primaryContentColor}
              >
                <Body size="xs" bold color={primaryContentColor}>
                  {t('Goal-based model')}
                </Body>
              </VStack>
            </VStack>
            <VStack alignItems="flex-start" spacing={2}>
              {allOrNothingPoints.map(renderPoint)}
            </VStack>
          </VStack>
        </PlaybookCard>
      </SimpleGrid>

      <HStack spacing={3} flexWrap="wrap">
        <Body size="sm" muted>
          {t('Need more detail before choosing')}
          {'?'}
        </Body>
        <Button
          as={ChakraLink}
          href={GuideUrl}
          isExternal
          variant="link"
          colorScheme="primary1"
          rightIcon={<PiArrowUpRight />}
        >
          {t('Read fundraising guide')}
        </Button>
      </HStack>
    </StartPageSectionShell>
  )
}
