import { Box, Button, HStack, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowLeft, PiChartLineUp, PiClockCounterClockwise, PiTarget } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/config/routerPaths.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

const transparencyMetrics = [
  {
    label: 'Quarterly capital pool',
    current: '3M sats',
    goal: 'Grow recurring partner-backed capital beyond the pilot allocation',
  },
  {
    label: 'Pilot reach',
    current: '6 projects · 30 participants',
    goal: 'Reach more vetted entrepreneurs across additional circular economies',
  },
  {
    label: 'Local allocation',
    current: '100% to local beneficiaries',
    goal: 'Keep full beneficiary allocation as the program grows',
  },
  {
    label: 'Public reporting',
    current: 'Pilot learning and case studies',
    goal: 'Publish quarterly allocation, return, and redeployment updates',
  },
] as const

/** WIP public snapshot of Circular Grants pilot metrics and reporting goals. */
export const CircularGrantsTransparencyPage = () => {
  const mutedSurface = useColorModeValue('neutral1.2', 'neutral1.3')
  const accentSurface = useColorModeValue('amber.3', 'amber.4')
  const goalSurface = useColorModeValue('primary1.2', 'primary1.3')
  const borderColor = useColorModeValue('neutral1.5', 'neutral1.6')

  return (
    <Box w="full" bg="utils.pbg" color="utils.text">
      <Head
        title={t('Circular Grants transparency')}
        description={t('A work-in-progress view of Circular Grants pilot metrics, goals, and public reporting.')}
        url={`https://geyser.fund${getPath('discoveryCircularGrantsTransparency')}`}
      />

      <VStack align="stretch" spacing={{ base: 8, lg: 12 }} px={standardPadding} py={{ base: 6, lg: 10 }}>
        <VStack w="full" maxW={`${dimensions.maxWidth}px`} mx="auto" align="stretch" spacing={{ base: 7, lg: 10 }}>
          <Button
            as={Link}
            to={getPath('discoveryCircularGrants')}
            variant="ghost"
            colorScheme="neutral1"
            alignSelf="flex-start"
            leftIcon={<Icon as={PiArrowLeft} />}
          >
            {t('Back to Circular Grants')}
          </Button>

          <CardLayout
            noborder
            bg={accentSurface}
            borderRadius="3xl"
            p={{ base: 6, lg: 10 }}
            spacing={{ base: 5, lg: 6 }}
          >
            <HStack spacing={3} align="center">
              <Icon as={PiClockCounterClockwise} boxSize={6} color="amber.11" aria-hidden />
              <Body size="sm" bold color="amber.11" textTransform="uppercase" letterSpacing="0.08em">
                {t('Work in progress')}
              </Body>
            </HStack>
            <H1 size={{ base: '3xl', lg: '5xl' }} bold maxW="900px" sx={{ textWrap: 'balance' }}>
              {t('Circular Grants transparency')}
            </H1>
            <Body size={{ base: 'md', lg: 'xl' }} lineHeight="1.6" maxW="820px">
              {t(
                'This page is an early public snapshot. It shows what the pilot is doing today and the reporting standard we are building toward with our Field Partners.',
              )}
            </Body>
          </CardLayout>

          <VStack align="stretch" spacing={3}>
            <HStack spacing={3} align="center">
              <Icon as={PiChartLineUp} boxSize={6} color="primary1.9" aria-hidden />
              <H2 size={{ base: 'xl', lg: '3xl' }} bold>
                {t('Where we are and where we are going')}
              </H2>
            </HStack>
            <Body size={{ base: 'md', lg: 'lg' }} color="neutralAlpha.11" maxW="780px">
              {t('These figures describe the current Afribit Kibera pilot and will be updated as reporting matures.')}
            </Body>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {transparencyMetrics.map((metric) => (
              <CardLayout
                key={metric.label}
                bg={mutedSurface}
                borderColor={borderColor}
                p={{ base: 5, lg: 6 }}
                spacing={5}
              >
                <Body size="sm" bold color="neutralAlpha.11" textTransform="uppercase" letterSpacing="0.08em">
                  {t(metric.label)}
                </Body>
                <VStack align="stretch" spacing={3}>
                  <Box bg="utils.pbg" borderRadius="innerCard" p={4}>
                    <Body size="xs" bold color="neutralAlpha.11" textTransform="uppercase" letterSpacing="0.08em">
                      {t('Today')}
                    </Body>
                    <H3 size={{ base: 'xl', lg: '2xl' }} bold mt={1}>
                      {t(metric.current)}
                    </H3>
                  </Box>
                  <HStack align="flex-start" spacing={3} bg={goalSurface} borderRadius="innerCard" p={4}>
                    <Icon as={PiTarget} boxSize={5} color="primary1.9" mt={0.5} flexShrink={0} aria-hidden />
                    <VStack align="flex-start" spacing={1}>
                      <Body size="xs" bold color="primary1.11" textTransform="uppercase" letterSpacing="0.08em">
                        {t('Next goal')}
                      </Body>
                      <Body size="md" bold>
                        {t(metric.goal)}
                      </Body>
                    </VStack>
                  </HStack>
                </VStack>
              </CardLayout>
            ))}
          </SimpleGrid>

          <CardLayout bg={mutedSurface} borderColor={borderColor} p={{ base: 5, lg: 7 }} spacing={3}>
            <H2 size={{ base: 'lg', lg: '2xl' }} bold>
              {t('What we will add next')}
            </H2>
            <Body size={{ base: 'md', lg: 'lg' }} color="neutralAlpha.11" lineHeight="1.6">
              {t(
                'Future updates will include capital allocated, capital returned, capital redeployed, participating Field Partners, supported projects, and lessons from each local cohort.',
              )}
            </Body>
          </CardLayout>
        </VStack>

        <Box w="full" maxW={`${dimensions.maxWidth}px`} mx="auto" pb={{ base: 24, lg: 0 }}>
          <UserExternalLinksComponent />
        </Box>
      </VStack>
    </Box>
  )
}
