import { Button, Link as ChakraLink, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRight, PiCheckCircle } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { GuideUrl } from '@/shared/constants/index.ts'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'

type LaunchPlan = {
  title: string
  subtitle: string
  price: string
  points: string[]
  cardVariant: 'default' | 'growth' | 'catalyst'
  footerNote?: string
}

/** Launch plans section matching the new launchStart design and copy hierarchy. */
export const LaunchPlansSection = () => {
  const priceColor = useColorModeValue('primary1.11', 'primary1.8')

  const plans: LaunchPlan[] = [
    {
      title: t('Basic'),
      subtitle: t('Do it yourself. Get listed and start collecting support.'),
      price: t('$25'),
      points: [t('Access to all Geyser tools'), t('Discoverability on the platform')],
      cardVariant: 'default',
    },
    {
      title: t('Visibility Boost'),
      subtitle: t(
        'Get eyes on your project. Best for projects that already have an audience and are confident about your project.',
      ),
      price: t('$60'),
      points: [t('1 week front-page feature'), t('Newsletter placement'), t('1 social post by Geyser socials')],
      cardVariant: 'growth',
    },
    {
      title: t('Growth'),
      subtitle: t(
        'Turn your project into a real launch with traction. Designed to generate your first wave of supporters and momentum (~50k–100k targeted impressions)',
      ),
      price: t('$300'),
      points: [
        t(
          'Strategy & Positioning: We help you define your goals, audience, and launch plan starting with a strategy and content call.',
        ),
        t('Content Engine: 10 high-signal posts + clear posting plan'),
        t('Distribution: Social amplification, newsletter spotlight, and targeted email campaign'),
        t('Ongoing Optimization: 1 month support, mid-campaign check-in, and performance improvements'),
      ],
      cardVariant: 'catalyst',
      footerNote: t('Picked by 40% of the Top 100 projects on Geyser'),
    },
    {
      title: t('Partnership'),
      subtitle: t('Hands-on execution and full ecosystem amplification. For teams scaling serious initiatives.'),
      price: t('starting at $2,500'),
      points: [
        t('Dedicated strategy and execution'),
        t('Content creation and campaign management'),
        t('Full network access and amplification'),
        t('Continuous optimization and support'),
        t('Direct collaboration with the Geyser team'),
      ],
      cardVariant: 'default',
    },
  ]

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
                  {plan.points.map((point) => {
                    return (
                      <Body key={point} size="sm">
                        <PiCheckCircle style={{ display: 'inline', marginRight: '8px' }} />
                        {point}
                      </Body>
                    )
                  })}
                </VStack>

                {plan.footerNote ? (
                  <Body size="xs" light>
                    {plan.footerNote}
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
