import { Box, HStack, Stack, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { NEWSLETTER_SEGMENTS } from '@/modules/discovery/pages/newsletter/constants.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'

const ALL_SEGMENT_IDS = NEWSLETTER_SEGMENTS.map((s) => s.id)

type NewsletterSignupCardProps = {
  title?: string
  description?: string
}

/** Full-width landing-page newsletter CTA card used to promote newsletter signups. */
export const NewsletterSignupCard = ({
  title = t('Get more grassroots Bitcoin adoption updates'),
  description = t(
    "There's a huge amount happening across the Bitcoin ecosystem that most people never see. We surface those stories in one place - adoption, community, new projects, and more.",
  ),
}: NewsletterSignupCardProps) => {
  const cardBg = useColorModeValue('white', 'neutral1.3')
  const titleColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const bodyColor = useColorModeValue('neutral1.9', 'neutral1.10')
  const badgeBg = useColorModeValue('neutral1.2', 'neutral1.4')
  const badgeColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const formPanelBg = useColorModeValue('primary1.50', 'primary1.900')
  const inputBg = useColorModeValue('white', 'neutral1.2')
  const buttonBorderColor = useColorModeValue('neutral1.4', 'neutral1.5')

  return (
    <Box w="full" bg={cardBg} borderRadius="24px" py={{ base: 3, md: 4 }}>
      <VStack align="stretch" spacing={{ base: 3, md: 4 }}>
        <VStack align="start" spacing={3}>
          <Body size="sm" medium color="primary1.9" textTransform="uppercase" letterSpacing="0.1em">
            {t('Join our Newsletter')}
          </Body>

          <VStack w="full" align="start" spacing={3}>
            <H3 size={{ base: 'xl', md: '2xl' }} color={titleColor} bold lineHeight={1.1}>
              {title}
            </H3>
            <Body w="full" size={{ base: 'md', md: 'lg' }} color={bodyColor} lineHeight={1.7}>
              {description}
            </Body>
          </VStack>
        </VStack>

        <Stack
          direction={{ base: 'column', xl: 'row' }}
          spacing={{ base: 3, xl: 4 }}
          align={{ base: 'stretch', xl: 'center' }}
        >
          <HStack flex={{ base: 1, xl: '0 0 auto' }} spacing={2} flexWrap="wrap">
            {[t('Monthly roundups'), t('Grassroots stories'), t('Project launches')].map((label) => (
              <Box
                key={label}
                px={3}
                py={1.5}
                borderRadius="full"
                bg={badgeBg}
                color={badgeColor}
                fontSize="sm"
                fontWeight={600}
              >
                {label}
              </Box>
            ))}
          </HStack>

          <VStack
            flex={1}
            w="full"
            align="stretch"
            spacing={0}
            bg={formPanelBg}
            borderRadius="20px"
            p={{ base: 3, md: 4 }}
          >
            <SubscribeForm
              maxWidth="full"
              segmentIds={ALL_SEGMENT_IDS}
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
          </VStack>
        </Stack>
      </VStack>
    </Box>
  )
}
