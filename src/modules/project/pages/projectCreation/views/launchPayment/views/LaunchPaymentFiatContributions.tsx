import { Box, Button, ButtonProps, HStack, Icon, Image, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiCheckCircleFill, PiClockFill, PiWarningFill } from 'react-icons/pi'
import { Navigate, useLocation, useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { useStripeConnectOnboardingState } from '@/modules/project/pages/projectDashboard/views/wallet/components/StripeConnectOnboardingCard.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { ORIGIN } from '@/shared/constants/config/env.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep } from '@/types/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'
import { shouldShowCreationFiatStep } from '../utils/stripeConnect.ts'

/** Creation-flow step for optionally enabling fiat contributions through Stripe Connect. */
export const LaunchPaymentFiatContributions = () => {
  const { project, loading: projectLoading } = useProjectAtom()
  const navigate = useNavigate()
  const location = useLocation()
  const showFiatContributionsStep = shouldShowCreationFiatStep(project)
  const heroBackground = useColorModeValue('primary1.2', 'neutral1.3')
  const heroBorderColor = useColorModeValue('primary1.4', 'neutral1.5')
  const noteBackground = useColorModeValue('neutral1.2', 'neutral1.3')
  const noteBorderColor = useColorModeValue('neutral1.4', 'neutral1.5')
  const positiveStatusColor = useColorModeValue('primary1.9', 'primary1.6')
  const heroButtonBorderColor = useColorModeValue('neutral1.5', 'neutral1.7')
  const successStatusBackground = useColorModeValue('primary1.3', 'neutral1.4')
  const successStatusBorderColor = useColorModeValue('primary1.5', 'neutral1.6')
  const warningStatusBackground = useColorModeValue('orange.1', 'neutral1.4')
  const warningStatusBorderColor = useColorModeValue('orange.4', 'orange.8')
  const warningStatusColor = useColorModeValue('orange.9', 'orange.4')
  const creationReturnUrl = `${ORIGIN}${location.pathname}${location.search}`

  const { handleClick, isBusy, minimalActionLabel, minimalStatusMessage, statusType } = useStripeConnectOnboardingState(
    {
      isTiaProject: true,
      projectId: project.id,
      returnUrl: creationReturnUrl,
    },
  )

  const { updateProjectWithLastCreationStep, loading } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.IdentityVerification,
    getPath('launchFinalize', project.id),
  )

  const cameFromSeedWords = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('fromSeedWords') === '1'
  }, [location.search])

  if (projectLoading || !project.id) {
    return (
      <ProjectCreationPageWrapper title={t('Enable Fiat contributions through Stripe')}>
        <Body>{t('Loading payment options')}</Body>
      </ProjectCreationPageWrapper>
    )
  }

  if (!showFiatContributionsStep) {
    return <Navigate to={getPath('launchFinalize', project.id)} replace />
  }

  const continueProps: ButtonProps = {
    onClick() {
      updateProjectWithLastCreationStep()
    },
    isLoading: loading,
  }

  const backProps: ButtonProps = {
    onClick() {
      navigate(
        cameFromSeedWords
          ? getPath('launchPaymentSeedWords', project.id)
          : getPath('launchPaymentAccountPassword', project.id),
      )
    },
  }

  const statusAccentColor = statusType === 'enabled' ? positiveStatusColor : warningStatusColor
  const statusBackground = statusType === 'enabled' ? successStatusBackground : warningStatusBackground
  const statusBorderColor = statusType === 'enabled' ? successStatusBorderColor : warningStatusBorderColor
  const statusIcon =
    statusType === 'processing' ? PiClockFill : statusType === 'enabled' ? PiCheckCircleFill : PiWarningFill

  return (
    <ProjectCreationPageWrapper
      title={t('Enable Fiat contributions through Stripe')}
      continueButtonProps={continueProps}
      backButtonProps={backProps}
    >
      <VStack w="full" alignItems="start" gap={8}>
        <Box
          w="full"
          borderWidth="1px"
          borderColor={heroBorderColor}
          bg={heroBackground}
          borderRadius="24px"
          p={{ base: 5, md: 6 }}
        >
          <VStack w="full" alignItems="start" gap={5}>
            <HStack
              w="full"
              spacing={{ base: 4, md: 5 }}
              alignItems="center"
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Image
                src="/icons/creator_tools_stripe.webp"
                alt={t('Stripe logo')}
                height={{ base: '56px', md: '72px' }}
                objectFit="contain"
              />

              <VStack alignItems="start" gap={2} flex={1}>
                <H2 medium>{t('Give contributors more ways to support your project')}</H2>
              </VStack>
            </HStack>

            <VStack w="full" alignItems="start" gap={3}>
              <HStack spacing={3} alignItems="start">
                <Icon as={PiCheckCircleFill} color="primary1.9" boxSize={5} mt={0.5} />
                <Body size="md">{t('Accept cards, bank transfer, and other fiat payment methods')}</Body>
              </HStack>

              <HStack spacing={3} alignItems="start">
                <Icon as={PiCheckCircleFill} color="primary1.9" boxSize={5} mt={0.5} />
                <Body size="md">{t('Receive payouts directly in your bank account')}</Body>
              </HStack>

              <HStack spacing={3} alignItems="start">
                <Icon as={PiCheckCircleFill} color="primary1.9" boxSize={5} mt={0.5} />
                <Body size="md">{t('Continue receiving Bitcoin payments alongside fiat contributions')}</Body>
              </HStack>
            </VStack>

            {minimalStatusMessage && (
              <HStack
                w="full"
                spacing={3}
                alignItems="start"
                borderWidth="1px"
                borderColor={statusBorderColor}
                bg={statusBackground}
                borderRadius="16px"
                px={4}
                py={3}
              >
                <Icon as={statusIcon} color={statusAccentColor} boxSize={5} mt={0.5} />
                <VStack alignItems="start" spacing={1}>
                  <Body size="sm" medium color={statusAccentColor}>
                    {statusType === 'enabled'
                      ? t('Stripe status')
                      : statusType === 'processing'
                      ? t('Verification in progress')
                      : t('Action required')}
                  </Body>
                  <Body size="sm" light={statusType !== 'enabled'} medium={statusType === 'enabled'}>
                    {minimalStatusMessage}
                  </Body>
                </VStack>
              </HStack>
            )}

            <HStack w="full" justifyContent={{ base: 'stretch', md: 'flex-end' }}>
              <Button
                size="md"
                variant="outline"
                bg="white"
                color="black"
                borderColor={heroButtonBorderColor}
                _hover={{ bg: 'white' }}
                _active={{ bg: 'white' }}
                onClick={handleClick}
                isLoading={isBusy}
                width={{ base: '100%', md: 'auto' }}
                minW={{ base: 'unset', md: '240px' }}
              >
                {minimalActionLabel}
              </Button>
            </HStack>
          </VStack>
        </Box>

        <Box
          w="full"
          borderWidth="1px"
          borderColor={noteBorderColor}
          bg={noteBackground}
          borderRadius="18px"
          px={4}
          py={3}
        >
          <Body size="sm" light>
            {t('Optional step')}
            {'. '}
            {t(
              'You can continue without connecting Stripe and enable fiat contributions later from the project dashboard.',
            )}
          </Body>
        </Box>
      </VStack>
    </ProjectCreationPageWrapper>
  )
}
