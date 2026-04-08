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
  badge: string
  cardVariant: 'default' | 'growth' | 'catalyst'
  footerNote?: string
}

/** Launch plans section matching the new launchStart design and copy hierarchy. */
export const LaunchPlansSection = () => {
  const badgeBg = useColorModeValue('neutral1.2', 'neutral1.4')
  const badgeFg = useColorModeValue('neutral1.9', 'neutral1.11')
  const priceColor = useColorModeValue('primary1.11', 'primary1.8')

  const plans: LaunchPlan[] = [
    {
      badge: t('Starter'),
      title: t('Starter Launch'),
      subtitle: t('do it yourself, get the basic exposure'),
      price: t('$25'),
      points: [t('Access to all Geyser tooling and get discovered through the Geyser platform')],
      cardVariant: 'default',
    },
    {
      badge: t('Growth'),
      title: t('Growth Launch'),
      subtitle: t('visibility + distribution boost'),
      price: t('$60'),
      points: [
        t('Everything in Starter'),
        t('Landing Page Feature: 1 week front-page spotlight'),
        t('Project Feedback: 1-time expert feedback on your project story and structure'),
        t('Geyser Newsletter Feature: featured in our monthly newsletter'),
        t('Social Media Post: 1 post on Geyser’s X account'),
        t('Social Amplification: additional reposts and visibility boosts'),
      ],
      cardVariant: 'growth',
    },
    {
      badge: t('Most Popular'),
      title: t('Catalyst Launch'),
      subtitle: t('guided strategy + targeted amplification'),
      price: t('$300'),
      points: [
        t(
          'A strategic launch package with content, network access, and dedicated support - with expected reach of ~100k impressions depending on project potential',
        ),
        t('Strategy Call: 1 session to define goals, audience, and launch plan'),
        t('Content Strategy Plan: 1 session with clear deliverable of what to post and when'),
        t('Rapidfire Q&A for Content: 1 session to create 10 pieces of content to help clarify your project'),
        t('Social Amplification: additional reposts and visibility boosts'),
        t('Deep Social Promotion: high-quality dedicated post + ongoing retweets'),
        t('Newsletter Spotlight: featured placement in newsletter'),
        t('Email Campaign: promotion sent to relevant Geyser users/projects'),
        t('Network Access: introductions to relevant partners when aligned'),
        t('1-Month Support: async support in shared Telegram group'),
        t('Mid-Campaign Check-in: progress review + optimization suggestions'),
      ],
      cardVariant: 'catalyst',
    },
    {
      badge: t('Partnership'),
      title: t('Geyser Partnership'),
      subtitle: t('hands-on support + network amplification'),
      price: t('starting at $1,000 per month'),
      points: [
        t('Geyser becomes your partner providing personalized launch strategy, project feedback, and marketing support'),
        t('Dedicated Strategy & Planning: ongoing alignment on goals and execution'),
        t('Content Planning & Creation Support: hands-on help crafting your campaign'),
        t('Full Network Access: direct amplification through Geyser ecosystem'),
        t('Newsletter Features Across Campaign: multiple placements during your campaign'),
        t('Weekly Discussions & Check-ins: continuous guidance from Geyser team'),
        t('Campaign Iteration & Improvements: ongoing optimization based on performance'),
        t('Dedicated Telegram Group: ongoing support and coordination'),
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
                <VStack borderRadius="999px" backgroundColor={badgeBg} paddingX={3} paddingY={1}>
                  <Body size="xs" bold color={badgeFg}>
                    {plan.badge}
                  </Body>
                </VStack>

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
                    const isHighlight = plan.cardVariant === 'catalyst' && index === 0

                    return (
                      <Body key={point} size="sm" fontStyle={isHighlight ? 'italic' : 'normal'}>
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
