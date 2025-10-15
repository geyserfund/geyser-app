import { HStack, Link, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'

/** How to Launch section with step-by-step guide */
export const HowToLaunchSection = () => {
  return (
    <CreationLayoutCard bg="neutral1.2">
      <VStack maxW={dimensions.creation.start.maxWidth} alignItems="flex-start">
        <Body size="sm" muted bold>
          {t('HOW TO LAUNCH')}
        </Body>

        <H2 size="2xl" bold>
          {t('How to Launch')}
        </H2>

        <Body size="md">
          {t(
            "Launching a project isn't easy, but the key is to just get started. Make sure you address these three essentials:",
          )}
        </Body>

        <UnorderedList width="100%" maxW={dimensions.creation.start.maxWidth} px={4} spacing={3}>
          <ListItem>
            <H3 as="span" size="md" bold>
              {t('Vision & Impact')}:
            </H3>
            <Body as="span" size="md" pl={2}>
              {t("Define the problem you're solving and how your project creates impact.")}
            </Body>
          </ListItem>

          <ListItem>
            <H3 as="span" size="md" bold>
              {t('Funding')}:
            </H3>
            <Body as="span" size="md" pl={2}>
              {t(
                'Plan your idea with friends, family, and your network before asking for funding. Even small steps count.',
              )}
            </Body>
          </ListItem>

          <ListItem>
            <H3 as="span" size="md" bold>
              {t('Reputation & Community')}:
            </H3>
            <Body as="span" size="md" pl={2}>
              {t(
                "Build your support from friends, followers, and those who you're looking to serve. Share your journey to grow trust.",
              )}
            </Body>
          </ListItem>
        </UnorderedList>
      </VStack>
      <HStack w="full" maxW={dimensions.creation.start.maxWidth}>
        <Body size="md">{t('Check out our Guide for step-by-step tutorials.')}</Body>
        <Link
          href="#"
          fontSize="md"
          fontWeight="medium"
          color="primary.600"
          textDecoration="underline"
          display="inline-block"
        >
          {t('How to Launch')}
        </Link>
      </HStack>
    </CreationLayoutCard>
  )
}
