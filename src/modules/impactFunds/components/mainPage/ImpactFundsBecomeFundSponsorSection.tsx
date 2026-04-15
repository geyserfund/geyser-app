import { Box, Button, Flex, Icon, Link as ChakraLink, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRightBold } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

type ImpactFundsBecomeFundSponsorSectionProps = {
  sectionPrimaryTextColor: string
  sectionSecondaryTextColor: string
  sectionMutedTextColor: string
  cardSurfaceBg: string
}

const CAL_SCHEDULE_URL = 'https://cal.com/metamick/thirtymin?overlayCalendar=true'

/** Become-a-sponsor CTA: description, schedule link, and email — bordered block only (no gradient). */
export function ImpactFundsBecomeFundSponsorSection({
  sectionPrimaryTextColor,
  sectionSecondaryTextColor,
  sectionMutedTextColor,
  cardSurfaceBg,
}: ImpactFundsBecomeFundSponsorSectionProps): JSX.Element {
  const borderColor = useColorModeValue('neutral1.4', 'whiteAlpha.200')

  return (
    <Box borderWidth="1px" borderColor={borderColor} borderRadius="xl" px={{ base: 5, md: 6 }} py={{ base: 5, md: 6 }}>
      <VStack align="stretch" spacing={4}>
        <H2 size="xl" bold color={sectionPrimaryTextColor}>
          {t('Become a Fund Sponsor')}
        </H2>

        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'flex-start' }}
          justify="space-between"
          gap={{ base: 6, md: 8 }}
        >
          <Body color={sectionSecondaryTextColor} maxW={{ base: '100%', md: '65%' }} w="full">
            {t(
              'Sponsors make meaningful commitments to an Impact Fund, help guide allocation, and expand the number of projects we can support.',
            )}
          </Body>

          <VStack align="flex-end" spacing={3} flexShrink={0} w={{ base: 'full', md: 'auto' }}>
            <Button
              as={ChakraLink}
              href={CAL_SCHEDULE_URL}
              isExternal
              size="lg"
              variant="solid"
              colorScheme="neutral1"
              alignSelf="flex-end"
              rightIcon={<Icon as={PiArrowUpRightBold} />}
              bg={cardSurfaceBg}
              color={sectionPrimaryTextColor}
              boxShadow="0 8px 20px rgba(15, 23, 42, 0.10)"
              _hover={{
                bg: 'white',
                color: sectionPrimaryTextColor,
                transform: 'translateY(-1px)',
                boxShadow: '0 12px 24px rgba(15, 23, 42, 0.14)',
              }}
            >
              {t('Schedule a call')}
            </Button>
            <Body size="sm" color={sectionMutedTextColor} textAlign="right">
              {t('You can also reach out to us directly at')}{' '}
              <ChakraLink href="mailto:hello@geyser.fund" color={sectionPrimaryTextColor} textDecoration="underline">
                hello@geyser.fund
              </ChakraLink>
            </Body>
          </VStack>
        </Flex>
      </VStack>
    </Box>
  )
}
