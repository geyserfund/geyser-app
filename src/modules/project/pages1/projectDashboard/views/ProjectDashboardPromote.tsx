import { Button, HStack, Icon, Link as ChakraLink, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiEnvelope, PiTelegramLogo, PiYoutubeLogo } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import {
  GEYSER_GET_FEATURED_REWARD_ID,
  GEYSER_PROMOTIONS_PROJECT_NAME,
} from '@/modules/discovery/pages/landing/views/defaultView/sections/Featured.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPathWithGeyserHero, GeyserTelegramUrl } from '@/shared/constants/index.ts'

import { DashboardLayout } from '../common/DashboardLayout.tsx'

export const ProjectDashboardPromote = () => {
  return (
    <DashboardLayout desktopTitle={t('Promote')}>
      <VStack
        width="100%"
        alignItems="flex-start"
        spacing={6}
        flexGrow={1}
        position="relative"
        paddingX={{ base: 0, lg: 6 }}
      >
        <HStack w="100%" justifyContent="space-between" spacing="20px">
          <Body flex={1} size="sm" light>
            {t(
              'Letting people know about your project or campaign is the hardest and most important part. At Geyser we help showcase trending projects, we highlight new interesting ones in our Monthly email, and so much more. But if you’re looking for more, we provide the following plans to projects that align with our mission and we believe have potential.',
            )}
          </Body>
        </HStack>
        <CardLayout w="full">
          <HStack w="full" justifyContent="space-between">
            <Body size="md" medium>
              {t('Get Discovered')}
            </Body>
            <Body size="md" medium color="primary1.11">
              {t('Free')}
            </Body>
          </HStack>
          <Body size="sm">
            {t(
              'Your project will automatically appear in the Trending category if it receives the highest funding in its category for the week, offering free visibility to top-performing projects.',
            )}
          </Body>
        </CardLayout>
        <CardLayout w="full">
          <HStack w="full" justifyContent="space-between">
            <Body size="md" medium>
              {t('Get Featured')}
            </Body>
            <Body size="md" medium light>
              {t('$50 per month')}
            </Body>
          </HStack>
          <Body size="sm">
            {t(
              'Get featured at the top of the Geyser Discovery page. Your project will stay highlighted for a full week for a small fee.',
            )}
          </Body>
          <Button
            as={Link}
            to={getPathWithGeyserHero(
              'projectRewardView',
              GEYSER_PROMOTIONS_PROJECT_NAME,
              GEYSER_GET_FEATURED_REWARD_ID,
            )}
            size="lg"
            variant="solid"
            colorScheme="primary1"
          >
            {t('Get featured')}
          </Button>
        </CardLayout>
        <CardLayout w="full">
          <HStack w="full" justifyContent="space-between">
            <Body size="md" medium>
              {t('Marketing Boost')}
            </Body>
            <Body size="md" medium light>
              {t('Price on inquiry')}
            </Body>
          </HStack>
          <VStack w="full" alignItems="flex-start">
            <Body size="sm">
              {t(
                'Get featured at the top of the Geyser Discovery page. Your project will stay highlighted for a full week for a small fee.',
              )}
            </Body>
            <UnorderedList fontSize="14px">
              <ListItem>{t('Marketing Strategy call')}</ListItem>
              <ListItem>{t('Email reward buyers likely to be interested')}</ListItem>
              <ListItem>{t('X promotion')}</ListItem>
              <ListItem>{t('Featuring project in landing page')}</ListItem>
              <ListItem>{t('Get on our podcast')}</ListItem>
              <ListItem>{t('X-Space to discuss your project')}</ListItem>
            </UnorderedList>
          </VStack>

          <HStack w="full">
            <Button
              as={ChakraLink}
              href={'mailto:hello@geyser.fund'}
              isExternal
              size="lg"
              flex={1}
              variant="surface"
              colorScheme="primary1"
              leftIcon={<Icon as={PiEnvelope} />}
            >
              {t('Send us email')}
            </Button>
            <Button
              as={ChakraLink}
              href={GeyserTelegramUrl}
              isExternal
              size="lg"
              flex={1}
              variant="solid"
              colorScheme="primary1"
              leftIcon={<Icon as={PiTelegramLogo} />}
            >
              {t('Chat on Telegram')}
            </Button>
          </HStack>
        </CardLayout>

        <VStack w="full" alignItems="flex-start">
          <Body size="2xl" medium>
            {t('How to promote your project?')}
          </Body>
          <Body size="sm">
            {t('To learn about how to promote your crowdfunding project, check out this playlist we created. ')}
          </Body>
          <CardLayout dense direction="row" spacing={4} alignItems="center">
            <HStack
              height="108px"
              minWidth="108px"
              backgroundColor="neutral1.12"
              justifyContent="center"
              alignItems="center"
            >
              <Icon as={PiYoutubeLogo} fontSize="48px" color="neutral1.1" />
            </HStack>
            <Body size="sm">
              <Body as="span" color="primary1.11">
                {t('Watch the playlist.')}
              </Body>{' '}
              {t(
                'Inside, you’ll find a series of expert-led tutorials and actionable tips covering everything from crafting compelling project stories, leveraging social media, engaging your audience, and maximizing outreach strategies. ',
              )}
            </Body>
          </CardLayout>
        </VStack>
      </VStack>
    </DashboardLayout>
  )
}
