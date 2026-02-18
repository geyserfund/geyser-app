/* eslint-disable complexity */
import { Box, Button, Flex, HStack, Icon, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import {
  PiCheckCircle,
  PiCheckCircleFill,
  PiEnvelope,
  PiIdentificationCard,
  PiPhone,
  PiWarningFill,
} from 'react-icons/pi'

import { useAuthContext } from '@/context/auth.tsx'
import { UpdateVerifyEmail } from '@/modules/profile/pages/profileSettings/components/UpdateVerifyEmail.tsx'
import { hasProjectFundingLimitReachedAtom } from '@/modules/project/state/projectVerificationAtom.ts'
import { hasProjectFundingLimitAlmostReachedAtom } from '@/modules/project/state/projectVerificationAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { halfStandardPadding } from '@/shared/styles/reponsiveValues.ts'
import { UserVerificationLevelInput } from '@/types/index.ts'

import { VerificationModal } from '../../../components/VerificationModal.tsx'
import { useUserVerificationModal } from '../hooks/useUserVerificationModal.ts'
import { useWalletLimitProgressData } from '../hooks/useWalletLimitProgressData.ts'
import { UserVerificationModal } from './UserVerificationModal.tsx'

/** Component that displays funding limits and verification options for the user */
export const WalletLimitsAndVerification = () => {
  const { percentage, barColor } = useWalletLimitProgressData()

  const { user } = useAuthContext()

  const verifyIntroModal = useModal()

  const { userVerificationModal, startVerification, userVerificationToken, generateVerificationTokenLoading } =
    useUserVerificationModal()

  const isEmailVerified = user.complianceDetails.verifiedDetails.email?.verified
  const isPhoneVerified = user.complianceDetails.verifiedDetails.phoneNumber?.verified
  const isIdentityVerified = user.complianceDetails.verifiedDetails.identity?.verified

  const hasFundingLimitReached = useAtomValue(hasProjectFundingLimitReachedAtom)
  const hasFundingLimitAlmostReached = useAtomValue(hasProjectFundingLimitAlmostReachedAtom)

  const isLevel2 = isEmailVerified && !isPhoneVerified && (hasFundingLimitReached || hasFundingLimitAlmostReached)
  const isLevel3 =
    isEmailVerified &&
    isPhoneVerified &&
    !isIdentityVerified &&
    (hasFundingLimitReached || hasFundingLimitAlmostReached)

  const level2BorderColor =
    isLevel2 && hasFundingLimitReached
      ? 'orange.9'
      : isLevel2 && hasFundingLimitAlmostReached
      ? 'warning.9'
      : 'neutral1.6'
  const level3BorderColor =
    isLevel3 && hasFundingLimitReached
      ? 'orange.9'
      : isLevel3 && hasFundingLimitAlmostReached
      ? 'warning.9'
      : 'neutral1.6'

  const level2ColorScheme =
    isLevel2 && hasFundingLimitReached ? 'orange' : isLevel2 && hasFundingLimitAlmostReached ? 'warning' : 'neutral1'
  const level3ColorScheme =
    isLevel3 && hasFundingLimitReached ? 'orange' : isLevel3 && hasFundingLimitAlmostReached ? 'warning' : 'primary1'

  const handleGenerateVerificationTokenForPhone = () => {
    startVerification(UserVerificationLevelInput.Level_2)
  }

  const handleGenerateVerificationTokenForIdentity = () => {
    verifyIntroModal.onOpen()
  }

  return (
    <>
      <VStack spacing={6} alignItems="flex-start" width="100%">
        <Body size="sm" color="neutral1.9">
          {t(
            'Limits are in place to prevent abuse, scams or fraudulent activity. It provides an additional level of trust to the contributors of your project.',
          )}
        </Body>
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
            <CardLayout flex="1" borderRadius="md" padding={halfStandardPadding} justifyContent="space-between">
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
              </VStack>
              <Flex justify="center" align="center" width="100%">
                {isEmailVerified ? (
                  <HStack spacing={1}>
                    <PiCheckCircleFill color="primary1.9" />
                    <Body fontWeight="medium" color="neutral1.11">
                      {t('Verified')}
                    </Body>
                  </HStack>
                ) : (
                  <UpdateVerifyEmail verifyButtonMode verifyButtonProps={{ size: 'md', width: '100%' }} />
                )}
              </Flex>
            </CardLayout>

            {/* Phone Verification */}
            <CardLayout
              flex="1"
              borderRadius="md"
              padding={halfStandardPadding}
              justifyContent="space-between"
              borderColor={level2BorderColor}
            >
              <VStack spacing={4} alignItems="flex-start">
                <HStack spacing={2}>
                  <Icon as={PiPhone} fontSize="20px" color="neutral1.11" />
                  <Body bold>{t('Phone Verification')}</Body>
                  {isLevel2 && <Icon as={PiWarningFill} fontSize="20px" color={level2BorderColor} />}
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
              </VStack>
              <Flex justify="center" align="center" width="100%">
                {isPhoneVerified ? (
                  <HStack spacing={1}>
                    <PiCheckCircleFill color="primary1.9" />
                    <Body fontWeight="medium" color="neutral1.11">
                      {t('Verified')}
                    </Body>
                  </HStack>
                ) : (
                  <Button
                    variant="solid"
                    colorScheme={level2ColorScheme}
                    size="md"
                    width="full"
                    onClick={handleGenerateVerificationTokenForPhone}
                    isLoading={generateVerificationTokenLoading}
                  >
                    {t('Increase my limit')}
                  </Button>
                )}
              </Flex>
            </CardLayout>

            {/* Gov ID Verification */}
            <CardLayout
              flex="1"
              borderRadius="md"
              padding={halfStandardPadding}
              justifyContent="space-between"
              borderColor={level3BorderColor}
            >
              <VStack spacing={4} alignItems="flex-start">
                <HStack spacing={2}>
                  <Icon as={PiIdentificationCard} fontSize="20px" color="neutral1.11" />
                  <Body bold>{t('Gov ID')}</Body>
                  {isLevel3 && <Icon as={PiWarningFill} fontSize="20px" color={level3BorderColor} />}
                </HStack>
                <VStack alignItems="flex-start" spacing={1}>
                  <HStack>
                    <Icon as={PiCheckCircle} color="neutral1.9" />
                    <Body size="sm">{t('Remove funding limits')}</Body>
                  </HStack>
                </VStack>
              </VStack>
              <Flex justify="center" align="center" width="100%">
                {isIdentityVerified ? (
                  <HStack spacing={1}>
                    <PiCheckCircleFill color="primary1.9" />
                    <Body fontWeight="medium" color="neutral1.11">
                      {t('Verified')}
                    </Body>
                  </HStack>
                ) : (
                  <Button
                    colorScheme={level3ColorScheme}
                    size="md"
                    width="full"
                    onClick={handleGenerateVerificationTokenForIdentity}
                    isLoading={generateVerificationTokenLoading}
                  >
                    {t('Go limitless')}
                  </Button>
                )}
              </Flex>
            </CardLayout>
          </Stack>
      </VStack>

      <UserVerificationModal
        userVerificationModal={userVerificationModal}
        accessToken={userVerificationToken?.token || ''}
        verificationLevel={userVerificationToken?.verificationLevel}
      />

      <VerificationModal {...verifyIntroModal} />
    </>
  )
}
