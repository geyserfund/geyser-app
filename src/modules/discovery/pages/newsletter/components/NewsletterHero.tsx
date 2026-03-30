import { Box, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'
import { fonts } from '@/shared/styles'

import { NEWSLETTER_SEGMENTS } from '../constants.ts'
import { SegmentCheckboxGroup } from './SegmentCheckboxGroup.tsx'

/** Hero section with headline, segment preferences and subscribe form. */
export const NewsletterHero = () => {
  const heroBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const heroPatternBg = useColorModeValue(
    'radial-gradient(circle at top left, rgba(0, 199, 173, 0.16), transparent 34%), radial-gradient(circle at bottom right, rgba(237, 160, 0, 0.12), transparent 28%)',
    'radial-gradient(circle at top left, rgba(0, 199, 173, 0.12), transparent 34%), radial-gradient(circle at bottom right, rgba(251, 136, 118, 0.12), transparent 28%)',
  )
  const inputBg = useColorModeValue('white', 'neutral1.2')
  const buttonBorderColor = useColorModeValue('neutral1.4', 'neutral1.5')
  const titleColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const bodyColor = useColorModeValue('neutral1.9', 'neutral1.10')
  const mutedColor = useColorModeValue('neutral1.8', 'neutral1.9')

  const [selectedSegments, setSelectedSegments] = useState<Set<string>>(
    () => new Set(NEWSLETTER_SEGMENTS.map((s) => s.id)),
  )

  return (
    <Box w="full" position="relative" overflow="hidden" borderRadius="28px" bg={heroBg}>
      <Box position="absolute" inset={0} backgroundImage={heroPatternBg} pointerEvents="none" />

      <VStack
        position="relative"
        spacing={6}
        px={{ base: 5, md: 8, xl: 10 }}
        py={{ base: 8, md: 10, xl: 12 }}
        align="start"
      >
        <Body size="sm" medium color="primary1.9" textTransform="uppercase" letterSpacing="0.12em">
          {t('Join our Newsletter')}
        </Body>

        <VStack align="start" spacing={4}>
          <H1
            fontFamily={fonts.cormorant}
            fontSize={{ base: '46px', md: '64px', xl: '80px' }}
            lineHeight={0.94}
            letterSpacing="-0.03em"
            color={titleColor}
          >
            {t('Get more grassroots Bitcoin adoption updates')}
          </H1>

          <Body size={{ base: 'md', md: 'lg', xl: 'xl' }} color={bodyColor} lineHeight={1.7}>
            {t(
              "There's a huge amount happening across the Bitcoin ecosystem that most people never see. We surface those stories in one place — adoption, community, new projects, and more.",
            )}
          </Body>
        </VStack>

        <VStack align="start" spacing={3} w="full">
          <Body size="sm" medium color={mutedColor}>
            {t('Choose what you want to receive')}:
          </Body>
          <SegmentCheckboxGroup selected={selectedSegments} onChange={setSelectedSegments} />
        </VStack>

        <VStack align="stretch" spacing={3} w="full">
          <SubscribeForm
            maxWidth="full"
            segmentIds={[...selectedSegments]}
            buttonProps={{
              children: t('Subscribe'),
              variant: 'solid',
              bg: 'white',
              color: 'neutral1.11',
              fontSize: 'md',
              border: '1px solid',
              borderColor: buttonBorderColor,
              _hover: { bg: 'whiteAlpha.900' },
              _active: { bg: 'whiteAlpha.800' },
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
