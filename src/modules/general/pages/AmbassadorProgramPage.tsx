import { Badge, Box, Button, Flex, HStack, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import {
  PiArrowRight,
  PiCheckCircleBold,
  PiCoinsDuotone,
  PiLightningDuotone,
  PiLinkSimpleBold,
  PiRocketLaunchDuotone,
  PiShareNetworkBold,
} from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useAuthContext } from '@/context'
import { useAuthModal } from '@/modules/auth/hooks/useAuthModal.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H1, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

const stepItems = [
  {
    title: t('Get your ambassador link'),
    description: t(
      'Open a project share modal or your Ambassador Earnings page to copy the link tied to your hero account.',
    ),
    icon: PiLinkSimpleBold,
  },
  {
    title: t('Share projects you believe in'),
    description: t(
      'Post your link anywhere you already have trust: group chats, social media, newsletters, podcasts, or direct messages.',
    ),
    icon: PiShareNetworkBold,
  },
  {
    title: t('Earn when you enable funding or project launches'),
    description: t('When someone contributes or launches a project through your ambassador link, you earn sats.'),
    icon: PiCoinsDuotone,
  },
] as const

const principleItems = [
  {
    text: t('You only earn when your sharing leads to real contributions.'),
    icon: PiCheckCircleBold,
  },
  {
    text: t('Your Ambassador Earnings page shows the links you can share and the earnings you have generated.'),
    icon: PiCheckCircleBold,
  },
  {
    text: t('The best ambassadors share projects they genuinely understand and want to support.'),
    icon: PiCheckCircleBold,
  },
] as const

/** Simple explainer page for how Geyser ambassadors share projects and earn. */
export const AmbassadorProgramPage = () => {
  const navigate = useNavigate()
  const { user, isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()

  const eyebrowColor = useColorModeValue('neutral1.8', 'neutral1.10')
  const iconBg = useColorModeValue('primary1.3', 'primary1.4')
  const iconColor = useColorModeValue('primary1.11', 'primary1.9')
  const rewardIconBg = useColorModeValue('amber.3', 'amber.4')
  const rewardIconColor = useColorModeValue('amber.11', 'amber.9')
  const principlesBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const principleIconColor = useColorModeValue('primary1.9', 'primary1.9')
  const stepNumberBg = useColorModeValue('primary1.3', 'primary1.4')
  const stepNumberColor = useColorModeValue('primary1.11', 'primary1.9')

  const handleStartSharing = () => {
    if (!isLoggedIn) {
      loginOnOpen()
      return
    }

    navigate(getPath('userProfileSettingsAffiliate', String(user.id)))
  }

  return (
    <>
      <Head
        title={t('Ambassador Program')}
        description={t('Learn how Geyser ambassadors share projects and earn when they enable contributions.')}
        url={`https://geyser.fund${getPath('ambassadorProgram')}`}
      />

      <VStack
        w="full"
        maxWidth="1040px"
        marginX="auto"
        paddingX={{ base: 4, lg: 6 }}
        spacing={{ base: 6, lg: 8 }}
        alignItems="stretch"
        paddingBottom={10}
      >
        {/* Hero */}
        <VStack alignItems="start" spacing={5} pt={{ base: 2, lg: 4 }}>
          <Body size="sm" color={eyebrowColor} textTransform="uppercase" letterSpacing="0.1em" fontWeight={600}>
            {t('Ambassador Program')}
          </Body>

          <H1 size={{ base: '2xl', lg: '4xl' }} bold lineHeight={1.15}>
            {t('Share projects. Enable funding. Earn sats.')}
          </H1>

          <Body size={{ base: 'md', lg: 'lg' }} color="neutral1.11" lineHeight={1.6} maxW="680px">
            {t(
              'Ambassadors help projects get funded by sharing a trackable ambassador link. When that sharing leads to contributions, the ambassador earns for the value they enabled.',
            )}
          </Body>

          <Button
            onClick={handleStartSharing}
            size="lg"
            width={{ base: '100%', sm: 'auto' }}
            minW={{ sm: '220px' }}
            colorScheme="primary1"
            fontWeight={700}
            borderRadius="10px"
            boxShadow="0 4px 14px 0 rgba(0, 198, 163, 0.30)"
            transition="all 0.2s ease"
            _hover={{ transform: 'translateY(-2px)', boxShadow: '0 6px 20px 0 rgba(0, 198, 163, 0.40)' }}
            _active={{ transform: 'translateY(0)', boxShadow: '0 2px 8px 0 rgba(0, 198, 163, 0.25)' }}
            rightIcon={<Icon as={PiArrowRight} />}
          >
            {t('Start sharing')}
          </Button>
        </VStack>

        {/* Rewards */}
        <VStack align="stretch" spacing={4}>
          <H2 size="xl" bold>
            {t('What you earn')}
          </H2>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <CardLayout spacing={4} height="100%">
              <HStack spacing={4} alignItems="start">
                <Flex
                  w="48px"
                  h="48px"
                  flexShrink={0}
                  borderRadius="lg"
                  alignItems="center"
                  justifyContent="center"
                  bg={rewardIconBg}
                >
                  <Icon as={PiLightningDuotone} boxSize={6} color={rewardIconColor} />
                </Flex>
                <VStack align="start" spacing={1} flex={1}>
                  <HStack spacing={2} alignItems="center" flexWrap="wrap">
                    <H2 size="md" bold>
                      {t('Enabling contributions')}
                    </H2>
                    <Badge colorScheme="amber" variant="soft" borderRadius="full" px={3} py={1} textTransform="none">
                      <Body size="sm" medium>
                        {t('5% of contribution')}
                      </Body>
                    </Badge>
                  </HStack>
                  <Body color="neutral1.11" size="sm">
                    {t('Share projects you believe in and earn when your link drives real funding.')}
                  </Body>
                </VStack>
              </HStack>
            </CardLayout>

            <CardLayout spacing={4} height="100%">
              <HStack spacing={4} alignItems="start">
                <Flex
                  w="48px"
                  h="48px"
                  flexShrink={0}
                  borderRadius="lg"
                  alignItems="center"
                  justifyContent="center"
                  bg={rewardIconBg}
                >
                  <Icon as={PiRocketLaunchDuotone} boxSize={6} color={rewardIconColor} />
                </Flex>
                <VStack align="start" spacing={1} flex={1}>
                  <HStack spacing={2} alignItems="center" flexWrap="wrap">
                    <H2 size="md" bold>
                      {t('Enabling launches')}
                    </H2>
                    <Badge colorScheme="amber" variant="soft" borderRadius="full" px={3} py={1} textTransform="none">
                      <Body size="sm" medium>
                        {t('5,000 sats + 5%')}
                      </Body>
                    </Badge>
                  </HStack>
                  <Body color="neutral1.11" size="sm">
                    {t(
                      'Use your launch link to help strong projects get off the ground and keep earning as funding comes in.',
                    )}
                  </Body>
                  <Body size="xs" color="neutral1.9">
                    {t('* Up to 100k sats per project')}
                  </Body>
                </VStack>
              </HStack>
            </CardLayout>
          </SimpleGrid>
        </VStack>

        {/* Steps */}
        <VStack align="stretch" spacing={4}>
          <H2 size="xl" bold>
            {t('How it works')}
          </H2>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {stepItems.map((item, index) => (
              <CardLayout key={item.title} spacing={4} height="100%">
                <HStack spacing={3} alignItems="center">
                  <Flex
                    w="28px"
                    h="28px"
                    flexShrink={0}
                    borderRadius="full"
                    alignItems="center"
                    justifyContent="center"
                    bg={stepNumberBg}
                  >
                    <Body size="sm" bold color={stepNumberColor}>
                      {index + 1}
                    </Body>
                  </Flex>
                  <Flex
                    w="42px"
                    h="42px"
                    flexShrink={0}
                    borderRadius="lg"
                    alignItems="center"
                    justifyContent="center"
                    bg={iconBg}
                  >
                    <Icon as={item.icon} boxSize={5} color={iconColor} />
                  </Flex>
                </HStack>
                <VStack align="start" spacing={1}>
                  <H2 size="md" bold>
                    {item.title}
                  </H2>
                  <Body color="neutral1.11" size="sm">
                    {item.description}
                  </Body>
                </VStack>
              </CardLayout>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Principles */}
        <Box bg={principlesBg} borderRadius="xl" px={{ base: 5, lg: 7 }} py={{ base: 5, lg: 6 }}>
          <VStack align="stretch" spacing={4}>
            <H2 size="lg" bold>
              {t('What matters most')}
            </H2>
            <VStack align="stretch" spacing={3}>
              {principleItems.map((item) => (
                <HStack key={item.text} spacing={3} alignItems="start">
                  <Icon as={item.icon} boxSize={5} color={principleIconColor} mt="2px" flexShrink={0} />
                  <Body color="neutral1.11">{item.text}</Body>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </>
  )
}
