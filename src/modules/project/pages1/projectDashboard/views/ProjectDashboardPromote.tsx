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
import {
  getPathWithGeyserHero,
  GeyserMetamickTelegramUrl,
  GeyserPromotionPlaylistUrl,
} from '@/shared/constants/index.ts'

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
              "Spreading the word about your project can be challenging, but Geyser is here to help by showcasing trending projects, highlighting new ones in our monthly email, and more. If you're looking for more, we also offer getting featured and receiving a Promotion boost.",
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
              'The Geyser Team will help you get setup for success through this bespoke package, which includes the following:',
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
              {t('Promotion Boost')}
            </Body>
            <Body size="md" medium light>
              {t('Price on inquiry')}
            </Body>
          </HStack>
          <VStack w="full" alignItems="flex-start">
            <Body size="sm">
              {t(
                'The Geyser Team will help you get setup for success through this bespoke package, which includes the following:',
              )}
            </Body>
            <UnorderedList fontSize="14px">
              <ListItem>
                <Body as="span" medium>
                  {t('Call with expert')}
                </Body>
                {': '}
                {t(
                  'based on your needs we can schedule a call to discuss product strategy, marketing strategy, content creation and distribution.',
                )}
              </ListItem>
              <ListItem>
                <Body as="span" medium>
                  {t('Get connected')}
                </Body>
                {': '}
                {t(
                  "we'll connect you with the right people that will make your project into a success: be it podcasters, content creators, designers or more.",
                )}
              </ListItem>
              <ListItem>
                <Body as="span" medium>
                  {t('Thorough report')}
                </Body>
                {': '}
                {t(
                  "we'll put together a summary sheet based on our conversation that you can take away with the key next steps and deliverables.",
                )}
              </ListItem>
              <ListItem>
                <Body as="span" medium>
                  {t('Get your project featured')}
                </Body>
                {': '}
                {t("We'll feature your project in our landing page for one week.")}
              </ListItem>
              <ListItem>
                <Body as="span" medium>
                  {t('Email campaign')}
                </Body>
                {': '}
                {t('we can blast your project out to the right people that we know might be interested.')}
              </ListItem>
              <Body size="sm">
                {t(
                  'Note: We reserve the right to refuse offering this service if the product does not align with our mission.',
                )}
              </Body>
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
              href={GeyserMetamickTelegramUrl}
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

        <VStack w="full" alignItems="flex-start" as={ChakraLink} href={GeyserPromotionPlaylistUrl} isExternal>
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
