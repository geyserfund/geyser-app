import { Box, Button, Link as ChakraLink, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiCheckCircle, PiRocket, PiSparkle, PiStar, PiTrendUp } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { useLaunchNow } from '../utils/useLaunchNow.tsx'

/** Step 5 section presenting launch support plans and pricing. */
export const LaunchPlansSection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  const highlightedBorder = useColorModeValue('primary1.400', 'primary1.600')
  const badgeBackground = useColorModeValue('primary1.9', 'primary1.7')
  const iconBackground = useColorModeValue('primary1.100', 'primary1.900')

  const plans = useMemo(
    () => [
      {
        icon: PiRocket,
        title: t('Starter Launch'),
        subtitle: t('do it yourself, get the basic exposure'),
        price: t('$25'),
        points: [t('Access to all Geyser tooling and get discovered through the Geyser platform')],
        badge: '',
      },
      {
        icon: PiTrendUp,
        title: t('Growth Launch'),
        subtitle: t('Visibility boost'),
        price: t('$60'),
        points: [
          `${t('Landing Page Feature')}: ${t('1 week front-page spotlight')}`,
          `${t('Geyser Newsletter feature')}: ${t(
            'get featured at the top of our monthly newsletter going out to 5000+ subscribers',
          )}`,
          `${t('Social Media post')}: ${t('1 social media post on Geyser’s X account with 15k+ followers')}`,
        ],
        badge: t('Popular'),
      },
      {
        icon: PiStar,
        title: t('Pro Launch'),
        subtitle: t('Maximum visibility + product feedback'),
        price: t('$90'),
        points: [
          t('Limited to 5 per month, subject to selection'),
          t('Everything in Growth'),
          `${t('Spotlight Email')}: ${t(
            'Your project featured in a dedicated email sent to Geyser users most interested in your category',
          )}`,
          `${t('Project feedback')}: ${t(
            'Geyser Team Expert provides 1-time feedback on your project story and structure',
          )}`,
          t('Picked by 40% of Top 100 projects on Geyser'),
        ],
        badge: t('Best Value'),
      },
      {
        icon: PiSparkle,
        title: t('Geyser Partnership'),
        subtitle: t('hands on support + network amplification'),
        price: t('starting at $1,000'),
        points: [
          t('Geyser becomes your partner providing personalized launch strategy, project feedback, marketing support'),
        ],
        badge: t('Premium'),
      },
    ],
    [],
  )

  return (
    <>
      <StartPageSectionShell id="launch-plans" sectionBg={useColorModeValue('neutral1.1', 'neutral1.2')}>
        <VStack alignItems="flex-start" spacing={3}>
          <H2 bold>{t('Choose your Launch Plan')}</H2>
          <Body size="lg" maxWidth="850px" muted>
            {t('Different support levels to match your project ambition and launch strategy.')}
          </Body>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={5}>
          {plans.map((plan) => {
            const isHighlighted = plan.badge === t('Best Value')
            const isPartnership = plan.title === t('Geyser Partnership')

            return (
              <PlaybookCard
                key={plan.title}
                height="100%"
                borderColor={isHighlighted ? highlightedBorder : undefined}
                borderWidth={isHighlighted ? '2px' : '1px'}
              >
                <VStack alignItems="flex-start" spacing={4} height="100%">
                  {plan.badge ? (
                    <VStack borderRadius="999px" backgroundColor={badgeBackground} paddingX={3} paddingY={1}>
                      <Body size="xs" bold>
                        {plan.badge}
                      </Body>
                    </VStack>
                  ) : null}

                  <Box
                    width="42px"
                    height="42px"
                    borderRadius="10px"
                    backgroundColor={iconBackground}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <plan.icon size={20} />
                  </Box>

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
                    {plan.points.map((point) => (
                      <Box key={point}>
                        <Body size="sm">
                          <PiCheckCircle style={{ display: 'inline', marginRight: '8px' }} />
                          {point}
                        </Body>
                      </Box>
                    ))}
                  </VStack>

                  {isPartnership ? (
                    <Button
                      as={ChakraLink}
                      isExternal
                      href="https://cal.com/metamick/geyser-partnership-hands-on-support-network-amplification?overlayCalendar=true"
                      width="100%"
                      variant="outline"
                      colorScheme="neutral1"
                    >
                      {t('Contact us')}
                    </Button>
                  ) : (
                    <Button
                      width="100%"
                      colorScheme={isHighlighted ? 'primary1' : 'neutral1'}
                      variant={isHighlighted ? 'solid' : 'outline'}
                      onClick={handleLauchNowClick}
                    >
                      {t('Select plan')}
                    </Button>
                  )}
                </VStack>
              </PlaybookCard>
            )
          })}
        </SimpleGrid>
      </StartPageSectionShell>
      {renderModal()}
    </>
  )
}
