import { Button, HStack, Image, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { CampaignsComingSoonImageUrl } from '@/shared/constants/index.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

import { RegisterCampaignLaunch } from './RegisterCampaignLaunch.tsx'

export const CampaignsComingSoon = () => {
  const registerCampaignLaunchModal = useModal()
  return (
    <>
      <VStack w="full" gap={10} paddingBottom={8} px={standardPadding}>
        <Image
          height="auto"
          width="full"
          maxWidth="720px"
          src={CampaignsComingSoonImageUrl}
          alt="Campaigns Coming Soon"
        />
        <VStack w="full" width="full" gap={4} maxW="1100px">
          <H2 size={{ base: '2xl', lg: '4xl' }} bold textAlign="center">
            {t('Launch your biggest ideas on Bitcoin with confidence.')} <br />
            {t('All-or-Nothing Campaigns are coming soon')}
          </H2>

          <Body size="lg" textAlign="center">
            {t(
              'We’re unlocking a new kind of crowdfunding on Bitcoin. One that empowers creators to go big with confidence. With All-or-Nothing, funds are only released if your campaign reaches its goal. If it doesn’t, contributors can get their sats back.',
            )}
          </Body>
        </VStack>

        <Button size="xl" colorScheme="primary1" onClick={registerCampaignLaunchModal.onOpen}>
          {t('Register your campaign launch')}
        </Button>
        <VStack w="full" maxW="930px" gap={6}>
          <H2 size={{ base: 'xl', lg: '3xl' }} bold>
            {t('How it works')}
          </H2>
          <VStack w="full" gap={3} align="stretch">
            <VStack align="start">
              <H3 size="xl" bold>
                {t('Let creators think big')}
              </H3>
              <Body size="xl" lineHeight={1.6}>
                {t(
                  'Set the full budget your idea deserves. Build hardware, write books, produce board games, translate important works — with the confidence that you’ll only move forward when your community funds the entire project.',
                )}
              </Body>
            </VStack>
            <VStack align="start">
              <H3 size="xl" bold>
                {t('Protect contributors with trustless refunds')}
              </H3>
              <Body size="xl" lineHeight={1.6}>
                {t(
                  'Every contribution is locked in a secure, non-custodial smart contract. If the goal isn’t hit, contributors simply reclaim their funds. No platform custody, no chasing refunds, no risk.',
                )}
              </Body>
            </VStack>
            <VStack align="start">
              <H3 size="xl" bold>
                {t('Make momentum your superpower')}
              </H3>
              <Body size="xl" lineHeight={1.6}>
                {t(
                  'Clear goals and deadlines rally communities. Supporters share, promote, and help push your campaign over the finish line — because they know the project only succeeds if everyone makes it happen.',
                )}
              </Body>
            </VStack>
          </VStack>
          <HStack w="full" gap={4} flexWrap="wrap" alignItems="stretch" justify="space-between">
            <VStack
              align="start"
              gap={2}
              bg="neutral1.3"
              flexBasis={{ base: '100%', md: '32%' }}
              rounded="lg"
              p={4}
              alignItems="center"
            >
              <Body size="6xl" bold lineHeight={0.96}>
                ∞
              </Body>
              <Body size="lg" bold>
                {t('new ideas to unlock')}
              </Body>
              <Body size="md" textAlign="center">
                {t(
                  'So many projects don’t start because they need large upfront capital - AON allows you to aim for that minimum threshold you need.',
                )}
              </Body>
            </VStack>
            <VStack
              align="start"
              gap={2}
              bg="neutral1.3"
              flexBasis={{ base: '100%', md: '32%' }}
              rounded="lg"
              p={4}
              alignItems="center"
            >
              <Body size="4xl" bold>
                0%
              </Body>
              <Body size="lg" bold>
                {t('fees if project fails')}
              </Body>
              <Body size="md" textAlign="center">
                {t('Geyser only monetizes if the project succeeds, to keep incentives aligned all the way down. ')}
              </Body>
            </VStack>
            <VStack
              align="start"
              gap={2}
              bg="neutral1.3"
              flexBasis={{ base: '100%', md: '32%' }}
              rounded="lg"
              p={4}
              alignItems="center"
            >
              <Body size="4xl" bold>
                5
              </Body>
              <Body size="lg" bold>
                {t('minutes to launch')}
              </Body>
              <Body size="md" textAlign="center">
                {t(
                  'No documentation needed to launch as Geyser does not custody funds. Note: projects need to be reviewed before they can launch.',
                )}
              </Body>
            </VStack>
          </HStack>
        </VStack>

        <VStack w="full" maxW="800px" gap={4}>
          <H2 size={{ base: 'xl', lg: '3xl' }} bold>
            {t('Upcoming cohort launches')}
          </H2>
          <Body size="lg" textAlign="center">
            {t(
              'We’re launching AON campaigns in several cohorts. This allows us to test this feature in the open while also helping with project promotion.',
            )}
          </Body>
          <Feedback variant={FeedBackVariant.ERROR} noIcon maxWidth="500px">
            <VStack w="full" alignItems="start" gap={0}>
              <H3 size="xl" bold>
                {t('Cohort 1 - FULLY BOOKED')}
              </H3>
              <Body size="lg>">{t('Novermber 24 - Dec 14')}</Body>
              <UnorderedList marginTop={4}>
                <ListItem fontWeight={'bold'}>📕 {t('Translation of The Sovereign Individual')}</ListItem>
                <ListItem fontWeight={'bold'}>📱 {t('New Hardware Wallet')}</ListItem>
                <ListItem fontWeight={'bold'}>🎲 {t('New Board game')}</ListItem>
              </UnorderedList>
            </VStack>
          </Feedback>

          <Feedback variant={FeedBackVariant.SUCCESS} noIcon maxWidth="500px">
            <VStack w="full" alignItems="start" gap={0}>
              <H3 size="xl" bold>
                {t('Cohort 2 - OPEN')}
              </H3>
              <Body size="lg>">{t('January 2026')}</Body>
              <Button colorScheme="primary1" onClick={registerCampaignLaunchModal.onOpen} marginTop={4}>
                {t('Register your campaign launch')}
              </Button>
            </VStack>
          </Feedback>
          <Feedback variant={FeedBackVariant.INFO} noIcon maxWidth="500px">
            <VStack w="full" alignItems="start" gap={0}>
              <H3 size="xl" bold>
                {t('All or Nothing open launch')}
              </H3>
              <Body size="lg>">{t('End of January 2026')}</Body>
            </VStack>
          </Feedback>
        </VStack>

        <VStack w="full" maxW="800px">
          <H2 size={{ base: 'xl', lg: '2xl' }} bold>
            {t('Powered by')}
          </H2>
          <Image
            src={'https://storage.googleapis.com/geyser-projects-media/app/campaigns/rootstock_image.png'}
            height="60px"
            width="auto"
            alt="All or Nothing"
          />
        </VStack>
      </VStack>
      <RegisterCampaignLaunch {...registerCampaignLaunchModal} />
    </>
  )
}
