import { Button, Link as ChakraLink, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
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
  badge: string
  cardVariant: 'default' | 'growth' | 'pro'
  footerNote?: string
}

/** Launch plans section matching the new launchStart design and copy hierarchy. */
export const LaunchPlansSection = () => {
  const growthBorder = useColorModeValue('primary1.300', 'primary1.700')
  const proBorder = useColorModeValue('primary1.500', 'primary1.600')
  const badgeBg = useColorModeValue('neutral1.2', 'neutral1.4')
  const badgeFg = useColorModeValue('neutral1.9', 'neutral1.11')

  const plans = useMemo<LaunchPlan[]>(
    () => [
      {
        badge: t('Starter'),
        title: t('Starter Launch'),
        subtitle: t('Do it yourself, get the basic exposure'),
        price: t('$25'),
        points: [t('Access to all Geyser tooling'), t('Get discovered on platform')],
        cardVariant: 'default',
      },
      {
        badge: t('Growth'),
        title: t('Growth Launch'),
        subtitle: t('Visibility boost'),
        price: t('$60'),
        points: [
          t('1 week front-page spotlight'),
          t('Newsletter feature (5000+ subscribers)'),
          t('1 social media post (15k+ followers)'),
        ],
        cardVariant: 'growth',
      },
      {
        badge: t('Pro'),
        title: t('Pro Launch'),
        subtitle: t('Maximum visibility + feedback'),
        price: t('$90'),
        points: [
          t('Everything in Growth'),
          t('Spotlight email to interested users'),
          t('Project feedback from Geyser Team'),
          t('Picked by 40% of Top 100 projects'),
        ],
        cardVariant: 'pro',
        footerNote: t('Limited to 5 per month'),
      },
      {
        badge: t('Partnership'),
        title: t('Geyser Partnership'),
        subtitle: t('Hands-on support + network amplification'),
        price: t('$1,000+'),
        points: [t('Personalized launch strategy'), t('Project feedback'), t('Marketing support')],
        cardVariant: 'default',
      },
    ],
    [],
  )

  return (
    <StartPageSectionShell id="launch-plans">
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Pick the level of support that fits your launch')}</H2>
        <Body size="lg" maxWidth="820px" muted>
          {t('Optional support to help you launch stronger.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={5}>
        {plans.map((plan) => {
          const cardBorderColor =
            plan.cardVariant === 'growth' ? growthBorder : plan.cardVariant === 'pro' ? proBorder : undefined

          return (
            <PlaybookCard
              key={plan.title}
              height="100%"
              borderColor={cardBorderColor}
              borderWidth={cardBorderColor ? '2px' : '1px'}
            >
              <VStack alignItems="flex-start" spacing={4} height="100%">
                <VStack borderRadius="999px" backgroundColor={badgeBg} paddingX={3} paddingY={1}>
                  <Body size="xs" bold color={badgeFg}>
                    {plan.badge}
                  </Body>
                </VStack>

                <VStack alignItems="flex-start" spacing={1}>
                  <H3 bold>{plan.title}</H3>
                  <Body size="sm" muted>
                    {plan.subtitle}
                  </Body>
                  <H3 size="xl" bold color="primary1.9" marginTop={2}>
                    {plan.price}
                  </H3>
                </VStack>

                <VStack alignItems="flex-start" spacing={2} flex={1}>
                  {plan.points.map((point, index) => {
                    const isHighlight = plan.cardVariant === 'pro' && index === plan.points.length - 1

                    return (
                      <Body key={point} size="sm" fontStyle={isHighlight ? 'italic' : 'normal'}>
                        <PiCheckCircle style={{ display: 'inline', marginRight: '8px' }} />
                        {point}
                      </Body>
                    )
                  })}
                </VStack>

                {plan.footerNote ? (
                  <Body size="xs" muted>
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
