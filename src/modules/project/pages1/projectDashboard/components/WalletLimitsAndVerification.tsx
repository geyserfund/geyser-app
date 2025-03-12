import { Box, Button, Flex, HStack, Icon, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCheckCircle, PiCheckCircleFill, PiEnvelope, PiIdentificationCard, PiPhone } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'
import { halfStandardPadding, standardPadding } from '@/shared/styles/reponsiveValues.ts'

const MAX_LEVEL_1 = 1000000 // 10K $ in cents
const MAX_LEVEL_2 = 10000000 // 100K $ in cents

/** Component that displays funding limits and verification options for the user */
export const WalletLimitsAndVerification = () => {
  const { project } = useProjectAtom()

  const percentageInitial = (project.balanceUsdCent / MAX_LEVEL_2) * 100

  const isLevel1 = project.balanceUsdCent <= MAX_LEVEL_1
  const isLevel3 = project.balanceUsdCent >= MAX_LEVEL_2

  const percentage = isLevel3
    ? percentageInitial
    : isLevel1
    ? percentageInitial * 3
    : 30 + ((project.balanceUsdCent - MAX_LEVEL_1) / (MAX_LEVEL_2 - MAX_LEVEL_1)) * 70

  const level1Color = percentage >= 29 ? 'error.9' : percentage > 25 ? 'warning.9' : 'primary1.9'
  const level2Color = percentage >= 99 ? 'error.9' : percentage > 90 ? 'warning.9' : 'primary1.9'

  const barColor = isLevel3 ? 'primary1.9' : isLevel1 ? level1Color : level2Color

  return (
    <VStack paddingX={standardPadding}>
      <CardLayout width="100%">
        <VStack spacing={6} alignItems="flex-start" width="100%">
          <VStack spacing={1} alignItems="flex-start" width="100%">
            <H3 size="md">{t('Funding Limits & Verification')}</H3>
            <Body size="sm" color="neutral1.9">
              {t(
                'Limits are in place to prevent abuse, scams or fraudulent activity. It provides an additional level of trust to the contributors of your project.',
              )}
            </Body>
          </VStack>
          <Box />

          {/* Progress Bar */}
          <Box
            position="relative"
            width="100%"
            height="20px"
            bgGradient="linear(to-r, neutral1.3 95%, transparent 100%)"
            borderRadius="full"
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
          >
            <Box width="70%">
              <Box
                position="relative"
                width={`${percentage}%`}
                height="20px"
                bg={barColor}
                borderRadius="full"
                borderTopRightRadius={0}
                borderBottomRightRadius={0}
              />
              {/* Markers */}
              <Flex
                width="100%"
                direction="row"
                justifyContent="space-between"
                position="relative"
                height="100%"
                bottom="60px"
              >
                <Box position="absolute" left="30%">
                  <Body fontSize="sm" fontWeight="medium" color="neutral1.11">
                    $10,000
                  </Body>
                  <Box height="5px" width="5px" bg="neutral1.11" borderRadius="full" transform="translateX(-1.5px)" />
                  <Box width="2px" height="33px" bg="neutral1.11" />
                </Box>
                <Box position="absolute" left="100%">
                  <Body fontSize="sm" fontWeight="medium" color="neutral1.11">
                    $100,000
                  </Body>
                  <Box height="5px" width="5px" bg="neutral1.11" borderRadius="full" transform="translateX(-1.5px)" />
                  <Box width="2px" height="33px" bg="neutral1.11" />
                </Box>
              </Flex>
            </Box>
          </Box>

          {/* Verification Cards */}
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} width="100%">
            {/* Email Verification */}
            <CardLayout flex="1" borderRadius="md" padding={halfStandardPadding}>
              <VStack spacing={4} alignItems="flex-start">
                <HStack spacing={2}>
                  <Icon as={PiEnvelope} fontSize="20px" color="neutral1.11" />
                  <Body bold>{t('Email Verification')}</Body>
                </HStack>
                <VStack alignItems="flex-start" spacing={1}>
                  <HStack>
                    <Icon as={PiCheckCircle} color="neutral1.9" />
                    <Body size="sm">{t('Raised up to $10k in total')}</Body>
                  </HStack>
                  <HStack>
                    <Icon as={PiCheckCircle} color="neutral1.9" />
                    <Body size="sm">{t('Max $10k per contribution')}</Body>
                  </HStack>
                </VStack>
                <Flex justify="center" align="center" width="100%">
                  <HStack spacing={1}>
                    <PiCheckCircleFill color="primary1.9" />
                    <Body fontWeight="medium" color="neutral1.11">
                      {t('Verified')}
                    </Body>
                  </HStack>
                </Flex>
              </VStack>
            </CardLayout>

            {/* Phone Verification */}
            <CardLayout flex="1" borderRadius="md" padding={halfStandardPadding}>
              <VStack spacing={4} alignItems="flex-start">
                <HStack spacing={2}>
                  <Icon as={PiPhone} fontSize="20px" color="neutral1.11" />
                  <Body bold>{t('Phone Verification')}</Body>
                </HStack>
                <VStack alignItems="flex-start" spacing={1}>
                  <HStack>
                    <Icon as={PiCheckCircle} color="neutral1.9" />
                    <Body size="sm">{t('Raise up to $100k in total')}</Body>
                  </HStack>
                  <HStack>
                    <Icon as={PiCheckCircle} color="neutral1.9" />
                    <Body size="sm">{t('Max $10k per contribution')}</Body>
                  </HStack>
                </VStack>
                <Flex justify="center" align="center" width="100%">
                  <Button variant="outline" size="md" width="full">
                    {t('Increase my limit')}
                  </Button>
                </Flex>
              </VStack>
            </CardLayout>

            {/* Gov ID Verification */}
            <CardLayout flex="1" borderRadius="md" padding={halfStandardPadding} justifyContent="space-between">
              <VStack spacing={4} alignItems="flex-start">
                <HStack spacing={2}>
                  <Icon as={PiIdentificationCard} fontSize="20px" color="neutral1.11" />
                  <Body bold>{t('Gov ID')}</Body>
                </HStack>
                <VStack alignItems="flex-start" spacing={1}>
                  <HStack>
                    <Icon as={PiCheckCircle} color="neutral1.9" />
                    <Body size="sm">{t('Remove funding limits')}</Body>
                  </HStack>
                </VStack>
              </VStack>
              <Flex justify="center" align="center" width="100%">
                <Button colorScheme="primary1" size="md" width="full">
                  {t('Go limitless')}
                </Button>
              </Flex>
            </CardLayout>
          </Stack>
        </VStack>
      </CardLayout>
    </VStack>
  )
}
