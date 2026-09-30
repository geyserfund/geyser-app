import { Box, HStack, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiChartLineUp, PiMapPinArea, PiUsersThree } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { DEFAULT_NEWSLETTER_PREFERENCES } from '@/shared/constants/newsletter.ts'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'

const NEWSLETTER_HIGHLIGHTS = [
  { icon: PiUsersThree, label: 'Field Partner stories' },
  { icon: PiChartLineUp, label: 'Circular Grant progress' },
  { icon: PiMapPinArea, label: 'Where capital flows next' },
] as const

/** Hero section with headline, segment preferences and subscribe form. */
export const NewsletterHero = () => {
  const heroBg = useColorModeValue('neutral1.1', 'neutral1.2')
  const borderColor = useColorModeValue('neutral1.4', 'neutral1.5')
  const inputBg = useColorModeValue('white', 'neutral1.2')
  const titleColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const bodyColor = useColorModeValue('neutral1.9', 'neutral1.11')
  const mutedColor = useColorModeValue('neutral1.8', 'neutral1.10')

  return (
    <Box w="full" borderRadius="24px" bg={heroBg} border="1px solid" borderColor={borderColor}>
      <VStack
        spacing={{ base: 7, md: 8 }}
        px={{ base: 5, md: 10, lg: 14 }}
        py={{ base: 8, md: 12, lg: 14 }}
        align="stretch"
      >
        <VStack align="center" spacing={4} textAlign="center">
          <Body size="sm" bold color="primary1.9" textTransform="uppercase" letterSpacing="0.12em">
            {t('Circular Grants newsletter')}
          </Body>
          <H1 size={{ base: '3xl', md: '4xl' }} lineHeight={{ base: 1.12, md: 1.08 }} color={titleColor}>
            {t('Follow Circular Grants in motion')}
          </H1>

          <Body size={{ base: 'md', md: 'lg' }} color={bodyColor} lineHeight={1.7} maxW="680px">
            {t(
              'Get concise updates from Field Partners, meet the local businesses behind each campaign, and see what Circular Grants make possible.',
            )}
          </Body>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 3, md: 5 }}>
          {NEWSLETTER_HIGHLIGHTS.map((item) => (
            <HStack key={item.label} spacing={3} justify={{ base: 'flex-start', md: 'center' }}>
              <Icon as={item.icon} boxSize={5} color="primary1.9" flexShrink={0} />
              <Body size="sm" medium color={bodyColor}>
                {t(item.label)}
              </Body>
            </HStack>
          ))}
        </SimpleGrid>

        <VStack align="stretch" spacing={3} w="full">
          <SubscribeForm
            maxWidth="full"
            preferences={DEFAULT_NEWSLETTER_PREFERENCES}
            buttonProps={{
              children: t('Subscribe'),
              colorScheme: 'primary1',
              fontSize: 'md',
            }}
            inputProps={{
              backgroundColor: inputBg,
              placeholder: t('Enter your email'),
            }}
          />
          <Body size="sm" color={mutedColor}>
            {t('One email. High signal. Unsubscribe anytime.')}
          </Body>
        </VStack>
      </VStack>
    </Box>
  )
}
