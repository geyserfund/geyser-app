import { Button, Link as ChakraLink, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRight, PiCheckCircle } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { GuideUrl } from '@/shared/constants/index.ts'

import { getLaunchPlansData } from '../../launch/constants/launchPlansData.ts'
import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'

/** Launch plans section matching the new launchStart design and copy hierarchy. */
export const LaunchPlansSection = () => {
  const priceColor = useColorModeValue('primary1.11', 'primary1.8')

  const plans = getLaunchPlansData(t)

  return (
    <StartPageSectionShell id="launch-plans">
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Pick the level of support that fits your launch')}</H2>
        <Body size="lg" maxWidth="820px" light>
          {t('Optional support to help you launch stronger.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={5}>
        {plans.map((plan) => {
          return (
            <PlaybookCard key={plan.title} height="100%">
              <VStack alignItems="flex-start" spacing={4} height="100%">
                <VStack alignItems="flex-start" spacing={1}>
                  <H3 bold>{plan.title}</H3>
                  <Body size="sm" light>
                    {plan.subtitle}
                  </Body>
                  <H3 size="xl" bold color={priceColor} marginTop={2}>
                    {plan.price}
                  </H3>
                </VStack>

                <VStack alignItems="flex-start" spacing={2} flex={1}>
                  {plan.points.map((point, index) => {
                    const shouldShowTick = !(plan.id === 'growth' && index === 0)
                    const pointLabel = point.description ? `${point.title}: ${point.description}` : point.title

                    return (
                      <Body key={pointLabel} size="sm">
                        {shouldShowTick ? <PiCheckCircle style={{ display: 'inline', marginRight: '8px' }} /> : null}
                        {pointLabel}
                      </Body>
                    )
                  })}
                </VStack>

                {plan.highlightedText ? (
                  <Body size="xs" light>
                    {plan.highlightedText}
                  </Body>
                ) : null}
              </VStack>
            </PlaybookCard>
          )
        })}
      </SimpleGrid>

      <VStack alignItems="center" justifyContent="center" width="100%">
        <Button
          as={ChakraLink}
          href={GuideUrl}
          isExternal
          variant="link"
          colorScheme="primary1"
          rightIcon={<PiArrowUpRight />}
        >
          {t('Learn about launch modes')}
        </Button>
      </VStack>
    </StartPageSectionShell>
  )
}
